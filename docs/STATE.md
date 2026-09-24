# OLYMPUS — State
Updated: 2026-09-24 · S12 · by: codex

## STOPPED AT
Task: nothing in flight; PR #5 published owner-supplied contact links and richer mobile/tablet motion to production.
Files touched: `docs/STATE.md` and `docs/sessions/2026-09-24-S12-codex.md` for the release handoff.
Committed: site update merged to `main` at 1b5dce9; this S12 handoff follows as a docs-only commit.
Next concrete step: owner reviews the motion on a physical phone and tablet and notes any pacing changes; decide whether a standalone contact form is wanted.
Verify with: `npm run build`; check `https://olympus-green.vercel.app` on direct routes and at 1440 / 1024 / 768 / 390 px after future deployments.
Watch out for: use the canonical domain, not hashed fixed-build deployment URLs. `VITE_SITE_URL` must be changed and rebuilt if a custom domain is attached.

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

## NEXT QUEUE
1. Owner reviews motion pacing on a physical phone and tablet; tune specific sections based on feedback.
2. Decide whether to add a standalone contact form. The direct email link works now; a form needs a chosen delivery service or endpoint.
3. Add an office address or collaborator details only if the owner supplies real information. A custom domain remains optional.

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

## FRAGILE
- `vercel.json` rewrites deep links to `index.html`. The `vite.config.ts` plugin uses `VITE_SITE_URL` at build time to add absolute OG/Twitter image URLs and `og:url`; the value needs the `https://` origin without a trailing slash.
- The desktop hero meta rail is one line at ≥1380px. The "Rendered in…" readout hides below that, and the hero intro must stay 3 lines or it collides with "for a lower world."
- Display type sizes are tuned so words like "SELECTED", "NORTHLINE", "MORTALS" and "OLYMPUS." don't clip at 390px. Re-check mobile after any copy or type change (`--fs-display` and the per-section clamps).
- The desktop hero composition depends on the crop `hero.crop` in site.ts plus the annotation position (`.hero__annot` in sections.css).
- Services open/close handles mouse, touch and keyboard (`hovered` ref in sections/Services.tsx). It's easy to break touch.
- The mobile menu focus trap depends on the `onClose` identity staying stable (useCallback in Header.tsx).

## DEEPER
docs/DESIGN-SYSTEM.md — tokens, components, motion inventory; read when changing visuals
docs/ROUTES.md — route map + placeholder list; read when building pages
docs/brief/ — original brief, asset manifest, image prompts; read for creative decisions
docs/sessions/ — grep, don't read
