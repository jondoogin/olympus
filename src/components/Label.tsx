import type { ReactNode } from 'react';
import { greekNumeral } from '../lib/antiquity';

/** Section eyebrow: "Βʹ — Selected work". The numeral is Greek; the digits stay available to assistive tech. */
export function Label({ n, children, className }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label ${className ?? ''}`}>
      {n && (
        <span className="label__n" title={`No. ${parseInt(n, 10)}`}>
          <span aria-hidden="true">{greekNumeral(n)}</span>
          <span className="sr-only">{parseInt(n, 10)}.</span>
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}
