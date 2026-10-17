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
      "Parties, Meetups und Events rund um Non-Monogamie, Polyamorie und bewusste Begegnung, die ich kenne oder von denen ich gehört habe — von regelmäßigen Treffen bis zu Formaten wie Temple Nights. Jeweils mit kurzer Beschreibung und, wo vorhanden, Telegram-Gruppe und Webseite.",
    events: [],
    comingSoonTitle: "Im Aufbau",
    comingSoonBody: "Die ersten Einträge sortiere ich gerade.",
    telegramLabel: "Telegram",
    websiteLabel: "Webseite",
  },
  en: {
    title: "Events & Meetups",
    description: "Parties, meetups and events like Temple Nights — including Telegram groups and websites.",
    eyebrow: "Events & Meetups",
    heading: "Parties, meetups & more",
    intro:
      "Parties, meetups and events around non-monogamy, polyamory and conscious connection that I know of or have heard about — from regular get-togethers to formats like Temple Nights. Each with a short description plus, where available, its Telegram group and website.",
    events: [],
    comingSoonTitle: "In progress",
    comingSoonBody: "I'm sorting the first entries right now.",
    telegramLabel: "Telegram",
    websiteLabel: "Website",
  },
};
