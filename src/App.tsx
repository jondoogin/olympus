import { Suspense, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTransitions } from './components/PageTransitions';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { AboutPage, ContactPage, CulturePage, PeoplePage, ProjectPage, ServicesPage, WorkPage, preloadAllWhenIdle } from './routes';
import { pageTitle } from './lib/meta';
import { scrollToStart } from './lib/scroll';
import { titles } from './content/site';

function ScrollReset() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    scrollToStart(hash);
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    // The menu restores focus while closing; move it to new content afterward.
    const frame = requestAnimationFrame(() => {
      document.getElementById('main')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}

/** Sets the tab title per route, and asks nicely when the visitor wanders to another tab. */
function DocumentTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const title = pageTitle(pathname);
    document.title = title;
    const onVis = () => {
      document.title = document.hidden ? titles.away : title;
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(preloadAllWhenIdle, []);
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <ScrollReset />
      <DocumentTitle />
      <PageTransitions />
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="route-pending" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/culture" element={<CulturePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
