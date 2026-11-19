---

description: "Task list for Sources for All Existing Knowledge"
---

# Tasks: Sources for All Existing Knowledge

**Input**: Design documents from `/specs/002-knowledge-sources/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ (`src-field.md`, `batch-record.md`, `check-script.md`), quickstart.md

**Tests**: Not requested. Verification is `tools/knowledge/check-sources.mjs` plus the owner's random audit per batch (SC-003), as the constitution adds no test framework.

**Organization**: Grouped by user story. Paths are relative to the repository root. `G` = `source/src/geoflight`, `K` = `specs/002-knowledge-sources`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an unfinished task)
- **[Story]**: US1, US2, US3 from spec.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Folders and the records the batches write into.

- [ ] T001 Create the folder `tools/knowledge/` and the folder `K/batches/` (with a `.gitkeep`), as in plan.md Project Structure
- [ ] T002 [P] Create `K/progress.md` with the table of contracts/batch-record.md and one row per batch: `S1`-`S7` and `H01`-`H67` (data-model.md Batch.id; scope from data-model.md Batch order), all with data-model.md Batch.state `todo`
- [ ] T003 [P] Create `K/batches/TEMPLATE.md` from contracts/batch-record.md (Counts, Corrections, Decision items, Audit) for each batch to copy

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The check script and the frozen baseline. Every batch is verified with them.

**⚠️ CRITICAL**: No batch can start until the baseline exists.

- [ ] T004 Create `tools/knowledge/check-sources.mjs` with a header comment (constitution XI), Node built-ins only, and the data readers of contracts/check-script.md "How it reads the data": import `G/scistory.js` and `G/history/<iso2>.js`; read `G/history.js` (Vietnam `ERAS`) and the caption files `G/sciart.jsx` and `G/art*.jsx` as text. Each reader returns entries with their key per research.md Decision 5 and their `src`
- [ ] T005 Add the `baseline` command to `tools/knowledge/check-sources.mjs`: write `K/baseline.json` with data-model.md Baseline.created, Baseline.science, Baseline.captions, Baseline.history and Baseline.counts; refuse to overwrite an existing file
- [ ] T006 Add the `status [batch]` command to `tools/knowledge/check-sources.mjs`: per batch, entries, with `src`, with `approx`, and the count against the baseline, printed as the table of contracts/batch-record.md `progress.md`
- [ ] T007 Add the `verify <batch> [--links]` command to `tools/knowledge/check-sources.mjs`: every entry of the batch has a valid value per data-model.md Knowledge entry.src and contracts/src-field.md (caption value `'milestone'` allowed only for captions); counts equal the baseline (SC-004); every row of the Corrections table in `K/batches/<batch>.md` names a field allowed by data-model.md Correction.field and its Correction.new equals the data (SC-005); with `--links`, every URL answers with a success or redirect; exit 1 on any failure
- [ ] T008 Add the `audit <batch> [--n 50] [--seed N]` command to `tools/knowledge/check-sources.mjs`: a seeded random sample printed as the Audit table of contracts/batch-record.md (SC-003)
- [ ] T009 Run `node tools/knowledge/check-sources.mjs baseline` once, check the printed totals (175 milestones, 143 captions, about 3,900 events in 67 countries; research.md Findings) and commit `K/baseline.json` together with the script
- [ ] T010 Run `node tools/knowledge/check-sources.mjs status` and confirm every batch shows 0 entries with `src` and counts equal to the baseline; fix the readers if any count differs

**Checkpoint**: `status` lists 74 batches with their baseline counts; nothing in `G/` has changed yet.

---

## Phase 3: User Story 1 - Every science milestone can be traced to a source (Priority: P1) 🎯 MVP

**Goal**: Every science milestone and illustration caption carries a source that confirms it; errors found are corrected and recorded.

**Independent Test**: For a finished branch, `verify` passes and the owner's audit of a random sample confirms at least 95% (quickstart.md, Scenarios). History data is untouched.

**Procedure for every science batch** (research.md Decisions 2-4 and 6): research each entry, prefer official sources (contracts/src-field.md Priority); add `src` as the last field; correct only the fields allowed by data-model.md Correction.field and write each change to the batch record; never add or remove an entry (FR-008); entries no acceptable source confirms go to Decision items with the choices of data-model.md Decision item.options; keep all text in English.

### Batch S1: Mathematics (22 milestones)

- [ ] T011 [US1] S1: add `src` (data-model.md Knowledge entry.src) to the 22 milestones with `k: 'math'` in `G/scistory.js`, and apply the corrections the sources require (data-model.md Correction.field)
- [ ] T012 [US1] S1: add `src` to the captions of the same milestones, found mainly in `G/artmath.jsx` and `G/sciart.jsx` (`status S1` lists every caption of the batch): own source, or `'milestone'` only when the milestone source confirms every fact in the caption (FR-002)
- [ ] T013 [US1] S1: write `K/batches/S1.md` from `K/batches/TEMPLATE.md` (counts, corrections, decision items), set data-model.md Batch.state to `ready for review` in `K/progress.md`
- [ ] T014 [US1] S1: run `node tools/knowledge/check-sources.mjs verify S1 --links` until it passes, paste `audit S1 --n 50 --seed 1` into `K/batches/S1.md`, rebuild `docs/` (`npm run build` in `source/`), commit `data: sources for mathematics milestones`, and stop for the owner's audit; when it confirms at least 95%, set data-model.md Batch.state to `accepted` in `K/progress.md`

### Batch S2: Computing (35 milestones)

- [ ] T015 [US1] S2: add `src` (data-model.md Knowledge entry.src) to the 35 milestones with `k: 'cs'` in `G/scistory.js`, and apply the corrections the sources require (data-model.md Correction.field)
- [ ] T016 [US1] S2: add `src` to the captions of the same milestones, found mainly in `G/sciart.jsx` and `G/artmath.jsx` (`status S2` lists every caption of the batch): own source, or `'milestone'` only when the milestone source confirms every fact in the caption (FR-002)
- [ ] T017 [US1] S2: write `K/batches/S2.md` from `K/batches/TEMPLATE.md` (counts, corrections, decision items), set data-model.md Batch.state to `ready for review` in `K/progress.md`
- [ ] T018 [US1] S2: run `node tools/knowledge/check-sources.mjs verify S2 --links` until it passes, paste `audit S2 --n 50 --seed 1` into `K/batches/S2.md`, rebuild `docs/` (`npm run build` in `source/`), commit `data: sources for computing milestones`, and stop for the owner's audit; when it confirms at least 95%, set data-model.md Batch.state to `accepted` in `K/progress.md`

### Batch S3: Physics (25 milestones)

- [ ] T019 [US1] S3: add `src` (data-model.md Knowledge entry.src) to the 25 milestones with `k: 'phys'` in `G/scistory.js`, and apply the corrections the sources require (data-model.md Correction.field)
- [ ] T020 [US1] S3: add `src` to the captions of the same milestones, found mainly in `G/artphys.jsx` and `G/artmath.jsx` (`ART_PHYS0`) (`status S3` lists every caption of the batch): own source, or `'milestone'` only when the milestone source confirms every fact in the caption (FR-002)
- [ ] T021 [US1] S3: write `K/batches/S3.md` from `K/batches/TEMPLATE.md` (counts, corrections, decision items), set data-model.md Batch.state to `ready for review` in `K/progress.md`
- [ ] T022 [US1] S3: run `node tools/knowledge/check-sources.mjs verify S3 --links` until it passes, paste `audit S3 --n 50 --seed 1` into `K/batches/S3.md`, rebuild `docs/` (`npm run build` in `source/`), commit `data: sources for physics milestones`, and stop for the owner's audit; when it confirms at least 95%, set data-model.md Batch.state to `accepted` in `K/progress.md`

### Batch S4: Chemistry (8 milestones)

- [ ] T023 [US1] S4: add `src` (data-model.md Knowledge entry.src) to the 8 milestones with `k: 'chem'` in `G/scistory.js`, and apply the corrections the sources require (data-model.md Correction.field)
- [ ] T024 [US1] S4: add `src` to the captions of the same milestones, found mainly in `G/artphys.jsx` (`status S4` lists every caption of the batch): own source, or `'milestone'` only when the milestone source confirms every fact in the caption (FR-002)
- [ ] T025 [US1] S4: write `K/batches/S4.md` from `K/batches/TEMPLATE.md` (counts, corrections, decision items), set data-model.md Batch.state to `ready for review` in `K/progress.md`
- [ ] T026 [US1] S4: run `node tools/knowledge/check-sources.mjs verify S4 --links` until it passes, paste `audit S4 --n 50 --seed 1` into `K/batches/S4.md`, rebuild `docs/` (`npm run build` in `source/`), commit `data: sources for chemistry milestones`, and stop for the owner's audit; when it confirms at least 95%, set data-model.md Batch.state to `accepted` in `K/progress.md`

### Batch S5: Biology (23 milestones)

- [ ] T027 [US1] S5: add `src` (data-model.md Knowledge entry.src) to the 23 milestones with `k: 'bio'` in `G/scistory.js`, and apply the corrections the sources require (data-model.md Correction.field)
- [ ] T028 [US1] S5: add `src` to the captions of the same milestones, found mainly in `G/artbio.jsx` (`status S5` lists every caption of the batch): own source, or `'milestone'` only when the milestone source confirms every fact in the caption (FR-002)
- [ ] T029 [US1] S5: write `K/batches/S5.md` from `K/batches/TEMPLATE.md` (counts, corrections, decision items), set data-model.md Batch.state to `ready for review` in `K/progress.md`
- [ ] T030 [US1] S5: run `node tools/knowledge/check-sources.mjs verify S5 --links` until it passes, paste `audit S5 --n 50 --seed 1` into `K/batches/S5.md`, rebuild `docs/` (`npm run build` in `source/`), commit `data: sources for biology milestones`, and stop for the owner's audit; when it confirms at least 95%, set data-model.md Batch.state to `accepted` in `K/progress.md`

### Batch S6: Medicine (30 milestones)

- [ ] T031 [US1] S6: add `src` (data-model.md Knowledge entry.src) to the 30 milestones with `k: 'med'` in `G/scistory.js`, and apply the corrections the sources require (data-model.md Correction.field)
- [ ] T032 [US1] S6: add `src` to the captions of the same milestones, found mainly in `G/artmed.jsx` (`status S6` lists every caption of the batch): own source, or `'milestone'` only when the milestone source confirms every fact in the caption (FR-002)
- [ ] T033 [US1] S6: write `K/batches/S6.md` from `K/batches/TEMPLATE.md` (counts, corrections, decision items), set data-model.md Batch.state to `ready for review` in `K/progress.md`
- [ ] T034 [US1] S6: run `node tools/knowledge/check-sources.mjs verify S6 --links` until it passes, paste `audit S6 --n 50 --seed 1` into `K/batches/S6.md`, rebuild `docs/` (`npm run build` in `source/`), commit `data: sources for medicine milestones`, and stop for the owner's audit; when it confirms at least 95%, set data-model.md Batch.state to `accepted` in `K/progress.md`

### Batch S7: Astronomy, Earth science and Technology (hidden branches) (32 milestones)

- [ ] T035 [US1] S7: add `src` (data-model.md Knowledge entry.src) to the 32 milestones with `k: 'astro'`, `k: 'earth'`, `k: 'tech'` in `G/scistory.js`, and apply the corrections the sources require (data-model.md Correction.field)
- [ ] T036 [US1] S7: write `K/batches/S7.md` from `K/batches/TEMPLATE.md` (counts, corrections, decision items), set data-model.md Batch.state to `ready for review` in `K/progress.md`
- [ ] T037 [US1] S7: run `node tools/knowledge/check-sources.mjs verify S7 --links` until it passes, paste `audit S7 --n 50 --seed 1` into `K/batches/S7.md`, rebuild `docs/` (`npm run build` in `source/`), commit `data: sources for astronomy, earth science and technology milestones`, and stop for the owner's audit; when it confirms at least 95%, set data-model.md Batch.state to `accepted` in `K/progress.md`

**Checkpoint**: `status` shows S1-S6 at 100% (SC-001) and S7 at 100% or decision items. The Science layer looks the same.

---

## Phase 4: User Story 2 - Every history event can be traced to a source (Priority: P2)

**Goal**: Every event of every country carries a source; uncertain places are marked approximate.

**Independent Test**: For a finished country, `verify` passes and the owner's audit of 10-50 random events confirms at least 95% (quickstart.md). Other countries are unaffected.

**Procedure for every country batch**: as for science (Phase 3), on the country's events; set `approx: true` when the source gives no precise place; legends stay `k: 'legend'` and are worded as tradition. Then: write `K/batches/<id>.md`, run `verify <id> --links`, paste `audit <id> --n 50 --seed 1`, rebuild `docs/`, commit `data: sources for <country> history`, update data-model.md Batch.state in `K/progress.md`, and stop for the owner's audit. Each task below is one whole batch.


### Southeast Asia

- [ ] T038 [US2] H01 Vietnam (86 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history.js` (the `ERAS` array; Vietnam is the documented exception of constitution VI), apply corrections, write `K/batches/H01.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T039 [US2] H02 Laos (47 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/la.js`, apply corrections, write `K/batches/H02.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T040 [US2] H03 Cambodia (57 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/kh.js`, apply corrections, write `K/batches/H03.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T041 [US2] H04 Thailand (62 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/th.js`, apply corrections, write `K/batches/H04.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T042 [US2] H05 Myanmar (55 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/mm.js`, apply corrections, write `K/batches/H05.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T043 [US2] H06 Malaysia (35 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/my.js`, apply corrections, write `K/batches/H06.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T044 [US2] H07 Singapore (35 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/sg.js`, apply corrections, write `K/batches/H07.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T045 [US2] H08 Indonesia (54 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/id.js`, apply corrections, write `K/batches/H08.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T046 [US2] H09 Philippines (42 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ph.js`, apply corrections, write `K/batches/H09.md`, verify, audit, rebuild `docs/`, commit, owner audit

