import { PageIntro } from '../components/PageIntro';
import { Interruption } from '../sections/Interruption';
import { Maxims } from '../sections/Maxims';
import { Pause } from '../sections/Proof';
import { Contact } from '../sections/Contact';

export default function CulturePage() {
  return (
    <>
      <PageIntro n="07" label="Culture" title={['How we']} em="behave.">
        <p>Principles, rituals and the occasional feast. Some of our rules are new. The better ones are carved into a temple. Open roles and the Dionysus-approved events calendar will follow.</p>
      </PageIntro>
      <Interruption />
      <Maxims />
      <Pause />
      <Contact />
    </>
  );
}
