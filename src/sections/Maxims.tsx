import { maxims, maximsIntro } from '../content/site';
import { Label } from '../components/Label';
import { Reveal } from '../components/Reveal';
import { greekNumeral } from '../lib/antiquity';

/** House rules Βʹ–Δʹ: the Delphic maxims, carved, translated, annotated. */
export function Maxims() {
  return (
    <section className="maxims section" data-ink="obsidian" aria-labelledby="maxims-title">
      <div className="wrap grid">
        <div className="maxims__head">
          <Label>House rules</Label>
          <h2 id="maxims-title" className="maxims__title">
            {maximsIntro.title} <em>{maximsIntro.em}</em>
          </h2>
          <p className="maxims__note">{maximsIntro.note}</p>
        </div>
        <ol className="maxims__list">
          {maxims.map((m, i) => (
            <Reveal as="li" key={m.greek} className="maxim" threshold={0.4}>
              <span className="maxim__n inscr" aria-hidden="true">{greekNumeral(i + 2)}</span>
              <p className="maxim__greek inscr" lang="grc" aria-hidden="true">{m.greek}</p>
              <p className="maxim__en">{m.english}</p>
              <p className="maxim__note">{m.note}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
