# OLYMPUS — selected mark 01, struck

The wider yellow bolt intersects the O twice. A diagonal incision and two angular edge breaks let the ring react to the strike while keeping the finished mark compact.

## Review

Start `npm run dev`, then open `http://127.0.0.1:5173/identity/strike.html`. The introduction plays once; the Replay strike button restarts it. Reduced motion shows the final still without a strike or replay control.

## Assets

- `public/identity/mark-01-struck.svg`: static colour master, transparent ground.
- `public/identity/mark-01-struck-mono.svg`: one-colour master.
- `public/identity/mark-01-animated.svg`: self-contained CSS/SVG introduction.
- `public/identity/favicon.svg`: small-use version on an ivory ground.
- `public/identity/archive/mark-01-s17.svg`: the original thinner first study.
- `output/identity-strike/lightning-introduction.gif`: 600×600, 3 seconds, one play.
- `output/identity-strike/struck-mark.png`: final mark on ivory.
- `output/identity-strike/before-strike.png` and `during-strike.png`: timing reference frames.

The header introduces the bolt once after appearing. Menu/footer marks remain static. Route navigation preserves the header instance. The selected O and bolt also replace the first O in both wordmark variants and the favicon.

## Regenerate

`npm run identity` rebuilds all vector masters and both review pages from `scripts/strike-mark.mjs`.

`npm run render:identity` exports the GIF and three timing PNGs from the actual SVG/CSS animation. GIF delay values are supplied for every frame so the encoder can combine identical holds without losing timing.

`npm run check:identity` checks four viewport widths, initial/impact/final states, stationary O bounds, unique inline mask IDs, persistent header, replay and reduced motion against a running dev server. Set `OLYMPUS_REVIEW_URL` to check another local preview origin.
