# OLYMPUS — design system note

**Idea:** ancient authority × contemporary editorial. The site should read as a serious agency first; the mythology comes through in the portraits, the copy and a few small gestures.

**S3 layer — "antiquity, rendered":** the visitor is transported to ancient Greece, and the site knows it is being shown on a screen. Two small registers carry this, always on top of the existing system, never replacing it:

| Register | Font / class | Carries | Examples |
| --- | --- | --- | --- |
| Ancient | GFS Didot, `.inscr` (wide-tracked caps) | Greek numerals, carved Greek, museum-label captions | `Βʹ — Selected work`, `ΟΛΥΜΠΟΣ`, the Delphic maxims, `Olympiad ΨΑʹ, year 2` |
| Screen | IBM Plex Mono, `.sys` (11px) | The site noticing it is a website: live readouts, system notes | `Now showing on 1440 × 900 px of glass`, `Rendered in 0.49s. The Parthenon took fifteen years.`, `Excavating…` image placeholder, `● The oracle is online` |

Rules: both registers stay small and rare (labels, captions, meta rails, one line per block). Greek only from a vetted list: ΟΛΥΜΠΟΣ, ΧΑΙΡΕ, the three Delphic maxims and numerals from `lib/antiquity.ts` (`greekNumeral`, `olympiad`). Don't type ʹ by hand; the helper uses U+0374, and GFS Didot lacks U+02B9. Screen readouts must be real (the actual viewport and load time), never faked. One joke per block, never explained. Still no Greek-key borders, columns-as-decoration or Cinzel-style movie-poster type.

## Tokens (`src/styles/tokens.css`, mirrored in `src/lib/tokens.ts`)

| Group | Values |
| --- | --- |
| Palette | marble `#F4F1EA`, stone `#EBE6DB`, obsidian `#080808`. Accents: gold `#D4AF37` (bolt, annotations, the "&"), Aegean `#2563EB` (contact finale, focus rings, active service number), Apollo `#FF6A00` (HELIO dot, Apollo hover bar). Each accent has only a few jobs. |
| Type | **Archivo** variable (weight + `wdth` 62–125) for display and UI; **Instrument Serif** (italic) for contrast and captions; **Reenie Beanie** for two handwritten notes only. **GFS Didot** (`--font-inscr`) for Greek and numerals, and it also sits in the serif stack so stray Greek falls through to it. **IBM Plex Mono** (`--font-mono`) for the screen register only. |
| Scale | `--fs-micro` 11px labels → `--fs-colossal` (clamped vw). Display type is uppercase, `wdth` 112–125, tracked −0.035em to −0.045em. |
| Grid | 4 cols < 768 · 8 cols 768–1099 · 12 cols ≥ 1100. `.wrap` + `.grid` utilities; children default to full span. |
| Space | 4pt base (`--s-1…--s-10`) plus fluid `--section` rhythm. |
| Borders | 1px hairlines at 18% ink; square corners; pill radius only for chips and CTAs. |
| Z | base 1 · overlay 10 · header 50 · menu 60 · skip 100. |
| Motion | `--ease-out` (0.16,1,0.3,1) for reveals; `--ease-snap` for the bolt; 180 / 420 / 900 / 1200ms. Every duration collapses under `prefers-reduced-motion`. |

Sections set `data-theme` (`dark` / `stone`) to re-map `--bg` / `--fg` / `--rule`. They also set `data-ink` so the fixed header can switch between ivory and obsidian over whatever it sits on.

## Components

- `Logo`: inlines the **exact** library SVGs and maps only `#080808` → `currentColor`. The paths, the bolt and the gold stay as supplied.
- `Picture`: `<picture>` with WebP and JPEG `srcset`, intrinsic width/height to prevent layout shift, lazy loading by default. Crops are set per breakpoint via `crop={{ mobile, tablet, desktop }}` (object-position).
- `Reveal` / `Line`: IntersectionObserver adds `.is-in`. The three kinds are `lines` (masked rise), `fade`, and `wipe` (the image uncovers from the bottom).
- `useScrollProgress`: writes `--p` (0→1). CSS uses it for the hero, manifesto, project and cloud parallax. It is off under reduced motion.
- `Annotation`, `CropMarks`, `Mark` (bolt / delta / bolt-O from `02-marks`), `Label` (Greek numeral + sr-only digit), `PageIntro`.
- `Hero` → `Readout` (live viewport + load time). `Maxims` (Culture page). `App` → `DocumentTitle` (per-route titles; "Come back, mortal." while the tab is hidden). Body ground uses `06-textures/ivory-paper.svg`.

## Motion inventory (deliberately short)

1. Hero entrance: the photo opens from an inset clip and settles from scale 1.14. "HIGHER IDEAS" rises and "for a lower world." *drops* in from above. The annotation draws itself last.
2. Line-mask reveals on "We are Olympus", the interruption, the contact headline and page intros.
3. Project images wipe up from the bottom. On hover the frame pulls in 1.2% while the image scales, a "View project" chip appears, and the client name loosens its tracking.
4. Services: hovering, focusing or tapping a row stretches its name along Archivo's width axis (84 → 118) and dims the others.
5. The gold bolt in the interruption strikes (snap + brief glow). The header and contact CTA bolts tilt on hover.
6. Slow parallax/pan on the columns, projects and clouds. Nothing moves the cursor, and there's no WebGL.
7. At mobile and tablet widths, scrolling also moves project plates, case-study details, gallery images and portraits at a separate depth. Headings and captions rise in as they enter; project cards reveal a persistent view cue and a fine registration line. These effects stop under reduced motion.

## Assets

The masters are copied untouched to `public/OLYMPUS-asset-library/`. `npm run images` (sharp) writes responsive derivatives to `_responsive/` and `src/content/image-manifest.json`. It never upscales. Zeus's People portrait is a 533×800 crop of the hero, made at build time. The OG image is `07-social/olympus-og-1200x630.png`, and the favicon is `07-social/olympus-favicon.svg`.
