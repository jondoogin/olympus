import { figures, manifesto } from '../content/site';
import { Label } from '../components/Label';
import { Picture } from '../components/Picture';
import { CropMarks } from '../components/CropMarks';
import { Reveal, Line } from '../components/Reveal';
import { useScrollProgress } from '../hooks/useScrollProgress';

export function Manifesto() {
  const figRef = useScrollProgress<HTMLElement>();
  return (
    <section className="manifesto section" data-ink="obsidian" aria-labelledby="manifesto-title">
      <div className="wrap grid">
        <Label n="01" className="manifesto__label">Manifesto</Label>
        <h2 id="manifesto-title" className="sr-only">Manifesto</h2>

        <div className="manifesto__body">
          {manifesto.map((m, i) => (
            <Reveal key={i} as="p" className="manifesto__stmt" threshold={0.6}>
              <span className="manifesto__plain">{m.t}</span>{' '}
              <em className="manifesto__em">{m.em}</em>
            </Reveal>
          ))}
        </div>

        <figure className="manifesto__fig" ref={figRef}>
          <div className="manifesto__frame">
            <Picture
              image="athens-columns"
              alt="Severe low-angle view of weathered Doric columns and marble steps under hard Mediterranean light."
              sizes="(min-width: 1100px) 26vw, (min-width: 768px) 40vw, 70vw"
              crop={{ mobile: '38% 50%', desktop: '30% 50%' }}
            />
            <CropMarks />
          </div>
          <figcaption>
            {figures.columns.caption}
            <span className="sys fig-note">{figures.columns.note}</span>
          </figcaption>
        </figure>

        <Reveal as="div" kind="lines" className="manifesto__sign">
          <p className="manifesto__we">
            <Line i={0}>We are</Line>
            <Line i={1}>Olympus.</Line>
          </p>
          <svg className="scroll-study" viewBox="0 0 240 150" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><ellipse cx="120" cy="75" rx="90" ry="52"/><ellipse cx="120" cy="75" rx="90" ry="20"/><path d="M20 75H220M120 12V138M64 31Q112 75 64 119M176 31Q128 75 176 119M188 14 118 78 139 78 52 137 111 75 92 75Z"/><path d="M20 25V15H30M210 15H220V25M20 125V135H30M210 135H220V125" opacity=".4"/></svg>
          <p className="manifesto__coda">
            A creative agency for a <em>more interesting</em> world.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
