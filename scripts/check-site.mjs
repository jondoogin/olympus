// Browser regression check for the built site (run `npm run build` first).
// Loads every route at 1440 / 1024 / 768 / 390 px and scrolls it end to end, then
// exercises the interactions earlier sessions kept re-testing by hand.
// Usage: npm run check        Failing pages are screenshotted to check-results/.
import { access, mkdir, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { preview } from 'vite';
import { chromium } from 'playwright';

const WIDTHS = [1440, 1024, 768, 390];
const DIST = 'dist';
const OUT = 'check-results';
const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);

// ---------- The build output ----------
const htmlFiles = [
  ...(await readdir(DIST)).filter((f) => f.endsWith('.html')),
  ...(await readdir(path.join(DIST, 'work'))).filter((f) => f.endsWith('.html')).map((f) => `work/${f}`),
];
const routes = htmlFiles
  .filter((f) => f !== '404.html')
  .map((f) => (f === 'index.html' ? '/' : `/${f.replace(/\.html$/, '')}`))
  .sort();
if (routes.length < 11) fail('dist', `expected 11 route pages, found ${routes.length}`);

const titles = new Map();
for (const f of htmlFiles) {
  const html = await readFile(path.join(DIST, f), 'utf8');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) fail(f, 'missing <title>');
  if (titles.has(title)) fail(f, `duplicate <title> "${title}" (also ${titles.get(title)})`);
  titles.set(title, f);
  if (f === '404.html' && !html.includes('name="robots" content="noindex"')) fail(f, 'missing noindex');
  // Prerendered: the page's own markup ships in the HTML, not just an empty #root.
  const rootTag = html.match(/<div id="root" data-route="([^"]*)">([\s\S]{0,40})/);
  if (!rootTag || rootTag[2].startsWith('</div>')) fail(f, 'not prerendered (empty #root)');
  else if (!/<main[^>]*>[\s\S]*<h1/.test(html)) fail(f, 'prerendered markup has no <h1> in <main>');
  if (process.env.VITE_SITE_URL && f !== '404.html' && !html.includes('rel="canonical"')) fail(f, 'missing canonical link');
}
await access(path.join(DIST, 'robots.txt')).catch(() => fail('dist', 'missing robots.txt'));
if (process.env.VITE_SITE_URL) await access(path.join(DIST, 'sitemap.xml')).catch(() => fail('dist', 'missing sitemap.xml'));
const shipped = await readdir(path.join(DIST, 'OLYMPUS-asset-library', '05-selected-work'));
if (shipped.some((f) => f.endsWith('.png'))) fail('dist', 'master PNGs from 05-selected-work were deployed');

// ---------- Every route, every width ----------
const server = await preview({ logLevel: 'error', preview: { port: 4173, strictPort: false } });
const base = server.resolvedUrls.local[0].replace(/\/$/, '');
const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

async function open(width, url, { initScript, ...opts } = {}) {
  const mobile = width < 800;
  const context = await browser.newContext({
    viewport: { width, height: mobile ? 844 : 900 },
    hasTouch: mobile,
    isMobile: mobile,
    ...opts,
  });
  if (initScript) await context.addInitScript(initScript);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) errors.push(m.text());
  });
  page.on('response', (r) => {
    if (r.url().startsWith(base) && r.status() >= 400 && !r.url().endsWith('/does-not-exist')) {
      errors.push(`${r.status()} ${r.url().slice(base.length)}`);
    }
  });
  await page.goto(base + url, { waitUntil: 'load' });
  return { page, context, errors };
}

async function checkRoute(url, width) {
  const where = `${url} @${width}`;
  const before = failures.length;
  const { page, context, errors } = await open(width, url);
  try {
    await page.waitForTimeout(400);
    let overflow = 0;
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.round((width < 800 ? 844 : 900) * 0.8);
    for (let y = 0; y <= height; y += step) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
      await page.waitForTimeout(90);
      overflow = Math.max(overflow, await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth));
    }
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(300);
    const state = await page.evaluate(() => ({
      broken: [...document.images].filter((i) => i.currentSrc && i.complete && i.naturalWidth === 0).map((i) => i.currentSrc),
      overlay: !!document.querySelector('vite-error-overlay'),
      h1: document.querySelector('main h1')?.textContent?.trim() ?? '',
      title: document.title,
    }));
    if (overflow > 0) fail(where, `horizontal overflow of ${overflow}px`);
    if (state.broken.length) fail(where, `broken images: ${state.broken.join(', ')}`);
    if (state.overlay) fail(where, 'Vite error overlay');
    if (!state.h1) fail(where, 'no <h1> in main');
    if (url === '/does-not-exist' && !state.title.startsWith('Lost to antiquity')) fail(where, `404 title was "${state.title}"`);
    for (const e of errors) fail(where, e);
    if (failures.length > before) await page.screenshot({ path: path.join(OUT, `${url.replace(/\W+/g, '_')}-${width}.png`) });
  } finally {
    await context.close();
  }
}

const jobs = WIDTHS.flatMap((w) => [...routes, '/does-not-exist'].map((r) => [r, w]));
const queue = [...jobs];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const [r, w] = queue.shift();
    const before = failures.length;
    await checkRoute(r, w).catch((e) => fail(`${r} @${w}`, e.message));
    process.stdout.write(failures.length > before ? 'F' : '.');
  }
}));
process.stdout.write('\n');

