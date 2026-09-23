import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { notFound } from '../content/site';

export default function NotFound() {
  return (
    <PageIntro n="404" label="Lost" title={[notFound.title]} em={notFound.em}>
      <p>{notFound.lead}</p>
      <p><Link to="/" className="textlink">{notFound.link} →</Link></p>
    </PageIntro>
  );
}
