# OLYMPUS — State
Updated: 2026-09-23 · S7 · by: claude

## STOPPED AT
Task: launch prep (PR #3: `vercel.json` SPA rewrite + absolute OG/Twitter meta). Rebased cleanly onto main after the PR #1/#2 squash-merges diverged its history; awaiting merge.
Files touched: `vercel.json` (new), `vite.config.ts`, `docs/STATE.md`, `docs/sessions/`.
Committed: rebased branch pushed to `claude/vercel-launch-prep`. `main` is at the merge of PR #2 (VELA case study over the branding pass).
Next concrete step: owner (or Claude) merges PR #3. Vercel will auto-redeploy `main` on merge — confirm the SPA rewrite and `og:image` are live, then set the `VITE_SITE_URL` project env var on Vercel to the assigned/custom domain and redeploy once more so OG/Twitter tags go absolute.
Verify with: `npm run build`; check `/` and `/work/vela` at 1440 / 1024 / 768 / 390 px, including mobile navigation focus.

## NOW
- A fictional creative agency site: "OLYMPUS", run by reincarnated Greek gods. The brief is `docs/brief/CLAUDE-WEBSITE-PROMPT.txt`.
- Stack: React 19 + TypeScript + Vite + React Router 7, plain CSS with tokens, no UI or animation libs.
- The homepage is complete: Hero → Manifesto → Work (4 fictional clients) → Services index → Pantheon → Interruption → Clouds pause → Proof → Contact → Footer, plus the mobile menu.
- VELA has a written concept case study with brief, idea, system and outcome sections. NORTHLINE, HELIO and AURA still use the case-study placeholder; other interior routes remain foundations.
- Repo: https://github.com/jondoogin/olympus. **Now public** (was private) — the owner switched it, likely to simplify the Vercel import. Confirm this is intentional before assuming it stays that way.
- Hosting: Vercel is connected via its GitHub App and auto-deploys `main` to production on every merge (`vercel[bot]` deployment, confirmed via the GitHub deployments API). No custom domain attached yet as of S7.
- Placeholders: hello@olympus.agency, the social links (`#`), three remaining case-study bodies and the collaborator cities. VELA still needs project-specific supporting images. The list is in `docs/ROUTES.md`.
- Voice layer (Claude S3): Greek numerals on indexes, carved Greek (GFS Didot), and live screen readouts (IBM Plex Mono). Rules are in `docs/DESIGN-SYSTEM.md` under "S3 layer".
- External review: production build passes; the desktop homepage and 390px mobile menu render, navigation works, and no horizontal overflow was found at 1440 / 1024 / 768 / 390 px. Breakpoint checks covered layout width, not full visual review at every size.
- Review fixes complete: closed service descriptions are absent from the accessibility tree, mobile route navigation focuses the new main content, and routes have distinct document titles. Browser-verified on `/`, `/work`, and `/work/vela` where applicable. See `docs/sessions/2026-09-23-S4-codex.md`.
- Rebase integration: Claude's tab-away title behavior remains; VELA has a project-specific fictional-concept title. Its concept notice uses the screen register, and its numbered principles use `greekNumeral()`. Build and four-width checks passed after rebase. See `docs/sessions/2026-09-23-S6-codex.md`.
- Not visually verified: reduced-motion rendering. The `.sys--dot` pulse is in the reduce block. Keyboard Enter on the service rows could not be tested in the harness.

## NEXT QUEUE
1. Merge PR #3 (`claude/vercel-launch-prep`) into main. Vercel auto-redeploys; verify `/work/vela` no longer 404s on direct load and `og:image` is present (will still be relative until step 2).
2. Set the `VITE_SITE_URL` Vercel project env var to the live domain, redeploy, and confirm `og:image`/`og:url` resolve absolute.
3. Finish VELA supporting imagery, then build the remaining case studies (NORTHLINE, HELIO, AURA) and interior pages. See `docs/ROUTES.md`.
4. Replace the placeholders once the owner supplies real details (email, socials, collaborator cities).
5. Confirm the repo's new public visibility is intentional; if not, flip it back private (Vercel's GitHub App works with private repos too, it just needs re-authorizing).

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
- `vercel.json` does the SPA fallback (all routes → `index.html`). `vite.config.ts` has a small plugin that rewrites `og:image`/`twitter:image` to absolute and adds `og:url`, gated on the `VITE_SITE_URL` env var (no trailing slash) being set at build time — unset, the tags stay relative (fine for `npm run build` locally/previews). Set it as a Vercel project env var once the domain is known.
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
