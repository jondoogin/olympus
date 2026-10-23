/** Plain, scannable index numbers for all website UI. */
export function indexNumber(value: number | string): string {
  return String(Number(value)).padStart(2, '0');
}
