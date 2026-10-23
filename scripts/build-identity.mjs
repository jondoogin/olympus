import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { strikeSvg, strikeMarkup, strikeCss } from './strike-mark.mjs';
import { buildStrikePreview } from './build-strike-preview.mjs';
const out = 'public/identity';
await mkdir(out,{recursive:true});
const bolts = [
  'M176 14 93 102 118 102 24 186 87 101 63 101Z',
  'M181 22 104 91 132 91 19 178 89 110 65 110Z',
  'M165 10 84 106 111 106 35 190 99 94 74 94Z',
  'M182 18 96 88 125 98 18 182 84 111 57 101Z',
];
const names = ['Spear','Horizon','Lance','Fault','Split','Strike','Wedge','Rift','Etching','Meridian','Scribe','Compass','Signet','Medallion','Imprint','Coin'];
function seal(j){
 if(j===0)return '<path fill-rule="evenodd" fill="#080808" d="M68 18H132L180 66V134L132 182H68L20 134V66ZM78 43 45 77V123L78 157H122L155 123V77L122 43Z"/>';
 if(j===1)return '<circle cx="100" cy="100" r="88" fill="none" stroke="#080808" stroke-width="2"/><circle cx="100" cy="100" r="69" fill="none" stroke="#080808" stroke-width="24"/>';
 if(j===2)return '<rect x="37" y="20" width="126" height="160" rx="55" fill="none" stroke="#080808" stroke-width="23"/>';
 return '<circle cx="100" cy="100" r="88" fill="none" stroke="#080808" stroke-width="2"/><circle cx="100" cy="100" r="66" fill="none" stroke="#080808" stroke-width="22"/>'+Array.from({length:24},(_,k)=>'<path d="M100 11v7" stroke="#080808" stroke-width="2" transform="rotate('+k*15+' 100 100)"/>').join('');
}
function ring(rx,ry,ix,iy){return `<path fill-rule="evenodd" d="M${100-rx} 100a${rx} ${ry} 0 1 0 ${rx*2} 0a${rx} ${ry} 0 1 0 -${rx*2} 0ZM${100-ix} 100a${ix} ${iy} 0 1 0 ${ix*2} 0a${ix} ${iy} 0 1 0 -${ix*2} 0Z"/>`;}
const specs = [];
for(let i=0;i<16;i++){
 const family=Math.floor(i/4),j=i%4,id=String(i+1).padStart(2,'0');
 const bolt=bolts[j];
 const body = family===0 ? `<g fill="#080808">${ring(72-j*3,80,48-j*4,58)}<path d="${bolt}" fill="#d4af37"/></g>`
 : family===1 ? `<defs><mask id="cut-${id}"><rect width="200" height="200" fill="white"/><path d="${bolt}" fill="black" stroke="black" stroke-width="7" stroke-linejoin="miter"/></mask></defs><g fill="#080808" mask="url(#cut-${id})">${ring(75-j*3,80,45-j*2,53)}</g><path d="${bolt}" fill="#080808"/>`
 : family===2 ? `<g fill="none" stroke="#080808" stroke-width="${j===2?2.5:4}"><ellipse cx="100" cy="100" rx="${72-j*4}" ry="80"/>${j===1||j===3?'<ellipse cx="100" cy="100" rx="58" ry="65"/>':''}<path d="${bolt}" fill="${j===0||j===3?'#080808':'#f4f1ea'}" stroke-width="3"/></g>`
 : `${seal(j)}<path d="${bolt}" fill="#080808" stroke="#f4f1ea" stroke-width="${j===2?8:5}" paint-order="stroke"/>`;
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Olympus ${names[i]} mark">${body}</svg>`;
 if(i===0) svg=strikeSvg({id:'study-01'});
 await writeFile(`${out}/mark-${id}.svg`,svg); specs.push({id,name:names[i],family:['Solid','Cut','Engraved','Seal'][family],svg});
}
const favicon = (await readFile(`${out}/mark-01.svg`, 'utf8')).replace(/(<svg[^>]*>)/, '$1<rect width="200" height="200" rx="20" fill="#f4f1ea"/>');
await writeFile(`${out}/favicon.svg`, favicon);
// The chosen O is now canonical in the wordmark; six other letter outlines stay intact.
for(const variant of ['wordmark-gold-bolt','primary']){
 const source=await readFile(`public/OLYMPUS-asset-library/01-logo/olympus-${variant}.svg`,'utf8');
 for(const animated of [false,true]) {
  const id=`olympus-${variant}${animated?'-motion':''}`;
  let svg=source.replace(/<path d="[^"]*" fill="#080808"\/>/, `<g transform="translate(13.65 27) scale(.69)">${strikeMarkup(id,animated)}</g>`);
  svg=svg.replace(/<path transform="[^"]*" d="[^"]*" fill="#D4AF37"\/>/,'');
  svg=svg.replace(/<text[^>]*>Δ \/ ΟΛΥΜΠΟΣ<\/text>/,'');
  if(animated) svg=svg.replace(/(<svg[^>]*>)/,`$1<style>${strikeCss}</style>`);
  await writeFile(`src/assets/identity/olympus-${variant}${animated?'-animated':''}.svg`,svg);
 }
}
await writeFile(`${out}/mark-01-struck.svg`,strikeSvg());
await writeFile(`${out}/mark-01-struck-mono.svg`,strikeSvg({mono:true}));
await writeFile(`${out}/mark-01-animated.svg`,strikeSvg({animated:true}));
const cards=specs.map(s=>`<button class="card" data-id="${s.id}" aria-label="Preview ${s.id} ${s.name}"><span class="top">${s.id} / ${s.family}</span><div class="art">${s.svg}</div><strong>${s.name}</strong><div class="sizes">${[16,24,32].map(w=>`<img src="mark-${s.id}.svg" width="${w}" height="${w}" alt=""/>`).join('')}</div></button>`).join('');
await writeFile(`${out}/index.html`,`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>OLYMPUS — 16 marks</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f1ea;color:#080808;font-family:Arial,sans-serif}header{padding:48px 4vw 32px;border-bottom:1px solid #08080830}h1{font-size:clamp(36px,5vw,72px);letter-spacing:-.06em;margin:12px 0}p{max-width:680px;line-height:1.5}.grid{display:grid;grid-template-columns:repeat(4,1fr);padding:32px 4vw;gap:1px;background:#cfc8b9}.card{text-align:left;border:0;padding:22px;background:#f4f1ea;color:inherit;cursor:pointer}.top{font-size:11px;text-transform:uppercase;letter-spacing:.13em}.art{height:180px;display:grid;place-items:center;margin:14px 0}.art svg{height:160px;width:160px}strong{font-size:18px;font-weight:500}.sizes{display:flex;align-items:center;gap:16px;height:48px;margin-top:14px}.card:focus-visible{outline:3px solid #2563eb;outline-offset:-4px}footer{padding:24px 4vw}dialog{width:min(780px,95vw);border:1px solid #cfc8b9;background:#f4f1ea;padding:32px}dialog::backdrop{background:#080808aa}.preview{display:grid;grid-template-columns:1fr 1fr;gap:16px}.preview>div{display:grid;place-items:center;padding:30px;min-height:230px}.preview svg{width:170px}.reverse{background:#080808}.reverse svg [fill="#080808"]{fill:#f4f1ea}.reverse svg [stroke="#080808"]{stroke:#f4f1ea}.reverse svg [fill="#f4f1ea"]{fill:#080808}.reverse svg [stroke="#f4f1ea"]{stroke:#080808}.wax{background:#733827;border-radius:50%;width:200px;height:200px;box-shadow:inset 0 3px 9px #0005,0 4px 12px #0002}.wax svg{width:130px;opacity:.6;filter:drop-shadow(0 1px 1px #f2ba7866)}.paper{background:#ebe6db}.paper svg{width:80px}dialog a,dialog button{display:inline-block;margin:24px 24px 0 0;color:inherit;font:inherit} @media(max-width:700px){.grid{grid-template-columns:repeat(2,1fr)}.art{height:140px}.art svg{width:120px}.preview>div{padding:12px;min-height:180px}.wax{width:140px;height:140px}.preview svg{width:100px}}</style><header><span>OLYMPUS / IDENTITY STUDIES / 2026</span><h1>One O. Sixteen strikes.</h1><p>Four families of secondary marks. Each bolt crosses the O from edge to edge. Select a study to inspect its silhouette, reversed use, paper impression and wax-seal simulation. Small marks below each study are shown at 16, 24 and 32 pixels.</p><p>01 is the selected direction, refined with a broader bolt and two fractured intersections. <a href="strike.html">Preview the lightning-strike introduction →</a> These are design studies; seal engraving requires a physical production proof.</p></header><main class="grid">${cards}</main><footer>Original assets preserved. All sixteen studies are downloadable SVG vectors.</footer><dialog><h2 id="name"></h2><div class="preview"></div><a id="download" download>Download SVG</a><button id="close">Close preview</button></dialog><script>const dialog=document.querySelector('dialog');document.querySelectorAll('.card').forEach(card=>card.onclick=()=>{document.querySelector('#name').textContent=card.dataset.id+' / '+card.querySelector('strong').textContent;const svg=card.querySelector('svg').outerHTML;document.querySelector('.preview').innerHTML='<div>'+svg+'</div><div class="reverse">'+svg+'</div><div class="paper">'+svg+'</div><div><div class="wax">'+svg+'</div></div>';document.querySelector('#download').href='mark-'+card.dataset.id+'.svg';dialog.showModal()});document.querySelector('#close').onclick=()=>dialog.close();</script></html>`);

await buildStrikePreview(out);
