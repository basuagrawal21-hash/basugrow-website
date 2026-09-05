/**
 * Print WCAG contrast ratios for the palette. Run after changing any token:
 *   node scripts/contrast.mjs
 * Anything that carries body text must reach 4.5:1, large text 3:1.
 */
const P = {
  bone: '#F6F5F1',
  sand: '#ECEAE4',
  night: '#171613',
  ink: '#1B1A17',
  slate: '#6B6761',
  gold: '#FFBF46',
  willow: '#8ACB88',
};

const channels = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const linear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const luminance = (h) => {
  const [r, g, b] = channels(h).map(linear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const pairs = [
  ['ink', 'bone', 'body and headings on the page'],
  ['slate', 'bone', 'captions on the page'],
  ['ink', 'sand', 'body on the tinted surface'],
  ['slate', 'sand', 'captions on the tint'],
  ['bone', 'night', 'body on dark sections'],
  ['willow', 'night', 'green accents on dark'],
  ['gold', 'night', 'gold on dark'],
  ['ink', 'gold', 'text on gold buttons'],
  ['willow', 'bone', 'green must never carry text on light'],
  ['gold', 'bone', 'gold is a fill, never text on light'],
];

for (const [a, b, use] of pairs) {
  const r = ratio(P[a], P[b]);
  const verdict = r >= 4.5 ? 'AA body' : r >= 3 ? 'AA large only' : 'FAIL';
  console.log(`${`${a}/${b}`.padEnd(14)} ${r.toFixed(2).padStart(6)}:1  ${verdict.padEnd(14)} ${use}`);
}
