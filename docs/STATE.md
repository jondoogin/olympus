# OLYMPUS — State
Updated: 2026-09-25 · S13 · by: claude

## STOPPED AT
Task: S13 platform + mobile pass is on branch `claude/next-features-chatgpt-wait-btk862` (not merged). It adds per-route HTML/meta + real 404 + sitemap, stops deploying master PNGs, lazy route chunks, View Transition page turns, a contact brief form, CI with a browser check, and a touch/scroll motion layer.
Files touched: see `docs/sessions/2026-09-25-S13-claude.md`.
Committed: pushed to the branch above; no PR opened yet.
Next concrete step: open a PR, confirm the Vercel preview serves `/work/vela` (clean URL) and returns 404 for an unknown path, then merge. Owner reviews the new mobile motion on a real phone.
Verify with: `npm run build && npm run check` (Playwright; every route at 1440 / 1024 / 768 / 390 px plus 7 interaction checks). CI runs the same on every push.
Watch out for: `vercel.json` no longer rewrites everything to `index.html`; every real route must be in `staticRoutes` (src/lib/meta.ts) or it will 404 on direct load. Use the canonical domain, not hashed deployment URLs.

## NOW
- A fictional creative agency site: "OLYMPUS", run by reincarnated Greek gods. The brief is `docs/brief/CLAUDE-WEBSITE-PROMPT.txt`.
- Stack: React 19 + TypeScript + Vite + React Router 7, plain CSS with tokens, no UI or animation libs.
- The homepage is complete: Hero → Manifesto → Work (4 fictional clients) → Services index → Pantheon → Interruption → Clouds pause → Proof → Contact → Footer, plus the mobile menu.
- VELA, NORTHLINE, HELIO and AURA each have a complete fictional concept case study with brief, idea, system, outcome, three supporting stills and a silent motion study. Services, People, Culture and About have route-specific concept content; Contact now has a real email link and brief guidance. Work is the complete concept index.
- Repo: https://github.com/jondoogin/olympus (public, confirmed intentional by owner). PR #5 merged the contact and responsive motion update to `main` at 1b5dce9. Earlier wip branches remain as milestones.
- Hosting: Vercel auto-deploys `main`. Canonical live URL: https://olympus-green.vercel.app. The hashed deployment URLs are fixed-build previews and change each deploy; do not use them as the site URL.
- Production browser check after PR #5: `/`, all four `/work/:slug` routes and all five interior routes load directly with HTTP 200. At 1440 / 1024 / 768 / 390 px all ten rendered without overflow, failed loaded images or a Vite overlay. At mobile/tablet widths, project and case-study imagery, portraits and interior text have scroll-linked depth and entrance choreography; work cards expose a view cue without hover. Reduced-motion VELA uses its still and all new translations collapse. `og:url`, `og:image`, and `twitter:image` remain absolute `https://olympus-green.vercel.app/...` URLs. `VITE_SITE_URL` is set to that origin, with `https://` and no trailing slash. Update it and redeploy if a custom domain is attached.
- Vercel Authentication is off project-wide, so previews are public. Standard Protection only exempts production custom domains; consider re-enabling it after one is attached.
- Contact: `john@duggan.design` and owner-supplied Instagram, LinkedIn, Behance and Dribbble profiles are live. No standalone submission form or office address is published. No collaborator cities are displayed as facts; real network details await the owner. See `docs/ROUTES.md`.
- Voice layer (Claude S3): Greek numerals on indexes, carved Greek (GFS Didot), and live screen readouts (IBM Plex Mono). Rules are in `docs/DESIGN-SYSTEM.md` under "S3 layer".
- External review: production build passes; the desktop homepage and 390px mobile menu render, navigation works, and no horizontal overflow was found at 1440 / 1024 / 768 / 390 px. Breakpoint checks covered layout width, not full visual review at every size.
- Review fixes complete: closed service descriptions are absent from the accessibility tree, mobile route navigation focuses the new main content, and routes have distinct document titles. Browser-verified on `/`, `/work`, and `/work/vela` where applicable. See `docs/sessions/2026-09-23-S4-codex.md`.
- Rebase integration: Claude's tab-away title behavior remains; VELA has a project-specific fictional-concept title. Its concept notice uses the screen register, and its numbered principles use `greekNumeral()`. Build and four-width checks passed after rebase. See `docs/sessions/2026-09-23-S6-codex.md`.
- Each project has three project-specific supporting stills, responsive derivatives, and a 9-second silent motion study assembled from stills. The media is integrated into each story with distinct compositions: VELA editorial, NORTHLINE architectural, HELIO solar, AURA dark product. Film frames carry project titles and an accessible play/pause control; the film is replaced by a still when reduced motion is requested. Build and four-width overflow checks passed. See `docs/sessions/2026-09-23-S8-codex.md` and S9.
- `npm run images` succeeds with `sharp`; `npm run build` passes. Keyboard Enter opens and closes Services rows. The 390px mobile menu fits with the new social links; the Contact opener and representative motion frames were visually inspected. Scroll-position checks at 390 and 1024 px confirmed changing image translation and project cues.
- Canonical production headers for `/` and `/work/vela` return HTTP 200 without `x-robots-tag`; the HTML has no robots noindex tag.
- S13 (branch, see STOPPED AT): the build writes `dist/<route>.html` per route with its own title, description, canonical, og:url and (projects) a 1.91:1 og:image from `_responsive/social/`, plus `404.html` (noindex), `robots.txt` and `sitemap.xml`. Vercel serves them with `cleanUrls`; unknown paths get a real 404. Master PNGs are pruned from `dist` (deploy 79 MB → 23 MB); they stay in `public/`. Pages other than Home are lazy chunks, preloaded on idle; the gain is small (~5 KB gz) because React and `site.ts` dominate the main bundle.
- S13 page turns: internal links run inside a View Transition (old page lifts, new wipes up; a project card's image morphs into the case study's lead image). Reduced motion or no API → plain navigation.
- S13 contact: `/contact` has a brief form. Without `VITE_CONTACT_ENDPOINT` it drafts an email in the visitor's mail app; set that env var to any JSON form endpoint (e.g. Formspree) to post instead.
- S13 mobile/tablet motion: on touch screens the element crossing the middle of the screen takes its hover treatment (project pull-in, service width stretch, Pantheon accent bar, next-project gold), presses answer with a scale, display type unfolds along the width axis as it scrolls in (CSS scroll timelines; static where unsupported), the hero plate pushes in and the headline folds as you leave it, list items rise into place, the contact bolt charges, and the interruption's sky flickers when the bolt strikes. Desktop is unchanged.

