import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav, contact, socials, oracleStatus } from '../content/site';
import { greekNumeral } from '../lib/antiquity';
import { Logo } from './Logo';
import { Picture } from './Picture';
import { Mark } from './Mark';

type Ink = 'ivory' | 'obsidian';

/** Reads the [data-ink] of whichever section sits under the header. */
function useHeaderState() {
  const [ink, setInk] = useState<Ink>('ivory');
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const probe = () => {
      raf = 0;
      const y = window.scrollY;
      const h = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) * 16 || 80;
      const line = h / 2;
      const sections = document.querySelectorAll<HTMLElement>('main [data-ink], .site-footer');
      let next: Ink = 'obsidian';
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) {
          next = s.dataset.ink as Ink;
          break;
        }
      }
      setInk(next);
      const past = y > window.innerHeight * 0.6;
      setSolid(past);
      setHidden(past && y > last + 4 ? true : y < last - 4 ? false : (prev) => prev);
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(probe);
    };
    probe();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return { ink, hidden, solid };
}

export function Header() {
  const { ink, hidden, solid } = useHeaderState();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="site-header"
        data-ink={ink}
        data-hidden={hidden && !open ? 'true' : 'false'}
        data-solid={solid ? 'true' : 'false'}
      >
        <div className="site-header__inner">
          <Link to="/" className="site-header__logo" aria-label="Olympus — home">
            <Logo variant="wordmark" label="Olympus" />
          </Link>
          <nav className="site-header__nav" aria-label="Primary">
            <ul>
              {nav.slice(0, 5).map((item, i) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="navlink">
                    <span className="navlink__n" aria-hidden="true">{greekNumeral(i + 1)}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/contact" className="site-header__cta">
            Start Something <Mark name="bolt" className="site-header__bolt" />
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span>Menu</span>
            <span className="menu-toggle__bars" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add('menu-open');
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>('a[href], button');
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className="mmenu"
      data-open={open}
      data-theme="dark"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
      ref={panel}
    >
      <div className="mmenu__top">
        <Link to="/" className="mmenu__logo" aria-label="Olympus — home" onClick={onClose}>
          <Logo variant="wordmark" label="Olympus" />
        </Link>
        <button type="button" className="menu-toggle menu-toggle--close" onClick={onClose} ref={closeBtn}>
          <span>Close</span>
          <span className="menu-toggle__x" aria-hidden="true"><i /><i /></span>
        </button>
      </div>

      <nav className="mmenu__nav" aria-label="Mobile">
        <ol>
          {nav.map((item, i) => (
            <li key={item.to} style={{ ['--i' as string]: i }}>
              <NavLink to={item.to} onClick={onClose}>
                <span className="mmenu__n" aria-hidden="true">{greekNumeral(i + 1)}</span>
                <span className="mmenu__label">{item.label}</span>
                <span className="mmenu__note">{item.note}</span>
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mmenu__foot">
        <div className="mmenu__portrait">
          <Picture image="zeus-portrait" alt="" sizes="120px" crop={{ mobile: '50% 25%' }} />
          <span className="mmenu__caption">Management is watching.</span>
        </div>
        <div className="mmenu__meta">
          <span className="sys sys--dot mmenu__status">{oracleStatus}</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <ul className="mmenu__social">
            {socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
          <span>Mt. Olympus / Global</span>
        </div>
      </div>
    </div>
  );
}
