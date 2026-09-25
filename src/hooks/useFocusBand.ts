import { useEffect, useRef, type RefObject } from 'react';

// One observer for every element: a thin band across the middle of the viewport.
let observer: IntersectionObserver | null = null;

/** Toggles `is-focus` on `el` while it crosses the middle of the screen. Returns a cleanup. */
export function observeFocusBand(el: Element) {
  if (!('IntersectionObserver' in window)) return () => {};
  observer ??= new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-focus', e.isIntersecting)),
    { rootMargin: '-48% 0px -48% 0px' },
  );
  const io = observer;
  io.observe(el);
  return () => {
    io.unobserve(el);
    el.classList.remove('is-focus');
  };
}

/**
 * Adds `is-focus` while the element crosses the middle of the screen, and removes it
 * as it leaves. On touch screens CSS gives that state the treatment a mouse gets on
 * hover (sections.css, "Touch focus"), so scrolling does what pointing does on desktop.
 * Pass an existing ref to share it with another hook.
 */
export function useFocusBand<T extends HTMLElement>(existing?: RefObject<T | null>) {
  const own = useRef<T>(null);
  const ref = existing ?? own;
  useEffect(() => {
    const el = ref.current;
    return el ? observeFocusBand(el) : undefined;
  }, [ref]);
  return ref;
}
