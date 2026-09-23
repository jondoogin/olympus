import { Link, useParams } from 'react-router-dom';
import { projects } from '../content/site';
import { Picture } from '../components/Picture';
import { Label } from '../components/Label';
import { Reveal, Line } from '../components/Reveal';
import NotFound from './NotFound';

export default function ProjectPage() {
  const { slug } = useParams();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return <NotFound />;
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  return (
    <>
      <section className="case-hero" data-ink="obsidian">
        <div className="wrap grid">
          <Label n={String(i + 1).padStart(2, '0')} className="case-hero__label">{p.discipline} — {p.year}</Label>
          <Reveal as="h1" kind="lines" className="case-hero__title">
            <Line>{p.client}</Line>
          </Reveal>
          <p className="case-hero__line">{p.line}</p>
          <ul className="case-hero__scope">{p.scope.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </section>
      <figure className="case-media" data-ink="ivory">
        <Picture image={p.image} alt={p.alt} sizes="100vw" crop={p.crop} priority />
      </figure>
      <section className="section" data-ink="obsidian">
        <div className="wrap grid case-body">
          <Label className="case-body__label">Case study</Label>
          <div className="case-body__text">
            <p className="lead">Full case study in production.</p>
            <p>This is a concept project for a fictional client. The structure here — challenge, idea, craft, outcome — is the template future case studies will fill. No results are claimed because none exist yet.</p>
          </div>
        </div>
      </section>
      <section className="case-next" data-theme="dark" data-ink="ivory">
        <Link to={`/work/${next.slug}`} className="wrap case-next__link">
          <span className="label">Next project</span>
          <span className="case-next__name">{next.client}</span>
        </Link>
      </section>
    </>
  );
}
