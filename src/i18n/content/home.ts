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
    title: "Polyamorie, Relationship Anarchy & Non-Monogamie",
    eyebrow: "nolabels.love",
    heading: ["Eine offene Sammlung zu Beziehungen", "jenseits von Labels."],
    intro:
      "Hier sammle und sortiere ich, womit ich mich gerade rund um Non-Monogamie, Polyamorie und Relationship Anarchy beschäftige — Tools, Links, Bücher, Begriffe und Events. Frei zum Stöbern, Mitnehmen und Weitergeben.",
    ctaPrimary: "Tools ausprobieren",
    ctaSecondary: "Glossar ansehen",
    sections: [
      {
        eyebrow: "01 · Verfügbar",
        title: "Tools",
        body: "Interaktive Werkzeuge zum Selbst-Ausprobieren — bisher das Relationship Anarchy Smörgåsbord als Board.",
        path: "/tools",
        cta: "Tools ansehen",
      },
      {
        eyebrow: "02 · Wächst",
        title: "Ressourcen",
        body: "Artikel, Guides und Links rund um Non-Monogamie, Polyamorie und Relationship Anarchy.",
        path: "/ressourcen",
        cta: "Ressourcen ansehen",
      },
      {
        eyebrow: "03 · Wächst",
        title: "Bücher",
        body: "Bücher zum Thema, jeweils mit einer kurzen Notiz, worum es darin geht.",
        path: "/buecher",
        cta: "Bücher ansehen",
      },
      {
        eyebrow: "04 · Wächst",
        title: "Glossar",
        body: "Begriffe wie Polyamorie, Metamour oder Kitchen-Table-Poly — mit kurzen Notizen, wie sie meist verwendet werden.",
        path: "/glossar",
        cta: "Glossar öffnen",
      },
      {
        eyebrow: "05 · Wächst",
        title: "Events & Meetups",
        body: "Parties, Meetups und Events wie Temple Nights — mit kurzer Beschreibung und Links zu Telegram & Webseite.",
        path: "/events",
        cta: "Events ansehen",
      },
      {
        eyebrow: "06 · Später",
        title: "Coachings & Kurse",
        body: "Eine Idee für später: Formate zum gemeinsamen Austausch und zur Begleitung.",
        path: "/coaching",
        cta: "Mehr dazu",
      },
    ],
  },
  en: {
    title: "Polyamory, Relationship Anarchy & Non-Monogamy",
    eyebrow: "nolabels.love",
    heading: ["An open collection on relationships", "beyond labels."],
    intro:
      "This is where I collect and sort what I'm currently exploring around non-monogamy, polyamory and relationship anarchy — tools, links, books, terms and events. Free to browse, take and pass on.",
    ctaPrimary: "Try the tools",
    ctaSecondary: "Browse the glossary",
    sections: [
      {
        eyebrow: "01 · Available",
        title: "Tools",
        body: "Interactive tools to try out for yourself — so far the Relationship Anarchy Smörgåsbord as a board.",
        path: "/tools",
        cta: "View tools",
      },
      {
        eyebrow: "02 · Growing",
        title: "Resources",
        body: "Articles, guides and links about non-monogamy, polyamory and relationship anarchy.",
        path: "/ressourcen",
        cta: "View resources",
      },
      {
        eyebrow: "03 · Growing",
        title: "Books",
        body: "Books on the topic, each with a short note on what it's about.",
        path: "/buecher",
        cta: "View books",
      },
      {
        eyebrow: "04 · Growing",
        title: "Glossary",
        body: "Terms like polyamory, metamour or kitchen-table poly — with short notes on how they're commonly used.",
        path: "/glossar",
        cta: "Open glossary",
      },
      {
        eyebrow: "05 · Growing",
        title: "Events & Meetups",
        body: "Parties, meetups and events like Temple Nights — with a short description and links to Telegram & website.",
        path: "/events",
        cta: "View events",
      },
      {
        eyebrow: "06 · Later",
        title: "Coaching & Courses",
        body: "An idea for later: formats for sharing experiences and accompanying each other.",
        path: "/coaching",
        cta: "More on this",
      },
    ],
  },
};
