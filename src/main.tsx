import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { preloadRoute } from './routes';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';

// For whoever opens the inspector.
console.log(
  '%cΧΑΙΡΕ.%c You found the source. Hermes has been notified.',
  'font: 700 16px Georgia, serif; letter-spacing: .2em',
  'font: 12px ui-monospace, monospace',
);

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    {/* Synchronous route updates let PageTransitions swap pages inside a View Transition. */}
    <BrowserRouter useTransitions={false}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Built pages arrive with their markup already rendered for one route (scripts/site-plugin.ts);
// 404.html is marked '*' because it is served for any unknown path. Hydrate only when the
// markup matches this path, after loading the route's chunk so the lazy page renders in step.
const rendered = root.dataset.route;
if (rendered === '*' || rendered === window.location.pathname) {
  preloadRoute(window.location.pathname).then(
    () => hydrateRoot(root, app),
    () => createRoot(root).render(app),
  );
} else {
  createRoot(root).render(app);
}
