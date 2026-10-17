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
 * German translation + explanation for every item, keyed by item id
 * ("<categoryId>__<slug>"). Shown as secondary/gray helper text in the
 * detail panel — the original English terms stay the primary label.
 *
 * Each entry is written to read naturally as a completion of the board's
 * framing question, "Unsere Beziehung beinhaltet …" ("Our relationship
 * includes …") — see `panelFraming` in app.js. Wording is also informed by
 * Andie Nordgren's "The short instructional manifesto for relationship
 * anarchy" (2006) — https://log.andie.se/post/26652940513/ — in particular
 * its emphasis on explicit, consent-based agreements that are custom-made
 * for each relationship rather than assumed defaults, and on treating each
 * relationship as independent and non-comparable rather than ranked.
 */
const ITEM_TRANSLATIONS = {
  // Financial
  'financial__money': 'Geld – offen über Einkommen, Ausgaben und finanzielle Gewohnheiten sprechen',
  'financial__payments': 'Zahlungen – wer wofür aufkommt, ohne dass Kosten automatisch hälftig geteilt werden müssen',
  'financial__responsibilities': 'Finanzielle Verantwortlichkeiten – klar besprochene Zuständigkeiten statt stillschweigender Annahmen',
  'financial__property': 'Eigentum – bewusst entscheiden, was ihr gemeinsam besitzt und was getrennt bleibt',
  'financial__sharing-resources': 'Ressourcen teilen – z. B. Auto, Werkzeug oder Wohnraum gemeinsam nutzen',
  'financial__mutual-aid': 'Gegenseitige Unterstützung – einander in finanziellen Notlagen aushelfen, ohne aufzurechnen',
  'financial__businesses': 'Geschäfte – gemeinsame Unternehmungen, Firmen oder Projekte mit wirtschaftlichem Ziel',

  // Power / Hierarchy
  'power-hierarchy__boss-employee': 'Chef*in – Angestellte*r – ein beruflich bedingtes Machtgefälle, das in der Beziehung mitgedacht wird',
  'power-hierarchy__sponsor-sponsee': 'Sponsor*in – Schützling – z. B. in Selbsthilfegruppen wie den 12 Schritten, mit bewusst asymmetrischer Rolle',
  'power-hierarchy__teacher-student': 'Lehrer*in – Schüler*in – ein Lern- und Machtgefälle, das bewusst gehalten wird',
  'power-hierarchy__mentor-guide': 'Mentor*in – gibt Rat und Orientierung, ohne dass daraus automatisch Entscheidungsgewalt folgt',

  // Companionship
  'companionship__playfulness': 'Verspieltheit – miteinander albern sein und Leichtigkeit teilen',
  'companionship__shared-activity-interests': 'Gemeinsame Aktivitäten/Interessen – geteilte Hobbys und Leidenschaften',
  'companionship__intellectual-philosophical-discussions': 'Intellektuelle & philosophische Gespräche – Ideen und Weltanschauungen gemeinsam durchdenken',
  'companionship__friendship': 'Freundschaft – als eigenständige, gleichwertige Basis der Beziehung, nicht nur als Vorstufe zu etwas „Größerem“',

  // Religious / Spiritual
  'religious-spiritual__shared-ritual-prayer': 'Gemeinsames Ritual / Gebet',
  'religious-spiritual__shared-beliefs': 'Geteilte Glaubensvorstellungen oder spirituelle Weltbilder',
  'religious-spiritual__discussions': 'Gespräche über Glauben, Zweifel und Spiritualität',
  'religious-spiritual__ceremony': 'Zeremonie – gemeinsam religiöse oder spirituelle Feiern begehen',
  'religious-spiritual__traditions': 'Traditionen – gemeinsam gepflegte Bräuche und Rituale',
  'religious-spiritual__magic': 'Magie – z. B. gemeinsame Ritualarbeit oder Hexerei',
  'religious-spiritual__divination': 'Wahrsagen – z. B. Tarot, Pendeln oder Horoskope gemeinsam nutzen',

  // Future Plans
  'future-plans__relationship-duration': 'Vorstellungen zur Dauer der Beziehung – bewusst offen, befristet oder langfristig gedacht, statt automatisch „für immer“',
  'future-plans__children': 'Kinder – gemeinsamer Kinderwunsch, Erziehung oder Mitverantwortung',
  'future-plans__community': 'Gemeinschaft – ein gemeinsames soziales Umfeld und Netzwerk aufbauen',
  'future-plans__living-preferences': 'Wohnvorstellungen – ob, wo und wie ihr (zusammen) leben möchtet',
  'future-plans__career-importance': 'Stellenwert der Karriere – wie viel Raum Beruf und Ambitionen in der Beziehung einnehmen',

  // Labels/Terms
  'labels-terms__spouses': 'Ehepartner*innen – als selbst gewählte Bezeichnung, nicht nur als rechtlicher Status',
  'labels-terms__parent': 'Elternteil – als Bezeichnung für eine enge Bezugsperson, nicht zwingend die biologische Rolle',
  'labels-terms__cousin': 'Cousin/Cousine – als frei gewählte Bezeichnung für eine nahe, nicht-romantische Bindung',
  'labels-terms__sibling': 'Geschwister – als Bezeichnung für eine enge, familienähnliche Bindung ohne romantischen Rahmen',
  'labels-terms__datemate': 'Datemate – eine romantische Bezugsperson jenseits klassischer Kategorien wie „Freund*in“ oder „Partner*in“',
  'labels-terms__chosen-family': 'Wahlfamilie – selbst gewählte, nicht blutsverwandte Familie',
  'labels-terms__social-media-official': 'Offiziell in sozialen Medien als Paar/Beziehung gekennzeichnet',
  'labels-terms__terms-of-affection': 'Kosenamen / liebevolle Bezeichnungen füreinander',

  // Marginalization, Privilege, Allyship, & Advocacy
  'marginalization__race': 'Ethnische Herkunft – Rassismus-Erfahrungen erkennen und einander darin unterstützen',
  'marginalization__disability': 'Behinderung – Zugänglichkeit und Unterstützungsbedarf gemeinsam mitdenken',
  'marginalization__gender': 'Geschlecht(sidentität) – wie Geschlecht die Beziehung und ihre Außenwahrnehmung prägt',
  'marginalization__class': 'Soziale Klasse/Herkunft – unterschiedliche Startbedingungen und Ressourcen wahrnehmen',
  'marginalization__citizenship': 'Staatsbürgerschaft/Aufenthaltsstatus – rechtliche Unsicherheiten gemeinsam navigieren',
  'marginalization__sexuality': 'Sexuelle Orientierung – Sichtbarkeit und gesellschaftliche Reaktionen gemeinsam einordnen',
  'marginalization__size': 'Körpergröße/-form – Diskriminierung aufgrund von Aussehen erkennen und ihr entgegentreten',
  'marginalization__beauty': 'Schönheitsideale/-normen – gemeinsam hinterfragen, was als „schön“ gilt',
  'marginalization__religion': 'Religion(szugehörigkeit) – wie diese die Beziehung und den Umgang miteinander prägt',
  'marginalization__neurodivergence': 'Neurodivergenz – z. B. ADHS oder Autismus und wie das Bedürfnisse & Kommunikation prägt',

  // Legal
  'legal__power-of-attorney': 'Vollmacht – z. B. für medizinische oder finanzielle Entscheidungen im Ernstfall',
  'legal__business-partner': 'Geschäftspartner*in',
  'legal__adoption': 'Adoption',
  'legal__marriage': 'Ehe',
  'legal__executor-of-will': 'Testamentsvollstrecker*in',
  'legal__civil-partnership': 'Eingetragene Lebenspartnerschaft',

  // Public Displays of Affection
  'pda__events': 'Bei Veranstaltungen offen als Paar/Beziehung auftreten',
  'pda__friends': 'Vor Freund*innen offen zeigen, dass ihr zusammen seid',
  'pda__family': 'Vor der eigenen Familie offen zeigen, dass ihr zusammen seid',
  'pda__work': 'Am Arbeitsplatz offen zeigen, dass ihr zusammen seid',
  'pda__social-media': 'In sozialen Medien zeigen, dass ihr zusammen seid',
  'pda__seen-together': 'Öffentlich zusammen gesehen werden, ohne es extra erklären zu müssen',
  'pda__outness': 'Offenheit – wie offen die Beziehung insgesamt nach außen gelebt wird',

  // Partnership
  'partnership__shared-goals-values': 'Gemeinsame Ziele und Werte, auf die ihr euch bewusst geeinigt habt',
  'partnership__routine': 'Gemeinsame Routine/Alltag',
  'partnership__embracing-change': 'Veränderungen gemeinsam annehmen, statt an einem festen Bild der Beziehung festzuhalten',
  'partnership__consistency': 'Verlässlichkeit/Beständigkeit im Miteinander',
  'partnership__commitment': 'Verbindlichkeit – ein bewusst eingegangenes, selbst definiertes Engagement füreinander statt einer erwarteten Norm',
  'partnership__reliability': 'Zuverlässigkeit – darauf bauen können, dass Zusagen eingehalten werden',

  // Collaborative
  'collaborative__working-together': 'Zusammenarbeiten – z. B. an gemeinsamen Vorhaben',
  'collaborative__teaching': 'Sich gegenseitig etwas beibringen',
  'collaborative__projects': 'Gemeinsame Projekte',
  'collaborative__organizations': 'Gemeinsames Engagement in Organisationen',
  'collaborative__associations': 'Gemeinsame Mitgliedschaften/Vereine',

  // Exclusivity
  'exclusivity__sexual': 'Sexuelle Exklusivität – bewusst vereinbart, nicht automatisch vorausgesetzt',
  'exclusivity__emotional': 'Emotionale Exklusivität – ob emotionale Nähe dieser Tiefe nur hier stattfindet',
  'exclusivity__social': 'Soziale Exklusivität – z. B. nur gemeinsam auf Veranstaltungen auftreten',
  'exclusivity__structural': 'Strukturelle Exklusivität – z. B. nur mit dieser Person zusammenwohnen oder Finanzen teilen',
  'exclusivity__romantic': 'Romantische Exklusivität – ob romantische Gefühle oder Dates exklusiv bleiben',
  'exclusivity__specific-activities': 'Exklusivität bei bestimmten Aktivitäten – z. B. eine Aktivität, die ihr nur zusammen macht',

  // Professional/Work
  'professional-work__combining-social-collaborative-financial':
    'Soziales, Zusammenarbeit & Finanzielles im Beruf miteinander verbinden',
  'professional-work__colleagues': 'Kolleg*innen',
  'professional-work__partners': 'Geschäftspartner*innen',
  'professional-work__co-operatives': 'Genossenschaften / gemeinsame Kooperativen',

  // Technology
  'technology__sharing-accounts-licenses': 'Accounts/Lizenzen teilen – z. B. Streaming-Dienste gemeinsam nutzen',
  'technology__shared-tools-consoles': 'Geräte/Konsolen gemeinsam nutzen',
  'technology__passwords': 'Passwörter teilen',

  // Communication Methods
  'communication-methods__video': 'Videotelefonie',
  'communication-methods__phone': 'Telefonieren',
  'communication-methods__text': 'Textnachrichten',
  'communication-methods__sexting': 'Sexting – erotische Nachrichten austauschen',
  'communication-methods__written': 'Briefe/Geschriebenes',
  'communication-methods__in-person-visits': 'Persönliche Besuche',
  'communication-methods__relationship-meetings': 'Beziehungsgespräche – feste Termine für bewussten Austausch über die Beziehung',

  // Communication Frequency
  'communication-frequency__daily': 'Täglicher Kontakt',
  'communication-frequency__weekly': 'Wöchentlicher Kontakt',
  'communication-frequency__monthly': 'Monatlicher Kontakt',
  'communication-frequency__annually': 'Jährlicher Kontakt',
  'communication-frequency__inconsistently': 'Unregelmäßiger, spontaner Kontakt',
  'communication-frequency__check-ins': 'Kurze Check-ins zwischendurch',
  'communication-frequency__emergencies': 'Kontakt nur in Notfällen',

  // Domestic
  'domestic__routines': 'Gemeinsame Alltagsroutinen',
  'domestic__chores': 'Haushaltsaufgaben teilen',
  'domestic__sharing-a-dwelling-home': 'Zusammen wohnen',
  'domestic__sharing-a-sleeping-space': 'Sich ein Schlafzimmer/Bett teilen',
  'domestic__cooking-together': 'Gemeinsam kochen',
  'domestic__sharing-meals': 'Gemeinsam essen',

  // Power Exchange & Kink
  'power-exchange-kink__roleplay': 'Rollenspiel',
  'power-exchange-kink__bondage': 'Bondage – Fesselspiele',
  'power-exchange-kink__fetishes': 'Fetische',
  'power-exchange-kink__sadomasochism': 'Sadomasochismus (SM)',
  'power-exchange-kink__sensation': 'Sensation Play – Reize gezielt und einvernehmlich spielerisch einsetzen',
  'power-exchange-kink__dominance-submission': 'Dominanz & Unterwerfung – bewusst vereinbarte Machtrollen im Spiel',
  'power-exchange-kink__switching': 'Switchen – je nach Situation zwischen dominanter und unterwürfiger Rolle wechseln',

  // Time Spent Together
  'time-together__holidays': 'Feiertage gemeinsam verbringen',
  'time-together__birthdays': 'Geburtstage gemeinsam verbringen',
  'time-together__anniversaries': 'Jahrestage feiern',
  'time-together__errands': 'Gemeinsam Besorgungen erledigen',
  'time-together__parallel-play': 'Parallel Play – nebeneinander eigenen Dingen nachgehen, einfach in gemeinsamer Gegenwart',
  'time-together__frequency': 'Wie oft ihr euch seht',
  'time-together__dates': 'Verabredungen/Dates',
  'time-together__home': 'Gemeinsame Zeit zu Hause',
  'time-together__duration': 'Wie lange die gemeinsame Zeit jeweils dauert',

  // Co-Caregivers
  'co-caregivers__family-sick-elderly': 'Familie (krank, pflegebedürftig) – sich gemeinsam um sie kümmern',
  'co-caregivers__long-term-commitment': 'Langfristige Verbindlichkeit in der gemeinsamen Fürsorge',
  'co-caregivers__animals': 'Haustiere gemeinsam versorgen',
  'co-caregivers__plants': 'Pflanzen gemeinsam versorgen',
  'co-caregivers__children': 'Kinder gemeinsam versorgen und erziehen',

  // Caregiving
  'caregiving__health': 'Sich um die Gesundheit der anderen Person kümmern',
  'caregiving__sponsorship': 'Unterstützung/Patenschaft – z. B. in Genesungs- oder Wachstumsprozessen',
  'caregiving__reliability': 'Verlässlichkeit in der Pflege',
  'caregiving__emergencies': 'Unterstützung in Notfällen',
  'caregiving__end-of-life-death': 'Sterbebegleitung / Umgang mit Tod',
  'caregiving__receiving-giving-care': 'Pflege geben und empfangen können',
  'caregiving__disability': 'Umgang mit Behinderung in der gegenseitigen Fürsorge',

  // Emotional Support
  'emotional-support__listening': 'Einander zuhören',
  'emotional-support__empathy': 'Empathie/Mitgefühl füreinander',
  'emotional-support__insecurities-reassurances': 'Unsicherheiten teilen und sich gegenseitig bestärken',
  'emotional-support__being-asked-for-advice': 'Um Rat gefragt werden',
  'emotional-support__confidante': 'Vertraute Person, der man sich anvertraut',

  // Emotional Intimacy
  'emotional-intimacy__being-vulnerable': 'Verletzlich sein können, ohne dafür verurteilt zu werden',
  'emotional-intimacy__discussing-values-beliefs': 'Über Werte und Überzeugungen offen sprechen',
  'emotional-intimacy__difficult-conversations': 'Schwierige Gespräche führen können, statt ihnen auszuweichen',
  'emotional-intimacy__love-languages': 'Liebessprachen – wissen, wie die andere Person Zuneigung am liebsten gibt und empfängt',

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
  'physical-intimacy__body-contact': 'Allgemeiner, nicht-sexueller Körperkontakt',

  // Sexual
  'sexual__orgasms': 'Orgasmen',
  'sexual__frequency': 'Häufigkeit sexueller Kontakte',
  'sexual__involving-genitals-anus': 'Einbeziehung von Genitalien/Anus',
  'sexual__touch': 'Berührung',
  'sexual__voice': 'Stimme/verbale Äußerungen beim Sex',
  'sexual__text': 'Sexuell konnotierte Textnachrichten',
  'sexual__sti-testing-frequency': 'STI-Tests und wie oft getestet wird',
  'sexual__safer-sex-practices': 'Safer-Sex-Praktiken, einvernehmlich abgesprochen',

  // Romantic
  'romantic__emotional-attraction': 'Emotionale Anziehung',
  'romantic__cultivating-uniqueness': 'Das Besondere/Einzigartige dieser einen Beziehung bewusst pflegen',
  'romantic__unmotivated-euphoria': 'Grundloses Hochgefühl – einfach so Freude und Begeisterung füreinander',
  'romantic__shared-experiences': 'Gemeinsame Erlebnisse',
  'romantic__intense-focus': 'Intensive, hingebungsvolle Aufmerksamkeit füreinander',
  'romantic__crushes': 'Verliebtheitsgefühle/Schwärmerei',

  // Creative
  'creative__visual-art': 'Bildende Kunst',
  'creative__craft': 'Handwerk/Basteln',
  'creative__critique': 'Sich gegenseitig ehrliches, konstruktives Feedback zu kreativen Werken geben',
  'creative__music': 'Musik',
  'creative__yoga': 'Yoga',
  'creative__comedy': 'Comedy/Humor',
  'creative__acrobatics': 'Akrobatik',
  'creative__dance': 'Tanzen',
  'creative__theatre': 'Theater',
  'creative__improv': 'Improvisationstheater',
  'creative__martial-arts': 'Kampfsport',

  // Things to Discuss
  'things-to-discuss__important-boundaries': 'Wichtige Grenzen klar benennen und respektieren',
  'things-to-discuss__mental-health-trauma': 'Psychische Gesundheit & Trauma offen ansprechen',
  'things-to-discuss__hard-conversations': 'Schwierige Gespräche nicht aufschieben, sondern aktiv führen',
  'things-to-discuss__security-privacy': 'Sicherheit & Privatsphäre gemeinsam aushandeln',
  'things-to-discuss__accountability': 'Verantwortung übernehmen und sich bei Bedarf gegenseitig Rechenschaft geben',
};

// Attach the full German translation/explanation as each item's German
// label now that ITEM_TRANSLATIONS is available — the detailed wording
// (e.g. "Geld – z. B. Einkommen, Ausgaben, finanzielle Offenheit") is used
// as-is as the primary item label when the UI is in German, rather than a
// shortened term. The English item name is still available as `item.label`
// and is shown as the secondary cross-reference line in German mode.
RA_CATEGORIES.forEach((category) => {
  category.items.forEach((item) => {
    item.labelDe = ITEM_TRANSLATIONS[item.id] || item.label;
  });
});
