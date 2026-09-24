import { Link } from 'react-router-dom';
import { nav, socials, contact, footerLines } from '../content/site';
import { greekNumeral, olympiad } from '../lib/antiquity';
import { Logo } from './Logo';

export function Footer() {
  const o = olympiad();
  return (
    <footer className="site-footer" data-theme="dark" data-ink="ivory">
      <div className="wrap grid site-footer__grid">
        <div className="site-footer__brand">
          <Logo variant="primary" label="Olympus — Creative Agency" />
          <p className="site-footer__line">Operating above sea level.</p>
          <p className="sys site-footer__carved">{footerLines.carved}</p>
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
                <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <p className="site-footer__h">Contact</p>
          <address>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            <span className="site-footer__muted">{contact.emailNote}</span>
          </address>
        </div>
      </div>

      <div className="wrap site-footer__base">
        <span>
          © Olympus · Olympiad <span className="inscr site-footer__olymp" title={`${o.n}`}>{greekNumeral(o.n)}</span>, year {o.year}
          <span className="site-footer__muted"> ({new Date().getFullYear()}, to mortals)</span>
        </span>
        <span>A fictional agency. All projects shown are concepts.</span>
        <a href="#top" className="site-footer__top">Back to the summit ↑</a>
      </div>
      <p className="wrap sys site-footer__end">{footerLines.end}</p>
    </footer>
  );
}
