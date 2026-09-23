import { useEffect, useRef } from 'react';

/**
 * Adds `is-in` to the element once it enters the viewport.
 * All visual behaviour lives in CSS ([data-reveal]) so reduced motion is handled there.
 */
export function useReveal<T extends HTMLElement>(options: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<T>(null);
  const { threshold = 0.2, rootMargin = '0px 0px -8% 0px' } = options;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return ref;
}
