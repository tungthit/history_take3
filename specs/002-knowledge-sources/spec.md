# Feature Specification: Sources for All Existing Knowledge

**Feature Branch**: `002-knowledge-sources`

**Created**: 2026-11-19

**Status**: Draft

**Input**: User description: "Bổ sung nguồn (trường `src`) cho toàn bộ dữ liệu kiến thức hiện có, theo constitution v2.0.0 nguyên tắc II. Phạm vi: các mốc lịch sử trong history.js và history/<iso2>.js (khoảng 3.500 mục, 67 nước), 175 mốc khoa học trong scistory.js, và các chú thích `cap` trong art*.jsx. Mỗi mục phải có `src` là URL hoặc trích dẫn tra được, ưu tiên nguồn chính thức, Wikipedia chấp nhận được. Trong lúc bổ sung, nếu phát hiện sai sót (năm, vị trí, sự kiện) thì sửa hoặc đánh dấu `approx: true`, không tự thêm sự kiện mới. Làm theo đợt: khoa học trước (6 nhánh đang hiện), rồi lịch sử từng nước. Chưa động tới phần hình ảnh hay 3D." (Add a source, the `src` field, to all existing knowledge data, per constitution v2.0.0 Principle II. Scope: history events in history.js and history/<iso2>.js, science milestones in scistory.js and the `cap` captions in art*.jsx. Each entry needs a URL or findable citation, official sources preferred, Wikipedia acceptable. Fix errors found or mark `approx: true`; add no new events. Work in batches: science first, then history country by country. Do not touch images or 3D.)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Every science milestone can be traced to a source (Priority: P1)

The project owner (and later any reader of the data) opens a science milestone or its illustration caption and finds where its facts come from: a link or a citation that leads to a reputable or official source confirming the date, the person or place, and the claim made.

**Why this priority**: The six science branches are what users see today in the Science layer. They are the smallest set (175 milestones, 143 captions), so they prove the method before the much larger history set. Constitution Principle II forbids new visual work on an aspect whose data has no sources, so this unblocks future work on science visuals.

**Independent Test**: Pick any 20 milestones and 20 captions at random from the six shown branches. For each, follow its source and confirm that the source supports the year, the place and the main claim. Can be done with no change to the history data.

**Acceptance Scenarios**:

1. **Given** a science milestone from one of the six shown branches, **When** the reviewer reads its data, **Then** it carries a source that can be opened or looked up.
2. **Given** an illustration caption that states a fact, **When** the reviewer reads it, **Then** the caption carries a source, or the caption's milestone source is explicitly stated as covering it.
3. **Given** the source of a milestone, **When** the reviewer opens it, **Then** it confirms the year, place and claim as written, or the entry has been corrected to match it.

---

### User Story 2 - Every history event can be traced to a source (Priority: P2)

The owner opens the history of any of the 67 countries and finds a source for each event: the event name, date and location can be checked against a reputable or official reference.

**Why this priority**: History is the largest body of knowledge (about 3,900 events) and the core of the "browse history" vision, but it is big enough that it must be done country by country after the method is proven on science.

**Independent Test**: For one finished country, pick 10 events at random and confirm each source supports the name, date and place. Countries not yet done are unaffected.

**Acceptance Scenarios**:

1. **Given** a country marked as finished, **When** the reviewer reads any of its events, **Then** the event carries a source.
2. **Given** an event whose location is only known roughly, **When** the source does not give a precise place, **Then** the event is marked as an approximate location.
3. **Given** a country not yet finished, **When** the reviewer checks the progress record, **Then** it is listed with its remaining count.

---

### User Story 3 - Errors found on the way are fixed and recorded (Priority: P2)

While sourcing, the person doing the work finds that an entry contradicts its source (wrong year, wrong place, wrong attribution). The entry is corrected to match the source, or marked approximate, and the change is written down so the owner can review every correction.

**Why this priority**: Adding sources without fixing what they contradict would leave untrue content in place, which Principle III forbids. Every correction is itself a knowledge change and needs to be reviewable.

**Independent Test**: Open the correction record for a finished batch. Each correction names the entry, the old value, the new value and the source that justifies it, and the entry in the data matches the new value.

**Acceptance Scenarios**:

1. **Given** an entry whose year differs from its source, **When** the batch is finished, **Then** the entry shows the year from the source and the correction record lists the old and new values.
2. **Given** an entry whose claim cannot be confirmed by any acceptable source, **When** the batch is finished, **Then** the entry is listed for the owner's decision and is not silently deleted or changed.
3. **Given** a finished batch, **When** the owner compares the number of entries before and after, **Then** the counts are equal (no event added or removed).

