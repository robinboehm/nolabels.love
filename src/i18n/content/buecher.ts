import type { Locale } from "../locales";

export interface BookEntry {
  title: string;
  author: string;
  summary: string;
}

export interface BuecherContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  books: BookEntry[];
  comingSoonTitle: string;
  comingSoonBody: string;
}

export const BUECHER_CONTENT: Record<Locale, BuecherContent> = {
  de: {
    title: "Bücher",
    description: "Bücher zu Non-Monogamie, Polyamorie und Relationship Anarchy — jeweils mit einer kurzen Notiz, worum es geht.",
    eyebrow: "Bücher",
    heading: "Bücher",
    intro:
      "Bücher aus dem Themenfeld, die auf meiner Liste stehen — jeweils mit einer kurzen Notiz, worum es darin geht. Keine Rezensionen, eher eine Leseliste.",
    books: [
      {
        title: "The Ethical Slut",
        author: "Janet W. Hardy & Dossie Easton",
        summary:
          "Eines der meistzitierten Bücher der modernen Polyamorie-Bewegung. Ein praktischer Leitfaden zu Eifersucht, Kommunikation und einvernehmlicher Non-Monogamie.",
      },
      {
        title: "Polysecure",
        author: "Jessica Fern",
        summary:
          "Betrachtet Polyamorie durch die Brille der Bindungstheorie — es geht darum, wie Bindungsmuster, Eifersucht und Unsicherheit in nicht-monogamen Beziehungen zusammenhängen.",
      },
      {
        title: "More Than Two",
        author: "Franklin Veaux & Eve Rickert",
        summary:
          "Ein umfangreicher Leitfaden zu verschiedenen Polyamorie-Strukturen, Ethik und typischen Fallstricken — inklusive einer Auseinandersetzung mit Hierarchien und „Regeln über Dritte“.",
      },
      {
        title: "Opening Up",
        author: "Tristan Taormino",
        summary:
          "Auf Interviews mit vielen nicht-monogam lebenden Menschen gestützter Überblick über ganz unterschiedliche offene Beziehungsmodelle — von Swinging bis Polyamorie — ohne ein Modell als „das richtige“ zu bewerben.",
      },
      {
        title: "The Smart Girl's Guide to Polyamory",
        author: "Dedeker Winston",
        summary:
          "Ein Einstieg in Polyamorie von der Mitgründerin des Multiamory-Podcasts, mit vielen praktischen Beispielen.",
      },
      {
        title: "Love's Not Color Blind",
        author: "Kevin A. Patterson",
        summary:
          "Beschäftigt sich mit Rassismus, Diversität und Ausgrenzung innerhalb nicht-monogamer Communitys.",
      },
    ],
    comingSoonTitle: "Wächst",
    comingSoonBody: "Die Liste wächst mit dem, was ich lese.",
  },
  en: {
    title: "Books",
    description: "Books on non-monogamy, polyamory and relationship anarchy — each with a short note on what it's about.",
    eyebrow: "Books",
    heading: "Books",
    intro:
      "Books from the field that are on my list — each with a short note on what it's about. Not reviews, more of a reading list.",
    books: [
      {
        title: "The Ethical Slut",
        author: "Janet W. Hardy & Dossie Easton",
        summary:
          "One of the most widely cited books of the modern polyamory movement. A practical guide to jealousy, communication and consensual non-monogamy.",
      },
      {
        title: "Polysecure",
        author: "Jessica Fern",
        summary:
          "Looks at polyamory through the lens of attachment theory — about how attachment patterns, jealousy and insecurity connect in non-monogamous relationships.",
      },
      {
        title: "More Than Two",
        author: "Franklin Veaux & Eve Rickert",
        summary:
          "A comprehensive guide to different polyamory structures, ethics and common pitfalls — including a look at hierarchies and \"rules about other people\".",
      },
      {
        title: "Opening Up",
        author: "Tristan Taormino",
        summary:
          "An interview-based overview of many different open relationship models — from swinging to polyamory — without promoting any single structure as \"the right one\".",
      },
      {
        title: "The Smart Girl's Guide to Polyamory",
        author: "Dedeker Winston",
        summary:
          "An introduction to polyamory from the co-host of the Multiamory podcast, with lots of practical examples.",
      },
      {
        title: "Love's Not Color Blind",
        author: "Kevin A. Patterson",
        summary:
          "Deals with race, diversity and exclusion within non-monogamous communities.",
      },
    ],
    comingSoonTitle: "Growing",
    comingSoonBody: "The list grows with what I read.",
  },
};
