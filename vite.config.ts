import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Rewrites the relative OG/Twitter image and adds an absolute og:url, using
 * VITE_SITE_URL (set as a Vercel project env var, e.g. https://olympus.agency
 * or the assigned *.vercel.app domain — no trailing slash). Social platforms
 * fetch og:image directly and require an absolute URL; without one set, the
 * tags are left exactly as authored (relative — fine for local/preview).
 */
function absoluteSocialMeta(): Plugin {
  return {
    name: 'olympus-absolute-social-meta',
    transformIndexHtml(html) {
      const site = process.env.VITE_SITE_URL?.replace(/\/+$/, '');
      if (!site) return html;
      return html
        .replace(
          /(<meta property="og:image" content=")\/([^"]*")/,
          `$1${site}/$2`,
        )
        .replace(
          /(<meta name="twitter:image" content=")\/([^"]*")/,
          `$1${site}/$2`,
        )
        .replace(
          '<meta property="og:type" content="website" />',
          `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${site}/" />`,
        );
    },
  };
}

export default defineConfig({
  plugins: [react(), absoluteSocialMeta()],
});
