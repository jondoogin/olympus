import { Reveal, Line } from '../components/Reveal';
import { Mark } from '../components/Mark';
import { Annotation } from '../components/Annotation';
import { greekNumeral } from '../lib/antiquity';

export function Interruption() {
  return (
    <section className="interrupt" data-theme="dark" data-ink="ivory" aria-labelledby="interrupt-title">
      <Reveal kind="lines" className="wrap interrupt__inner" threshold={0.35}>
        <p className="interrupt__rule">House rule <span className="inscr" aria-hidden="true">{greekNumeral(1)}</span><span className="sr-only">1</span></p>
        <h2 id="interrupt-title" className="interrupt__title">
          <Line i={0}>Creativity</Line>
          <Line i={1}>
            is a contact
            <Mark name="bolt" className="interrupt__bolt" />
          </Line>
          <Line i={2}>sport.</Line>
        </h2>
        <Annotation className="interrupt__annot" arrow="left">mostly verbal.</Annotation>
      </Reveal>
    </section>
  );
}
