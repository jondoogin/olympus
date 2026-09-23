import manifest from '../content/image-manifest.json';

export type ImageKey = keyof typeof manifest;

const BASE = '/OLYMPUS-asset-library/_responsive';

export function imageMeta(key: ImageKey) {
  return manifest[key];
}

export function srcSet(key: ImageKey, ext: 'webp' | 'jpg') {
  const m = manifest[key];
  return m.widths.map((w) => `${BASE}/${m.dir}/${key}-${w}.${ext} ${w}w`).join(', ');
}

export function fallbackSrc(key: ImageKey) {
  const m = manifest[key];
  const w = m.widths.find((x) => x >= 1000) ?? m.widths[m.widths.length - 1];
  return `${BASE}/${m.dir}/${key}-${w}.jpg`;
}

/** Master (untouched) asset paths, for SVG marks and logos. */
export const asset = (p: string) => `/OLYMPUS-asset-library/${p}`;
