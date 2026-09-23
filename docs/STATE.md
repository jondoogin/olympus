# OLYMPUS — State
Updated: 2026-09-23 · S3 · by: claude

## STOPPED AT
Task: UI/UX + voice pass, "antiquity, rendered" (S3). Done, pushed to branch `claude/adoring-turing-zhiltk` (not merged to main).
Files touched: index.html, App.tsx, main.tsx, content/site.ts, lib/antiquity.ts (new), components/{Label,Header,Footer}.tsx, sections/{Hero,Manifesto,Work,Services,Pantheon,Interruption,Proof,Contact,Maxims(new)}.tsx, pages/{CulturePage,NotFound}.tsx, styles/*.css, docs.
Not touched on purpose, because ChatGPT is producing image/video assets in parallel: ProjectPage.tsx, the `projects` array, image manifest, scripts/, public/.
Next concrete step: owner reviews the branch. Then merge it, and fold ChatGPT's new assets into the case-study pages.
Verify with: `npm run build` (tsc + vite). Checked visually at 1440 / 1100 / 1024 / 768 / 390 px, including the mobile menu, /culture and 404. No horizontal overflow.

## NOW
- A fictional creative agency site: "OLYMPUS", run by reincarnated Greek gods. The brief is `docs/brief/CLAUDE-WEBSITE-PROMPT.txt`.
- Stack: React 19 + TypeScript + Vite + React Router 7, plain CSS with tokens, no UI or animation libs.
- The homepage is complete: Hero → Manifesto → Work (4 fictional clients) → Services index → Pantheon → Interruption → Clouds pause → Proof → Contact → Footer, plus the mobile menu.
- Interior routes are foundations only: /work, /work/:slug, /services, /people, /culture, /about, /contact, and a 404.
- Repo: https://github.com/jondoogin/olympus (private). The only branch is `main`.
- Placeholders: hello@olympus.agency, the social links (`#`), case-study body copy and the collaborator cities. The list is in `docs/ROUTES.md`.
- Voice layer (S3): Greek numerals on every index, carved Greek (GFS Didot), live "screen" readouts (IBM Plex Mono). The rules are in DESIGN-SYSTEM.md under "S3 layer".
- Not visually verified: reduced-motion rendering. The new `.sys--dot` pulse is in the reduce block. Keyboard Enter on the service rows couldn't be tested in the harness (a click works).

## NEXT QUEUE
1. Owner review of the S3 voice pass. Merge `claude/adoring-turing-zhiltk` → main.
2. Integrate ChatGPT's new image/video assets into /work/:slug (via `npm run images` + `<Picture>`).
3. Triage the ChatGPT review into concrete tasks here.
4. Build out the interior pages (case studies first). See `docs/ROUTES.md`.
5. Replace the placeholders once the owner supplies real details.
6. Launch prep: pick a host, set up the SPA fallback rewrite, and make OG URLs absolute.

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
