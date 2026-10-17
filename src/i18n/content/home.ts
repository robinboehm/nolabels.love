import type { Locale } from "../locales";

export interface HomeSection {
  eyebrow: string;
  title: string;
  body: string;
  path: string;
  cta: string;
}

export interface HomeContent {
  title: string;
  eyebrow: string;
  heading: [string, string];
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
  sections: HomeSection[];
}

export const HOME_CONTENT: Record<Locale, HomeContent> = {
  de: {
    title: "no labels.",
    eyebrow: "nolabels.love",
    heading: ["Beziehungen, die zu dir passen —", "nicht zu einem Label."],
    intro:
      "Ein wachsender Werkzeugkasten mit Tools, Ressourcen und Begriffen für Beziehungen jenseits vorgegebener Schablonen — mit Schwerpunkt auf Non-Monogamie, Polyamorie und Relationship Anarchy.",
    ctaPrimary: "Zu den Tools",
    ctaSecondary: "Begriffe nachschlagen",
    sections: [
      {
        eyebrow: "01 · Verfügbar",
        title: "Tools",
        body: "Interaktive Werkzeuge, um gemeinsam Klarheit zu finden — den Anfang macht das Relationship Anarchy Smörgåsbord-Board.",
        path: "/tools",
        cta: "Tools entdecken",
      },
      {
        eyebrow: "02 · Im Aufbau",
        title: "Ressourcen",
        body: "Kuratierte Artikel, Guides und Links rund um Non-Monogamie, Polyamorie und Relationship Anarchy.",
        path: "/ressourcen",
        cta: "Ressourcen ansehen",
      },
      {
        eyebrow: "03 · Im Aufbau",
        title: "Glossar",
        body: "Begriffe wie Polyamorie, Metamour oder Kitchen-Table-Poly — verständlich erklärt, ohne Fachjargon.",
        path: "/glossar",
        cta: "Glossar öffnen",
      },
      {
        eyebrow: "04 · Bald",
        title: "Coachings & Kurse",
        body: "Begleitung und Formate für alle, die ihre Beziehungen bewusster gestalten wollen.",
        path: "/coaching",
        cta: "Mehr erfahren",
      },
    ],
  },
  en: {
    title: "no labels.",
    eyebrow: "nolabels.love",
    heading: ["Relationships that fit you —", "not a label."],
    intro:
      "A growing toolbox of tools, resources and terms for relationships beyond pre-set templates — with a focus on non-monogamy, polyamory and relationship anarchy.",
    ctaPrimary: "Go to Tools",
    ctaSecondary: "Look up terms",
    sections: [
      {
        eyebrow: "01 · Available",
        title: "Tools",
        body: "Interactive tools to find clarity together — starting with the Relationship Anarchy Smörgåsbord board.",
        path: "/tools",
        cta: "Explore tools",
      },
      {
        eyebrow: "02 · In progress",
        title: "Resources",
        body: "Curated articles, guides and links about non-monogamy, polyamory and relationship anarchy.",
        path: "/ressourcen",
        cta: "View resources",
      },
      {
        eyebrow: "03 · In progress",
        title: "Glossary",
        body: "Terms like polyamory, metamour or kitchen-table poly — explained clearly, without jargon.",
        path: "/glossar",
        cta: "Open glossary",
      },
      {
        eyebrow: "04 · Coming soon",
        title: "Coaching & Courses",
        body: "Guidance and formats for anyone who wants to shape their relationships more deliberately.",
        path: "/coaching",
        cta: "Learn more",
      },
    ],
  },
};
