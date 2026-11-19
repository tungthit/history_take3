# Implementation Plan: Sources for All Existing Knowledge

**Branch**: `002-knowledge-sources` | **Date**: 2026-11-19 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-knowledge-sources/spec.md`

## Summary

Add a `src` field to every knowledge entry the game ships (175 science milestones, 143 illustration captions,
about 3,900 history events), correct entries that their source contradicts, and keep a reviewable record of
every correction and every entry that could not be sourced. The work is done in 74 small batches (6 shown
science branches, 1 batch for the 3 hidden branches, 67 countries), each reviewed by the owner before the next.

Technical approach, in short:

1. **Data**: `src` is stored inline on each entry, as the constitution's Principle II and check C6 expect.
   Captions get their own `src`, or the explicit value `'milestone'` when the milestone's source covers them.
2. **Records**: one Markdown file per batch under `specs/002-knowledge-sources/batches/` (sources, corrections,
   decision items, counts) and one `progress.md` table.
3. **Checking**: one dependency-free Node script, `tools/knowledge/check-sources.mjs`, that counts coverage,
   compares entry counts with a frozen baseline, checks the format of each `src`, optionally opens every link,
   checks that the correction record matches the data, and draws the random audit sample.
4. **Nothing visual changes**. `docs/` is rebuilt after each batch because the data modules are bundled.

## Technical Context

**Language/Version**: JavaScript (ESM) data modules; Node.js 22 or later for the check script. It imports
`scistory.js` and `history/<iso2>.js` directly (checked on Node 26), and reads `history.js` and the caption files
as text, because `history.js` uses Vite's `import.meta.glob` and the caption files contain JSX

**Primary Dependencies**: none new. The check script uses only Node built-ins (`fs`, `path`, `url`, `fetch`)

**Storage**: the existing data modules (`source/src/geoflight/scistory.js`, `history.js`, `history/<iso2>.js`,
`sciart.jsx`, `art*.jsx`) plus Markdown records in `specs/002-knowledge-sources/`

**Testing**: no test framework (constitution). Verification is `check-sources.mjs`, the per-batch random audit
(SC-003) done by the owner, and the constitution's Compliance Checks

**Target Platform**: data shipped in the existing static site; the script runs on the developer's machine

**Project Type**: data curation inside the existing static web app

**Performance Goals**: adding `src` adds about 60 bytes per entry: about 3.5 KB raw (about 1 KB gzip) per
lazily loaded country chunk and about 10 KB raw to the science chunk. The first view of the game is unchanged
because none of this data is in the initial bundle

**Constraints**: entry counts never change (FR-008); text stays English (Principle X); no visual change (FR-011);
every correction is recorded (FR-007); one owner review per batch

**Scale/Scope**: 175 milestones, 143 captions, about 3,900 events in 67 countries; 74 batches

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.* Checked against constitution v2.0.0.

| Principle | Status | Notes |
|---|---|---|
| I. History browsing is the product | Pass | Serves every aspect shipped today: the six science branches and the 67 country histories. It is the knowledge base for browsing them. |
| II. Knowledge before visuals | Pass | This feature is Principle II applied to existing data: `src` on every entry, captions included, owner review per batch. It does not raise chemistry to 20 milestones (that needs new events, which FR-008 forbids); the gap is reported (SC-006). |
| III. Accurate visuals | Pass | No visual changes. Uncertain places use the existing `approx: true` flag, which the UI already discloses. |
| IV. Static site, committed `docs/` | Pass | Data modules are bundled, so `docs/` is rebuilt and committed with each batch. |
| V. three.js | Pass | Not touched. |
| VI. Source layout | Pass | Data stays in its modules. The Vietnam exception in `history.js` is left as it is (moving it is out of scope). New script goes in a new `tools/knowledge/` folder, separate from the baker because it processes no external dataset. |
| VII. Naming | Pass | `check-sources.mjs` lowercase; no new modules in `source/`. |
| VIII. Pinned dependencies | Pass | No dependency added. |
| IX. Baked data | Pass | No external dataset is processed. |
| X. English | Pass | Entry text stays English. A `src` may cite a non-English work; it is not user-facing in this feature. |
| XI. Code conventions | Pass | Script starts with a header comment; no TODO without an issue. |
| Workflow | Pass | One commit per batch with the `data:` type; the feature merges to `main` through a pull request. |

Result: **no violations**. Re-checked after design: still passing. Known gap, outside this feature: chemistry has
8 milestones while being shown (Compliance Check C7 fails before and after this feature).

## Project Structure

### Documentation (this feature)

```text
specs/002-knowledge-sources/
├── plan.md               # This file
├── research.md           # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/
│   ├── src-field.md      # format of the src value
│   ├── batch-record.md   # format of batches/<id>.md and progress.md
│   └── check-script.md   # command line of check-sources.mjs
├── baseline.json         # frozen entry inventory (made once, before batch 1)
├── progress.md           # one row per batch
├── batches/              # one record per batch: S1..S7, H01..H67
└── tasks.md              # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
tools/knowledge/
└── check-sources.mjs          # NEW: coverage, counts, format, links, corrections, audit sample

source/src/geoflight/
├── scistory.js                # + src on 175 milestones
├── sciart.jsx, art*.jsx       # + src on 143 captions (or 'milestone')
├── history.js                 # + src on the 86 Vietnam events
└── history/<iso2>.js          # + src on every event, 66 files

docs/                          # rebuilt after each batch
```

**Structure Decision**: Sources live inline in the entries so that a fact and its source can never drift apart
and the constitution's check C6 works on diffs. Records live with the spec, not in the game, because they are for
review and are not shipped.

## Complexity Tracking

> No constitution violations. Nothing to justify.
