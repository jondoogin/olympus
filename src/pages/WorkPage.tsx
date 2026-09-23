import { projects } from '../content/site';
import { PageIntro } from '../components/PageIntro';
import { ProjectCard } from '../sections/Work';
import { Contact } from '../sections/Contact';

export default function WorkPage() {
  return (
    <>
      <PageIntro n="02" label="Work" title={['Selected']} em="work.">
        <p>Concept projects for fictional clients, made to the standard we would hold real ones to. More case studies are in the kiln.</p>
      </PageIntro>
      <div className="work work--page">
        <div className="work__list">
          {projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
        </div>
      </div>
      <Contact />
    </>
  );
}
