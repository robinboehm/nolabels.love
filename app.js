/**
 * Relationship Anarchy Smörgåsbord — app logic.
 *
 * Everything runs client-side, no build step, no network requests.
 * All data lives in localStorage under STORAGE_KEY.
 */

const STORAGE_KEY = 'ra-smorgasbord-data-v1';
const LANG_STORAGE_KEY = 'ra-smorgasbord-lang';

const STATUS = {
  UNANSWERED: 'unanswered',
  UNFULFILLED: 'unfulfilled',
  PARTIAL_NO: 'partial-no',
  PARTIAL_YES: 'partial-yes',
  FULFILLED: 'fulfilled',
};

const STATUS_LABELS = {
  [STATUS.UNANSWERED]: { de: 'unbeantwortet', en: 'unanswered' },
  [STATUS.UNFULFILLED]: { de: 'nicht erfüllt', en: 'not fulfilled' },
  [STATUS.PARTIAL_NO]: { de: 'eher nicht', en: 'leaning no' },
  [STATUS.PARTIAL_YES]: { de: 'eher ja', en: 'leaning yes' },
  [STATUS.FULFILLED]: { de: 'erfüllt', en: 'fulfilled' },
};

function statusLabel(status) {
  return (STATUS_LABELS[status] || STATUS_LABELS[STATUS.UNANSWERED])[currentLang];
}

// The two middle statuses ("eher nicht" / "eher ja") are a finer-grained
// split of what used to be a single "teilweise" state. They're still
// treated as one bucket for coloring/aggregation (both render as the
// "partial" amber tone) — this just checks membership in that bucket.
function isPartialStatus(status) {
  return status === STATUS.PARTIAL_NO || status === STATUS.PARTIAL_YES;
}

// Backwards-compat: boards saved before this split used a single literal
// 'partial' status value. Map it onto 'partial-yes' (closer to the old
// "counts for something" framing) so old data doesn't silently collapse
// into "unbeantwortet".
function migratePerson(person) {
  Object.values(person.items || {}).forEach((entry) => {
    if (entry && entry.status === 'partial') entry.status = STATUS.PARTIAL_YES;
  });
  // Data saved before versioning existed has no dataVersion at all — tag it
  // so it's obvious (in localStorage/exports) that it predates this scheme,
  // rather than silently looking like it was created by the current version.
  if (!person.dataVersion) person.dataVersion = 'pre-versioning';
  return person;
}

// Items without an explicit entry (or with this status) count as "not yet
// discussed" rather than being lumped in with an active "nicht erfüllt"
// decision.
const DEFAULT_STATUS = STATUS.UNANSWERED;

// Second, independent dimension: whether an item is something you actually
// want, separate from whether it currently happens. E.g. "nicht gewünscht"
// + "nicht erfüllt" is a good match, not a gap.
const DESIRE = {
  UNANSWERED: 'unanswered',
  WANTED: 'wanted',
  UNWANTED: 'unwanted',
};

const DESIRE_LABELS = {
  [DESIRE.UNANSWERED]: { de: 'unbeantwortet', en: 'unanswered' },
  [DESIRE.WANTED]: { de: 'gewünscht', en: 'wanted' },
  [DESIRE.UNWANTED]: { de: 'nicht gewünscht', en: 'not wanted' },
};

function desireLabel(desire) {
  return (DESIRE_LABELS[desire] || DESIRE_LABELS[DESIRE.UNANSWERED])[currentLang];
}

const DEFAULT_DESIRE = DESIRE.UNANSWERED;

// ---------------------------------------------------------------------
// Language / i18n
// ---------------------------------------------------------------------

// Defaults to German since that's how this app has always worked; once a
// user picks a language it's remembered (it's a device/UI preference, not
// relationship data, so it's intentionally kept out of export/import).
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) === 'en' ? 'en' : 'de';

