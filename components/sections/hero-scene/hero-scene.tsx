'use client';

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { PX, cardsBottomY, phone, slotY, type SceneView } from './view';
import {
  Color,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Plane,
  PerspectiveCamera as ThreePerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Shape,
  SRGBColorSpace,
  Vector3,
  type Texture,
} from 'three';
import { sampleLeads, leadTiming } from '@/content/leads';
import { paintCard, paintScreen } from './textures';

/**
 * The hero phone in depth. Only the cards move: each new lead flies in on an
 * arc from the upper right and settles on the screen like a slip of paper, and
 * the landing fires one willow flash — the WhatsApp ping. The phone itself
 * never animates; the pointer tilts the whole rig by at most ~3 degrees.
 *
 * Loaded with `ssr: false` and only after the capability gate in HeroPhone
 * passes, so none of three.js is in the homepage's initial JS.
 *
 * Motion constants are per 60fps frame (the brief's units) and scaled by the
 * real frame delta, so a 120Hz display or a dropped frame does not change the
 * speed of an arrival.
 */

/** Same rhythm as the flat phone: three cards fading down, the fourth leaving. */
const SLOT_Y = [0, 1, 2, 3].map(slotY);
const SLOT_OPACITY = [1, 0.6, 0.28, 0];
const MAX_CARDS = SLOT_Y.length;
const DEPTH = 0.16;
const BEVEL = 0.025;
/** Just proud of the screen, which sits just proud of the body's front face. */
const SCREEN_Z = DEPTH / 2 + 0.03 + 0.004;
const CARD_Z = SCREEN_Z + 0.012;
/** The brief's arc, with heights scaled to this shorter phone. */
const Y_SCALE = phone.height / 5.22;
const SPAWN = new Vector3(2.6, 2.9 * Y_SCALE + slotY(0), 4.3);
const CONTROL = new Vector3(1.5, 2.0 * Y_SCALE + slotY(0), 2.1);
const ARRIVAL_FRAMES = 45;
const SETTLE = 0.16;
const PARALLAX_DAMP = 0.055;
const PULSE_DECAY = 0.045;
/** Cards are clipped at the bottom of the cards area, like the flat phone's
    overflow, so the leaving card never draws over the frame. */
const CLIP_Y = cardsBottomY;

