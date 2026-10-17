import type { Locale } from "../i18n/locales";
import type { FaqGroup } from "../i18n/content/faq";
import type { GlossaryTerm } from "../i18n/content/glossar";
import type { BookEntry } from "../i18n/content/buecher";
import { BOARD_APP_PATH, SITE_NAME, SITE_URL, absoluteUrl } from "./site";

export type JsonLdNode = Record<string, unknown>;

export const WEBSITE_ID = `${SITE_URL}/#website`;

export function websiteNode(description: string): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: "nolabels.love",
    description,
    inLanguage: ["de", "en"],
  };
}

export function webPageNode(url: string, name: string, description: string, locale: Locale): JsonLdNode {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function faqPageNode(url: string, groups: FaqGroup[], locale: Locale): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: locale,
    mainEntity: groups.flatMap((group) =>
      group.entries.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: { "@type": "Answer", text: entry.answer },
      })),
    ),
  };
}

export function glossaryAnchor(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function definedTermSetNode(url: string, name: string, terms: GlossaryTerm[], locale: Locale): JsonLdNode {
  return {
    "@type": "DefinedTermSet",
    "@id": `${url}#terms`,
    url,
    name,
    inLanguage: locale,
    hasDefinedTerm: terms.map((entry) => ({
      "@type": "DefinedTerm",
      name: entry.term,
      description: entry.definition,
      url: `${url}#${glossaryAnchor(entry.term)}`,
    })),
  };
}

export function bookListNode(url: string, name: string, books: BookEntry[]): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${url}#books`,
    name,
    itemListElement: books.map((book, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Book",
        name: book.subtitle ? `${book.title}: ${book.subtitle}` : book.title,
        author: book.author.split(/\s*&\s*/).map((author) => ({ "@type": "Person", name: author })),
        description: book.summary,
        inLanguage: book.language,
        image: absoluteUrl(book.cover),
        ...(book.isbn && { isbn: book.isbn.replace(/-/g, "") }),
        ...(book.publisher && { publisher: { "@type": "Organization", name: book.publisher } }),
      },
    })),
  };
}

export function linkListNode(url: string, name: string, links: { name: string; url: string; description: string }[]): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${url}#list`,
    name,
    itemListElement: links.map((link, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "WebPage", name: link.name, url: link.url, description: link.description },
    })),
  };
}

export function boardAppNode(name: string, description: string): JsonLdNode {
  return {
    "@type": "WebApplication",
    "@id": `${SITE_URL}${BOARD_APP_PATH}#app`,
    name,
    description,
    url: absoluteUrl(BOARD_APP_PATH),
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any (web browser)",
    inLanguage: ["de", "en"],
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    license: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  };
}
