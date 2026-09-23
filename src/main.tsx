import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
