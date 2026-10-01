import { Link, useParams } from 'react-router-dom';
import { interior, pantheon, projects } from '../content/site';
import { Picture } from '../components/Picture';
import { Label } from '../components/Label';
import { Reveal, Line } from '../components/Reveal';
import { greekNumeral } from '../lib/antiquity';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useFocusBand } from '../hooks/useFocusBand';
import NotFound from './NotFound';

const copy = interior.people.dossier;

/** One partner's dossier: portrait, profile, the record, their own rules, and the concept work they shaped. */
export default function PersonPage() {
  const portraitRef = useScrollProgress<HTMLElement>();
  const rulesRef = useScrollProgress<HTMLElement>();
  const nextRef = useFocusBand<HTMLAnchorElement>();
  const { slug } = useParams();
  const i = pantheon.findIndex((g) => g.slug === slug);
  if (i < 0) return <NotFound />;
  const god = pantheon[i];
  const next = pantheon[(i + 1) % pantheon.length];
  const d = god.dossier;
  const work = d.work.map((w) => ({ ...w, project: projects.find((p) => p.slug === w.slug)! }));

  return (
    <div className="person-page" data-person={god.slug}>
      <section className="person-hero" data-ink="obsidian">
        <div className="wrap person-hero__grid">
          <div className="person-hero__copy">
            <Label n={interior.people.n}>{interior.people.label} — {god.role}</Label>
            <Reveal as="h1" kind="lines" className="person-hero__name">
              <Line>{god.name}</Line>
            </Reveal>
            <p className="person-hero__line"><em>{god.line}</em></p>
            <p className="person-hero__notice sys">{copy.notice}</p>
          </div>
          <figure className="person-hero__portrait" data-accent={god.accent} ref={portraitRef}>
            <Picture image={god.image} alt={god.alt} crop={god.crop} sizes="(min-width: 1100px) 40vw, (min-width: 768px) 46vw, 100vw" priority />
          </figure>
        </div>
      </section>

      <section className="person-profile section" data-ink="obsidian" aria-labelledby="person-profile-title">
        <div className="wrap grid">
          <Label className="person-profile__label">{copy.profile}</Label>
          <div className="person-profile__body">
            <Reveal as="p" kind="fade" className="person-profile__lead" id="person-profile-title">{d.profile[0]}</Reveal>
            <p>{d.profile[1]}</p>
          </div>
          <div className="person-record">
            <p className="label">{copy.record}</p>
            <dl>
              {d.record.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
              <div>
                <dt>Formerly</dt>
                <dd>{god.formerly.replace(/^Formerly /, '')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="person-rules" data-theme="dark" data-ink="ivory" aria-label={copy.rules} ref={rulesRef}>
        <div className="wrap">
          <Label>{copy.rules}</Label>
          <ol className="person-rules__list">
            {d.rules.map((rule, index) => (
              <li key={rule}>
                <span className="person-rules__numeral" aria-hidden="true">{greekNumeral(index + 1)}</span>
                <span className="sr-only">{index + 1}. </span>
                <span className="person-rules__text">{rule}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="person-work section" data-ink="obsidian" aria-label={copy.work}>
        <div className="wrap grid">
          <div className="person-work__head">
            <Label>{copy.work}</Label>
            <p className="sys">{copy.workNote}</p>
          </div>
          <ul className="person-work__list">
            {work.map(({ project, note }) => (
              <li key={project.slug}>
                <Link to={`/work/${project.slug}`} className="person-work__link">
                  <span className="person-work__client">{project.client}</span>
                  <span className="person-work__meta label">{project.discipline} — {project.year}</span>
                  <span className="person-work__note">{note}</span>
                  <span className="person-work__arrow" aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="person-work__all"><Link to="/people" className="textlink">{copy.all} <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section className="case-next" data-theme="dark" data-ink="ivory">
        <Link ref={nextRef} to={`/people/${next.slug}`} className="wrap case-next__link person-next">
          <span className="label">{copy.next} — {next.role}</span>
          <span className="case-next__name">{next.name}</span>
        </Link>
      </section>
    </div>
  );
}