// Every piece of static/chrome UI text, in both languages. Category and
// item content itself lives in data.js (title/titleDe, label/labelDe).
const STRINGS = {
  personSrLabel: { de: 'Person', en: 'Person' },
  btnAddPersonTitle: { de: 'Person hinzufügen', en: 'Add person' },
  btnRenamePersonTitle: { de: 'Person umbenennen', en: 'Rename person' },
  btnDeletePersonTitle: { de: 'Person löschen', en: 'Delete person' },
  btnToggleDoneTitle: {
    de: 'Markiert diese Person als fertig mit dem Ausfüllen, damit sie im Match-Vergleich berücksichtigt wird',
    en: "Marks this person as done filling out their board so they're included in the match comparison",
  },
  btnToggleDoneLabel: { de: 'Als fertig markieren', en: 'Mark as done' },
  btnToggleDoneLabelActive: { de: '↩ Bearbeitung fortsetzen', en: '↩ Resume editing' },
  btnExportPersonLabel: { de: 'Person teilen', en: 'Share person' },
  btnExportPersonTitle: {
    de: 'Nur die aktuell ausgewählte Person als Datei exportieren, zum Teilen mit der Partnerin/dem Partner',
    en: 'Export only the currently selected person as a file, to share with your partner',
  },
  btnImportPersonLabel: { de: 'Person importieren', en: 'Import person' },
  btnImportPersonTitle: {
    de: 'Eine geteilte Person-Datei importieren, ohne die anderen Personen zu überschreiben',
    en: 'Import a shared person file without overwriting the other people',
  },
  btnExportLabel: { de: 'Alles exportieren', en: 'Export all' },
  btnExportTitle: { de: 'Alle Personen als vollständiges Backup exportieren', en: 'Export all people as a full backup' },
  btnImportLabel: { de: 'Alles importieren', en: 'Import all' },
  btnImportTitle: {
    de: 'Vollständiges Backup laden (ersetzt alle aktuellen Daten)',
    en: 'Load a full backup (replaces all current data)',
  },

  tabsAriaLabel: { de: 'Ansicht', en: 'View' },
  tabBoard: { de: 'Board', en: 'Board' },
  tabOverview: { de: 'Übersicht', en: 'Overview' },
  tabMatch: { de: 'Match', en: 'Match' },
  langToggleAriaLabel: { de: 'Sprache', en: 'Language' },

  legendFulfilled: { de: 'erfüllt', en: 'fulfilled' },
  legendPartial: { de: 'teilweise', en: 'partial' },
  legendUnfulfilled: { de: 'nicht erfüllt', en: 'not fulfilled' },
  legendUnanswered: { de: 'unbeantwortet', en: 'unanswered' },
  legendAlignLabel: { de: 'Übereinstimmung (Hub-Außenring):', en: 'Alignment (hub outer ring):' },
  legendAlignGood: { de: 'passt zusammen', en: 'matches' },
  legendAlignPartial: { de: 'teilweise', en: 'partial' },
  legendAlignBad: { de: 'Diskrepanz', en: 'mismatch' },
  legendAlignUnrated: { de: 'unbewertet', en: 'unrated' },

  boardHint: {
    de: 'Klicke auf eine Kategorie, um die Elemente zu bewerten. Die Kategorien sind lose sortiert: außen eher gesellschaftlich/strukturell, innen eher persönlich/intim — ganz wie im Original-Smörgåsbord. Pro Element gibst du sowohl den <strong>Status</strong> (erfüllt/teilweise/nicht erfüllt/unbeantwortet) als auch den <strong>Wunsch</strong> (gewünscht/nicht gewünscht) an — ⚠ markiert Punkte, bei denen beides nicht zusammenpasst und die sich zu besprechen lohnen. Die große Zahl in der Mitte zeigt, wie gut Wunsch &amp; Status bei den bereits bewerteten Punkten übereinstimmen (Außenring) — nicht einfach, wie viel erfüllt ist (das steht klein darunter, Innenring).',
    en: "Click on a category to rate its items. Categories are loosely sorted: more societal/structural ones toward the outside, more personal/intimate ones toward the center — just like in the original Smörgåsbord. For each item you note both the <strong>status</strong> (fulfilled/partial/not fulfilled/unanswered) and the <strong>desire</strong> (wanted/not wanted) — ⚠ flags items where the two don't match and that are worth discussing. The big number in the middle shows how well desire &amp; status line up for already-rated items (outer ring) — not simply how much is fulfilled (that's the smaller number below it, inner ring).",
  },
  matchHint: {
    de: 'Vergleiche die Boards von zwei Personen, die unabhängig voneinander für dieselbe Beziehung ausgefüllt haben (z.&nbsp;B. "Ich" und "Alex"). Fülle dazu jeweils ein eigenes Personen-Profil aus, markiere es oben als <strong>"fertig"</strong> und importiere ggf. die exportierte Datei deiner Partnerin/deines Partners über <strong>"Person importieren"</strong>. Solange nicht beide Seiten fertig sind, bleiben die Ergebnisse verborgen, damit ihr euch beim Ausfüllen nicht gegenseitig beeinflusst.',
    en: 'Compare the boards of two people who filled them out independently for the same relationship (e.g.&nbsp;"Me" and "Alex"). Have each fill out their own person profile, mark it above as <strong>"done"</strong>, and import your partner\'s exported file via <strong>"Import person"</strong> if needed. Results stay hidden until both sides are done, so filling things out doesn\'t influence each other.',
  },

  matchLabelA: { de: 'Person A', en: 'Person A' },
  matchLabelB: { de: 'Person B', en: 'Person B' },

  panelCloseAriaLabel: { de: 'Schließen', en: 'Close' },
  controlLabelStatus: { de: 'Status', en: 'Status' },
  controlLabelDesire: { de: 'Wunsch', en: 'Desire' },
  notePlaceholder: { de: 'Notiz (optional)', en: 'Note (optional)' },
  statusGroupAriaLabel: { de: 'Status für {label}', en: 'Status for {label}' },
  desireGroupAriaLabel: { de: 'Wunsch für {label}', en: 'Desire for {label}' },
  noteToggleAriaLabel: { de: 'Notiz für {label}', en: 'Note for {label}' },
  matchIndicatorMatchTitle: {
    de: 'Passt zusammen: Wunsch und Status stimmen überein',
    en: 'Matches: desire and status line up',
  },
  matchIndicatorMismatchTitle: {
    de: 'Diskrepanz: Wunsch und Status stimmen nicht überein — vielleicht ansprechen?',
    en: "Mismatch: desire and status don't line up — maybe worth discussing?",
  },

  footerText: {
    de: 'Inhalte basieren auf dem <strong>Relationship Anarchy Smörgåsbord (v6)</strong> von Lyrica Lawrence &amp; Heather Orr, aktualisiert von Maxx Hill — lizenziert unter <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>. Diese App speichert alle Daten ausschließlich lokal in deinem Browser (localStorage) — nichts wird an einen Server gesendet.',
    en: 'Content is based on the <strong>Relationship Anarchy Smörgåsbord (v6)</strong> by Lyrica Lawrence &amp; Heather Orr, updated by Maxx Hill — licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>. This app stores all data exclusively locally in your browser (localStorage) — nothing is sent to a server.',
  },

  footerManifesto: {
    de: 'Die Formulierungen der Items orientieren sich an der Leitfrage „Unsere Beziehung beinhaltet …“ und sind inspiriert vom <a href="https://log.andie.se/post/26652940513/the-short-instructional-manifesto-for-relationship" target="_blank" rel="noopener">Manifest für Beziehungsanarchie</a> von Andie Nordgren (2006).',
    en: 'Item wording follows the guiding question "Our relationship includes …" and is informed by Andie Nordgren\'s <a href="https://log.andie.se/post/26652940513/the-short-instructional-manifesto-for-relationship" target="_blank" rel="noopener">short instructional manifesto for relationship anarchy</a> (2006).',
  },

  // Shown once per category panel, right under the category title, so the
  // list of items below it reads as answers to one running question — the
  // same framing the original Smörgåsbord card deck uses.
  panelFraming: { de: 'Unsere Beziehung beinhaltet …', en: 'Our relationship includes …' },

  // Label for the <summary> that reveals itemSecondary() content. Collapsed
  // by default so items don't show both languages at once — the German UI
  // shows the original English term, the English UI shows the German
  // translation/explanation, only once someone asks to see it.
  itemSecondaryToggle: {
    de: 'Originalbegriff (Englisch) anzeigen',
    en: 'Show German translation',
  },

  bubbleAriaLabel: {
    de: '{title}: {fulfilled} von {total} erfüllt, {partial} teilweise, {unanswered} unbeantwortet',
    en: '{title}: {fulfilled} of {total} fulfilled, {partial} partial, {unanswered} unanswered',
  },
  bubbleAriaLabelMismatchSuffix: {
    de: ', {count} Diskrepanz(en) zwischen Wunsch und Status',
    en: ', {count} mismatch(es) between desire and status',
  },
  mismatchFlagTitle: {
    de: '{count} Diskrepanz(en) zwischen Wunsch und Status',
    en: '{count} mismatch(es) between desire and status',
  },

  hubSub: { de: 'Übereinstimmung ({rated}/{total} bewertet)', en: 'Alignment ({rated}/{total} rated)' },
  hubSubSecondary: { de: '{percent}% erfüllt', en: '{percent}% fulfilled' },

  overviewTotalLabel: {
    de: 'Übereinstimmung von Wunsch &amp; Status für <strong>{name}</strong> ({rated}/{total} Punkte bewertet)',
    en: 'Alignment of desire &amp; status for <strong>{name}</strong> ({rated}/{total} items rated)',
  },
  overviewTotalSub: {
    de: '{percent}% erfüllt ({fulfilled}/{total}, +{partial} teilweise, {unanswered} unbeantwortet)',
    en: '{percent}% fulfilled ({fulfilled}/{total}, +{partial} partial, {unanswered} unanswered)',
  },
  overviewMismatchSummary: {
    de: '⚠ {count} Diskrepanz(en) zwischen Wunsch und Status — lohnt sich zu besprechen',
    en: '⚠ {count} mismatch(es) between desire and status — worth discussing',
  },

  matchNeedTwoPeople: {
    de: 'Du brauchst mindestens zwei Personen für einen Vergleich. Lege oben eine zweite Person an, oder importiere die exportierte Personen-Datei deiner Partnerin/deines Partners über "Person importieren".',
    en: 'You need at least two people for a comparison. Add a second person above, or import your partner\'s exported person file via "Import person".',
  },
  matchChooseDifferent: { de: 'Bitte wähle zwei unterschiedliche Personen aus.', en: 'Please choose two different people.' },
  matchLockedText: {
    de: 'Der Vergleich ist noch gesperrt, damit ihr euch beim Ausfüllen nicht gegenseitig beeinflusst.',
    en: "The comparison is still locked, so filling things out doesn't influence each other.",
  },
  matchLockedMissing: {
    de: 'Noch nicht als "fertig" markiert: <strong>{names}</strong>.',
    en: 'Not yet marked as "done": <strong>{names}</strong>.',
  },
  matchNoComparable: {
    de: 'Noch keine gemeinsam beantworteten Punkte — füllt zuerst ein paar Elemente auf beiden Boards aus.',
    en: 'No jointly answered items yet — fill out a few items on both boards first.',
  },
  matchAllGood: {
    de: '🎉 Keine Diskrepanzen gefunden — bei allen gemeinsam beantworteten Punkten stimmen Wunsch und Status überein.',
    en: '🎉 No mismatches found — desire and status line up for all jointly answered items.',
  },
  discussTagBoth: { de: 'Wunsch &amp; Wahrnehmung', en: 'Desire &amp; perception' },
  discussTagDesire: { de: 'Wunsch-Unterschied', en: 'Desire difference' },
  discussTagStatus: { de: 'Wahrnehmungs-Unterschied', en: 'Perception difference' },
  matchSummaryLabel: {
    de: 'Übereinstimmung zwischen <strong>{a}</strong> und <strong>{b}</strong> ({agree}/{comparable} gemeinsam beantworteten Punkten)',
    en: 'Agreement between <strong>{a}</strong> and <strong>{b}</strong> ({agree}/{comparable} jointly answered items)',
  },
  matchDiscussSummary: { de: '⚠ {count} Punkt(e) zu besprechen', en: '⚠ {count} item(s) to discuss' },

  promptPersonName: { de: 'Name der Person:', en: 'Name of the person:' },
  promptNewName: { de: 'Neuer Name:', en: 'New name:' },
  alertMinOnePerson: { de: 'Mindestens eine Person muss vorhanden sein.', en: 'At least one person must exist.' },
  confirmDeletePerson: {
    de: 'Board für "{name}" wirklich löschen? Das kann nicht rückgängig gemacht werden.',
    en: 'Really delete the board for "{name}"? This cannot be undone.',
  },
  confirmImportAll: {
    de: 'Import ersetzt alle aktuellen Daten in dieser App. Fortfahren?',
    en: 'Importing replaces all current data in this app. Continue?',
  },
  alertImportSuccess: { de: 'Import erfolgreich.', en: 'Import successful.' },
  alertImportFailure: {
    de: 'Import fehlgeschlagen: Die Datei ist kein gültiges Backup.',
    en: 'Import failed: the file is not a valid backup.',
  },
  confirmOverwritePerson: {
    de: '"{name}" ist bereits vorhanden. Mit den importierten Daten aktualisieren?',
    en: '"{name}" already exists. Update it with the imported data?',
  },
  alertPersonImported: { de: 'Person "{name}" wurde importiert.', en: 'Person "{name}" was imported.' },
  alertPersonImportFailure: {
    de: 'Import fehlgeschlagen: Das ist keine gültige Personen-Datei (nutze "Person teilen" zum Exportieren).',
    en: 'Import failed: this is not a valid person file (use "Share person" to export one).',
  },

  // ---------- Wizard ----------
  // Walks through every item that still has an unanswered status and/or
  // desire, one at a time — a fast, mobile-friendly alternative to opening
  // each category panel individually.
  wizardFabLabel: { de: 'Wizard', en: 'Wizard' },
  wizardFabAriaLabel: {
    de: 'Wizard starten: offene Fragen nacheinander beantworten',
    en: 'Start wizard: answer open questions one by one',
  },
  wizardTitle: { de: 'Offene Fragen', en: 'Open questions' },
  wizardCounter: { de: 'Frage {current} von {total}', en: 'Question {current} of {total}' },
  wizardCloseAriaLabel: { de: 'Wizard schließen', en: 'Close wizard' },
  wizardPrev: { de: '◂ Zurück', en: '◂ Back' },
  wizardNext: { de: 'Weiter ▸', en: 'Next ▸' },
  wizardDoneTitle: { de: 'Alles beantwortet! 🎉', en: 'All done! 🎉' },
  wizardDoneBody: {
    de: 'Es gibt gerade keine offenen Fragen mehr für {name}.',
    en: 'There are no open questions left for {name} right now.',
  },
  wizardDoneClose: { de: 'Schließen', en: 'Close' },
};