---

### Edge Cases

- Legends and traditional accounts (for example founding legends): the source must describe them as legend or tradition, and the entry must not present them as established fact.
- Dates that are uncertain or disputed: the entry keeps a range or "about" wording that matches the source, rather than a single precise year.
- Ancient or prehistoric places with no exact position: marked as approximate location.
- Sources that disagree with each other: the official or scholarly source is chosen, and the disagreement is noted in the correction record.
- Entries whose only available source is in a language other than English: allowed as a source, but the entry text stays in English (Principle X).
- A source that later goes offline: the citation must still let a reader find the work (title and publisher or author), not only a bare link.
- An illustration caption that combines several facts: every fact in it must be covered by the cited source(s).
- Science milestones in the three branches not shown today (astronomy, earth science, technology): they are in scope but come after the six shown branches.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every science milestone (all 175, starting with the 143 in the six branches shown today) MUST carry a source.
- **FR-002**: Every illustration caption that states a fact (143 captions) MUST carry a source, or explicitly rely on the source of the milestone it illustrates when that source covers every fact in the caption.
- **FR-003**: Every history event of every country (about 3,900 events across 67 countries) MUST carry a source.
- **FR-004**: A source MUST be either a link that opens the referenced work or a citation precise enough to find it (title plus author or publisher), and SHOULD contain both.
- **FR-005**: An official source (a national survey or archive, a government agency, the original publication or a scholarly reference) MUST be used where one exists; Wikipedia is acceptable otherwise.
- **FR-006**: When a source contradicts an entry's year, place, name or claim, the entry MUST be corrected to match the source, or marked as approximate when the source gives no precise value.
- **FR-007**: Every correction MUST be recorded with the entry, the old value, the new value and the justifying source, so the owner can review it.
- **FR-008**: This feature MUST NOT add or remove any event, milestone or caption; entries that cannot be sourced MUST be listed for the owner's decision.
- **FR-009**: The work MUST proceed in batches: the six shown science branches first, then the remaining three science branches, then history country by country.
- **FR-010**: A progress record MUST show, for each batch, how many entries have a source, how many were corrected and how many await a decision.
- **FR-011**: The feature MUST NOT change any image, illustration drawing, 3D model or visual behaviour; only the knowledge data and its captions' text and sources change.
- **FR-012**: All entry text MUST remain in English (Principle X); proper nouns keep their own spelling.
- **FR-013**: The game MUST look and behave the same to users after each batch, except for corrected facts.

### Key Entities

- **Knowledge entry**: one history event, science milestone or illustration caption. Key attributes: name or text, date, place, approximate-location flag, source.
- **Source**: the reference that supports an entry: a link and/or a citation (title, author or publisher), and its kind (official, scholarly, encyclopedia).
- **Batch**: a group of entries worked on and reviewed together: one science branch group, or one country.
- **Correction**: a recorded change to an entry: which entry, old value, new value, source, date.
- **Decision item**: an entry that could not be sourced or confirmed, waiting for the owner.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the 143 milestones and 143 captions in the six shown science branches carry a source when the first batch closes.
- **SC-002**: 100% of all knowledge entries (science milestones, captions and history events) carry a source, or are listed as decision items, when the feature closes.
- **SC-003**: In a random audit of 50 entries per finished batch (or all entries if fewer), at least 95% have a source that confirms the year, place and main claim as written.
- **SC-004**: The number of events, milestones and captions is the same before and after every batch.
- **SC-005**: Every correction in the data appears in the correction record, and every item in the record matches the data (zero mismatches in a full comparison).
- **SC-006**: Every science branch shown to users meets the constitution's minimum of 20 sourced milestones, or the owner has been told which branches do not (chemistry has 8 today).

## Assumptions

- The person doing the work can research sources online; the owner reviews each batch before the next one starts.
- "Source" follows the `src` rule of constitution v2.0.0 Principle II; how it is stored is decided in planning.
- The approximate-location flag already used by the data (`approx: true`) is the way to mark uncertain places; the game already shows "approximate location" for it.
- The counts used here were measured on 2026-11-19: 175 science milestones (143 in the six shown branches: computing 35, medicine 30, physics 25, biology 23, mathematics 22, chemistry 8), 143 captions, about 3,900 history events (66 country files plus Vietnam inside the main history module), 67 countries.
- Showing sources to users in the game (for example a "Source" link) is out of scope here because it is a visual change; it can be a follow-up feature.
- Bringing chemistry up to 20 milestones requires adding events, which this feature forbids; it is reported (SC-006) and left to a separate feature.
- Landmark and place data are not part of the stated scope and are left for a later feature.
