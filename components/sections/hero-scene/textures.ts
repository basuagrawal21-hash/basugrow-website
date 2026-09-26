import { CanvasTexture, SRGBColorSpace } from 'three';
import { phoneScreen, type SampleLead } from '@/content/leads';
import { sceneTokens } from './fonts';
import { phone } from './view';

/**
 * Text baked into CanvasTextures for the WebGL phone. The layout is the flat
 * LeadTicker's, measured in CSS px, so the 3D phone and the flat one are the
 * same design. Colours are read from the design tokens at runtime.
 *
 * Call only after `loadSceneFonts()` (./fonts) resolves, or the canvas silently
 * falls back to a system face and the texture is wrong for the life of the scene.
 */
const SCALE = 2;

function surface(w: number, h: number) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(w * SCALE);
  canvas.height = Math.round(h * SCALE);
  const ctx = canvas.getContext('2d')!;
  ctx.scale(SCALE, SCALE);
  ctx.textBaseline = 'alphabetic';
  return { canvas, ctx };
}

function texture(canvas: HTMLCanvasElement) {
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function alpha(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/** `fg` at `a` over `bg`, as an opaque colour — a card has to hide what is behind it. */
function over(fg: string, bg: string, a: number) {
  const f = parseInt(fg.slice(1), 16);
  const b = parseInt(bg.slice(1), 16);
  const ch = (s: number) => Math.round(a * ((f >> s) & 255) + (1 - a) * ((b >> s) & 255));
  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
}

/** WhatsApp's double tick (lucide CheckCheck at 12px), drawn so no glyph fallback. */
function ticks(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y + 0.5);
  ctx.lineTo(x + 2.8, y + 3.2);
  ctx.lineTo(x + 8, y - 2.5);
  ctx.moveTo(x + 5.2, y + 3.2);
  ctx.lineTo(x + 11, y - 2.5);
  ctx.stroke();
}

/** Status bar, header and divider — the parts of the screen that never move. */
export function paintScreen() {
  const { palette: p, fonts } = sceneTokens();
  const { display, body } = fonts;
  const W = phone.screenW;
  const H = phone.screenH;
  const { canvas, ctx } = surface(W, H);

  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, phone.screenRadius);
  ctx.fillStyle = p.pine;
  ctx.fill();

  // Status bar
  const muted = alpha(p.bone, 0.45);
  ctx.fillStyle = muted;
  ctx.font = `800 11px ${display}`;
  ctx.fillText(phoneScreen.time, 20, 25);
  // signal
  [3, 5, 7, 9].forEach((h, i) => ctx.fillRect(230 + i * 2.6, 25 - h, 1.6, h));
  // wifi
  ctx.strokeStyle = muted;
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  for (const r of [2.5, 5, 7.5]) {
    ctx.beginPath();
    ctx.arc(250, 25, r, -Math.PI * 0.78, -Math.PI * 0.22);
    ctx.stroke();
  }
  // battery
  ctx.beginPath();
  ctx.roundRect(261.5, 16.5, 13, 8, 2);
  ctx.stroke();
  ctx.fillRect(263.5, 18.5, 9, 4);
  ctx.fillRect(275.5, 19, 1.4, 3);

  // Header
  ctx.beginPath();
  ctx.arc(38, 55.6, 18, 0, Math.PI * 2);
  ctx.fillStyle = alpha(p.willow, 0.15);
  ctx.fill();
  ctx.fillStyle = p.willow;
  ctx.font = `600 13px ${body}`;
  ctx.textAlign = 'center';
  ctx.fillText(phoneScreen.avatar, 38, 60);
  ctx.textAlign = 'left';

  ctx.fillStyle = p.bone;
  ctx.font = `600 14px ${body}`;
  ctx.fillText(phoneScreen.title, 68, 53);
  ctx.fillStyle = p.willow;
  ctx.font = `400 12px ${body}`;
  ctx.fillText(phoneScreen.subtitle, 68, 68.5);

  ctx.fillStyle = alpha(p.bone, 0.1);
  ctx.fillRect(0, 88, W, 1);

  return texture(canvas);
}

/** One lead card, 269 x 84 px, in the flat phone's style. */
export function paintCard(lead: SampleLead) {
  const { palette: p, fonts } = sceneTokens();
  const { display, body } = fonts;
  const W = phone.cardW;
  const H = phone.cardH;
  const { canvas, ctx } = surface(W, H);

  ctx.beginPath();
  ctx.roundRect(0.75, 0.75, W - 1.5, H - 1.5, 16);
  ctx.fillStyle = over(p.bone, p.pine, 0.04);
  ctx.fill();
  ctx.strokeStyle = over(p.bone, p.pine, 0.1);
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = p.bone;
  ctx.font = `600 15px ${body}`;
  ctx.fillText(lead.name, 15.5, 28.5);

  ctx.fillStyle = alpha(p.bone, 0.4);
  ctx.font = `800 11px ${display}`;
  ctx.textAlign = 'right';
  ctx.fillText(phoneScreen.arrivedLabel, 253.5, 29);
  ctx.textAlign = 'left';

  ctx.fillStyle = p.willow;
  ctx.font = `400 13px ${body}`;
  ctx.fillText(lead.enquiry, 15.5, 52);

  ticks(ctx, 15.5, 71.5, alpha(p.willow, 0.7));
  ctx.fillStyle = alpha(p.bone, 0.45);
  ctx.font = `400 12px ${body}`;
  ctx.fillText(lead.place, 33.5, 76);

  return texture(canvas);
}
