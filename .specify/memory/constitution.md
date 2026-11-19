<!--
Sync Impact Report (temporary; remove before commit)
- Version change: 1.2.0 → 2.0.0
- Bump rationale: MAJOR. Several principles were redefined into stricter, checkable rules that the current
  repo does not yet meet (source on every knowledge entry, minimum timeline size, allowed simplifications,
  lock files, no direct commits to main). Wrong statements of fact were corrected.
- Modified principles:
  - I. History Browsing Is the Product: now requires every spec to name the aspect it serves.
  - II. Knowledge Before Visuals: `src` on every new or changed entry; at least 20 dated milestones before an
    aspect is shown; illustration captions count as knowledge.
  - III. Accurate Visuals: the only allowed simplifications are listed (approx flag, disclosed uniform
    exaggeration, captioned schematics).
  - VI. Source layout: grouped by role, not by feature; landmarks.js and the inline Vietnam history recorded as
    exceptions; placement rule for new modules.
  - VII. Naming: covers lowercase `.jsx` modules, `sciart.jsx`, history file names, constants.
  - VIII. Builds: lock files MUST be committed (the repo currently ignores them); Node version MUST be declared.
  - IX. Baked data: "heavy" defined.
  - X. English: proper nouns and non-English terms defined.
- Added sections: XI. Code Conventions; Compliance Checks; Definition of Done.
- Removed sections: none.
- Deferred work (the repo does not meet these yet; see the command report):
  - `.gitignore:2` ignores `package-lock.json` (VIII).
  - No knowledge entry has `src` (II).
  - Chemistry is an ACTIVE aspect with 8 milestones (II minimum is 20).
  - Facts in `art*.jsx` captions have no `src` (II).
  - No `engines` field in either package.json (VIII).
  - `README.md:41` points to the wrong flags path (IX).
-->
# Chill Geo-Flight Constitution

This document states the owner's direction (Principles I-III) and the rules the repository follows (IV-XI).
Every rule written with MUST is binding for people and agents. Where the repo does not yet meet a rule, the
gap is listed in the Sync Impact Report and must be closed, not reinterpreted.

## Core Principles

### I. History Browsing Is the Product
The purpose of the project is to let a person browse history through many aspects, easily. An aspect is
one thread, such as the history of computing, the history of pathology and medicine, or the history of a
country. The 3D globe and every other graphic are the presentation layer for this knowledge.
- Every feature spec MUST name the aspect(s) it serves and say how it helps a person explore them.
- A feature that serves no aspect (pure presentation or tooling) MUST say so in its spec and needs the
  owner's explicit approval before planning.

### II. Knowledge Before Visuals
Good knowledge comes first. Visual work on an aspect starts only after its data meets these rules.
- **Sources**: knowledge comes from Wikipedia and other reputable sources. Official data (a national survey,
  an agency, the original publication) MUST be used where it exists.
- **Traceability**: every new or changed knowledge entry MUST carry a `src` field: a URL, or a short
  citation that a reader can find. An entry without `src` is unverified.
- **Where knowledge lives**: facts live in the data modules (`history.js`, `history/<iso2>.js`,
  `scistory.js`, `places.js`, the `LANDMARKS` data in `landmarks.js`). Visual code reads them and MUST NOT add
  facts of its own. Explanatory captions in illustration modules (`cap` in `art*.jsx`) are knowledge and fall
  under the same `src` rule.
- **Rich timeline**: an aspect MUST have at least 20 dated milestones, each with `src`, before it is shown
  to users (for example before it is listed in `ACTIVE` in `scistory.js`).
- **Review**: for a new aspect, the owner reviews the data and its sources before any visual task starts.

Rationale: a polished visual on weak data spreads weak history.

### III. Accurate Visuals, No Untrue Content
Any 2D image, 3D model, map or animation MUST show its subject as the cited sources describe it. Content
MUST NOT be made "just to have something". Only these simplifications are allowed, and each MUST be
visible to the user:
1. **Approximate position**: the entry has `approx: true` and the UI shows "approximate location"
   (current practice: `history.js`, `GeoFlight.jsx`).
2. **Uniform exaggeration of scale** (for example terrain height): one factor applied everywhere, stated in
   the README credits.
3. **Schematic illustration**: a mechanism drawn in simplified form; its caption MUST say it is simplified.

Anything that cannot be shown accurately or by one of these three MUST be left out or replaced by a plain
label. When in doubt about a fact, check its `src` before drawing it.

