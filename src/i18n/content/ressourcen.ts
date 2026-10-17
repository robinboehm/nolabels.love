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
    description: "Kuratierte Artikel, Guides und Links rund um Non-Monogamie, Polyamorie und Relationship Anarchy.",
    eyebrow: "Ressourcen",
    heading: "Artikel & Guides",
    intro:
      "Eine wachsende Sammlung von Links rund um offene Beziehungen, Polyamorie und Relationship Anarchy. Noch am Anfang — wird laufend erweitert.",
    resources: [
      {
        title: "Relationship Anarchy Guide",
        source: "The Relationship Anarchist",
        href: "https://www.therelationshipanarchist.com/relationship-anarchy-guide",
        description:
          "Einstiegs-Guide mit mehreren Bausteinen: Grundprinzipien von Relationship Anarchy (Ablehnung zwischenmenschlichen Zwangs, Bedeutung von Community, Mutual Aid als zentrale Stütze, Commitments als Kommunikation statt Vertrag); eine kritische Erklärung der „Relationship Escalator“-Norm — dem gesellschaftlich erwarteten Stufenplan von Flirten bis Heirat und Kinder; eine eigene, knappere Variante des Relationship Smorgasbord samt Worksheet; sowie eine Abgrenzung von Relationship Anarchy zu Polyamorie/„Ethical Non-Monogamy“.",
      },
    ],
    comingSoonTitle: "Bald",
    comingSoonBody: "Weitere Ressourcen sind in Arbeit.",
  },
  en: {
    title: "Resources",
    description: "Curated articles, guides and links about non-monogamy, polyamory and relationship anarchy.",
    eyebrow: "Resources",
    heading: "Articles & guides",
    intro:
      "A growing collection of links about open relationships, polyamory and relationship anarchy. Still early days — expanded continuously.",
    resources: [
      {
        title: "Relationship Anarchy Guide",
        source: "The Relationship Anarchist",
        href: "https://www.therelationshipanarchist.com/relationship-anarchy-guide",
        description:
          "An entry-level guide with several parts: core principles of relationship anarchy (rejecting interpersonal coercion, the importance of community, mutual aid as a core pillar, commitments as communication rather than contract); a critical look at the \"relationship escalator\" norm — the socially expected path from dating through exclusivity, moving in together, marriage and kids; its own, shorter take on the Relationship Smorgasbord with a downloadable worksheet; and a distinction between relationship anarchy and polyamory/\"ethical non-monogamy\".",
      },
    ],
    comingSoonTitle: "Coming soon",
    comingSoonBody: "More resources are in the works.",
  },
};
