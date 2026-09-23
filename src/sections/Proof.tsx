import { collaborators, proof } from '../content/site';
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
      <p className="pause__fig">Fig. 2 — The commute.</p>
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
              <span className="proof__l">{p.label}</span>
            </li>
          ))}
        </Reveal>
        <dl className="proof__facts">
          <div>
            <dt>Status</dt>
            <dd>Independent since 2026. No holding company. Nobody above us, structurally or otherwise.</dd>
          </div>
          <div>
            <dt>Collaborators</dt>
            <dd>A trusted network of directors, makers and specialists in {collaborators.slice(0, -1).join(', ')} and {collaborators.at(-1)}.</dd>
          </div>
          <div>
            <dt>Working model</dt>
            <dd>Senior people on every brief, from the first meeting to the final file. We don’t do the pitch-and-vanish.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
