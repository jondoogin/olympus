import { InteriorIntro } from '../components/InteriorIntro';
import { InteriorSections } from '../components/InteriorSections';
import { Contact } from '../sections/Contact';
import { contact, interior } from '../content/site';

export default function ContactPage() {
  return (
    <>
      <InteriorIntro content={interior.contact}>
        <a className="textlink" href={`mailto:${contact.email}`}>{contact.email} <span aria-hidden="true">↗</span></a>
      </InteriorIntro>
      <InteriorSections label={interior.contact.label} sections={interior.contact.sections} note={interior.contact.note} />
      <Contact />
    </>
  );
}
