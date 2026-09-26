/**
 * Design tokens and font faces for the WebGL textures. Deliberately free of
 * three.js imports: HeroPhone calls this in parallel with the scene's dynamic
 * import, and importing three here would drag it into the initial bundle.
 */
export type ScenePalette = Record<'night' | 'pine' | 'bone' | 'willow' | 'lichen', string>;
export type SceneFonts = { display: string; body: string };

let resolved: { palette: ScenePalette; fonts: SceneFonts } | null = null;

export function sceneTokens() {
  if (!resolved) throw new Error('loadSceneFonts() must resolve before painting textures');
  return resolved;
}

export async function loadSceneFonts() {
  const css = getComputedStyle(document.documentElement);
  const token = (name: string) => css.getPropertyValue(name).trim();
  const fonts = { display: token('--font-bricolage'), body: token('--font-geist') };
  // `fonts.ready` alone is not enough: a weight the page has not used yet is
  // never requested, so ask for each face the textures draw with.
  await Promise.all([
    document.fonts.load(`800 23px ${fonts.display}`),
    document.fonts.load(`400 16px ${fonts.body}`),
    document.fonts.load(`600 16px ${fonts.body}`),
  ]);
  await document.fonts.ready;
  resolved = {
    fonts,
    palette: {
      night: token('--color-night'),
      pine: token('--color-pine'),
      bone: token('--color-bone'),
      willow: token('--color-willow'),
      lichen: token('--color-lichen'),
    },
  };
}
