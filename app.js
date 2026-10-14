/**
 * Relationship Anarchy Smörgåsbord — app logic.
 *
 * Everything runs client-side, no build step, no network requests.
 * All data lives in localStorage under STORAGE_KEY.
 */

const STORAGE_KEY = 'ra-smorgasbord-data-v1';

const STATUS = {
  UNANSWERED: 'unanswered',
  UNFULFILLED: 'unfulfilled',
  PARTIAL: 'partial',
  FULFILLED: 'fulfilled',
};

const STATUS_LABELS = {
  [STATUS.UNANSWERED]: 'unbeantwortet',
  [STATUS.UNFULFILLED]: 'nicht erfüllt',
  [STATUS.PARTIAL]: 'teilweise',
  [STATUS.FULFILLED]: 'erfüllt',
};

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
  [DESIRE.UNANSWERED]: 'unbeantwortet',
  [DESIRE.WANTED]: 'gewünscht',
  [DESIRE.UNWANTED]: 'nicht gewünscht',
};

const DEFAULT_DESIRE = DESIRE.UNANSWERED;

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
  return { id: uid(), name, items: {}, done: false };
}

function createDefaultState() {
  const person = createPerson('Person 1');
  return { people: [person], selectedPersonId: person.id };
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
    });
    return parsed;
  } catch (err) {
    console.error('Konnte gespeicherte Daten nicht laden, starte mit Standardzustand.', err);
    return createDefaultState();
  }
}

