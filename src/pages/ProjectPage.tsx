import { Link, useParams } from 'react-router-dom';
import { conceptNotice, projects, type Project } from '../content/site';
import { Picture } from '../components/Picture';
import { Label } from '../components/Label';
import { Reveal, Line } from '../components/Reveal';
import { greekNumeral } from '../lib/antiquity';
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
          <p className="case-hero__concept sys">{conceptNotice}</p>
          <p className="case-hero__line">{p.line}</p>
          <ul className="case-hero__scope">{p.scope.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </section>
      <figure className="case-media" data-ink="ivory">
        <Picture image={p.image} alt={p.alt} sizes="100vw" crop={p.crop} priority />
      </figure>
      {p.caseStudy ? <CaseStory story={p.caseStudy} /> : (
        <section className="section" data-ink="obsidian">
          <div className="wrap grid case-body">
            <Label className="case-body__label">Case study</Label>
            <div className="case-body__text">
              <p className="lead">Full case study in production.</p>
              <p>This is a concept project for a fictional client. The structure here — challenge, idea, craft, outcome — is the template future case studies will fill. No results are claimed because none exist yet.</p>
            </div>
          </div>
        </section>
      )}
      <section className="case-next" data-theme="dark" data-ink="ivory">
        <Link to={`/work/${next.slug}`} className="wrap case-next__link">
          <span className="label">Next project</span>
          <span className="case-next__name">{next.client}</span>
        </Link>
      </section>
    </>
  );
}

function CaseStory({ story }: { story: NonNullable<Project['caseStudy']> }) {
  return (
    <>
      <section className="case-brief section" data-ink="obsidian" aria-labelledby="case-brief-title">
        <div className="wrap grid">
          <Label className="case-brief__label">{story.brief.label}</Label>
          <h2 className="case-brief__title" id="case-brief-title">{story.brief.title}</h2>
          <p className="case-brief__body">{story.brief.body}</p>
        </div>
      </section>
      <section className="case-idea" data-theme="dark" data-ink="ivory" aria-labelledby="case-idea-title">
        <div className="wrap case-idea__inner">
          <Label>{story.idea.label}</Label>
          <h2 className="case-idea__statement" id="case-idea-title">{story.idea.statement}</h2>
          <p className="case-idea__body">{story.idea.body}</p>
        </div>
      </section>
      <section className="case-system section" data-ink="obsidian" aria-labelledby="case-system-title">
        <div className="wrap grid">
          <Label className="case-system__label">{story.system.label}</Label>
          <div className="case-system__content">
            <h2 id="case-system-title">{story.system.title}</h2>
            <p>{story.system.body}</p>
            <ol className="case-system__principles">
              {story.system.principles.map((principle, index) => (
                <li key={principle}>
                  <span className="case-system__numeral" aria-hidden="true">{greekNumeral(index + 1)}</span>
                  <span className="sr-only">{index + 1}. </span>{principle}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="case-outcome section" data-theme="stone" data-ink="obsidian" aria-labelledby="case-outcome-title">
        <div className="wrap grid">
          <Label className="case-outcome__label">{story.outcome.label}</Label>
          <h2 id="case-outcome-title">{story.outcome.title}</h2>
          <p>{story.outcome.body}</p>
        </div>
      </section>
    </>
  );
}
