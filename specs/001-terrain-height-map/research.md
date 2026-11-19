# Research: Real Terrain Height on the Globe

All Technical Context unknowns are resolved below. Facts about the current code come from reading
`globe.js`, `detail.js`, `engine.js`, `layers.js` and `tools/geoflight-bake/bake.mjs`.

## Findings about the current code

- The Earth has radius 1 (1 unit = 6371 km). Mesh: `SphereGeometry(1, 256, 128)`, a 1.4° (about 156 km) grid.
- Relief is shading only: `relief.png` (2048x1024, coast distance plus normals) and 600x600 detail tiles
  `<ty>_<tx>.webp` (colour) and `<ty>_<tx>a.webp` (normal plus coast), 10° each, streamed in an N×N torus atlas
  by `DetailStreamer` (N between 3 and 7).
- Elevation source already used by the baker: Terrain Tiles on AWS Open Data, terrarium encoding, zoom 6.
  The raw tiles are not in the repo (the baker expects a local `terr/` folder).
- Heights: Everest is 8.85 km, so 0.00139 units. With `K` = 8 it becomes 0.0111 units.
- Plane altitude `ALT_MIN = 0.007`, `ALT_MAX = 0.055`, measured from radius 1. At `K` = 8, Everest (0.0111)
  is higher than the lowest plane altitude. **The plane would fly through the mountain unless altitude
  becomes relative to the ground.**
- Explore camera height above ground: 0.032 to 2.6 (`EX_H0`, `EX_H1`). At 0.032 the camera is about 204 km up
  and already clears a `K` = 8 summit with room to spare.
- Objects are placed at fixed radii (1.0002 to 1.0012) in `engine.js`, `layers.js` and `landmarks.js`.
  They would be buried in raised terrain.
- Line layers use `LineSegments2` and `LineMaterial` at radius 1.0006 from a baked `.bin`.
- Existing detail tile sizes: the 648 `a.webp` tiles total 8.7 MB (up to 110 KB for rugged tiles).

## Decision 1: Elevation source (checked against the sources' own documentation)

Sources read: the AWS Open Data registry page for Terrain Tiles, the Mapzen/Tilezen `joerd` documents
`data-sources.md` and `attribution.md`, and public documentation on SRTM, NASADEM and Copernicus DEM.

What Terrain Tiles actually contains (all of it comes from official agencies):

| Where | Dataset | Native resolution | Used at zoom |
|---|---|---|---|
| Land, between about 60°S and 60°N | SRTM (NASA/USGS) | 30 m | 7-15 |
| Land, global | GMTED2010 (USGS) | 7.5 arc-seconds (about 250 m) | 4-6 (7-9 only above 60°N) |
| Land above 60°N | ArcticDEM, GMTED2010 | 5 m / about 250 m | 10-15 / 7-9 |
| Sea, and land at zoom 0-3 | ETOPO1 (NOAA) | 1 arc-minute | 0-15 |
| Some countries | national models (3DEP, Canada CDEM, EU-DEM and others) | 8-30 m | 9-15 |

- **Consequences for the plan**: zoom 6 (our global base) is GMTED2010 on land. Zoom 8 over the Himalaya, Alps,
  Andes and Rockies is SRTM, a 30 m source resampled to about 430-610 m per pixel, so the fine layer loses
  nothing important. Sea values are ETOPO1 but we clamp the sea to 0 anyway.
- **Known accuracy** (published): SRTM's mission requirement is 16 m absolute vertical error at 90% confidence.
  USGS found 3.5 m RMSE against GPS benchmarks on mostly flat US terrain, but independent studies report larger
  errors in rugged terrain (for example in the Himalaya) and in the older 90 m product. A DEM also smooths
  narrow summits, so a peak in the data can sit below its published height. SRTM is a radar surface model
  (it includes forest canopy), not strictly bare ground. Terrain Tiles was built in 2017 and is not updated.
- **Licence and credit**: each underlying dataset has its own attribution line (for example "United States 3DEP
  (formerly NED) and global GMTED2010 and SRTM terrain data courtesy of the U.S. Geological Survey" and
  "Global ETOPO1 terrain data U.S. National Oceanic and Atmospheric Administration"). Regional sources add
  their own lines. The README must carry the lines for every region we actually bake. The exact list is
  recorded in `data-sources.md` (task T001).
