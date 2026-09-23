import { Hero } from '../sections/Hero';
import { Manifesto } from '../sections/Manifesto';
import { Work } from '../sections/Work';
import { Services } from '../sections/Services';
import { Pantheon } from '../sections/Pantheon';
import { Interruption } from '../sections/Interruption';
import { Pause, Proof } from '../sections/Proof';
import { Contact } from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Work />
      <Services />
      <Pantheon />
      <Interruption />
      <Pause />
      <Proof />
      <Contact />
    </>
  );
}
