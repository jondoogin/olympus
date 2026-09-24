import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  /** 'lines' masks each .line child upward; 'fade' is a quiet rise. */
  kind?: 'lines' | 'fade' | 'wipe';
  threshold?: number;
};

export function Reveal({ as: Tag = 'div', children, className, id, kind = 'fade', threshold }: Props) {
  const ref = useReveal<HTMLElement>({ threshold });
  return (
    <Tag ref={ref} className={className} id={id} data-reveal={kind}>
      {children}
    </Tag>
  );
}

/** A masked line for use inside <Reveal kind="lines">. */
export function Line({ children, i = 0 }: { children: ReactNode; i?: number }) {
  return (
    <span className="line" style={{ ['--i' as string]: i }}>
      <span className="line__inner">{children}</span>
    </span>
  );
}
