import type { Locale } from "./locales";

export const UI = {
  de: {
    comingSoonBadge: "bald",
    langSwitchAriaLabel: "Sprache wechseln",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    footerTagline:
      "Ressourcen und Tools für Beziehungen jenseits vorgegebener Schablonen — mit Schwerpunkt auf Non-Monogamie, Polyamorie und Relationship Anarchy.",
    footerBoardLicensePrefix: "Das Board basiert auf dem Relationship Anarchy Smörgåsbord (v6), lizenziert unter",
  },
  en: {
    comingSoonBadge: "soon",
    langSwitchAriaLabel: "Switch language",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    footerTagline:
      "Resources and tools for relationships beyond pre-set templates — with a focus on non-monogamy, polyamory and relationship anarchy.",
    footerBoardLicensePrefix: "The Board is based on the Relationship Anarchy Smörgåsbord (v6), licensed under",
  },
} satisfies Record<Locale, Record<string, string>>;
