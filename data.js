/**
 * Relationship Anarchy Smörgåsbord — category & item data.
 *
 * Content (category titles & items) taken from the "Relationship Anarchy
 * Smörgåsbord" v6, originated by Lyrica Lawrence & Heather Orr of Vancouver
 * Polyamory (Dec 2016), updated by Maxx Hill. Licensed CC BY-NC-SA 4.0.
 * Terms are kept in the original English.
 *
 * Categories are split into two rings purely for the visual layout of this
 * app, following the board's own note that categories relating to broader
 * social/political systems sit toward the outside, and more personal ones
 * toward the center.
 */

const RA_CATEGORIES = [
  // ---- Outer ring: broader social / structural themes ----
  { id: 'financial', ring: 'outer', title: 'Financial', titleDe: 'Finanzen', items: [
    'Money', 'Payments', 'Responsibilities', 'Property', 'Sharing resources', 'Mutual aid', 'Businesses',
  ]},
  { id: 'power-hierarchy', ring: 'outer', title: 'Power / Hierarchy', titleDe: 'Macht / Hierarchie', items: [
    'Boss - employee', 'Sponsor - sponsee', 'Teacher - student', 'Mentor/guide',
  ]},
  { id: 'companionship', ring: 'outer', title: 'Companionship', titleDe: 'Kameradschaft', items: [
    'Playfulness', 'Shared activity / interests', 'Intellectual & philosophical discussions', 'Friendship',
  ]},
  { id: 'religious-spiritual', ring: 'outer', title: 'Religious / Spiritual', titleDe: 'Religion/Spiritualität', items: [
    'Shared ritual / prayer', 'Shared beliefs', 'Discussions', 'Ceremony', 'Traditions', 'Magic', 'Divination',
  ]},
  { id: 'future-plans', ring: 'outer', title: 'Future Plans', titleDe: 'Pläne für die Zukunft', items: [
    'Relationship duration', 'Children', 'Community', 'Living preferences', 'Career importance',
  ]},
  { id: 'labels-terms', ring: 'outer', title: 'Labels/Terms', titleDe: 'Bezeichnungen/Begriffe', items: [
    'Spouses', 'Parent', 'Cousin', 'Sibling', 'Datemate', 'Chosen family', 'Social media official', 'Terms of affection',
  ]},
  { id: 'marginalization', ring: 'outer', title: 'Marginalization, Privilege, Allyship, & Advocacy', titleDe: 'Marginalisierung, Privilegien, Verbündete und Fürsprache', items: [
    'Race', 'Disability', 'Gender', 'Class', 'Citizenship', 'Sexuality', 'Size', 'Beauty', 'Religion', 'Neurodivergence',
  ]},
  { id: 'legal', ring: 'outer', title: 'Legal', titleDe: 'Rechtsthemen', items: [
    'Power of attorney', 'Business partner', 'Adoption', 'Marriage', 'Executor of will', 'Civil partnership',
  ]},
  { id: 'pda', ring: 'outer', title: 'Public Displays of Affection', titleDe: 'Öffentliche Anzeigen der Zuneigung', items: [
    'Events', 'Friends', 'Family', 'Work', 'Social media', 'Seen together', 'Outness',
  ]},
  { id: 'partnership', ring: 'outer', title: 'Partnership', titleDe: 'Partnerschaft', items: [
    'Shared goals / values', 'Routine', 'Embracing change', 'Consistency', 'Commitment', 'Reliability',
  ]},
  { id: 'collaborative', ring: 'outer', title: 'Collaborative', titleDe: 'Zusammenarbeit', items: [
    'Working together', 'Teaching', 'Projects', 'Organizations', 'Associations',
  ]},
  { id: 'exclusivity', ring: 'outer', title: 'Exclusivity', titleDe: 'Exklusivität', items: [
    'Sexual', 'Emotional', 'Social', 'Structural', 'Romantic', 'Specific activities',
  ]},
  { id: 'professional-work', ring: 'outer', title: 'Professional/Work', titleDe: 'Beruf/Arbeit', items: [
    'Combining social, collaborative, & financial', 'Colleagues', 'Partners', 'Co-operatives',
  ]},

  // ---- Inner ring: more personal / intimate themes ----
  { id: 'technology', ring: 'inner', title: 'Technology', titleDe: 'Technologie', items: [
    'Sharing accounts / licenses', 'Shared tools / consoles', 'Passwords',
  ]},
  { id: 'communication-methods', ring: 'inner', title: 'Communication Methods', titleDe: 'Methoden der Kommunikation', items: [
    'Video', 'Phone', 'Text', 'Sexting', 'Written', 'In-person visits', 'Relationship meetings',
  ]},
  { id: 'communication-frequency', ring: 'inner', title: 'Communication Frequency', titleDe: 'Häufigkeit der Kommunikation', items: [
    'Daily', 'Weekly', 'Monthly', 'Annually', 'Inconsistently', 'Check-ins', 'Emergencies',
  ]},
  { id: 'domestic', ring: 'inner', title: 'Domestic', titleDe: 'Häuslichkeit', items: [
    'Routines', 'Chores', 'Sharing a dwelling/home', 'Sharing a sleeping space', 'Cooking together', 'Sharing meals',
  ]},
  { id: 'power-exchange-kink', ring: 'inner', title: 'Power Exchange & Kink', titleDe: 'Austausch von Macht & Kink', items: [
    'Roleplay', 'Bondage', 'Fetishes', 'Sadomasochism', 'Sensation', 'Dominance & submission', 'Switching',
  ]},
  { id: 'time-together', ring: 'inner', title: 'Time Spent Together', titleDe: 'Gemeinsame Zeit', items: [
    'Holidays', 'Birthdays', 'Anniversaries', 'Errands', 'Parallel play', 'Frequency', 'Dates', 'Home', 'Duration',
  ]},
  { id: 'co-caregivers', ring: 'inner', title: 'Co-Caregivers', titleDe: 'Mitbetreuer', items: [
    'Family (sick, elderly)', 'Long-term commitment', 'Animals', 'Plants', 'Children',
  ]},
  { id: 'caregiving', ring: 'inner', title: 'Caregiving', titleDe: 'Pflege', items: [
    'Health', 'Sponsorship', 'Reliability', 'Emergencies', 'End of life / death', 'Receiving / giving care', 'Disability',
  ]},
  { id: 'emotional-support', ring: 'inner', title: 'Emotional Support', titleDe: 'Emotionale Unterstützung', items: [
    'Listening', 'Empathy', 'Insecurities & reassurances', 'Being asked for advice', 'Confidante',
  ]},
  { id: 'emotional-intimacy', ring: 'inner', title: 'Emotional Intimacy', titleDe: 'Emotionale Intimität', items: [
    'Being vulnerable', 'Discussing values / beliefs', 'Difficult conversations', 'Love languages',
  ]},
  { id: 'physical-intimacy', ring: 'inner', title: 'Physical Intimacy', titleDe: 'Körperliche Intimität', items: [
    'Dance', 'Cuddles', 'Hugs', 'Pets', 'Massage', 'Hand-holding', 'Nudity', 'Kissing', 'Co-sleeping', 'Body contact',
  ]},
  { id: 'sexual', ring: 'inner', title: 'Sexual', titleDe: 'Sexuelle Intimität', items: [
    'Orgasms', 'Frequency', 'Involving genitals / anus', 'Touch', 'Voice', 'Text', 'STI testing & frequency', 'Safer sex practices',
  ]},
  { id: 'romantic', ring: 'inner', title: 'Romantic', titleDe: 'Romantik', items: [
    'Emotional attraction', 'Cultivating uniqueness', 'Unmotivated euphoria', 'Shared experiences', 'Intense focus', 'Crushes',
  ]},
  { id: 'creative', ring: 'inner', title: 'Creative', titleDe: 'Kreativität', items: [
    'Visual art', 'Craft', 'Critique', 'Music', 'Yoga', 'Comedy', 'Acrobatics', 'Dance', 'Theatre', 'Improv', 'Martial arts',
  ]},
  { id: 'things-to-discuss', ring: 'inner', title: 'Things to Discuss', titleDe: 'Zu besprechende Themen', items: [
    'Important boundaries', 'Mental health & trauma', 'Hard conversations', 'Security & privacy', 'Accountability',
  ]},
];

