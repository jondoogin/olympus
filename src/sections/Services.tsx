import { useRef, useState } from 'react';
import { services } from '../content/site';
import { Label } from '../components/Label';
import { Reveal } from '../components/Reveal';
import { greekNumeral } from '../lib/antiquity';

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  // A mouse hover already opens a row; a click on that same row shouldn't slam it shut.
  const hovered = useRef<number | null>(null);
  return (
    <section className="services section" data-ink="obsidian" aria-labelledby="services-title">
      <div className="wrap grid">
        <div className="services__aside">
          <Label n="03">Services</Label>
          <Reveal as="h2" id="services-title" className="services__title" kind="fade">An index of ways in.</Reveal>
          <p className="services__note">Six disciplines. Most clients need three. Some need a miracle.</p>
        </div>

        <ol className="services__list" onPointerLeave={(e) => {
            if (e.pointerType !== 'mouse') return;
            hovered.current = null;
            setActive(null);
          }}>
          {services.map((s, i) => {
            const open = active === i;
            const id = `svc-${i}`;
            return (
              <li
                key={s.name}
                className={`svc ${open ? 'is-open' : ''} ${s.em ? 'svc--em' : ''}`}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'mouse') return;
                  hovered.current = i;
                  setActive(i);
                }}
              >
                <h3 className="svc__h">
                  <button
                    type="button"
                    className="svc__btn"
                    aria-expanded={open}
                    aria-controls={id}
                    onClick={() => setActive(open && hovered.current !== i ? null : i)}
                  >
                    <span className="svc__n" aria-hidden="true">{greekNumeral(i + 1)}</span>
                    <span className="svc__name">
                      {s.em && <span className="svc__amp">&amp; </span>}
                      {s.name}
                    </span>
                    <span className="svc__plus" aria-hidden="true" />
                  </button>
                </h3>
                <div className="svc__panel" id={id} role="region" aria-label={s.name} aria-hidden={!open}>
                  <div className="svc__panel-inner">
                    <p className="svc__line">{s.line}</p>
                    <ul className="svc__caps">
                      {s.caps.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
