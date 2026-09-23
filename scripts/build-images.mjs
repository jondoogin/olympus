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

const { writeFile } = await import('node:fs/promises');
await writeFile('src/content/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('wrote src/content/image-manifest.json');
