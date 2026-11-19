# Quickstart: validate a batch of sources

Run from the repo root. Node.js 22 or later.

## Once, before the first batch

```sh
node tools/knowledge/check-sources.mjs baseline
```

Expected: `specs/002-knowledge-sources/baseline.json` written, with 175 milestones, 143 captions and about 3,900
events (the exact totals are printed).

## For each batch (example: S1, mathematics)

```sh
node tools/knowledge/check-sources.mjs verify S1 --links
node tools/knowledge/check-sources.mjs audit S1 --n 50 --seed 1
cd source && npm run build && cd ..
git status --short docs/
```

Expected:
- `verify` exits 0: every entry has a valid `src`, counts equal the baseline, every correction matches the data,
  no dead link.
- `audit` prints the sample; the owner checks each source and fills the audit table in `batches/S1.md`.
- The build succeeds; `docs/` changes only in the chunk that contains the batch's data.

## Scenarios

| Check | Steps | Expected |
|---|---|---|
| Coverage (SC-001, SC-002) | `node tools/knowledge/check-sources.mjs status` | finished batches show 100% with `src` or listed as decision items |
| Accuracy (SC-003) | the owner's audit of 50 entries per batch | at least 95% confirmed |
| No entry added or removed (SC-004) | `verify <batch>` | counts equal the baseline |
| Corrections recorded (SC-005) | `verify <batch>` | zero mismatches between records and data |
| Chemistry minimum (SC-006) | `status` | chemistry reported with 8 milestones, below the constitution's 20 |
| No visual change (FR-011, FR-013) | open the game, Science layer and two finished countries | same look; only corrected facts differ |
| English text (FR-012) | read the corrections table | all new values in English |
| Constitution C6 | `git diff main -- source/src/geoflight \| grep "^+.*{ n: '" \| grep -v "src:"` | no output |
