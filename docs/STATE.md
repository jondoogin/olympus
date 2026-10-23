# OLYMPUS — State
Updated: 2026-10-13 · S20 · by: codex

## STOPPED AT
Task: nothing in flight. Fixed iPhone access by publishing a public standalone identity preview.
Files touched: docs/STATE.md and docs/sessions/2026-10-13-S20-codex.md only.
Committed: source clean at 6ddf2fd on wip/identity-projects; deployment handoff committed separately.
Next concrete step: review https://olympus-lmfn1vugq-read-with-lantern.vercel.app/identity/strike on a phone and use Replay strike.
Verify with: curl -f -L https://olympus-lmfn1vugq-read-with-lantern.vercel.app/identity/strike (public HTTP 200 confirmed).
Watch out for: 127.0.0.1 on a phone points to the phone itself. Only the identity prototype is deployed; full S17/S18 website changes remain local. Production is unchanged.

## NOW
- Selected-mark phone preview: https://olympus-lmfn1vugq-read-with-lantern.vercel.app/identity/strike is public, with replay, downloads and all sixteen studies. Deployed only the saved identity assets from 6ddf2fd to the existing Olympus Vercel project as a preview. Page and SVG assets return public HTTP 200; no Git push or production deployment.
- S18 (local `wip/identity-projects`): owner selected the first O with a yellow bolt. The refined mark has a roughly doubled bolt width at its two intersections, a diagonal cut and two angular edge fractures. The O stays stationary through a single lightning introduction, then holds the final mark. Static colour/mono and animated SVG masters, favicon and both wordmark variants are integrated; the other six letter outlines and library originals are preserved. /identity/strike.html has replay and downloads; /identity/index.html retains sixteen studies with the selected first study updated. Original first study is archived. `scripts/strike-mark.mjs` owns shared geometry/timing; `npm run identity` regenerates vectors and review pages.
- S18 motion: the main header uses animated `Logo`; menu/footer remain static. SVG mask IDs are scoped per component instance, route changes retain the header, and reduced motion disables all strike animations. `npm run check:identity` verifies four widths, opening/impact/final states, stationary O bounds, unique IDs, header persistence, replay and reduced motion. `npm run render:identity` exports a 600px, 3-second GIF that plays once plus timing/final PNGs. Editable SVGs and a download ZIP are described in `output/identity-strike/README.md`. Build, 84-page/16-interaction regression and focused identity checks passed.

