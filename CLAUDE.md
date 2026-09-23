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
