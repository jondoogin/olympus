import { createServer } from 'vite';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { DiagramDrawing } = await server.ssrLoadModule('/src/components/ProjectDiagram.tsx');
  const { projects } = await server.ssrLoadModule('/src/content/site.ts');
  for(const slug of ['thalassa','orison','fieldwork']) {
    const p=projects.find(p=>p.slug===slug);
    const bg={thalassa:'#163d63',orison:'#6b3329',fieldwork:'#344b3b'}[slug];
    let drawing=renderToStaticMarkup(createElement(DiagramDrawing,{slug,stage:2}));
    drawing=drawing.replace('<svg ', '<svg x="90" y="450" width="1020" height="670" ');
    const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600"><style>.diagram-guides{opacity:.25}.diagram-layer{opacity:.2}.diagram-layer.is-active{opacity:1}text{font-family:Arial,sans-serif}</style><rect width="1200" height="1600" fill="${bg}"/><g fill="#f4f1ea"><text x="90" y="120" font-size="20" letter-spacing="4">${escape(p.application.label.toUpperCase())}</text><text x="78" y="315" font-size="${slug==='fieldwork'?147:slug==='thalassa'?161:210}" letter-spacing="-8" font-weight="600">${p.client}</text><text x="90" y="385" font-size="34">${escape(p.application.subtitle)}</text></g><g color="#f4f1ea">${drawing}</g><g fill="#f4f1ea">${p.application.rows.map(([label,value],i)=>`<text x="90" y="${1190+i*95}" font-size="19" letter-spacing="2">${escape(label)}</text><text x="90" y="${1227+i*95}" font-size="28">${escape(value)}</text>`).join('')}<text x="90" y="1515" font-size="18">OLYMPUS / FICTIONAL IDENTITY STUDY / 2026</text></g><path d="M90 154H1110M90 1135H1110M90 1450H1110" stroke="#f4f1ea" stroke-width="1" opacity=".4"/></svg>`;
    await writeFile(`public/identity/${slug}-identity.svg`,svg);
    await sharp(Buffer.from(svg)).png().toFile(`public/OLYMPUS-asset-library/05-selected-work/${slug}-identity.png`);
  }
} finally { await server.close(); }
