# Contract: `terrain.js` interface

The only module the rest of the game talks to for terrain. All heights are returned already multiplied by `K`
and divided by the Earth radius, i.e. in scene units (Earth radius = 1).

## Constants

| Name | Value | Meaning |
|---|---|---|
| `K` | 8 (range 5-10) | vertical exaggeration |
| `H_MAX` | 8900 | metres at encoded value 255 |

## Functions

| Function | Returns | Notes |
|---|---|---|
| `initTerrain(renderer, coarseTexture, detailStreamer)` | terrain object | called once from `engine.js`, after the base textures are in |
| `heightAt(lat, lon)` | scene units ≥ 0 | CPU bilinear: fine tile, else base tile, else coarse. Never throws. 0 for the sea |
| `radiusAt(unitVec, clearance = 0)` | `1 + heightAt + clearance` | for placing objects |
| `groundClearance(unitVec, forwardVec, lookAhead)` | scene units | highest ground near a point and ahead of it, for the plane and camera |
| `update(cameraPos, dt)` | void | re-centres the cap, updates uniforms |
| `glslChunk` | string | shared GLSL `float terrainHeight(vec3 dir)`, injected into the globe, line and glow materials |
| `uniforms` | object | `heightCoarse`, `heightBase`, `heightFine`, slot tables, `capCenter`, `capRadius`, `K`, `displaceFade` |
| `cap` | `THREE.Mesh` | added to the scene by the engine |
| `dispose()` | void | frees textures and geometry |

## Behaviour rules

- `heightAt` and `terrainHeight` MUST agree to within one coarse texel, so placed objects sit on the drawn surface.
- Every returned height (`heightAt`, `radiusAt`, `terrainHeight`) already includes `displaceFade = 1 - smoothstep(1.9, 2.5, camera height)`, so markers, lines and the globe always share one surface, flat from orbit and fully raised when low.
- The camera is never closer to the ground than a minimum clearance (`groundClearance` plus a margin) (FR-008).
- With no tile resident the result equals the coarse map. The game never waits for tiles (FR-014).
- Sea level is exactly 0 and its surface is never displaced (FR-005).

## Callers that change

| Caller | Change |
|---|---|
| `engine.js` plane and camera | altitude relative to `radiusAt`, use `groundClearance` |
| `engine.js` flags, landmarks, city markers, labels | replace fixed radii with `radiusAt(n, eps)` |
| `layers.js` | line materials use `glslChunk` and `K` through `onBeforeCompile` |
| `globe.js` | vertex displacement, fragment discard under the cap, normals from the height gradient |
| `detail.js` | loads `h` and fine tiles, exposes slot tables and CPU copies to `terrain.js` |
