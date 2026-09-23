import { InteriorIntro } from '../components/InteriorIntro';
import { InteriorSections } from '../components/InteriorSections';
import { Contact } from '../sections/Contact';
import { interior } from '../content/site';

export default function ContactPage() {
  return (
    <>
      <InteriorIntro content={interior.contact} />
      <InteriorSections label={interior.contact.label} sections={interior.contact.sections} note={interior.contact.note} />
      <Contact />
    </>
  );
}
