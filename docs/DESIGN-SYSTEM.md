# OLYMPUS — design system note

**Idea:** ancient authority × contemporary editorial. The site should read as a serious agency first; the mythology comes through in the portraits, the copy and a few small gestures.

**S17 clarity pass:** Archivo carries display, editorial and body text. Ordinary Arabic numbers replace the carved Greek register in all navigation, indexes and forms. Antiquity now comes through fine-line drawing plates: spare contours, construction lines, measured arcs and a quiet paper ground. No faux distress, decorative Greek or novelty Roman type.

IBM Plex Mono remains for indexes and live screen readouts. Readouts must show actual viewport and load values. One joke per block, never explained.

## Tokens (`src/styles/tokens.css`, mirrored in `src/lib/tokens.ts`)

| Group | Values |
| --- | --- |
| Palette | marble `#F4F1EA`, stone `#EBE6DB`, obsidian `#080808`. Accents: gold `#D4AF37` (bolt, annotations, the "&"), Aegean `#2563EB` (contact finale, focus rings, active service number), Apollo `#FF6A00` (HELIO dot, Apollo hover bar). Each accent has only a few jobs. |
| Type | **Archivo** variable for display, editorial and body text; **Reenie Beanie** for restrained handwritten notes; **IBM Plex Mono** for readable indexes and live screen readouts. Legacy serif and inscription tokens resolve to Archivo and mono. |
| Scale | `--fs-micro` 11px labels → `--fs-colossal` (clamped vw). Display type is uppercase, `wdth` 112–125, tracked −0.035em to −0.045em. |
| Grid | 4 cols < 768 · 8 cols 768–1099 · 12 cols ≥ 1100. `.wrap` + `.grid` utilities; children default to full span. |
| Space | 4pt base (`--s-1…--s-10`) plus fluid `--section` rhythm. |
| Borders | 1px hairlines at 18% ink; square corners; pill radius only for chips and CTAs. |
| Z | base 1 · overlay 10 · header 50 · menu 60 · skip 100. |
| Motion | `--ease-out` (0.16,1,0.3,1) for reveals; `--ease-snap` for the bolt; 180 / 420 / 900 / 1200ms. Every duration collapses under `prefers-reduced-motion`. |

Sections set `data-theme` (`dark` / `stone`) to re-map `--bg` / `--fg` / `--rule`. They also set `data-ink` so the fixed header can switch between ivory and obsidian over whatever it sits on.

## Components

- `Logo`: uses versioned SVGs in `src/assets/identity/`, using the selected, struck O from study 01 and preserving the other six letter outlines. The broader gold bolt cuts two precise, angular breaks into the O. Original library masters remain untouched. Sixteen SVG secondary-mark studies and their interactive review live at `/identity/index.html`.
- `Picture`: `<picture>` with WebP and JPEG `srcset`, intrinsic width/height to prevent layout shift, lazy loading by default. Crops are set per breakpoint via `crop={{ mobile, tablet, desktop }}` (object-position).
- `Reveal` / `Line`: IntersectionObserver adds `.is-in`. The three kinds are `lines` (masked rise), `fade`, and `wipe` (the image uncovers from the bottom).
- `useScrollProgress`: writes `--p` (0→1). CSS uses it for the hero, manifesto, project and cloud parallax. It is off under reduced motion.
- `Annotation`, `CropMarks`, `Mark` (library bolt / delta, selected struck bolt-O study 01), `Label` (ordinary number + accessible index), `PageIntro`.
- `Hero` → `Readout` (live viewport + load time). `Maxims` (Culture page). `App` → `DocumentTitle` (per-route titles; "Come back, mortal." while the tab is hidden). Body ground uses `06-textures/ivory-paper.svg`.

## Motion inventory (deliberately short)

1. Hero entrance: the photo opens from an inset clip and settles from scale 1.14. "HIGHER IDEAS" rises and "for a lower world." *drops* in from above. The annotation draws itself last.
2. Line-mask reveals on "We are Olympus", the interruption, the contact headline and page intros.
3. Project images wipe up from the bottom. On hover the frame pulls in 1.2% while the image scales, a "View project" chip appears, and the client name loosens its tracking.
4. Services: hovering, focusing or tapping a row stretches its name along Archivo's width axis (84 → 118) and dims the others.
5. The gold bolt in the interruption strikes (snap + brief glow). The header and contact CTA bolts tilt on hover.
6. Slow parallax/pan on the columns, projects and clouds. Nothing moves the cursor, and there's no WebGL.
7. At mobile and tablet widths, scrolling also moves project plates, case-study details, gallery images and portraits at a separate depth. Headings and captions rise in as they enter; project cards reveal a persistent view cue and a fine registration line. These effects stop under reduced motion.
8. Page turns (View Transitions): the old page lifts and dims, the new one wipes up from the bottom edge; the header holds; a project card's image grows into the case study's lead image.
9. Touch screens (`hover: none`): whatever crosses the middle of the screen takes its hover state (`.is-focus`), and presses answer with a slight scale. Below 1100px, where scroll timelines exist, display type unfolds along the width axis as it arrives (page and case titles fold as they leave), the hero plate pushes in, list items rise into place, the contact bolt charges up, and the interruption's sky flickers gold when the bolt strikes.

## Assets

The masters are copied untouched to `public/OLYMPUS-asset-library/`. `npm run images` (sharp) writes responsive derivatives to `_responsive/` and `src/content/image-manifest.json`. It never upscales. Zeus's People portrait is a 533×800 crop of the hero, made at build time. The OG image is `07-social/olympus-og-1200x630.png`, and the favicon is `07-social/olympus-favicon.svg`.

## Project drawing plates

`ProjectDiagram` replaces the four slideshow films. Each of seven projects has three reader-controlled SVG layers and a corresponding explanation. Buttons work with keyboard and touch, announce selection, and update a polite live region. Reduced motion removes opacity transitions. Drawings are illustrations, never navigation, engineering or measured performance data. `scripts/build-project-plates.mjs` also exports three identity poster masters from the same paths and copy.

## Selected mark / strike introduction (S18)

Canonical geometry and timing live in `scripts/strike-mark.mjs`. `npm run identity` emits the static, one-colour and animated secondary marks, the favicon, static/animated wordmarks and `/identity/strike.html`. The first S17 mark is preserved in `public/identity/archive/mark-01-s17.svg`. The introduction holds an intact, stationary O for 700ms, reveals the bolt diagonally in 160ms, cuts the ring at impact and lets a brief glint and two small fragment traces fade. It ends on the static mark and does not loop.

`Logo` accepts `animate` and assigns unique mask IDs per instance. Only the main header logo animates; a 1.3s delay lets the header appear before the strike. Menu and footer logos are static. Reduced motion shows the finished mark immediately, with all strike animations disabled. Route changes preserve the header instance. `Mark` also scopes inline mask IDs.

The standalone review has a replay control and SVG downloads. `npm run check:identity` exercises timing, a stationary O, ID uniqueness, header persistence, reduced motion and replay against a running dev server. `npm run render:identity` exports a 600px GIF that plays once, plus before/impact/final PNGs from the actual SVG/CSS animation.
