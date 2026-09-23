import { InteriorIntro } from '../components/InteriorIntro';
import { InteriorSections } from '../components/InteriorSections';
import { Interruption } from '../sections/Interruption';
import { Maxims } from '../sections/Maxims';
import { Pause } from '../sections/Proof';
import { Contact } from '../sections/Contact';
import { interior } from '../content/site';

export default function CulturePage() {
  return (
    <>
      <InteriorIntro content={interior.culture} />
      <Interruption />
      <Maxims />
      <InteriorSections label={interior.culture.label} sections={interior.culture.sections} note={interior.culture.note} />
      <Pause />
      <Contact />
    </>
  );
}
