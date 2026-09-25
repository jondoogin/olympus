// Generates responsive derivatives from the untouched master library.
// Masters: public/OLYMPUS-asset-library/**.png  →  derivatives: public/OLYMPUS-asset-library/_responsive/**
// Never upscales: widths above the master's native width are skipped.
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const LIB = 'public/OLYMPUS-asset-library';
const OUT = path.join(LIB, '_responsive');
const FOLDERS = ['03-hero', '04-people-and-atmosphere', '05-selected-work'];
const WIDTHS = [480, 800, 1200, 1600];

// Art-directed crops of existing masters (the source file stays unaltered).
const CROPS = [
  {
    name: 'zeus-portrait',
    src: '03-hero/zeus-blue-sky-hero.png',
    region: { left: 913, top: 0, width: 533, height: 800 },
  },
];

// Link-preview crops (1.91:1, the shape social cards use) of each project's lead image.
// Used as that case study's og:image. Never upscaled: width is capped at the master's.
// `top` places the band (0 = top edge of the image); without it, sharp picks the busiest region.
const SOCIAL = [
  { key: 'fashion-campaign', top: 0.1 },
  { key: 'architecture-campaign' },
  { key: 'culture-campaign', top: 0.04 },
  { key: 'technology-campaign' },
];

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function emit(input, outDir, base, nativeWidth) {
  await mkdir(outDir, { recursive: true });
  const widths = WIDTHS.filter((w) => w < nativeWidth);
  widths.push(nativeWidth);
  for (const w of widths) {
    const webp = path.join(outDir, `${base}-${w}.webp`);
    const jpg = path.join(outDir, `${base}-${w}.jpg`);
    if (!(await exists(webp))) await input().resize({ width: w }).webp({ quality: 78 }).toFile(webp);
    if (!(await exists(jpg))) await input().resize({ width: w }).jpeg({ quality: 80, mozjpeg: true }).toFile(jpg);
  }
  return widths;
}

const manifest = {};

for (const folder of FOLDERS) {
  const files = (await readdir(path.join(LIB, folder))).filter((f) => f.endsWith('.png'));
  for (const file of files) {
    const src = path.join(LIB, folder, file);
    const meta = await sharp(src).metadata();
    const base = file.replace(/\.png$/, '');
    const widths = await emit(() => sharp(src), path.join(OUT, folder), base, meta.width);
    manifest[base] = { dir: `${folder}`, width: meta.width, height: meta.height, widths };
    console.log(`${folder}/${file}  ${meta.width}×${meta.height}  →  ${widths.join(', ')}`);
  }
}

for (const c of CROPS) {
  const src = path.join(LIB, c.src);
  const widths = await emit(() => sharp(src).extract(c.region), path.join(OUT, 'crops'), c.name, c.region.width);
  manifest[c.name] = { dir: 'crops', width: c.region.width, height: c.region.height, widths };
  console.log(`crop ${c.name}  →  ${widths.join(', ')}`);
}

for (const { key, top } of SOCIAL) {
  const m = manifest[key];
  const src = path.join(LIB, m.dir, `${key}.png`);
  const width = Math.min(1200, m.width);
  const height = Math.round(width / 1.905);
  const outDir = path.join(OUT, 'social');
  const out = path.join(outDir, `${key}.jpg`);
  await mkdir(outDir, { recursive: true });
  if (!(await exists(out))) {
    const img = top === undefined
      ? sharp(src).resize({ width, height, fit: 'cover', position: sharp.strategy.attention })
      : sharp(src).resize({ width }).extract({ left: 0, top: Math.round(top * m.height * (width / m.width)), width, height });
    await img.jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  }
  m.social = { width, height };
  console.log(`social ${key}  →  ${width}×${height}`);
}

const { writeFile } = await import('node:fs/promises');
await writeFile('src/content/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('wrote src/content/image-manifest.json');
