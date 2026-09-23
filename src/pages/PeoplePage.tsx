import { InteriorIntro } from '../components/InteriorIntro';
import { Label } from '../components/Label';
import { Picture } from '../components/Picture';
import { Contact } from '../sections/Contact';
import { interior, pantheon } from '../content/site';

export default function PeoplePage() {
  return (
    <>
      <InteriorIntro content={interior.people} />
      <section className="people-bios section" data-ink="obsidian">
        <div className="wrap">
          <div className="people-bios__head">
            <Label n="01">{interior.people.label}</Label>
            <h2>{interior.people.intro}</h2>
            <p className="sys">{interior.people.note}</p>
          </div>
          <div className="people-bios__list">
            {pantheon.map((god, index) => (
              <article className="people-bio" key={god.name}>
                <div className="people-bio__image"><Picture image={god.image} alt={god.alt} crop={god.crop} sizes="(min-width: 1100px) 26vw, (min-width: 768px) 36vw, 88vw" /></div>
                <div className="people-bio__copy">
                  <Label n={String(index + 1).padStart(2, '0')}>{god.role}</Label>
                  <h3>{god.name}</h3>
                  <p className="people-bio__line"><em>{god.line}</em></p>
                  <p>{interior.people.bios[index]}</p>
                  <p className="sys">{god.formerly}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
