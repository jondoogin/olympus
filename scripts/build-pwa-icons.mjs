// Renders the Olympus home-screen icon set from one vector master.
// The mark is the selected S18 struck O (geometry from public/identity/favicon.svg),
// set ivory on obsidian with the gold bolt. Icons are full-bleed squares: iOS and
// Android apply their own corner mask, so no rounding is baked in.
// Run: npm run icons  → public/pwa/*.png + public/pwa/icon.svg
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const OBSIDIAN = '#080808', MARBLE = '#f4f1ea', GOLD = '#d4af37';
const BOLT = 'M184 8 136 82H155L16 192 64 118H45Z';
const O = 'M28 100a72 80 0 1 0 144 0a72 80 0 1 0-144 0ZM52 100a48 58 0 1 0 96 0a48 58 0 1 0-96 0Z';

/** scale: share of the canvas the 200-unit mark occupies. */
function icon(scale, { id = 'cut' } = {}) {
  const s = (1024 * scale) / 200, off = (1024 - 200 * s) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
<defs>
  <radialGradient id="g" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="#1b1a17"/><stop offset="1" stop-color="${OBSIDIAN}"/></radialGradient>
  <mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200"><rect width="200" height="200" fill="#fff"/><path d="${BOLT}" stroke="#000" stroke-width="7" stroke-linejoin="miter"/><path d="M153 48 171 57 153 63ZM47 152 29 143 47 137Z"/></mask>
</defs>
<rect width="1024" height="1024" fill="url(#g)"/>
<g transform="translate(${off} ${off}) scale(${s})">
  <path d="${O}" fill-rule="evenodd" fill="${MARBLE}" mask="url(#${id})"/>
  <path d="${BOLT}" fill="${GOLD}"/>
</g>
</svg>`;
}

const OUT = 'public/pwa';
await mkdir(OUT, { recursive: true });
const standard = icon(0.66);   // generous margin reads well beside native icons
const maskable = icon(0.52);   // keeps the bolt tips inside the 80% maskable safe zone
await writeFile(`${OUT}/icon.svg`, standard);
const jobs = [
  [standard, 'apple-touch-icon.png', 180],
  [standard, 'icon-192.png', 192],
  [standard, 'icon-512.png', 512],
  [maskable, 'icon-maskable-192.png', 192],
  [maskable, 'icon-maskable-512.png', 512],
  [standard, 'favicon-32.png', 32],
];
for (const [svg, name, size] of jobs) {
  // Flatten: Apple touch icons must be opaque or iOS fills the transparency with black.
  await sharp(Buffer.from(svg)).resize(size, size).flatten({ background: OBSIDIAN }).png({ compressionLevel: 9 }).toFile(`${OUT}/${name}`);
}
console.log(`Wrote ${jobs.length} icons to ${OUT}/`);
