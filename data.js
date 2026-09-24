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
  { id: 'financial', ring: 'outer', title: 'Financial', items: [
    'Money', 'Payments', 'Responsibilities', 'Property', 'Sharing resources', 'Mutual aid', 'Businesses',
  ]},
  { id: 'power-hierarchy', ring: 'outer', title: 'Power / Hierarchy', items: [
    'Boss - employee', 'Sponsor - sponsee', 'Teacher - student', 'Mentor/guide',
  ]},
  { id: 'companionship', ring: 'outer', title: 'Companionship', items: [
    'Playfulness', 'Shared activity / interests', 'Intellectual & philosophical discussions', 'Friendship',
  ]},
  { id: 'religious-spiritual', ring: 'outer', title: 'Religious / Spiritual', items: [
    'Shared ritual / prayer', 'Shared beliefs', 'Discussions', 'Ceremony', 'Traditions', 'Magic', 'Divination',
  ]},
  { id: 'future-plans', ring: 'outer', title: 'Future Plans', items: [
    'Relationship duration', 'Children', 'Community', 'Living preferences', 'Career importance',
  ]},
  { id: 'labels-terms', ring: 'outer', title: 'Labels/Terms', items: [
    'Spouses', 'Parent', 'Cousin', 'Sibling', 'Datemate', 'Chosen family', 'Social media official', 'Terms of affection',
  ]},
  { id: 'marginalization', ring: 'outer', title: 'Marginalization, Privilege, Allyship, & Advocacy', items: [
    'Race', 'Disability', 'Gender', 'Class', 'Citizenship', 'Sexuality', 'Size', 'Beauty', 'Religion', 'Neurodivergence',
  ]},
  { id: 'legal', ring: 'outer', title: 'Legal', items: [
    'Power of attorney', 'Business partner', 'Adoption', 'Marriage', 'Executor of will', 'Civil partnership',
  ]},
  { id: 'pda', ring: 'outer', title: 'Public Displays of Affection', items: [
    'Events', 'Friends', 'Family', 'Work', 'Social media', 'Seen together', 'Outness',
  ]},
  { id: 'partnership', ring: 'outer', title: 'Partnership', items: [
    'Shared goals / values', 'Routine', 'Embracing change', 'Consistency', 'Commitment', 'Reliability',
  ]},
  { id: 'collaborative', ring: 'outer', title: 'Collaborative', items: [
    'Working together', 'Teaching', 'Projects', 'Organizations', 'Associations',
  ]},
  { id: 'exclusivity', ring: 'outer', title: 'Exclusivity', items: [
    'Sexual', 'Emotional', 'Social', 'Structural', 'Romantic', 'Specific activities',
  ]},
  { id: 'professional-work', ring: 'outer', title: 'Professional/Work', items: [
    'Combining social, collaborative, & financial', 'Colleagues', 'Partners', 'Co-operatives',
  ]},

  // ---- Inner ring: more personal / intimate themes ----
  { id: 'technology', ring: 'inner', title: 'Technology', items: [
    'Sharing accounts / licenses', 'Shared tools / consoles', 'Passwords',
  ]},
  { id: 'communication-methods', ring: 'inner', title: 'Communication Methods', items: [
    'Video', 'Phone', 'Text', 'Sexting', 'Written', 'In-person visits', 'Relationship meetings',
  ]},
  { id: 'communication-frequency', ring: 'inner', title: 'Communication Frequency', items: [
    'Daily', 'Weekly', 'Monthly', 'Annually', 'Inconsistently', 'Check-ins', 'Emergencies',
  ]},
  { id: 'domestic', ring: 'inner', title: 'Domestic', items: [
    'Routines', 'Chores', 'Sharing a dwelling/home', 'Sharing a sleeping space', 'Cooking together', 'Sharing meals',
  ]},
  { id: 'power-exchange-kink', ring: 'inner', title: 'Power Exchange & Kink', items: [
    'Roleplay', 'Bondage', 'Fetishes', 'Sadomasochism', 'Sensation', 'Dominance & submission', 'Switching',
  ]},
  { id: 'time-together', ring: 'inner', title: 'Time Spent Together', items: [
    'Holidays', 'Birthdays', 'Anniversaries', 'Errands', 'Parallel play', 'Frequency', 'Dates', 'Home', 'Duration',
  ]},
  { id: 'co-caregivers', ring: 'inner', title: 'Co-Caregivers', items: [
    'Family (sick, elderly)', 'Long-term commitment', 'Animals', 'Plants', 'Children',
  ]},
  { id: 'caregiving', ring: 'inner', title: 'Caregiving', items: [
    'Health', 'Sponsorship', 'Reliability', 'Emergencies', 'End of life / death', 'Receiving / giving care', 'Disability',
  ]},
  { id: 'emotional-support', ring: 'inner', title: 'Emotional Support', items: [
    'Listening', 'Empathy', 'Insecurities & reassurances', 'Being asked for advice', 'Confidante',
  ]},
  { id: 'emotional-intimacy', ring: 'inner', title: 'Emotional Intimacy', items: [
    'Being vulnerable', 'Discussing values / beliefs', 'Difficult conversations', 'Love languages',
  ]},
  { id: 'physical-intimacy', ring: 'inner', title: 'Physical Intimacy', items: [
    'Dance', 'Cuddles', 'Hugs', 'Pets', 'Massage', 'Hand-holding', 'Nudity', 'Kissing', 'Co-sleeping', 'Body contact',
  ]},
  { id: 'sexual', ring: 'inner', title: 'Sexual', items: [
    'Orgasms', 'Frequency', 'Involving genitals / anus', 'Touch', 'Voice', 'Text', 'STI testing & frequency', 'Safer sex practices',
  ]},
  { id: 'romantic', ring: 'inner', title: 'Romantic', items: [
    'Emotional attraction', 'Cultivating uniqueness', 'Unmotivated euphoria', 'Shared experiences', 'Intense focus', 'Crushes',
  ]},
  { id: 'creative', ring: 'inner', title: 'Creative', items: [
    'Visual art', 'Craft', 'Critique', 'Music', 'Yoga', 'Comedy', 'Acrobatics', 'Dance', 'Theatre', 'Improv', 'Martial arts',
  ]},
  { id: 'things-to-discuss', ring: 'inner', title: 'Things to Discuss', items: [
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
