# Feature Specification: Real Terrain Height on the Globe

**Feature Branch**: `001-terrain-height-map`

**Created**: 2026-11-19

**Status**: Draft

**Input**: User description: "Hiện tại world map đang tròn và phẳng, cần kiếm thông tin height map để khi lia camera xuống thấp thì sẽ thấy các ngọn núi rõ rệt và theo thông tin public height map" (Today the world map is round and flat. We need to find height-map information so that when the camera is lowered, mountains are clearly visible and follow public height-map data.)

## Clarifications

### Session 2026-11-19

- Q: How much should mountains be exaggerated compared with true scale? → A: Moderate exaggeration (about 5-10x)
- Q: How detailed should terrain be at the lowest altitude, and how much repository growth is acceptable? → A: Several hundred metres per sample, repository growth of a few tens of MB
- Q: Should raised terrain cover the whole world or only major mountain ranges? → A: Whole world at base detail, with major mountain ranges at higher detail
- Q: Must the elevation data be verified before any visual work? → A: Yes. The source, credit and licence are documented per region and the data is cross-checked against a second official dataset before visuals are built (owner decision, constitution Principle II)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See real mountains when flying low (Priority: P1)

A player flies the camera down close to a mountainous region (for example the Himalayas, the Alps or the Andes). Instead of a smooth sphere with only painted shading, they see the land physically rise into peaks and fall into valleys, and the silhouette of the mountains against the sky or sea is visible from a low viewing angle.

**Why this priority**: This is the whole point of the request. Without visible relief at low altitude the feature has no value.

**Independent Test**: Fly low over a well-known range (e.g. the Himalayas) and look toward the horizon. The range shows as distinct raised terrain and the highest peaks are clearly taller than the surrounding lowlands.

**Acceptance Scenarios**:

1. **Given** the camera is high above the globe, **When** the player descends to a low altitude over a mountain range, **Then** mountains appear as three-dimensional raised terrain rather than a flat surface.
2. **Given** the camera is low over a range, **When** the player looks along the ground toward the horizon, **Then** ridges and peaks form a visible skyline that occludes terrain behind them.
3. **Given** the camera is low over flat terrain or open ocean, **When** the player looks around, **Then** the surface appears flat and sea level stays level with no artificial bumps.

---

### User Story 2 - Heights match public elevation data (Priority: P1)

The shape of the terrain is based on publicly available elevation data, so recognizable landmarks sit where and how tall they really are. A player who knows the real world can recognize the terrain.

**Why this priority**: The request states explicitly that the mountains must follow public height-map information, not invented shapes.

**Independent Test**: Compare several known locations (e.g. Mount Everest, Mont Blanc, Aconcagua, Death Valley) against the published elevation data. Their relative heights and positions agree, and the highest point is at the correct place.

**Acceptance Scenarios**:

