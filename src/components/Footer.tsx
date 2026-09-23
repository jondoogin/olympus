import { Link } from 'react-router-dom';
import { nav, socials, contact } from '../content/site';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="site-footer" data-theme="dark" data-ink="ivory">
      <div className="wrap grid site-footer__grid">
        <div className="site-footer__brand">
          <Logo variant="primary" label="Olympus — Creative Agency" />
          <p className="site-footer__line">Operating above sea level.</p>
        </div>

        <nav className="site-footer__col" aria-label="Footer">
          <p className="site-footer__h">Index</p>
          <ul>
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col">
          <p className="site-footer__h">Elsewhere</p>
          <ul>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={`${s.label} (placeholder link)`}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <p className="site-footer__h">Address</p>
          <address>
            MT. OLYMPUS / GLOBAL
            <br />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            <span className="site-footer__muted">Placeholder until mortal paperwork clears.</span>
          </address>
        </div>
      </div>

      <div className="wrap site-footer__base">
        <span>© 2026 Olympus. Independent since 2026.</span>
        <span>A fictional agency. All projects shown are concepts.</span>
        <a href="#top" className="site-footer__top">Back to the summit ↑</a>
      </div>
    </footer>
  );
}
