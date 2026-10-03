import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { conceptNotice, projects, projectContextLabels, type Project } from '../content/site';
import { Picture } from '../components/Picture';
import { Label } from '../components/Label';
import { Reveal, Line } from '../components/Reveal';
import { greekNumeral } from '../lib/antiquity';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useFocusBand } from '../hooks/useFocusBand';
import NotFound from './NotFound';

export default function ProjectPage() {
  const mediaRef = useScrollProgress<HTMLElement>();
  const nextRef = useFocusBand<HTMLAnchorElement>();
  const { slug } = useParams();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return <NotFound />;
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  return (
    <div className="case-page" data-project={p.slug}>
      <section className="case-hero" data-project={p.slug} data-ink={p.slug === 'helio' ? 'ivory' : 'obsidian'}>
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
      <ProjectContext project={p} />
      <figure className="case-media" data-ink="ivory" ref={mediaRef}>
        <Picture image={p.image} alt={p.alt} sizes="100vw" crop={p.crop} priority />
      </figure>
      <CaseStory project={p} />
      <section className="case-next" data-theme="dark" data-ink="ivory">
        <Link ref={nextRef} to={`/work/${next.slug}`} className="wrap case-next__link">
          <span className="label">Next project</span>
          <span className="case-next__name">{next.client}</span>
        </Link>
      </section>
    </div>
  );
}

function CaseStory({ project }: { project: Project }) {
  const plateRef = useScrollProgress<HTMLElement>();
  const ideaRef = useScrollProgress<HTMLElement>();
  const galleryRef = useScrollProgress<HTMLElement>();
  const story = project.caseStudy;
  const darkSystem = project.slug === 'aura';
  return (
    <>
      <section className="case-brief section" data-ink="obsidian" aria-labelledby="case-brief-title">
        <div className="wrap grid">
          <Label className="case-brief__label">{story.brief.label}</Label>
          <Reveal as="h2" kind="fade" className="case-brief__title" id="case-brief-title">{story.brief.title}</Reveal>
          <p className="case-brief__body">{story.brief.body}</p>
        </div>
      </section>
      <figure className="case-plate" data-ink={project.slug === 'vela' || project.slug === 'northline' ? 'obsidian' : 'ivory'} ref={plateRef}>
        <Picture image={story.media.detail.image} alt={story.media.detail.alt} sizes="100vw" />
        <figcaption className="wrap label">{story.media.detail.caption}</figcaption>
      </figure>
      <section className="case-idea" data-theme="dark" data-ink="ivory" aria-labelledby="case-idea-title" ref={ideaRef}>
        <div className="wrap case-idea__inner">
          <Label>{story.idea.label}</Label>
          <Reveal as="h2" kind="fade" className="case-idea__statement" id="case-idea-title">{story.idea.statement}</Reveal>
          <p className="case-idea__body">{story.idea.body}</p>
        </div>
      </section>
      <section className="case-system section" data-theme={darkSystem ? 'dark' : undefined} data-ink={darkSystem ? 'ivory' : 'obsidian'} aria-labelledby="case-system-title">
        <div className="wrap grid">
          <Label className="case-system__label">{story.system.label}</Label>
          <div className="case-system__content">
            <Reveal as="h2" kind="fade" id="case-system-title">{story.system.title}</Reveal>
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
      <ProjectApplication project={project} />
      <section className="case-gallery section" data-theme={darkSystem ? 'dark' : undefined} data-ink={darkSystem ? 'ivory' : 'obsidian'} aria-label={story.media.galleryLabel} ref={galleryRef}>
        <div className="wrap case-gallery__grid">
          <Reveal as="figure" kind="fade">
            <Picture image={story.media.campaign.image} alt={story.media.campaign.alt} sizes="(min-width: 768px) 60vw, 100vw" />
            <figcaption className="label">{story.media.campaign.caption}</figcaption>
          </Reveal>
          <Reveal as="figure" kind="fade">
            <Picture image={story.media.materials.image} alt={story.media.materials.alt} sizes="(min-width: 768px) 40vw, 100vw" />
            <figcaption className="label">{story.media.materials.caption}</figcaption>
          </Reveal>
        </div>
      </section>
      <MotionStudy media={story.media} client={project.client} />
      <section className="case-outcome section" data-theme="stone" data-ink="obsidian" aria-labelledby="case-outcome-title">
        <div className="wrap grid">
          <Label className="case-outcome__label">{story.outcome.label}</Label>
          <Reveal as="h2" kind="fade" id="case-outcome-title">{story.outcome.title}</Reveal>
          <p>{story.outcome.body}</p>
        </div>
      </section>
    </>
  );
}

function ProjectContext({ project }: { project: Project }) {
  return (
    <section className="case-context" data-ink="obsidian" aria-label={project.context.business}>
      <dl className="wrap case-context__grid">
        {Object.entries(project.context).map(([key, value]) => (
          <div key={key}><dt className="label">{projectContextLabels[key]}</dt><dd>{value}</dd></div>
        ))}
      </dl>
    </section>
  );
}

function ProjectApplication({ project }: { project: Project }) {
  const a = project.application;
  return (
    <section className="case-application section" data-ink="obsidian" aria-label={a.label}>
      <figure className="wrap">
        <Label>{a.label}</Label>
        <div className={`application-board application-board--${project.slug}`}>
          <div className="application-board__art" aria-hidden="true">
            {project.slug === 'vela' && <svg viewBox="0 0 240 360"><path d="M94 30 75 70 92 124 40 330H200L148 124 165 70 146 30 120 46Z" fill="currentColor"/><path d="m120 48-5 270m-21-190 52 12" fill="none" stroke="#bbb3a5" strokeWidth="2"/></svg>}
            {project.slug === 'northline' && <svg viewBox="0 0 360 300"><g fill="none" stroke="currentColor" strokeWidth="3"><path d="M30 30H330V270H30ZM130 30V180H230V30M30 180H130M230 180H330M130 270V225H230V270"/><path d="M130 180H230V225H130Z" strokeDasharray="5 5"/><path d="M45 45H115V165H45ZM245 45H315V165H245Z" strokeWidth="1"/></g></svg>}
            {project.slug === 'helio' && <span className="application-sun" />}
            {project.slug === 'aura' && <span className="application-speaker"><span /></span>}
          </div>
          <div className="application-board__content">
            <h3>{a.title}</h3><p className="application-board__subtitle">{a.subtitle}</p>
            <dl>{a.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p className="application-board__footer">{a.footer}</p>
          </div>
        </div>
        <figcaption className="label">{a.caption}</figcaption>
      </figure>
    </section>
  );
}

function MotionStudy({ media, client }: { media: Project['caseStudy']['media']; client: string }) {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <figure className="case-film" data-theme="dark" data-ink="ivory">
      <div className="case-film__frame">
        <Picture image={media.campaign.image} alt={reducedMotion ? media.campaign.alt : ''} sizes="100vw" />
        {!reducedMotion && (
          <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" aria-label={media.film.label} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
            <source src={media.film.src} type="video/mp4" />
          </video>
        )}
        <span className="case-film__wordmark" aria-hidden="true">{client}</span>
      </div>
      <figcaption className="wrap case-film__caption">
        <span className="label">{media.film.caption}</span>
        {!reducedMotion && <button className="case-film__toggle sys" type="button" onClick={togglePlayback} aria-label={`${playing ? 'Pause' : 'Play'} ${media.film.label}`} aria-pressed={playing}>{playing ? 'Pause film' : 'Play film'} <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span></button>}
      </figcaption>
    </figure>
  );
}
