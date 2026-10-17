import type { Locale } from "../locales";

export interface CoachingContent {
  title: string;
  description: string;
  badge: string;
  heading: string;
  intro: string;
  backCta: string;
}

export const COACHING_CONTENT: Record<Locale, CoachingContent> = {
  de: {
    title: "Coachings & Kurse",
    description: "Begleitung und Formate für alle, die ihre Beziehungen bewusster gestalten wollen — in Vorbereitung.",
    badge: "Bald verfügbar",
    heading: "Coachings & Kurse",
    intro:
      "Hier entstehen Begleitformate für alle, die ihre Beziehungen bewusster gestalten wollen — ob allein, zu zweit oder im größeren Netzwerk. Noch in Vorbereitung.",
    backCta: "← In der Zwischenzeit: Tools entdecken",
  },
  en: {
    title: "Coaching & Courses",
    description: "Guidance and formats for anyone who wants to shape their relationships more deliberately — coming soon.",
    badge: "Coming soon",
    heading: "Coaching & Courses",
    intro:
      "Guided formats are being developed here for anyone who wants to shape their relationships more deliberately — alone, as a couple, or within a wider network. Still in preparation.",
    backCta: "← In the meantime: explore the tools",
  },
};
