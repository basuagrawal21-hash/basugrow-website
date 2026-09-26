import { CanvasTexture, SRGBColorSpace } from 'three';
import { phoneScreen, type SampleLead } from '@/content/leads';
import { sceneTokens } from './fonts';

/**
 * Text baked into CanvasTextures for the WebGL phone. Colours are read from
 * the design tokens at runtime so the scene cannot drift from the CSS.
 *
 * Call only after `loadSceneFonts()` (./fonts) resolves, or the canvas silently falls
 * back to a system face and the texture is wrong for the life of the scene.
 */
const SCALE = 2;

function surface(w: number, h: number) {
  const canvas = document.createElement('canvas');
  canvas.width = w * SCALE;
  canvas.height = h * SCALE;
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

/** WhatsApp's double tick, drawn rather than typed so no glyph fallback. */
function ticks(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 3, y + 3);
  ctx.lineTo(x + 8.5, y - 3.5);
  ctx.moveTo(x + 5.5, y + 3);
  ctx.lineTo(x + 12, y - 3.5);
  ctx.stroke();
}

/** 300 x 620 screen: status bar, header, and the footer that keeps it full. */
export function paintScreen() {
  const { palette: p, fonts } = sceneTokens();
  const { display, body } = fonts;
  const W = 300;
  const H = 620;
  const { canvas, ctx } = surface(W, H);

  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 30);
  ctx.fillStyle = p.night;
  ctx.fill();

  // Status bar
  ctx.fillStyle = alpha(p.bone, 0.8);
  ctx.font = `800 12px ${display}`;
  ctx.fillText(phoneScreen.time, 26, 26);
  ctx.fillStyle = p.lichen;
  [4, 6, 8, 10].forEach((h, i) => ctx.fillRect(236 + i * 3.5, 26 - h, 2.2, h));
  ctx.strokeStyle = p.lichen;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(254, 17.5, 19, 9, 2.5);
  ctx.stroke();
  ctx.fillRect(256, 19.5, 13, 5);
  ctx.fillRect(274, 20, 1.6, 4);

  // Header
  ctx.beginPath();
  ctx.arc(40, 58, 17, 0, Math.PI * 2);
  ctx.fillStyle = alpha(p.willow, 0.15);
  ctx.fill();
  ctx.strokeStyle = alpha(p.willow, 0.25);
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = p.willow;
  ctx.font = `800 12.5px ${display}`;
  ctx.textAlign = 'center';
  ctx.fillText(phoneScreen.avatar, 40, 62.5);
  ctx.textAlign = 'left';

  ctx.fillStyle = p.bone;
  ctx.font = `800 17px ${display}`;
  ctx.fillText(phoneScreen.title, 68, 55);
  ctx.fillStyle = p.willow;
  ctx.font = `400 12px ${body}`;
  ctx.fillText(phoneScreen.subtitle, 68, 72);

  ctx.fillStyle = alpha(p.bone, 0.1);
  ctx.fillRect(22, 88, W - 44, 1);

  // Footer, under the fourth slot
  ctx.fillRect(22, 540, W - 44, 1);
  ctx.font = `400 12px ${body}`;
  ctx.fillStyle = p.lichen;
  ctx.fillText(phoneScreen.footerLabel, 22, 562);
  ctx.textAlign = 'right';
  ctx.font = `600 12px ${body}`;
  ctx.fillStyle = alpha(p.bone, 0.8);
  ctx.fillText(phoneScreen.footerCount, W - 22, 562);
  ctx.textAlign = 'left';
  ctx.font = `400 11px ${body}`;
  ctx.fillStyle = p.lichen;
  ctx.fillText(phoneScreen.footerNote, 22, 580);

  return texture(canvas);
}

/** 360 x 132 lead card. */
export function paintCard(lead: SampleLead) {
  const { palette: p, fonts } = sceneTokens();
  const { display, body } = fonts;
  const W = 360;
  const H = 132;
  const { canvas, ctx } = surface(W, H);

  ctx.beginPath();
  ctx.roundRect(0.5, 0.5, W - 1, H - 1, 18);
  ctx.fillStyle = p.pine;
  ctx.fill();
  ctx.save();
  ctx.clip();
  ctx.fillStyle = p.willow;
  ctx.fillRect(0, 0, 4.5, H);
  ctx.restore();
  ctx.strokeStyle = alpha(p.willow, 0.22);
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = p.bone;
  ctx.font = `800 23px ${display}`;
  ctx.fillText(lead.name, 24, 40);

  ctx.fillStyle = p.lichen;
  ctx.font = `400 13px ${body}`;
  ctx.textAlign = 'right';
  ctx.fillText(phoneScreen.arrivedLabel, W - 20, 36);
  ctx.textAlign = 'left';

  ctx.fillStyle = p.willow;
  ctx.font = `400 16px ${body}`;
  ctx.fillText(lead.enquiry, 24, 72);

  ticks(ctx, 24, 98, alpha(p.willow, 0.7));
  ctx.fillStyle = p.lichen;
  ctx.font = `400 14px ${body}`;
  ctx.fillText(lead.place, 42, 103);

  return texture(canvas);
}
