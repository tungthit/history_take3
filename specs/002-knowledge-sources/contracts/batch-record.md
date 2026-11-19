# Contract: batch records and progress

## `batches/<id>.md` (one per batch)

```markdown
# Batch <id>: <scope>

**State**: ready for review | accepted   **Date**: YYYY-MM-DD

## Counts
| Entries | With src | Corrected | Decision items | Baseline count |

## Corrections
| Key | Field | Old | New | Source | Note |

## Decision items
| Key | Problem | Options | Decision |

## Audit (filled by the owner)
| Key | Source confirms year, place, claim? (yes / no) | Comment |
Result: N of M confirmed (SC-003 needs at least 95%).
```

Rules:
- Every changed value in the data appears once in Corrections, and every row there matches the data (SC-005).
- "Entries" equals "Baseline count" (SC-004).
- The batch is `accepted` only when the owner has filled the audit and the result is at least 95%.

## `progress.md`

One table, one row per batch, updated when a batch changes state:

| Batch | Scope | State | Entries | With src | Corrected | Decision items | Audit |
|---|---|---|---|---|---|---|---|
