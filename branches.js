// Science branches shared by the science data, the engine (flag colours) and the UI (filter chips).
// An event's `k` is one of these ids, so the history layer machinery draws it like any other event.
export const BRANCHES = [
  { id: 'math', e: '📐', t: 'Mathematics', c: 0x4a90e2 },
  { id: 'astro', e: '🔭', t: 'Astronomy', c: 0x7a6cf0 },
  { id: 'phys', e: '⚛️', t: 'Physics', c: 0xe8742f },
  { id: 'chem', e: '⚗️', t: 'Chemistry', c: 0x3fbf5f },
  { id: 'bio', e: '🧬', t: 'Biology', c: 0x8cd23b },
  { id: 'med', e: '🩺', t: 'Medicine', c: 0xe84a6f },
  { id: 'earth', e: '🌋', t: 'Earth', c: 0xa9794a },
  { id: 'tech', e: '⚙️', t: 'Engineering', c: 0xf2c14e },
  { id: 'cs', e: '💻', t: 'Computing', c: 0x20c9d6 }
];
export const BRANCH_BY_ID = Object.fromEntries(BRANCHES.map((b) => [b.id, b]));
export const BRANCH_ICON = Object.fromEntries(BRANCHES.map((b) => [b.id, b.e]));
export const BRANCH_COLOR = Object.fromEntries(BRANCHES.map((b) => [b.id, b.c]));
export const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;
