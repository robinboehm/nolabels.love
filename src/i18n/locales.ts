export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";

export function otherLocale(locale: Locale): Locale {
  return locale === "de" ? "en" : "de";
}
