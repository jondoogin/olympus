import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';

export default function NotFound() {
  return (
    <PageIntro n="404" label="Lost" title={['Not even']} em="Hermes found it.">
      <p><Link to="/" className="textlink">Return to the summit →</Link></p>
    </PageIntro>
  );
}
