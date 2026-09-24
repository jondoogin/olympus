import { Link } from 'react-router-dom';
import { projects, workNote, type Project } from '../content/site';
import { Label } from '../components/Label';
import { Picture } from '../components/Picture';
import { Reveal } from '../components/Reveal';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { greekNumeral } from '../lib/antiquity';

const SIZES: Record<Project['layout'], string> = {
  'portrait-left': '(min-width: 1100px) 46vw, (min-width: 768px) 60vw, 100vw',
  bleed: '100vw',
  'square-right': '(min-width: 1100px) 55vw, (min-width: 768px) 70vw, 100vw',
  offset: '(min-width: 1100px) 64vw, (min-width: 768px) 80vw, 100vw',
};

export function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <article className={`proj proj--${p.layout}`} ref={ref}>
      <Link to={`/work/${p.slug}`} className="proj__link" aria-label={`${p.client} — ${p.discipline}, ${p.year}. View project`}>
        <Reveal kind="wipe" className="proj__frame">
          <Picture image={p.image} alt={p.alt} sizes={SIZES[p.layout]} crop={p.crop} />
          <span className="proj__view" aria-hidden="true">View project</span>
        </Reveal>
        <Reveal className="proj__meta" kind="fade" threshold={0.1}>
          <span className="proj__n" aria-hidden="true">{greekNumeral(i + 1)}</span>
          <h3 className="proj__client">{p.client}</h3>
          <p className="proj__disc">
            <span>{p.discipline}</span>
            <span>{p.year}</span>
          </p>
          <p className="proj__line">{p.line}</p>
          <ul className="proj__scope" aria-label="Scope">
            {p.scope.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </Reveal>
      </Link>
    </article>
  );
}

export function Work() {
  return (
    <section className="work section" id="work" data-ink="obsidian" aria-labelledby="work-title">
      <div className="wrap grid work__head">
        <Label n="02" className="work__label">Selected work</Label>
        <Reveal as="h2" id="work-title" kind="fade" className="work__title">
          Selected <em>work</em>
          <sup>(04)</sup>
        </Reveal>
        <p className="work__note">{workNote}</p>
      </div>
      <div className="work__list">
        {projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
      </div>
      <div className="wrap work__more">
        <Link to="/work" className="textlink">All work, eventually <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
