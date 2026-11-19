# Elevation Data Sources and Verification

**Feature**: [spec.md](./spec.md) (FR-015, SC-007) | **Tasks**: T001-T004 | **Status**: for owner review (T005)
**Date**: 2026-11-19

This is the knowledge step of the feature (constitution Principle II). It records what the height data really
is, where it comes from, how it was checked, and what the owner must accept before any visual work starts.
Nothing in the game has been changed yet.

## 1. What the working source contains (T001)

Working source: **Mapzen Terrain Tiles** on AWS Open Data, terrarium encoding
(`s3://elevation-tiles-prod/terrarium/{z}/{x}/{y}.png`). It is an aggregate of official agency datasets.
Sources: [AWS registry page](https://registry.opendata.aws/terrain-tiles/),
[data-sources.md](https://github.com/tilezen/joerd/blob/master/docs/data-sources.md) and
[attribution.md](https://github.com/tilezen/joerd/blob/master/docs/attribution.md) of the `joerd` project.

| Where and zoom | Dataset | Native resolution | Used by us for |
|---|---|---|---|
| Land, zoom 4-6 | GMTED2010 (USGS) | 7.5 arc-seconds (about 250 m) | global base layer (zoom 6) |
| Land, zoom 7-15, about 60°N to 56°S | SRTM (NASA / USGS) | 30 m | fine layer (zoom 8) |
| Land above 60°N, zoom 7-9 | GMTED2010 (USGS) | about 250 m | fine layer would be this above 60°N |
| Canada, zoom 7-15 | CDEM (Natural Resources Canada) | 20-400 m by latitude | Canadian Rockies at zoom 8 |
| Sea, and land at zoom 0-3 | ETOPO1 (NOAA) | 1 arc-minute | not displayed (sea is clamped to 0) |
| Europe | EU-DEM (Copernicus) | 30 m | only listed for zoom 9, so not used at zoom 8 |
| USA | 3DEP | 3-10 m | zoom 10-15 only, so not used at zoom 8 |

SRTM covers latitudes 60°N to 56°S ([NASA LP DAAC catalogue](https://www.earthdata.nasa.gov/data/catalog/lpcloud-srtmgl1-003)).
Outside that band (for example Denali at 63°N, Antarctica) the data is GMTED2010 or coarser.

**Licence.** Terrain Tiles is open data. Each underlying dataset carries its own terms: SRTM, GMTED2010 and 3DEP
are U.S. Government works with no copyright claimed, ETOPO1 is not subject to copyright in the United States,
Canada's CDEM is under the Open Government Licence – Canada. The `joerd` document also says attribution must
appear "in a place that is reasonable to the medium", and that users are responsible for checking each licence.

**Attribution lines to carry in the README** (verbatim from `attribution.md`; only the regions we actually bake
are needed, and the list will be revisited when T036 is done):

- "United States 3DEP (formerly NED) and global GMTED2010 and SRTM terrain data courtesy of the U.S. Geological Survey."
- "Global ETOPO1 terrain data U.S. National Oceanic and Atmospheric Administration" (the sea is not drawn raised, but
  ETOPO1 is part of the tiles we read)
- "Canada terrain data contains information licensed under the Open Government Licence – Canada;" (Canadian Rockies)
- Citation requested by AWS: "Terrain Tiles was accessed on DATE from https://registry.opendata.aws/terrain-tiles."

**Known limits** (from the same documents and from published SRTM validation):

- It is a surface model (radar), so it includes forest canopy and buildings, not strictly bare ground.
- It was built in 2017 and is not updated. Water levels in the data are the level at the acquisition date.
- SRTM's mission requirement is 16 m absolute vertical error at 90% confidence. USGS measured 3.5 m RMSE on mostly
  flat U.S. terrain. Independent studies report larger errors in rugged terrain such as the Himalaya
  ([USGS accuracy page](https://www.usgs.gov/core-science-systems/eros/topochange/science/accuracy-assessment-elevation-data),
  [Himalaya study](https://ui.adsabs.harvard.edu/abs/2017NatSR...741672M/abstract)).
- A DEM smooths narrow summits, so a peak in the data can sit below its published height (see section 3).

## 2. Cross-check dataset (T002)

**Chosen: Copernicus DEM GLO-30** (ESA), read directly from the public AWS bucket `copernicus-dem-30m`
(Cloud Optimized GeoTIFF, no account needed).

| Item | Value | Source |
|---|---|---|
| Resolution | 30 m | [AWS registry](https://registry.opendata.aws/copernicus-dem/) |
| Absolute vertical accuracy | under 4 m (90% linear error) | [Copernicus Data Space](https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM) |
| Relative vertical accuracy | under 2 m on slopes up to 20%, under 4 m above | same |
| Vertical reference | EGM2008 | same |
| Type | Digital Surface Model (includes buildings and vegetation) | same |
| Licence | free licence for the general public (Copernicus / ESA) | same |
| Citation text | "Copernicus Digital Elevation Model (DEM) was accessed on 2026-11-19 from https://registry.opendata.aws/copernicus-dem." | AWS registry |
| Notice if shown or redistributed | "© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved" (unmodified); the modified-data notice starts "produced using Copernicus WorldDEM-30" | Copernicus Data Space |

**Why this one.** Its radar data was taken by TanDEM-X in 2010-2015, so it does not share errors with SRTM (2000),
which is what the Terrain Tiles land data is built from. NASADEM was the other candidate, but it is derived from the
SRTM telemetry, so it would not be an independent check. GLO-30 is used here only as a **yardstick for the
check**. It is not shipped and no GLO-30 data is copied into the repo, so its notice is not needed in the game
unless the owner later decides to bake from it.

Known caveats: some GLO-30 tiles are withheld by the programme (ocean and a few countries), so those points are
skipped; the vertical reference differs (EGM2008 against EGM96 in SRTM), which is about 1 m or less at these sites,
far below the differences measured below.

## 3. Reference points (T003)

Published heights, with the quality of each source stated honestly. Coordinates are rounded and good to about 1 km
(from Wikidata and the widely published summit positions), so the comparison uses the highest cell within 1 km.

| Point | Published height (m) | Basis | Verification |
|---|---|---|---|
| Mount Everest | 8,848.86 | Nepal and China joint announcement, 8 Dec 2020, snow height ([Al Jazeera](https://www.aljazeera.com/news/2020/12/8/mt-everest-nepal-china-announce-revised-height-at-8848-metres)) | official, confirmed |
| Denali | 6,190.5 | USGS and NOAA NGS GPS survey 2015: 20,310 ft, top of the snow ([USGS](https://www.usgs.gov/news/national-news-release/new-elevation-nations-highest-peak)); metres by conversion | official, confirmed |
| Mont Blanc | 4,805.59 | Survey by the Haute-Savoie surveyors, Sept 2023, snow-covered summit; the rock summit is about 4,792 m ([L'info durable](https://www.linfodurable.fr/le-mont-blanc-mesure-480559-metres-moins-quen-2021-41486)) | confirmed (news report of the survey) |
| Badwater Basin | -86 | National Park Service: 282 ft below sea level ([NPS](https://www.nps.gov/places/badwater-basin.htm)) | official, confirmed |
| K2 | 8,611 | [Wikidata](https://www.wikidata.org/wiki/Q43512) (one reference) | **not independently confirmed** |
| Aconcagua | 6,962 | [Wikidata](https://www.wikidata.org/wiki/Q39739) (one reference) | **not independently confirmed** |
| Kilimanjaro (Uhuru Peak) | 5,895 | [Wikidata](https://www.wikidata.org/wiki/Q7296) (two references) | **not independently confirmed** |
| Mount Elbrus | 5,642 | [Wikidata](https://www.wikidata.org/wiki/Q43105) (one reference) | **not independently confirmed** |
| Mauna Kea | 4,207.3 | [Wikidata](https://www.wikidata.org/wiki/Q131230) (13,803 ft) | **not independently confirmed** |
| Dead Sea (shore) | -441.5 | [Wikidata](https://www.wikidata.org/wiki/Q23883) (-441.53); the level falls every year | **a past level, not current** |

The six "not confirmed" heights come from a well-cited reference database, which the owner accepted as a source,
but not from the national survey. They are good enough for ranking, and the owner may want an official figure for
K2 and Aconcagua before the figures appear anywhere in the product.

## 4. Cross-check results (T004)

Script: `tools/geoflight-bake/crosscheck.mjs`, run on 2026-11-19 with the seed 1 and 75 random mountain points in
each of the four ranges (300 points in total, kept only where GLO-30 reads at least 500 m). Terrain Tiles minus
GLO-30, in metres. Raw results were kept outside the repo.

| Range | Zoom | n | Bias | RMSE | 90th percentile of abs | Max abs |
|---|---|---|---|---|---|---|
| Himalaya and Tibet | 8 | 75 | 5.1 | 34.1 | 53.9 | 119.1 |
| Alps | 8 | 75 | -2.3 | 24.1 | 36.0 | 72.6 |
| Andes | 8 | 75 | 4.0 | 25.3 | 35.4 | 82.0 |
| Rockies | 8 | 75 | -1.1 | 16.7 | 26.1 | 50.5 |
| **All four** | **8** | **300** | **1.4** | **25.8** | **41.4** | **119.1** |
| **All four** | **6** | **300** | **2.8** | **149.4** | **258.0** | **670.5** |

Reference points (metres): Terrain Tiles at zoom 8 and GLO-30 take the highest cell within 1 km, zoom 6 within 3 km.

| Point | Published | Terrain Tiles z8 | Terrain Tiles z6 | GLO-30 |
|---|---|---|---|---|
| Mount Everest | 8,848.86 | 8,538.0 | 8,121.0 | 8,737.8 |
| K2 | 8,611 | 8,449.0 | 7,226.0 | 8,570.6 |
| Aconcagua | 6,962 | 6,815.0 | 6,118.0 | 6,915.5 |
| Denali | 6,190.5 | 5,884.0 | 5,879.0 | 6,179.9 |
| Kilimanjaro | 5,895 | 5,853.0 | 5,426.0 | 5,886.8 |
| Mount Elbrus | 5,642 | 5,601.0 | 5,271.0 | 5,632.4 |
| Mont Blanc | 4,805.59 | 4,673.0 | 4,127.0 | 4,810.7 |
| Mauna Kea | 4,207.3 | 4,186.0 | 4,003.0 | 4,204.2 |
| Badwater Basin | -86 | -81.0 | (window includes hills) | -84.8 |
| Dead Sea | -441.5 | -414.9 | -393.0 | -427.0 |

What this shows:

1. **Zoom 8 agrees with the independent dataset in the mountains**: RMSE about 26 m over 300 points, no range worse
   than 34 m, the largest single difference 119 m. For the fine layer the working source is sound.
2. **Zoom 6 (the global base layer) is much coarser**: RMSE about 149 m, up to 670 m. That is the smoothing of a
   250 m-to-2 km grid, not an error, and it is the reason the fine layer exists for the four ranges.
3. **Peaks are lower in the data than published**, in both datasets: Everest by 311 m (3.5%) in Terrain Tiles z8 and
   111 m (1.3%) in GLO-30; K2 by 162 m and 40 m. This is the usual smoothing of a DEM cell. The larger gap in Terrain Tiles is probably due to its coarser resampling of the 30 m source (not tested here). Displayed peaks will therefore be a few
   percent below the published heights. The ranking of all ten points is correct in Terrain Tiles z8.
4. **Above 60°N the data is coarser**: Denali is 306 m under its published height in Terrain Tiles against 11 m in
   GLO-30, because that area is GMTED2010 (about 250 m) rather than SRTM. None of the four required ranges is
   affected (the Rockies box ends at 60°N), but Alaska and the Arctic would show less detail.
5. **Water levels move**: the Dead Sea reads -415 m in Terrain Tiles (SRTM, February 2000), -427 m in GLO-30
   (2010-2015) and is quoted at -441.5 m today. The data is right for its date, and the game does not draw the sea
   raised, so this does not matter for the feature.

## 5. Proposed thresholds for the later bake (to accept or change at T005)

These are the numbers the baker (T031, T032) and SC-007 would check. They come from the results above, with room
for the lossy WebP encoding.

| Check | Threshold |
|---|---|
| Fine layer (zoom 8) against GLO-30, random mountain points | RMSE at most 40 m, 90th percentile at most 70 m, no single point above 150 m |
| Base layer (zoom 6) against GLO-30 | RMSE at most 200 m, no single point above 800 m |
| Reference peaks, heights read from the baked fine layer | within 5% below the published height and never above it by more than 1%; the ranking of all ten points is unchanged |
| Reference peaks, position | the highest cell within 5 km of the published coordinate (SC-002) |
| Baked tiles against their own source (encode and decode) | RMSE at most 5 m, max at most 30 m on the fine layer |

## 6. Open points for the owner (T005)

1. **Accept the source?** Recommendation: **yes, keep Terrain Tiles** (zoom 6 for the whole world, zoom 8 for the
   four ranges). It is official data underneath, it is already integrated, and it agrees with an independent
   official dataset to about 26 m RMSE in the mountains. Switching to GLO-30 would need a new baker, a different
   licence notice, and gives no visible gain at the planned detail.
2. **Land below sea level.** The planned encoding clamps all heights below 0 to 0 (sea level). Death Valley
   (-86 m), the Turpan basin, the Qattara depression and the shores of the Caspian Sea would therefore show as
   flat sea-level land, and a ranking of "lowlands" such as Badwater against the Dead Sea shore cannot be shown in
   the game. Options: (A) accept it and say so in the credits, simplest and sea stays flat; (B) change the
   encoding in T009 to cover about -500 to 8,900 m, at a small size cost. Recommendation: **A for the first
   version**, because the spec asks for mountains, and revisit later.
3. **Reference heights.** Accept the six heights taken from Wikidata for ranking, or ask for official figures for
   K2 and Aconcagua.
4. **Thresholds** in section 5.
5. **A new dev dependency** in the baker: `geotiff` 2.1.3 (pinned, only used by `crosscheck.mjs`, never shipped).
   Alternatively the check can be re-run with a different reader.
