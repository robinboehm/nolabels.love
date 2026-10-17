import type { Locale } from "./locales";

export const UI = {
  de: {
    comingSoonBadge: "bald",
    langSwitchAriaLabel: "Sprache wechseln",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    footerTagline:
      "Eine offene Sammlung zu Non-Monogamie, Polyamorie und Relationship Anarchy — frei zum Stöbern und Weitergeben.",
    footerBoardLicensePrefix: "Das Board basiert auf dem Relationship Anarchy Smörgåsbord (v6), lizenziert unter",
  },
  en: {
    comingSoonBadge: "soon",
    langSwitchAriaLabel: "Switch language",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    footerTagline:
      "An open collection on non-monogamy, polyamory and relationship anarchy — free to browse and pass on.",
    footerBoardLicensePrefix: "The Board is based on the Relationship Anarchy Smörgåsbord (v6), licensed under",
  },
} satisfies Record<Locale, Record<string, string>>;