### IV. Static Site on GitHub Pages, Committed Build Output
The game is a static site with no backend. Production is served by GitHub Pages at
https://tungthit.github.io/history_take3/ from the `docs/` folder of `main`.
- `docs/` is generated by Vite (`source/vite.config.js`) and MUST be committed in the same change as the
  source it was built from.
- Every URL MUST be relative (`base: './'`); no absolute path to the site's own files.
- `file://` is not supported; the README says how to serve `docs/` over http.

### V. three.js Is the 3D Engine
All 3D rendering uses three.js (pinned at 0.169.0) in WebGL, as the presentation layer of Principle I.
- The scene, renderer and camera MUST be created only in `engine.js`.
- Only these modules import three: `engine.js`, `globe.js`, `detail.js`, `layers.js`, `landmarks.js`,
  `models.js` (plus new 3D modules approved in a plan). They import it as `import * as THREE from 'three'`;
  three's example modules (for example `LineMaterial` in `layers.js`) may be imported by path.
- Custom drawing uses `THREE.ShaderMaterial` with GLSL; large data reaches the GPU as textures.
- React renders the UI around the canvas and MUST NOT draw 3D content.

### VI. Source Layout
Game code lives in `source/src/geoflight/` as flat modules grouped by role:
- Entry: `source/src/main.jsx`.
- Engine and rendering: `engine.js`, `globe.js`, `models.js`, `detail.js`, `layers.js`.
- Knowledge (data modules): `history.js`, `history/<iso2>.js`, `scistory.js`, `branches.js`, `places.js`.
- React UI: `GeoFlight.jsx`, `SciStory.jsx`.
- Illustrations: `sciart.jsx` (base set and SVG helpers), `artkit.jsx` (shared hooks and maths),
  `art<subject>.jsx`, merged in `artall.js`.
- Audio and speech: `audio.js`, `speech.js`. Styles: `geoflight.css`.
- Bundled assets: `assets/` (imported through Vite). Large data served as files: `source/public/geoflight/`.

Known exceptions, not to be copied: `landmarks.js` holds both landmark data and the code that builds their
3D models; the Vietnam history is written inside `history.js`. New code MUST keep data and rendering in
separate modules, and every new country MUST go in its own `history/<iso2>.js`.

### VII. Naming Conventions
- React components: PascalCase `.jsx` with a default export (`GeoFlight.jsx`, `SciStory.jsx`).
- Modules that contain JSX but are not components: lowercase `.jsx` (`sciart.jsx`, `artkit.jsx`,
  `art*.jsx`). All other modules: lowercase `.js`.
- Illustration modules: `art` plus a subject (`artmath`, `artphys`, `artbio`, `artmed`); `sciart.jsx` is the
  base set and keeps its name.
- Country history files: the lowercase ISO 3166-1 alpha-2 code (`history/af.js`).
- Module-level constants: UPPER_SNAKE_CASE (`ALT_MIN`, `TILE`).

### VIII. Reproducible Builds with Pinned Dependencies
- The app is built from `source/` with `npm install` and `npm run build`, which rewrites `docs/`.
- Every dependency in `source/package.json` and `tools/geoflight-bake/package.json` MUST be pinned to an exact
  version (no `^` or `~`). Version overrides (for example `rollup` in `source/package.json`) are pinned too.
- `package-lock.json` MUST be committed for both packages and MUST NOT be ignored.
- Both `package.json` files MUST declare the Node.js version they are tested with (`engines`).
- Adding a dependency needs a reason in the plan or the commit message.

### IX. Heavy Data Is Baked Offline, Not Computed at Run Time
- Processing of any external dataset (GeoJSON, rasters, elevation models, imagery, population data) MUST
  happen in `tools/geoflight-bake/` and its output MUST be committed. Runtime code only reads baked files and
  does per-frame work. Small procedural drawings (illustrations from formulas) are allowed at run time.
- Every external dataset MUST be listed in `tools/geoflight-bake/README.md` with its source URL, licence and
  required credit line, and the credit MUST also appear in the main README.
- Third-party assets keep their own licence files next to them
  (`source/src/geoflight/assets/flags/LICENSE.txt`).
- Randomness in bakes and illustrations MUST be seeded so outputs are stable.

### X. English Is the Primary Language
- All user-facing text (UI, labels, stories, captions, narration) MUST be in English.
- Proper nouns keep their own spelling, including diacritics (for example "Hùng Temple").
- A non-English term MUST appear together with its English meaning; it is never the only text.
- Speech uses an English voice (`speech.js`).

