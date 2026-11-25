// Installable-app checks: manifest, icons, service worker lifecycle, offline navigation,
// install invitation and safe-area layout at iPhone size. Run after `npm run build`.
import { chromium, devices } from 'playwright';
import { preview } from 'vite';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const failures = [];
const fail = (where, msg) => { failures.push(`${where}: ${msg}`); process.stdout.write('F'); };
const ok = () => process.stdout.write('.');

// ---------- Static: manifest and icons ----------
const m = JSON.parse(await readFile('dist/manifest.webmanifest', 'utf8'));
for (const k of ['id', 'name', 'short_name', 'start_url', 'scope', 'display', 'background_color', 'theme_color']) (m[k] ? ok : () => fail('manifest', `missing ${k}`))();
if (m.display !== 'standalone') fail('manifest', 'display must be standalone');
for (const [size, purpose] of [[192, 'any'], [512, 'any'], [512, 'maskable']]) {
  const icon = m.icons.find((i) => i.sizes === `${size}x${size}` && i.purpose === purpose);
  if (!icon) { fail('manifest', `no ${size} ${purpose} icon`); continue; }
  const meta = await sharp(`dist${icon.src}`).metadata();
  meta.width === size && meta.height === size ? ok() : fail(icon.src, `is ${meta.width}x${meta.height}`);
}
const apple = await sharp('dist/pwa/apple-touch-icon.png').stats();
apple.isOpaque ? ok() : fail('apple-touch-icon', 'must be opaque');
const html = await readFile('dist/index.html', 'utf8');
for (const needle of ['rel="manifest"', 'rel="apple-touch-icon"', 'viewport-fit=cover', 'apple-mobile-web-app-capable', 'apple-mobile-web-app-status-bar-style'])
  html.includes(needle) ? ok() : fail('index.html', `missing ${needle}`);
const sw = await readFile('dist/sw.js', 'utf8');
sw.includes("'__BUILD_ID__'") ? fail('sw.js', 'build id was not stamped') : ok();

// ---------- Live: service worker, offline, install UI ----------
const server = await preview({ logLevel: 'error', preview: { port: 4180, strictPort: false } });
const base = server.resolvedUrls.local[0].replace(/\/$/, '');
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['iPhone 15 Pro'] });
const errors = [];
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

await page.goto(`${base}/`, { waitUntil: 'load' });
const active = await page.evaluate(async () => {
  const reg = await navigator.serviceWorker.ready;
  const w = reg.active;
  if (w.state !== 'activated') await new Promise((r) => w.addEventListener('statechange', () => w.state === 'activated' && r()));
  return w.state;
});
active === 'activated' ? ok() : fail('sw', `state ${active}`);
await page.reload({ waitUntil: 'load' });
(await page.evaluate(() => !!navigator.serviceWorker.controller)) ? ok() : fail('sw', 'page not controlled after reload');
const caches = await page.evaluate(() => caches.keys());
caches.some((k) => k.startsWith('olympus-shell-')) ? ok() : fail('sw', `caches ${caches}`);
const manifestOk = await page.evaluate(async () => (await fetch('/manifest.webmanifest')).ok);
manifestOk ? ok() : fail('manifest', 'not served');

// Visit a case study online so it is kept, then go offline.
await page.goto(`${base}/work/vela`, { waitUntil: 'load' });
await page.waitForTimeout(500);
await ctx.setOffline(true);
await page.goto(`${base}/work/vela`, { waitUntil: 'load' });
(await page.locator('h1').first().innerText()).includes('VELA') ? ok() : fail('offline', 'visited page not served from cache');
(await page.locator('.app-toast[data-show="true"]').count()) ? ok() : fail('offline', 'no offline notice');
await page.goto(`${base}/about`, { waitUntil: 'load' });
(await page.title()).includes('Out of reach') ? ok() : fail('offline', `unvisited page title "${await page.title()}"`);
await page.screenshot({ path: 'check-results/pwa-offline-390.png' });
await ctx.setOffline(false);

// Install invitation: shown on iOS second visit, dismissible, dismissal persists, hidden when standalone.
const ios = await browser.newContext({ ...devices['iPhone 15 Pro'] });
await ios.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); localStorage.setItem('olympus:visits', '1'); });
const p2 = await ios.newPage();
await p2.goto(`${base}/work`, { waitUntil: 'load' });
await p2.waitForSelector('.install[data-open="true"]', { timeout: 10000 }).then(ok, () => fail('install', 'iOS invitation did not open'));
await p2.waitForTimeout(800);
await p2.screenshot({ path: 'check-results/pwa-install-ios-390.png' });
const box = await p2.locator('.install__close').boundingBox();
box && box.width >= 44 && box.height >= 44 ? ok() : fail('install', 'close target under 44px');
await p2.locator('.install__later').click();
(await p2.locator('.install[data-open="true"]').count()) === 0 ? ok() : fail('install', 'did not dismiss');
await p2.reload({ waitUntil: 'load' });
await p2.waitForTimeout(7000);
(await p2.locator('.install[data-open="true"]').count()) === 0 ? ok() : fail('install', 'dismissal did not persist');

const standalone = await browser.newContext({ ...devices['iPhone 15 Pro'] });
await standalone.addInitScript(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => false });
  Object.defineProperty(navigator, 'standalone', { get: () => true });
  localStorage.setItem('olympus:visits', '5');
});
const p3 = await standalone.newPage();
await p3.goto(`${base}/`, { waitUntil: 'load' });
await p3.waitForTimeout(7000);
(await p3.locator('.install').count()) === 0 ? ok() : fail('install', 'shown in standalone');

// Layout: no horizontal overflow on the main routes at iPhone width.
for (const route of ['/', '/work', '/work/helio', '/people', '/contact']) {
  await p3.goto(`${base}${route}`, { waitUntil: 'load' });
  const over = await p3.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  over <= 0 ? ok() : fail(route, `overflows by ${over}px`);
}
await p3.goto(`${base}/work/vela`, { waitUntil: 'load' });
(await p3.locator('.share-btn').count()) ? ok() : fail('share', 'no share button on case study');

const real = errors.filter((e) => !/net::ERR_INTERNET_DISCONNECTED|Failed to load resource|fonts\.g/.test(e));
real.length ? fail('console', real.join(' | ')) : ok();

await browser.close();
await server.httpServer.close();
if (failures.length) { console.error(`\n${failures.length} problem(s):\n  ${failures.join('\n  ')}`); process.exit(1); }
console.log('\nPWA checks passed.');
