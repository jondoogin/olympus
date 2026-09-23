import { PageIntro } from '../components/PageIntro';
import { Services } from '../sections/Services';
import { Contact } from '../sections/Contact';

export default function ServicesPage() {
  return (
    <>
      <PageIntro n="03" label="Services" title={['What we']} em="do, mostly.">
        <p>A deliberately short list. Detailed capability pages to follow.</p>
      </PageIntro>
      <Services />
      <Contact />
    </>
  );
}
