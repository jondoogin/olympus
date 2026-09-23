import { useEffect, useState } from 'react';
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
          <li className="inscr hero__inscr" lang="el">{hero.inscription}</li>
          <li>{hero.est}</li>
          <Readout />
          <li className="hero__scroll" aria-hidden="true">{hero.scroll}</li>
        </ul>
      </div>
    </section>
  );
}

/**
 * The screen register: the site noticing where it is being shown.
 * Real numbers only — the visitor's viewport and how long the page took to render.
 */
function Readout() {
  const [size, setSize] = useState<string | null>(null);
  const [secs, setSecs] = useState<string | null>(null);
  useEffect(() => {
    const measure = () => setSize(`${window.innerWidth} × ${window.innerHeight}`);
    measure();
    window.addEventListener('resize', measure);
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const t = nav && nav.domContentLoadedEventEnd > 0 ? nav.domContentLoadedEventEnd : performance.now();
    setSecs((t / 1000).toFixed(2));
    return () => window.removeEventListener('resize', measure);
  }, []);
  if (!size) return null;
  return (
    <>
      <li className="sys hero__sys">Now showing on {size} px of glass</li>
      {secs && <li className="sys hero__sys hero__sys--time">Rendered in {secs}s. The Parthenon took fifteen years.</li>}
    </>
  );
}
