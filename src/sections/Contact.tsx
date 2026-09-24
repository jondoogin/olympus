import { Link } from 'react-router-dom';
import { contact, contactNote } from '../content/site';
import { Label } from '../components/Label';
import { Reveal, Line } from '../components/Reveal';
import { Mark } from '../components/Mark';

export function Contact() {
  return (
    <section className="contact" id="contact" data-ink="ivory" aria-labelledby="contact-title">
      <div className="wrap grid">
        <Label n="06" className="contact__eyebrow">Contact</Label>
        <Reveal as="h2" kind="lines" className="contact__title" threshold={0.3}>
          <span id="contact-title" className="sr-only">Make mortals notice.</span>
          <span aria-hidden="true">
            <Line i={0}>Make</Line>
            <Line i={1}>mortals</Line>
            <Line i={2}>notice.</Line>
          </span>
        </Reveal>
        <div className="contact__body">
          <p className="contact__copy">Bring us the problem people keep telling you cannot be solved.</p>
          <Link to="/contact" className="contact__cta">
            <span>Start Something</span>
            <Mark name="bolt" className="contact__bolt" />
          </Link>
          <p className="sys contact__note">{contactNote}</p>
          <p className="contact__mail">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