function saveState() {
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
// still unanswered) or the status is "teilweise" (deliberately not judged
// as a clean match or mismatch).
function computeMatch(entry) {
  if (entry.desire === DESIRE.UNANSWERED || entry.status === STATUS.UNANSWERED) return null;
  if (entry.status === STATUS.PARTIAL) return null;
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
    else if (entry.status === STATUS.PARTIAL) partial++;
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
    else if (entry.status === STATUS.PARTIAL && entry.desire !== DESIRE.UNANSWERED) partial++;
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
  doneBtn.textContent = current.done ? '↩ Bearbeitung fortsetzen' : 'Als fertig markieren';
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
  btn.setAttribute(
    'aria-label',
    `${category.title}: ${stats.fulfilled} von ${stats.total} erfüllt, ${stats.partial} teilweise, ` +
      `${stats.unanswered} unbeantwortet` +
      (alignStats.misaligned > 0 ? `, ${alignStats.misaligned} Diskrepanz(en) zwischen Wunsch und Status` : '')
  );
  btn.innerHTML = `
    <span class="bubble-label">${escapeHtml(category.title)}</span>
    <span class="bubble-progress">
      <span class="progress-fulfilled" style="width:${fPct}%"></span>
      <span class="progress-partial" style="width:${pPct}%"></span>
      <span class="progress-unfulfilled" style="width:${uPct}%"></span>
    </span>
    <span class="bubble-badge-row">
      <span class="bubble-badge">${stats.fulfilled}/${stats.total}</span>
      ${alignStats.misaligned > 0 ? `<span class="mismatch-flag" title="${alignStats.misaligned} Diskrepanz(en) zwischen Wunsch und Status">⚠ ${alignStats.misaligned}</span>` : ''}
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

  layoutRing(outer, [45, 50]).forEach(({ category, x, y }) => {
    container.appendChild(createBubbleElement(category, x, y, 'outer', person));
  });
  layoutRing(inner, [28, 22]).forEach(({ category, x, y }) => {
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
    <div class="hub-sub">Übereinstimmung (${alignStats.rated}/${alignStats.total} bewertet)</div>
    <div class="hub-sub-secondary">${fulfilledPercent}% erfüllt</div>
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
    <div class="overview-total-label">Übereinstimmung von Wunsch &amp; Status für <strong>${escapeHtml(person.name)}</strong>
      (${overallAlign.rated}/${overallAlign.total} Punkte bewertet)</div>
    <div class="overview-total-sub">${fulfilledPercent}% erfüllt
      (${overall.fulfilled}/${overall.total}, +${overall.partial} teilweise,
      ${overall.unanswered} unbeantwortet)</div>
    ${overallAlign.misaligned > 0
      ? `<div class="mismatch-summary">⚠ ${overallAlign.misaligned} Diskrepanz(en) zwischen Wunsch und Status — lohnt sich zu besprechen</div>`
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
        <span class="cat-title">${escapeHtml(category.title)}</span>
        <span class="cat-count">
          ${stats.fulfilled}/${stats.total}
          ${alignStats.misaligned > 0 ? `<span class="mismatch-flag" title="${alignStats.misaligned} Diskrepanz(en) zwischen Wunsch und Status">⚠ ${alignStats.misaligned}</span>` : ''}
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
      ? 'Wunsch &amp; Wahrnehmung'
      : desireDiff
      ? 'Wunsch-Unterschied'
      : 'Wahrnehmungs-Unterschied';
  return `
    <div class="discuss-item">
      <div class="discuss-item-head">
        <span class="item-label">${escapeHtml(item.label)}</span>
        <span class="discuss-tag">${tag}</span>
      </div>
      ${ITEM_TRANSLATIONS[item.id]
        ? `<div class="item-translation">${escapeHtml(ITEM_TRANSLATIONS[item.id])}</div>`
        : ''}
      <div class="discuss-compare">
        <div class="discuss-side">
          <div class="discuss-side-name">${escapeHtml(personA.name)}</div>
          <span class="chip chip--status chip--status-${entryA.status}">${STATUS_LABELS[entryA.status]}</span>
          <span class="chip chip--desire chip--desire-${entryA.desire}">${DESIRE_LABELS[entryA.desire]}</span>
        </div>
        <div class="discuss-side">
          <div class="discuss-side-name">${escapeHtml(personB.name)}</div>
          <span class="chip chip--status chip--status-${entryB.status}">${STATUS_LABELS[entryB.status]}</span>
          <span class="chip chip--desire chip--desire-${entryB.desire}">${DESIRE_LABELS[entryB.desire]}</span>
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
    body.innerHTML = `
      <p class="hint">
        Du brauchst mindestens zwei Personen für einen Vergleich. Lege oben
        eine zweite Person an, oder importiere die exportierte
        Personen-Datei deiner Partnerin/deines Partners über
        "Person importieren".
      </p>
    `;
    return;
  }

  const personA = state.people.find((p) => p.id === matchSelection.aId);
  const personB = state.people.find((p) => p.id === matchSelection.bId);
  if (!personA || !personB) return;

  if (personA.id === personB.id) {
    body.innerHTML = `<p class="hint">Bitte wähle zwei unterschiedliche Personen aus.</p>`;
    return;
  }

  const missingDone = [personA, personB].filter((p) => !p.done);
  if (missingDone.length > 0) {
    body.innerHTML = `
      <div class="match-locked">
        <div class="match-locked-icon">🔒</div>
        <p>
          Der Vergleich ist noch gesperrt, damit ihr euch beim Ausfüllen
          nicht gegenseitig beeinflusst.
        </p>
        <p>
          Noch nicht als "fertig" markiert:
          <strong>${missingDone.map((p) => escapeHtml(p.name)).join(', ')}</strong>.
        </p>
      </div>
    `;
    return;
  }

  const result = computeMatchResult(personA, personB);
  const percentLabel = result.percent === null ? '–%' : `${result.percent}%`;

  let listHtml;
  if (result.comparable === 0) {
    listHtml = `<p class="hint">Noch keine gemeinsam beantworteten Punkte — füllt zuerst ein paar Elemente auf beiden Boards aus.</p>`;
  } else if (result.discuss.length === 0) {
    listHtml = `<p class="match-all-good">🎉 Keine Diskrepanzen gefunden — bei allen gemeinsam beantworteten Punkten stimmen Wunsch und Status überein.</p>`;
  } else {
    const grouped = new Map();
    result.discuss.forEach((entry) => {
      const category = RA_CATEGORIES.find((c) => c.items.some((i) => i.id === entry.item.id));
      const key = category ? category.title : '';
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
        Übereinstimmung zwischen <strong>${escapeHtml(personA.name)}</strong> und
        <strong>${escapeHtml(personB.name)}</strong>
        (${result.agree}/${result.comparable} gemeinsam beantworteten Punkten)
      </div>
      ${result.discuss.length > 0
        ? `<div class="mismatch-summary">⚠ ${result.discuss.length} Punkt(e) zu besprechen</div>`
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

  document.getElementById('panel-title').textContent = category.title;
  const itemsEl = document.getElementById('panel-items');
  itemsEl.innerHTML = '';

  category.items.forEach((item) => {
    const entry = getItemEntry(person, item.id);
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <div class="item-row-head">
        <span class="item-label">${escapeHtml(item.label)}</span>
        <span class="match-indicator" aria-hidden="true"></span>
      </div>
      ${ITEM_TRANSLATIONS[item.id]
        ? `<div class="item-translation">${escapeHtml(ITEM_TRANSLATIONS[item.id])}</div>`
        : ''}
      <div class="item-row-control">
        <span class="control-label">Status</span>
        <div class="status-group" role="group" aria-label="Status für ${escapeHtml(item.label)}">
          <button type="button" class="status-btn status-btn--unanswered" data-status="${STATUS.UNANSWERED}">unbeantwortet</button>
          <button type="button" class="status-btn status-btn--unfulfilled" data-status="${STATUS.UNFULFILLED}">nicht erfüllt</button>
          <button type="button" class="status-btn status-btn--partial" data-status="${STATUS.PARTIAL}">teilweise</button>
          <button type="button" class="status-btn status-btn--fulfilled" data-status="${STATUS.FULFILLED}">erfüllt</button>
        </div>
      </div>
      <div class="item-row-control">
        <span class="control-label">Wunsch</span>
        <div class="desire-group" role="group" aria-label="Wunsch für ${escapeHtml(item.label)}">
          <button type="button" class="desire-btn desire-btn--unanswered" data-desire="${DESIRE.UNANSWERED}">unbeantwortet</button>
          <button type="button" class="desire-btn desire-btn--unwanted" data-desire="${DESIRE.UNWANTED}">nicht gewünscht</button>
          <button type="button" class="desire-btn desire-btn--wanted" data-desire="${DESIRE.WANTED}">gewünscht</button>
        </div>
        <button type="button" class="note-toggle" aria-label="Notiz für ${escapeHtml(item.label)}">📝</button>
      </div>
      <textarea class="item-note hidden" placeholder="Notiz (optional)"></textarea>
    `;

    const matchIndicator = row.querySelector('.match-indicator');

    function refreshMatchIndicator(currentEntry) {
      const match = computeMatch(currentEntry);
      matchIndicator.className = 'match-indicator';
      if (match === 'match') {
        matchIndicator.classList.add('match-indicator--match');
        matchIndicator.textContent = '✓';
        matchIndicator.title = 'Passt zusammen: Wunsch und Status stimmen überein';
      } else if (match === 'mismatch') {
        matchIndicator.classList.add('match-indicator--mismatch');
        matchIndicator.textContent = '⚠';
        matchIndicator.title = 'Diskrepanz: Wunsch und Status stimmen nicht überein — vielleicht ansprechen?';
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
  const name = prompt('Name der Person:');
  if (!name || !name.trim()) return;
  const person = createPerson(name.trim());
  state.people.push(person);
  state.selectedPersonId = person.id;
  saveState();
  renderApp();
}

function renamePerson() {
  const person = getSelectedPerson();
  const name = prompt('Neuer Name:', person.name);
  if (!name || !name.trim()) return;
  person.name = name.trim();
  saveState();
  renderApp();
}

function deletePerson() {
  const person = getSelectedPerson();
  if (state.people.length === 1) {
    alert('Mindestens eine Person muss vorhanden sein.');
    return;
  }
  if (!confirm(`Board für "${person.name}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`)) return;
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
      if (!confirm('Import ersetzt alle aktuellen Daten in dieser App. Fortfahren?')) return;
      parsed.people.forEach((p) => { if (!p.items) p.items = {}; });
      if (!parsed.selectedPersonId || !parsed.people.some((p) => p.id === parsed.selectedPersonId)) {
        parsed.selectedPersonId = parsed.people[0].id;
      }
      state = parsed;
      saveState();
      renderApp();
      alert('Import erfolgreich.');
    } catch (err) {
      console.error(err);
      alert('Import fehlgeschlagen: Die Datei ist kein gültiges Backup.');
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
  const payload = { kind: 'ra-smorgasbord-person', person };
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

      const existingIndex = state.people.findIndex((p) => p.id === person.id);
      if (existingIndex !== -1) {
        const existingName = state.people[existingIndex].name;
        if (!confirm(`"${existingName}" ist bereits vorhanden. Mit den importierten Daten aktualisieren?`)) return;
        state.people[existingIndex] = person;
      } else {
        state.people.push(person);
      }
      state.selectedPersonId = person.id;
      saveState();
      renderApp();
      alert(`Person "${person.name}" wurde importiert.`);
    } catch (err) {
      console.error(err);
      alert('Import fehlgeschlagen: Das ist keine gültige Personen-Datei (nutze "Person teilen" zum Exportieren).');
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

  document.getElementById('panel-close').addEventListener('click', closeCategoryPanel);
  document.getElementById('panel-backdrop').addEventListener('click', closeCategoryPanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCategoryPanel();
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
}

document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  renderApp();
});
