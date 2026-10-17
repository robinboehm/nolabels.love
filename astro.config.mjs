// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://nolabels.love';

// https://astro.build/config
export default defineConfig({
  // Served via a custom domain (see /CNAME) at the domain root, not under
  // a GitHub Pages project subpath — so `site` is enough, no `base` needed.
  site: SITE,
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
  integrations: [
    sitemap({
      // "/" is only a redirect stub (noindex), keep it out of the sitemap.
      filter: (page) => page !== `${SITE}/`,
      i18n: {
        defaultLocale: 'de',
        locales: { de: 'de-DE', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
