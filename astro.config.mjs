// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Served via a custom domain (see /CNAME) at the domain root, not under
  // a GitHub Pages project subpath — so `site` is enough, no `base` needed.
  site: 'https://nolabels.love',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    // Mirror *everything* under /de/ and /en/ — including the default
    // locale, so there's no un-prefixed German content living at "/".
    routing: {
      prefixDefaultLocale: true,
    },
  },
  // Static redirect from "/" to the default locale (this is a fully
  // static site with no server to do request-time locale negotiation).
  redirects: {
    '/': '/de/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});