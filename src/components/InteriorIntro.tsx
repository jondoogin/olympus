import type { ReactNode } from 'react';
import { PageIntro } from './PageIntro';

type Intro = { readonly n: string; readonly label: string; readonly title: readonly string[]; readonly em: string; readonly lead: string };

export function InteriorIntro({ content, children }: { content: Intro; children?: ReactNode }) {
  return <PageIntro n={content.n} label={content.label} title={[...content.title]} em={content.em}><p>{content.lead}</p>{children}</PageIntro>;
}
