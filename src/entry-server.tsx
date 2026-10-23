// Build-time render of a route to HTML (see scripts/site-plugin.ts).
// Every page chunk is loaded first, so lazy pages render synchronously instead of
// leaving a Suspense fallback in the markup. main.tsx then hydrates this HTML.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { preloadAll } from './routes';

export async function render(url: string) {
  await preloadAll();
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
