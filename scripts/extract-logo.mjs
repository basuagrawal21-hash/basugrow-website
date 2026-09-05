/**
 * Turn a supplied BasuGrow logo file into the alpha mask the site paints with.
 *
 * Run:  node scripts/extract-logo.mjs <source.png>
 *
 * Handles two kinds of source:
 *   - a PNG that already has transparency (the usual case) — its alpha channel
 *     is used as-is;
 *   - a PNG on a flat background — the background colour is sampled from the
 *     corner and keyed out, keeping anti-aliased edges soft.
 *
 * Output: public/logo-mark-mask.png — white pixels, alpha carrying the shape,
 * trimmed to the artwork and centred on a square canvas. The Logo component
 * uses it as a CSS mask with `background-color: currentColor`, so one file
 * serves willow-on-pine and forest-on-paper and always matches the token.
 */
import fs from 'node:fs';
import { PNG } from 'pngjs';

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/extract-logo.mjs <source.png>');
  process.exit(1);
}

const png = PNG.sync.read(fs.readFileSync(src));
const { width, height, data } = png;
const idx = (x, y) => (y * width + x) * 4;

// Does the source carry real transparency, or is it on a flat field?
let transparentPixels = 0;
for (let i = 3; i < data.length; i += 4) {
  if (data[i] < 250) transparentPixels++;
}
const useAlpha = transparentPixels > width * height * 0.02;

const bg = [data[0], data[1], data[2]];
const dist = (x, y) => {
  const i = idx(x, y);
  return Math.hypot(data[i] - bg[0], data[i + 1] - bg[1], data[i + 2] - bg[2]);
};

/** Coverage of a pixel, 0-1, however the source encodes it. */
const coverage = (x, y) => (useAlpha ? data[idx(x, y) + 3] / 255 : Math.min(1, dist(x, y) / 140));

console.log(useAlpha ? 'source has an alpha channel' : `keying out flat background rgb(${bg})`);

// Trim to the artwork.
let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (coverage(x, y) > 0.12) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
if (maxX <= minX || maxY <= minY) {
  console.error('found no artwork in the source image');
  process.exit(1);
}

const w = maxX - minX + 1;
const h = maxY - minY + 1;
const size = Math.max(w, h);
const offX = Math.round((size - w) / 2);
const offY = Math.round((size - h) / 2);

const out = new PNG({ width: size, height: size });
out.data.fill(0);

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const a = Math.round(Math.max(0, Math.min(1, coverage(minX + x, minY + y))) * 255);
    const o = ((y + offY) * size + (x + offX)) * 4;
    out.data[o] = 255;
    out.data[o + 1] = 255;
    out.data[o + 2] = 255;
    out.data[o + 3] = a;
  }
}

fs.writeFileSync('public/logo-mark-mask.png', PNG.sync.write(out));
console.log(`trimmed ${width}x${height} -> ${size}x${size}, wrote public/logo-mark-mask.png`);
