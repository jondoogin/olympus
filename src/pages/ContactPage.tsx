import { PageIntro } from '../components/PageIntro';
import { Contact } from '../sections/Contact';
import { contact } from '../content/site';

export default function ContactPage() {
  return (
    <>
      <PageIntro n="06" label="Contact" title={['Start']} em="something.">
        <p>
          New business, collaborations and unreasonable requests: <a href={`mailto:${contact.email}`}>{contact.email}</a>{' '}
          <span className="tag tag--ink">Placeholder</span>. A proper brief form will live here once real contact details exist.
        </p>
      </PageIntro>
      <Contact />
    </>
  );
}