/** Turn a label into a stable, url-safe slug. */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Expand each category's plain string items into { id, label } objects with
// stable ids of the form "<categoryId>__<slug>", used as keys in a person's
// status map.
RA_CATEGORIES.forEach((category) => {
  category.items = category.items.map((label) => ({
    id: `${category.id}__${slugify(label)}`,
    label,
  }));
});

/**
 * German translation + short explanation for every item, keyed by item id
 * ("<categoryId>__<slug>"). Shown as secondary/gray helper text in the
 * detail panel — the original English terms stay the primary label.
 */
const ITEM_TRANSLATIONS = {
  // Financial
  'financial__money': 'Geld – z. B. Einkommen, Ausgaben, finanzielle Offenheit',
  'financial__payments': 'Zahlungen – wer bezahlt wofür, gemeinsame Kosten',
  'financial__responsibilities': 'Verantwortlichkeiten – finanzielle Pflichten und Zuständigkeiten',
  'financial__property': 'Eigentum – gemeinsamer oder getrennter Besitz',
  'financial__sharing-resources': 'Ressourcen teilen – z. B. Auto, Werkzeug, Wohnraum',
  'financial__mutual-aid': 'Gegenseitige Unterstützung – sich in Notlagen finanziell aushelfen',
  'financial__businesses': 'Geschäfte – gemeinsame Unternehmungen oder Firmen',

  // Power / Hierarchy
  'power-hierarchy__boss-employee': 'Chef*in – Angestellte*r – ein berufliches Machtgefälle in der Beziehung',
  'power-hierarchy__sponsor-sponsee': 'Sponsor*in – Schützling – z. B. in Selbsthilfegruppen wie den 12 Schritten',
  'power-hierarchy__teacher-student': 'Lehrer*in – Schüler*in – ein Lern-/Machtgefälle',
  'power-hierarchy__mentor-guide': 'Mentor*in – gibt Rat und Orientierung',

  // Companionship
  'companionship__playfulness': 'Verspieltheit – gemeinsam albern sein und Spaß haben',
  'companionship__shared-activity-interests': 'Gemeinsame Aktivitäten/Interessen – geteilte Hobbys',
  'companionship__intellectual-philosophical-discussions': 'Intellektuelle & philosophische Gespräche',
  'companionship__friendship': 'Freundschaft – als Basis der Beziehung',

  // Religious / Spiritual
  'religious-spiritual__shared-ritual-prayer': 'Gemeinsames Ritual / Gebet',
  'religious-spiritual__shared-beliefs': 'Geteilte Glaubensvorstellungen',
  'religious-spiritual__discussions': 'Gespräche über Glauben/Spiritualität',
  'religious-spiritual__ceremony': 'Zeremonie – z. B. religiöse Feiern gemeinsam begehen',
  'religious-spiritual__traditions': 'Traditionen – gemeinsam gepflegte Bräuche',
  'religious-spiritual__magic': 'Magie – z. B. Ritualarbeit, Hexerei',
  'religious-spiritual__divination': 'Wahrsagen – z. B. Tarot, Pendeln, Horoskope',

  // Future Plans
  'future-plans__relationship-duration': 'Dauer der Beziehung – kurzfristig oder langfristig gedacht',
  'future-plans__children': 'Kinder – gemeinsamer Kinderwunsch oder Erziehung',
  'future-plans__community': 'Gemeinschaft – gemeinsames soziales Umfeld aufbauen',
  'future-plans__living-preferences': 'Wohnvorstellungen – wo/wie man leben möchte',
  'future-plans__career-importance': 'Stellenwert der Karriere in der Beziehung',

  // Labels/Terms
  'labels-terms__spouses': 'Ehepartner*innen',
  'labels-terms__parent': 'Elternteil',
  'labels-terms__cousin': 'Cousin/Cousine',
  'labels-terms__sibling': 'Geschwister',
  'labels-terms__datemate': 'Datemate – romantische Bezugsperson ohne feste Kategorie wie „Freund*in“',
  'labels-terms__chosen-family': 'Wahlfamilie – nicht blutsverwandte, selbst gewählte Familie',
  'labels-terms__social-media-official': 'In sozialen Medien offiziell als Paar/Beziehung gekennzeichnet',
  'labels-terms__terms-of-affection': 'Kosenamen / liebevolle Bezeichnungen füreinander',

  // Marginalization, Privilege, Allyship, & Advocacy
  'marginalization__race': 'Ethnische Herkunft / Rassismus-Erfahrungen',
  'marginalization__disability': 'Behinderung',
  'marginalization__gender': 'Geschlecht(sidentität)',
  'marginalization__class': 'Soziale Klasse / Herkunft',
  'marginalization__citizenship': 'Staatsbürgerschaft / Aufenthaltsstatus',
  'marginalization__sexuality': 'Sexuelle Orientierung',
  'marginalization__size': 'Körpergröße/-form (z. B. Size-Diskriminierung)',
  'marginalization__beauty': 'Schönheitsideale/-normen',
  'marginalization__religion': 'Religion(szugehörigkeit)',
  'marginalization__neurodivergence': 'Neurodivergenz – z. B. ADHS, Autismus',

  // Legal
  'legal__power-of-attorney': 'Vollmacht – z. B. für medizinische/finanzielle Entscheidungen',
  'legal__business-partner': 'Geschäftspartner*in',
  'legal__adoption': 'Adoption',
  'legal__marriage': 'Ehe',
  'legal__executor-of-will': 'Testamentsvollstrecker*in',
  'legal__civil-partnership': 'Eingetragene Lebenspartnerschaft',

  // Public Displays of Affection
  'pda__events': 'Bei Veranstaltungen als Paar/Beziehung auftreten',
  'pda__friends': 'Vor Freund*innen offen zeigen',
  'pda__family': 'Vor Familie offen zeigen',
  'pda__work': 'Am Arbeitsplatz offen zeigen',
  'pda__social-media': 'In sozialen Medien zeigen',
  'pda__seen-together': 'Öffentlich zusammen gesehen werden',
  'pda__outness': 'Offenheit – wie offen die Beziehung nach außen ist',

  // Partnership
  'partnership__shared-goals-values': 'Gemeinsame Ziele/Werte',
  'partnership__routine': 'Gemeinsame Routine/Alltag',
  'partnership__embracing-change': 'Veränderungen gemeinsam annehmen',
  'partnership__consistency': 'Verlässlichkeit/Beständigkeit',
  'partnership__commitment': 'Verbindlichkeit/Engagement',
  'partnership__reliability': 'Zuverlässigkeit',

  // Collaborative
  'collaborative__working-together': 'Zusammenarbeiten – z. B. an Projekten',
  'collaborative__teaching': 'Sich gegenseitig etwas beibringen',
  'collaborative__projects': 'Gemeinsame Projekte',
  'collaborative__organizations': 'Gemeinsames Engagement in Organisationen',
  'collaborative__associations': 'Gemeinsame Mitgliedschaften/Vereine',

  // Exclusivity
  'exclusivity__sexual': 'Sexuelle Exklusivität',
  'exclusivity__emotional': 'Emotionale Exklusivität',
  'exclusivity__social': 'Soziale Exklusivität',
  'exclusivity__structural': 'Strukturelle Exklusivität – z. B. gemeinsames Zuhause nur mit dieser Person',
  'exclusivity__romantic': 'Romantische Exklusivität',
  'exclusivity__specific-activities': 'Exklusivität bei bestimmten Aktivitäten',

  // Professional/Work
  'professional-work__combining-social-collaborative-financial':
    'Soziales, Zusammenarbeit & Finanzielles im Beruf verbinden',
  'professional-work__colleagues': 'Kolleg*innen',
  'professional-work__partners': 'Geschäftspartner*innen',
  'professional-work__co-operatives': 'Genossenschaften / gemeinsame Kooperativen',

  // Technology
  'technology__sharing-accounts-licenses': 'Accounts/Lizenzen teilen – z. B. Streaming-Dienste',
  'technology__shared-tools-consoles': 'Geräte/Konsolen gemeinsam nutzen',
  'technology__passwords': 'Passwörter teilen',

  // Communication Methods
  'communication-methods__video': 'Videotelefonie',
  'communication-methods__phone': 'Telefonieren',
  'communication-methods__text': 'Textnachrichten',
  'communication-methods__sexting': 'Sexting – erotische Nachrichten',
  'communication-methods__written': 'Briefe/Geschriebenes',
  'communication-methods__in-person-visits': 'Persönliche Besuche',
  'communication-methods__relationship-meetings': 'Beziehungsgespräche – feste Termine zum Austausch',

  // Communication Frequency
  'communication-frequency__daily': 'Täglich',
  'communication-frequency__weekly': 'Wöchentlich',
  'communication-frequency__monthly': 'Monatlich',
  'communication-frequency__annually': 'Jährlich',
  'communication-frequency__inconsistently': 'Unregelmäßig',
  'communication-frequency__check-ins': 'Kurze Check-ins zwischendurch',
  'communication-frequency__emergencies': 'Nur in Notfällen',

  // Domestic
  'domestic__routines': 'Alltagsroutinen',
  'domestic__chores': 'Haushaltsaufgaben',
  'domestic__sharing-a-dwelling-home': 'Zusammen wohnen',
  'domestic__sharing-a-sleeping-space': 'Sich ein Schlafzimmer/Bett teilen',
  'domestic__cooking-together': 'Gemeinsam kochen',
  'domestic__sharing-meals': 'Gemeinsam essen',

  // Power Exchange & Kink
  'power-exchange-kink__roleplay': 'Rollenspiel',
  'power-exchange-kink__bondage': 'Bondage – Fesselspiele',
  'power-exchange-kink__fetishes': 'Fetische',
  'power-exchange-kink__sadomasochism': 'Sadomasochismus (SM)',
  'power-exchange-kink__sensation': 'Sensation Play – Reizempfinden gezielt spielerisch einsetzen',
  'power-exchange-kink__dominance-submission': 'Dominanz & Unterwerfung',
  'power-exchange-kink__switching': 'Switchen – zwischen dominanter und unterwürfiger Rolle wechseln',

  // Time Spent Together
  'time-together__holidays': 'Feiertage gemeinsam verbringen',
  'time-together__birthdays': 'Geburtstage gemeinsam verbringen',
  'time-together__anniversaries': 'Jahrestage feiern',
  'time-together__errands': 'Gemeinsam Besorgungen erledigen',
  'time-together__parallel-play': 'Parallel Play – nebeneinander eigenen Dingen nachgehen',
  'time-together__frequency': 'Wie oft man sich sieht',
  'time-together__dates': 'Verabredungen/Dates',
  'time-together__home': 'Zeit gemeinsam zu Hause',
  'time-together__duration': 'Wie lange die gemeinsame Zeit jeweils dauert',

  // Co-Caregivers
  'co-caregivers__family-sick-elderly': 'Familie (krank, pflegebedürftig) – gemeinsame Fürsorge',
  'co-caregivers__long-term-commitment': 'Langfristige Verbindlichkeit in der Fürsorge',
  'co-caregivers__animals': 'Haustiere gemeinsam versorgen',
  'co-caregivers__plants': 'Pflanzen gemeinsam versorgen',
  'co-caregivers__children': 'Kinder gemeinsam versorgen/erziehen',

  // Caregiving
  'caregiving__health': 'Gesundheit – sich um die Gesundheit der anderen Person kümmern',
  'caregiving__sponsorship': 'Unterstützung/Patenschaft – z. B. in Genesungsprozessen',
  'caregiving__reliability': 'Verlässlichkeit in der Pflege',
  'caregiving__emergencies': 'Unterstützung in Notfällen',
  'caregiving__end-of-life-death': 'Sterbebegleitung / Tod',
  'caregiving__receiving-giving-care': 'Pflege geben und empfangen',
  'caregiving__disability': 'Umgang mit Behinderung in der Fürsorge',

  // Emotional Support
  'emotional-support__listening': 'Zuhören',
  'emotional-support__empathy': 'Empathie/Mitgefühl',
  'emotional-support__insecurities-reassurances': 'Unsicherheiten & gegenseitige Bestärkung',
  'emotional-support__being-asked-for-advice': 'Um Rat gefragt werden',
  'emotional-support__confidante': 'Vertraute Person – der man sich anvertraut',

  // Emotional Intimacy
  'emotional-intimacy__being-vulnerable': 'Verletzlich sein können',
  'emotional-intimacy__discussing-values-beliefs': 'Über Werte/Überzeugungen sprechen',
  'emotional-intimacy__difficult-conversations': 'Schwierige Gespräche führen',
  'emotional-intimacy__love-languages': 'Liebessprachen – wie Zuneigung ausgedrückt/empfangen wird',

  // Physical Intimacy
  'physical-intimacy__dance': 'Tanzen',
  'physical-intimacy__cuddles': 'Kuscheln',
  'physical-intimacy__hugs': 'Umarmungen',
  'physical-intimacy__pets': 'Zärtliches Streicheln',
  'physical-intimacy__massage': 'Massage',
  'physical-intimacy__hand-holding': 'Händchenhalten',
  'physical-intimacy__nudity': 'Nacktheit',
  'physical-intimacy__kissing': 'Küssen',
  'physical-intimacy__co-sleeping': 'Zusammen schlafen (im selben Bett)',
  'physical-intimacy__body-contact': 'Allgemeiner Körperkontakt',

  // Sexual
  'sexual__orgasms': 'Orgasmen',
  'sexual__frequency': 'Häufigkeit sexueller Kontakte',
  'sexual__involving-genitals-anus': 'Einbeziehung von Genitalien/Anus',
  'sexual__touch': 'Berührung',
  'sexual__voice': 'Stimme/verbale Äußerungen beim Sex',
  'sexual__text': 'Sexuell konnotierte Textnachrichten',
  'sexual__sti-testing-frequency': 'STI-Tests & wie oft getestet wird',
  'sexual__safer-sex-practices': 'Safer-Sex-Praktiken',

  // Romantic
  'romantic__emotional-attraction': 'Emotionale Anziehung',
  'romantic__cultivating-uniqueness': 'Das Besondere/Einzigartige der Beziehung pflegen',
  'romantic__unmotivated-euphoria': 'Grundloses Hochgefühl – einfach so Freude aneinander',
  'romantic__shared-experiences': 'Gemeinsame Erlebnisse',
  'romantic__intense-focus': 'Intensive Aufmerksamkeit füreinander',
  'romantic__crushes': 'Verliebtheitsgefühle/Schwärmerei',

  // Creative
  'creative__visual-art': 'Bildende Kunst',
  'creative__craft': 'Handwerk/Basteln',
  'creative__critique': 'Sich gegenseitig kreatives Feedback geben',
  'creative__music': 'Musik',
  'creative__yoga': 'Yoga',
  'creative__comedy': 'Comedy/Humor',
  'creative__acrobatics': 'Akrobatik',
  'creative__dance': 'Tanzen',
  'creative__theatre': 'Theater',
  'creative__improv': 'Improvisationstheater',
  'creative__martial-arts': 'Kampfsport',

  // Things to Discuss
  'things-to-discuss__important-boundaries': 'Wichtige Grenzen',
  'things-to-discuss__mental-health-trauma': 'Psychische Gesundheit & Trauma',
  'things-to-discuss__hard-conversations': 'Schwierige Gespräche',
  'things-to-discuss__security-privacy': 'Sicherheit & Privatsphäre',
  'things-to-discuss__accountability': 'Verantwortungsübernahme/Rechenschaft',
};

