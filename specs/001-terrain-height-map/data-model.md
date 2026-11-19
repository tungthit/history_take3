# Data Model: Real Terrain Height on the Globe

Entities from the spec, mapped to concrete data.

## Elevation data set

| Field | Meaning |
|---|---|
| source | Mapzen Terrain Tiles on AWS Open Data (SRTM, GMTED, ETOPO1 and others), terrarium encoding |
| licence / credit | Open data, credit "Mapzen Terrain Tiles"; recorded in README and baker README |
| zoom | 6 for the global base, 8 for fine ranges |
| unit | metres above sea level, sea clamped to 0 |

Validation: sea (`h < 0`) is stored as 0; land `h` clamped to 0..8900 m.

## Height encoding (shared by every height file)

`v = round(255 * sqrt(h / 8900))`, 8-bit, `h = (v / 255)^2 * 8900` metres. One channel.

## Coarse height map

- File `source/src/geoflight/assets/height.png`, 4096 × 2048, 8-bit grey, equirectangular
  (x = longitude -180..180, y = latitude 90..-90), same orientation as `day.jpg`.
- Always loaded. Used for the global vertex displacement, for the CPU fallback and for the cap fade.

## Base height tile (terrain region, level 1)

- File `source/public/geoflight/tiles/<ty>_<tx>h.webp`, 600 × 600, single channel, one per 10° tile
  (`tx` 0..35 from -180°, `ty` 0..17 from +90°), same grid as the existing colour and `a` tiles.
- State: `absent` → `loading` → `resident (GPU + CPU copy)` → `evicted` when it leaves the 7×7 window.

## Fine height tile (terrain region, level 2)

- File `source/public/geoflight/tiles/fine/<fy>_<fx>.webp`, 910 × 910, single channel, one per 5° tile
  (`fx` 0..71, `fy` 0..35). Exists only inside the ranges listed in `ranges.json`.
- State machine as above, in a 4×4 window. A tile that does not exist is a normal state: use the base tile.

## Terrain range

`ranges.json`: ordered list of `{ name, latMin, latMax, lonMin, lonMax }`. Priority order is also the order in
which the baker spends the size budget.

## Level of detail

| Camera height above ground | Heights used |
|---|---|
| orbit, above about 1.9 units | coarse map only, displacement faded to zero by 2.5 units so the globe is smooth, cap hidden |
| mid, below 1.9 | base tiles where resident, else coarse |
| low, in a range | fine tile where resident, else base, else coarse |

The existing `detailW` fade (1.9 to 2.5) is reused for the cap visibility and for the displacement fade (`displaceFade`). `heightAt` and `terrainHeight` both apply it, so objects on the ground stay on the drawn surface.

## Vertical exaggeration

Single constant `K` (default 8, range 5-10) in `terrain.js`.
Displayed radius = `1 + K * h / 6371000`.

## Terrain cap (runtime object)

| Field | Meaning |
|---|---|
| centre | unit vector under the camera, snapped to the vertex spacing to avoid shimmering |
| span | about 12° half-angle |
| grid | about 384 × 384 vertices, non-uniform spacing, plus skirt |
| rim fade | last 10% of the radius blends to the coarse height |

Re-centred only when the camera moves more than about 1° from the current centre.