### East Asia

- [ ] T047 [US2] H10 China (101 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/cn.js`, apply corrections, write `K/batches/H10.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T048 [US2] H11 Japan (91 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/jp.js`, apply corrections, write `K/batches/H11.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T049 [US2] H12 South Korea (82 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/kr.js`, apply corrections, write `K/batches/H12.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T050 [US2] H13 Mongolia (68 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/mn.js`, apply corrections, write `K/batches/H13.md`, verify, audit, rebuild `docs/`, commit, owner audit

### South Asia

- [ ] T051 [US2] H14 India (77 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/in.js`, apply corrections, write `K/batches/H14.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T052 [US2] H15 Pakistan (60 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/pk.js`, apply corrections, write `K/batches/H15.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T053 [US2] H16 Bangladesh (52 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/bd.js`, apply corrections, write `K/batches/H16.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T054 [US2] H17 Nepal (45 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/np.js`, apply corrections, write `K/batches/H17.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T055 [US2] H18 Sri Lanka (48 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/lk.js`, apply corrections, write `K/batches/H18.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T056 [US2] H19 Afghanistan (51 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/af.js`, apply corrections, write `K/batches/H19.md`, verify, audit, rebuild `docs/`, commit, owner audit

### Middle East, Central Asia

- [ ] T057 [US2] H20 Turkey (87 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/tr.js`, apply corrections, write `K/batches/H20.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T058 [US2] H21 Iran (53 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ir.js`, apply corrections, write `K/batches/H21.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T059 [US2] H22 Iraq (53 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/iq.js`, apply corrections, write `K/batches/H22.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T060 [US2] H23 Syria (51 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/sy.js`, apply corrections, write `K/batches/H23.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T061 [US2] H24 Israel (63 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/il.js`, apply corrections, write `K/batches/H24.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T062 [US2] H25 Saudi Arabia (59 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/sa.js`, apply corrections, write `K/batches/H25.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T063 [US2] H26 Kazakhstan (46 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/kz.js`, apply corrections, write `K/batches/H26.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T064 [US2] H27 Uzbekistan (47 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/uz.js`, apply corrections, write `K/batches/H27.md`, verify, audit, rebuild `docs/`, commit, owner audit

### Europe

- [ ] T065 [US2] H28 United Kingdom (97 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/gb.js`, apply corrections, write `K/batches/H28.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T066 [US2] H29 Ireland (56 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ie.js`, apply corrections, write `K/batches/H29.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T067 [US2] H30 France (99 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/fr.js`, apply corrections, write `K/batches/H30.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T068 [US2] H31 Spain (60 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/es.js`, apply corrections, write `K/batches/H31.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T069 [US2] H32 Portugal (49 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/pt.js`, apply corrections, write `K/batches/H32.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T070 [US2] H33 Netherlands (54 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/nl.js`, apply corrections, write `K/batches/H33.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T071 [US2] H34 Belgium (44 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/be.js`, apply corrections, write `K/batches/H34.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T072 [US2] H35 Switzerland (39 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ch.js`, apply corrections, write `K/batches/H35.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T073 [US2] H36 Germany (104 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/de.js`, apply corrections, write `K/batches/H36.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T074 [US2] H37 Austria (46 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/at.js`, apply corrections, write `K/batches/H37.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T075 [US2] H38 Italy (88 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/it.js`, apply corrections, write `K/batches/H38.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T076 [US2] H39 Greece (82 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/gr.js`, apply corrections, write `K/batches/H39.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T077 [US2] H40 Poland (54 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/pl.js`, apply corrections, write `K/batches/H40.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T078 [US2] H41 Czechia (42 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/cz.js`, apply corrections, write `K/batches/H41.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T079 [US2] H42 Hungary (40 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/hu.js`, apply corrections, write `K/batches/H42.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T080 [US2] H43 Romania (39 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ro.js`, apply corrections, write `K/batches/H43.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T081 [US2] H44 Ukraine (64 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ua.js`, apply corrections, write `K/batches/H44.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T082 [US2] H45 Russia (110 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ru.js`, apply corrections, write `K/batches/H45.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T083 [US2] H46 Sweden (48 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/se.js`, apply corrections, write `K/batches/H46.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T084 [US2] H47 Norway (41 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/no.js`, apply corrections, write `K/batches/H47.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T085 [US2] H48 Denmark (45 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/dk.js`, apply corrections, write `K/batches/H48.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T086 [US2] H49 Finland (36 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/fi.js`, apply corrections, write `K/batches/H49.md`, verify, audit, rebuild `docs/`, commit, owner audit

### Africa

- [ ] T087 [US2] H50 Egypt (75 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/eg.js`, apply corrections, write `K/batches/H50.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T088 [US2] H51 Morocco (51 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ma.js`, apply corrections, write `K/batches/H51.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T089 [US2] H52 Ethiopia (53 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/et.js`, apply corrections, write `K/batches/H52.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T090 [US2] H53 Kenya (43 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ke.js`, apply corrections, write `K/batches/H53.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T091 [US2] H54 Nigeria (45 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ng.js`, apply corrections, write `K/batches/H54.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T092 [US2] H55 Ghana (34 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/gh.js`, apply corrections, write `K/batches/H55.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T093 [US2] H56 South Africa (46 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/za.js`, apply corrections, write `K/batches/H56.md`, verify, audit, rebuild `docs/`, commit, owner audit

### The Americas

- [ ] T094 [US2] H57 United States (111 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/us.js`, apply corrections, write `K/batches/H57.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T095 [US2] H58 Canada (68 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ca.js`, apply corrections, write `K/batches/H58.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T096 [US2] H59 Mexico (60 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/mx.js`, apply corrections, write `K/batches/H59.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T097 [US2] H60 Cuba (44 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/cu.js`, apply corrections, write `K/batches/H60.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T098 [US2] H61 Colombia (44 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/co.js`, apply corrections, write `K/batches/H61.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T099 [US2] H62 Peru (55 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/pe.js`, apply corrections, write `K/batches/H62.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T100 [US2] H63 Brazil (45 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/br.js`, apply corrections, write `K/batches/H63.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T101 [US2] H64 Argentina (50 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/ar.js`, apply corrections, write `K/batches/H64.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T102 [US2] H65 Chile (47 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/cl.js`, apply corrections, write `K/batches/H65.md`, verify, audit, rebuild `docs/`, commit, owner audit

### Oceania

- [ ] T103 [US2] H66 Australia (46 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/au.js`, apply corrections, write `K/batches/H66.md`, verify, audit, rebuild `docs/`, commit, owner audit
- [ ] T104 [US2] H67 New Zealand (37 events): add `src` (data-model.md Knowledge entry.src) to every event in `source/src/geoflight/history/nz.js`, apply corrections, write `K/batches/H67.md`, verify, audit, rebuild `docs/`, commit, owner audit

**Checkpoint**: `status` shows H01-H67 at 100% with `src` or as decision items (SC-002 for history).

---

## Phase 5: User Story 3 - Errors found on the way are fixed and recorded (Priority: P2)

**Goal**: Every correction is reviewable and every unsourced entry has an owner decision.

**Independent Test**: A full `verify` over all batches reports zero mismatches between records and data, and every decision item has a decision (quickstart.md, "Corrections recorded").

*Corrections are made inside every batch of US1 and US2; the tasks below close the loop across batches.*

- [ ] T105 [US3] Collect every Decision item from `K/batches/*.md` into `K/decisions.md` (key, batch, problem, data-model.md Decision item.options, empty data-model.md Decision item.decision column) for the owner
- [ ] T106 [US3] After the owner fills data-model.md Decision item.decision in `K/decisions.md`, apply each decision that keeps the entry (reword, mark as legend, add `src`) in the data module named by its key, recording each change in the Corrections table of its batch; an entry the owner wants removed is listed for a separate feature, not removed here (FR-008)
- [ ] T107 [US3] Run `verify` for all 74 batches (a loop over `S1`-`S7`, `H01`-`H67`) and confirm zero mismatches between correction records and data (SC-005) and counts equal to the baseline (SC-004)

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T108 Run `node tools/knowledge/check-sources.mjs status` and record the final coverage in `K/progress.md`: 100% with `src` or listed as decision items (SC-002)
- [ ] T109 [P] Report the science branches shown with fewer than 20 sourced milestones in `K/progress.md` (chemistry has 8; SC-006, constitution check C7) and propose a follow-up feature to the owner
- [ ] T110 [P] Run the constitution's Compliance Checks C2, C5, C6 and C9 from `.specify/memory/constitution.md` against the feature branch and record the results in `K/progress.md`
- [ ] T111 Walk through all scenarios of `K/quickstart.md`, including "No visual change" in the running game
- [ ] T112 [P] List the follow-ups agreed with the owner in `K/progress.md`: show `src` to users in the game, chemistry milestones, sources for `G/landmarks.js` and `G/places.js`

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (Phase 1)**: no dependencies.
- **Foundational (Phase 2)**: depends on Setup. Blocks every batch: the baseline must be frozen before any `src` is added.
- **US1 (Phase 3)**: depends on Foundational. MVP.
- **US2 (Phase 4)**: depends on Foundational. Can start after S1 is accepted, so the method has been reviewed once; by default it starts after US1 (spec FR-009: science first).
- **US3 (Phase 5)**: depends on the batches whose decision items it collects; the final verify (last task of US3) needs all batches.
- **Polish (Phase 6)**: after US3.

### Within phases

- Phase 2: the script tasks in order, then the baseline, then `status`.
- Each science batch: the four tasks in order. Batches run one after another (S1 → S7), because they edit the same files (`G/scistory.js`, the caption files) and each needs the owner's audit before the next.
- Country batches: one after another in the listed order (FR-009), each waiting for the owner's audit. Technically they edit different files, so two people could work on two countries at once, but the review rule keeps them sequential.

### Parallel opportunities

- Setup: the `progress.md` and `TEMPLATE.md` tasks.
- Research for the next batch (reading sources, no edits) can start while the owner audits the previous one.
- Polish: the report tasks marked [P].

## Parallel Example: between batches

```text
Owner:  audits S1 (K/batches/S1.md)
Worker: researches sources for S2 (no file edits until S1 is accepted)
```

## Implementation Strategy

### MVP first (User Story 1 only)

1. Phase 1 and Phase 2 (script and baseline).
2. Batch S1 (Mathematics, 22 milestones): the first full cycle; adjust the method after the owner's audit.
3. S2-S6: the six shown branches sourced (SC-001). **Stop and validate.**

### Incremental delivery

1. Every accepted batch is a complete, shippable improvement: commit, rebuild `docs/`, merge when the owner wants.
2. S7, then H01-H67 in region order (Vietnam first).
3. US3 closes decision items; Polish reports coverage and follow-ups.

### Notes

- About 4,200 entries; budget the work per batch, not as one block.
- A batch that cannot reach 95% in the owner's audit is reopened, not accepted.
- Never add or remove an entry in this feature (FR-008).