### XI. Code Conventions
- Every module starts with a one- or two-line comment that says what it does and where its data comes from.
- Geometry: the Earth has radius 1 in scene units; convert with `llToVec` and `vecToLL` from `engine.js`.
- GLSL lives in template literals tagged `/* glsl */`.
- Hot paths reuse module-level temporary objects (for example `tmpV` in `engine.js`) instead of allocating
  each frame.
- Heavy parts load lazily (`lazy(() => import(...))`, `import.meta.glob` for per-country history).
- Components use a default export; other modules use named exports.
- No `TODO` or `FIXME` is committed without a linked issue number.

## Stack & Constraints

- **Language and runtime**: JavaScript (ESM) with JSX. No TypeScript.
- **Libraries**: React 18 for the UI, three.js for 3D (Principle V), Vite for bundling.
- **Hosting**: GitHub Pages, static files only (Principle IV).
- **Knowledge sources**: Wikipedia and other reputable sources, official data preferred (Principle II).
- **Attribution**: the project is a web migration based on *Geographical Adventures* by Sebastian Lague
  (MIT). The README credits him and the original sources.
- **Third-party data**: only public-domain or openly licensed sources, each credited (Principle IX).

## Development Workflow

- `main` changes only through a pull request from a branch. No direct commits to `main`.
- Commit messages: `type: short imperative summary`, with `type` one of `feat`, `fix`, `data`, `docs`,
  `chore`, `refactor`, `perf`. `data` is for knowledge changes.
- Features follow Spec Kit (`specs/NNN-name/` numbered in sequence): spec, plan with a Constitution Check,
  tasks, then implementation.
- The repo has no CI, linter, formatter or automated test suite. The Compliance Checks below and the
  feature's `quickstart.md` are the verification.

### Definition of Done (every change that touches `source/` or `tools/`)

1. `npm run build` in `source/` succeeds and the rebuilt `docs/` is in the same commit or pull request.
2. The Compliance Checks pass.
3. The feature's `quickstart.md` scenarios were walked through and the result is noted in the pull request.
4. New knowledge entries carry `src`, and new visuals use only the simplifications of Principle III.

### Compliance Checks (run from the repo root)

| # | Check | Pass when |
|---|---|---|
| C1 | `git ls-files source/package-lock.json tools/geoflight-bake/package-lock.json` | both files listed |
| C2 | in `source/`: `npm run build`, then `git status --short docs/` | no output (docs up to date) |
| C3 | `grep -rln "from 'three'" source/src` | only the modules of Principle V |
| C4 | `grep -rn "new THREE.WebGLRenderer\|new THREE.Scene(\|new THREE.PerspectiveCamera" source/src` | only `engine.js` |
| C5 | `grep -rnE "[\"'](/geoflight\|/assets)/" source/src` | no output (no absolute URLs) |
| C6 | `git diff main -- source/src/geoflight \| grep "^+.*{ n: '" \| grep -v "src:"` | no output (new entries have `src`) |
| C7 | each aspect in `ACTIVE` (`scistory.js`) has at least 20 milestones | true |
| C8 | `grep -rnE "\^\|~" source/package.json tools/geoflight-bake/package.json` | no version ranges |
| C9 | `grep -rn "TODO\|FIXME" source/src tools/geoflight-bake --include=*.js --include=*.jsx --include=*.mjs` | each hit names an issue |
| C10 | top of `.specify/memory/constitution.md` | no Sync Impact Report comment in a commit |

## Governance

This constitution ranks above ad-hoc preferences, specs, plans and tasks. When a spec, plan or task
conflicts with it, the spec, plan or task changes.
- The owner (tungthit) is the reviewer. Every pull request is checked against the Definition of Done and the
  Compliance Checks.
- Every `plan.md` MUST contain a Constitution Check that names each principle; a violation needs a written
  justification in Complexity Tracking and the owner's approval.
- Amendments go through a pull request that changes `.specify/memory/constitution.md`, states the reason,
  bumps the version and removes the Sync Impact Report before merging:
  - MAJOR: a principle is removed or redefined incompatibly, or a rule is tightened so existing code fails it.
  - MINOR: a principle, section or check is added or materially expanded.
  - PATCH: wording or clarification only.
- If the repo adopts CI, a linter or tests, this document MUST be amended to record them, and the matching
  Compliance Checks SHOULD move into that tooling.

**Version**: 2.0.0 | **Ratified**: 2026-11-19 | **Last Amended**: 2026-11-19
