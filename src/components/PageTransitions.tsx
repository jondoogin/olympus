import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { preloadRoute } from '../routes';
import { mq } from '../lib/tokens';
import { scrollToStart } from '../lib/scroll';

const settle = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Page turns. Internal link clicks load the next route's code, then swap the page
 * inside a View Transition: the old page lifts away while the new one wipes up
 * (styles in components.css, "Page transitions"). A project card's image carries
 * over into the case study's lead image. Browsers without the API, and visitors who
 * ask for reduced motion, get a plain navigation.
 */
export function PageTransitions() {
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      // Same page (including #top, #main): leave it to the router and the browser.
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      e.preventDefault();
      const to = url.pathname + url.search + url.hash;
      const root = document.documentElement;

      if (!document.startViewTransition || window.matchMedia(mq.reducedMotion).matches) {
        void preloadRoute(url.pathname).catch(() => {}).then(() => navigate(to));
        return;
      }

      // A project card hands its image to the case study it opens.
      const frame = a.classList.contains('proj__link') ? a.querySelector<HTMLElement>('.proj__frame') : null;
      if (frame) {
        frame.style.viewTransitionName = 'case-media';
        root.classList.add('vt-morph');
      }

      const transition = document.startViewTransition(async () => {
        await preloadRoute(url.pathname).catch(() => {});
        flushSync(() => navigate(to));
        scrollToStart(url.hash);
        // Give the arriving lead image a moment to decode so the morph lands on a picture.
        const img = frame && document.querySelector<HTMLImageElement>('.case-media img');
        if (img) await Promise.race([img.decode().catch(() => {}), settle(450)]);
      });
      transition.finished.finally(() => {
        root.classList.remove('vt-morph');
        if (frame) frame.style.viewTransitionName = '';
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate]);

  return null;
}
