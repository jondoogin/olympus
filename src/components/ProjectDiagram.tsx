import { useId, useState } from 'react';
import { diagramContent, type Project } from '../content/site';
import { Label } from './Label';

// Measured paths with small asymmetries: the language of a working drawing.
export function DiagramDrawing({ slug, stage }: { slug: string; stage: number }) {
  const layer = (n: number) => ({ className: `diagram-layer ${stage === n ? 'is-active' : ''}` });
  return (
    <svg viewBox="0 0 640 420" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <g className="diagram-guides" strokeWidth=".7">
        <path d="M32 62V32H62M578 32H608V62M32 358V388H62M578 388H608V358M320 22V398M22 210H618" />
        <circle cx="320" cy="210" r="172" strokeDasharray="3 8" />
        <path d="M530 76h42m-21-21v42m-15-36 30 30m0-30-30 30" />
      </g>
      {slug === 'vela' && <>
        <g {...layer(0)}><path d="M194 65 160 119 187 190 135 350H288L245 190 272 119 238 65 216 82Z"/><path d="M335 65 312 119 339 190 298 350H461L403 190 430 119 390 65 365 82Z"/><path d="M216 82V350M365 82V350" strokeDasharray="4 5"/></g>
        <g {...layer(1)}><path d="M265 55 244 100 268 159 200 353H440L372 159 396 100 375 55 320 77Z"/><path d="M320 77 284 353M320 77 358 353M268 159Q320 191 372 159M244 100Q320 144 396 100"/></g>
        <g {...layer(2)}><path d="M293 60 267 115 287 171Q257 240 239 350H401Q383 240 353 171L373 115 347 60 320 76Z"/><path d="M290 185Q325 211 345 183M279 224Q324 245 362 221M270 266Q324 286 374 260M262 310Q324 333 386 298M320 78 300 345"/></g>
      </>}
      {slug === 'northline' && <>
        <g {...layer(0)}><path d="M135 73H505V342H135ZM135 113H505M215 73V222M425 73V222M135 222H255M385 222H505M255 342V273H385V342"/><path d="M155 130H196V200H155ZM444 130H485V200H444Z"/></g>
        <g {...layer(1)}><path d="M255 150H385V273H255ZM274 167H366V255H274Z"/><path d="M255 150 290 115H350L385 150M290 115V235M350 115V235" strokeDasharray="6 5"/></g>
        <g {...layer(2)}><path d="M320 383V299H185V244H288V197H350" strokeWidth="3"/><path d="m309 369 11 14 11-14m8-183 11 11-11 11"/><circle cx="185" cy="299" r="14"/><path d="M100 342H235M100 356H235M100 370H235"/></g>
      </>}
      {slug === 'helio' && <>
        <g {...layer(0)}><path d="M130 320H510M165 320V245H235V320M405 320V245H475V320M130 350H510M275 350V310H365V350"/><path d="M200 245V220M440 245V220M185 230h30m210 0h30"/></g>
        <g {...layer(1)}><circle cx="320" cy="218" r="88"/><circle cx="320" cy="218" r="105"/><path d="M115 265H525M115 285H525M115 305H525M115 325H525"/><path d="M320 88V66M212 125 195 109M428 125 445 109M171 218H149M469 218H491"/></g>
        <g {...layer(2)}><path d="M190 285V195H450V285ZM220 285V218H420V285M260 218V285M300 218V285M340 218V285M380 218V285M210 300H430M245 320H395"/><path d="M320 195 320 89M220 195 174 108M420 195 466 108M190 240 105 211M450 240 535 211"/></g>
      </>}
      {slug === 'aura' && <>
        <g {...layer(0)}><ellipse cx="320" cy="151" rx="104" ry="45"/><path d="M216 151V291C216 351 424 351 424 291V151"/><ellipse cx="320" cy="291" rx="104" ry="45"/><path d="M232 174V300M245 180V313M260 187V323M277 192V330M296 195V334M320 196V336M344 195V334M363 192V330M380 187V323M395 180V313M408 174V300" strokeWidth=".7"/></g>
        <g {...layer(1)}><ellipse cx="320" cy="105" rx="104" ry="45"/><ellipse cx="320" cy="105" rx="82" ry="32"/><path d="M216 105V126C216 186 424 186 424 126V105M320 65V83M365 69 358 86"/><path d="M453 75q36 30 0 60m-8-2 8 2 2-9"/></g>
        <g {...layer(2)}><path d="M195 183Q163 235 195 287M165 159Q113 235 165 311M135 135Q63 235 135 335M445 183Q477 235 445 287M475 159Q527 235 475 311M505 135Q577 235 505 335"/><circle cx="320" cy="235" r="12"/></g>
      </>}
      {slug === 'thalassa' && <>
        <g {...layer(0)}><path d="M95 100q55-55 94 5l-18 43-47 7-29-55ZM431 83q75-26 95 47l-39 32-48-10-8-69ZM281 263q56-26 80 32l-19 56-57-5-25-47Z"/><path d="M110 102q35-29 60 8m274-10q48-9 60 32m-215 151q35-15 53 16"/></g>
        <g {...layer(1)}><path d="M155 143Q283 29 461 145Q407 222 326 291Q233 310 155 143" strokeDasharray="7 6"/><circle cx="155" cy="143" r="8"/><circle cx="461" cy="145" r="8"/><circle cx="326" cy="291" r="8"/><path d="m292 78 17-2-8 15m99 144-5 16-11-12"/></g>
        <g {...layer(2)}><path d="M200 209H399L374 252H229ZM233 209V181H354V209M259 181V155H319V181M279 155V131M190 266q25-16 50 0t50 0t50 0t50 0"/><path d="M248 193h15m14 0h15m14 0h15m14 0h10"/></g>
      </>}
      {slug === 'orison' && <>
        <g {...layer(0)}><path d="M178 340V167a142 142 0 0 1 284 0V340ZM207 340V169a113 113 0 0 1 226 0V340M155 340H485M241 340V265H399V340"/><path d="M260 287H379M260 305H379"/></g>
        <g {...layer(1)}><ellipse cx="320" cy="239" rx="115" ry="53"/><ellipse cx="320" cy="239" rx="97" ry="44"/><ellipse cx="320" cy="239" rx="77" ry="34"/><ellipse cx="320" cy="239" rx="51" ry="23"/><ellipse cx="320" cy="239" rx="10" ry="5"/><path d="M433 200 385 246 365 244M433 200V184"/></g>
        <g {...layer(2)}><circle cx="320" cy="202" r="45"/><path d="M248 161a84 84 0 0 0 0 82m144-82a84 84 0 0 1 0 82M219 132a123 123 0 0 0 0 140m202-140a123 123 0 0 1 0 140M188 105a162 162 0 0 0 0 194m264-194a162 162 0 0 1 0 194M272 337H368"/></g>
      </>}
      {slug === 'fieldwork' && <>
        <g {...layer(0)}><path d="M172 283Q133 181 196 116Q273 157 233 250Q213 286 172 283ZM291 314Q258 196 326 99Q401 198 369 314ZM427 278Q386 209 441 144Q514 204 474 274Z"/><path d="M196 116 172 283M326 99V314M441 144 427 278"/></g>
        <g {...layer(1)}><path d="M320 351Q301 219 323 120M315 251Q253 250 235 196Q296 185 315 251ZM321 220Q381 216 404 155Q339 156 321 220ZM320 165 267 93M320 165 291 79M320 165 327 65M320 165 359 79M320 165 390 105"/><circle cx="267" cy="93" r="7"/><circle cx="291" cy="79" r="7"/><circle cx="327" cy="65" r="7"/><circle cx="359" cy="79" r="7"/><circle cx="390" cy="105" r="7"/></g>
        <g {...layer(2)}><path d="M172 113H345V345H172ZM172 113 258 183 345 113M194 268H321M194 283H287M378 178H460V286H378Z"/><path d="M399 225q20-27 40 0q-20 28-40 0ZM416 207V247M363 312q62 29 104-6m-2 13 2-13-13 2"/></g>
      </>}
    </svg>
  );
}

