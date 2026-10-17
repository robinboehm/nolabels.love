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
dependency-free. `src/pages/tools/board.astro` is the Astro-side landing
page that links to it.

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
