import type { ReactNode } from 'react';
import { Label } from './Label';
import { Reveal, Line } from './Reveal';

type Props = { n: string; label: string; title: string[]; em?: string; children?: ReactNode };

/** Shared opener for interior pages: eyebrow, enormous masked title, narrow lead. */
export function PageIntro({ n, label, title, em, children }: Props) {
  return (
    <section className="page-intro" data-ink="obsidian">
      <div className="wrap grid">
        <Label n={n} className="page-intro__label">{label}</Label>
        <Reveal as="h1" kind="lines" className="page-intro__title">
          {title.map((t, i) => <Line key={t} i={i}>{t}</Line>)}
          {em && <Line i={title.length}><em>{em}</em></Line>}
        </Reveal>
        {children && <div className="page-intro__lead">{children}</div>}
      </div>
    </section>
  );
}
