# Implementation Plan: Real Terrain Height on the Globe

**Branch**: `001-terrain-height-map` | **Date**: 2026-11-19 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-terrain-height-map/spec.md`

## Summary

**Order of work (constitution Principle II)**: first find and verify the right public height-map data and
record it in `data-sources.md`. Only then build the baker and the visuals.

Today the Earth is one `THREE.SphereGeometry(1, 256, 128)` with a hand-written shader. Relief exists only as
shading (baked normals in `relief.png` and the streamed `<ty>_<tx>a.webp` tiles). Nothing is displaced.

The plan adds real geometry in three layers of data and one new mesh:

1. **Data (baked offline, committed)**: a coarse global height map, a base height layer streamed with the
   existing 10° detail tiles, and a fine 5° height layer baked only for major mountain ranges.
2. **Rendering**: vertex displacement by `K` (default 8, allowed 5-10) on the existing sphere, plus a
   camera-centred high-resolution terrain cap mesh for low altitude. Both read one shared height function.
3. **Placement**: a new `terrain.js` module gives CPU `heightAt()` so the plane, camera, cities, landmarks,
   flags and labels sit on the surface. Line layers are lifted in their vertex shader with the same function.
4. **Credits**: source and licence added to the README and baker README.

No new runtime dependency. No backend. Everything stays a static site on GitHub Pages.

## Technical Context

**Language/Version**: JavaScript (ESM) with JSX, GLSL (three.js `ShaderMaterial`); Node.js for the baker

**Primary Dependencies**: React 18.3.1, three 0.169.0, Vite 6.4.1 (all existing); baker uses `sharp` 0.33.5
(existing). No new packages.

**Storage**: Static files. Baked height assets in `source/src/geoflight/assets/` (coarse map) and
`source/public/geoflight/tiles/` (streamed tiles); the Vite build copies both into `docs/`.

**Testing**: The repo has no test framework and the constitution does not add one. Verification is the baker's
printed statistics (size, error, min/max) plus the manual scenarios in [quickstart.md](./quickstart.md).

**Target Platform**: Desktop browsers with WebGL2 (vertex texture fetch). Mobile tuning is out of scope.

**Project Type**: Single static web application (`source/` builds to `docs/`) plus an offline baker (`tools/`)

**Performance Goals**: Interactive frame rate during low-altitude flight (no freeze over 1 s, SC-004). First
view no more than 2 s slower than today (SC-005). Terrain cap about 150k vertices.

**Constraints**: Elevation data grows the repository by a few tens of MB **counting both copies** (the
`source/public` tiles and the committed `docs/` copy). Target: at most about 20 MB of new baked data per copy (about 40 MB across both copies).
No server-side work. No heavy computation in the browser.

**Scale/Scope**: 1 coarse global map, 648 base height tiles (10°, 600 px), roughly 80 fine tiles (5°,
910 px) for the Himalaya and Tibet (about 15), Alps (about 5), Andes (about 35) and Rockies (about 25); the count
is an area estimate to be confirmed by the first bake. Plane and camera ground clearance. About 10 modules
touched.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Re-checked against constitution v1.2.0 (the history-first vision was added after the first plan).

| Principle | Status | Notes |
|---|---|---|
| I. History browsing is the product | Pass with note | Terrain is presentation, not the product. It makes the globe more convincing when exploring places and moments, and it does not replace any knowledge work. It must not displace the knowledge work in priority (see Priority note below). |
| II. Knowledge before visuals | Pass | The correct height-map data is found and verified first (Phase 1: `data-sources.md`, cross-check against a second official dataset, owner review). Visual tasks start only after that gate. |
| III. Accurate visuals, no untrue content | Pass | Heights come from verified public data. Positions and relative heights follow it, and the exaggeration is a documented, uniform factor chosen in the spec. The data is verified before any visual work (Phase 1 gate, tasks T001-T005). A visible exaggeration note (T047) is recommended but is not a gate. |
| IV. Static site on GitHub Pages, committed `docs/` | Pass | All data is baked and shipped as static files. `docs/` must be rebuilt and committed. All URLs stay relative. |
| V. three.js is the 3D engine | Pass | Displacement and the cap are `ShaderMaterial` and `THREE.Mesh`. React is untouched for 3D. |
| VI. Source layout | Pass | New `source/src/geoflight/terrain.js` (flat module). Baker changes stay in `tools/geoflight-bake/`. |
| VII. Naming | Pass | Lowercase `.js` module. No new `.jsx`. |
| VIII. Pinned dependencies, `npm run build` | Pass | No new dependencies. |
| IX. Baked offline, committed | Pass | Elevation is fetched and baked by `tools/geoflight-bake/`. Source is listed in the baker README. |
| X. English primary | Pass | The new exaggeration note is written in English. |
| Stack: openly licensed data | Pass | Mapzen Terrain Tiles (AWS Open Data) is already used and credited. |

Result: **no violations**, so Complexity Tracking stays empty. The data-first order (verify the height-map
source, then build the visuals) is what satisfies Principles II and III.

**Priority note**: Principle II says visual work follows good knowledge. This feature is an improvement to the
presentation layer. It is not blocked by Principle II (no aspect is being newly visualised), but the owner may
want to rank it after work on knowledge and timelines. That is a scheduling decision, not a gate.

## Project Structure

### Documentation (this feature)

```text
specs/001-terrain-height-map/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   ├── terrain-assets.md   # baked file formats
│   └── terrain-api.md      # terrain.js interface
└── tasks.md             # Phase 2 output (/speckit-tasks, not created here)
```

### Source Code (repository root)

```text
tools/geoflight-bake/
├── bake.mjs                 # + coarse height map (height.png)
├── bake-terrain.mjs         # NEW: base + fine height tiles from Terrain Tiles
├── ranges.json              # NEW: bounding boxes of fine-detail ranges
├── package.json
└── README.md                # + new sources, outputs, commands

source/
├── public/geoflight/tiles/  # + <ty>_<tx>h.webp (base), fine/<fy>_<fx>.webp
├── src/geoflight/
│   ├── assets/height.png    # NEW: coarse global height, 4096 x 2048
│   ├── terrain.js           # NEW: heightAt(), GLSL chunk, cap mesh, clearance helpers
│   ├── globe.js             # displaced sphere, cap material, discard under cap, height-based normals
│   ├── detail.js            # streams height tiles (base 7x7, fine 4x4 window) + keeps CPU copies
│   ├── engine.js            # plane/camera clearance, object placement, cap re-centring each frame
│   ├── layers.js            # line materials lifted in the vertex shader
│   ├── landmarks.js         # placement radius from terrain
│   └── GeoFlight.jsx        # only if a new loading or credit line is needed
└── package.json             # unchanged

docs/                        # rebuilt output (committed)
README.md                    # credits
```

**Structure Decision**: Keep the flat layout under `source/src/geoflight/`. All terrain logic is concentrated
in one new module, `terrain.js`, so `engine.js` (1165 lines) only calls into it. The baker gets a separate
`bake-terrain.mjs` because `bake.mjs` already mixes several jobs.

## Complexity Tracking

> No constitution violations. Nothing to justify.
