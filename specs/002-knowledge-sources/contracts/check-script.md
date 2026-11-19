# Contract: `tools/knowledge/check-sources.mjs`

Runs from the repo root with Node.js 22 or later. No dependencies. Exit code 0 when every check passes, 1
otherwise. Output is Markdown, so it can be pasted into a batch record.

## Commands

| Command | What it does |
|---|---|
| `node tools/knowledge/check-sources.mjs baseline` | Writes `specs/002-knowledge-sources/baseline.json`. Refuses to overwrite an existing file. |
| `node tools/knowledge/check-sources.mjs status [batch]` | Coverage per batch: entries, with `src`, `approx`, counts against the baseline. |
| `node tools/knowledge/check-sources.mjs verify <batch>` | Fails unless: every entry of the batch has a valid `src` (contracts/src-field.md); counts equal the baseline; every correction row in `batches/<batch>.md` matches the data. |
| `node tools/knowledge/check-sources.mjs verify <batch> --links` | As above, and requests every URL; reports any that does not answer with a success or a redirect. |
| `node tools/knowledge/check-sources.mjs audit <batch> [--n 50] [--seed N]` | Prints a seeded random sample for the owner's audit (SC-003), as the audit table of the batch record. |

## How it reads the data

- `scistory.js` and `history/<iso2>.js` are imported as ES modules.
- `history.js` (Vietnam) is read as text: it uses Vite's `import.meta.glob`, which Node cannot run. Events are
  matched per line (`{ n: '...' ... }`), with the era from the enclosing `id:`.
- Captions are read as text from `sciart.jsx` and `art*.jsx` (they contain JSX): the `id: { cap: '...', src: ... }`
  pairs are matched per entry.

## Guarantees

- Read-only on the data, except `baseline`, which writes only `baseline.json`.
- Same input and seed give the same output.
