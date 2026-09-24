import { Link } from 'react-router-dom';
import { conceptNotice, projects } from '../content/site';
import { Label } from './Label';
import { Reveal } from './Reveal';
import { useScrollProgress } from '../hooks/useScrollProgress';

type Section = {
  readonly title: string;
  readonly body: string;
  readonly points: readonly string[];
  readonly related?: string;
};

export function InteriorSections({ label, sections, note }: { label: string; sections: readonly Section[]; note?: string }) {
  return (
    <div className="interior-sections">
      {sections.map((section, index) => <InteriorStory key={section.title} section={section} index={index} label={label} />)}
      {note && <section className="interior-note" data-ink="obsidian"><div className="wrap"><p className="sys">{note}</p></div></section>}
    </div>
  );
}

function InteriorStory({ section, index, label }: { section: Section; index: number; label: string }) {
  const ref = useScrollProgress<HTMLElement>();
  const related = projects.find((project) => project.slug === section.related);
  return (
    <section className="interior-story section" data-ink={index % 2 ? 'ivory' : 'obsidian'} ref={ref}>
      <div className="wrap grid interior-story__grid">
        <Label n={String(index + 1).padStart(2, '0')}>{label}</Label>
        <div className="interior-story__main">
          <Reveal as="h2" kind="fade">{section.title}</Reveal>
          <p className="interior-story__body">{section.body}</p>
        </div>
        <Reveal className="interior-story__aside" kind="fade" threshold={0.1}>
          <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>
          {related && <Link className="textlink" to={`/work/${related.slug}`}>See {related.client} <span aria-hidden="true">↗</span></Link>}
          {related && <span className="sys interior-story__concept">{conceptNotice}</span>}
        </Reveal>
      </div>
    </section>
  );
}
