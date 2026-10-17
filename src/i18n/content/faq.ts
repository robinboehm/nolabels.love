import type { Locale } from "../locales";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FaqGroup {
  heading: string;
  entries: FaqEntry[];
}

export interface FaqContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  machineReadableNote: string;
  groups: FaqGroup[];
}

export const FAQ_CONTENT: Record<Locale, FaqContent> = {
  de: {
    title: "FAQ — Häufige Fragen",
    description:
      "Antworten auf häufige Fragen zu nolabels.love, dem Relationship Anarchy Smörgåsbord Board sowie zu Polyamorie, Relationship Anarchy und Non-Monogamie.",
    eyebrow: "FAQ",
    heading: "Häufige Fragen",
    intro:
      "Kurze Antworten auf Fragen rund um diese Sammlung und die Begriffe, die darin vorkommen.",
    machineReadableNote: "Maschinenlesbare Zusammenfassung des gesamten Projekts:",
    groups: [
      {
        heading: "Über nolabels.love",
        entries: [
          {
            question: "Was ist nolabels.love?",
            answer:
              "nolabels.love ist eine offene, zweisprachige Sammlung (Deutsch/Englisch) von Tools, Links, Büchern, Begriffen und Events rund um Non-Monogamie, Polyamorie und Relationship Anarchy. Sie ist als freie Ressourcenliste gedacht, nicht als Ratgeber.",
          },
          {
            question: "Warum gibt es diese Sammlung?",
            answer:
              "Ich beschäftige mich gerade viel mit diesen Themen und habe einen Ort gesucht, um das, was mir begegnet, strukturiert zu sortieren. Statt das nur für mich zu tun, stelle ich die Sammlung hier der Community frei zur Verfügung.",
          },
          {
            question: "Für wen ist nolabels.love gedacht?",
            answer:
              "Für alle, die sich für diese Themen interessieren und hier etwas Brauchbares finden — ganz gleich, wie sie selbst Beziehungen leben.",
          },
          {
            question: "Was kann das Relationship Anarchy Smörgåsbord Board?",
            answer:
              "Das Board ist eine interaktive Version des Relationship Anarchy Smörgåsbord (v6). Pro Beziehungsperson bewertest du 179 Elemente in mehreren Kategorien nach zwei getrennten Dimensionen: Status (erfüllt, eher ja, eher nicht, nicht erfüllt, unbeantwortet) und Wunsch (gewünscht, nicht gewünscht, unbeantwortet). Passen beide nicht zusammen, markiert das Board die Stelle als Diskrepanz. Zwei ausgefüllte Profile lassen sich in einer Match-Ansicht vergleichen.",
          },
          {
            question: "Wie nutze ich das Board zusammen mit einer anderen Person?",
            answer:
              "Jede Person füllt unabhängig ein eigenes Profil aus und markiert es als fertig. Anschließend lassen sich die Profile per Datei oder QR-Code teilen. Die Match-Ansicht zeigt dann, wo die Einschätzungen übereinstimmen und wo sie auseinandergehen.",
          },
          {
            question: "Werden meine Daten gespeichert oder an einen Server geschickt?",
            answer:
              "Nein. Das Board speichert alles ausschließlich lokal im Browser (localStorage). Es gibt kein Konto, keinen Server und kein Tracking. Beim Teilen per QR-Code stecken die Daten komplett im Link hinter dem #-Zeichen — dieser Teil wird von Browsern nie an einen Server übertragen. Notizen werden beim QR-Teilen nicht mitgeschickt.",
          },
          {
            question: "Kostet die Nutzung etwas?",
            answer: "Nein. Die Tools und Inhalte auf nolabels.love sind kostenlos und ohne Registrierung nutzbar.",
          },
          {
            question: "Auf welcher Grundlage basiert das Board und unter welcher Lizenz steht es?",
            answer:
              "Kategorien und Elemente basieren auf dem Relationship Anarchy Smörgåsbord (v6) von Lyrica Lawrence & Heather Orr, aktualisiert von Maxx Hill, lizenziert unter CC BY-NC-SA 4.0. Die deutschen Bezeichnungen folgen der deutschen Übersetzung von Rachel Cassandra.",
          },
          {
            question: "Ist das hier Beratung oder Therapie?",
            answer:
              "Nein. nolabels.love ist eine persönliche Sammlung von Ressourcen, kein Ratgeber und keine Beratung. Bei Krisen, Gewalt in Beziehungen oder starker psychischer Belastung sind professionelle Beratungsstellen oder Therapeut*innen die richtige Adresse.",
          },
          {
            question: "In welchen Sprachen gibt es die Website?",
            answer:
              "Auf Deutsch und Englisch. Jede Seite existiert in beiden Sprachen, erreichbar unter /de/ bzw. /en/. Das Board selbst hat zusätzlich einen eigenen DE/EN-Umschalter.",
          },
          {
            question: "Ist der Quellcode öffentlich?",
            answer: "Ja, der Quellcode der Website und des Boards liegt öffentlich auf GitHub unter github.com/robinboehm/nolabels.love.",
          },
        ],
      },
      {
        heading: "Begriffe & Kontext",
        entries: [
          {
            question: "Was ist Relationship Anarchy?",
            answer:
              "Relationship Anarchy (Beziehungsanarchie) ist ein Ansatz, bei dem jede Beziehung individuell ausgehandelt wird, statt Kategorien wie „Partner*in“ oder „Freund*in“ automatisch bestimmte Rechte, Pflichten oder Prioritäten zuzuschreiben. Romantische Beziehungen stehen nicht per se über Freundschaften; Gemeinschaft, gegenseitige Unterstützung und Freiwilligkeit statt Zwang stehen im Mittelpunkt.",
          },
          {
            question: "Was ist der Unterschied zwischen Polyamorie und Relationship Anarchy?",
            answer:
              "Polyamorie beschreibt das Führen mehrerer romantischer Beziehungen gleichzeitig mit Wissen und Einverständnis aller Beteiligten — oft mit Strukturen wie „primären“ und „sekundären“ Beziehungen. Relationship Anarchy fragt grundsätzlicher, welche Elemente jede einzelne Beziehung haben soll, und lehnt feste Hierarchien zwischen Beziehungsarten ab. Relationship Anarchy bedeutet also nicht zwingend, mehrere Partner*innen zu haben.",
          },
          {
            question: "Was ist einvernehmliche Non-Monogamie (CNM/ENM)?",
            answer:
              "Ein Oberbegriff für alle Beziehungsformen, in denen mehr als eine romantische und/oder sexuelle Verbindung gleichzeitig besteht — mit Wissen und Einverständnis aller Beteiligten. Dazu gehören zum Beispiel Polyamorie, offene Beziehungen, Swinging und Relationship Anarchy.",
          },
          {
            question: "Was ist das Relationship Smörgåsbord?",
            answer:
              "Das Smörgåsbord (schwedisch für „Buffet“) ist eine Liste möglicher Bestandteile von Beziehungen — etwa emotionale Unterstützung, Zusammenwohnen, gemeinsame Finanzen, Sexualität oder öffentliche Darstellung. Statt ein vorgegebenes Komplettpaket zu übernehmen, wählen die Beteiligten bewusst aus, was ihre Beziehung enthalten soll.",
          },
          {
            question: "Was ist die „Relationship Escalator“?",
            answer:
              "Die „Beziehungsrolltreppe“ beschreibt den gesellschaftlich erwarteten Verlauf romantischer Beziehungen: Dating → Exklusivität → Zusammenziehen → Heirat → Kinder. Der Begriff wird meist kritisch verwendet, um zu hinterfragen, ob dieser Standardpfad zu den Bedürfnissen der Beteiligten passt.",
          },
          {
            question: "Wo finde ich etwas zum Thema Eifersucht?",
            answer:
              "In der Bücherliste: „Polysecure“ von Jessica Fern und „The Ethical Slut“ von Janet W. Hardy & Dossie Easton beschäftigen sich beide ausführlich damit. Im Glossar steht außerdem eine Notiz zu Compersion.",
          },
        ],
      },
    ],
  },
  en: {
    title: "FAQ — Frequently asked questions",
    description:
      "Answers to frequently asked questions about nolabels.love, the Relationship Anarchy Smörgåsbord board, and polyamory, relationship anarchy and non-monogamy.",
    eyebrow: "FAQ",
    heading: "Frequently asked questions",
    intro:
      "Short answers to questions about this collection and the terms that come up in it.",
    machineReadableNote: "Machine-readable summary of the whole project:",
    groups: [
      {
        heading: "About nolabels.love",
        entries: [
          {
            question: "What is nolabels.love?",
            answer:
              "nolabels.love is an open, bilingual (German/English) collection of tools, links, books, terms and events around non-monogamy, polyamory and relationship anarchy. It's meant as a free resource list, not as an advice guide.",
          },
          {
            question: "Why does this collection exist?",
            answer:
              "I'm currently spending a lot of time with these topics and was looking for a place to sort what I come across in a structured way. Instead of doing that just for myself, I'm sharing the collection here freely with the community.",
          },
          {
            question: "Who is nolabels.love for?",
            answer:
              "For anyone interested in these topics who finds something useful here — no matter how they live their own relationships.",
          },
          {
            question: "What does the Relationship Anarchy Smörgåsbord board do?",
            answer:
              "The board is an interactive version of the Relationship Anarchy Smörgåsbord (v6). For each relationship, you rate 179 elements across several categories on two separate dimensions: status (fulfilled, mostly yes, mostly no, not fulfilled, unanswered) and desire (wanted, not wanted, unanswered). When the two don't line up, the board flags the element as a discrepancy. Two completed profiles can be compared in a match view.",
          },
          {
            question: "How do I use the board together with another person?",
            answer:
              "Each person fills out their own profile independently and marks it as done. The profiles can then be shared via file or QR code. The match view shows where the assessments line up and where they differ.",
          },
          {
            question: "Is my data stored or sent to a server?",
            answer:
              "No. The board stores everything locally in your browser only (localStorage). There's no account, no server and no tracking. When sharing via QR code, the data lives entirely in the link after the # sign — browsers never send that part to any server. Notes are not included in QR shares.",
          },
          {
            question: "Does it cost anything?",
            answer: "No. The tools and content on nolabels.love are free to use, without registration.",
          },
          {
            question: "What is the board based on, and how is it licensed?",
            answer:
              "Categories and elements are based on the Relationship Anarchy Smörgåsbord (v6) by Lyrica Lawrence & Heather Orr, updated by Maxx Hill, licensed under CC BY-NC-SA 4.0. The German labels follow the German translation by Rachel Cassandra.",
          },
          {
            question: "Is this counseling or therapy?",
            answer:
              "No. nolabels.love is a personal collection of resources, not an advice guide or counseling service. In a crisis, in situations of relationship violence or under heavy psychological strain, professional counseling services or therapists are the right place to turn to.",
          },
          {
            question: "Which languages is the website available in?",
            answer:
              "German and English. Every page exists in both languages, under /de/ and /en/ respectively. The board itself also has its own DE/EN toggle.",
          },
          {
            question: "Is the source code public?",
            answer: "Yes, the source code of the website and the board is public on GitHub at github.com/robinboehm/nolabels.love.",
          },
        ],
      },
      {
        heading: "Concepts & context",
        entries: [
          {
            question: "What is relationship anarchy?",
            answer:
              "Relationship anarchy is an approach where every relationship is negotiated individually, instead of automatically assigning certain rights, duties or priorities based on categories like \"partner\" or \"friend\". Romantic relationships aren't inherently ranked above friendships; community, mutual support and voluntariness instead of coercion are central.",
          },
          {
            question: "What is the difference between polyamory and relationship anarchy?",
            answer:
              "Polyamory means having multiple romantic relationships at the same time with the knowledge and consent of everyone involved — often with structures like \"primary\" and \"secondary\" relationships. Relationship anarchy asks more fundamentally which elements each individual relationship should have, and rejects fixed hierarchies between types of relationships. So relationship anarchy doesn't necessarily mean having multiple partners.",
          },
          {
            question: "What is consensual non-monogamy (CNM/ENM)?",
            answer:
              "An umbrella term for all relationship forms in which more than one romantic and/or sexual connection exists at the same time — with the knowledge and consent of everyone involved. Examples include polyamory, open relationships, swinging and relationship anarchy.",
          },
          {
            question: "What is the Relationship Smörgåsbord?",
            answer:
              "The smörgåsbord (Swedish for \"buffet\") is a list of possible components of relationships — such as emotional support, living together, shared finances, sexuality or public presentation. Instead of adopting a pre-set package deal, the people involved deliberately choose what their relationship should include.",
          },
          {
            question: "What is the \"relationship escalator\"?",
            answer:
              "The relationship escalator describes the socially expected course of romantic relationships: dating → exclusivity → moving in together → marriage → kids. The term is usually used critically, to question whether this default path actually fits the needs of the people involved.",
          },
          {
            question: "Where can I find something on jealousy?",
            answer:
              "In the book list: \"Polysecure\" by Jessica Fern and \"The Ethical Slut\" by Janet W. Hardy & Dossie Easton both cover it in depth. The glossary also has a note on compersion.",
          },
        ],
      },
    ],
  },
};
