import { Link } from 'react-router-dom';
import { pantheon, type God } from '../content/site';
import { Label } from '../components/Label';
import { Picture } from '../components/Picture';
import { Reveal } from '../components/Reveal';

export function GodCard({ g, i }: { g: God; i: number }) {
  return (
    <Reveal as="figure" className={`god god--${i + 1}`} threshold={0.25}>
      <div className="god__frame" data-accent={g.accent}>
        <Picture
          image={g.image}
          alt={g.alt}
          sizes={i === 0 ? '(min-width: 1100px) 38vw, 100vw' : '(min-width: 1100px) 24vw, (min-width: 768px) 36vw, 50vw'}
          crop={g.crop}
        />
      </div>
      <figcaption className="god__cap">
        <span className="god__role">{g.role}</span>
        <span className="god__name">{g.name}</span>
        <q className="god__line">{g.line}</q>
      </figcaption>
    </Reveal>
  );
}

export function Pantheon() {
  return (
    <section className="pantheon section" id="people" data-theme="stone" data-ink="obsidian" aria-labelledby="pantheon-title">
      <div className="wrap grid pantheon__head">
        <Label n="04" className="pantheon__label">People</Label>
        <h2 id="pantheon-title" className="pantheon__title">
          The <em>Pantheon</em>
        </h2>
        <p className="pantheon__note">
          Six senior partners, several thousand years of experience between them, and one very long group chat.
        </p>
      </div>
      <div className="wrap grid pantheon__grid">
        {pantheon.map((g, i) => <GodCard key={g.name} g={g} i={i} />)}
        <aside className="pantheon__hire">
          <span className="label">Hiring</span>
          <p>We hire mortals, too. Carefully.</p>
          <Link to="/culture" className="textlink">Culture &amp; open roles <span aria-hidden="true">→</span></Link>
        </aside>
      </div>
    </section>
  );
}
