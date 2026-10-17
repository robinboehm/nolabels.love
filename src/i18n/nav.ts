import type { Locale } from "./locales";

export interface NavItem {
  /** Locale-independent path, e.g. "/tools". Combine with getRelativeLocaleUrl(locale, path). */
  path: string;
  label: string;
  comingSoon?: boolean;
}

export const NAV_ITEMS: Record<Locale, NavItem[]> = {
  de: [
    { path: "/", label: "Start" },
    { path: "/tools", label: "Tools" },
    { path: "/ressourcen", label: "Ressourcen" },
    { path: "/glossar", label: "Glossar" },
    { path: "/coaching", label: "Coachings & Kurse", comingSoon: true },
  ],
  en: [
    { path: "/", label: "Home" },
    { path: "/tools", label: "Tools" },
    { path: "/ressourcen", label: "Resources" },
    { path: "/glossar", label: "Glossary" },
    { path: "/coaching", label: "Coaching & Courses", comingSoon: true },
  ],
};
