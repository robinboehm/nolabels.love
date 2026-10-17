import type { Locale } from "../locales";

export type BookLanguage = "de" | "en";

interface BookMeta {
  title: string;
  subtitle?: string;
  author: string;
  publisher?: string;
  isbn?: string;
  language: BookLanguage;
  /** Path below `public/`, e.g. `/books/polysecure.webp`. */
  cover: string;
}

export interface BookEntry extends BookMeta {
  summary: string;
}

export interface BuecherContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  books: BookEntry[];
  languageLabels: Record<BookLanguage, string>;
  coverAlt: string;
  comingSoonTitle: string;
  comingSoonBody: string;
}

const BOOKS = {
  ethicalSlut: {
    title: "The Ethical Slut",
    subtitle: "A Practical Guide to Polyamory, Open Relationships, and Other Freedoms in Sex and Love",
    author: "Janet W. Hardy & Dossie Easton",
    publisher: "Ten Speed Press",
    isbn: "978-0-399-57966-0",
    language: "en",
    cover: "/books/ethical-slut.webp",
  },
  polysecure: {
    title: "Polysecure",
    subtitle: "Bindung, Trauma und konsensuelle Nicht-Monogamie",
    author: "Jessica Fern",
    publisher: "divana Verlag",
    isbn: "978-3-910590-02-1",
    language: "de",
    cover: "/books/polysecure.webp",
  },
  moreThanTwo: {
    title: "More Than Two",
    subtitle: "A Practical Guide to Ethical Polyamory",
    author: "Franklin Veaux & Eve Rickert",
    publisher: "Thorntree Press",
    language: "en",
    cover: "/books/more-than-two.webp",
  },
  openingUp: {
    title: "Opening Up",
    subtitle: "A Guide to Creating and Sustaining Open Relationships",
    author: "Tristan Taormino",
    publisher: "Cleis Press",
    language: "en",
    cover: "/books/opening-up.webp",
  },
  hundredElevenReasons: {
    title: "111 Gründe, offen zu lieben",
    subtitle: "Ein Loblied auf offene Beziehungen, Polyamorie und die Freundschaft",
    author: "Cornelia Jönsson & Simone Maresch",
    publisher: "Schwarzkopf & Schwarzkopf",
    isbn: "978-3-86265-712-4",
    language: "de",
    cover: "/books/111-gruende.webp",
  },
  sexualPassion: {
    title: "Die Psychologie sexueller Leidenschaft",
    author: "David Schnarch",
    publisher: "Klett-Cotta",
    isbn: "978-3-608-96109-6",
    language: "de",
    cover: "/books/psychologie-sexueller-leidenschaft.webp",
  },
  nonviolentCommunication: {
    title: "Gewaltfreie Kommunikation",
    subtitle: "Eine Sprache des Lebens",
    author: "Marshall B. Rosenberg",
    publisher: "Junfermann Verlag",
    isbn: "978-3-95571-572-4",
    language: "de",
    cover: "/books/gewaltfreie-kommunikation.webp",
  },
  smartGirlsGuide: {
    title: "The Smart Girl's Guide to Polyamory",
    subtitle: "Everything You Need to Know About Open Relationships, Non-Monogamy, and Alternative Love",
    author: "Dedeker Winston",
    publisher: "Skyhorse",
    language: "en",
    cover: "/books/smart-girls-guide.webp",
  },
  lovesNotColorBlind: {
    title: "Love's Not Color Blind",
    subtitle: "Race and Representation in Polyamorous and Other Alternative Communities",
    author: "Kevin A. Patterson",
    publisher: "Thorntree Press",
    language: "en",
    cover: "/books/loves-not-color-blind.webp",
  },
} satisfies Record<string, BookMeta>;

function book(id: keyof typeof BOOKS, summary: string): BookEntry {
  return { ...BOOKS[id], summary };
}

