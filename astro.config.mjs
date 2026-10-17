// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Served via a custom domain (see /CNAME) at the domain root, not under
  // a GitHub Pages project subpath — so `site` is enough, no `base` needed.
  site: 'https://nolabels.love',
  vite: {
    plugins: [tailwindcss()],
  },
});