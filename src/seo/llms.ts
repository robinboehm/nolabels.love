import { LOCALES, type Locale } from "../i18n/locales";
import { HOME_CONTENT } from "../i18n/content/home";
import { TOOLS_CONTENT } from "../i18n/content/tools";
import { BOARD_CONTENT } from "../i18n/content/board";
import { RESSOURCEN_CONTENT } from "../i18n/content/ressourcen";
import { BUECHER_CONTENT } from "../i18n/content/buecher";
import { GLOSSAR_CONTENT } from "../i18n/content/glossar";
import { EVENTS_CONTENT } from "../i18n/content/events";
import { COACHING_CONTENT } from "../i18n/content/coaching";
import { FAQ_CONTENT } from "../i18n/content/faq";
import { BOARD_APP_PATH, REPO_URL, SITE_URL, absoluteUrl } from "./site";

interface PageSummary {
  path: string;
  title: string;
  description: string;
}

function pageUrl(locale: Locale, path: string): string {
  return absoluteUrl(`/${locale}${path === "/" ? "/" : `${path}/`}`);
}

function pageSummaries(locale: Locale): PageSummary[] {
  return [
    { path: "/", title: HOME_CONTENT[locale].title, description: HOME_CONTENT[locale].intro },
    { path: "/faq", title: FAQ_CONTENT[locale].title, description: FAQ_CONTENT[locale].description },
    { path: "/tools", title: TOOLS_CONTENT[locale].title, description: TOOLS_CONTENT[locale].description },
    { path: "/tools/board", title: BOARD_CONTENT[locale].title, description: BOARD_CONTENT[locale].description },
    { path: "/ressourcen", title: RESSOURCEN_CONTENT[locale].title, description: RESSOURCEN_CONTENT[locale].description },
    { path: "/buecher", title: BUECHER_CONTENT[locale].title, description: BUECHER_CONTENT[locale].description },
    { path: "/glossar", title: GLOSSAR_CONTENT[locale].title, description: GLOSSAR_CONTENT[locale].description },
    { path: "/events", title: EVENTS_CONTENT[locale].title, description: EVENTS_CONTENT[locale].description },
    { path: "/coaching", title: COACHING_CONTENT[locale].title, description: COACHING_CONTENT[locale].description },
  ];
}

const SUMMARY =
  "nolabels.love is a personal, openly shared collection (German/English) of tools, links, books, glossary notes and events around non-monogamy, polyamory and relationship anarchy. The author sorts what they are currently exploring and makes it freely available to the community — a resource list, not an advice guide or counseling service.";

const KEY_FACTS = [
  "Every page exists in German (/de/, default) and English (/en/); `/` redirects to `/de/`.",
  `Main tool: an interactive Relationship Anarchy Smörgåsbord board (${absoluteUrl(BOARD_APP_PATH)}). Users rate 179 relationship elements per person on two separate dimensions — status and desire — compare two people in a match view, and share profiles via file or QR code.`,
  "Privacy: the board runs entirely in the browser (localStorage). No account, no server-side storage, no tracking. QR shares put the data in the URL fragment (after #), which browsers never send to a server.",
  "The board is based on the Relationship Anarchy Smörgåsbord (v6) by Lyrica Lawrence & Heather Orr, updated by Maxx Hill, licensed CC BY-NC-SA 4.0; German labels follow the translation by Rachel Cassandra.",
  "All tools and content are free to use, without registration.",
  `Source code is public: ${REPO_URL}`,
];

