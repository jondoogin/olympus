/** Scrolls a new page to its top, or to the element its #hash names. Never smooth: this is a page change. */
export function scrollToStart(hash: string) {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (target) target.scrollIntoView({ behavior: 'instant' });
  else window.scrollTo({ top: 0, behavior: 'instant' });
}