/** Looks up a STRINGS entry for the current language, with {placeholder} interpolation. */
function t(key, vars) {
  const entry = STRINGS[key];
  if (!entry) return key;
  let str = entry[currentLang] || entry.de || entry.en || '';
  if (vars) {
    Object.keys(vars).forEach((k) => {
      str = str.split(`{${k}}`).join(vars[k]);
    });
  }
  return str;
}

/** Category title in the current language. */
function categoryTitle(category) {
  return currentLang === 'de' ? category.titleDe || category.title : category.title;
}

/** Item label in the current language. */
function itemLabel(item) {
  return currentLang === 'de' ? item.labelDe || item.label : item.label;
}

// Secondary, gray cross-reference line shown under an item (in the panel
// and in Match discuss rows): the German UI shows the English original
// term, the English UI shows the German translation + short explanation.
function itemSecondary(item) {
  return currentLang === 'de' ? item.label : ITEM_TRANSLATIONS[item.id] || null;
}

// Applies translated text to every statically-marked element in the page
// (see data-i18n* attributes in index.html), and keeps the language
// toggle's active state in sync. Dynamic content (board/overview/match/
// panel) is refreshed separately via renderApp()/openCategoryPanel().
function applyStaticTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
  });
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  const versionEl = document.getElementById('app-version');
  if (versionEl) versionEl.textContent = `v${APP_VERSION}`;
}

function setLang(lang) {
  if (lang !== 'de' && lang !== 'en') return;
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyStaticTranslations();
  renderApp();
  if (currentPanelCategoryId) openCategoryPanel(currentPanelCategoryId);
  const wizardOverlay = document.getElementById('wizard-overlay');
  if (wizardOverlay && !wizardOverlay.classList.contains('hidden')) renderWizardStep();
}

let state = loadState();
let currentPanelCategoryId = null;

// Which two people are currently selected in the Match tab. Kept outside
// `state` on purpose — it's just a view preference, not data worth
// persisting/exporting.
let matchSelection = { aId: null, bId: null };

// ---------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------

function uid() {
  return 'p_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function createPerson(name) {
  // `dataVersion` is stamped once at creation and never overwritten
  // afterwards — it records which app version this specific person's data
  // was *created* with, independent of when it was last edited. See
  // `state.appVersion` below for "last saved with" instead.
  return { id: uid(), name, items: {}, done: false, dataVersion: APP_VERSION };
}

function createDefaultState() {
  const person = createPerson('Person 1');
  return { people: [person], selectedPersonId: person.id, appVersion: APP_VERSION };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.people) || parsed.people.length === 0) {
      return createDefaultState();
    }
    if (!parsed.selectedPersonId || !parsed.people.some((p) => p.id === parsed.selectedPersonId)) {
      parsed.selectedPersonId = parsed.people[0].id;
    }
    parsed.people.forEach((p) => {
      if (!p.items) p.items = {};
      if (typeof p.done !== 'boolean') p.done = false;
      migratePerson(p);
    });
    if (!parsed.appVersion) parsed.appVersion = 'pre-versioning';
    if (parsed.appVersion !== APP_VERSION) {
      // Not an error — just a breadcrumb for debugging. Loaded data was
      // last saved by a different app version than is currently running,
      // which is exactly the kind of situation a future migration step
      // would key off of.
      console.info(
        `RA Smörgåsbord: loaded data was last saved with version "${parsed.appVersion}", current app version is "${APP_VERSION}".`
      );
    }
    return parsed;
  } catch (err) {
    console.error('Konnte gespeicherte Daten nicht laden, starte mit Standardzustand.', err);
    return createDefaultState();
  }
}

