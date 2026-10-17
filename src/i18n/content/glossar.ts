import type { Locale } from "../locales";

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface GlossarContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  terms: GlossaryTerm[];
}

export const GLOSSAR_CONTENT: Record<Locale, GlossarContent> = {
  de: {
    title: "Glossar",
    description: "Begriffe rund um Non-Monogamie, Polyamorie und Relationship Anarchy — verständlich erklärt.",
    eyebrow: "Glossar",
    heading: "Begriffe erklärt",
    intro:
      "Ein erster, bewusst kleiner Satz an Begriffen rund um Non-Monogamie, Polyamorie und Relationship Anarchy — Genauigkeit vor Vollständigkeit. Wird laufend erweitert.",
    terms: [
      {
        term: "Compersion",
        definition:
          "Die Freude darüber, dass die eigene Partnerin/der eigene Partner mit einer anderen Person eine erfüllende Zeit oder Beziehung erlebt — oft als Gegenstück zu Eifersucht beschrieben, auch wenn beide Gefühle gleichzeitig auftreten können.",
      },
      {
        term: "Einvernehmliche Non-Monogamie (ENM)",
        definition:
          "Oberbegriff für Beziehungsmodelle, in denen mehr als eine romantische und/oder sexuelle Verbindung gleichzeitig besteht — mit dem Wissen und Einverständnis aller Beteiligten. Polyamorie, offene Beziehungen und Relationship Anarchy fallen alle darunter.",
      },
      {
        term: "Hierarchische Polyamorie",
        definition:
          "Ein Polyamorie-Modell mit erkennbarer Rangfolge zwischen Beziehungen, z. B. eine „primäre“ Partnerschaft (oft mit gemeinsamem Haushalt, Finanzen oder Kindern) und „sekundäre“ Beziehungen daneben. Steht im Kontrast zu nicht-hierarchischen Modellen wie Kitchen-Table- oder Relationship-Anarchy-Ansätzen.",
      },
      {
        term: "Kitchen-Table Polyamory",
        definition:
          "Ein Polyamorie-Stil, bei dem alle beteiligten Personen (einschließlich Metamours) idealerweise entspannt miteinander auskommen und sich vorstellen können, gemeinsam am Küchentisch zu sitzen — im Gegensatz zu Parallel Polyamory, wo die Beziehungen bewusst getrennt bleiben.",
      },
      {
        term: "Metamour",
        definition:
          "Die Partnerin/der Partner deiner Partnerin bzw. deines Partners, zu der/dem du selbst nicht in einer romantischen oder sexuellen Beziehung stehst.",
      },
      {
        term: "Mono-Poly-Beziehung",
        definition:
          "Eine Beziehung, in der eine Person monogam leben möchte und die andere polyamor — meist durch explizite Absprachen darüber, was das für beide Seiten bedeutet und welche Bedürfnisse auf welchem Weg erfüllt werden.",
      },
      {
        term: "New Relationship Energy (NRE)",
        definition:
          "Die intensive Aufregung, Verliebtheit und gesteigerte Aufmerksamkeit zu Beginn einer neuen Beziehung. In nicht-monogamen Kontexten oft explizit benannt, weil sie bestehende Beziehungen vorübergehend beeinflussen kann.",
      },
      {
        term: "Parallel Polyamory",
        definition:
          "Ein Polyamorie-Stil, bei dem die verschiedenen Beziehungen weitgehend getrennt nebeneinander existieren, ohne dass sich die beteiligten Personen zwangsläufig kennenlernen oder Kontakt pflegen müssen.",
      },
      {
        term: "Polyamorie",
        definition:
          "Die Praxis oder das Begehren, mehrere romantische Beziehungen gleichzeitig zu führen — mit dem Wissen und Einverständnis aller Beteiligten. Die konkrete Form (Hierarchie, Wohnsituation, Regeln) variiert stark von Mensch zu Mensch.",
      },
      {
        term: "Relationship Anarchy",
        definition:
          "Ein Ansatz, der jede Beziehung individuell gestaltet, statt vorgegebenen Kategorien (Partner*in, beste Freund*in, …) automatisch bestimmte Rechte, Pflichten oder Prioritäten zuzuschreiben. Lehnt insbesondere die „Relationship Escalator“-Norm ab und betont Communitys sowie gegenseitige Unterstützung (Mutual Aid) als zentrale Stützen.",
      },
      {
        term: "Relationship Escalator",
        definition:
          "Die gesellschaftlich erwartete Abfolge, der romantische Beziehungen angeblich folgen sollen: Dating → Exklusivität → Zusammenziehen → Heirat → Kinder. Der Begriff wird meist kritisch verwendet, um zu hinterfragen, wessen Interessen dieser Standardpfad eigentlich bedient.",
      },
      {
        term: "Solo-Polyamorie",
        definition:
          "Ein Ansatz innerhalb der Polyamorie, bei dem eine Person sich selbst als primären Bezugspunkt versteht — oft ohne den Wunsch nach gemeinsamem Haushalt, verschmolzenen Finanzen oder einer Beziehung, die formal über allen anderen steht.",
      },
    ],
  },
  en: {
    title: "Glossary",
    description: "Terms around non-monogamy, polyamory and relationship anarchy — explained clearly.",
    eyebrow: "Glossary",
    heading: "Terms explained",
    intro:
      "A first, deliberately small set of terms around non-monogamy, polyamory and relationship anarchy — accuracy over completeness. Expanded continuously.",
    terms: [
      {
        term: "Compersion",
        definition:
          "The joy of seeing your partner have a fulfilling time or relationship with someone else — often described as the opposite of jealousy, even though both feelings can show up at the same time.",
      },
      {
        term: "Consensual Non-Monogamy (CNM / ENM)",
        definition:
          "An umbrella term for relationship structures where more than one romantic and/or sexual connection exists at the same time — with the knowledge and consent of everyone involved. Polyamory, open relationships and relationship anarchy all fall under this umbrella.",
      },
      {
        term: "Hierarchical Polyamory",
        definition:
          "A polyamory model with a visible ranking between relationships, e.g. a \"primary\" partnership (often sharing a household, finances or children) and \"secondary\" relationships alongside it. Contrasts with non-hierarchical approaches like kitchen-table polyamory or relationship anarchy.",
      },
      {
        term: "Kitchen-Table Polyamory",
        definition:
          "A polyamory style where everyone involved (including metamours) ideally gets along comfortably enough to imagine sitting around the same kitchen table — in contrast to parallel polyamory, where relationships stay deliberately separate.",
      },
      {
        term: "Metamour",
        definition: "Your partner's partner — someone you yourself are not romantically or sexually involved with.",
      },
      {
        term: "Mono-Poly Relationship",
        definition:
          "A relationship in which one person wants to live monogamously and the other polyamorously — usually navigated through explicit agreements about what that means for both sides and how needs get met.",
      },
      {
        term: "New Relationship Energy (NRE)",
        definition:
          "The intense excitement, infatuation and heightened attention at the start of a new relationship. Often named explicitly in non-monogamous contexts because it can temporarily affect existing relationships.",
      },
      {
        term: "Parallel Polyamory",
        definition:
          "A polyamory style where the different relationships exist largely separately side by side, without the people involved necessarily meeting or staying in contact.",
      },
      {
        term: "Polyamory",
        definition:
          "The practice or desire to have more than one romantic relationship at the same time — with the knowledge and consent of everyone involved. The exact shape (hierarchy, living situation, rules) varies a lot from person to person.",
      },
      {
        term: "Relationship Anarchy",
        definition:
          "An approach that shapes every relationship individually instead of automatically assigning certain rights, duties or priorities based on pre-set categories (partner, best friend, ...). In particular, it rejects the \"relationship escalator\" norm and emphasizes community and mutual aid as core pillars.",
      },
      {
        term: "Relationship Escalator",
        definition:
          "The socially expected sequence romantic relationships are supposedly meant to follow: dating → exclusivity → moving in together → marriage → kids. The term is usually used critically, to question whose interests this default path actually serves.",
      },
      {
        term: "Solo Polyamory",
        definition:
          "An approach within polyamory where a person considers themself their own primary point of reference — often without wanting a shared household, merged finances, or any one relationship formally ranked above the others.",
      },
    ],
  },
};
