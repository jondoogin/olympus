import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const browser=await chromium.launch();
const base=process.env.OLYMPUS_REVIEW_URL||'http://127.0.0.1:5173';
const expect=(value,message)=>{if(!value)throw Error(message);};
await mkdir('check-results',{recursive:true});
async function freeze(page,time) {
 await page.evaluate(t=>document.getAnimations().filter(a=>a.timeline===document.timeline).forEach(a=>{a.pause();a.currentTime=t;}),time);
}
async function state(page,root) {
 return page.locator(root).evaluate(el=>({
  intact:getComputedStyle(el.querySelector('.strike-intact')).opacity,
  cut:getComputedStyle(el.querySelector('.strike-cut')).opacity,
  bolt:getComputedStyle(el.querySelector('.strike-bolt')).opacity,
  flare:getComputedStyle(el.querySelector('.strike-flare')).opacity,
  bounds:JSON.stringify(el.querySelector('.strike-intact').getBoundingClientRect().toJSON()),
 }));
}
try {
 for(const width of [1440,1024,768,390]) {
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}/`,{waitUntil:'networkidle'});
  await freeze(page,4200);
  const logo=page.locator('.site-header .logo').first();
  await logo.evaluate(el=>el.getAnimations({subtree:true}).forEach(a=>a.currentTime=0));
  const before=await state(page,'.site-header .logo');
  expect(before.intact==='1'&&before.bolt==='0'&&before.cut==='0',`@${width}: opening does not show an intact O alone`);
  await logo.evaluate(el=>el.getAnimations({subtree:true}).forEach(a=>a.currentTime=2200));
  const impact=await state(page,'.site-header .logo');
  expect(impact.cut==='1'&&impact.bolt==='1'&&Number(impact.flare)>0,`@${width}: impact missing`);
  await logo.evaluate(el=>el.getAnimations({subtree:true}).forEach(a=>a.currentTime=3500));
  const after=await state(page,'.site-header .logo');
  expect(after.intact==='0'&&after.cut==='1'&&after.bolt==='1'&&after.flare==='0',`@${width}: final mark missing`);
  expect(before.bounds===after.bounds,`@${width}: O moved during strike`);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),`@${width}: overflow`);
  expect(await page.evaluate(()=>{const ids=[...document.querySelectorAll('.logo svg [id]')].map(e=>e.id);return ids.length===new Set(ids).size;}),`@${width}: duplicate SVG IDs`);
  await page.screenshot({path:`check-results/strike-header-${width}.png`});
  if(width===1440) {
   const original=await logo.elementHandle();
   await page.locator('.site-header__nav a[href="/work"]').click();
   await page.waitForURL('**/work');
   expect(await logo.evaluate((el,old)=>el===old,original),'route navigation restarted logo mount');
  }
  expect(!errors.length,errors.join('; '));await page.close();
 }
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await reduced.goto(`${base}/`,{waitUntil:'networkidle'});
 const still=await state(reduced,'.site-header .logo');
 expect(still.bolt==='1'&&still.cut==='1'&&still.intact==='0'&&still.flare==='0','reduced motion does not show final still');
 expect(await reduced.locator('.site-header .logo').evaluate(el=>el.getAnimations({subtree:true}).length===0),'reduced motion still animates');
 await reduced.goto(`${base}/identity/strike.html`);
 expect(await reduced.locator('#replay').isHidden(),'reduced-motion preview exposes replay');
 expect((await state(reduced,'#stage')).bolt==='1','reduced-motion standalone SVG missing');await reduced.close();
 const preview=await browser.newPage({viewport:{width:1440,height:1000}});
 await preview.goto(`${base}/identity/strike.html`,{waitUntil:'networkidle'});
 await freeze(preview,2000);
 await preview.locator('#replay').click();await freeze(preview,0);
 expect((await state(preview,'#stage')).bolt==='0','replay does not return to static O');
 await freeze(preview,2000);
 expect((await state(preview,'#stage')).cut==='1','replay does not finish');
 await preview.screenshot({path:'output/identity-strike/review-desktop.png',fullPage:true});
 for(const width of [1024,768,390]) {
  await preview.setViewportSize({width,height:900});
  expect(await preview.evaluate(()=>document.documentElement.scrollWidth===innerWidth),`preview @${width}: overflow`);
 }
 await preview.close();
 console.log('Identity check passed: 4 widths, opening/impact/final states, stationary O, SVG IDs, persistent header, replay and reduced motion.');
} finally {await browser.close();}