type Card = {
  mesh: Mesh<PlaneGeometry, MeshBasicMaterial>;
  slot: number;
  jitter: number;
  /** Frames since spawn; -1 for a card that is already resting. */
  age: number;
  wobble: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const damp = (rate: number, frames: number) => 1 - Math.pow(1 - rate, frames);

function roundedRect(w: number, h: number, r: number) {
  const s = new Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

type Assets = {
  cardGeo: PlaneGeometry;
  cardTex: Texture[];
  clip: Plane;
};

const UP = new Vector3(0, 1, 0);

/**
 * The card simulation, kept outside React: it mutates meshes every frame and
 * owns their materials, which it disposes as cards leave.
 */
class LeadStack {
  private cards: Card[] = [];
  private nextLead = 1;
  private elapsed = 0;
  private nextAt = leadTiming.firstArrivalMs / 1000;
  /** Arrival flash, 1 on landing, decaying to 0. */
  pulse = 0;

  constructor(
    private group: Group,
    private assets: Assets,
  ) {
    // The flat phone's first frame: lead 0 on top, then the leads before it,
    // so the hand-off is invisible and arrivals continue its order.
    const n = sampleLeads.length;
    for (let slot = 0; slot < leadTiming.seeded; slot++) {
      this.cards.push(this.spawn((n - slot) % n, slot, true));
    }
  }

  private spawn(lead: number, slot: number, resting: boolean): Card {
    const mat = new MeshBasicMaterial({
      map: this.assets.cardTex[lead],
      transparent: true,
      toneMapped: false,
      depthWrite: false,
      opacity: resting ? SLOT_OPACITY[slot] : 0,
      clippingPlanes: [this.assets.clip],
    });
    const mesh = new Mesh(this.assets.cardGeo, mat);
    const card: Card = {
      mesh,
      slot,
      jitter: (Math.random() * 2 - 1) * 0.004,
      age: resting ? -1 : 0,
      wobble: Math.random() * 0.9 - 0.45,
    };
    if (resting) mesh.position.set(0, SLOT_Y[slot], CARD_Z + card.jitter);
    else mesh.position.copy(SPAWN);
    mesh.renderOrder = 10 - slot;
    this.group.add(mesh);
    return card;
  }

  private retire(card: Card) {
    this.group.remove(card.mesh);
    card.mesh.material.dispose();
  }

  step(dt: number, root: Group) {
    const f = dt * 60;
    this.assets.clip.set(UP, -CLIP_Y).applyMatrix4(root.matrixWorld);

    this.elapsed += dt;
    if (this.elapsed >= this.nextAt) {
      this.nextAt += leadTiming.intervalMs / 1000;
      for (const card of this.cards) card.slot += 1;
      const lead = this.nextLead++ % sampleLeads.length;
      this.cards.unshift(this.spawn(lead, 0, false));
      // Three showing plus one leaving; anything past that is already invisible.
      while (this.cards.length > MAX_CARDS) this.retire(this.cards.pop()!);
    }

    const settle = damp(SETTLE, f);
    for (const card of this.cards) {
      const { mesh } = card;
      const mat = mesh.material;
      const ty = SLOT_Y[Math.min(card.slot, SLOT_Y.length - 1)];
      const tz = CARD_Z + card.jitter;
      mesh.renderOrder = 10 - card.slot;

      if (card.age >= 0) {
        card.age += f;
        const e = easeOutCubic(Math.min(1, card.age / ARRIVAL_FRAMES));
        const u = 1 - e;
        // Quadratic bezier: spawn -> control -> slot. An arc, not a line.
        mesh.position.set(
          u * u * SPAWN.x + 2 * u * e * CONTROL.x,
          u * u * SPAWN.y + 2 * u * e * CONTROL.y + e * e * ty,
          u * u * SPAWN.z + 2 * u * e * CONTROL.z + e * e * tz,
        );
        // Paper settling: the wobble and the turn both die out as (1-e)^2.
        const settleAmt = u * u;
        mesh.rotation.z = card.wobble * settleAmt * Math.cos(e * 7);
        mesh.rotation.y = -0.5 * settleAmt;
        mat.opacity = Math.min(1, e * 1.8);
        if (e >= 1) {
          card.age = -1;
          mesh.rotation.set(0, 0, 0);
          this.pulse = 1;
        }
      } else {
        mesh.position.x += (0 - mesh.position.x) * settle;
        mesh.position.y += (ty - mesh.position.y) * settle;
        mesh.position.z += (tz - mesh.position.z) * settle;
        mat.opacity += ((SLOT_OPACITY[card.slot] ?? 0) - mat.opacity) * settle;
      }
    }

    this.pulse = Math.max(0, this.pulse - PULSE_DECAY * f);
  }

  dispose() {
    this.cards.forEach((c) => this.retire(c));
    this.cards = [];
  }
}

function Rig({ onReady }: { onReady: () => void }) {
  const root = useRef<Group>(null);
  const stack = useRef<Group>(null);
  const pulse = useRef<PointLight>(null);

  // Everything GPU-side is built once, imperatively, so it can be disposed
  // explicitly. Textures are painted by the caller after fonts load.
  const assets = useMemo(() => {
    // The flat phone's frame, 320 x 411.6 px, given a thin body. The bevel
    // grows the outline by BEVEL on every side, so the shape is drawn that
    // much smaller to land on the flat frame's exact size.
    const body = new ExtrudeGeometry(
      roundedRect(phone.width - 2 * BEVEL, phone.height - 2 * BEVEL, phone.radius - BEVEL),
      {
        depth: DEPTH,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: BEVEL,
        bevelSegments: 3,
        curveSegments: 14,
      },
    );
    body.center();
    const screenTex = paintScreen();
    const cardTex: Texture[] = sampleLeads.map(paintCard);
    return {
      body,
      // Night, the flat frame's colour. The key and rim lights on the bevel
      // stand in for its hairline border.
      bodyMat: new MeshStandardMaterial({
        color: new Color('#0c1b15'),
        roughness: 0.42,
        metalness: 0.55,
      }),
      screenGeo: new PlaneGeometry(phone.screenW * PX, phone.screenH * PX),
      // Self-lit like a real screen, and exempt from tone mapping so the
      // baked token colours come out as the tokens.
      screenMat: new MeshBasicMaterial({ map: screenTex, transparent: true, toneMapped: false }),
      screenTex,
      cardGeo: new PlaneGeometry(phone.cardW * PX, phone.cardH * PX),
      cardTex,
      clip: new Plane(),
    };
  }, []);

  const sim = useRef<LeadStack | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const readyFrames = useRef(0);

  useEffect(() => {
    const stackGroup = stack.current!;
    const leads = new LeadStack(stackGroup, assets);
    sim.current = leads;

    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      leads.dispose();
      sim.current = null;
      assets.body.dispose();
      assets.bodyMat.dispose();
      assets.screenGeo.dispose();
      assets.screenMat.dispose();
      assets.screenTex.dispose();
      assets.cardGeo.dispose();
      assets.cardTex.forEach((t) => t.dispose());
    };
  }, [assets]);

  useFrame((_, delta) => {
    const g = root.current;
    const leads = sim.current;
    if (!g || !leads) return;
    // Clamp so a tab coming back from the background does not teleport cards.
    const dt = Math.min(delta, 1 / 20);
    const f = dt * 60;

    // Parallax — the only thing that moves the phone.
    const { x, y } = pointer.current;
    const k = damp(PARALLAX_DAMP, f);
    g.rotation.y += (-0.12 + x * 0.052 - g.rotation.y) * k;
    g.rotation.x += (0.04 + y * 0.035 - g.rotation.x) * k;
    g.updateMatrixWorld();

    leads.step(dt, g);

    // The landing flash.
    if (pulse.current) pulse.current.intensity = leads.pulse * leads.pulse * 3.2;

    // Report ready once real frames are on screen, not on mount.
    if (readyFrames.current < 2 && ++readyFrames.current === 2) onReady();
  });

  return (
    <>
      <ambientLight color="#2e5f49" intensity={1.1} />
      <directionalLight color="#ffbf46" intensity={2.1} position={[-4, 3.4, 6]} />
      <directionalLight color="#8acb88" intensity={1.45} position={[4.5, 1.2, -2.2]} />
      <group ref={root} rotation={[0.04, -0.12, 0]}>
        <pointLight
          ref={pulse}
          color="#8acb88"
          intensity={0}
          distance={7}
          position={[1.7, 1.5, 1.4]}
        />
        <mesh geometry={assets.body} material={assets.bodyMat} />
        <mesh
          geometry={assets.screenGeo}
          material={assets.screenMat}
          position={[0, 0, SCREEN_Z]}
          renderOrder={1}
        />
        <group ref={stack} />
      </group>
    </>
  );
}

/**
 * The spec's camera (fov 32 at z 11), rendered through a view offset so the
 * canvas can be taller than the composed frame without the phone moving or
 * changing size. `manual` stops R3F resetting the aspect on resize.
 */
function Camera({ view }: { view: SceneView }) {
  const cam = useRef<ThreePerspectiveCamera>(null);
  const size = useThree((s) => s.size);
  useLayoutEffect(() => {
    const c = cam.current;
    if (!c) return;
    c.aspect = view.fullWidth / view.fullHeight;
    c.setViewOffset(view.fullWidth, view.fullHeight, 0, view.offsetY, size.width, size.height);
    c.updateProjectionMatrix();
  }, [view, size]);
  return <PerspectiveCamera ref={cam} makeDefault manual fov={32} position={[0, 0, 11]} />;
}

export default function HeroScene({
  active,
  view,
  onReady,
}: {
  active: boolean;
  view: SceneView;
  onReady: () => void;
}) {
  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.5]}
      // One loop, owned by R3F. Off-screen it is stopped outright rather than
      // throttled, so there is never a second rAF to guard against.
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.localClippingEnabled = true;
      }}
      style={{ pointerEvents: 'none' }}
    >
      <Camera view={view} />
      <Rig onReady={onReady} />
    </Canvas>
  );
}
