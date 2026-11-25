# OLYMPUS

Start every session with the `session-start` skill. End with `handoff`.
(Tools without skills, e.g. ChatGPT: read `docs/STATE.md` first, and before
you finish, update its STOPPED AT / NOW / NEXT QUEUE and add a note in `docs/sessions/`.)

**Read `docs/STATE.md` first.** It is the complete handoff contract.

Do not read DESIGN-SYSTEM, ROUTES, `docs/brief/`, or `docs/sessions/`
unless a specific task requires it. Load reference docs on demand, never
"for context" — that is the main source of wasted budget here.

Build: `npm install && npm run build`
Verify: `npm run build`, then `npm run dev` and check 1440 / 1024 / 768 / 390 px

## Installable app (ongoing requirement)
Olympus ships as an installable PWA (iPhone Home Screen and Android). Every change must keep it
installable and native-feeling: keep the manifest/apple meta in `index.html`, `public/manifest.webmanifest`,
`public/sw.js` (no caching of authenticated or dynamic API responses; navigations stay network-first),
safe-area insets (`--safe-top`/`--safe-bottom`, `--header-bar`), 44px touch targets and no horizontal
overflow at 390 px. Regenerate icons with `npm run icons`. Run `npm run check:pwa` after `npm run build`.
