import { useEffect, useState } from 'react';
import { app } from '../content/site';

/**
 * Installable-app layer: registers the service worker, announces connection changes,
 * and offers a quiet, dismissible install invitation on phones and tablets.
 * Everything is feature-detected; on desktop or unsupported browsers it renders nothing.
 */

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const DISMISS_KEY = 'olympus:install-dismissed';
const VISITS_KEY = 'olympus:visits';
const DISMISS_DAYS = 60;

export function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function store(key: string, value?: string) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch { /* private mode: behave as if nothing is stored */ }
  return null;
}

function useServiceWorker() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;
    const register = () => navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).then((reg) => {
      // Look for a new build whenever the app comes back to the foreground.
      const check = () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); };
      document.addEventListener('visibilitychange', check);
    }).catch(() => {});
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
  }, []);
}

function ConnectionNotice() {
  const [state, setState] = useState<'online' | 'offline' | 'back'>('online');
  useEffect(() => {
    let t = 0;
    const off = () => { clearTimeout(t); setState('offline'); };
    const on = () => { setState('back'); t = window.setTimeout(() => setState('online'), 2600); };
    if (!navigator.onLine) off();
    window.addEventListener('offline', off);
    window.addEventListener('online', on);
    return () => { clearTimeout(t); window.removeEventListener('offline', off); window.removeEventListener('online', on); };
  }, []);
  return (
    <div className="app-toast" role="status" aria-live="polite" data-show={state !== 'online'}>
      {state === 'offline' ? app.offline : state === 'back' ? app.online : ''}
    </div>
  );
}

function InstallInvite() {
  const [mode, setMode] = useState<'none' | 'ios' | 'prompt'>('none');
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isStandalone() || navigator.webdriver) return;
    const dismissed = Number(store(DISMISS_KEY) || 0);
    if (dismissed && Date.now() - dismissed < DISMISS_DAYS * 864e5) return;
    const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (!touch) return;
    // Invite on the second visit, or after a minute of reading on the first.
    const visits = Number(store(VISITS_KEY) || 0) + 1;
    store(VISITS_KEY, String(visits));
    const delay = visits > 1 ? 6000 : 60000;

    const ua = navigator.userAgent;
    const iOS = /iPhone|iPad|iPod/.test(ua) || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1);
    let timer = 0;
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallEvent);
      setMode('prompt');
      timer = window.setTimeout(() => setOpen(true), delay);
    };
    const onInstalled = () => { setOpen(false); store(DISMISS_KEY, String(Date.now() + 1e13)); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    if (iOS) {
      setMode('ios');
      timer = window.setTimeout(() => setOpen(true), delay);
    }
    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (mode === 'none') return null;
  const dismiss = () => { setOpen(false); store(DISMISS_KEY, String(Date.now())); };
  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === 'accepted') setOpen(false); else dismiss();
  };

  return (
    <aside className="install" data-open={open} aria-hidden={!open} aria-labelledby="install-title" inert={!open}>
      <img className="install__icon" src="/pwa/icon-192.png" alt="" width="56" height="56" />
      <div className="install__body">
        <p className="install__label">{app.install.label}</p>
        <h2 id="install-title" className="install__title">{app.install.title}</h2>
        {mode === 'ios' ? (
          <ol className="install__steps">{app.install.ios.map((s) => <li key={s}>{s}</li>)}</ol>
        ) : (
          <p className="install__text">{app.install.body}</p>
        )}
        <div className="install__actions">
          {mode === 'prompt' && <button type="button" className="install__go" onClick={install}>{app.install.action}</button>}
          <button type="button" className="install__later" onClick={dismiss}>{app.install.dismiss}</button>
        </div>
      </div>
      <button type="button" className="install__close" onClick={dismiss} aria-label={app.install.close}>×</button>
    </aside>
  );
}

export function AppShell() {
  useServiceWorker();
  return (
    <>
      <ConnectionNotice />
      <InstallInvite />
    </>
  );
}

/** Native share sheet where available; otherwise copies the link. */
export function ShareButton({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = new URL(path, window.location.origin).href;
    if (navigator.share) {
      try { await navigator.share({ title, text: app.share.text, url }); } catch { /* cancelled */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch { /* no clipboard access */ }
  };
  return (
    <button type="button" className="share-btn" onClick={share}>
      <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16"><path d="M12 3v12M7 8l5-5 5 5M5 13v7h14v-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" /></svg>
      <span aria-live="polite">{copied ? app.share.copied : app.share.label}</span>
    </button>
  );
}
