# Contract: Baked terrain files

The baker produces these files and the game reads them. Both sides must agree on this contract.

## Coordinates

- Longitude -180..180 east, latitude 90..-90 south, same as `day.jpg` and the existing tiles.
- Tile `(tx, ty)` covers longitude `[-180 + 10 tx, -170 + 10 tx)` and latitude `(90 - 10 ty, 80 - 10 ty]`.
- Fine tile `(fx, fy)` covers the same way with 5° steps.
- Row 0 of every image is the northern edge. Column 0 is the western edge.

## Encoding

Single channel, 8-bit: `h = (v / 255)^2 * 8900` metres. `0` means sea or sea level.

## Files

| Path | Size | Required |
|---|---|---|
| `assets/height.png` | 4096 × 2048, grey PNG | yes, bundled by Vite |
| `geoflight/tiles/<ty>_<tx>h.webp` | 600 × 600, lossy WebP, grey | all 648; a missing file falls back to the coarse map |
| `geoflight/tiles/fine/<fy>_<fx>.webp` | 910 × 910, lossy WebP, grey | only inside `ranges.json`; a missing file falls back to the base tile |

## Edge rules

- Neighbouring tiles share the heights on their common edge (the baker samples a shared 1-pixel border), so
  there is no step at tile seams (FR-009).
- Tiles at the antimeridian wrap: column 599 of `tx = 35` matches column 0 of `tx = 0`.
- Polar rows are clamped to the last valid row; no value is extrapolated beyond ±85° of Terrain Tiles
  coverage.

## Baker output report (stdout)

The baker prints: total bytes per layer, files written, max and RMS decoded error, reference-peak table and
an over-budget flag. A run is accepted only if the totals are inside the budget in [plan.md](../plan.md). If the
budget is exceeded the baker stops and reports, so the owner decides; it never drops a range silently.