export function buildLlmsTxt(): string {
  const lines: string[] = [
    "# nolabels.love",
    "",
    `> ${SUMMARY}`,
    "",
    ...KEY_FACTS.map((fact) => `- ${fact}`),
    "",
  ];

  const sectionTitle: Record<Locale, string> = { en: "Pages (English)", de: "Seiten (Deutsch)" };
  for (const locale of ["en", "de"] as Locale[]) {
    lines.push(`## ${sectionTitle[locale]}`, "");
    for (const page of pageSummaries(locale)) {
      lines.push(`- [${page.title}](${pageUrl(locale, page.path)}): ${page.description}`);
    }
    lines.push("");
  }

  lines.push(
    "## Optional",
    "",
    `- [Full content as plain text](${SITE_URL}/llms-full.txt): every page's content (FAQ, glossary, books, resources, tools) in English and German`,
    `- [Board app](${absoluteUrl(BOARD_APP_PATH)}): the interactive tool itself (client-side app, its own DE/EN toggle)`,
    `- [Sitemap](${SITE_URL}/sitemap-index.xml)`,
    `- [Source code](${REPO_URL})`,
    "",
  );

  return lines.join("\n");
}

function localeSection(locale: Locale): string[] {
  const lines: string[] = [];
  const heading = locale === "en" ? "English" : "Deutsch";
  const home = HOME_CONTENT[locale];
  lines.push(`# ${heading}`, "", `Source: ${pageUrl(locale, "/")}`, "", home.intro, "");

  const faq = FAQ_CONTENT[locale];
  lines.push(`## ${faq.title}`, "", `Source: ${pageUrl(locale, "/faq")}`, "");
  for (const group of faq.groups) {
    lines.push(`### ${group.heading}`, "");
    for (const entry of group.entries) {
      lines.push(`**${entry.question}**`, "", entry.answer, "");
    }
  }

  const board = BOARD_CONTENT[locale];
  lines.push(`## ${board.title}`, "", `Source: ${pageUrl(locale, "/tools/board")}`, `App: ${absoluteUrl(BOARD_APP_PATH)}`, "", board.intro, "");
  for (const card of board.cards) {
    lines.push(`- **${card.title}:** ${card.body}`);
  }
  lines.push("");

  const glossar = GLOSSAR_CONTENT[locale];
  lines.push(`## ${glossar.title}`, "", `Source: ${pageUrl(locale, "/glossar")}`, "");
  for (const term of glossar.terms) {
    lines.push(`- **${term.term}:** ${term.definition}`);
  }
  lines.push("");

  const buecher = BUECHER_CONTENT[locale];
  lines.push(`## ${buecher.title}`, "", `Source: ${pageUrl(locale, "/buecher")}`, "");
  for (const book of buecher.books) {
    lines.push(`- **${book.title}** (${book.author}): ${book.summary}`);
  }
  lines.push("");

  const ressourcen = RESSOURCEN_CONTENT[locale];
  lines.push(`## ${ressourcen.title}`, "", `Source: ${pageUrl(locale, "/ressourcen")}`, "");
  for (const resource of ressourcen.resources) {
    lines.push(`- [${resource.title}](${resource.href}) — ${resource.source}: ${resource.description}`);
  }
  lines.push("");

  const events = EVENTS_CONTENT[locale];
  lines.push(`## ${events.title}`, "", `Source: ${pageUrl(locale, "/events")}`, "", events.intro, "");
  if (events.events.length === 0) {
    lines.push(events.comingSoonBody, "");
  }
  for (const event of events.events) {
    const links = [
      event.websiteUrl && `${events.websiteLabel}: ${event.websiteUrl}`,
      event.telegramUrl && `${events.telegramLabel}: ${event.telegramUrl}`,
    ].filter(Boolean);
    lines.push(`- **${event.name}** (${event.type}): ${event.description}${links.length ? ` (${links.join(", ")})` : ""}`);
  }
  if (events.events.length) lines.push("");

  const coaching = COACHING_CONTENT[locale];
  lines.push(`## ${coaching.title}`, "", `Source: ${pageUrl(locale, "/coaching")}`, "", coaching.intro, "");

  return lines;
}

export function buildLlmsFullTxt(): string {
  const lines: string[] = [
    "# nolabels.love — full content",
    "",
    `> ${SUMMARY}`,
    "",
    ...KEY_FACTS.map((fact) => `- ${fact}`),
    "",
  ];
  for (const locale of ["en", ...LOCALES.filter((l) => l !== "en")] as Locale[]) {
    lines.push(...localeSection(locale));
  }
  return lines.join("\n");
}