1. **Given** a known mountain with published elevation, **When** the player views it, **Then** it is the tallest feature in its surroundings and located at its real geographic position.
2. **Given** two mountains of clearly different real height (e.g. Everest and a low hill range), **When** both are viewed, **Then** the taller one is visibly taller in the same proportion as the published data (after the project's chosen vertical scaling).
3. **Given** the data source and its licence, **When** a user opens the project credits or documentation, **Then** the elevation source and its licence are stated.

---

### User Story 3 - Smooth experience while moving (Priority: P2)

While flying across continents the terrain loads and changes without freezing the game, gaps in the ground or sudden jumps in the terrain shape. Existing layers (History, Science, countries, cities, landmarks, flight and roads/rail/water layers) keep working and stay aligned with the ground.

**Why this priority**: Terrain that stutters or breaks the existing game would make the feature a net loss, but it is secondary to the terrain being visible and accurate.

**Independent Test**: Fly continuously from the Pacific to the Himalayas to the Alps at low altitude and confirm the game stays responsive with no visible holes, and that markers and layers sit on the ground rather than floating or sinking.

**Acceptance Scenarios**:

1. **Given** the player flies quickly at low altitude, **When** new regions come into view, **Then** terrain appears without long freezes or holes in the ground.
2. **Given** a landmark, city marker or layer overlay in a mountain region, **When** the terrain is raised, **Then** the marker sits on the surface and is not buried or floating.
3. **Given** the player rises back to a high orbit view, **When** the whole globe is visible, **Then** the globe still reads as a smooth round planet and the terrain detail fades out gracefully.

---

### Edge Cases

- Camera is placed very close to a summit or inside a mountain: the camera must not end up under the terrain surface.
- Seams where regions of elevation data meet, and the antimeridian at ±180° longitude: no visible cracks or steps.
- Polar regions (Antarctica, Greenland, Arctic): elevation must display correctly without distortion.
- Ocean areas: bathymetry (sea floor depth) must not carve the sea surface away; the sea surface stays at sea level.
- Areas where elevation data is missing or has gaps: fall back to a smooth surface instead of spikes or holes.
- Slow connection or devices with limited graphics capability: the game must still work, with lower terrain detail rather than failing.
- Fast camera movement outside the loaded region: the player sees lower-detail terrain first, never an empty area.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The globe surface MUST show real terrain relief (raised mountains and lowered valleys), not only shading painted on a smooth sphere.
- **FR-002**: Terrain heights MUST be derived from publicly available global elevation data with an open licence compatible with this project's public hosting.
- **FR-003**: Peaks MUST appear at their true geographic positions, and relative heights between features MUST follow the source data. Displayed heights MUST be exaggerated uniformly by a moderate factor of about 5-10x compared with true scale, with the same factor applied everywhere.
- **FR-004**: Relief MUST be clearly visible when the camera is at low altitude, including as a skyline when looking toward the horizon.
- **FR-005**: The sea surface MUST remain at sea level, and land at or near sea level MUST look flat.
- **FR-006**: Raised terrain MUST cover the whole world at a base level of detail, and major mountain ranges (at least the Himalaya, Alps, Andes and Rockies) MUST have higher detail, resolving features of a few hundred metres at the lowest camera altitude. The added elevation data MUST stay within a few tens of MB of repository growth.
- **FR-007**: The level of terrain detail MUST increase as the camera descends and decrease as it rises, so that high-altitude views remain a smooth round globe.
- **FR-008**: The camera MUST NOT pass through the terrain surface at any location.
- **FR-009**: Terrain MUST appear continuously across tile seams, the antimeridian and the poles, with no visible cracks, holes or discontinuities.
- **FR-010**: Existing map content (country borders, cities, landmarks, History and Science layers, road/rail/water layers, flight controls) MUST remain correctly positioned on the raised terrain.
- **FR-011**: Existing shading of slopes and imagery MUST stay consistent with the new geometric terrain (lighting should agree with the visible shape of the mountains).
- **FR-012**: The elevation data source and its licence MUST be credited in the project documentation.
- **FR-013**: The game MUST keep running on the current static hosting setup with no server-side processing, and elevation data MUST be prepared ahead of time rather than computed in the player's browser.
- **FR-014**: When terrain data for a region has not loaded yet, the game MUST show a lower-detail version of that region instead of leaving a gap.
- **FR-015**: The elevation data MUST be verified before any visual work: its dataset, credit and licence documented for each region used, and its heights cross-checked against a second, independent official dataset at no fewer than 10 reference points and a sample of random points.

### Key Entities

- **Elevation data set**: Public global height information (metres above sea level) covering land, with a documented source, resolution and licence.
- **Terrain region**: A geographic portion of the Earth for which height information is loaded and displayed at a given level of detail.
- **Level of detail**: How finely the terrain is shaped at a given camera altitude, from a smooth globe in orbit to fine mountain shapes close to the ground.
- **Vertical exaggeration**: The ratio between true heights and the heights displayed, set to a moderate factor of about 5-10x so that mountains read clearly on a planet-sized globe.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At low altitude over the Himalayas, Alps and Andes, 9 out of 10 first-time testers can identify the mountain range from the terrain shape alone, without looking at labels.
- **SC-002**: For at least 10 reference peaks and lowlands, the displayed heights rank in the same order as the published elevation data, and each peak is within 5 km (on the globe) of its real position.
- **SC-003**: Zero visible holes, cracks or camera-under-ground cases during a 5-minute continuous low-altitude flight across at least three continents.
- **SC-004**: The game stays at an interactive frame rate (no freezes longer than 1 second) during that same flight on a mid-range laptop.
- **SC-005**: The first view of the globe after opening the game appears no more than 2 seconds later than it does today on the same connection.
- **SC-006**: In orbit view, the globe is visually indistinguishable in outline from a smooth sphere, with no distortion of the existing map content.
- **SC-007**: Every reference point and sampled point in the cross-check is inside the error thresholds that the project owner accepted, and the thresholds are recorded with the data sources.

## Assumptions

- The target players are people using a desktop or laptop browser with 3D graphics support; mobile performance tuning is out of scope for this feature.
- The existing game already uses public elevation tiles (Mapzen Terrain Tiles on AWS Open Data, at world zoom level 6) for shading and the coast distance. This feature will reuse those public sources where suitable, and a higher-detail public source may be added where it is needed for low-altitude views.
- Vertical exaggeration is moderate (about 5-10x, see Clarifications). The exact factor within that range will be decided during planning. It is not true to scale.
- Ocean floor depth (bathymetry) is not displayed as geometry. The sea stays flat.
- Terrain data is baked ahead of time with the project's existing asset-baking approach and committed to the repository, consistent with the static-site constitution.
- Terrain detail is limited to a few hundred metres per sample in major mountain ranges and a coarser base level elsewhere, within a few tens of MB of repository growth (see Clarifications). Sub-100-metre detail is out of scope.
- Buildings, trees, and other 3D objects on the ground are out of scope. Only the shape of the ground is covered.
