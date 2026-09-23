import { Link } from 'react-router-dom';
import { conceptNotice, projects } from '../content/site';
import { Label } from './Label';

type Section = {
  readonly title: string;
  readonly body: string;
  readonly points: readonly string[];
  readonly related?: string;
};

export function InteriorSections({ label, sections, note }: { label: string; sections: readonly Section[]; note?: string }) {
  return (
    <div className="interior-sections">
      {sections.map((section, index) => {
        const related = projects.find((project) => project.slug === section.related);
        return (
          <section className="interior-story section" data-ink={index % 2 ? 'ivory' : 'obsidian'} key={section.title}>
            <div className="wrap grid interior-story__grid">
              <Label n={String(index + 1).padStart(2, '0')}>{label}</Label>
              <div className="interior-story__main">
                <h2>{section.title}</h2>
                <p className="interior-story__body">{section.body}</p>
              </div>
              <div className="interior-story__aside">
                <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>
                {related && <Link className="textlink" to={`/work/${related.slug}`}>See {related.client} <span aria-hidden="true">↗</span></Link>}
                {related && <span className="sys interior-story__concept">{conceptNotice}</span>}
              </div>
            </div>
          </section>
        );
      })}
      {note && <section className="interior-note" data-ink="obsidian"><div className="wrap"><p className="sys">{note}</p></div></section>}
    </div>
  );
}
