import type { Locale } from "../locales";

export interface EventEntry {
  name: string;
  /** Short category badge, e.g. "Party", "Meetup", "Ritual / Workshop". */
  type: string;
  description: string;
  telegramUrl?: string;
  websiteUrl?: string;
}

export interface EventsContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  events: EventEntry[];
  comingSoonTitle: string;
  comingSoonBody: string;
  telegramLabel: string;
  websiteLabel: string;
}

export const EVENTS_CONTENT: Record<Locale, EventsContent> = {
  de: {
    title: "Events & Meetups",
    description: "Parties, Meetups und Events wie Temple Nights — inklusive Telegram-Gruppen und Webseiten.",
    eyebrow: "Events & Meetups",
    heading: "Parties, Meetups & Co.",
    intro:
      "Eine wachsende Übersicht über Parties, Meetups und Events rund um Non-Monogamie, Polyamorie und bewusste Begegnung — von regelmäßigen Treffen bis zu Formaten wie Temple Nights. Zu jedem Eintrag gibt es eine kurze Einordnung sowie, wo vorhanden, Links zu Telegram-Gruppe und Webseite.",
    events: [],
    comingSoonTitle: "Im Aufbau",
    comingSoonBody: "Hier entsteht gerade eine Liste konkreter Parties, Meetups und Events.",
    telegramLabel: "Telegram",
    websiteLabel: "Webseite",
  },
  en: {
    title: "Events & Meetups",
    description: "Parties, meetups and events like Temple Nights — including Telegram groups and websites.",
    eyebrow: "Events & Meetups",
    heading: "Parties, meetups & more",
    intro:
      "A growing overview of parties, meetups and events around non-monogamy, polyamory and conscious connection — from regular get-togethers to formats like Temple Nights. Every entry gets a short explainer plus, where available, links to its Telegram group and website.",
    events: [],
    comingSoonTitle: "In progress",
    comingSoonBody: "A list of concrete parties, meetups and events is being put together here.",
    telegramLabel: "Telegram",
    websiteLabel: "Website",
  },
};
