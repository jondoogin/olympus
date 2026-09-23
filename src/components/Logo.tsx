// The exact OLYMPUS vector files, inlined so the obsidian fills can follow the
// ground (ivory on dark, obsidian on light). Paths, proportions and the gold bolt
// are untouched — only #080808 is mapped to currentColor.
import wordmark from '../../public/OLYMPUS-asset-library/01-logo/olympus-wordmark-gold-bolt.svg?raw';
import primary from '../../public/OLYMPUS-asset-library/01-logo/olympus-primary.svg?raw';

const prep = (svg: string) =>
  svg
    .replace(/fill="#080808"/g, 'fill="currentColor"')
    .replace(/\srole="img"/, ' aria-hidden="true" focusable="false"')
    .replace(/\saria-label="[^"]*"/, '');

const SOURCES = { wordmark: prep(wordmark), primary: prep(primary) };

type Props = { variant?: keyof typeof SOURCES; className?: string; label?: string };

export function Logo({ variant = 'wordmark', className, label = 'Olympus' }: Props) {
  return (
    <span
      className={`logo logo--${variant} ${className ?? ''}`}
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: SOURCES[variant] }}
    />
  );
}
