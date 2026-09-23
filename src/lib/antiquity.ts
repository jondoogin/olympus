// Small helpers for the ancient register: Greek (Ionic) numerals and Olympiad dating.

const UNITS = ['', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ϛ', 'Ζ', 'Η', 'Θ'];
const TENS = ['', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ϟ'];
const HUNDREDS = ['', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω', 'Ϡ'];
const KERAIA = 'ʹ'; // ʹ — marks a run of letters as a number
const LOWER_KERAIA = '͵'; // ͵ — thousands

/** 2 → "Βʹ", 404 → "ΥΔʹ", 2026 → "͵ΒΚϚʹ". Accepts "02"-style strings. */
export function greekNumeral(value: number | string): string {
  const n = typeof value === 'string' ? parseInt(value, 10) : value;
  if (!Number.isFinite(n) || n <= 0 || n >= 10000) return String(value);
  const th = Math.floor(n / 1000);
  const rest = n % 1000;
  const head = th ? LOWER_KERAIA + UNITS[th] : '';
  return head + HUNDREDS[Math.floor(rest / 100)] + TENS[Math.floor((rest % 100) / 10)] + UNITS[rest % 10] + KERAIA;
}

/**
 * Which Olympiad a date falls in, counting from the first Games in 776 BC.
 * Approximate on purpose: the Games ran in midsummer, we switch on 1 January.
 */
export function olympiad(date = new Date()) {
  const elapsed = date.getFullYear() + 775; // there is no year 0
  return { n: Math.floor(elapsed / 4) + 1, year: (elapsed % 4) + 1 };
}
