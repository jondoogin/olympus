import type { ReactNode } from 'react';

/** Section eyebrow: "(03) — Selected work". */
export function Label({ n, children, className }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label ${className ?? ''}`}>
      {n && <span className="label__n">({n})</span>}
      <span>{children}</span>
    </p>
  );
}
