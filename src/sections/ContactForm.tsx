import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { contact, contactForm as copy } from '../content/site';
import { Label } from '../components/Label';
import { Reveal } from '../components/Reveal';
import { Mark } from '../components/Mark';
import { greekNumeral } from '../lib/antiquity';

/** Set in Vercel to post briefs to a form service; unset, the form drafts an email instead. */
const ENDPOINT: string | undefined = import.meta.env.VITE_CONTACT_ENDPOINT || undefined;

type Field = 'name' | 'email' | 'message';
type Status = 'idle' | 'sending' | 'drafted' | 'sent' | 'failed';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData) {
  const errors: Partial<Record<Field, string>> = {};
  if (!String(data.get('name') ?? '').trim()) errors.name = copy.errors.name;
  if (!EMAIL.test(String(data.get('email') ?? '').trim())) errors.email = copy.errors.email;
  if (String(data.get('message') ?? '').trim().length < 10) errors.message = copy.errors.message;
  return errors;
}

function mailto(data: FormData) {
  const get = (k: string) => String(data.get(k) ?? '').trim();
  const lines = [get('message'), '', '—', get('name') + (get('org') ? `, ${get('org')}` : ''), get('email')];
  if (get('timing')) lines.push(`Timing: ${get('timing')}`);
  return `mailto:${contact.email}?subject=${encodeURIComponent(copy.mail.subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [draft, setDraft] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const done = useRef<HTMLDivElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (data.get('website')) return; // Filled only by bots.

    if (!ENDPOINT) {
      const href = mailto(data);
      setDraft(href);
      setStatus('drafted');
      window.location.href = href;
    } else {
      setStatus('sending');
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(data)),
        });
        setStatus(res.ok ? 'sent' : 'failed');
      } catch {
        setStatus('failed');
      }
    }
    requestAnimationFrame(() => done.current?.focus());
  };

  const reset = () => {
    form.current?.reset();
    setStatus('idle');
    setErrors({});
    requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('input')?.focus());
  };

  const finished = status === 'drafted' || status === 'sent';
  const describe = (f: Field, hint?: string) => [hint, errors[f] && `brief-${f}-error`].filter(Boolean).join(' ') || undefined;

  return (
    <section className="brief section" id="brief" data-theme="stone" data-ink="obsidian" aria-labelledby="brief-title">
      <div className="wrap grid">
        <div className="brief__head">
          <Label>{copy.label}</Label>
          <Reveal as="h2" kind="fade" className="brief__title" id="brief-title">
            {copy.title} <em>{copy.em}</em>
          </Reveal>
          <p className="sys brief__note">{ENDPOINT ? copy.post.note : copy.mail.note}</p>
        </div>

        {finished ? (
          <div className="brief__done" ref={done} tabIndex={-1} role="status">
            <Mark name="bolt" className="brief__bolt" />
            <p className="brief__done-title">{status === 'sent' ? copy.post.doneTitle : copy.mail.doneTitle}</p>
            <p>
              {status === 'sent' ? copy.post.doneBody : copy.mail.doneBody}{' '}
              <a className="textlink" href={draft || `mailto:${contact.email}`}>{contact.email}</a>.
            </p>
            <button type="button" className="textlink brief__again" onClick={reset}>{copy.again} <span aria-hidden="true">→</span></button>
          </div>
        ) : (
          <form className="brief__form" ref={form} onSubmit={onSubmit} noValidate aria-describedby="brief-status">
            <div className="brief__row">
              <FieldLabel n={1} htmlFor="brief-name">{copy.fields.name}</FieldLabel>
              <input id="brief-name" name="name" type="text" autoComplete="name" required
                aria-invalid={!!errors.name} aria-describedby={describe('name')} />
              <FieldError field="name" message={errors.name} />
            </div>
            <div className="brief__row">
              <FieldLabel n={2} htmlFor="brief-email">{copy.fields.email}</FieldLabel>
              <input id="brief-email" name="email" type="email" autoComplete="email" inputMode="email" required
                aria-invalid={!!errors.email} aria-describedby={describe('email')} />
              <FieldError field="email" message={errors.email} />
            </div>
            <div className="brief__row">
              <FieldLabel n={3} htmlFor="brief-org">{copy.fields.org} <span className="brief__opt">{copy.fields.optional}</span></FieldLabel>
              <input id="brief-org" name="org" type="text" autoComplete="organization" />
            </div>
            <fieldset className="brief__row brief__timing">
              <legend><FieldLabel n={4}>{copy.fields.timing} <span className="brief__opt">{copy.fields.optional}</span></FieldLabel></legend>
              <div className="brief__chips">
                {copy.timings.map((t) => (
                  <label key={t} className="brief__chip">
                    <input type="radio" name="timing" value={t} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="brief__row">
              <FieldLabel n={5} htmlFor="brief-message">{copy.fields.message}</FieldLabel>
              <textarea id="brief-message" name="message" rows={5} required
                aria-invalid={!!errors.message} aria-describedby={describe('message', 'brief-message-hint')} />
              <p className="brief__hint" id="brief-message-hint">{copy.fields.messageHint}</p>
              <FieldError field="message" message={errors.message} />
            </div>
            <div className="brief__trap" aria-hidden="true">
              <label>Website <input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <div className="brief__actions">
              <button type="submit" className="brief__submit" disabled={status === 'sending'}>
                <span>{status === 'sending' ? copy.sending : copy.submit}</span>
                <Mark name="bolt" className="brief__submit-bolt" />
              </button>
              <p className="sys brief__status" id="brief-status" role="status">
                {status === 'failed' && <>{copy.post.failed} <a href={`mailto:${contact.email}`}>{contact.email}</a>.</>}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function FieldLabel({ n, htmlFor, children }: { n: number; htmlFor?: string; children: ReactNode }) {
  const Tag = htmlFor ? 'label' : 'span';
  return (
    <Tag className="brief__label" htmlFor={htmlFor}>
      <span className="brief__n" aria-hidden="true">{greekNumeral(n)}</span>
      {children}
    </Tag>
  );
}

function FieldError({ field, message }: { field: Field; message?: string }) {
  if (!message) return null;
  return <p className="brief__error" id={`brief-${field}-error`}>{message}</p>;
}
