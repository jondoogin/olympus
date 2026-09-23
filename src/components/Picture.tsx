import type { CSSProperties } from 'react';
import type { Crop } from '../content/site';
import { fallbackSrc, imageMeta, srcSet, type ImageKey } from '../lib/images';

type Props = {
  image: ImageKey;
  alt: string;
  sizes: string;
  crop?: Crop;
  priority?: boolean;
  className?: string;
};

/**
 * Responsive, layout-stable image. Intrinsic width/height reserve the aspect ratio;
 * crop positions are passed per breakpoint as CSS vars and resolved in base.css.
 */
export function Picture({ image, alt, sizes, crop, priority, className }: Props) {
  const m = imageMeta(image);
  const style = {
    '--pos-m': crop?.mobile ?? '50% 50%',
    '--pos-t': crop?.tablet ?? crop?.mobile ?? '50% 50%',
    '--pos-d': crop?.desktop ?? crop?.tablet ?? crop?.mobile ?? '50% 50%',
  } as CSSProperties;
  return (
    <picture className={`pic ${className ?? ''}`} style={style}>
      <source type="image/webp" srcSet={srcSet(image, 'webp')} sizes={sizes} />
      <img
        src={fallbackSrc(image)}
        srcSet={srcSet(image, 'jpg')}
        sizes={sizes}
        width={m.width}
        height={m.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
}
