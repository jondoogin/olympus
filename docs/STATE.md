# OLYMPUS — State
Updated: 2026-09-23 · S4 · by: codex, after Claude's branding pass

## STOPPED AT
Task: nothing in flight; the three external-review fixes are complete
Files touched: `src/App.tsx`, `src/content/site.ts`, `src/sections/Services.tsx`, `docs/STATE.md`, `docs/sessions/2026-09-23-S4-codex.md`
Committed: S4 accessibility fixes on this branch; Claude's branding pass is on main
Next concrete step: build out the first fictional concept case study using the existing `/work/:slug` template and `docs/ROUTES.md`.
Verify with: `npm run build`; review the case study at desktop and 390px, and confirm the fictional-concept label remains clear.

## NOW
- A fictional creative agency site: "OLYMPUS", run by reincarnated Greek gods. The brief is `docs/brief/CLAUDE-WEBSITE-PROMPT.txt`.
- Stack: React 19 + TypeScript + Vite + React Router 7, plain CSS with tokens, no UI or animation libs.
- The homepage is complete: Hero → Manifesto → Work (4 fictional clients) → Services index → Pantheon → Interruption → Clouds pause → Proof → Contact → Footer, plus the mobile menu.
- Interior routes are foundations only: /work, /work/:slug, /services, /people, /culture, /about, /contact, and a 404.
- Repo: https://github.com/jondoogin/olympus (private).
- Placeholders: hello@olympus.agency, the social links (`#`), case-study body copy and the collaborator cities. The list is in `docs/ROUTES.md`.
- Voice layer (Claude S3): Greek numerals on indexes, carved Greek (GFS Didot), and live screen readouts (IBM Plex Mono). Rules are in `docs/DESIGN-SYSTEM.md` under "S3 layer".
- External review: production build passes; the desktop homepage and 390px mobile menu render, navigation works, and no horizontal overflow was found at 1440 / 1024 / 768 / 390 px. Breakpoint checks covered layout width, not full visual review at every size.
- Review fixes complete: closed service descriptions are absent from the accessibility tree, mobile route navigation focuses the new main content, and routes have distinct document titles. Browser-verified on `/`, `/work`, and `/work/vela` where applicable. See `docs/sessions/2026-09-23-S4-codex.md`.
- Not visually verified: reduced-motion rendering. The `.sys--dot` pulse is in the reduce block. Keyboard Enter on the service rows could not be tested in the harness.

## NEXT QUEUE
1. Integrate future project-specific assets into /work/:slug (via `npm run images` + `<Picture>`).
2. Build out the interior pages (case studies first). See `docs/ROUTES.md`.
3. Replace the placeholders once the owner supplies real details.
4. Launch prep: pick a host, set up the SPA fallback rewrite, and make OG URLs absolute.

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
