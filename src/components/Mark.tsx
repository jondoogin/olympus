import { useId } from 'react';
import { scopeSvgIds } from '../lib/svg';

// Supporting marks from 02-marks, inlined so they can take currentColor / accent.
import bolt from '../../public/OLYMPUS-asset-library/02-marks/lightning-bolt.svg?raw';
import delta from '../../public/OLYMPUS-asset-library/02-marks/greek-delta.svg?raw';
import boltO from '../../public/identity/mark-01.svg?raw';

const prep = (svg: string) =>
  svg
    .replace(/(fill|stroke)="#080808"/g, '$1="currentColor"')
    .replace(/\srole="img"/, ' aria-hidden="true" focusable="false"')
    .replace(/\saria-label="[^"]*"/, '');

const MARKS = { bolt: prep(bolt), delta: prep(delta), boltO: prep(boltO) };

export function Mark({ name, className }: { name: keyof typeof MARKS; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return <span className={`mark mark--${name} ${className ?? ''}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: scopeSvgIds(MARKS[name], id) }} />;
}
