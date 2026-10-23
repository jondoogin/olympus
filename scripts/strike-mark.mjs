// Canonical selected mark geometry, shared by the submark, wordmark and motion.
export const BOLT = 'M184 8 136 82H155L16 192 64 118H45Z';
export const RING = 'M28 100a72 80 0 1 0 144 0a72 80 0 1 0-144 0ZM52 100a48 58 0 1 0 96 0a48 58 0 1 0-96 0Z';
// Two small angular bites extend the diagonal incision into the ring edge.
const CHIPS = 'M153 48 171 57 153 63ZM47 152 29 143 47 137Z';
export const strikeCss = `
.strike-intact{opacity:0}.strike-cut,.strike-bolt{opacity:1}.strike-trace,.strike-flare,.strike-shards{opacity:0}
.is-striking .strike-intact{animation:strike-intact 2s linear var(--strike-delay,0s) both}
.is-striking .strike-cut{animation:strike-cut 2s linear var(--strike-delay,0s) both}
.is-striking .strike-bolt{animation:strike-bolt 2s linear var(--strike-delay,0s) both}
.is-striking .strike-trace{stroke-dasharray:1;animation:strike-trace 2s linear var(--strike-delay,0s) both}
.is-striking .strike-flare{animation:strike-flare 2s linear var(--strike-delay,0s) both}
.is-striking .strike-shards--upper{animation:strike-upper 2s ease-out var(--strike-delay,0s) both}
.is-striking .strike-shards--lower{animation:strike-lower 2s ease-out var(--strike-delay,0s) both}
@keyframes strike-intact{0%,39.99%{opacity:1}40%,100%{opacity:0}}
@keyframes strike-cut{0%,39.99%{opacity:0}40%,100%{opacity:1}}
@keyframes strike-bolt{0%,34.99%{opacity:0;clip-path:inset(0 0 100% 0)}35%{opacity:1;clip-path:inset(0 0 100% 0)}43%,100%{opacity:1;clip-path:inset(0)}}
@keyframes strike-trace{0%,34%{opacity:0;stroke-dashoffset:1}35%{opacity:1;stroke-dashoffset:1}42%{opacity:1;stroke-dashoffset:0}48%,100%{opacity:0;stroke-dashoffset:0}}
@keyframes strike-flare{0%,42%{opacity:0}43%{opacity:.65}54%,100%{opacity:0}}
@keyframes strike-upper{0%,39%{opacity:0;transform:translate(0,0)}41%{opacity:.8;transform:translate(0,0)}62%,100%{opacity:0;transform:translate(9px,-10px)}}
@keyframes strike-lower{0%,41%{opacity:0;transform:translate(0,0)}43%{opacity:.8;transform:translate(0,0)}64%,100%{opacity:0;transform:translate(-9px,10px)}}
@media(prefers-reduced-motion:reduce){.is-striking .strike-intact,.is-striking .strike-cut,.is-striking .strike-bolt,.is-striking .strike-trace,.is-striking .strike-flare,.is-striking .strike-shards{animation:none!important}.strike-intact,.strike-trace,.strike-flare,.strike-shards{opacity:0!important}.strike-cut,.strike-bolt{opacity:1!important;clip-path:none!important}}
`;

export function strikeMarkup(id, animated = false) {
  return `<defs><mask id="${id}-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200"><rect width="200" height="200" fill="white"/><path d="${BOLT}" fill="black" stroke="black" stroke-width="7" stroke-linejoin="miter"/><path d="${CHIPS}" fill="black"/></mask></defs><g${animated ? ' class="is-striking"' : ''}>${animated ? `<path class="strike-intact" d="${RING}" fill-rule="evenodd" fill="#080808"/>` : ''}<path class="strike-cut" d="${RING}" fill-rule="evenodd" fill="#080808" mask="url(#${id}-cut)"/><path class="strike-bolt" d="${BOLT}" fill="#d4af37"/>${animated ? `<path class="strike-trace" d="M184 8 144 54 141 78 103 102 74 121 16 192" fill="none" stroke="#fff4b9" stroke-width="2.5" pathLength="1"/><path class="strike-flare" d="${BOLT}" fill="#fff4b9"/><g class="strike-shards strike-shards--upper" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="m159 43 6-8m-4 19 10 3"/></g><g class="strike-shards strike-shards--lower" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="m41 157-6 8m4-19-10-3"/></g>` : ''}</g>`;
}

export function strikeSvg({ animated = false, id = 'olympus-struck', mono = false } = {}) {
  let markup = strikeMarkup(id, animated);
  if (mono) markup = markup.replaceAll('#d4af37', '#080808');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Olympus struck O with diagonal lightning bolt">${animated ? `<style>${strikeCss}</style>` : ''}${markup}</svg>`;
}