- **Decision**: keep Terrain Tiles as the working source (official data underneath, already integrated, one
  consistent format) **but do not treat it as proven**. Phase 1 cross-checks it against one independent
  official dataset (NASADEM from NASA, or Copernicus DEM GLO-30 from ESA, which states under 4 m absolute
  vertical accuracy at 90% but is a surface model and has some unreleased tiles). If the cross-check shows the
  alternative is clearly better in the mountains, the baker source changes before any visual work.
- **Rationale**: Principle II asks for official data where it exists, and Principle III asks for accurate
  visuals. Verifying the data first costs a few tasks and protects every later step.
- **Alternatives considered**: NASADEM directly (needs an Earthdata login and tiling, void-reduced, same SRTM
  origin so it is not fully independent of Terrain Tiles); Copernicus GLO-30 directly (best stated accuracy,
  free licence with a required notice, incomplete tile coverage, surface model); ETOPO 2022 (adds bathymetry we
  do not display). Zoom 9 (about 300 m) rejected: about 4x the data of zoom 8 for little gain within the
  size budget.

## Decision 2: Height encoding

- **Decision**: One 8-bit channel, square-root coded: `v = round(255 * sqrt(h / 8900))` for `h >= 0`, and
  `0` for the sea. Decode: `h = (v / 255)^2 * 8900` metres. Lossy WebP at high quality; the baker measures the
  decoded error and falls back to near-lossless if it is above the thresholds set by the Phase 1 cross-check (recorded in `data-sources.md`).
- **Rationale**: Precision is finest at low altitude where terrain is smooth (about 16 m near 500 m, about 66 m
  near 8000 m), one channel keeps tiles small (about a third of an RGB tile), sea stays exactly 0 (FR-005).
- **Alternatives considered**: Two-channel 16-bit (about 2-3x the size, lossless needed); float textures
  (too big); linear 8-bit (35 m steps everywhere, visible terracing in plains).

## Decision 3: Mesh strategy

- **Decision**: Displace the existing sphere in its vertex shader from the coarse height map. For low altitude,
  add a **terrain cap**: a grid mesh centred on the point under the camera and rebuilt in position (not in
  topology) each frame. The cap is a tangent-plane grid projected onto the sphere, so it works at the poles
  and across the antimeridian. Spacing grows from about 0.03° at the centre to about 0.2° at the edge, span
  about 12° half-angle, about 150k vertices. The cap uses the same material code with an `isCap` switch.
- **Rationale**: The global grid (156 km) cannot show mountains; a flat latitude/longitude patch breaks at the
  poles; full chunked-LOD is a lot of new code for a single-camera game.
- **Alternatives considered**: A much denser global sphere (about 4M vertices needed, too heavy); quadtree
  chunked LOD (correct but about 5x the code); parallax or relief mapping in the fragment shader only (no real
  silhouette, fails FR-004 at the horizon).

## Decision 4: Cap and globe seam (FR-009, FR-014)

- **Decision**: The cap height equals the fine/base height inside and fades to the coarse-map height within the
  last 10% of its radius. The cap has a skirt (a strip dropped below the rim). The globe fragment shader
  discards pixels inside the cap radius, with a small overlap, so the two never z-fight and no valley floor of
  the globe covers the cap.
- **Rationale**: The coarse mesh is bilinear and smoother, so it can be higher than the true valley floor. If it
  stayed visible under the cap it would hide valleys.
- **Alternatives considered**: Lowering globe vertices under the cap (creates a visible ring); depth offset only
  (fails in valleys).

## Decision 5: Height tiles streaming

- **Decision**: Reuse the 10° streaming mechanism for the base height layer (extra file per tile, third atlas,
  same torus addressing). Add a second, smaller window for the 5° fine tiles (4×4, about 13 MB of 8-bit
  texture). A missing fine tile falls back to the base tile, a missing base tile falls back to the coarse map
  (FR-014). Fine tiles that do not exist (outside the chosen ranges) are never requested.
- **Rationale**: Same fall-back chain everywhere, no new loader. Memory is bounded: base atlas 7×7×600² about
  17.6 MB, fine atlas about 13 MB.
- **Alternatives considered**: One uniform fine layer for the world (size budget fails); a single atlas with
  mixed resolutions (complex addressing).

## Decision 6: Vertical exaggeration

