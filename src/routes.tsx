import { lazy, type ComponentType } from 'react';

type Loader = () => Promise<{ default: ComponentType }>;

/**
 * A route-level code split that can be loaded ahead of time. Once its module has
 * arrived it renders synchronously, so a page transition can load the chunk first
 * and then swap the page in one frame, without a blank Suspense fallback.
 */
function page(load: Loader) {
  let Loaded: ComponentType | null = null;
  let pending: Promise<void> | null = null;
  const preload = () =>
    (pending ??= load().then(
      (m) => { Loaded = m.default; },
      (err) => { pending = null; throw err; },
    ));
  const Deferred = lazy(() => preload().then(() => ({ default: Loaded! })));
  function Page() {
    return Loaded ? <Loaded /> : <Deferred />;
  }
  return Object.assign(Page, { preload });
}

export const WorkPage = page(() => import('./pages/WorkPage'));
export const ProjectPage = page(() => import('./pages/ProjectPage'));
export const ServicesPage = page(() => import('./pages/ServicesPage'));
export const PeoplePage = page(() => import('./pages/PeoplePage'));
export const CulturePage = page(() => import('./pages/CulturePage'));
export const AboutPage = page(() => import('./pages/AboutPage'));
export const ContactPage = page(() => import('./pages/ContactPage'));

const byPath: Record<string, { preload: () => Promise<void> }> = {
  '/work': WorkPage,
  '/services': ServicesPage,
  '/people': PeoplePage,
  '/culture': CulturePage,
  '/about': AboutPage,
  '/contact': ContactPage,
};

/** Loads the code for a path. Resolves immediately for the home page and unknown paths. */
export function preloadRoute(pathname: string): Promise<void> {
  if (pathname.startsWith('/work/')) return ProjectPage.preload();
  return byPath[pathname]?.preload() ?? Promise.resolve();
}

/** Fetches every route's code once the browser is idle after first load. */
export function preloadAllWhenIdle() {
  const all = () => [ProjectPage, ...Object.values(byPath)].forEach((p) => void p.preload().catch(() => {}));
  const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(all, { timeout: 4000 }) : setTimeout(all, 2000));
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}
