import { Link } from 'react-router-dom';
import { hero } from '../content/site';
import { Picture } from '../components/Picture';
import { CropMarks } from '../components/CropMarks';
import { Annotation } from '../components/Annotation';
import { useScrollProgress } from '../hooks/useScrollProgress';

export function Hero() {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section className="hero" ref={ref} data-ink="ivory" aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__media">
          <Picture image={hero.image} alt={hero.alt} sizes="100vw" crop={hero.crop} priority className="hero__pic" />
        </div>
        <CropMarks className="hero__marks" />

        <h1 id="hero-title" className="hero__title">
          <span className="hero__a">
            <span className="hero__mask"><span>Higher</span></span>
            <span className="hero__mask"><span>ideas</span></span>
          </span>
          <span className="hero__b">
            <span className="hero__mask"><span>{hero.lineB}</span></span>
          </span>
        </h1>

        <Annotation className="hero__annot" arrow="right">the CEO. obviously.</Annotation>

        <p className="hero__index" aria-hidden="true">
          <span>N° 001</span>
          <span>37.9715° N</span>
        </p>
      </div>

      <div className="hero__deck">
        <p className="hero__intro">{hero.intro}</p>
        <div className="hero__ctas">
          <Link to="/work" className="btn btn--solid">
            See the work <span aria-hidden="true">→</span>
          </Link>
          <Link to="/people" className="btn btn--line">
            Meet the gods <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="hero__meta" aria-label="At a glance">
          <li>Independent since 2026</li>
          <li>Mt. Olympus / Global</li>
          <li className="hero__scroll" aria-hidden="true">Scroll</li>
        </ul>
      </div>
    </section>
  );
}
