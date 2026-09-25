// Per-route document metadata. Shared by the app (tab titles) and the build
// (scripts/site-plugin.ts writes one HTML file per route with these tags).
import { conceptNotice, interior, nav, projects, titles } from '../content/site';
import { imageMeta, type ImageKey } from './images';

export type RouteMeta = {
  title: string;
  /** Omitted for the home page, which keeps the description authored in index.html. */
  description?: string;
  image?: { src: string; width: number; height: number };
};

type InteriorKey = keyof typeof interior;

function interiorKey(pathname: string): InteriorKey | undefined {
  const key = pathname.slice(1);
  return key in interior ? (key as InteriorKey) : undefined;
}

/** The 1.91:1 link-preview crop made by `npm run images` (SOCIAL in build-images.mjs). */
function socialImage(key: ImageKey): RouteMeta['image'] {
  const m = imageMeta(key);
  if (!('social' in m)) return undefined;
  return { src: `/OLYMPUS-asset-library/_responsive/social/${key}.jpg`, ...m.social };
}

export function pageTitle(pathname: string) {
  return routeMeta(pathname).title;
}

export function routeMeta(pathname: string): RouteMeta {
  if (pathname === '/') return { title: titles.home };
  if (pathname.startsWith('/work/')) {
    const project = projects.find((p) => pathname === `/work/${p.slug}`);
    if (!project) return notFoundMeta();
    return {
      title: `${project.client} — ${titles.concept}${titles.suffix}`,
      description: `${project.line} ${conceptNotice}.`,
      image: socialImage(project.image),
    };
  }
  const item = nav.find((n) => pathname === n.to);
  const key = interiorKey(pathname);
  if (!item || !key) return notFoundMeta();
  return { title: item.label + titles.suffix, description: interior[key].lead };
}

function notFoundMeta(): RouteMeta {
  return { title: titles.notFound + titles.suffix };
}

/** Every route that exists as a real page. The build writes one HTML file for each. */
export const staticRoutes = ['/', ...nav.map((n) => n.to), ...projects.map((p) => `/work/${p.slug}`)];
