import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { logoPreview } from '../content/site';

export default function LogoPreview() {
  const [dark, setDark] = useState(true);
  const [replay, setReplay] = useState(0);
  return (
    <section className="logo-preview" data-theme={dark ? 'dark' : 'light'} data-ink={dark ? 'ivory' : 'obsidian'}>
      <div className="logo-preview__top">
        <h1 className="label">{logoPreview.title}</h1>
        <Link to="/" className="textlink">{logoPreview.site}</Link>
      </div>
      <button className="logo-preview__stage" onClick={() => setReplay((value) => value + 1)} aria-label={logoPreview.replay}>
        <Logo key={replay} />
      </button>
      <div className="logo-preview__bottom">
        <p>{logoPreview.instructions}</p>
        <button className="textlink" onClick={() => setDark((value) => !value)}>{dark ? logoPreview.light : logoPreview.dark}</button>
      </div>
    </section>
  );
}
