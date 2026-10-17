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
      "Interaktive Tools rund um Beziehungen jenseits von Labels — bisher das Relationship Anarchy Smörgåsbord als Board.",
    eyebrow: "Tools",
    heading: "Tools zum Ausprobieren",
    intro:
      "Kleine Werkzeuge, die ich für mich gebaut habe und hier teile. Alles läuft direkt im Browser — ohne Konto, ohne Server, die Daten bleiben auf deinem Gerät.",
    tools: [
      {
        title: "Relationship Anarchy Smörgåsbord",
        description:
          "179 mögliche Bestandteile einer Beziehung, jeweils nach Status und Wunsch einzuordnen. Zwei ausgefüllte Boards lassen sich vergleichen und per QR-Code teilen — rein lokal im Browser.",
        path: "/tools/board",
        status: "Verfügbar",
      },
    ],
    comingSoonTitle: "Bald",
    comingSoonBody: "Weitere Tools kommen dazu, wenn ich sie baue.",
    openCta: "Öffnen",
  },
  en: {
    title: "Tools",
    description:
      "Interactive tools around relationships beyond labels — so far the Relationship Anarchy Smörgåsbord as a board.",
    eyebrow: "Tools",
    heading: "Tools to try out",
    intro:
      "Small tools I built for myself and share here. Everything runs right in your browser — no account, no server, your data stays on your device.",
    tools: [
      {
        title: "Relationship Anarchy Smörgåsbord",
        description:
          "179 possible components of a relationship, each sorted by status and desire. Two filled-out boards can be compared and shared via QR code — entirely local in the browser.",
        path: "/tools/board",
        status: "Available",
      },
    ],
    comingSoonTitle: "Coming soon",
    comingSoonBody: "More tools will be added as I build them.",
    openCta: "Open",
  },
};