- **Decision**: One constant `K = 8` in `terrain.js`, uniform worldwide, applied to the vertex shader and every
  CPU height lookup. The spec range is 5-10; 8 is the starting point and can be tuned in one place.
- **Rationale**: Gives Everest 0.0111 units, about 8% of the explore camera's lowest height above ground
  (0.032). That reads clearly while a mountain is still smaller than the plane's flight band (up to 0.055).
- **Alternatives considered**: Altitude-dependent exaggeration (breaks ranking consistency, rejected by
  FR-003 wording "same factor everywhere").
- **Honesty note (recommended, not a gate)**: Exaggeration changes how the Earth really looks. The game should say so in the product (a short English note near the credits or in the layer panel: "Terrain heights are exaggerated about 8x") and in the README. The factor shown is read from the same `K` constant so the text cannot drift from the code.

## Decision 7: Placing things on the ground

- **Decision**: `terrain.js` exposes `heightAt(lat, lon)` (CPU, bilinear, fine then base then coarse),
  `radiusAt(unitVec, clearance)` and `groundClearance(...)`. Used by the plane, camera, city and landmark
  placement, flags and label anchors. **Plane altitude becomes relative to the ground**: `r = 1 + heightAt() +
  alt`, with a short look-ahead sample so the nose does not clip a ridge.
- **Rationale**: Without it the plane flies inside mountains at the lowest altitude (see findings).
- **Alternatives considered**: Raising `ALT_MIN` above the highest peak (loses the low flying feel and the
  look of mountains around the plane).

## Decision 8: Line layers (roads, rail, rivers) and trails

- **Decision**: Lift the `LineMaterial` layers in the vertex shader (`onBeforeCompile`), using the same shared
  GLSL height function as the globe. Add a clearance of about 0.0006. Ships stay at sea level (no change).
  Airliner flight height must be checked against the largest displaced height allowed (`K` = 10, about 0.014, plus margin) and raised or made
  terrain-following where it is lower.
- **Rationale**: One height function for everything on the ground. No rebuild of line geometry when tiles
  stream in.
- **Alternatives considered**: Pre-lifting vertices on the CPU (sinks when finer tiles arrive; needs rebuild).

## Decision 9: Accuracy checks done in the baker (no test framework)

- **Decision**: `bake-terrain.mjs` prints, per run: total bytes (must stay within the budget), max and RMS
  height error after encode/decode judged against the thresholds set by the Phase 1 cross-check (recorded in `data-sources.md`, not fixed in advance),
  and the height at 10 reference peaks and lowlands against known values (Everest, K2, Mont Blanc,
  Aconcagua, Denali, Kilimanjaro, Death Valley, Dead Sea shore, Mauna Kea, Elbrus).
- **Rationale**: SC-002 needs a repeatable check, and the constitution does not add test tooling.

## Decision 10: Size budget

- **Decision**: Treat the budget as the sum of `source/public/geoflight/tiles` and its copy in `docs/`.
  Target at most about 20 MB of new data per copy (about 40 MB across both copies, still "a few tens of MB"):
  coarse map about 1.5 MB, base height layer about 3 MB, fine layer up to about 15 MB. The fine layer covers
  about 80 tiles (Himalaya and Tibet, Alps, Andes, Rockies), so even at 80 KB per tile it needs about 6.4 MB and
  there is headroom if tiles are larger. `ranges.json` lists boxes in priority order. FR-006 requires all four
  ranges, so the baker never drops a range silently: if the budget is exceeded it stops and reports, and the
  owner decides (for example zoom 7 for the lowest-priority range).
- **Rationale**: The build copies `public/` into `docs/` and both are committed, so every byte counts twice.
- **Alternatives considered**: Ignoring the duplicate (would make the real growth twice the stated budget).

## Risks

- **Size**: the fine layer estimate (about 80 KB per 5° tile) is untested. The first baker run decides how many
  ranges fit. Fallback: zoom 7 (about 1.2 km) for the lowest-priority ranges.
- **Cap flicker at tile boundaries**: mitigated by the fall-back chain; verify on the Himalaya and the date line.
- **Terrain-following feel**: smoothing too strong lets the plane clip; too weak looks jerky. One tuning
  constant, tested over the Himalaya and the Alps.
- **Airliners and trails** may fly lower than the new maximum terrain height; audit in tasks.
