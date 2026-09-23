import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import WorkPage from './pages/WorkPage';
import ProjectPage from './pages/ProjectPage';
import ServicesPage from './pages/ServicesPage';
import PeoplePage from './pages/PeoplePage';
import CulturePage from './pages/CulturePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import { nav, titles } from './content/site';

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function pageTitle(pathname: string) {
  if (pathname === '/') return titles.home;
  const item = nav.find((n) => pathname === n.to || pathname.startsWith(`${n.to}/`));
  return (item ? item.label : titles.notFound) + titles.suffix;
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
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <ScrollReset />
      <DocumentTitle />
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
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
      </main>
      <Footer />
    </>
  );
}