export function ProjectDiagram({ project }: { project: Project }) {
  const [stage, setStage] = useState(0);
  const id = useId();
  const content = diagramContent[project.slug];
  if (!content) return null;
  return (
    <section className="project-diagram section" data-ink="obsidian" aria-labelledby={`${id}-title`}>
      <div className="wrap project-diagram__grid">
        <div className="project-diagram__head">
          <Label>{content.label}</Label>
          <h2 id={`${id}-title`}>{content.title}</h2>
          <p>{content.intro}</p>
        </div>
        <figure className="project-diagram__plate" data-stage={stage}>
          <DiagramDrawing slug={project.slug} stage={stage} />
          <figcaption className="sys">{content.caption}</figcaption>
        </figure>
        <div className="project-diagram__controls">
          <div className="project-diagram__buttons" role="group" aria-label={content.controls}>
            {content.stages.map((s, i) => <button key={s.name} type="button" aria-pressed={stage === i} aria-controls={`${id}-note`} onClick={() => setStage(i)}><span className="sys">{String(i + 1).padStart(2, '0')}</span>{s.name}<span aria-hidden="true">↗</span></button>)}
          </div>
          <p id={`${id}-note`} className="project-diagram__note" aria-live="polite">{content.stages[stage].body}</p>
        </div>
      </div>
    </section>
  );
}