export const BUECHER_CONTENT: Record<Locale, BuecherContent> = {
  de: {
    title: "Bücher",
    description: "Bücher zu Non-Monogamie, Polyamorie und Relationship Anarchy — jeweils mit Cover und einer kurzen Notiz, worum es geht.",
    eyebrow: "Bücher",
    heading: "Bücher",
    intro:
      "Bücher aus dem Themenfeld, die auf meiner Liste stehen — jeweils mit einer kurzen Notiz, worum es darin geht. Keine Rezensionen, eher eine Leseliste. Wo vorhanden, steht die ISBN dabei; damit lässt sich jedes Buch in jeder Buchhandlung finden.",
    books: [
      book(
        "ethicalSlut",
        "Eines der meistzitierten Bücher der modernen Polyamorie-Bewegung, hier in der überarbeiteten dritten Auflage. Ein praktischer Leitfaden zu Eifersucht, Kommunikation und einvernehmlicher Non-Monogamie. Auf Deutsch als „Schlampen mit Moral“ erschienen.",
      ),
      book(
        "polysecure",
        "Jessica Fern überträgt die Bindungstheorie auf konsensuelle Nicht-Monogamie: wie Bindungsmuster, Trauma, Eifersucht und Unsicherheit in Beziehungen mit mehr als einer Person zusammenspielen — und was sichere Bindung dort heißen kann. Deutsche Ausgabe des englischen Originals.",
      ),
      book(
        "moreThanTwo",
        "Ein umfangreicher Leitfaden zu verschiedenen Polyamorie-Strukturen, Ethik und typischen Fallstricken — inklusive einer Auseinandersetzung mit Hierarchien und „Regeln über Dritte“.",
      ),
      book(
        "openingUp",
        "Auf Interviews mit vielen nicht-monogam lebenden Menschen gestützter Überblick über ganz unterschiedliche offene Beziehungsmodelle — von Swinging bis Polyamorie — ohne ein Modell als „das richtige“ zu bewerben.",
      ),
      book(
        "hundredElevenReasons",
        "Ein Loblied auf offene Beziehungen, Polyamorie und Freundschaft in 111 kurzen Kapiteln. Erzählt wird entlang eines fiktiven Beziehungsnetzes — Florian, Annika, Margit, Johannes, Cem und andere —, „frei erfunden und auf realen Ereignissen beruhend“. Leicht zu lesen, eher Alltagsgeschichten als Theorie.",
      ),
      book(
        "sexualPassion",
        "Der Paar- und Sexualtherapeut David Schnarch über Lust und Nähe in langen Beziehungen. Zentral ist die Idee der Differenzierung: in enger Verbindung bei sich selbst zu bleiben, statt sich über die Bestätigung des Gegenübers zu definieren. Mit Blick auf Paare geschrieben, für mich aber spannend, weil es um Autonomie in Nähe geht. Englischer Originaltitel: „Passionate Marriage“.",
      ),
      book(
        "nonviolentCommunication",
        "Das Grundlagenbuch zur Gewaltfreien Kommunikation. Rosenberg beschreibt vier Schritte — Beobachtung, Gefühl, Bedürfnis, Bitte — und eine Haltung, die auf Empathie statt auf Bewertung setzt. Für mich eine hilfreiche Sprache, um Wünsche und Grenzen auszudrücken, gerade in Beziehungen ohne vorgegebenes Skript.",
      ),
      book(
        "smartGirlsGuide",
        "Ein Einstieg in Polyamorie von der Mitgründerin des Multiamory-Podcasts, mit vielen praktischen Beispielen.",
      ),
      book("lovesNotColorBlind", "Beschäftigt sich mit Rassismus, Diversität und Ausgrenzung innerhalb nicht-monogamer Communitys."),
    ],
    languageLabels: { de: "Deutsch", en: "Englisch" },
    coverAlt: "Buchcover",
    comingSoonTitle: "Wächst",
    comingSoonBody: "Die Liste wächst mit dem, was ich lese.",
  },
  en: {
    title: "Books",
    description: "Books on non-monogamy, polyamory and relationship anarchy — each with its cover and a short note on what it's about.",
    eyebrow: "Books",
    heading: "Books",
    intro:
      "Books from the field that are on my list — each with a short note on what it's about. Not reviews, more of a reading list. Where available, the ISBN is listed so you can find each book at any bookshop.",
    books: [
      book(
        "ethicalSlut",
        "One of the most widely cited books of the modern polyamory movement, here in the revised third edition. A practical guide to jealousy, communication and consensual non-monogamy. Also available in German as \"Schlampen mit Moral\".",
      ),
      book(
        "polysecure",
        "Jessica Fern extends attachment theory to consensual non-monogamy: how attachment patterns, trauma, jealousy and insecurity play together in relationships with more than one person — and what secure attachment can mean there. Listed here in the German edition; the English original is \"Polysecure: Attachment, Trauma and Consensual Nonmonogamy\".",
      ),
      book(
        "moreThanTwo",
        "A comprehensive guide to different polyamory structures, ethics and common pitfalls — including a look at hierarchies and \"rules about other people\".",
      ),
      book(
        "openingUp",
        "An interview-based overview of many different open relationship models — from swinging to polyamory — without promoting any single structure as \"the right one\".",
      ),
      book(
        "hundredElevenReasons",
        "\"111 reasons to love openly\": a celebration of open relationships, polyamory and friendship in 111 short chapters. It's told through a fictional relationship network — Florian, Annika, Margit, Johannes, Cem and others — \"entirely made up and based on real events\". An easy read, more everyday stories than theory.",
      ),
      book(
        "sexualPassion",
        "Couples and sex therapist David Schnarch on desire and intimacy in long-term relationships. The central idea is differentiation: staying yourself in close connection rather than defining yourself through your partner's validation. Written with couples in mind, but interesting to me because it's about autonomy within closeness. German edition of \"Passionate Marriage\".",
      ),
      book(
        "nonviolentCommunication",
        "The foundational book on Nonviolent Communication (NVC). Rosenberg describes four steps — observation, feeling, need, request — and an attitude grounded in empathy rather than judgement. A helpful language for me when it comes to expressing wishes and boundaries, especially in relationships without a given script. German edition of \"Nonviolent Communication: A Language of Life\".",
      ),
      book(
        "smartGirlsGuide",
        "An introduction to polyamory from the co-host of the Multiamory podcast, with lots of practical examples.",
      ),
      book("lovesNotColorBlind", "Deals with race, diversity and exclusion within non-monogamous communities."),
    ],
    languageLabels: { de: "German", en: "English" },
    coverAlt: "Book cover",
    comingSoonTitle: "Growing",
    comingSoonBody: "The list grows with what I read.",
  },
};
