# Quickstart: Validate real terrain height

Run after implementation. There is no automated test framework in the repo, so these are the acceptance checks.

## Prerequisites

- Node.js installed.
- For rebaking only: a local folder with the baker sources (see `tools/geoflight-bake/README.md`), including
  Terrain Tiles at zoom 6 and zoom 8 for the chosen ranges.

## 1. Bake (only when the data changes)

```sh
cd tools/geoflight-bake
npm install
node bake-terrain.mjs <sources> <repo>/source/src/geoflight/assets <repo>/source/public/geoflight/tiles
```

Expected output: files written, total size per layer inside the budget in [plan.md](./plan.md), error figures
within the thresholds recorded in `data-sources.md` (set by the Phase 1 cross-check), reference-peak table printed, and, if the budget is
exceeded, a stop with a report for the owner (no range is dropped silently).

## 2. Build

```sh
cd source
npm install
npm run build
```

Expected: `docs/` rewritten, growth of `docs/geoflight/tiles` plus the source copy within the budget.

## 3. Serve and look

```sh
npx serve docs
```

Open the printed `http://localhost` address (not `file://`).

## 4. Scenarios

| Check | Steps | Expected |
|---|---|---|
| Mountains rise (US1) | Explore mode, fly over the Himalaya, zoom to the lowest height, look toward the horizon | Ridges and peaks form a skyline; the highest peak stands above its surroundings |
| Flat stays flat (US1) | Same, over the Pacific and the Amazon basin | Sea and plains stay level, no bumps |
| Real positions (US2) | Compare Everest, K2, Mont Blanc, Aconcagua, Denali, Kilimanjaro, Death Valley against the baker's table and a map | Ranking is correct; each peak within 5 km of its real position |
| Data verified (FR-015, SC-007) | Open `specs/001-terrain-height-map/data-sources.md` | Dataset, credit and licence per region, the cross-check against a second official dataset, and the thresholds the owner accepted; every reference point and random sample is inside them |
| Honesty note (recommended) | Open the game and look for the terrain note | An English note states that heights are exaggerated, with the same factor as `K` |
| Credits (US2) | Open the README and `tools/geoflight-bake/README.md` | Source and licence are stated |
| No holes (US3) | Fly 5 minutes at low altitude: Pacific → Himalaya → Alps → Atlantic, crossing the date line once | No cracks, holes or camera under the ground; no freeze over 1 s |
| Markers on the ground (US3) | Check cities, landmarks and flags in the Alps and Himalaya; switch on roads, rail and rivers | Markers sit on the surface; lines follow the terrain |
| Plane clearance | Flight mode at the lowest altitude over the Himalaya | The plane stays above the terrain, including ahead of the nose |
| Orbit view (SC-006) | Zoom out to the full globe | A smooth round outline; borders and layers unchanged, and flags, landmarks and lines do not float above the globe |
| Start-up (SC-005) | Reload with a cold cache | First view appears within 2 s of the old build on the same connection |
| Offline tiles (FR-014) | Block `*h.webp` and `fine/` in the browser's network tools, then fly low | Lower-detail terrain, no holes |

## 5. Before committing

- Rebuilt `docs/` is included.
- The README credits the elevation source.
- Total new data per copy is within the budget.
