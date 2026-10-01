import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { preloadRoute } from '../routes';
import { mq } from '../lib/tokens';
import { scrollToStart } from '../lib/scroll';

type Morph = { source: HTMLElement; name: string; target: string };

/** The element a clicked link carries into the next page, if any. */
function morphFor(a: HTMLAnchorElement): Morph | null {
  if (a.classList.contains('proj__link')) {
    const source = a.querySelector<HTMLElement>('.proj__frame');
    return source && { source, name: 'case-media', target: '.case-media img' };
  }
  if (a.dataset.morph === 'person') {
    const source = a.closest('.god, .people-bio')?.querySelector<HTMLElement>('[data-morph-source]');
    return source ? { source, name: 'person-portrait', target: '.person-hero__portrait img' } : null;
  }
  return null;
}

const settle = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Page turns. Internal link clicks load the next route's code, then swap the page
 * inside a View Transition: the old page lifts away while the new one wipes up
 * (styles in components.css, "Page transitions"). A project card's image carries
 * over into the case study's lead image, and a partner's portrait into their dossier. Browsers without the API, and visitors who
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

      // A project card hands its image to the case study it opens; a portrait hands
      // itself to the partner's dossier.
      const morph = morphFor(a);
      if (morph) {
        morph.source.style.viewTransitionName = morph.name;
        root.classList.add('vt-morph');
      }

      const transition = document.startViewTransition(async () => {
        await preloadRoute(url.pathname).catch(() => {});
        flushSync(() => navigate(to));
        scrollToStart(url.hash);
        // Give the arriving lead image a moment to decode so the morph lands on a picture.
        const img = morph && document.querySelector<HTMLImageElement>(morph.target);
        if (img) await Promise.race([img.decode().catch(() => {}), settle(450)]);
      });
      transition.finished.finally(() => {
        root.classList.remove('vt-morph');
        if (morph) morph.source.style.viewTransitionName = '';
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate]);

  return null;
}
