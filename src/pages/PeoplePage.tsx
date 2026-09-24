import { InteriorIntro } from '../components/InteriorIntro';
import { Label } from '../components/Label';
import { Picture } from '../components/Picture';
import { Reveal } from '../components/Reveal';
import { Contact } from '../sections/Contact';
import { interior, pantheon, type God } from '../content/site';
import { useScrollProgress } from '../hooks/useScrollProgress';

export default function PeoplePage() {
  return (
    <>
      <InteriorIntro content={interior.people} />
      <section className="people-bios section" data-ink="obsidian">
        <div className="wrap">
          <div className="people-bios__head">
            <Label n="01">{interior.people.label}</Label>
            <Reveal as="h2" kind="fade">{interior.people.intro}</Reveal>
            <p className="sys">{interior.people.note}</p>
          </div>
          <div className="people-bios__list">
            {pantheon.map((god, index) => <PeopleBio key={god.name} god={god} index={index} />)}
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}

function PeopleBio({ god, index }: { god: God; index: number }) {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <article className="people-bio" ref={ref}>
      <div className="people-bio__image"><Picture image={god.image} alt={god.alt} crop={god.crop} sizes="(min-width: 1100px) 26vw, (min-width: 768px) 36vw, 88vw" /></div>
      <Reveal className="people-bio__copy" kind="fade" threshold={0.1}>
        <Label n={String(index + 1).padStart(2, '0')}>{god.role}</Label>
        <h3>{god.name}</h3>
        <p className="people-bio__line"><em>{god.line}</em></p>
        <p>{interior.people.bios[index]}</p>
        <p className="sys">{god.formerly}</p>
      </Reveal>
    </article>
  );
}
