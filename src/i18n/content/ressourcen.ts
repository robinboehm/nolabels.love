import type { Locale } from "../locales";

export interface ResourceEntry {
  title: string;
  source: string;
  href: string;
  description: string;
}

export interface RessourcenContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  resources: ResourceEntry[];
  comingSoonTitle: string;
  comingSoonBody: string;
}

export const RESSOURCEN_CONTENT: Record<Locale, RessourcenContent> = {
  de: {
    title: "Ressourcen",
    description: "Eine offene Linksammlung mit Artikeln und Guides rund um Non-Monogamie, Polyamorie und Relationship Anarchy.",
    eyebrow: "Ressourcen",
    heading: "Artikel & Guides",
    intro:
      "Artikel und Guides, die ich gerade lese oder auf die ich immer wieder zurückkomme — jeweils mit einer kurzen Notiz, was drinsteht. Die Liste wächst mit.",
    resources: [
      {
        title: "Relationship Anarchy Guide",
        source: "The Relationship Anarchist",
        href: "https://www.therelationshipanarchist.com/relationship-anarchy-guide",
        description:
          "Einstiegs-Guide mit mehreren Bausteinen: Grundprinzipien von Relationship Anarchy (Ablehnung zwischenmenschlichen Zwangs, Bedeutung von Community, Mutual Aid als zentrale Stütze, Commitments als Kommunikation statt Vertrag); eine kritische Erklärung der „Relationship Escalator“-Norm — dem gesellschaftlich erwarteten Stufenplan von Flirten bis Heirat und Kinder; eine eigene, knappere Variante des Relationship Smorgasbord samt Worksheet; sowie eine Abgrenzung von Relationship Anarchy zu Polyamorie/„Ethical Non-Monogamy“.",
      },
    ],
    comingSoonTitle: "Wächst",
    comingSoonBody: "Weitere Links kommen dazu, sobald ich sie sortiert habe.",
  },
  en: {
    title: "Resources",
    description: "An open collection of articles and guides about non-monogamy, polyamory and relationship anarchy.",
    eyebrow: "Resources",
    heading: "Articles & guides",
    intro:
      "Articles and guides I'm currently reading or keep coming back to — each with a short note on what's inside. The list keeps growing.",
    resources: [
      {
        title: "Relationship Anarchy Guide",
        source: "The Relationship Anarchist",
        href: "https://www.therelationshipanarchist.com/relationship-anarchy-guide",
        description:
          "An entry-level guide with several parts: core principles of relationship anarchy (rejecting interpersonal coercion, the importance of community, mutual aid as a core pillar, commitments as communication rather than contract); a critical look at the \"relationship escalator\" norm — the socially expected path from dating through exclusivity, moving in together, marriage and kids; its own, shorter take on the Relationship Smorgasbord with a downloadable worksheet; and a distinction between relationship anarchy and polyamory/\"ethical non-monogamy\".",
      },
    ],
    comingSoonTitle: "Growing",
    comingSoonBody: "More links will be added once I've sorted them.",
  },
};
