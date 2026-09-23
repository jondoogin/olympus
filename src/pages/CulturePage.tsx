import { PageIntro } from '../components/PageIntro';
import { Interruption } from '../sections/Interruption';
import { Pause } from '../sections/Proof';
import { Contact } from '../sections/Contact';

export default function CulturePage() {
  return (
    <>
      <PageIntro n="07" label="Culture" title={['How we']} em="behave.">
        <p>Principles, rituals and the occasional feast. This page will hold our working culture, open roles and the Dionysus-approved events calendar.</p>
      </PageIntro>
      <Interruption />
      <Pause />
      <Contact />
    </>
  );
}
