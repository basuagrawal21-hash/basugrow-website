'use client';

import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery, useReducedMotionPref } from '@/lib/use-media';
import { LeadTicker } from './lead-ticker';
import { loadSceneFonts } from './hero-scene/fonts';
import { phone as phoneDims, type SceneView } from './hero-scene/view';

/**
 * The hero's right column. The flat phone (LeadTicker) is always rendered: it is in the
 * server HTML, it is the first thing painted, and its text is the accessible
 * version of the scene. The WebGL scene is an optional layer on top, loaded
 * only when the capability gate passes, and it takes over visually only once
 * it has drawn real frames.
 *
 * Gate — all must hold, or the flat phone is all there is:
 *   viewport >= 900px, no reduced-motion preference,
 *   deviceMemory unknown or >= 4 GB, and Save-Data off.
 */
const HeroScene = dynamic(() => import('./hero-scene/hero-scene'), { ssr: false });

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

const noop = () => () => {};
function deviceCapable() {
  const nav = navigator as Nav;
  return (nav.deviceMemory === undefined || nav.deviceMemory >= 4) && !nav.connection?.saveData;
}

/** Phone height in world units over visible height at fov 32, distance 11. */
const PHONE_FILL = phoneDims.height / (2 * 11 * Math.tan((16 * Math.PI) / 180));

/** Any WebGL failure drops back to the flat phone, which never went away. */
class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery('(min-width: 900px)');
  const reduced = useReducedMotionPref();
  const capable = useSyncExternalStore(noop, deviceCapable, () => false);
  const [failed, setFailed] = useState(false);
  const gate = wide && !reduced && capable && !failed;

  const [fontsReady, setFontsReady] = useState(false);
  const [layer, setLayer] = useState<{ box: CSSProperties; view: SceneView } | null>(null);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);

  // Fonts and the scene chunk load in parallel; the scene mounts when both are in.
  useEffect(() => {
    if (!gate) return;
    let live = true;
    void import('./hero-scene/hero-scene');
    loadSceneFonts().then(() => live && setFontsReady(true));
    return () => {
      live = false;
      setReady(false);
    };
  }, [gate]);

  // Pause on the container, not the canvas: the canvas overhangs the column.
  useEffect(() => {
    const el = ref.current;
    if (!el || !gate) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [gate]);

  // Size the canvas so the 3D phone lands exactly on the flat phone's pixels,
  // and wide enough to the right to show the arc cards arrive on. Layout
  // offsets, not getBoundingClientRect, so the flat phone's CSS tilt is ignored.
  useLayoutEffect(() => {
    const el = ref.current;
    const phone = el?.querySelector<HTMLElement>('.phone-body');
    const section = el?.closest('section');
    if (!el || !phone || !section || !gate) return;

    const measure = () => {
      let top = 0;
      let left = 0;
      for (let n: HTMLElement | null = phone; n && n !== el; n = n.offsetParent as HTMLElement) {
        top += n.offsetTop;
        left += n.offsetLeft;
      }
      // The spec's frame: phone centred, filling PHONE_FILL of the height.
      const h = phone.offsetHeight / PHONE_FILL;
      const cx = left + phone.offsetWidth / 2;
      const cy = top + phone.offsetHeight / 2;
      const hostRect = el.getBoundingClientRect();
      const secRect = section.getBoundingClientRect();
      const w = Math.max(phone.offsetWidth * 2, (secRect.right - hostRect.left - cx) * 2);
      const frameTop = cy - h / 2;
      // The canvas itself runs up to the top of the hero, so a card arriving
      // from above is never cut by a canvas edge mid-page. The camera renders
      // the extra strip through a view offset; the phone does not move.
      const canvasTop = Math.min(frameTop, secRect.top - hostRect.top);
      setLayer({
        box: { top: canvasTop, left: cx - w / 2, width: w, height: frameTop + h - canvasTop },
        view: { fullWidth: w, fullHeight: h, offsetY: canvasTop - frameTop },
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(section);
    return () => ro.disconnect();
  }, [gate]);

  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => setFailed(true), []);
  const showing = gate && ready;

  return (
    <div ref={ref} className="hero-phone relative" data-scene={showing ? 'ready' : undefined}>
      <div className="hero-tilt">
        <LeadTicker paused={gate} />
      </div>
      {gate && fontsReady && layer && (
        <div aria-hidden className="scene-layer pointer-events-none absolute" style={layer.box}>
          <SceneBoundary onError={onError}>
            <Suspense fallback={null}>
              <HeroScene active={inView} view={layer.view} onReady={onReady} />
            </Suspense>
          </SceneBoundary>
        </div>
      )}
    </div>
  );
}
