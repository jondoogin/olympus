// Selected struck O, with static and one-shot motion versions.
import { useId } from 'react';
import { scopeSvgIds } from '../lib/svg';
import wordmark from '../assets/identity/olympus-wordmark-gold-bolt.svg?raw';
import primary from '../assets/identity/olympus-primary.svg?raw';
import wordmarkMotion from '../assets/identity/olympus-wordmark-gold-bolt-animated.svg?raw';
import primaryMotion from '../assets/identity/olympus-primary-animated.svg?raw';

const prep = (svg: string) =>
  svg
    .replace(/fill="#080808"/g, 'fill="currentColor"')
    .replace(/\srole="img"/, ' aria-hidden="true" focusable="false"')
    .replace(/\saria-label="[^"]*"/, '');

const SOURCES = { wordmark: prep(wordmark), primary: prep(primary) };
const MOTION = { wordmark: prep(wordmarkMotion), primary: prep(primaryMotion) };

type Props = { variant?: keyof typeof SOURCES; className?: string; label?: string; animate?: boolean };

export function Logo({ variant = 'wordmark', className, label = 'Olympus', animate = false }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const source = scopeSvgIds((animate ? MOTION : SOURCES)[variant], id);
  return (
    <span
      className={`logo logo--${variant} ${animate ? 'logo--striking' : ''} ${className ?? ''}`}
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}
