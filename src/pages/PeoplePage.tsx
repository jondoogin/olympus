import { PageIntro } from '../components/PageIntro';
import { Pantheon } from '../sections/Pantheon';
import { Contact } from '../sections/Contact';

export default function PeoplePage() {
  return (
    <>
      <PageIntro n="04" label="People" title={['Senior by']} em="several millennia.">
        <p>Full biographies pending. Most of them are already written down somewhere, in considerably more dramatic terms.</p>
      </PageIntro>
      <Pantheon />
      <Contact />
    </>
  );
}
