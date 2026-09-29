// The exact OLYMPUS vector files, inlined so the obsidian fills can follow the
// ground. The O and bolt get motion wrappers; their artwork stays untouched.
import { useEffect, useRef, type PointerEvent } from 'react';
import wordmark from '../../public/OLYMPUS-asset-library/01-logo/olympus-wordmark-gold-bolt.svg?raw';
import primary from '../../public/OLYMPUS-asset-library/01-logo/olympus-primary.svg?raw';

const prep = (svg: string) =>
  svg
    .replace(/fill="#080808"/g, 'fill="currentColor"')
    .replace(/\srole="img"/, ' aria-hidden="true" focusable="false"')
    .replace(/\saria-label="[^"]*"/, '')
    .replace('<path ', '<path class="logo__o" ')
    .replace(/(<path transform="translate\(48 59\) scale\(0\.63\)"[^>]*fill="#D4AF37"\/>)/, '<g class="logo__bolt">$1</g>');

const SOURCES = { wordmark: prep(wordmark), primary: prep(primary) };

type Props = { variant?: keyof typeof SOURCES; className?: string; label?: string };

export function Logo({ variant = 'wordmark', className, label = 'Olympus' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const strikeTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(strikeTimer.current), []);

  const reset = () => {
    const element = ref.current;
    if (!element) return;
    element.removeAttribute('data-interacting');
    element.style.removeProperty('--logo-x');
    element.style.removeProperty('--logo-y');
    element.style.removeProperty('--logo-tilt');
  };

  const move = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === 'touch') return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 2 - 1;
    const y = (event.clientY - rect.top) / rect.height * 2 - 1;
    element.dataset.interacting = 'true';
    element.style.setProperty('--logo-x', `${(x * 3).toFixed(2)}px`);
    element.style.setProperty('--logo-y', `${(y * 3).toFixed(2)}px`);
    element.style.setProperty('--logo-tilt', `${(x * 8).toFixed(2)}deg`);
  };

  const strike = () => {
    const element = ref.current;
    if (!element) return;
    window.clearTimeout(strikeTimer.current);
    element.dataset.strike = 'true';
    strikeTimer.current = window.setTimeout(() => element.removeAttribute('data-strike'), 650);
  };

  return (
    <span
      ref={ref}
      className={`logo logo--${variant} ${className ?? ''}`}
      role="img"
      aria-label={label}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerDown={strike}
      dangerouslySetInnerHTML={{ __html: SOURCES[variant] }}
    />
  );
}
