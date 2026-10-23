/** Inline SVG instances must not share mask/clip IDs (header, menu and footer). */
export function scopeSvgIds(svg: string, prefix: string) {
  return [...svg.matchAll(/\bid="([^"]+)"/g)].reduce((source, [, id]) => source
    .replaceAll(`id="${id}"`, `id="${prefix}-${id}"`)
    .replaceAll(`url(#${id})`, `url(#${prefix}-${id})`), svg);
}
