import { figures, proof, proofFacts } from '../content/site';
import { greekNumeral } from '../lib/antiquity';
import { Label } from '../components/Label';
import { Picture } from '../components/Picture';
import { Reveal } from '../components/Reveal';
import { useScrollProgress } from '../hooks/useScrollProgress';

export function Pause() {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section className="pause" ref={ref} data-ink="obsidian" aria-label="Interlude">
      <div className="pause__media">
        <Picture
          image="athens-clouds"
          alt="A jagged white marble architectural fragment on a rooftop beneath towering cumulus clouds, the city of Athens far below."
          sizes="100vw"
          crop={{ mobile: '22% 60%', tablet: '30% 55%', desktop: '50% 55%' }}
        />
      </div>
      <p className="pause__quote">
        The view is better <em>from up here.</em>
        <span>The work is, too.</span>
      </p>
      <p className="pause__fig">
        {figures.clouds.caption}
        <span className="sys fig-note">{figures.clouds.note}</span>
      </p>
    </section>
  );
}

export function Proof() {
  return (
    <section className="proof section" data-ink="obsidian" aria-labelledby="proof-title">
      <div className="wrap grid">
        <Label n="05" className="proof__label">In numbers</Label>
        <h2 id="proof-title" className="sr-only">Olympus in numbers</h2>
        <Reveal as="ul" kind="lines" className="proof__nums">
          {proof.map((p, i) => (
            <li key={p.label} className="proof__item">
              <span className="line" style={{ ['--i' as string]: i }}>
                <span className="line__inner proof__n">{p.n}</span>
              </span>
              <span className="proof__l">
                <span className="inscr proof__greek" aria-hidden="true">{greekNumeral(p.n)}</span>
                {p.label}
              </span>
            </li>
          ))}
        </Reveal>
        <dl className="proof__facts">
          {proofFacts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.body}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
