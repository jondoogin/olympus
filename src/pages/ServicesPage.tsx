import { InteriorIntro } from '../components/InteriorIntro';
import { InteriorSections } from '../components/InteriorSections';
import { Services } from '../sections/Services';
import { Contact } from '../sections/Contact';
import { interior } from '../content/site';

export default function ServicesPage() {
  return (
    <>
      <InteriorIntro content={interior.services} />
      <Services />
      <InteriorSections label={interior.services.label} sections={interior.services.sections} />
      <Contact />
    </>
  );
}
