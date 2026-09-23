# OLYMPUS — State
Updated: 2026-09-23 · S10 · by: codex

## STOPPED AT
Task: reconcile and continue the existing four-project media branch, `wip/project-media-direction`, after production launch prep landed on `main`.
Files touched: this handoff and `docs/sessions/2026-09-23-S10-codex.md` for the deployment correction.
Committed: project media at b47e6ed and its S9 handoff at d08d42a; `origin/main` now includes PR #3 at 5e3e58b.
Next concrete step: inspect and integrate `origin/main` into the media branch without losing its four case studies or the SPA rewrite, then verify and finish the interior pages.
Verify with: `npm run build`; inspect all changed pages at 1440 / 1024 / 768 / 390 px, then verify the canonical production URL after deployment.
Watch out for: PR #3's `vercel.json` and absolute meta URL handling must remain intact when this branch is merged.

## NOW
- A fictional creative agency site: "OLYMPUS", run by reincarnated Greek gods. The brief is `docs/brief/CLAUDE-WEBSITE-PROMPT.txt`.
- Stack: React 19 + TypeScript + Vite + React Router 7, plain CSS with tokens, no UI or animation libs.
- The homepage is complete: Hero → Manifesto → Work (4 fictional clients) → Services index → Pantheon → Interruption → Clouds pause → Proof → Contact → Footer, plus the mobile menu.
- VELA, NORTHLINE, HELIO and AURA each have a complete fictional concept case study with brief, idea, system, outcome, three supporting stills and a silent motion study. Other interior routes remain foundations.
- Repo: https://github.com/jondoogin/olympus (public; confirm intended visibility with owner). VELA's written story is merged on `main` (PR #2). The four-project image, film and page direction is on `wip/project-media-direction`, merged with PR #3's `main` for review; do not push it to main directly. Earlier wip branches remain as milestones.
- Hosting: Vercel auto-deploys `main`. PR #3 merged the SPA rewrite and absolute OG/Twitter meta on production commit `5e3e58b`. Canonical live URL: https://olympus-green.vercel.app. The hashed deployment URLs are fixed-build previews and change each deploy; do not use them as the site URL.
- Production browser check: `/` and direct `/work/vela` load with HTTP 200; the case study title is correct. `og:url`, `og:image`, and `twitter:image` use absolute `https://olympus-green.vercel.app/...` URLs. `VITE_SITE_URL` is set to that origin, with `https://` and no trailing slash. Update it and redeploy if a custom domain is attached.
- Vercel Authentication is off project-wide, so previews are public. Standard Protection only exempts production custom domains; consider re-enabling it after one is attached.
- Placeholders: hello@olympus.agency, the social links (`#`) and the collaborator cities. The list is in `docs/ROUTES.md`.
- Voice layer (Claude S3): Greek numerals on indexes, carved Greek (GFS Didot), and live screen readouts (IBM Plex Mono). Rules are in `docs/DESIGN-SYSTEM.md` under "S3 layer".
- External review: production build passes; the desktop homepage and 390px mobile menu render, navigation works, and no horizontal overflow was found at 1440 / 1024 / 768 / 390 px. Breakpoint checks covered layout width, not full visual review at every size.
- Review fixes complete: closed service descriptions are absent from the accessibility tree, mobile route navigation focuses the new main content, and routes have distinct document titles. Browser-verified on `/`, `/work`, and `/work/vela` where applicable. See `docs/sessions/2026-09-23-S4-codex.md`.
- Rebase integration: Claude's tab-away title behavior remains; VELA has a project-specific fictional-concept title. Its concept notice uses the screen register, and its numbered principles use `greekNumeral()`. Build and four-width checks passed after rebase. See `docs/sessions/2026-09-23-S6-codex.md`.
- Each project has three project-specific supporting stills, responsive derivatives, and a 9-second silent motion study assembled from stills. The media is integrated into each story with distinct compositions: VELA editorial, NORTHLINE architectural, HELIO solar, AURA dark product. Film frames carry project titles and an accessible play/pause control; the film is replaced by a still when reduced motion is requested. Build and four-width overflow checks passed. See `docs/sessions/2026-09-23-S8-codex.md` and S9.
- Not visually verified: reduced-motion rendering. The `.sys--dot` pulse is in the reduce block. Keyboard Enter on the service rows could not be tested in the harness.

## NEXT QUEUE
1. Finish review of the integrated four-case-study media branch, verify at four widths, and bring it through a PR.
2. Build the remaining interior pages. See `docs/ROUTES.md`.
3. Check `sharp` via `npm run images` and check `x-robots-tag` on the canonical production URL before launch.
4. Confirm with owner that the repository should be public; replace email, social and city placeholders only after real details are supplied.

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
