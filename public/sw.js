/* OLYMPUS service worker.
 * Strategy (public marketing site; no auth, no user data):
 *  - Pages: network first (always fresh when online), last good copy when offline,
 *    then the branded offline page.
 *  - /assets/* (content-hashed, immutable): cache first.
 *  - Images, textures, icons, fonts: stale-while-revalidate, capped.
 *  - Everything else, every non-GET and every cross-origin request except Google Fonts: untouched.
 * The build replaces __BUILD_ID__ (scripts/site-plugin.ts) so each deploy gets fresh caches
 * and stale ones are deleted on activation. */
const VERSION = '__BUILD_ID__';
const SHELL = `olympus-shell-${VERSION}`;
const PAGES = `olympus-pages-${VERSION}`;
const ASSETS = `olympus-assets-${VERSION}`;
const MEDIA = 'olympus-media-v1';
const FONTS = 'olympus-fonts-v1';
const KEEP = [SHELL, PAGES, ASSETS, MEDIA, FONTS];
const OFFLINE = '/pwa/offline.html';
const PRECACHE = [OFFLINE, '/pwa/icon-192.png', '/pwa/apple-touch-icon.png', '/identity/favicon.svg', '/OLYMPUS-asset-library/06-textures/ivory-paper.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(SHELL).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('olympus-') && !KEEP.includes(key)) await caches.delete(key);
    if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
    await self.clients.claim();
  })());
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

async function page(event) {
  const cache = await caches.open(PAGES);
  try {
    const res = (await event.preloadResponse) || (await fetch(event.request));
    if (res.ok && res.type === 'basic') cache.put(event.request.url.split('?')[0], res.clone()).then(() => trim(PAGES, 40));
    return res;
  } catch {
    const url = event.request.url.split('?')[0];
    return (await cache.match(url)) || (await caches.match(OFFLINE)) || Response.error();
  }
}

async function cacheFirst(request, name) {
  const hit = await caches.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) (await caches.open(name)).put(request, res.clone());
  return res;
}

async function staleWhileRevalidate(event, name, max) {
  const cache = await caches.open(name);
  const hit = await cache.match(event.request);
  const fresh = fetch(event.request).then((res) => {
    if (res.ok || res.type === 'opaque') cache.put(event.request, res.clone()).then(() => trim(name, max));
    return res;
  });
  if (hit) { event.waitUntil(fresh.catch(() => {})); return hit; }
  return fresh;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(event, FONTS, 30));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname === '/sw.js' || url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') { event.respondWith(page(event)); return; }
  if (url.pathname.startsWith('/assets/')) { event.respondWith(cacheFirst(request, ASSETS)); return; }
  if (request.headers.has('range')) return; // media streams go straight to the network
  if (/\.(?:webp|avif|png|jpe?g|svg|gif|woff2?)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(event, MEDIA, 160));
  }
});
