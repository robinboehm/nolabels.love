import type { Locale } from "../locales";

export interface ToolEntry {
  title: string;
  description: string;
  path: string;
  status: string;
}

export interface ToolsContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  tools: ToolEntry[];
  comingSoonTitle: string;
  comingSoonBody: string;
  openCta: string;
}

export const TOOLS_CONTENT: Record<Locale, ToolsContent> = {
  de: {
    title: "Tools",
    description:
      "Interaktive Tools für Beziehungen jenseits vorgegebener Schablonen — den Anfang macht das Relationship Anarchy Smörgåsbord-Board.",
    eyebrow: "Tools",
    heading: "Werkzeuge für klare Beziehungen",
    intro:
      "Jedes Tool läuft direkt im Browser — ohne Konto, ohne Server, deine Daten bleiben bei dir. Weitere Tools kommen mit der Zeit dazu.",
    tools: [
      {
        title: "Relationship Anarchy Smörgåsbord",
        description:
          "Bewertet pro Beziehungsperson 179 Elemente nach Status und Wunsch, vergleicht zwei ausgefüllte Boards im Match und teilt Ergebnisse per QR-Code — alles rein lokal im Browser, ohne Server.",
        path: "/tools/board",
        status: "Verfügbar",
      },
    ],
    comingSoonTitle: "Bald",
    comingSoonBody: "Weitere Tools sind in Arbeit.",
    openCta: "Öffnen",
  },
  en: {
    title: "Tools",
    description:
      "Interactive tools for relationships beyond pre-set templates — starting with the Relationship Anarchy Smörgåsbord board.",
    eyebrow: "Tools",
    heading: "Tools for clearer relationships",
    intro:
      "Every tool runs right in your browser — no account, no server, your data stays with you. More tools will be added over time.",
    tools: [
      {
        title: "Relationship Anarchy Smörgåsbord",
        description:
          "Rates 179 elements per relationship by status and desire, compares two filled-out boards in a match view, and shares results via QR code — entirely local in the browser, no server.",
        path: "/tools/board",
        status: "Available",
      },
    ],
    comingSoonTitle: "Coming soon",
    comingSoonBody: "More tools are in the works.",
    openCta: "Open",
  },
};