function saveState() {
  // Refresh on every save so this always reflects the version that most
  // recently wrote the data (as opposed to each person's `dataVersion`,
  // which stays fixed at creation time).
  state.appVersion = APP_VERSION;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getSelectedPerson() {
  return state.people.find((p) => p.id === state.selectedPersonId) || state.people[0];
}

// Merges in defaults so entries from before the "desire" dimension existed
// (or with no entry at all) always come back fully populated.
function getItemEntry(person, itemId) {
  return { status: DEFAULT_STATUS, desire: DEFAULT_DESIRE, note: '', ...person.items[itemId] };
}

function updateItemEntry(person, itemId, changes) {
  const entry = { ...getItemEntry(person, itemId), ...changes };
  person.items[itemId] = entry;
  saveState();
  return entry;
}

function setItemStatus(person, itemId, status) {
  return updateItemEntry(person, itemId, { status });
}

function setItemDesire(person, itemId, desire) {
  return updateItemEntry(person, itemId, { desire });
}

function setItemNote(person, itemId, note) {
  return updateItemEntry(person, itemId, { note });
}

// Whether the current status lines up with what's actually wanted.
// Returns null when there isn't enough information yet (desire or status
// still unanswered) or the status is one of the "teilweise" states
// (deliberately not judged as a clean match or mismatch).
function computeMatch(entry) {
  if (entry.desire === DESIRE.UNANSWERED || entry.status === STATUS.UNANSWERED) return null;
  if (isPartialStatus(entry.status)) return null;
  const isFulfilled = entry.status === STATUS.FULFILLED;
  const isWanted = entry.desire === DESIRE.WANTED;
  return isFulfilled === isWanted ? 'match' : 'mismatch';
}

function getAllItems() {
  return RA_CATEGORIES.flatMap((category) => category.items);
}

// ---------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------

function computeCategoryStats(person, category) {
  let fulfilled = 0;
  let partial = 0;
  let unfulfilled = 0;
  category.items.forEach((item) => {
    const entry = person.items[item.id];
    if (!entry) return; // no entry yet -> counts as unanswered
    if (entry.status === STATUS.FULFILLED) fulfilled++;
    else if (isPartialStatus(entry.status)) partial++;
    else if (entry.status === STATUS.UNFULFILLED) unfulfilled++;
    // STATUS.UNANSWERED falls through and is covered by the remainder below
  });
  const total = category.items.length;
  const unanswered = total - fulfilled - partial - unfulfilled;
  return { total, fulfilled, partial, unfulfilled, unanswered };
}

function computeOverallStats(person) {
  let total = 0;
  let fulfilled = 0;
  let partial = 0;
  let unfulfilled = 0;
  let unanswered = 0;
  RA_CATEGORIES.forEach((category) => {
    const stats = computeCategoryStats(person, category);
    total += stats.total;
    fulfilled += stats.fulfilled;
    partial += stats.partial;
    unfulfilled += stats.unfulfilled;
    unanswered += stats.unanswered;
  });
  return { total, fulfilled, partial, unfulfilled, unanswered };
}

// How well status and desire line up, for a given list of items. This is
// the "second dimension" score: it only rates items where both status and
// desire are known (`rated`), since a plain average over the whole board
// would stay near 0% for ages while things are still being filled in.
// `percent` is null when nothing is rated yet.
function computeAlignmentStats(person, items) {
  let aligned = 0;
  let partial = 0;
  let misaligned = 0;
  let unrated = 0;
  items.forEach((item) => {
    const entry = getItemEntry(person, item.id);
    const match = computeMatch(entry);
    if (match === 'match') aligned++;
    else if (match === 'mismatch') misaligned++;
    else if (isPartialStatus(entry.status) && entry.desire !== DESIRE.UNANSWERED) partial++;
    else unrated++;
  });
  const total = items.length;
  const rated = aligned + partial + misaligned;
  const percent = rated === 0 ? null : Math.round(((aligned * 100 + partial * 50) / rated));
  return { total, rated, aligned, partial, misaligned, unrated, percent };
}

// ---------------------------------------------------------------------
// Match / comparison between two people's boards
// ---------------------------------------------------------------------

// Compares person A's and person B's entry for one item. Only flags a
// difference on a dimension if BOTH sides actually answered it — an
// unanswered side just means "not comparable yet", not a discrepancy.
function compareEntries(entryA, entryB) {
  const desireDiff =
    entryA.desire !== DESIRE.UNANSWERED &&
    entryB.desire !== DESIRE.UNANSWERED &&
    entryA.desire !== entryB.desire;
  const statusDiff =
    entryA.status !== STATUS.UNANSWERED &&
    entryB.status !== STATUS.UNANSWERED &&
    entryA.status !== entryB.status;
  const comparable =
    (entryA.desire !== DESIRE.UNANSWERED && entryB.desire !== DESIRE.UNANSWERED) ||
    (entryA.status !== STATUS.UNANSWERED && entryB.status !== STATUS.UNANSWERED);
  return { desireDiff, statusDiff, comparable, needsDiscussion: desireDiff || statusDiff };
}

// Builds the full comparison between two people across all items: which
// ones are worth discussing (desire and/or perceived status differ) and an
// overall agreement percentage over everything that was comparable at all.
function computeMatchResult(personA, personB) {
  const items = getAllItems();
  let comparable = 0;
  let agree = 0;
  const discuss = [];
  items.forEach((item) => {
    const entryA = getItemEntry(personA, item.id);
    const entryB = getItemEntry(personB, item.id);
    const cmp = compareEntries(entryA, entryB);
    if (!cmp.comparable) return;
    comparable++;
    if (cmp.needsDiscussion) {
      discuss.push({ item, entryA, entryB, ...cmp });
    } else {
      agree++;
    }
  });
  const percent = comparable === 0 ? null : Math.round((agree / comparable) * 100);
  return { comparable, agree, discuss, percent, total: items.length };
}

function conicGradientFor(stats) {
  if (stats.total === 0) return 'var(--color-unanswered)';
  const fEnd = (stats.fulfilled / stats.total) * 100;
  const pEnd = fEnd + (stats.partial / stats.total) * 100;
  const uEnd = pEnd + (stats.unfulfilled / stats.total) * 100;
  return `conic-gradient(var(--color-fulfilled) 0% ${fEnd}%, var(--color-partial) ${fEnd}% ${pEnd}%, var(--color-unfulfilled) ${pEnd}% ${uEnd}%, var(--color-unanswered) ${uEnd}% 100%)`;
}

function alignmentGradientFor(stats) {
  if (stats.total === 0) return 'var(--color-align-unrated)';
  const aEnd = (stats.aligned / stats.total) * 100;
  const pEnd = aEnd + (stats.partial / stats.total) * 100;
  const mEnd = pEnd + (stats.misaligned / stats.total) * 100;
  return `conic-gradient(var(--color-align-good) 0% ${aEnd}%, var(--color-align-partial) ${aEnd}% ${pEnd}%, var(--color-align-bad) ${pEnd}% ${mEnd}%, var(--color-align-unrated) ${mEnd}% 100%)`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------
// Rendering: people bar
// ---------------------------------------------------------------------

function personOptionLabel(person) {
  return person.done ? `${person.name} ✓` : person.name;
}

function renderPeopleBar() {
  const select = document.getElementById('person-select');
  select.innerHTML = '';
  state.people.forEach((person) => {
    const opt = document.createElement('option');
    opt.value = person.id;
    opt.textContent = personOptionLabel(person);
    if (person.id === state.selectedPersonId) opt.selected = true;
    select.appendChild(opt);
  });

  const doneBtn = document.getElementById('btn-toggle-done');
  const current = getSelectedPerson();
  doneBtn.textContent = current.done ? t('btnToggleDoneLabelActive') : t('btnToggleDoneLabel');
  doneBtn.classList.toggle('btn-done-active', current.done);
}

// ---------------------------------------------------------------------
// Rendering: circular board
// ---------------------------------------------------------------------

// Positions categories evenly around a circle. Every other item alternates
// between the two given radii (a "zigzag"), which gives neighboring cards
// more tangential breathing room than a single perfect circle would —
// important since card size now varies with label length. `radii` should
// both stay on the same side of the other ring's radii (e.g. both >= the
// inner ring's radii for the outer ring) so the two rings never drift
// toward each other and collide.
function layoutRing(categories, radii) {
  const n = categories.length;
  return categories.map((category, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const radius = radii[i % radii.length];
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { category, x, y };
  });
}

function createBubbleElement(category, x, y, ringClass, person) {
  const stats = computeCategoryStats(person, category);
  const alignStats = computeAlignmentStats(person, category.items);
  const fPct = stats.total === 0 ? 0 : (stats.fulfilled / stats.total) * 100;
  const pPct = stats.total === 0 ? 0 : (stats.partial / stats.total) * 100;
  const uPct = stats.total === 0 ? 0 : (stats.unfulfilled / stats.total) * 100;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `bubble bubble--${ringClass}`;
  btn.style.setProperty('--x', x + '%');
  btn.style.setProperty('--y', y + '%');
  btn.dataset.categoryId = category.id;
  const title = categoryTitle(category);
  btn.setAttribute(
    'aria-label',
    t('bubbleAriaLabel', { title, fulfilled: stats.fulfilled, total: stats.total, partial: stats.partial, unanswered: stats.unanswered }) +
      (alignStats.misaligned > 0 ? t('bubbleAriaLabelMismatchSuffix', { count: alignStats.misaligned }) : '')
  );
  btn.innerHTML = `
    <span class="bubble-label">${escapeHtml(title)}</span>
    <span class="bubble-progress">
      <span class="progress-fulfilled" style="width:${fPct}%"></span>
      <span class="progress-partial" style="width:${pPct}%"></span>
      <span class="progress-unfulfilled" style="width:${uPct}%"></span>
    </span>
    <span class="bubble-badge-row">
      <span class="bubble-badge">${stats.fulfilled}/${stats.total}</span>
      ${alignStats.misaligned > 0 ? `<span class="mismatch-flag" title="${escapeHtml(t('mismatchFlagTitle', { count: alignStats.misaligned }))}">⚠ ${alignStats.misaligned}</span>` : ''}
    </span>
  `;
  btn.addEventListener('click', () => openCategoryPanel(category.id));
  return btn;
}

function renderBoard() {
  const container = document.getElementById('board-rings');
  container.innerHTML = '';
  const person = getSelectedPerson();

  const outer = RA_CATEGORIES.filter((c) => c.ring === 'outer');
  const inner = RA_CATEGORIES.filter((c) => c.ring === 'inner');

  // Radii are nudged slightly tighter than the original 22/50 split (most
  // of the "distant" feeling actually came from the bare, uncolored gap
  // between rings, which the zone-band background below now fills in —
  // see .board-wrap::before in style.css). Keeping the radii close to the
  // original spacing avoids reintroducing bubble collisions now that
  // bubbles themselves are a bit bigger than before.
  layoutRing(outer, [43, 48]).forEach(({ category, x, y }) => {
    container.appendChild(createBubbleElement(category, x, y, 'outer', person));
  });
  layoutRing(inner, [30, 22]).forEach(({ category, x, y }) => {
    container.appendChild(createBubbleElement(category, x, y, 'inner', person));
  });

  renderHub();
}

function renderHub() {
  const person = getSelectedPerson();
  const stats = computeOverallStats(person);
  const alignStats = computeAlignmentStats(person, getAllItems());
  const hub = document.getElementById('hub');
  const statusRing = document.getElementById('hub-status-ring');
  const hubInner = document.getElementById('hub-inner');

  // Outer ring: how well status & desire line up (the "second color scale").
  hub.style.background = alignmentGradientFor(alignStats);
  // Inner ring: plain status distribution, as before.
  statusRing.style.background = conicGradientFor(stats);

  const fulfilledPercent = stats.total === 0 ? 0 : Math.round((stats.fulfilled / stats.total) * 100);
  const alignPercentLabel = alignStats.percent === null ? '–%' : `${alignStats.percent}%`;

  hubInner.innerHTML = `
    <div class="hub-name">${escapeHtml(person.name)}</div>
    <div class="hub-percent">${alignPercentLabel}</div>
    <div class="hub-sub">${t('hubSub', { rated: alignStats.rated, total: alignStats.total })}</div>
    <div class="hub-sub-secondary">${t('hubSubSecondary', { percent: fulfilledPercent })}</div>
  `;
}

// ---------------------------------------------------------------------
// Rendering: overview tab
// ---------------------------------------------------------------------

function renderOverview() {
  const person = getSelectedPerson();
  const totalEl = document.getElementById('overview-total');
  const listEl = document.getElementById('overview-list');

  const overall = computeOverallStats(person);
  const overallAlign = computeAlignmentStats(person, getAllItems());
  const fulfilledPercent = overall.total === 0 ? 0 : Math.round((overall.fulfilled / overall.total) * 100);
  const alignPercentLabel = overallAlign.percent === null ? '–%' : `${overallAlign.percent}%`;

  totalEl.innerHTML = `
    <div class="big-percent">${alignPercentLabel}</div>
    <div class="overview-total-label">${t('overviewTotalLabel', { name: escapeHtml(person.name), rated: overallAlign.rated, total: overallAlign.total })}</div>
    <div class="overview-total-sub">${t('overviewTotalSub', { percent: fulfilledPercent, fulfilled: overall.fulfilled, total: overall.total, partial: overall.partial, unanswered: overall.unanswered })}</div>
    ${overallAlign.misaligned > 0
      ? `<div class="mismatch-summary">${t('overviewMismatchSummary', { count: overallAlign.misaligned })}</div>`
      : ''}
  `;

  listEl.innerHTML = '';
  RA_CATEGORIES.forEach((category) => {
    const stats = computeCategoryStats(person, category);
    const alignStats = computeAlignmentStats(person, category.items);
    const fPct = stats.total === 0 ? 0 : (stats.fulfilled / stats.total) * 100;
    const pPct = stats.total === 0 ? 0 : (stats.partial / stats.total) * 100;
    const uPct = stats.total === 0 ? 0 : (stats.unfulfilled / stats.total) * 100;

    const row = document.createElement('div');
    row.className = 'overview-row';
    row.innerHTML = `
      <div class="overview-row-head">
        <span class="cat-title">${escapeHtml(categoryTitle(category))}</span>
        <span class="cat-count">
          ${stats.fulfilled}/${stats.total}
          ${alignStats.misaligned > 0 ? `<span class="mismatch-flag" title="${escapeHtml(t('mismatchFlagTitle', { count: alignStats.misaligned }))}">⚠ ${alignStats.misaligned}</span>` : ''}
        </span>
      </div>
      <div class="progress-bar">
        <span class="progress-fulfilled" style="width:${fPct}%"></span>
        <span class="progress-partial" style="width:${pPct}%"></span>
        <span class="progress-unfulfilled" style="width:${uPct}%"></span>
      </div>
    `;
    row.addEventListener('click', () => {
      switchView('board');
      openCategoryPanel(category.id);
    });
    listEl.appendChild(row);
  });
}

// ---------------------------------------------------------------------
// Rendering: match tab
// ---------------------------------------------------------------------

// Keeps matchSelection valid as people get added/renamed/deleted, and picks
// sensible defaults (first two distinct people) the first time around.
function ensureMatchSelection() {
  const ids = state.people.map((p) => p.id);
  if (!matchSelection.aId || !ids.includes(matchSelection.aId)) {
    matchSelection.aId = ids[0] || null;
  }
  if (!matchSelection.bId || !ids.includes(matchSelection.bId) || matchSelection.bId === matchSelection.aId) {
    matchSelection.bId = ids.find((id) => id !== matchSelection.aId) || null;
  }
}

function renderMatchSelects() {
  const selectA = document.getElementById('match-select-a');
  const selectB = document.getElementById('match-select-b');
  [selectA, selectB].forEach((select, idx) => {
    const current = idx === 0 ? matchSelection.aId : matchSelection.bId;
    select.innerHTML = '';
    state.people.forEach((person) => {
      const opt = document.createElement('option');
      opt.value = person.id;
      opt.textContent = personOptionLabel(person);
      if (person.id === current) opt.selected = true;
      select.appendChild(opt);
    });
  });
}

function discussRowHtml({ item, entryA, entryB, desireDiff, statusDiff }, personA, personB) {
  const tag =
    desireDiff && statusDiff
      ? t('discussTagBoth')
      : desireDiff
      ? t('discussTagDesire')
      : t('discussTagStatus');
  const secondary = itemSecondary(item);
  return `
    <div class="discuss-item">
      <div class="discuss-item-head">
        <span class="item-label">${escapeHtml(itemLabel(item))}</span>
        <span class="discuss-tag">${tag}</span>
      </div>
      ${secondary ? `
        <details class="item-explain">
          <summary>${escapeHtml(t('itemSecondaryToggle'))}</summary>
          <div class="item-translation">${escapeHtml(secondary)}</div>
        </details>
      ` : ''}
      <div class="discuss-compare">
        <div class="discuss-side">
          <div class="discuss-side-name">${escapeHtml(personA.name)}</div>
          <span class="chip chip--status chip--status-${entryA.status}">${statusLabel(entryA.status)}</span>
          <span class="chip chip--desire chip--desire-${entryA.desire}">${desireLabel(entryA.desire)}</span>
        </div>
        <div class="discuss-side">
          <div class="discuss-side-name">${escapeHtml(personB.name)}</div>
          <span class="chip chip--status chip--status-${entryB.status}">${statusLabel(entryB.status)}</span>
          <span class="chip chip--desire chip--desire-${entryB.desire}">${desireLabel(entryB.desire)}</span>
        </div>
      </div>
    </div>
  `;
}

function renderMatchView() {
  ensureMatchSelection();
  renderMatchSelects();
  const body = document.getElementById('match-body');

  if (state.people.length < 2) {
    body.innerHTML = `<p class="hint">${t('matchNeedTwoPeople')}</p>`;
    return;
  }

  const personA = state.people.find((p) => p.id === matchSelection.aId);
  const personB = state.people.find((p) => p.id === matchSelection.bId);
  if (!personA || !personB) return;

  if (personA.id === personB.id) {
    body.innerHTML = `<p class="hint">${t('matchChooseDifferent')}</p>`;
    return;
  }

  const missingDone = [personA, personB].filter((p) => !p.done);
  if (missingDone.length > 0) {
    body.innerHTML = `
      <div class="match-locked">
        <div class="match-locked-icon">🔒</div>
        <p>${t('matchLockedText')}</p>
        <p>${t('matchLockedMissing', { names: missingDone.map((p) => escapeHtml(p.name)).join(', ') })}</p>
      </div>
    `;
    return;
  }

  const result = computeMatchResult(personA, personB);
  const percentLabel = result.percent === null ? '–%' : `${result.percent}%`;

  let listHtml;
  if (result.comparable === 0) {
    listHtml = `<p class="hint">${t('matchNoComparable')}</p>`;
  } else if (result.discuss.length === 0) {
    listHtml = `<p class="match-all-good">${t('matchAllGood')}</p>`;
  } else {
    const grouped = new Map();
    result.discuss.forEach((entry) => {
      const category = RA_CATEGORIES.find((c) => c.items.some((i) => i.id === entry.item.id));
      const key = category ? categoryTitle(category) : '';
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(entry);
    });
    listHtml = Array.from(grouped.entries())
      .map(
        ([title, entries]) => `
          <div class="discuss-group">
            <h3 class="discuss-group-title">${escapeHtml(title)}</h3>
            ${entries.map((e) => discussRowHtml(e, personA, personB)).join('')}
          </div>
        `
      )
      .join('');
  }

  body.innerHTML = `
    <div class="match-summary">
      <div class="big-percent">${percentLabel}</div>
      <div class="match-summary-label">
        ${t('matchSummaryLabel', { a: escapeHtml(personA.name), b: escapeHtml(personB.name), agree: result.agree, comparable: result.comparable })}
      </div>
      ${result.discuss.length > 0
        ? `<div class="mismatch-summary">${t('matchDiscussSummary', { count: result.discuss.length })}</div>`
        : ''}
    </div>
    <div class="discuss-list">${listHtml}</div>
  `;
}

// ---------------------------------------------------------------------
// Rendering: side panel
// ---------------------------------------------------------------------

function openCategoryPanel(categoryId) {
  currentPanelCategoryId = categoryId;
  const category = RA_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return;
  const person = getSelectedPerson();

  document.getElementById('panel-title').textContent = categoryTitle(category);
  document.getElementById('panel-framing').textContent = t('panelFraming');
  const itemsEl = document.getElementById('panel-items');
  itemsEl.innerHTML = '';

  category.items.forEach((item) => {
    const entry = getItemEntry(person, item.id);
    const label = itemLabel(item);
    const secondary = itemSecondary(item);
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <div class="item-row-head">
        <span class="item-label">${escapeHtml(label)}</span>
        <span class="match-indicator" aria-hidden="true"></span>
      </div>
      ${secondary ? `
        <details class="item-explain">
          <summary>${escapeHtml(t('itemSecondaryToggle'))}</summary>
          <div class="item-translation">${escapeHtml(secondary)}</div>
        </details>
      ` : ''}
      <div class="item-row-control">
        <span class="control-label">${t('controlLabelStatus')}</span>
        <div class="status-group" role="group" aria-label="${escapeHtml(t('statusGroupAriaLabel', { label }))}">
          <button type="button" class="status-btn status-btn--unanswered" data-status="${STATUS.UNANSWERED}">${statusLabel(STATUS.UNANSWERED)}</button>
          <button type="button" class="status-btn status-btn--unfulfilled" data-status="${STATUS.UNFULFILLED}">${statusLabel(STATUS.UNFULFILLED)}</button>
          <button type="button" class="status-btn status-btn--partial-no" data-status="${STATUS.PARTIAL_NO}">${statusLabel(STATUS.PARTIAL_NO)}</button>
          <button type="button" class="status-btn status-btn--partial-yes" data-status="${STATUS.PARTIAL_YES}">${statusLabel(STATUS.PARTIAL_YES)}</button>
          <button type="button" class="status-btn status-btn--fulfilled" data-status="${STATUS.FULFILLED}">${statusLabel(STATUS.FULFILLED)}</button>
        </div>
      </div>
      <div class="item-row-control">
        <span class="control-label">${t('controlLabelDesire')}</span>
        <div class="desire-group" role="group" aria-label="${escapeHtml(t('desireGroupAriaLabel', { label }))}">
          <button type="button" class="desire-btn desire-btn--unanswered" data-desire="${DESIRE.UNANSWERED}">${desireLabel(DESIRE.UNANSWERED)}</button>
          <button type="button" class="desire-btn desire-btn--unwanted" data-desire="${DESIRE.UNWANTED}">${desireLabel(DESIRE.UNWANTED)}</button>
          <button type="button" class="desire-btn desire-btn--wanted" data-desire="${DESIRE.WANTED}">${desireLabel(DESIRE.WANTED)}</button>
        </div>
        <button type="button" class="note-toggle" aria-label="${escapeHtml(t('noteToggleAriaLabel', { label }))}">📝</button>
      </div>
      <textarea class="item-note hidden" placeholder="${escapeHtml(t('notePlaceholder'))}"></textarea>
    `;

    const matchIndicator = row.querySelector('.match-indicator');

    function refreshMatchIndicator(currentEntry) {
      const match = computeMatch(currentEntry);
      matchIndicator.className = 'match-indicator';
      if (match === 'match') {
        matchIndicator.classList.add('match-indicator--match');
        matchIndicator.textContent = '✓';
        matchIndicator.title = t('matchIndicatorMatchTitle');
      } else if (match === 'mismatch') {
        matchIndicator.classList.add('match-indicator--mismatch');
        matchIndicator.textContent = '⚠';
        matchIndicator.title = t('matchIndicatorMismatchTitle');
      } else {
        matchIndicator.textContent = '';
        matchIndicator.title = '';
      }
    }

    const statusButtons = row.querySelectorAll('.status-btn');
    statusButtons.forEach((btn) => {
      if (btn.dataset.status === entry.status) btn.classList.add('active');
      btn.addEventListener('click', () => {
        const updated = setItemStatus(person, item.id, btn.dataset.status);
        statusButtons.forEach((b) => b.classList.toggle('active', b === btn));
        refreshMatchIndicator(updated);
        refreshBackgroundViews();
      });
    });

    const desireButtons = row.querySelectorAll('.desire-btn');
    desireButtons.forEach((btn) => {
      if (btn.dataset.desire === entry.desire) btn.classList.add('active');
      btn.addEventListener('click', () => {
        const updated = setItemDesire(person, item.id, btn.dataset.desire);
        desireButtons.forEach((b) => b.classList.toggle('active', b === btn));
        refreshMatchIndicator(updated);
        refreshBackgroundViews();
      });
    });

    const noteToggle = row.querySelector('.note-toggle');
    const noteField = row.querySelector('.item-note');
    noteField.value = entry.note || '';
    if (entry.note) {
      noteToggle.classList.add('has-note');
      noteField.classList.remove('hidden');
    }
    noteToggle.addEventListener('click', () => {
      noteField.classList.toggle('hidden');
    });
    noteField.addEventListener('input', () => {
      setItemNote(person, item.id, noteField.value);
      noteToggle.classList.toggle('has-note', noteField.value.trim().length > 0);
      refreshBackgroundViews();
    });

    refreshMatchIndicator(entry);
    itemsEl.appendChild(row);
  });

  document.getElementById('panel').classList.add('open');
  document.getElementById('panel').setAttribute('aria-hidden', 'false');
  document.getElementById('panel-backdrop').classList.add('open');
}

function closeCategoryPanel() {
  currentPanelCategoryId = null;
  document.getElementById('panel').classList.remove('open');
  document.getElementById('panel').setAttribute('aria-hidden', 'true');
  document.getElementById('panel-backdrop').classList.remove('open');
}

// Re-render board + overview (bubble colors, badges, progress bars) without
// closing an open panel — used after every status/note change.
function refreshBackgroundViews() {
  renderBoard();
  renderOverview();
  renderMatchView();
  updateWizardFab();
}

// ---------------------------------------------------------------------
// Wizard: step through every open (unanswered) item one at a time
// ---------------------------------------------------------------------

// An item still counts as "open" as long as either dimension hasn't been
// touched yet — matches what the panel would still show as the grey
// "unbeantwortet" button being active.
function isItemOpen(entry) {
  return entry.status === STATUS.UNANSWERED || entry.desire === DESIRE.UNANSWERED;
}

function getOpenItemsForWizard(person) {
  const open = [];
  RA_CATEGORIES.forEach((category) => {
    category.items.forEach((item) => {
      if (isItemOpen(getItemEntry(person, item.id))) open.push({ category, item });
    });
  });
  return open;
}

// The list of items to step through is frozen at the moment the wizard is
// opened, so answering one doesn't reshuffle the remaining steps or the
// progress count out from under the person mid-flow.
let wizardItems = [];
let wizardIndex = 0;
let wizardAdvanceTimer = null;

function updateWizardFab() {
  const fab = document.getElementById('btn-start-wizard');
  const countEl = document.getElementById('wizard-fab-count');
  if (!fab || !countEl) return;
  const count = getOpenItemsForWizard(getSelectedPerson()).length;
  countEl.textContent = count > 0 ? String(count) : '✓';
  fab.classList.toggle('wizard-fab--done', count === 0);
}

function openWizard() {
  closeCategoryPanel();
  wizardItems = getOpenItemsForWizard(getSelectedPerson());
  wizardIndex = 0;
  const overlay = document.getElementById('wizard-overlay');
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  renderWizardStep();
}

function closeWizard() {
  if (wizardAdvanceTimer) clearTimeout(wizardAdvanceTimer);
  const overlay = document.getElementById('wizard-overlay');
  // Move focus out before hiding: whatever triggered the close (the ✕ or
  // "Fertig"/done button) lives inside the overlay, and setting
  // aria-hidden on an ancestor of the still-focused element is invalid
  // a11y (and browsers warn loudly about it).
  if (overlay.contains(document.activeElement)) {
    document.getElementById('btn-start-wizard').focus();
  }
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
  updateWizardFab();
}

function wizardGoTo(index) {
  if (wizardAdvanceTimer) clearTimeout(wizardAdvanceTimer);
  wizardIndex = index;
  renderWizardStep();
}

function wizardNext() {
  wizardGoTo(wizardIndex + 1);
}

function wizardPrev() {
  if (wizardIndex > 0) wizardGoTo(wizardIndex - 1);
}

// Once both status & desire are set for the current step, the item is no
// longer "open" — auto-advance after a short beat so answering one item
// after another doesn't require an extra tap on "Weiter" every time, while
// still leaving manual Prev/Next available for anyone who prefers it.
function maybeAutoAdvanceWizard(entry) {
  if (wizardAdvanceTimer) clearTimeout(wizardAdvanceTimer);
  if (isItemOpen(entry)) return;
  wizardAdvanceTimer = setTimeout(wizardNext, 450);
}

function renderWizardStep() {
  const body = document.getElementById('wizard-body');
  const counterEl = document.getElementById('wizard-counter');
  const progressFill = document.getElementById('wizard-progress-fill');
  const prevBtn = document.getElementById('wizard-prev');
  const nextBtn = document.getElementById('wizard-next');
  const total = wizardItems.length;

  if (total === 0 || wizardIndex >= total) {
    counterEl.textContent = '';
    progressFill.style.width = '100%';
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    const person = getSelectedPerson();
    body.innerHTML = `
      <div class="wizard-done">
        <div class="wizard-done-emoji" aria-hidden="true">🎉</div>
        <h3>${escapeHtml(t('wizardDoneTitle'))}</h3>
        <p>${escapeHtml(t('wizardDoneBody', { name: person.name }))}</p>
        <button type="button" class="btn btn-primary" id="wizard-done-close">${escapeHtml(t('wizardDoneClose'))}</button>
      </div>
    `;
    body.querySelector('#wizard-done-close').addEventListener('click', closeWizard);
    return;
  }

  prevBtn.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
  prevBtn.disabled = wizardIndex === 0;

  const { category, item } = wizardItems[wizardIndex];
  const person = getSelectedPerson();
  const entry = getItemEntry(person, item.id);
  const label = itemLabel(item);
  const secondary = itemSecondary(item);

  counterEl.textContent = t('wizardCounter', { current: wizardIndex + 1, total });
  progressFill.style.width = `${Math.round((wizardIndex / total) * 100)}%`;

  body.innerHTML = `
    <div class="wizard-category">${escapeHtml(categoryTitle(category))}</div>
    <div class="wizard-item-label">${escapeHtml(label)}</div>
    ${secondary ? `
      <details class="item-explain">
        <summary>${escapeHtml(t('itemSecondaryToggle'))}</summary>
        <div class="item-translation">${escapeHtml(secondary)}</div>
      </details>
    ` : ''}
    <div class="wizard-control">
      <span class="control-label">${t('controlLabelStatus')}</span>
      <div class="status-group status-group--wizard" role="group" aria-label="${escapeHtml(t('statusGroupAriaLabel', { label }))}">
        <button type="button" class="status-btn status-btn--unanswered" data-status="${STATUS.UNANSWERED}">${statusLabel(STATUS.UNANSWERED)}</button>
        <button type="button" class="status-btn status-btn--unfulfilled" data-status="${STATUS.UNFULFILLED}">${statusLabel(STATUS.UNFULFILLED)}</button>
        <button type="button" class="status-btn status-btn--partial-no" data-status="${STATUS.PARTIAL_NO}">${statusLabel(STATUS.PARTIAL_NO)}</button>
        <button type="button" class="status-btn status-btn--partial-yes" data-status="${STATUS.PARTIAL_YES}">${statusLabel(STATUS.PARTIAL_YES)}</button>
        <button type="button" class="status-btn status-btn--fulfilled" data-status="${STATUS.FULFILLED}">${statusLabel(STATUS.FULFILLED)}</button>
      </div>
    </div>
    <div class="wizard-control">
      <span class="control-label">${t('controlLabelDesire')}</span>
      <div class="desire-group desire-group--wizard" role="group" aria-label="${escapeHtml(t('desireGroupAriaLabel', { label }))}">
        <button type="button" class="desire-btn desire-btn--unanswered" data-desire="${DESIRE.UNANSWERED}">${desireLabel(DESIRE.UNANSWERED)}</button>
        <button type="button" class="desire-btn desire-btn--unwanted" data-desire="${DESIRE.UNWANTED}">${desireLabel(DESIRE.UNWANTED)}</button>
        <button type="button" class="desire-btn desire-btn--wanted" data-desire="${DESIRE.WANTED}">${desireLabel(DESIRE.WANTED)}</button>
      </div>
    </div>
  `;

  const statusButtons = body.querySelectorAll('.status-btn');
  statusButtons.forEach((btn) => {
    if (btn.dataset.status === entry.status) btn.classList.add('active');
    btn.addEventListener('click', () => {
      const updated = setItemStatus(person, item.id, btn.dataset.status);
      statusButtons.forEach((b) => b.classList.toggle('active', b === btn));
      refreshBackgroundViews();
      maybeAutoAdvanceWizard(updated);
    });
  });

  const desireButtons = body.querySelectorAll('.desire-btn');
  desireButtons.forEach((btn) => {
    if (btn.dataset.desire === entry.desire) btn.classList.add('active');
    btn.addEventListener('click', () => {
      const updated = setItemDesire(person, item.id, btn.dataset.desire);
      desireButtons.forEach((b) => b.classList.toggle('active', b === btn));
      refreshBackgroundViews();
      maybeAutoAdvanceWizard(updated);
    });
  });
}

// ---------------------------------------------------------------------
// Views (tabs)
// ---------------------------------------------------------------------

function switchView(view) {
  document.querySelectorAll('.tab').forEach((tab) => {
    const active = tab.dataset.view === view;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  document.getElementById('view-board').classList.toggle('hidden', view !== 'board');
  document.getElementById('view-overview').classList.toggle('hidden', view !== 'overview');
  document.getElementById('view-match').classList.toggle('hidden', view !== 'match');
  if (view === 'match') renderMatchView();
}

// ---------------------------------------------------------------------
// Person management
// ---------------------------------------------------------------------

function addPerson() {
  const name = prompt(t('promptPersonName'));
  if (!name || !name.trim()) return;
  const person = createPerson(name.trim());
  state.people.push(person);
  state.selectedPersonId = person.id;
  saveState();
  renderApp();
}

function renamePerson() {
  const person = getSelectedPerson();
  const name = prompt(t('promptNewName'), person.name);
  if (!name || !name.trim()) return;
  person.name = name.trim();
  saveState();
  renderApp();
}

function deletePerson() {
  const person = getSelectedPerson();
  if (state.people.length === 1) {
    alert(t('alertMinOnePerson'));
    return;
  }
  if (!confirm(t('confirmDeletePerson', { name: person.name }))) return;
  state.people = state.people.filter((p) => p.id !== person.id);
  state.selectedPersonId = state.people[0].id;
  saveState();
  renderApp();
}

// Marks the currently selected person as "done" filling out their board, so
// their data becomes eligible for the (blind-until-both-done) Match view.
function togglePersonDone() {
  const person = getSelectedPerson();
  person.done = !person.done;
  saveState();
  renderApp();
}

// ---------------------------------------------------------------------
// Export / Import
// ---------------------------------------------------------------------

function dateStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ra-smorgasbord-backup-${dateStamp()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!parsed || !Array.isArray(parsed.people) || parsed.people.length === 0) {
        throw new Error('Ungültiges Format');
      }
      if (!confirm(t('confirmImportAll'))) return;
      parsed.people.forEach((p) => { if (!p.items) p.items = {}; migratePerson(p); });
      if (!parsed.selectedPersonId || !parsed.people.some((p) => p.id === parsed.selectedPersonId)) {
        parsed.selectedPersonId = parsed.people[0].id;
      }
      state = parsed;
      saveState();
      renderApp();
      alert(t('alertImportSuccess'));
    } catch (err) {
      console.error(err);
      alert(t('alertImportFailure'));
    }
  };
  reader.readAsText(file);
}

// Exports just the currently selected person — meant to be sent to a
// partner so they can import it into their own copy of the app without
// wiping out their own board(s). Wrapped with a tiny marker so import can
// tell it apart from a full backup.
function exportPerson() {
  const person = getSelectedPerson();
  // `appVersion` here is "exported with version X" (useful context for the
  // receiving partner); `person.dataVersion` (preserved inside `person`)
  // is "created with version X" and travels with the person regardless of
  // how many times it's re-exported/imported.
  const payload = { kind: 'ra-smorgasbord-person', appVersion: APP_VERSION, person };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = person.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'person';
  a.download = `ra-smorgasbord-person-${safeName}-${dateStamp()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Imports a single-person file exported via exportPerson(). Adds it as a
// new person alongside the existing ones (doesn't touch anyone else's
// data). If a person with the same id already exists — e.g. re-importing
// an updated export from the same partner — asks before overwriting just
// that one person.
function importPersonFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const person = parsed && parsed.kind === 'ra-smorgasbord-person' ? parsed.person : null;
      if (!person || !person.id || !person.name || typeof person.items !== 'object') {
        throw new Error('Ungültiges Format');
      }
      if (!person.items) person.items = {};
      if (typeof person.done !== 'boolean') person.done = false;
      migratePerson(person);
      if (parsed.appVersion && parsed.appVersion !== APP_VERSION) {
        console.info(
          `RA Smörgåsbord: imported person was exported with version "${parsed.appVersion}" (created with "${person.dataVersion}"), current app version is "${APP_VERSION}".`
        );
      }

      const existingIndex = state.people.findIndex((p) => p.id === person.id);
      if (existingIndex !== -1) {
        const existingName = state.people[existingIndex].name;
        if (!confirm(t('confirmOverwritePerson', { name: existingName }))) return;
        state.people[existingIndex] = person;
      } else {
        state.people.push(person);
      }
      state.selectedPersonId = person.id;
      saveState();
      renderApp();
      alert(t('alertPersonImported', { name: person.name }));
    } catch (err) {
      console.error(err);
      alert(t('alertPersonImportFailure'));
    }
  };
  reader.readAsText(file);
}

// ---------------------------------------------------------------------
// Wire up static event listeners (once)
// ---------------------------------------------------------------------

function initEventListeners() {
  document.getElementById('person-select').addEventListener('change', (e) => {
    state.selectedPersonId = e.target.value;
    saveState();
    renderApp();
  });

  document.getElementById('btn-add-person').addEventListener('click', addPerson);
  document.getElementById('btn-rename-person').addEventListener('click', renamePerson);
  document.getElementById('btn-delete-person').addEventListener('click', deletePerson);
  document.getElementById('btn-toggle-done').addEventListener('click', togglePersonDone);

  document.getElementById('btn-export').addEventListener('click', exportData);

  const fileInput = document.getElementById('file-import');
  document.getElementById('btn-import').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      importData(fileInput.files[0]);
    }
    fileInput.value = '';
  });

  document.getElementById('btn-export-person').addEventListener('click', exportPerson);

  const filePersonInput = document.getElementById('file-import-person');
  document.getElementById('btn-import-person').addEventListener('click', () => filePersonInput.click());
  filePersonInput.addEventListener('change', () => {
    if (filePersonInput.files && filePersonInput.files[0]) {
      importPersonFile(filePersonInput.files[0]);
    }
    filePersonInput.value = '';
  });

  document.getElementById('match-select-a').addEventListener('change', (e) => {
    matchSelection.aId = e.target.value;
    renderMatchView();
  });
  document.getElementById('match-select-b').addEventListener('change', (e) => {
    matchSelection.bId = e.target.value;
    renderMatchView();
  });

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  document.getElementById('panel-close').addEventListener('click', closeCategoryPanel);
  document.getElementById('panel-backdrop').addEventListener('click', closeCategoryPanel);

  document.getElementById('btn-start-wizard').addEventListener('click', openWizard);
  document.getElementById('wizard-close').addEventListener('click', closeWizard);
  document.getElementById('wizard-prev').addEventListener('click', wizardPrev);
  document.getElementById('wizard-next').addEventListener('click', wizardNext);
  document.getElementById('wizard-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'wizard-overlay') closeWizard();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const wizardOverlay = document.getElementById('wizard-overlay');
    if (wizardOverlay && !wizardOverlay.classList.contains('hidden')) {
      closeWizard();
      return;
    }
    closeCategoryPanel();
  });

  window.addEventListener('resize', () => {
    renderBoard();
  });
}

// ---------------------------------------------------------------------
// Full render
// ---------------------------------------------------------------------

function renderApp() {
  renderPeopleBar();
  renderBoard();
  renderOverview();
  renderMatchView();
  updateWizardFab();
}

document.addEventListener('DOMContentLoaded', () => {
  applyStaticTranslations();
  initEventListeners();
  renderApp();
});
