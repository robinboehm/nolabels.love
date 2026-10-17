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
    description: "Eine Idee für später: Formate zum gemeinsamen Austausch und zur Begleitung rund um Beziehungen jenseits von Labels.",
    badge: "Idee für später",
    heading: "Coachings & Kurse",
    intro:
      "Irgendwann sollen hier Formate zum gemeinsamen Austausch und zur Begleitung entstehen — allein, zu zweit oder im größeren Netzwerk. Bisher ist das nur eine Idee, noch nichts Konkretes.",
    backCta: "← Bis dahin: zu den Tools",
  },
  en: {
    title: "Coaching & Courses",
    description: "An idea for later: formats for sharing experiences and accompanying each other around relationships beyond labels.",
    badge: "Idea for later",
    heading: "Coaching & Courses",
    intro:
      "At some point this is meant to host formats for sharing experiences and accompanying each other — alone, as a couple or within a wider network. For now it's just an idea, nothing concrete yet.",
    backCta: "← Until then: go to the tools",
  },
};
