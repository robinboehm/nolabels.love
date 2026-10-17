import type { Locale } from "../locales";

export interface BoardContent {
  title: string;
  description: string;
  backLabel: string;
  eyebrow: string;
  heading: string;
  intro: string;
  openCta: string;
  cards: { title: string; body: string }[];
  licenseNote: string;
}

export const BOARD_CONTENT: Record<Locale, BoardContent> = {
  de: {
    title: "Relationship Anarchy Smörgåsbord",
    description:
      "Bewerte Status und Wunsch für 179 Beziehungs-Elemente, vergleiche zwei Boards im Match und teile Ergebnisse per QR-Code — alles rein lokal im Browser.",
    backLabel: "← Alle Tools",
    eyebrow: "Tool",
    heading: "Relationship Anarchy Smörgåsbord",
    intro:
      "Das Smörgåsbord bricht eine Beziehung in 179 einzelne Elemente auf — von Finanzen über Kommunikation bis Intimität. Zu jedem Punkt hältst du fest, wie es aktuell ist (Status) und wie du ihn dir wünschst (Wunsch) — zwei bewusst getrennte Dimensionen.",
    openCta: "Board öffnen",
    cards: [
      {
        title: "Match-Vergleich",
        body: "Füllt unabhängig voneinander je ein eigenes Profil aus und vergleicht anschließend, wo Wunsch und Wahrnehmung übereinstimmen — und wo sich ein Gespräch lohnt.",
      },
      {
        title: "QR-Code teilen",
        body: "Ein Profil lässt sich direkt per QR-Code an ein zweites Handy übergeben — die Daten stecken komplett im Code selbst, es gibt keinen Server, der etwas davon zu sehen bekommt.",
      },
      {
        title: "Deine Daten bleiben bei dir",
        body: "Alles wird ausschließlich lokal im Browser gespeichert (localStorage). Es gibt kein Konto, keinen Server und kein Tracking — Export/Import (als Datei oder QR-Code) ist der einzige Weg, Daten zu bewegen.",
      },
    ],
    licenseNote:
      "Kategorien und Items basieren auf dem Relationship Anarchy Smörgåsbord (v6) von Lyrica Lawrence & Heather Orr, aktualisiert von Maxx Hill — lizenziert unter",
  },
  en: {
    title: "Relationship Anarchy Smörgåsbord",
    description:
      "Rate status and desire for 179 relationship elements, compare two boards in a match view, and share results via QR code — entirely local in the browser.",
    backLabel: "← All tools",
    eyebrow: "Tool",
    heading: "Relationship Anarchy Smörgåsbord",
    intro:
      "The Smörgåsbord breaks a relationship down into 179 individual elements — from finances to communication to intimacy. For each one, you record how it currently is (status) and how you'd like it to be (desire) — two deliberately separate dimensions.",
    openCta: "Open board",
    cards: [
      {
        title: "Match comparison",
        body: "Fill out your own profile independently, then compare where desire and perception line up — and where a conversation is worth having.",
      },
      {
        title: "Share via QR code",
        body: "A profile can be handed straight to a second phone via QR code — the data lives entirely inside the code itself, no server ever sees any of it.",
      },
      {
        title: "Your data stays with you",
        body: "Everything is stored locally in the browser only (localStorage). There's no account, no server and no tracking — export/import (as a file or QR code) is the only way data moves.",
      },
    ],
    licenseNote:
      "Categories and items are based on the Relationship Anarchy Smörgåsbord (v6) by Lyrica Lawrence & Heather Orr, updated by Maxx Hill — licensed under",
  },
};
