import { interior, projects } from '../content/site';
import { InteriorIntro } from '../components/InteriorIntro';
import { ProjectCard } from '../sections/Work';
import { Contact } from '../sections/Contact';

export default function WorkPage() {
  return (
    <>
      <InteriorIntro content={interior.work} />
      <div className="work work--page">
        <div className="work__list">
          {projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
        </div>
      </div>
      <Contact />
    </>
  );
}
