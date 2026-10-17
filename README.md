# nolabels.love

Ressourcen und Tools für Beziehungen jenseits vorgegebener Schablonen — mit
Schwerpunkt auf Non-Monogamie, Polyamorie und Relationship Anarchy.

Gebaut mit [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) (v4) + TypeScript, gehostet auf
GitHub Pages unter der Custom Domain `nolabels.love`.

## Struktur

| Bereich | Route | Stand |
|---|---|---|
| Start | `/` | ✅ |
| Tools | `/tools` | ✅ (Board) |
| Ressourcen | `/ressourcen` | 🌱 Erste Einträge |
| Glossar | `/glossar` | 🌱 Erste Begriffe |
| Coachings & Kurse | `/coaching` | 🚧 Platzhalter |

```
src/
├── layouts/BaseLayout.astro   # <head>, Header + Footer Rahmen
├── components/                # Header, Footer, OrbitField (Hero-Deko)
├── lib/nav.ts                 # Zentrale Navigationsstruktur
└── pages/                     # Eine Datei pro Route (Astro File-based Routing)
public/
└── tools/board/app/           # Legacy-Tool, siehe unten
```

### Das Board — ein Sonderfall

`public/tools/board/app/` ist das **Relationship Anarchy Smörgåsbord**-Tool:
eine eigenständige, build-freie Vanilla-JS/CSS-App, die älter ist als die
Astro-Seite drumherum und bewusst so bleibt (kein Framework, keine
Build-Abhängigkeiten, läuft genauso gut offline per Doppelklick auf
`index.html`). Astro kopiert sie unverändert mit ins Build; die
Astro-Seite `/tools/board` ist nur die Landingpage davor.

Ausführliche Doku zum Board (Features, Datenmodell, QR-Export, Versionierung):
[`docs/board.md`](./docs/board.md).

## Entwicklung

```sh
npm install
npm run dev       # Dev-Server, Hot Reload
npm run build     # Produktions-Build nach dist/
npm run preview   # Build lokal unter http://localhost:4321 ansehen
```

Node ≥ 22.22 wird vorausgesetzt (siehe `package.json#engines`).

## Deployment

`.github/workflows/deploy.yml` baut die Seite bei jedem Push auf `main` via
[`withastro/action`](https://github.com/withastro/action) und deployt sie
über GitHub Pages (`actions/deploy-pages`). Die Custom Domain wird über
`public/CNAME` (→ `nolabels.love`) konfiguriert; DNS muss entsprechend auf
GitHub Pages zeigen.

In den Repo-Einstellungen muss unter **Settings → Pages** als Quelle
**GitHub Actions** ausgewählt sein (nicht "Deploy from a branch").

## Lizenz der Board-Inhalte

Kategorien und Items des Board-Tools stammen aus dem Relationship Anarchy
Smörgåsbord (v6), lizenziert unter
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Ressourcen-Rohmaterial

[`RESOURCES.md`](./RESOURCES.md) ist die Sammelstelle für Links, aus der
die `/ressourcen`-Seite gespeist wird.
