// Build-time pages for a client-rendered site.
// After Vite writes dist/, this plugin:
//  - writes one HTML file per route (dist/work.html, dist/work/vela.html, …) with that
//    route's title, description, canonical and social tags, plus a modulepreload for
//    the route's code chunk. Vercel serves them via `cleanUrls` (see vercel.json).
//  - writes dist/404.html (noindex), which Vercel serves with a real 404 status.
//  - writes robots.txt and, when VITE_SITE_URL is set, sitemap.xml.
//  - removes the master PNGs that only exist to feed `npm run images`; the site only
//    ever requests their _responsive derivatives. The masters stay untouched in public/.
import { readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin, Rollup } from 'vite';
import { routeMeta, staticRoutes, type RouteMeta } from '../src/lib/meta';
import manifest from '../src/content/image-manifest.json';

/** Route → the page module whose chunk it needs (see src/routes.tsx). */
function pageModule(route: string) {
  if (route === '/') return null;
  if (route.startsWith('/work/')) return 'src/pages/ProjectPage.tsx';
  const name = route.slice(1);
  return `src/pages/${name[0].toUpperCase()}${name.slice(1)}Page.tsx`;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function setMeta(html: string, attr: 'name' | 'property', key: string, value: string) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (re.test(html)) return html.replace(re, `$1${esc(value)}$2`);
  return html.replace('</head>', `  <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`);
}

function render(base: string, meta: RouteMeta, url: string | null, site: string | null, preload: string[], noindex = false) {
  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setMeta(html, 'property', 'og:title', meta.title);
  if (meta.description) {
    html = setMeta(html, 'name', 'description', meta.description);
    html = setMeta(html, 'property', 'og:description', meta.description);
  }
  if (meta.image) {
    const src = (site ?? '') + meta.image.src;
    html = setMeta(html, 'property', 'og:image', src);
    html = setMeta(html, 'property', 'og:image:width', String(meta.image.width));
    html = setMeta(html, 'property', 'og:image:height', String(meta.image.height));
    html = setMeta(html, 'name', 'twitter:image', src);
  }
  if (url) {
    html = setMeta(html, 'property', 'og:url', url);
    html = html.replace('</head>', `  <link rel="canonical" href="${url}" />\n  </head>`);
  }
  if (noindex) html = html.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>');
  for (const href of preload) {
    html = html.replace('</head>', `  <link rel="modulepreload" crossorigin href="/${href}" />\n  </head>`);
  }
  return html;
}

/** The chunk for a page module plus the shared chunks it imports. */
function chunksFor(bundle: Rollup.OutputBundle, root: string, moduleId: string | null) {
  if (!moduleId) return [];
  const abs = path.join(root, moduleId);
  for (const file of Object.values(bundle)) {
    if (file.type === 'chunk' && file.facadeModuleId === abs) {
      return [file.fileName, ...file.imports.filter((f) => !(bundle[f] as { isEntry?: boolean }).isEntry)];
    }
  }
  throw new Error(`site-plugin: no chunk found for ${moduleId}`);
}

export function sitePages(): Plugin {
  let root = process.cwd();
  let outDir = 'dist';
  let bundle: Rollup.OutputBundle | null = null;
  return {
    name: 'olympus-site-pages',
    apply: 'build',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    writeBundle(_options, output) {
      bundle = output;
    },
    async closeBundle() {
      if (!bundle) return;
      const site = process.env.VITE_SITE_URL?.replace(/\/+$/, '') || null;
      const base = await readFile(path.join(outDir, 'index.html'), 'utf8');

      for (const route of staticRoutes) {
        const url = site ? `${site}${route === '/' ? '/' : route}` : null;
        const html = render(base, routeMeta(route), url, site, chunksFor(bundle, root, pageModule(route)));
        const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
        await mkdir(path.dirname(path.join(outDir, file)), { recursive: true });
        await writeFile(path.join(outDir, file), html);
      }
      await writeFile(path.join(outDir, '404.html'), render(base, routeMeta('/404'), null, site, [], true));

      await writeFile(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${site}/sitemap.xml\n` : ''}`,
      );
      if (site) {
        const urls = staticRoutes.map((r) => `  <url><loc>${site}${r}</loc></url>`).join('\n');
        await writeFile(
          path.join(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        );
      }

      // Masters that `npm run images` turns into derivatives are never requested directly.
      const masters = Object.entries(manifest)
        .filter(([, m]) => m.dir !== 'crops')
        .map(([key, m]) => path.join(outDir, 'OLYMPUS-asset-library', m.dir, `${key}.png`));
      await Promise.all(masters.map((f) => rm(f, { force: true })));
    },
  };
}
