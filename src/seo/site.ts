import type { Locale } from "../i18n/locales";

export const SITE_URL = "https://nolabels.love";
export const SITE_NAME = "no labels.";
export const REPO_URL = "https://github.com/robinboehm/nolabels.love";
export const BOARD_APP_PATH = "/tools/board/app/";

export const OG_IMAGE = { path: "/og.png", width: 1200, height: 630 };

export const OG_LOCALE: Record<Locale, string> = {
  de: "de_DE",
  en: "en_US",
};

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Turns "/tools/board" into "tools/board" for getRelativeLocaleUrl/getAbsoluteLocaleUrl. */
export function localePathArg(path: string): string {
  return path.replace(/^\/+/, "");
}
