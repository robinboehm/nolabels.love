## Project structure

This repo is the nolabels.love website: an Astro + Tailwind (v4, via
`@tailwindcss/vite`) + TypeScript site. Pages/components live in `src/`,
static files in `public/`.

One important exception: `public/tools/board/app/` is a separate, legacy
**zero-build vanilla JS/CSS app** (the "Relationship Anarchy Smörgåsbord"
tool) that predates the Astro site. Astro copies it into the build
untouched — it is *not* an Astro page and doesn't use Tailwind. It has its
own cache-busting/versioning via `scripts/update-version.cjs` (run
automatically by the `pre-commit` git hook) — don't "modernize" it into
Astro components without discussing it first, it's intentionally
dependency-free. It also has its own internal DE/EN toggle (stored in
`localStorage`), independent of the site-level locale below — so it's
served from a single shared path (`/tools/board/app/`), not duplicated
per locale.

### i18n (German/English)

The whole site is mirrored under `/de/` and `/en/` using Astro's native
i18n routing (`i18n` + `redirects` in `astro.config.mjs`,
`prefixDefaultLocale: true`, default locale `de`). `/` statically
redirects to `/de/`.

- `src/pages/de/**` and `src/pages/en/**` are thin wrappers — each just
  renders the matching component from `src/views/` with a `locale` prop.
  Add new pages in both locale folders, pointing at a shared view.
- `src/views/*View.astro` hold the actual markup and wrap content in
  `BaseLayout` (pass `locale` + the locale-independent `path`, used for
  hreflang tags and the language switcher).
- `src/i18n/content/*.ts` hold the bilingual copy per page
  (`{ de: {...}, en: {...} }`); `src/i18n/nav.ts` and `src/i18n/ui.ts`
  hold shared nav labels / UI strings.
- `Header.astro`/`Footer.astro` build locale-aware links via
  `getRelativeLocaleUrl` from `astro:i18n` — never hardcode `/tools`
  style paths without going through that helper (or the page will link
  across locales).
- When adding a page, add it to both `src/i18n/nav.ts` locales if it
  should show in navigation, and to `src/i18n/content/` if it has
  translatable copy.

### SEO & LLM discoverability

- `BaseLayout` emits canonical + absolute hreflang (incl. `x-default`),
  Open Graph/Twitter tags (image: `public/og.png`, regenerate with
  `node scripts/generate-og-image.mjs`) and a JSON-LD `@graph`
  (WebSite + WebPage). Views pass extra schema.org nodes via the
  `jsonLd` prop, built with helpers from `src/seo/jsonld.ts`.
- `@astrojs/sitemap` generates `sitemap-index.xml` with DE/EN
  alternates; `public/robots.txt` explicitly allows search and AI
  crawlers.
- `/llms.txt` and `/llms-full.txt` (see llmstxt.org) are generated at
  build time from the `src/i18n/content/` dictionaries by
  `src/seo/llms.ts` — when adding a page, add it there too so LLMs see
  it. `/de/faq` + `/en/faq` (`src/i18n/content/faq.ts`) is the
  human-readable Q&A about the project and its concepts, also exposed
  as `FAQPage` JSON-LD.
- The board app (`public/tools/board/app/`) is `noindex, follow` on
  purpose; the indexable pages are `/de/tools/board/` and
  `/en/tools/board/`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Build and preview the production build locally:

```
npm run build
npm run preview
```

Deployment is automatic via `.github/workflows/deploy.yml` (GitHub Pages,
custom domain `nolabels.love` via `public/CNAME`) on every push to `main`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
