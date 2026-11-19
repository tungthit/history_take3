# Research: Sources for All Existing Knowledge

Facts about the current data come from reading the modules on 2026-11-19.

## Findings about the current data

- **Science** (`scistory.js`): one `RAW` array of 175 objects with an `id`, name `n`, year `y`, year label `yl`,
  place `p: [lat, lon]`, branch `k`, people `who`, and the texts `need`, `how`, `so`, plus `from`. The six shown
  branches (`ACTIVE`) hold 143 entries: cs 35, med 30, phys 25, bio 23, math 22, chem 8. Hidden: astro 14,
  earth 9, tech 9. The header comment already says "dates marked ~ are traditional or approximate".
- **Captions**: 143 `cap` strings in `sciart.jsx` (36), `artmath.jsx` (25, including `ART_PHYS0`),
  `artphys.jsx` (29), `artbio.jsx` (23), `artmed.jsx` (30), keyed by milestone `id`. They sit next to JSX, so
  Node cannot import these files; they must be read as text.
- **History**: 66 files `history/<iso2>.js` (3,812 events) plus Vietnam inside `history.js` (86 events), so about
  3,900 events in 67 countries. Each file is `export default { iso, name, flag, eras: [{ id, t, y, d, ev: [...] }] }`.
  An event has `n`, `y` (free text such as `'~1500 BCE'` or `'27/1/2018'`), `lat`, `lon`, optional `approx`,
  `k` (kind), optional `vn` / `vs` (the two sides), and `d`. 1,016 events already carry `approx: true`.
- **No entry has a source today.**
- `history/*.js` and `scistory.js` import nothing and load in Node 26 (checked on 2026-11-19; Node prints a
  warning that it reparses them as ES modules because `source/package.json` has no `"type": "module"`).
  **`history.js` does not load in Node**: it calls `import.meta.glob` (a Vite feature) at module level, so the
  86 Vietnam events must be read as text, like the captions.

## Decision 1: Where `src` lives

- **Decision**: inline, as a last field of each entry: `src: '...'` or `src: ['...', '...']`.
- **Rationale**: a fact and its source travel together in every edit and diff; the constitution's Principle II
  and check C6 look for `src:` on the entry line. Cost is small (see plan, Performance Goals) and only in lazy chunks.
- **Alternatives considered**: a separate sources file per country keyed by event index (breaks whenever an event
  is moved or renamed, and C6 could not see it); a central bibliography with ids (more indirection than the
  data needs, and still needs a key per event).

## Decision 2: What a `src` value looks like

- **Decision**: a string that is either an `https://` URL, or a citation "Title, Author or Publisher, Year" that
  can be found without the link; an array when two sources are needed (for example an official page plus the
  encyclopedia article). Captions may use the literal `'milestone'`, meaning "covered by the milestone's src".
  Full rules in [contracts/src-field.md](./contracts/src-field.md).
- **Rationale**: matches FR-004 (link or findable citation) and FR-002 (explicit reliance on the milestone).
- **Alternatives considered**: structured objects `{ url, title, publisher }` (heavier to write by hand for 4,200
  entries, and the game does not show sources yet).

## Decision 3: Source priority

- **Decision**: in this order, the first that confirms the entry is used: (1) official or primary bodies:
  national archives, statistics or heritage bodies, UNESCO World Heritage listings, the Nobel Prize site, the
  institution that made the discovery, the original publication (DOI); (2) scholarly references: Britannica,
  university pages, peer-reviewed reviews; (3) Wikipedia (English first). A Wikipedia link is acceptable alone
  only when no source of kind 1 or 2 is reasonably available.
- **Rationale**: FR-005 and constitution Principle II ("official data MUST be used where it exists").
- **Alternatives considered**: Wikipedia for everything (fast, but against FR-005); official only (impossible
  for legends and many ancient events).

## Decision 4: Corrections and decision items

- **Decision**: a correction changes the data to what the source says and is written to the batch record with
  the entry key, field, old value, new value and source. Allowed fields: `n`, `y`, `yl`, `lat`, `lon`, `p`,
  `approx`, and wording in `d`, `need`, `how`, `so`, `cap`, `who`, `vn`, `vs`. An entry that no acceptable source
  confirms is not edited: it becomes a decision item for the owner. Legends must be labelled as legend
  (`k: 'legend'` already exists for history; for science, the wording must say "tradition says").
- **Rationale**: FR-006 to FR-008; Principle III forbids untrue content, and deleting is the owner's call.

## Decision 5: Entry identity (for counts and correction records)

- **Decision**: science milestones and captions by their `id`; history events by
  `<iso2>/<era id>/<index in era>` plus the original name. A frozen `baseline.json` lists every key with its name
  before batch 1; the check script compares against it.
- **Rationale**: history events have no id; index within era is stable as long as no event is added or removed,
  which FR-008 guarantees.
- **Alternatives considered**: adding ids to all 3,900 events (a large, unrelated change to the data format).

## Decision 6: Batches and order

- **Decision**: S1-S6 = the shown science branches, smallest risk first: math, cs, phys, chem, bio, med
  (milestones and their captions together). S7 = the three hidden branches. H01-H67 = countries in the order of
  `HISTORY_REGIONS` (Vietnam first). Each batch: research, edit, run the check script, write the record, owner
  audit, commit `data: sources for <batch>`, rebuild `docs/`.
- **Rationale**: FR-009; the owner reviews about 25 entries per science batch and about 58 per country.

## Decision 7: Verification without a test framework

- **Decision**: one script `tools/knowledge/check-sources.mjs` with Node built-ins only. It imports `scistory.js` and
  `history/<iso2>.js`, and reads `history.js` (Vietnam) and the caption files as text. It reports coverage per
  batch, compares counts with the baseline (SC-004), validates every `src` format, optionally requests every URL
  (`--links`), checks that each correction in the records matches the data (SC-005), and prints a seeded random
  sample of 50 entries per batch for the owner's audit (SC-003). Command line in
  [contracts/check-script.md](./contracts/check-script.md).
- **Rationale**: the constitution adds no test tooling; a script with no dependency follows Principle VIII.
- **Alternatives considered**: manual counting (error-prone at 4,200 entries); adding a test framework (needs a
  constitution amendment).

## Risks

- **Effort**: about 4,200 entries. At about 2 minutes per entry this is well over 100 hours; batches keep it
  reviewable and let work stop at any batch boundary.
- **Link rot**: citations carry a title and publisher as well as the link where possible.
- **Disputed history** (borders, wars, national narratives): the record notes which source was chosen and why;
  the owner decides contested items.
- **Chemistry stays at 8 milestones**: reported, not fixed here (SC-006).
