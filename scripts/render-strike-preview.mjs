import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

// A deterministic raster export of the CSS/SVG introduction, one play only.
const out='output/identity-strike';
await mkdir(out,{recursive:true});
const svg=await readFile('public/identity/mark-01-animated.svg','utf8');
const browser=await chromium.launch();
try {
 const page=await browser.newPage({viewport:{width:600,height:600},deviceScaleFactor:1});
 await page.setContent(`<style>body{margin:0;background:#f4f1ea}svg{display:block;width:600px;height:600px}</style>${svg}`);
 await page.evaluate(()=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=0;}));
 const raw=[];
 for(let i=0;i<75;i++) {
  await page.evaluate(t=>document.getAnimations().forEach(a=>a.currentTime=t),i*40);
  const png=await page.screenshot();
  raw.push(await sharp(png).removeAlpha().raw().toBuffer());
  if(i===0)await writeFile(`${out}/before-strike.png`,png);
  if(i===21)await writeFile(`${out}/during-strike.png`,png);
  if(i===74)await writeFile(`${out}/struck-mark.png`,png);
 }
 await sharp(Buffer.concat(raw),{raw:{width:600,height:600*75,channels:3,pageHeight:600}})
  .gif({delay:Array(75).fill(40),loop:1,colours:128,dither:0.6}).toFile(`${out}/lightning-introduction.gif`);
 console.log(await sharp(`${out}/lightning-introduction.gif`,{animated:true}).metadata());
} finally { await browser.close(); }
