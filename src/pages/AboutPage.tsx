import { PageIntro } from '../components/PageIntro';
import { Manifesto } from '../sections/Manifesto';
import { Proof } from '../sections/Proof';
import { Contact } from '../sections/Contact';

export default function AboutPage() {
  return (
    <>
      <PageIntro n="01" label="About" title={['The short']} em="version.">
        <p>An independent creative agency founded in 2026 by six partners with a long shared history and a stronger opinion of it.</p>
      </PageIntro>
      <Manifesto />
      <Proof />
      <Contact />
    </>
  );
}
