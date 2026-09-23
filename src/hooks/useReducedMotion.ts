import { useEffect, useState } from 'react';
import { mq } from '../lib/tokens';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(mq.reducedMotion).matches,
  );
  useEffect(() => {
    const m = window.matchMedia(mq.reducedMotion);
    const on = () => setReduced(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return reduced;
}
