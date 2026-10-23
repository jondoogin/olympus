import { useSyncExternalStore } from 'react';
import { mq } from '../lib/tokens';

function subscribe(onChange: () => void) {
  const m = window.matchMedia(mq.reducedMotion);
  m.addEventListener('change', onChange);
  return () => m.removeEventListener('change', onChange);
}

const getSnapshot = () => window.matchMedia(mq.reducedMotion).matches;
// Built HTML is rendered with motion on; hydration starts there, then React re-renders
// with the visitor's preference. CSS keeps the film hidden in the meantime.
const getServerSnapshot = () => false;

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
