// Initial JS for a prerendered route: every <script src> in its HTML, gzipped.
// Usage: node scripts/route-weight.mjs [route]   (default: index)
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const route = process.argv[2] ?? 'index';
const html = readFileSync(`.next/server/app/${route}.html`, 'utf8');
// noModule scripts (Next's legacy polyfills) are never fetched by modern
// browsers, so they are reported separately rather than counted.
const tags = [...html.matchAll(/<script([^>]+)src="([^"]+)"([^>]*)>/g)];
const seen = new Set();

let raw = 0, gz = 0, legacyGz = 0;
for (const [, before, src, after] of tags) {
  if (seen.has(src)) continue;
  seen.add(src);
  const legacy = /nomodule/i.test(before + after);
  const buf = readFileSync(`.next${src.replace(/^\/_next/, '').split('?')[0]}`);
  const z = gzipSync(buf, { level: 9 }).length;
  if (legacy) legacyGz += z;
  else { raw += buf.length; gz += z; }
  console.log(`${(z / 1024).toFixed(1).padStart(7)} KB gz  ${src}${legacy ? '  (noModule, not fetched by modern browsers)' : ''}`);
}
const srcs = [...seen];
const htmlGz = gzipSync(html, { level: 9 }).length;
const css = [...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map((m) => m[1]);
const cssGz = css.reduce((n, s) => n + gzipSync(readFileSync(`.next${s.replace(/^\/_next/, '')}`)).length, 0);
console.log(`\nModern-browser JS ${(raw / 1024).toFixed(0)} KB raw / ${(gz / 1024).toFixed(1)} KB gz  (+${(legacyGz / 1024).toFixed(1)} KB gz noModule polyfills)`);
console.log(`HTML ${(htmlGz / 1024).toFixed(1)} KB gz  CSS ${(cssGz / 1024).toFixed(1)} KB gz`);
console.log(`Route total (HTML+CSS+JS, gz, excl. fonts/images): ${((gz + htmlGz + cssGz) / 1024).toFixed(1)} KB`);