- S17 typography: Archivo now carries display, editorial and body copy. Plain Arabic numbers replace the carved Greek register in navigation, indexes, forms and principles. The Greek hero inscription, duplicate Greek proof labels, Greek maxim headings and Olympiad footer are removed. Fine-line SVG drawing plates and one quiet manifesto construction sketch carry the antiquity detail instead.
- S17 projects: THALASSA (island ferry), ORISON (listening hotel), FIELDWORK (seed library) add three grounded fictional briefs, designed applications, nine built-in imagegen photos and three authored vector poster plates. Masters are in `05-selected-work/`; responsive assets, social crops and metadata are integrated. Exact image prompts and generation method are saved in `output/imagegen/prompts.md`. `npm run identity` and `npm run plates` regenerate the vector review and poster masters; run `npm run images` after new poster exports.
- S15 (public preview on `wip/grounded-projects`): projects now describe specific businesses, audiences, assignments and constraints. VELA is a made-to-order studio, NORTHLINE a civic reuse practice, HELIO a two-evening festival and AURA a tabletop speaker concept. Each case study includes a responsive designed application (collection card, proposal cover, programme or quick-start insert). Homepage/work summaries and partner dossier project notes agree with those briefs. All copy stays in site.ts.
- A fictional creative agency site: "OLYMPUS", run by reincarnated Greek gods. The brief is `docs/brief/CLAUDE-WEBSITE-PROMPT.txt`.
- Stack: React 19 + TypeScript + Vite + React Router 7, plain CSS with tokens, no UI or animation libs.
- The homepage is complete: Hero → Manifesto → Work (7 fictional clients) → Services index → Pantheon → Interruption → Clouds pause → Proof → Contact → Footer, plus the mobile menu.
- VELA, NORTHLINE, HELIO, AURA, THALASSA, ORISON and FIELDWORK each have a complete fictional concept case study with brief, idea, system, outcome, supporting stills, a designed application and a reader-controlled drawing plate. Services, People, Culture and About have route-specific concept content; Contact now has a real email link and brief guidance. Work is the complete concept index.
- Repo: https://github.com/jondoogin/olympus (public, confirmed intentional by owner). PR #5 merged the contact and responsive motion update to `main` at 1b5dce9. Earlier wip branches remain as milestones.
- Hosting: Vercel auto-deploys `main`. Canonical live URL: https://olympus-green.vercel.app. The hashed deployment URLs are fixed-build previews and change each deploy; do not use them as the site URL.
- Production browser check after PR #5: `/`, all four `/work/:slug` routes and all five interior routes load directly with HTTP 200. At 1440 / 1024 / 768 / 390 px all ten rendered without overflow, failed loaded images or a Vite overlay. At mobile/tablet widths, project and case-study imagery, portraits and interior text have scroll-linked depth and entrance choreography; work cards expose a view cue without hover. Reduced-motion VELA uses its still and all new translations collapse. `og:url`, `og:image`, and `twitter:image` remain absolute `https://olympus-green.vercel.app/...` URLs. `VITE_SITE_URL` is set to that origin, with `https://` and no trailing slash. Update it and redeploy if a custom domain is attached.
- Vercel Authentication is off project-wide, so previews are public. Standard Protection only exempts production custom domains; consider re-enabling it after one is attached.
- Contact: `john@duggan.design` and owner-supplied Instagram, LinkedIn, Behance and Dribbble profiles are live. No standalone submission form or office address is published. No collaborator cities are displayed as facts; real network details await the owner. See `docs/ROUTES.md`.
- Voice layer: the S3 carved typography experiment is superseded by S17 clarity. IBM Plex Mono remains for plain indexes and live readouts. Current rules are in `docs/DESIGN-SYSTEM.md`.
- External review: production build passes; the desktop homepage and 390px mobile menu render, navigation works, and no horizontal overflow was found at 1440 / 1024 / 768 / 390 px. Breakpoint checks covered layout width, not full visual review at every size.
- Review fixes complete: closed service descriptions are absent from the accessibility tree, mobile route navigation focuses the new main content, and routes have distinct document titles. Browser-verified on `/`, `/work`, and `/work/vela` where applicable. See `docs/sessions/2026-09-23-S4-codex.md`.
- Rebase integration: Claude's tab-away title behavior remains; VELA has a project-specific fictional-concept title. Its concept notice uses the screen register, and its numbered principles use `greekNumeral()`. Build and four-width checks passed after rebase. See `docs/sessions/2026-09-23-S6-codex.md`.
- S17 replaces the four slow slideshow films with seven project-specific SVG plates (`components/ProjectDiagram.tsx`). Each has three keyboard/touch buttons, visible selection and a polite live explanation. Reduced motion removes transitions. Original MP4s remain in public/media but are pruned from dist. Full regression passed: 84 pages, no overflow/broken images/runtime errors, 16 interactions. New long project names have their own card scales.
- `npm run images` succeeds with `sharp`; `npm run build` passes. Keyboard Enter opens and closes Services rows. The 390px mobile menu fits with the new social links; the Contact opener and representative motion frames were visually inspected. Scroll-position checks at 390 and 1024 px confirmed changing image translation and project cues.
- Canonical production headers for `/` and `/work/vela` return HTTP 200 without `x-robots-tag`; the HTML has no robots noindex tag.
- Production check after PR #6: `/`, `/work`, `/work/vela`, `/contact`, `/sitemap.xml` and `/robots.txt` return 200; `/nope` returns 404; master PNGs return 404. `/work/vela` serves its own title, canonical, absolute `og:url` and the 1.91:1 social `og:image`. At 390 px a project card opens its case study with the correct header ink.
- S13 (live since PR #6): the build writes `dist/<route>.html` per route with its own title, description, canonical, og:url and (projects) a 1.91:1 og:image from `_responsive/social/`, plus `404.html` (noindex), `robots.txt` and `sitemap.xml`. Vercel serves them with `cleanUrls`; unknown paths get a real 404. Master PNGs are pruned from `dist` (deploy 79 MB → 23 MB); they stay in `public/`. Pages other than Home are lazy chunks, preloaded on idle; the gain is small (~5 KB gz) because React and `site.ts` dominate the main bundle.
- S14 dossiers: `/people/:slug` is `pages/PersonPage.tsx`; copy is `God.dossier` plus `interior.people.dossier` chrome in site.ts. Titles read "Zeus, CEO — OLYMPUS"; no per-god og:image (portraits don't crop to 1.91:1), so they use the default card. The page-turn morph is generalised (`morphFor` in PageTransitions.tsx): links with `data-morph="person"` carry the nearest `[data-morph-source]` portrait into `.person-hero__portrait`.
- S13 page turns: internal links run inside a View Transition (old page lifts, new wipes up; a project card's image morphs into the case study's lead image). Reduced motion or no API → plain navigation.
- S13 contact: `/contact` has a brief form. Without `VITE_CONTACT_ENDPOINT` it drafts an email in the visitor's mail app; set that env var to any JSON form endpoint (e.g. Formspree) to post instead.
- S13 mobile/tablet motion: on touch screens the element crossing the middle of the screen takes its hover treatment (project pull-in, service width stretch, Pantheon accent bar, next-project gold), presses answer with a scale, display type unfolds along the width axis as it scrolls in (CSS scroll timelines; static where unsupported), the hero plate pushes in and the headline folds as you leave it, list items rise into place, the contact bolt charges, and the interruption's sky flickers when the bolt strikes. Desktop is unchanged.

## NEXT QUEUE
0. Review the selected struck mark and one-shot animation at the public phone preview above; tune bolt geometry or timing from concrete feedback.
1. Review the expanded /work index, three new cases and seven drawing interactions on a physical phone/tablet. Push or publish a preview when requested; S17 is local only.
2. Optional: choose a form service and set `VITE_CONTACT_ENDPOINT` so briefs post instead of drafting an email.
3. Add an office address or collaborator details only if the owner supplies real information. A custom domain remains optional.

## INVARIANTS
- Original library logo masters are preserved. The owner selected mark 01 in S18. `components/Logo.tsx` uses versioned SVGs in `src/assets/identity/` with the canonical struck O and broader diagonal bolt; the other six letter outlines remain unchanged. Use `scripts/strike-mark.mjs` as the geometry/timing source and scope inline SVG mask IDs per instance.
- Master assets in `public/OLYMPUS-asset-library/` are never edited. Derivatives come only from `npm run images`.
- `npm run images` never upscales. It regenerates `src/content/image-manifest.json`, and that manifest is where `lib/images.ts` gets its `ImageKey` types.
- A new image means: add the master → run `npm run images` → reference it by key through `<Picture>`. Never hardcode a path.
- The Zeus People portrait is a sharp crop (`CROPS` in scripts/build-images.mjs) of the hero. Don't add a separate Zeus file.
- The header reads `data-ink="ivory|obsidian"` from sections inside `<main>` (plus `.site-footer`). Every new full-width section needs `data-ink`.
- `[data-reveal='wipe']` clips the child `.pic`, not the observed element. A fully clipped target never fires IntersectionObserver.
- Parallax uses the CSS `translate` property; reveals use `transform` or `scale`. Keep them separate so they don't clobber each other.
- All copy lives in `src/content/site.ts`. Layout components contain no copy strings except UI chrome.
- Breakpoints are 768 / 1100, defined in both `styles/tokens.css` and `lib/tokens.ts`. Change both together.
- Website indexes use `indexNumber()` (ordinary Arabic digits). Do not reintroduce the retired carved Greek typography. Screen readouts must show real values.
- Accents stay sparse: gold = bolt / annotations / "&"; Aegean = contact band + focus; Apollo orange = HELIO + Apollo only.
- No Greek-key borders, no novelty cursor, no WebGL. Handwritten annotations are limited to one per section at most.
- Projects must stay labelled as fictional concepts. Never imply real clients or real results.
- Every animation must collapse under `prefers-reduced-motion`. Add the new selector to the reduce block at the end of `sections.css`.
- A new route needs three things: the `<Route>` in App.tsx, a lazy entry in `src/routes.tsx`, and a place in `staticRoutes` / `routeMeta` (src/lib/meta.ts) so the build writes its HTML file. `pageModule` in scripts/site-plugin.ts maps it to its chunk. A new dynamic family (like `/work/` and `/people/`) also needs its prefix in `preloadRoute` and its dist folder in scripts/check-site.mjs.
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
