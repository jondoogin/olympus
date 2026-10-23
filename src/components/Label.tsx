import type { ReactNode } from 'react';
import { indexNumber } from '../lib/antiquity';

/** Section eyebrow with a plain numeric index. */
export function Label({ n, children, className }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label ${className ?? ''}`}>
      {n && (
        <span className="label__n" title={`No. ${parseInt(n, 10)}`}>
          <span aria-hidden="true">{indexNumber(n)}</span>
          <span className="sr-only">{parseInt(n, 10)}.</span>
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}