## NEXT QUEUE
1. Open a PR for the S13 branch, check the Vercel preview (clean URLs, real 404, page turns on a phone), merge.
2. Owner reviews motion pacing on a physical phone and tablet; tune specific sections based on feedback.
3. Optional: choose a form service and set `VITE_CONTACT_ENDPOINT` so briefs post instead of drafting an email.
4. Add an office address or collaborator details only if the owner supplies real information. A custom domain remains optional.

## INVARIANTS
- The logo is never retyped or redrawn. `components/Logo.tsx` inlines the library SVG and maps only `fill="#080808"` → currentColor.
- Master assets in `public/OLYMPUS-asset-library/` are never edited. Derivatives come only from `npm run images`.
- `npm run images` never upscales. It regenerates `src/content/image-manifest.json`, and that manifest is where `lib/images.ts` gets its `ImageKey` types.
- A new image means: add the master → run `npm run images` → reference it by key through `<Picture>`. Never hardcode a path.
- The Zeus People portrait is a sharp crop (`CROPS` in scripts/build-images.mjs) of the hero. Don't add a separate Zeus file.
- The header reads `data-ink="ivory|obsidian"` from sections inside `<main>` (plus `.site-footer`). Every new full-width section needs `data-ink`.
- `[data-reveal='wipe']` clips the child `.pic`, not the observed element. A fully clipped target never fires IntersectionObserver.
- Parallax uses the CSS `translate` property; reveals use `transform` or `scale`. Keep them separate so they don't clobber each other.
- All copy lives in `src/content/site.ts`. Layout components contain no copy strings except UI chrome.
- Breakpoints are 768 / 1100, defined in both `styles/tokens.css` and `lib/tokens.ts`. Change both together.
- Greek comes only from the vetted list, and numerals come only from `greekNumeral()` (see DESIGN-SYSTEM "S3 layer"). Screen readouts must show real values.
- Accents stay sparse: gold = bolt / annotations / "&"; Aegean = contact band + focus; Apollo orange = HELIO + Apollo only.
- No Greek-key borders, no novelty cursor, no WebGL. Handwritten annotations are limited to one per section at most.
- Projects must stay labelled as fictional concepts. Never imply real clients or real results.
- Every animation must collapse under `prefers-reduced-motion`. Add the new selector to the reduce block at the end of `sections.css`.
- A new route needs three things: the `<Route>` in App.tsx, a lazy entry in `src/routes.tsx`, and a place in `staticRoutes` / `routeMeta` (src/lib/meta.ts) so the build writes its HTML file. `pageModule` in scripts/site-plugin.ts maps it to its chunk.
- Touch-only states key off `(hover: none)` and `.is-focus` (hooks/useFocusBand). Scroll-timeline effects live in one `@supports (animation-timeline: view())` block in sections.css and are limited to < 1100px.

## FRAGILE
- `vercel.json` uses `cleanUrls` and no rewrites: `/work/vela` is served from `dist/work/vela.html`, written by `scripts/site-plugin.ts`. The `vite.config.ts` plugin uses `VITE_SITE_URL` at build time to add absolute OG/Twitter image URLs and `og:url`; the value needs the `https://` origin without a trailing slash.
- The desktop hero meta rail is one line at ≥1380px. The "Rendered in…" readout hides below that, and the hero intro must stay 3 lines or it collides with "for a lower world."
- Display type sizes are tuned so words like "SELECTED", "NORTHLINE", "MORTALS" and "OLYMPUS." don't clip at 390px. Re-check mobile after any copy or type change (`--fs-display` and the per-section clamps).
- The desktop hero composition depends on the crop `hero.crop` in site.ts plus the annotation position (`.hero__annot` in sections.css).
- Services open/close handles mouse, touch and keyboard (`hovered` ref in sections/Services.tsx). It's easy to break touch.
- The mobile menu focus trap depends on the `onClose` identity staying stable (useCallback in Header.tsx).
- Page turns need `<BrowserRouter useTransitions={false}>` (main.tsx): the swap must happen synchronously inside `startViewTransition`. `routes.tsx` renders an already-loaded page synchronously for the same reason.
- The header re-reads its ink when `#main`'s children change (MutationObserver), because lazy pages mount after the first probe.

## DEEPER
docs/DESIGN-SYSTEM.md — tokens, components, motion inventory; read when changing visuals
docs/ROUTES.md — route map + placeholder list; read when building pages
docs/brief/ — original brief, asset manifest, image prompts; read for creative decisions
docs/sessions/ — grep, don't read
