# Geo-Flight asset baker

Bakes every static asset of the **Chill Geo-Flight** game (`source/src/geoflight/assets/`) so the
browser never does heavy work at run time. The output is committed; run this only to change the data.

## Sources (download into one folder, not committed)

| File | Source | Licence |
|---|---|---|
| `countries50.geojson` | Natural Earth 1:50m admin-0 countries (`nvkelso/natural-earth-vector`, `geojson/ne_50m_admin_0_countries.geojson`) | Public domain |
| `places.geojson` | Natural Earth 1:10m populated places simple (`geojson/ne_10m_populated_places_simple.geojson`) | Public domain |
| `earth-blue-marble.jpg` | NASA Blue Marble with bathymetry, 4096x2048 (copy shipped in the `three-globe` npm package, `example/img/`) | Public domain (NASA) |
| `earth-night.jpg` | NASA Earth at Night, 4096x2048 (same package) | Public domain (NASA) |
| `earth-topology.png` | Elevation, 2048x1024 (same package) | Public domain (NASA) |
| `bm21600.jpg` | NASA Blue Marble NG topography + bathymetry, December, 21600x10800 (`assets.science.nasa.gov/.../bmng-topography-bathymetry/december/world.topo.bathy.200412.3x21600x10800.jpg`) | Public domain (NASA) |
| `terr/<x>/<y>.png` | Terrain Tiles on AWS Open Data, terrarium encoding, zoom 6 (`s3.amazonaws.com/elevation-tiles-prod/terrarium/6/x/y.png`) | Open data; credit: Mapzen Terrain Tiles (SRTM, GMTED, ETOPO1 and others) |
| `ne_10m_roads.geojson`, `ne_10m_railroads.geojson`, `ne_10m_rivers_lake_centerlines.geojson` | Natural Earth 1:10m (same repository, `geojson/`), for the map layers | Public domain |
| flags | `flag-icons` npm package (installed by `npm install`) | MIT, licence copied to `assets/flags/LICENSE.txt` |

## Run (Docker, the host has no Node)

```powershell
docker run --rm -v "<repo>\tools\geoflight-bake:/tool:ro" -v "<sources>:/src:ro" `
  -v "<repo>\frontend\src\games\geoflight\assets:/out" node:20 `
  sh -c "mkdir /b && cp /tool/* /b/ && cd /b && npm install && node --max-old-space-size=4096 bake.mjs /src /out"
```

Add `-e DEBUG=/dbg -v "<somewhere>:/dbg"` to also write previews (`lanes.jpg`, `relief-full.png`, `lights.png`).

## Outputs

- `day.jpg`: stylised day colour (4096x2048)
- `night.jpg`: city lights (4096x2048 grayscale): the source lights plus a glow per town from the
  populated-places data, sized by population
- `ids.png` / `ids-cpu.png`: country index per pixel (4096 for the GPU border glow, 2048 for the CPU lookup)
- `relief.png`: R = signed distance to the coast (surf, shallows), G/B = terrain normal
- `world.json`: 242 countries (EN/VI names, ISO code, capital), 520 cities, 32 shipping lanes found with
  A* over a 0.5° sea grid (canals and straits carved open, no polar shortcuts)
- `flags/`: 4x3 SVG flags
- with a third argument (`/tiles`, mapped to `source/public/geoflight/tiles`): 648 detail tiles of 10° at
  60 px/degree, `<ty>_<tx>.webp` (colour) and `<ty>_<tx>a.webp` (terrain normal + distance to the coast),
  streamed round the plane by `detail.js`

## Map layers (Explore mode)

`bake-layers.mjs` has no dependencies. It reads the three Natural Earth line files above and writes
`source/public/geoflight/layers/{roads,rail,water}.bin` (loaded only when a player switches a layer on):

```powershell
docker run --rm -v "<repo>\tools\geoflight-bake:/tool:ro" -v "<sources>:/src:ro" `
  -v "<repo>\frontend\public\geoflight\layers:/out" node:20 node /tool/bake-layers.mjs /src /out
```

- roads: expressways, main roads (scalerank 5 or less, or "Major Highway"), other roads up to scalerank 7
- rail: Natural Earth railways (main lines: category 1, multi-track or electrified) plus the high-speed lines
  in service, which Natural Earth does not flag: drawn through their real stations along great circles
  (list in the script)
- water: rivers (great rivers have scalerank 4 or less) and ferry routes; the game adds its own shipping lanes
