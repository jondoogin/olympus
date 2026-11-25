# OLYMPUS — Creative Agency

Higher ideas for a lower world. React 19 + TypeScript + Vite, plain CSS with design tokens.

```bash
npm install
npm run images   # only needed if masters change; derivatives are committed in public/
npm run dev
npm run build && npm run preview
```

- `src/content/site.ts` — all copy and structured content
- `src/styles/tokens.css` — palette, type, grid, space, z-index, motion
- `src/sections/` — homepage sections · `src/pages/` — routes · `src/components/` — shared parts
- `docs/DESIGN-SYSTEM.md` — design-system note · `docs/ROUTES.md` — route/content outline

## Installable app (PWA)

Olympus installs to the iPhone Home Screen and runs full screen, with no App Store and no paid services.
Keeping it installable is a standing requirement for every change.

- `public/manifest.webmanifest`: name, stable `id`, scope, standalone display, icons, shortcuts.
- `public/sw.js`: pages network-first with the last good copy offline, hashed `/assets` cache-first,
  images and fonts stale-while-revalidate. The build stamps a per-deploy id so old caches are dropped.
  Never cache authenticated or user-specific responses here.
- `public/pwa/offline.html`: branded fallback for pages not yet visited.
- `public/pwa/*.png`: icons rendered from one vector master by `npm run icons` (`scripts/build-pwa-icons.mjs`).
  Full-bleed squares; the OS rounds the corners.
- `src/components/AppShell.tsx`: service-worker registration, offline notice, install invitation
  (iOS steps or the Android install prompt, dismissal remembered 60 days, hidden when installed) and the share button.
- `npm run check:pwa`: manifest, icons, service worker, offline, install invitation and iPhone-width layout.

**Install on iPhone:** open the site in Safari, tap Share, choose Add to Home Screen, keep Open as Web App on, tap Add.
