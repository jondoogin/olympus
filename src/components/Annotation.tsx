import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Which way the hand-drawn arrow points from the note. */
  arrow?: 'left' | 'right' | 'down' | 'none';
  style?: CSSProperties;
};

/**
 * Handwritten marginal note with a drawn stroke. Draws itself when its nearest
 * [data-reveal] ancestor gets .is-in (or on hero entrance).
 */
export function Annotation({ children, className, arrow = 'left', style }: Props) {
  return (
    <span className={`annot annot--${arrow} ${className ?? ''}`} style={style} aria-hidden="true">
      <span className="annot__text">{children}</span>
      {arrow !== 'none' && (
        <svg className="annot__arrow" viewBox="0 0 120 60" fill="none">
          <path
            className="annot__stroke"
            d="M112 10 C 88 6, 58 14, 40 30 S 14 48, 8 50"
            pathLength={1}
          />
          <path className="annot__stroke annot__stroke--head" d="M20 40 L 8 50 L 22 55" pathLength={1} />
        </svg>
      )}
    </span>
  );
}
