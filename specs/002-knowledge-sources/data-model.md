# Data Model: Sources for All Existing Knowledge

## Knowledge entry (existing, extended)

Three kinds, all gaining one field.

| Kind | Where | Key | Existing fields | New field |
|---|---|---|---|---|
| Science milestone | `scistory.js` `RAW` | `id` | `n, y, yl, p, k, who, need, how, so, from` | `src` |
| Caption | `sciart.jsx`, `art*.jsx` | milestone `id` | `cap, el` | `src` |
| History event | `history.js` (Vietnam), `history/<iso2>.js` | `<iso2>/<era id>/<index>` | `n, y, lat, lon, approx?, k, vn?, vs?, d` | `src` |

Validation rules:
- `src` is required on every entry when its batch is closed ([contracts/src-field.md](./contracts/src-field.md)).
- A caption's `src` may be `'milestone'` only when the milestone's `src` confirms every fact in the caption.
- `approx: true` is set when the source gives no precise place.
- Counts per batch are equal to the baseline (no entry added or removed).
- Text fields stay in English.

## Source (value of `src`)

A string or an array of strings. Each string is an `https://` URL or a findable citation. See the contract.

## Baseline

`specs/002-knowledge-sources/baseline.json`, written once before batch S1 and never edited afterwards.

| Field | Meaning |
|---|---|
| `created` | date |
| `science[]` | `{ id, k, n }` for each milestone |
| `captions[]` | `{ id, file }` for each caption |
| `history[]` | `{ key, n }` for each event, key `<iso2>/<era id>/<index>` |
| `counts` | totals per batch |

## Batch

| Field | Meaning |
|---|---|
| `id` | `S1`-`S7`, `H01`-`H67` |
| `scope` | branch(es) or country |
| `state` | `todo` → `in progress` → `ready for review` → `accepted` |
| `counts` | entries, with `src`, corrected, decision items |

Order: S1 math, S2 cs, S3 phys, S4 chem, S5 bio, S6 med, S7 astro + earth + tech, then H01-H67 in
`HISTORY_REGIONS` order (Vietnam first). A batch moves to `accepted` only after the owner's audit (SC-003).

## Correction

| Field | Meaning |
|---|---|
| `key` | entry key |
| `field` | one of `n, y, yl, lat, lon, p, approx, d, need, how, so, cap, who, vn, vs` |
| `old` | value before |
| `new` | value after (must equal the data) |
| `source` | the `src` that justifies it |
| `note` | why, when sources disagree |

## Decision item

| Field | Meaning |
|---|---|
| `key` | entry key |
| `problem` | no acceptable source, or the claim is contested |
| `options` | keep as is, reword, mark as legend, remove (removal only by the owner, outside this feature) |
| `decision` | filled by the owner |