// ---------- Interactions ----------
let interactions = 0;
async function interaction(name, width, url, run, opts) {
  interactions++;
  const { page, context, errors } = await open(width, url, opts);
  try {
    await page.waitForTimeout(600);
    await run(page);
    for (const e of errors) fail(name, e);
  } catch (e) {
    fail(name, e.message.split('\n')[0]);
    await page.screenshot({ path: path.join(OUT, `${name.replace(/\W+/g, '_')}.png`) }).catch(() => {});
  } finally {
    await context.close();
  }
}
const expect = (ok, msg) => { if (!ok) throw new Error(msg); };

await interaction('services keyboard', 1440, '/', async (page) => {
  const btn = page.locator('.svc__btn').first();
  await btn.focus();
  await page.keyboard.press('Enter');
  expect((await btn.getAttribute('aria-expanded')) === 'true', 'Enter did not open the first service');
  await page.keyboard.press('Enter');
  expect((await btn.getAttribute('aria-expanded')) === 'false', 'Enter did not close the first service');
});

await interaction('reduced motion film', 390, '/work/vela', async (page) => {
  expect((await page.locator('.case-film video').count()) === 0, 'video shown under reduced motion');
  expect((await page.locator('.case-film img').count()) === 1, 'still missing under reduced motion');
}, { reducedMotion: 'reduce' });

for (const width of [1440, 390]) {
  await interaction(`project card navigation @${width}`, width, '/work', async (page) => {
    await page.locator('.proj__link').first().click();
    await page.waitForURL('**/work/vela');
    await page.waitForTimeout(1200);
    expect((await page.locator('main h1').textContent())?.includes('VELA'), 'case study did not render');
    expect((await page.evaluate(() => window.scrollY)) === 0, 'case study did not open at the top');
    expect((await page.title()).startsWith('VELA'), 'tab title was not updated');
  });
}

await interaction('header ink on a dark page, loaded directly', 768, '/work/helio', async (page) => {
  await page.waitForTimeout(800);
  const ink = await page.locator('.site-header').getAttribute('data-ink');
  expect(ink === 'ivory', `header ink was ${ink} over HELIO's dark opener`);
});

await interaction('mobile menu navigation', 390, '/', async (page) => {
  await page.locator('.menu-toggle').first().click();
  await page.locator('#mobile-menu a[href="/work"]').click();
  await page.waitForURL('**/work');
  await page.waitForTimeout(800);
  expect((await page.locator('#mobile-menu').getAttribute('data-open')) === 'false', 'menu stayed open');
});

await interaction('contact brief', 390, '/contact', async (page) => {
  await page.locator('.brief__submit').click();
  expect((await page.locator('.brief__error').count()) === 3, 'empty brief did not show three errors');
  expect((await page.evaluate(() => document.activeElement?.id)) === 'brief-name', 'focus did not move to the first error');
  await page.fill('#brief-name', 'Check');
  await page.fill('#brief-email', 'check@example.com');
  await page.fill('#brief-message', 'A problem worth solving, in a sentence.');
  await page.locator('.brief__submit').click();
  await page.locator('.brief__done').waitFor({ timeout: 3000 });
  const href = await page.locator('.brief__done a').getAttribute('href');
  expect(href?.startsWith('mailto:') && href.includes('Check'), 'draft email link missing the brief');
});

for (const [url, width] of [['/work/vela', 390], ['/', 1440]]) {
  await interaction(`readable without JavaScript ${url} @${width}`, width, url, async (page) => {
    // The hero <h1> has no box of its own (its lines are positioned), so look at any part of it.
    const h1 = page.locator('main h1, main h1 *').filter({ hasText: /\S/ });
    expect(await h1.evaluateAll((els) => els.some((el) => el.getBoundingClientRect().height > 0)), 'no visible <h1>');
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll('[data-reveal]')].filter((el) => getComputedStyle(el).opacity === '0').length,
    );
    expect(hidden === 0, `${hidden} reveal target(s) stayed invisible`);
  }, { javaScriptEnabled: false });
}

for (const url of ['/about', '/work/helio']) {
  await interaction(`hydrates the prerendered page ${url}`, 1440, url, async (page) => {
    // Hydration keeps the server-rendered nodes; a client re-render would remove them.
    await page.waitForTimeout(600);
    const removed = await page.evaluate(() => window.__removedHeadings);
    expect(removed === 0, `${removed} prerendered heading(s) were replaced instead of hydrated`);
  }, {
    initScript: () => {
      window.__removedHeadings = 0;
      new MutationObserver((records) => {
        for (const r of records) for (const n of r.removedNodes) {
          if (n.nodeType === 1 && (n.matches('h1') || n.querySelector('h1'))) window.__removedHeadings++;
        }
      }).observe(document, { childList: true, subtree: true });
    },
  });
}

await browser.close();
await new Promise((resolve) => server.httpServer.close(resolve));

const count = jobs.length;
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n  ${failures.join('\n  ')}\nScreenshots: ${OUT}/`);
  process.exit(1);
}
console.log(`All clear: ${routes.length + 1} routes × ${WIDTHS.length} widths (${count} pages) and ${interactions} interaction checks.`);
