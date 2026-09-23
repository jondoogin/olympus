import { InteriorIntro } from '../components/InteriorIntro';
import { InteriorSections } from '../components/InteriorSections';
import { Manifesto } from '../sections/Manifesto';
import { Proof } from '../sections/Proof';
import { Contact } from '../sections/Contact';
import { interior } from '../content/site';

export default function AboutPage() {
  return (
    <>
      <InteriorIntro content={interior.about} />
      <Manifesto />
      <InteriorSections label={interior.about.label} sections={interior.about.sections} />
      <Proof />
      <Contact />
    </>
  );
}
