---

description: "Task list for Real Terrain Height on the Globe"
---

# Tasks: Real Terrain Height on the Globe

**Input**: Design documents from `/specs/001-terrain-height-map/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ (`terrain-assets.md`, `terrain-api.md`), quickstart.md

**Tests**: Not requested. The repo has no test framework and the constitution does not add one. Each story ends with a manual check from [quickstart.md](./quickstart.md), and the baker prints accuracy figures.

**Organization**: Grouped by user story. Paths are relative to the repository root. `S` = `source/src/geoflight`, `P` = `source/public/geoflight`, `B` = `tools/geoflight-bake`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an unfinished task)
- **[Story]**: US1, US2, US3 from spec.md

---

## Phase 1: Data Verification (gate: no visual work before this passes)

**Purpose**: Spec FR-015 and SC-007, and constitution Principle II: knowledge before visuals. Find and verify the correct public height-map data first. The rest of the feature only starts when the owner accepts the result.

- [ ] T001 Write `specs/001-terrain-height-map/data-sources.md`: for each region and zoom the baker will use, record the underlying dataset, native resolution, licence and the exact required attribution line, with links, filling data-model.md Elevation data set.source, Elevation data set.licence / credit, Elevation data set.zoom and Elevation data set.unit (use research.md Decision 1 as the starting point: SRTM for land at zoom 7-15 between about 60°S and 60°N, GMTED2010 at zoom 4-6, ArcticDEM or GMTED2010 above 60°N, ETOPO1 for the sea which we clamp to 0)
- [ ] T002 [P] Choose one independent official cross-check dataset (NASADEM from NASA LP DAAC, or Copernicus DEM GLO-30 from ESA) and record its licence, citation text and vertical reference in `specs/001-terrain-height-map/data-sources.md`; download only the samples needed for the ranges in `B/ranges.json` (kept outside the repo)
- [ ] T003 [P] Verify the published elevation and coordinates of at least 10 reference peaks and lowlands (Everest, K2, Mont Blanc, Aconcagua, Denali, Kilimanjaro, Death Valley, Dead Sea shore, Mauna Kea, Elbrus) against official or well-cited sources, and add the table (name, lat, lon, height, source link) to `specs/001-terrain-height-map/data-sources.md`; note that a DEM smooths summits, so the table also gives the height the DEM is expected to show
- [ ] T004 Download only the Terrain Tiles samples needed (zoom 6 global and the zoom 8 tiles around the reference points and sample areas) into a `terr-sample/` folder outside the repo, then, with the script `B/crosscheck.mjs`, cross-check Terrain Tiles (zoom 6 and zoom 8 resampled as planned) against the chosen cross-check dataset at the reference points and at a few hundred random land points in each range; record bias, RMSE and the worst cases in `specs/001-terrain-height-map/data-sources.md`, and set the acceptance thresholds used later by `B/bake-terrain.mjs`
- [ ] T005 Review gate: the owner reads `specs/001-terrain-height-map/data-sources.md` and accepts or changes the source. If the cross-check is clearly better in the mountains, switch the bake source before continuing. Only after this task may Phase 2 start

---

## Phase 2: Setup (Shared Infrastructure)

**Purpose**: Inputs and documentation the other phases rely on.

- [ ] T006 Create `B/ranges.json` with the ordered fine-detail boxes (`name`, `latMin`, `latMax`, `lonMin`, `lonMax`): Himalaya and Tibet, Alps, Andes, Rockies, in that priority order (see data-model.md Terrain range)
- [ ] T007 [P] Add the zoom 8 Terrain Tiles source and the height outputs (`height.png`, `*h.webp`, `fine/`) to the sources and outputs tables in `B/README.md`, with licence and credit "Mapzen Terrain Tiles"
- [ ] T008 [P] After T005 has accepted the source, download the rest of the Terrain Tiles (zoom 6 global, zoom 8 for the ranges in `B/ranges.json`) into the baker's `terr/` source folder, outside the repo (not committed); reuse the tiles T004 already put in `terr-sample/` and fetch only what is missing

---

## Phase 3: Foundational (Blocking Prerequisites)

**Purpose**: The shared height encoding, the coarse global height map and the `terrain.js` skeleton. No user story can start before this is done.

**⚠️ CRITICAL**: US1, US2 and US3 all use these.

- [ ] T009 Implement the height encoding (decode `h = (v/255)^2 * 8900`, encode with clamp 0..8900 and sea = 0) as a shared helper in `B/height-codec.mjs`, following data-model.md Height encoding (sea and land limits per data-model.md Elevation data set.unit) and contracts/terrain-assets.md Encoding
- [ ] T010 Create `B/bake-terrain.mjs` with argument parsing (`<sources> <assetsOut> <tilesOut>`), the terrarium decode of the zoom 6 source (reuse the loader logic from `bakeTerrain` in `B/bake.mjs`), and the end-of-run report skeleton (bytes per layer, max and RMS error, over-budget flag if any) as in contracts/terrain-assets.md Baker output report
- [ ] T011 Bake the coarse global height map to `S/assets/height.png` (4096 × 2048, 8-bit grey, equirectangular, same orientation as `day.jpg`) from `B/bake-terrain.mjs` (data-model.md Coarse height map), and commit the output
- [ ] T012 Create `S/terrain.js` with the constants `K = 8` and `H_MAX = 8900`, the shared GLSL chunk `terrainHeight(vec3 dir)` (coarse map only for now), the decode function, a `displaceFade` uniform (`1 - smoothstep(1.9, 2.5, length(cameraPosition))`, refreshed in `update()` and applied by both `heightAt` and `terrainHeight`), and the exported shape from contracts/terrain-api.md (`initTerrain`, `heightAt`, `radiusAt`, `groundClearance`, `update`, `glslChunk`, `uniforms`, `cap`, `dispose`); `heightAt` reads a CPU copy of the coarse map (data-model.md Vertical exaggeration)
- [ ] T013 In `S/engine.js` import `./assets/height.png`, load it with the other base textures (next to `reliefUrl`, around line 17 and 78), and call `initTerrain` once the textures are in

**Checkpoint**: The game still looks as before, the coarse height map loads, and `heightAt(27.99, 86.93)` returns a positive value.

---

## Phase 4: User Story 1 - See real mountains when flying low (Priority: P1) 🎯 MVP

**Goal**: At low altitude over a range, land physically rises into peaks and a skyline is visible. Sea and plains stay flat. Cities, landmarks, flags, line layers and aircraft stay on or above the surface.

**Independent Test**: quickstart.md scenarios "Mountains rise", "Flat stays flat", "Plane clearance", "Markers on the ground" and "Orbit view". Fly low over the Himalaya and look toward the horizon, in explore mode and in flight mode.

### Data for User Story 1

- [ ] T014 [US1] Extend `B/bake-terrain.mjs` to bake the base height tiles `P/tiles/<ty>_<tx>h.webp` (600 × 600, single channel, one per 10° tile, 648 files, shared 1-pixel border so seams match) from the zoom 6 source, per data-model.md Base height tile and contracts/terrain-assets.md Edge rules (including the antimeridian wrap)
- [ ] T015 [US1] Run `B/bake-terrain.mjs` and commit `P/tiles/*h.webp`; record the size in the report and check it is about 3 MB (plan.md Constraints)

### Implementation for User Story 1

- [ ] T016 [US1] In `S/detail.js` load the `h` tile together with each colour tile (`load()`), add a third atlas with the same torus addressing and slot table as `rt` and `aux`, and keep an 8-bit CPU copy of each resident tile; expose `heightTexture`, the slot table and the CPU copies for `S/terrain.js` (data-model.md Base height tile states)
- [ ] T017 [US1] In `S/terrain.js` extend `heightAt` and the GLSL `terrainHeight` to use the base tile when resident and fall back to the coarse map otherwise (contracts/terrain-api.md Behaviour rules)
- [ ] T018 [US1] In `S/globe.js` displace the existing sphere in the vertex shader with `terrainHeight`, `K` and the Earth radius, keep `vN` as the unit direction so colour, borders and ids still sample correctly, keep the sea surface at 0, and use `terrainHeight`, which already includes `displaceFade` (T012), so the globe is smooth and round from orbit and objects on the ground stay on the same surface (FR-001, FR-007, FR-005)
- [ ] T019 [US1] In `S/terrain.js` build the terrain cap mesh: a tangent-plane grid projected onto the sphere, about 384 × 384 vertices with spacing from about 0.03° at the centre to about 0.2° at the edge, a skirt strip, and `update()` that re-centres it when the camera moves more than about 1° (snapped to the vertex spacing) (data-model.md Terrain cap.centre, Terrain cap.span, Terrain cap.grid and Terrain cap.rim fade; research.md Decision 3)
- [ ] T020 [US1] In `S/globe.js` add the cap material (same fragment code, `isCap` switch), fade the cap height to the coarse height over the last 10% of its radius, and discard globe fragments inside the cap radius (research.md Decision 4); add the cap to the scene from `S/engine.js` and call `terrain.update` each frame
- [ ] T021 [US1] In `S/globe.js` derive the lighting normal from the height gradient (with `K`) where height data is resident, so shading agrees with the visible shape (FR-011); keep the baked `aux` normals as the fallback
- [ ] T022 [US1] In `S/engine.js` clamp the explore camera so its height above `radiusAt` never goes below a minimum clearance plus `groundClearance` (FR-008); use the existing `exHeight` (line 27) as the desired height above ground
- [ ] T023 [US1] In `S/engine.js` make the plane altitude relative to the ground: radius `1 + heightAt + alt`, smoothed, with a look-ahead sample via `groundClearance(unitVec, forwardVec, lookAhead)`; update the shadow, camera follow and audio altitude (lines 541-556 and 618) accordingly
- [ ] T024 [US1] Hide the cap above the existing `detailW` fade range (1.9 to 2.5 units) in `S/terrain.js` and check that the global displacement from T018 reaches zero at the end of that range, so the orbit outline is a clean circle; from orbit also check that flags, landmarks and the road/rail/water lines do not float above the smoothed globe (FR-007, FR-010, SC-006)
- [ ] T025 [P] [US1] In `S/engine.js` replace the fixed radii for flags (lines 999 and 1107), the landmark placement (line 739), and label and marker anchors (around lines 804-830) with `radiusAt(n, eps)`
- [ ] T026 [P] [US1] In `S/landmarks.js` use `radiusAt` for the city and landmark base position (the 1.0001 and 1.0002 radii)
- [ ] T027 [US1] In `S/layers.js` lift the `LineMaterial` roads, rail and water lines in the vertex shader using `onBeforeCompile` with the shared `glslChunk`, `K`, and a clearance of about 0.0006; keep ships at sea level (research.md Decision 8)
- [ ] T028 [P] [US1] Audit airliner and trail heights in `S/engine.js` (around lines 651-708 and 804) against the largest displaced height allowed by the spec range, that is `K` = 10 (`K * H_MAX` is about 0.014 scene units), plus margin, not the current `K` = 8 value of 0.0111 and raise them or make them follow the terrain where lower
- [ ] T029 [US1] Run `npm run build` in `source/`, serve `docs/` and walk through the US1 scenarios in quickstart.md; commit the rebuilt `docs/`

**Checkpoint**: Mountains rise at low altitude with the base layer only. US1 is demonstrable on its own.

---

## Phase 5: User Story 2 - Heights match public elevation data (Priority: P1)

**Goal**: Terrain follows the published data closely and is credited. Fine detail for the major ranges.

**Independent Test**: quickstart.md scenarios "Real positions" and "Credits". Reference peaks rank correctly and sit within 5 km of their real position.

### Data for User Story 2

- [ ] T030 [US2] Extend `B/bake-terrain.mjs` to bake the fine tiles `P/tiles/fine/<fy>_<fx>.webp` (910 × 910, 5°, zoom 8 source) only inside the boxes of `B/ranges.json`, in priority order, covering all four ranges (about 80 tiles); if the per-copy budget (about 15 MB for this layer) would be exceeded, stop and report instead of dropping a range, so the owner can decide (data-model.md Fine height tile, research.md Decision 10)
- [ ] T031 [P] [US2] In `B/bake-terrain.mjs` add the accuracy report: max and RMS decoded error per layer, with automatic fall back to near-lossless WebP when the error is above the thresholds set in T004 (recorded in `specs/001-terrain-height-map/data-sources.md`)
- [ ] T032 [P] [US2] In `B/bake-terrain.mjs` add the reference table from `specs/001-terrain-height-map/data-sources.md` (T003): decoded height at each known coordinate against the verified expected height and the thresholds set in T004, and the distance in km from the encoded peak to the real position (SC-002)
- [ ] T033 [US2] Run the bake with the fine layer, check the table and the size budget, and commit `P/tiles/fine/`; if the budget is exceeded, stop, tell the owner and decide together (for example zoom 7 for the lowest-priority range), then record the decision in `B/README.md`; no range is dropped silently

### Implementation for User Story 2

- [ ] T034 [US2] In `S/detail.js` add the second, smaller streaming window for fine tiles (4 × 4, about 13 MB of texture) with its own atlas, slot table and CPU copies; never request a fine tile that is outside `B/ranges.json` (data-model.md Fine height tile, research.md Decision 5)
- [ ] T035 [US2] In `S/terrain.js` extend `heightAt` and `terrainHeight` with the fall-back chain fine tile → base tile → coarse map (contracts/terrain-api.md)
- [ ] T036 [P] [US2] Update the credits in `README.md` with the exact attribution lines recorded in `specs/001-terrain-height-map/data-sources.md` (T001), for example "United States 3DEP (formerly NED) and global GMTED2010 and SRTM terrain data courtesy of the U.S. Geological Survey" plus the lines for any other region used, the Terrain Tiles citation, and the vertical exaggeration note (FR-011 in spec.md)
- [ ] T037 [US2] Rebuild `docs/`, walk through the US2 scenarios in quickstart.md and commit the result

**Checkpoint**: US1 and US2 both work. Ranges show fine terrain and heights match published values.

---

## Phase 6: User Story 3 - Smooth experience while moving (Priority: P2)

**Goal**: No freezes, holes or cracks while flying, and lower-detail terrain instead of gaps when data is slow.

**Independent Test**: quickstart.md scenarios "No holes" and "Offline tiles".

- [ ] T038 [US3] Verify the fall-back behaviour (FR-014): with the `h` and `fine/` requests blocked, terrain shows at lower detail with no holes; fix any gap in `S/detail.js` or `S/terrain.js`
- [ ] T039 [US3] Check seams (FR-009): fly across the date line and over a pole and a tile border in a range; fix any crack in the baker border sampling (`B/bake-terrain.mjs`) or in the cap fade in `S/globe.js`
- [ ] T040 [US3] Measure the frame rate and tile-load stalls over the 5-minute route in quickstart.md (SC-003, SC-004) and the cold-load time against the old build (SC-005); tune the cap vertex count, window sizes or request concurrency if needed
- [ ] T041 [US3] Rebuild `docs/`, walk through all US3 scenarios in quickstart.md and commit the result

**Checkpoint**: All three stories work together.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [ ] T042 Check the total new data per copy against the budget in plan.md (`source/public/geoflight/tiles` plus the copy in `docs/`); if over (about 20 MB per copy), report to the owner and decide together; do not drop a required range silently
- [ ] T043 [P] Tune `K` within 5-10 by eye over the Himalaya, Alps and Andes, and set the final value in `S/terrain.js` (spec Clarifications; one constant), then re-check T022, T023 and T028 (camera, plane and aircraft clearance) with the final value
- [ ] T044 [P] Update `README.md` "Develop" notes for the new baker command (`B/bake-terrain.mjs`) and the new asset layout
- [ ] T045 Run the full quickstart.md checklist once more on the final `docs/` build and fix anything found
- [ ] T046 Check SC-001 with 5-10 first-time testers: show each a short low-altitude flight over the Himalayas, Alps and Andes with labels hidden, record how many name the range correctly, and write the result in `specs/001-terrain-height-map/quickstart.md` (SC-001 needs at least 9 in 10)
- [ ] T047 (Recommended, not a gate) Add a visible English note that terrain heights are exaggerated (value read from `K` in `S/terrain.js`) in `S/GeoFlight.jsx` near the credits or layer controls, and mention it in `README.md` (constitution Principle III, research.md Decision 6 honesty note)
- [ ] T048 Confirm the constitution still holds: relative URLs only, `docs/` rebuilt and committed, no new dependency, English text only

---

## Dependencies & Execution Order

### Phase dependencies

- **Data Verification (Phase 1)**: no dependencies. **Gate**: nothing else starts until T005 is accepted.
- **Setup (Phase 2)**: depends on T005. T008 downloads the source chosen in T005.
- **Foundational (Phase 3)**: depends on Setup (T008 for the bake). Blocks all stories.
- **US1 (Phase 4)**: depends on Foundational. MVP.
- **US2 (Phase 5)**: depends on Foundational and on `S/detail.js` and `S/terrain.js` from US1 (T016, T017).
- **US3 (Phase 6)**: depends on US1 and US2 (the fall-back and seam checks need both height layers).
- **Polish (Phase 7)**: after the stories you ship.

### Within phases

- T001 → T004 → T005; T002 and T003 in parallel with T001; T004 downloads its own samples and does not wait for T008. T005 → T006 and T008.
- T009 → T010 → T011 → T012 → T013.
- T014 → T015; T016 → T017 → T018 → T019 → T020 → T021; T022 after T017; T024 after T019; T029 last.
- T030 → T033; T031 and T032 in parallel with T030; T034 → T035.
- T025, T026 and T028 (US1) are independent files or sections and follow T017; T027 follows T012 and T018; all four come before the MVP build T029. T023 follows T022 and needs `heightAt` from T017.

### Parallel opportunities

- Data Verification: T002 and T003 together, in parallel with T001.
- Setup: T007 and T008.
- Foundational: none except reading T009 while T008 downloads.
- US1: T014/T015 (baker) can run while T016-T018 (game code) are written; T025, T026 and T028 touch different areas and can be done together.
- US2: T031 and T032 with T030; T036 anytime.
- US3: T038 and T039 can be checked in the same flight.

## Parallel Example: User Story 2

```text
T030 Bake the fine layer           (B/bake-terrain.mjs)
T031 Accuracy report               (B/bake-terrain.mjs, separate function)
T032 Reference peak table          (B/bake-terrain.mjs, separate function)
T036 Credits in README.md          (README.md)
```

## Implementation Strategy

### MVP first (User Story 1 only)

1. Phase 1 (data verified and accepted), Phase 2 and Phase 3.
2. Phase 4 (US1): mountains with the base layer, cap, camera and plane clearance, and objects on the ground.
3. **Stop and validate** with the US1 scenarios, then deploy the rebuilt `docs/`.

### Incremental delivery

1. Setup + Foundational → coarse map loaded.
2. US1 → visible mountains (MVP, deployable).
3. US2 → fine detail, verified heights, credits.
4. US3 → fall-back, seams and performance.
5. Polish → budget, `K` tuning, final check.

### Notes

- Plane clearance (T023) and ground placement (T025-T028) are part of US1, so the MVP never ships a plane or landmarks inside mountains.
- Keep commits small: baker output and the game code that reads it in separate commits.
