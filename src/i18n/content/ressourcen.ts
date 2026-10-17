import type { Locale } from "../locales";

export interface ResourcePoint {
  /** Short marker shown in front, e.g. the acronym letter "R". */
  key: string;
  label: string;
  text: string;
}

export interface ResourceEntry {
  title: string;
  source: string;
  href: string;
  description: string;
  /** Optional structured breakdown, e.g. the parts of a framework. */
  points?: ResourcePoint[];
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
      {
        title: "RBDSMA — Gespräch vor einer intimen Begegnung",
        source: "Katha Wirth · Sexologische Körpertherapie",
        href: "https://www.sexological-bodytherapy.com/blog/rbdsma-conversation",
        description:
          "Ein Gesprächsleitfaden für ein Vorgespräch, bevor man mit jemandem intim oder sexuell wird. Das Akronym hat „BDSM“ in der Mitte, mit einem R am Anfang und einem A am Ende. Die Autorin hat das Format im Umfeld der ISTA (International School of Temple Arts) kennengelernt. Das Gespräch kann 10 Minuten oder zwei Stunden dauern und lässt sich bei weiteren Begegnungen wieder aufgreifen; am Ende steht die Frage, ob es sich für alle Beteiligten nach einem klaren Ja anfühlt.",
        points: [
          {
            key: "R",
            label: "Relationships (Beziehungen)",
            text: "Welchen Beziehungsstatus hast du? Gibt es andere Partner*innen oder Vereinbarungen, die für diese Begegnung wichtig sind?",
          },
          {
            key: "B",
            label: "Boundaries (Grenzen)",
            text: "Was sind deine festen Grenzen, No-Gos und Turn-offs? Was sorgt bei dir für Sicherheit und echtes Einverständnis — etwa ein Safeword oder ein Ampelsystem?",
          },
          {
            key: "D",
            label: "Desires (Wünsche)",
            text: "Was wünschst du dir von dieser Begegnung? Was reizt dich gerade, und wo gibt es eine Schnittmenge zwischen euch?",
          },
          {
            key: "S",
            label: "Sexual Health (Sexuelle Gesundheit)",
            text: "Wann war dein letzter Test auf sexuell übertragbare Infektionen (STIs)? Welche Safer-Sex-Praktiken nutzt du, und gibt es gesundheitliche Dinge zu besprechen?",
          },
          {
            key: "M",
            label: "Meaning (Bedeutung)",
            text: "Welche Bedeutung hat diese Begegnung für dich — einmalig, mit Wiederholung, eher körperlich oder emotional tiefergehend?",
          },
          {
            key: "A",
            label: "Aftercare (Nachsorge)",
            text: "Was brauchst du nach der Intimität? Zum Beispiel Halten, Raum für dich, noch reden, eine Nachricht am nächsten Tag — oder direkt gehen.",
          },
        ],
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
      {
        title: "RBDSMA — a conversation before an intimate encounter",
        source: "Katha Wirth · Sexological Bodytherapy (article in German)",
        href: "https://www.sexological-bodytherapy.com/blog/rbdsma-conversation",
        description:
          "A conversation framework for talking things through before becoming intimate or sexual with someone. The acronym has \"BDSM\" in the middle, with an R at the start and an A at the end. The author came across the format around ISTA (International School of Temple Arts). The talk can take 10 minutes or two hours and can be picked up again at later encounters; it ends with checking whether it feels like a clear yes for everyone involved.",
        points: [
          {
            key: "R",
            label: "Relationships",
            text: "What's your relationship status? Are there other partners or agreements that matter for this encounter?",
          },
          {
            key: "B",
            label: "Boundaries",
            text: "What are your firm boundaries, no-gos and turn-offs? What makes you feel safe and able to truly consent — for example a safeword or a traffic-light system?",
          },
          {
            key: "D",
            label: "Desires",
            text: "What do you want from this encounter? What excites you right now, and where do your wishes overlap?",
          },
          {
            key: "S",
            label: "Sexual Health",
            text: "When were you last tested for sexually transmitted infections (STIs)? Which safer-sex practices do you use, and is there anything health-related to talk about?",
          },
          {
            key: "M",
            label: "Meaning",
            text: "What does this encounter mean to you — a one-off, something to repeat, mainly physical or emotionally deeper?",
          },
          {
            key: "A",
            label: "Aftercare",
            text: "What do you need after being intimate? For example being held, space for yourself, talking a bit more, a message the next day — or leaving right away.",
          },
        ],
      },
    ],
    comingSoonTitle: "Growing",
    comingSoonBody: "More links will be added once I've sorted them.",
  },
};
