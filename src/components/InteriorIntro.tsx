import { PageIntro } from './PageIntro';

type Intro = { readonly n: string; readonly label: string; readonly title: readonly string[]; readonly em: string; readonly lead: string };

export function InteriorIntro({ content }: { content: Intro }) {
  return <PageIntro n={content.n} label={content.label} title={[...content.title]} em={content.em}><p>{content.lead}</p></PageIntro>;
}
