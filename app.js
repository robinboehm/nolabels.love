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

let state = loadState();
let currentPanelCategoryId = null;

// ---------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------

function uid() {
  return 'p_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function createPerson(name) {
  return { id: uid(), name, items: {} };
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
    parsed.people.forEach((p) => { if (!p.items) p.items = {}; });
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

function getItemEntry(person, itemId) {
  return person.items[itemId] || { status: DEFAULT_STATUS, note: '' };
}

function setItemStatus(person, itemId, status) {
  const entry = person.items[itemId] || { status: DEFAULT_STATUS, note: '' };
  entry.status = status;
  person.items[itemId] = entry;
  saveState();
}

function setItemNote(person, itemId, note) {
  const entry = person.items[itemId] || { status: DEFAULT_STATUS, note: '' };
  entry.note = note;
  person.items[itemId] = entry;
  saveState();
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

function conicGradientFor(stats) {
  if (stats.total === 0) return 'var(--color-unanswered)';
  const fEnd = (stats.fulfilled / stats.total) * 100;
  const pEnd = fEnd + (stats.partial / stats.total) * 100;
  const uEnd = pEnd + (stats.unfulfilled / stats.total) * 100;
  return `conic-gradient(var(--color-fulfilled) 0% ${fEnd}%, var(--color-partial) ${fEnd}% ${pEnd}%, var(--color-unfulfilled) ${pEnd}% ${uEnd}%, var(--color-unanswered) ${uEnd}% 100%)`;
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

function renderPeopleBar() {
  const select = document.getElementById('person-select');
  select.innerHTML = '';
  state.people.forEach((person) => {
    const opt = document.createElement('option');
    opt.value = person.id;
    opt.textContent = person.name;
    if (person.id === state.selectedPersonId) opt.selected = true;
    select.appendChild(opt);
  });
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
    `${category.title}: ${stats.fulfilled} von ${stats.total} erfüllt, ${stats.partial} teilweise, ${stats.unanswered} unbeantwortet`
  );
  btn.innerHTML = `
    <span class="bubble-label">${escapeHtml(category.title)}</span>
    <span class="bubble-progress">
      <span class="progress-fulfilled" style="width:${fPct}%"></span>
      <span class="progress-partial" style="width:${pPct}%"></span>
      <span class="progress-unfulfilled" style="width:${uPct}%"></span>
    </span>
    <span class="bubble-badge">${stats.fulfilled}/${stats.total}</span>
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
  const hub = document.getElementById('hub');
  const hubInner = document.getElementById('hub-inner');
  hub.style.background = conicGradientFor(stats);
  const percent = stats.total === 0 ? 0 : Math.round(((stats.fulfilled + stats.partial * 0.5) / stats.total) * 100);
  hubInner.innerHTML = `
    <div class="hub-name">${escapeHtml(person.name)}</div>
    <div class="hub-percent">${percent}%</div>
    <div class="hub-sub">${stats.fulfilled}/${stats.total} erfüllt</div>
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
  const overallPercent = overall.total === 0 ? 0 : Math.round((overall.fulfilled / overall.total) * 100);
  totalEl.innerHTML = `
    <div class="big-percent">${overallPercent}%</div>
    <div>vollständig erfüllt für <strong>${escapeHtml(person.name)}</strong>
      (${overall.fulfilled}/${overall.total}, +${overall.partial} teilweise,
      ${overall.unanswered} unbeantwortet)</div>
  `;

  listEl.innerHTML = '';
  RA_CATEGORIES.forEach((category) => {
    const stats = computeCategoryStats(person, category);
    const fPct = stats.total === 0 ? 0 : (stats.fulfilled / stats.total) * 100;
    const pPct = stats.total === 0 ? 0 : (stats.partial / stats.total) * 100;
    const uPct = stats.total === 0 ? 0 : (stats.unfulfilled / stats.total) * 100;

    const row = document.createElement('div');
    row.className = 'overview-row';
    row.innerHTML = `
      <div class="overview-row-head">
        <span class="cat-title">${escapeHtml(category.title)}</span>
        <span class="cat-count">${stats.fulfilled}/${stats.total}</span>
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
      <div class="item-row-main">
        <span class="item-label">${escapeHtml(item.label)}</span>
        <div class="status-group" role="group" aria-label="Status für ${escapeHtml(item.label)}">
          <button type="button" class="status-btn status-btn--unanswered" data-status="${STATUS.UNANSWERED}">unbeantwortet</button>
          <button type="button" class="status-btn status-btn--unfulfilled" data-status="${STATUS.UNFULFILLED}">nicht erfüllt</button>
          <button type="button" class="status-btn status-btn--partial" data-status="${STATUS.PARTIAL}">teilweise</button>
          <button type="button" class="status-btn status-btn--fulfilled" data-status="${STATUS.FULFILLED}">erfüllt</button>
        </div>
        <button type="button" class="note-toggle" aria-label="Notiz für ${escapeHtml(item.label)}">📝</button>
      </div>
      <textarea class="item-note hidden" placeholder="Notiz (optional)"></textarea>
    `;

    const statusButtons = row.querySelectorAll('.status-btn');
    statusButtons.forEach((btn) => {
      if (btn.dataset.status === entry.status) btn.classList.add('active');
      btn.addEventListener('click', () => {
        setItemStatus(person, item.id, btn.dataset.status);
        statusButtons.forEach((b) => b.classList.toggle('active', b === btn));
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

  document.getElementById('btn-export').addEventListener('click', exportData);

  const fileInput = document.getElementById('file-import');
  document.getElementById('btn-import').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      importData(fileInput.files[0]);
    }
    fileInput.value = '';
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
}

document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  renderApp();
});
