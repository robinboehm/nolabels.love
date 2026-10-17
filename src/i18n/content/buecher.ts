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
    description: "Buchempfehlungen zu Non-Monogamie, Polyamorie und Relationship Anarchy — mit kurzen Übersichten.",
    eyebrow: "Bücher",
    heading: "Buchempfehlungen",
    intro:
      "Eine wachsende Auswahl an Büchern, die uns beim Nachdenken über Beziehungen jenseits der Norm geholfen haben — mit kurzer Einordnung statt vollständiger Rezension.",
    books: [
      {
        title: "The Ethical Slut",
        author: "Janet W. Hardy & Dossie Easton",
        summary:
          "Das meistzitierte Grundlagenwerk der modernen Polyamorie-Bewegung. Praktischer, warmherziger Leitfaden zu Eifersucht, Kommunikation und einvernehmlicher Non-Monogamie — ein guter erster Einstieg.",
      },
      {
        title: "Polysecure",
        author: "Jessica Fern",
        summary:
          "Erklärt Polyamorie über die Bindungstheorie: Warum Eifersucht und Unsicherheit oft weniger mit „falschem“ Beziehungsmodell zu tun haben als mit Bindungsmustern — und wie sich sicherere Bindung in nicht-monogamen Beziehungen aufbauen lässt.",
      },
      {
        title: "More Than Two",
        author: "Franklin Veaux & Eve Rickert",
        summary:
          "Umfangreicher, sehr konkreter Leitfaden zu verschiedenen Polyamorie-Strukturen, Ethik und typischen Fallstricken — inklusive kritischer Auseinandersetzung mit starren Hierarchien und „Regeln über Dritte“.",
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
          "Zugänglicher, moderner Einstieg von der Mitgründerin des Multiamory-Podcasts — praxisnah für alle, die gerade erst anfangen, sich mit Polyamorie zu beschäftigen.",
      },
      {
        title: "Love's Not Color Blind",
        author: "Kevin A. Patterson",
        summary:
          "Setzt sich mit Rassismus, Diversität und Ausgrenzung innerhalb nicht-monogamer Communitys auseinander — ein wichtiger, oft fehlender Blickwinkel in der Polyamorie-Literatur.",
      },
    ],
    comingSoonTitle: "Bald",
    comingSoonBody: "Weitere Buchempfehlungen sind in Arbeit.",
  },
  en: {
    title: "Books",
    description: "Book recommendations on non-monogamy, polyamory and relationship anarchy — with short overviews.",
    eyebrow: "Books",
    heading: "Book recommendations",
    intro:
      "A growing selection of books that have helped us think about relationships beyond the norm — a short take rather than a full review.",
    books: [
      {
        title: "The Ethical Slut",
        author: "Janet W. Hardy & Dossie Easton",
        summary:
          "The most widely cited foundational text of the modern polyamory movement. A practical, warm guide to jealousy, communication and consensual non-monogamy — a solid first read.",
      },
      {
        title: "Polysecure",
        author: "Jessica Fern",
        summary:
          "Explains polyamory through the lens of attachment theory: why jealousy and insecurity often have less to do with the \"wrong\" relationship structure and more with attachment patterns — and how to build more secure attachment within non-monogamous relationships.",
      },
      {
        title: "More Than Two",
        author: "Franklin Veaux & Eve Rickert",
        summary:
          "A comprehensive, very concrete guide to different polyamory structures, ethics and common pitfalls — including a critical look at rigid hierarchies and \"rules about other people\".",
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
          "An accessible, modern introduction from the co-host of the Multiamory podcast — practical for anyone just starting to explore polyamory.",
      },
      {
        title: "Love's Not Color Blind",
        author: "Kevin A. Patterson",
        summary:
          "Addresses race, diversity and exclusion within non-monogamous communities — an important perspective that's often missing from polyamory literature.",
      },
    ],
    comingSoonTitle: "Coming soon",
    comingSoonBody: "More book recommendations are in the works.",
  },
};