/**
 * Short, label-sized German term for items whose full ITEM_TRANSLATIONS
 * entry is a longer explanatory phrase/sentence rather than a short noun
 * phrase — used as the primary item label when the UI is switched to
 * German, so it reads like the original board's terms instead of a full
 * description. Items not listed here fall back to the part of their
 * ITEM_TRANSLATIONS entry before the first " – ", or the full entry if it
 * has no " – " separator (see germanLabelFor below).
 */
const ITEM_LABEL_DE_OVERRIDES = {
  'power-hierarchy__boss-employee': 'Chef*in – Angestellte*r',
  'power-hierarchy__sponsor-sponsee': 'Sponsor*in – Schützling',
  'power-hierarchy__teacher-student': 'Lehrer*in – Schüler*in',
  'religious-spiritual__discussions': 'Erörterungen',
  'future-plans__career-importance': 'Stellenwert der Karriere',
  'labels-terms__social-media-official': 'Offiziell in sozialen Medien',
  'labels-terms__terms-of-affection': 'Kosenamen',
  'marginalization__race': 'Ethnische Herkunft',
  'marginalization__size': 'Körpergröße/-form',
  'pda__events': 'Veranstaltungen',
  'pda__friends': 'Freund*innen',
  'pda__family': 'Familie',
  'pda__work': 'Arbeitsplatz',
  'pda__social-media': 'Soziale Medien',
  'pda__seen-together': 'Zusammen gesehen werden',
  'partnership__routine': 'Routine',
  'partnership__embracing-change': 'Veränderungen annehmen',
  'collaborative__teaching': 'Unterricht',
  'collaborative__projects': 'Projekte',
  'collaborative__organizations': 'Organisationen',
  'collaborative__associations': 'Verbände',
  'exclusivity__sexual': 'Sexuell',
  'exclusivity__emotional': 'Emotional',
  'exclusivity__social': 'Sozial',
  'exclusivity__structural': 'Strukturell',
  'exclusivity__romantic': 'Romantisch',
  'exclusivity__specific-activities': 'Spezifische Aktivitäten',
  'professional-work__combining-social-collaborative-financial': 'Soziales, Kollaboratives & Finanzielles verbinden',
  'professional-work__co-operatives': 'Genossenschaften',
  'technology__shared-tools-consoles': 'Geräte/Konsolen',
  'technology__passwords': 'Passwörter',
  'communication-frequency__check-ins': 'Check-ins',
  'communication-frequency__emergencies': 'Notfälle',
  'domestic__sharing-a-sleeping-space': 'Schlafplatz teilen',
  'time-together__holidays': 'Feiertage',
  'time-together__birthdays': 'Geburtstage',
  'time-together__anniversaries': 'Jahrestage',
  'time-together__errands': 'Besorgungen',
  'time-together__frequency': 'Häufigkeit',
  'time-together__home': 'Zuhause',
  'time-together__duration': 'Dauer',
  'co-caregivers__long-term-commitment': 'Langfristiges Engagement',
  'co-caregivers__animals': 'Tiere',
  'co-caregivers__plants': 'Pflanzen',
  'co-caregivers__children': 'Kinder',
  'caregiving__reliability': 'Verlässlichkeit',
  'caregiving__emergencies': 'Notfälle',
  'caregiving__disability': 'Behinderung',
  'emotional-support__insecurities-reassurances': 'Unsicherheiten & Bestärkung',
  'emotional-intimacy__being-vulnerable': 'Verletzlich sein',
  'emotional-intimacy__discussing-values-beliefs': 'Werte/Überzeugungen besprechen',
  'emotional-intimacy__difficult-conversations': 'Schwierige Gespräche',
  'physical-intimacy__co-sleeping': 'Zusammen schlafen',
  'physical-intimacy__body-contact': 'Körperkontakt',
  'sexual__frequency': 'Häufigkeit',
  'sexual__voice': 'Stimme',
  'sexual__text': 'Text',
  'sexual__sti-testing-frequency': 'STI-Tests & Häufigkeit',
  'romantic__cultivating-uniqueness': 'Einzigartigkeit pflegen',
  'romantic__intense-focus': 'Intensive Aufmerksamkeit',
  'creative__critique': 'Kritik',
  'things-to-discuss__accountability': 'Verantwortlichkeit',
};

/** Derives the short German item label described above for one item id. */
function germanLabelFor(itemId, englishLabel) {
  if (ITEM_LABEL_DE_OVERRIDES[itemId]) return ITEM_LABEL_DE_OVERRIDES[itemId];
  const translation = ITEM_TRANSLATIONS[itemId];
  if (!translation) return englishLabel;
  const dashIndex = translation.indexOf(' – ');
  return dashIndex === -1 ? translation : translation.slice(0, dashIndex);
}

// Attach the German label to every item now that ITEM_TRANSLATIONS (and the
// overrides above) are available.
RA_CATEGORIES.forEach((category) => {
  category.items.forEach((item) => {
    item.labelDe = germanLabelFor(item.id, item.label);
  });
});
