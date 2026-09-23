// Mirrors the breakpoints in styles/tokens.css for use in TS (media queries, sizes attrs).
export const breakpoints = {
  tablet: 768,
  desktop: 1100,
} as const;

export const mq = {
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const;
