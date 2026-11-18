// Pre-bakes every static asset the Geo-Flight game needs, so the browser never does heavy work at run time.
//
//   node bake.mjs <srcDir> <outDir>
//
// srcDir (public domain sources, not committed):
//   countries50.geojson  Natural Earth 1:50m admin-0 countries
//   places.geojson       Natural Earth 1:10m populated places (simple)
//   earth-blue-marble.jpg  NASA Blue Marble with bathymetry, 4096x2048 equirectangular
//   earth-night.jpg        NASA Earth at Night (city lights), 4096x2048
//   earth-topology.png     elevation, 2048x1024 grayscale
//
// outDir:
//   day.jpg      stylised day colour (4096x2048)
//   night.jpg    city lights only, grayscale (4096x2048); the warm colour is added in the shader
//   ids.png      country index per pixel, grayscale (4096x2048, 0 = sea) — GPU: glowing border of the
//                country below the plane, faint borders everywhere
//   ids-cpu.png  the same at 2048x1024, read once on the CPU to know which country we are over
//   relief.png   R = signed distance to the coast (128 = coastline, >128 sea), G/B = terrain normal x/y
//   world.json   countries (names EN/VI, ISO code, capital, label point), cities, shipping lanes
//   flags/       4x3 SVG flags from the flag-icons package (MIT, licence copied alongside)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const [SRC, OUT, TILES] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
const read = (f) => JSON.parse(fs.readFileSync(path.join(SRC, f), 'utf8'));
const r1 = (x) => Math.round(x * 100) / 100;

/* ---------------- countries → id raster ---------------- */
const gj = read('countries50.geojson');
const feats = gj.features
  .map((f) => ({ f, p: f.properties }))
  .sort((a, b) => (b.p.POP_EST || 0) - (a.p.POP_EST || 0)); // big countries first: smaller ones paint over shared slivers
if (feats.length > 254) throw new Error('too many countries for an 8-bit id map');

function rasterize(W, H) {
  const ids = new Uint8Array(W * H);
  feats.forEach(({ f }, k) => {
    const id = k + 1;
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const rings of polys) {
      const edges = [];
      let minY = Infinity, maxY = -Infinity;
      for (const ring of rings) {
        for (let i = 0; i < ring.length - 1; i++) {
          const [lo0, la0] = ring[i], [lo1, la1] = ring[i + 1];
          const x0 = (lo0 + 180) / 360 * W, y0 = (90 - la0) / 180 * H, x1 = (lo1 + 180) / 360 * W, y1 = (90 - la1) / 180 * H;
          if (y0 === y1) continue;
          edges.push([x0, y0, x1, y1]);
          minY = Math.min(minY, y0, y1); maxY = Math.max(maxY, y0, y1);
        }
      }
      const ys = Math.max(0, Math.floor(minY)), ye = Math.min(H - 1, Math.ceil(maxY));
      for (let y = ys; y <= ye; y++) {
        const cy = y + 0.5, xs = [];
        for (const [x0, y0, x1, y1] of edges) {
          if ((cy >= y0 && cy < y1) || (cy >= y1 && cy < y0)) xs.push(x0 + (cy - y0) / (y1 - y0) * (x1 - x0));
        }
        xs.sort((a, b) => a - b);
        for (let i = 0; i + 1 < xs.length; i += 2) {
          const a = Math.max(0, Math.ceil(xs[i] - 0.5)), b = Math.min(W - 1, Math.floor(xs[i + 1] - 0.5));
          for (let x = a; x <= b; x++) ids[y * W + x] = id;
        }
      }
    }
  });
  return ids;
}

const W = 4096, H = 2048;
const ids = rasterize(W, H);
const idsCpu = rasterize(2048, 1024);
await sharp(Buffer.from(ids), { raw: { width: W, height: H, channels: 1 } }).png({ compressionLevel: 9, palette: false }).toFile(path.join(OUT, 'ids.png'));
await sharp(Buffer.from(idsCpu), { raw: { width: 2048, height: 1024, channels: 1 } }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'ids-cpu.png'));
console.log('ids ok');

/* ---------------- coast distance (exact EDT, wraps east-west) + terrain normals ---------------- */
const RW = 2048, RH = 1024;
const land = new Uint8Array(RW * RH);
for (let y = 0; y < RH; y++) for (let x = 0; x < RW; x++) {
  let n = 0;
  for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) n += ids[(y * 2 + dy) * W + x * 2 + dx] ? 1 : 0;
  land[y * RW + x] = n >= 2 ? 1 : 0;
}
const INF = 1e9;
function edt1(f, n) { // Felzenszwalb & Huttenlocher squared distance transform in 1D
  const d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
  let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF;
  for (let q = 1; q < n; q++) {
    let s;
    while (true) { s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); if (s <= z[k]) k--; else break; }
    k++; v[k] = q; z[k] = s; z[k + 1] = INF;
  }
  k = 0;
  for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) ** 2 + f[v[k]]; }
  return d;
}
function distTo(target) { // distance (px) from every pixel to the nearest pixel where mask == target
  const g = new Float64Array(RW * RH);
  for (let x = 0; x < RW; x++) {
    const col = new Float64Array(RH);
    for (let y = 0; y < RH; y++) col[y] = land[y * RW + x] === target ? 0 : INF;
    const d = edt1(col, RH);
    for (let y = 0; y < RH; y++) g[y * RW + x] = d[y];
  }
  const out = new Float64Array(RW * RH);
  for (let y = 0; y < RH; y++) {
    const row = new Float64Array(RW * 3);
    for (let i = 0; i < RW * 3; i++) row[i] = g[y * RW + (i % RW)];
    const d = edt1(row, RW * 3);
    for (let x = 0; x < RW; x++) out[y * RW + x] = Math.sqrt(d[x + RW]);
  }
  return out;
}
const toLand = distTo(1), toSea = distTo(0);
const topo = await sharp(path.join(SRC, 'earth-topology.png')).greyscale().resize(RW, RH).raw().toBuffer();
const relief = Buffer.alloc(RW * RH * 3);
for (let y = 0; y < RH; y++) {
  const lat = (0.5 - (y + 0.5) / RH) * Math.PI;
  const cl = Math.max(0.15, Math.cos(lat));
  for (let x = 0; x < RW; x++) {
    const i = y * RW + x;
    const sd = land[i] ? -(toSea[i] - 0.5) : toLand[i] - 0.5; // >0 at sea
    relief[i * 3] = Math.max(0, Math.min(255, Math.round(128 + sd * 6)));
    const h = (xx, yy) => topo[Math.min(RH - 1, Math.max(0, yy)) * RW + ((xx + RW) % RW)];
    const dx = (h(x + 1, y) - h(x - 1, y)) / (2 * cl), dy = (h(x, y + 1) - h(x, y - 1)) / 2;
    const k = 0.09, nx = -dx * k, ny = dy * k, nl = Math.hypot(nx, ny, 1);
    relief[i * 3 + 1] = Math.round(128 + (nx / nl) * 127);
    relief[i * 3 + 2] = Math.round(128 + (ny / nl) * 127);
  }
}
await sharp(relief, { raw: { width: RW, height: RH, channels: 3 } }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'relief.png'));
console.log('relief ok');

/* ---------------- colour maps ---------------- */
// Prefer the full NASA original (21600x10800) when it is there: sharper base map and the detail tiles.
const BIG = path.join(SRC, 'bm21600.jpg');
const hasBig = fs.existsSync(BIG);
const look = (img) => img.modulate({ saturation: 1.22, brightness: 1.05 }).gamma(1.1).linear(1.07, -7);
sharp.cache(false);
await look(sharp(hasBig ? BIG : path.join(SRC, 'earth-blue-marble.jpg'), { limitInputPixels: false }).resize(W, H, { kernel: 'lanczos3' }))
  .jpeg({ quality: 86, progressive: true, mozjpeg: true }).toFile(path.join(OUT, 'day.jpg'));
// Detail tiles: 10° x 10° at the full 60 px/degree (600x600 WebP), streamed in round the plane at run time.
if (hasBig && TILES) {
  fs.mkdirSync(TILES, { recursive: true });
  const raw = await look(sharp(BIG, { limitInputPixels: false })).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const BW = raw.info.width, BH = raw.info.height, T = 600;
  let bytes = 0;
  for (let ty = 0; ty < BH / T; ty++) for (let tx = 0; tx < BW / T; tx++) {
    const f = path.join(TILES, `${ty}_${tx}.webp`);
    const tile = Buffer.alloc(T * T * 3);
    for (let y = 0; y < T; y++) raw.data.copy(tile, y * T * 3, ((ty * T + y) * BW + tx * T) * 3, ((ty * T + y) * BW + tx * T + T) * 3);
    await sharp(tile, { raw: { width: T, height: T, channels: 3 } }).webp({ quality: 74, effort: 5 }).toFile(f);
    bytes += fs.statSync(f).size;
  }
  console.log('tiles', (BW / T) * (BH / T), Math.round(bytes / 1048576) + ' MB');
  raw.data = null;
  await bakeTerrain(TILES, T);
}
{ // city lights only: the source paints moonlit land blue and lights orange, so keep bright warm pixels
  const { data } = await sharp(path.join(SRC, 'earth-night.jpg')).resize(W, H).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const L = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const warm = Math.max(0, r - b * 0.9) / 255, bright = Math.max(0, Math.min(1, (r - 60) / 120));
    L[i] = Math.round(255 * Math.min(1, Math.pow(warm * 3.4 * bright, 0.8)));
  }
  // The source lights are faint in places, so add our own from the populated-places data: a glow per town
  // sized by population, plus scattered suburb dots round the bigger ones (seeded, so bakes are stable).
  let seed = 12345;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const splat = (cx, cy, r, peak) => {
    const R = Math.ceil(r * 2.2);
    for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
      const y = Math.round(cy) + dy; if (y < 0 || y >= H) continue;
      const x = (Math.round(cx) + dx + W) % W;
      const v = peak * Math.exp(-(dx * dx + dy * dy) / (r * r * 0.7));
      const i = y * W + x, nv = Math.min(255, L[i] + v * 255 * 0.6);
      L[i] = Math.max(L[i], Math.round(Math.max(nv, v * 255)));
    }
  };
  for (const c of read('places.geojson').features.map((f) => f.properties)) {
    const pop = c.pop_max || 0;
    if (pop < 40000) continue;
    const x = (c.longitude + 180) / 360 * W, y = (90 - c.latitude) / 180 * H;
    const k = Math.min(1, Math.log10(pop / 40000) / 2.6);
    splat(x, y, 0.9 + 2.6 * k, 0.45 + 0.55 * k);
    const n = Math.min(60, Math.floor(pop / 120000));
    for (let j = 0; j < n; j++) {
      const a = rnd() * Math.PI * 2, d = (0.6 + rnd() * 2.6) * (1.5 + 3 * k);
      splat(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.9, 0.55 + rnd() * 0.5, 0.35 + rnd() * 0.45);
    }
  }
  await sharp(L, { raw: { width: W, height: H, channels: 1 } }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, 'night.jpg'));
  if (process.env.DEBUG) await sharp(L, { raw: { width: W, height: H, channels: 1 } }).extract({ left: 2600, top: 500, width: 1200, height: 700 }).png().toFile(path.join(process.env.DEBUG, 'lights.png'));
}
console.log('colour ok');

/* ---------------- terrain tiles: sharp relief and coastline for the streamed detail ---------------- */
// Elevation from the open Terrain Tiles (terrarium encoding, zoom 6, Web Mercator; SRTM / GMTED / ETOPO1),
// resampled onto each 10° tile. Output <ty>_<tx>a.webp: R/G = terrain normal (east, north), B = signed
// distance to the coast in pixels (128 = coastline, > 128 at sea), so surf and shallows match the imagery.
async function bakeTerrain(TILES, T) {
  const TD = path.join(SRC, 'terr'), Z = 64, ZP = 256, EW = Z * ZP;
  if (!fs.existsSync(TD)) { console.log('no terrain tiles, skipped'); return; }
  const elev = new Int16Array(EW * EW);
  for (let x = 0; x < Z; x++) for (let y = 0; y < Z; y++) {
    const f = path.join(TD, String(x), `${y}.png`);
    if (!fs.existsSync(f) || !fs.statSync(f).size) continue;
    const { data, info } = await sharp(f).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let j = 0; j < ZP; j++) for (let i = 0; i < ZP; i++) {
      const k = (j * info.width + i) * 3;
      const e = data[k] * 256 + data[k + 1] + data[k + 2] / 256 - 32768;
      elev[(y * ZP + j) * EW + x * ZP + i] = Math.max(-32000, Math.min(32000, Math.round(e)));
    }
  }
  console.log('terrain loaded');
  const sample = (lat, lon) => {
    const la = Math.max(-85.05, Math.min(85.05, lat)) * Math.PI / 180;
    const fx = ((lon + 180) / 360) * EW - 0.5, fy = ((1 - Math.log(Math.tan(la) + 1 / Math.cos(la)) / Math.PI) / 2) * EW - 0.5;
    const x0 = Math.floor(fx), y0 = Math.max(0, Math.min(EW - 2, Math.floor(fy))), ax = fx - x0, ay = Math.max(0, Math.min(1, fy - y0));
    const g = (x, y) => elev[y * EW + ((x % EW) + EW) % EW];
    return (g(x0, y0) * (1 - ax) + g(x0 + 1, y0) * ax) * (1 - ay) + (g(x0, y0 + 1) * (1 - ax) + g(x0 + 1, y0 + 1) * ax) * ay;
  };
  const MG = 24, S = T + MG * 2, step = 10 / T;
  const idLand = (lat, lon) => ids[Math.min(H - 1, Math.max(0, Math.floor((90 - lat) / 180 * H))) * W + ((Math.floor((lon + 180) / 360 * W) % W) + W) % W] > 0;
  const localDist = (mask, target) => {
    const g = new Float64Array(S * S);
    for (let x = 0; x < S; x++) { const col = new Float64Array(S); for (let y = 0; y < S; y++) col[y] = mask[y * S + x] === target ? 0 : INF; const d = edt1(col, S); for (let y = 0; y < S; y++) g[y * S + x] = d[y]; }
    const out = new Float64Array(S * S);
    for (let y = 0; y < S; y++) { const d = edt1(g.subarray(y * S, y * S + S), S); for (let x = 0; x < S; x++) out[y * S + x] = Math.sqrt(d[x]); }
    return out;
  };
  let bytes = 0;
  for (let ty = 0; ty < 18; ty++) for (let tx = 0; tx < 36; tx++) {
    const lat0 = 90 - ty * 10, lon0 = -180 + tx * 10;
    const E = new Float32Array(S * S), L = new Uint8Array(S * S);
    for (let j = 0; j < S; j++) {
      const lat = lat0 - (j - MG + 0.5) * step;
      for (let i = 0; i < S; i++) {
        const lon = lon0 + (i - MG + 0.5) * step;
        const e = sample(lat, lon);
        E[j * S + i] = e;
        L[j * S + i] = e > 0 || (e > -40 && idLand(lat, lon)) ? 1 : 0;
      }
    }
    const toLandD = localDist(L, 1), toSeaD = localDist(L, 0);
    const out = Buffer.alloc(T * T * 3);
    for (let j = 0; j < T; j++) {
      const lat = lat0 - (j + 0.5) * step, dxm = step * 111320 * Math.max(0.05, Math.cos(lat * Math.PI / 180)), dym = step * 111320;
      for (let i = 0; i < T; i++) {
        const q = (j + MG) * S + i + MG, o = (j * T + i) * 3;
        const land = L[q];
        let nx = 0, ny = 0;
        if (land) {
          const ex = 5.5; // vertical exaggeration: a toy globe wants visible mountains
          const dzdx = (Math.max(0, E[q + 1]) - Math.max(0, E[q - 1])) / (2 * dxm) * ex;
          const dzdn = (Math.max(0, E[q - S]) - Math.max(0, E[q + S])) / (2 * dym) * ex;
          const l = Math.hypot(dzdx, dzdn, 1); nx = -dzdx / l; ny = -dzdn / l;
        }
        const sd = land ? -(toSeaD[q] - 0.5) : toLandD[q] - 0.5;
        out[o] = Math.round(128 + nx * 127); out[o + 1] = Math.round(128 + ny * 127);
        out[o + 2] = Math.max(0, Math.min(255, Math.round(128 + sd * 5)));
      }
    }
    const f = path.join(TILES, `${ty}_${tx}a.webp`);
    await sharp(out, { raw: { width: T, height: T, channels: 3 } }).webp({ quality: 88, effort: 5 }).toFile(f);
    bytes += fs.statSync(f).size;
  }
  console.log('terrain tiles', Math.round(bytes / 1048576) + ' MB');
}

/* ---------------- countries, capitals, cities ---------------- */
const places = read('places.geojson').features.map((f) => f.properties);
const countries = feats.map(({ p }, k) => {
  const caps = places.filter((c) => c.adm0cap === 1 && (c.adm0_a3 === p.ADM0_A3 || c.sov_a3 === p.SOV_A3 && c.adm0_a3 === p.ADM0_A3));
  const cap = caps.sort((a, b) => b.pop_max - a.pop_max)[0];
  const iso = (p.ISO_A2_EH && p.ISO_A2_EH !== '-99' ? p.ISO_A2_EH : p.ISO_A2) || '';
  return {
    id: k + 1, name: p.NAME_LONG || p.NAME_EN || p.NAME, vi: p.NAME_VI || '', iso2: iso === '-99' ? '' : iso.toLowerCase(), cont: p.CONTINENT,
    cap: cap ? [cap.name, r1(cap.latitude), r1(cap.longitude)] : null, lab: [r1(p.LABEL_Y), r1(p.LABEL_X)], pop: p.POP_EST || 0
  };
});
const idAt = (lat, lon) => idsCpu[Math.min(1023, Math.floor((90 - lat) / 180 * 1024)) * 2048 + Math.min(2047, Math.floor((lon + 180) / 360 * 2048))];
const cities = places
  .filter((c) => c.adm0cap === 1 || c.pop_max >= 1200000 || (c.worldcity === 1 && c.pop_max >= 400000))
  .sort((a, b) => b.pop_max - a.pop_max)
  .map((c) => [c.name, r1(c.latitude), r1(c.longitude), c.pop_max, idAt(c.latitude, c.longitude), c.adm0cap === 1 ? 1 : 0]);
console.log('countries', countries.length, 'cities', cities.length);

/* ---------------- shipping lanes: A* over a 0.5° sea grid ---------------- */
const GW = 720, GH = 360;
const sea = new Uint8Array(GW * GH);
for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) {
  // sample the 2048 land mask in this cell
  let landN = 0;
  for (let dy = 0; dy < 3; dy++) for (let dx = 0; dx < 3; dx++) landN += land[Math.floor((y + dy / 3) * RH / GH) * RW + Math.floor((x + dx / 3) * RW / GW)];
  const lat = 90 - (y + 0.5) / GH * 180;
  sea[y * GW + x] = landN === 0 && lat < 64 && lat > -58 ? 1 : 0; // no polar shortcuts through the ice
}
const cell = (lat, lon) => [Math.floor((lon + 180) / 360 * GW) % GW, Math.min(GH - 1, Math.floor((90 - lat) / 180 * GH))];
const carve = (pts) => { // canals and narrow straits the coarse grid closes
  for (let i = 0; i + 1 < pts.length; i++) {
    const [la0, lo0] = pts[i], [la1, lo1] = pts[i + 1];
    for (let t = 0; t <= 1; t += 0.02) { const [x, y] = cell(la0 + (la1 - la0) * t, lo0 + (lo1 - lo0) * t); sea[y * GW + x] = 1; }
  }
};
carve([[31.6, 32.3], [30.6, 32.35], [29.9, 32.55], [29.2, 32.7], [27.8, 33.6]]); // Suez canal + Gulf of Suez
carve([[9.4, -79.9], [9.1, -79.7], [8.8, -79.55], [8.4, -79.4]]); // Panama canal
carve([[36.0, -6.2], [35.95, -5.4], [36.1, -4.8]]); // Gibraltar
carve([[12.7, 43.2], [12.4, 43.5], [12.0, 44.0]]); // Bab-el-Mandeb
carve([[26.6, 56.0], [26.3, 56.6], [25.8, 57.2]]); // Hormuz
carve([[1.3, 103.5], [1.2, 103.9], [1.3, 104.4]]); // Singapore strait
carve([[51.0, 1.5], [51.3, 2.3], [51.8, 3.2]]); // Dover strait

const near = new Uint8Array(GW * GH); // closeness to land, to keep lanes in open water when possible
for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) {
  let c = 0;
  for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const yy = y + dy; if (yy >= 0 && yy < GH && !sea[yy * GW + (x + dx + GW) % GW]) c++; }
  near[y * GW + x] = c;
}
function astar([sx, sy], [tx, ty]) {
  const N = GW * GH, g = new Float32Array(N).fill(Infinity), from = new Int32Array(N).fill(-1), closed = new Uint8Array(N);
  const heap = [];
  const push = (i, f) => { heap.push([f, i]); let j = heap.length - 1; while (j > 0) { const p = (j - 1) >> 1; if (heap[p][0] <= heap[j][0]) break; [heap[p], heap[j]] = [heap[j], heap[p]]; j = p; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let j = 0; for (;;) { const l = 2 * j + 1, r = l + 1; let m = j; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === j) break; [heap[m], heap[j]] = [heap[j], heap[m]]; j = m; } } return top; };
  const hd = (x, y) => { let dx = Math.abs(x - tx); dx = Math.min(dx, GW - dx); return Math.hypot(dx * Math.cos(((y - GH / 2) / GH) * Math.PI), y - ty); };
  const s = sy * GW + sx, t = ty * GW + tx;
  g[s] = 0; push(s, hd(sx, sy));
  while (heap.length) {
    const [, i] = pop();
    if (i === t) break;
    if (closed[i]) continue;
    closed[i] = 1;
    const x = i % GW, y = (i / GW) | 0, cl = Math.max(0.2, Math.cos(((y + 0.5) / GH - 0.5) * Math.PI));
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = (x + dx + GW) % GW, ny = y + dy;
      if (ny < 0 || ny >= GH) continue;
      const j = ny * GW + nx;
      if (!sea[j] || closed[j]) continue;
      const step = Math.hypot(dx * cl, dy) * (1 + near[j] * 0.35);
      if (g[i] + step < g[j]) { g[j] = g[i] + step; from[j] = i; push(j, g[j] + hd(nx, ny)); }
    }
  }
  if (from[t] < 0) return null;
  const out = [];
  for (let i = t; i >= 0; i = from[i]) out.push(i);
  return out.reverse().map((i) => [r1(90 - ((((i / GW) | 0) + 0.5) / GH) * 180), r1(((i % GW) + 0.5) / GW * 360 - 180)]);
}
function simplify(pts, tol) { // Douglas–Peucker in degrees (unwrapped longitudes)
  if (pts.length < 3) return pts;
  const un = [pts[0]];
  for (let i = 1; i < pts.length; i++) { let lo = pts[i][1]; while (lo - un[i - 1][1] > 180) lo -= 360; while (lo - un[i - 1][1] < -180) lo += 360; un.push([pts[i][0], lo]); }
  const keep = new Uint8Array(un.length); keep[0] = keep[un.length - 1] = 1;
  const rec = (a, b) => {
    let best = -1, bi = -1;
    const [ay, ax] = un[a], [by, bx] = un[b];
    for (let i = a + 1; i < b; i++) {
      const [py, px] = un[i];
      const l2 = (bx - ax) ** 2 + (by - ay) ** 2 || 1;
      const t = Math.max(0, Math.min(1, ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / l2));
      const d = Math.hypot(px - (ax + t * (bx - ax)), py - (ay + t * (by - ay)));
      if (d > best) { best = d; bi = i; }
    }
    if (best > tol) { keep[bi] = 1; rec(a, bi); rec(bi, b); }
  };
  rec(0, un.length - 1);
  return un.filter((_, i) => keep[i]).map(([la, lo]) => [la, r1(((lo + 540) % 360) - 180)]);
}
const PORTS = {
  Singapore: [1.15, 104.0], Shanghai: [30.9, 123.0], 'Hong Kong': [22.0, 114.4], Busan: [34.8, 129.3], Tokyo: [34.7, 140.1],
  'Los Angeles': [33.4, -118.6], 'Panama (Pacific)': [8.2, -79.4], 'Panama (Caribbean)': [9.7, -79.9], 'New York': [40.2, -73.4],
  Rotterdam: [52.1, 3.4], Hamburg: [54.2, 7.8], Gibraltar: [35.95, -5.6], 'Port Said': [31.7, 32.3], Suez: [27.6, 33.8], Dubai: [25.6, 55.0],
  Mumbai: [18.7, 72.4], Colombo: [6.6, 79.5], 'Cape Town': [-34.3, 18.0], Santos: [-24.3, -46.0], Sydney: [-34.0, 151.5], Lagos: [6.1, 3.4],
  Marseille: [43.0, 5.3], Piraeus: [37.7, 23.4], Haiphong: [20.4, 107.2], 'Ho Chi Minh City': [10.0, 107.3], Vancouver: [48.3, -125.4],
  'Rio de Janeiro': [-23.2, -43.1], Jakarta: [-5.8, 106.9], Manila: [14.4, 120.6], Perth: [-32.1, 115.4], Auckland: [-36.6, 175.2],
  Houston: [28.8, -94.6], Halifax: [44.4, -63.2], Dakar: [14.6, -17.6], Mombasa: [-4.2, 39.9], Valparaiso: [-33.0, -71.9]
};
const LANES = [
  ['Shanghai', 'Los Angeles'], ['Singapore', 'Port Said'], ['Port Said', 'Gibraltar'], ['Gibraltar', 'Rotterdam'], ['Rotterdam', 'New York'],
  ['New York', 'Panama (Caribbean)'], ['Panama (Pacific)', 'Los Angeles'], ['Shanghai', 'Singapore'], ['Hong Kong', 'Sydney'], ['Singapore', 'Dubai'],
  ['Dubai', 'Mumbai'], ['Santos', 'Cape Town'], ['Cape Town', 'Singapore'], ['Busan', 'Vancouver'], ['Tokyo', 'Sydney'], ['Marseille', 'Piraeus'],
  ['Lagos', 'Rotterdam'], ['Haiphong', 'Hong Kong'], ['Ho Chi Minh City', 'Singapore'], ['Gibraltar', 'New York'], ['Colombo', 'Singapore'],
  ['Rio de Janeiro', 'Lagos'], ['Jakarta', 'Perth'], ['Manila', 'Tokyo'], ['Sydney', 'Auckland'], ['Houston', 'Rotterdam'], ['Halifax', 'Hamburg'],
  ['Dakar', 'Gibraltar'], ['Mombasa', 'Colombo'], ['Valparaiso', 'Panama (Pacific)'], ['Haiphong', 'Busan'], ['Hamburg', 'Rotterdam']
];
const snap = ([x, y]) => { // nearest open-sea cell to a port
  for (let r = 0; r < 8; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
    const yy = y + dy, xx = (x + dx + GW) % GW;
    if (yy >= 0 && yy < GH && sea[yy * GW + xx]) return [xx, yy];
  }
  return [x, y];
};
const lanes = [];
for (const [a, b] of LANES) {
  const p = astar(snap(cell(...PORTS[a])), snap(cell(...PORTS[b])));
  if (!p) { console.warn('no lane', a, b); continue; }
  lanes.push({ from: a, to: b, pts: simplify(p, 0.35) });
}
console.log('lanes', lanes.length);

fs.writeFileSync(path.join(OUT, 'world.json'), JSON.stringify({ countries, cities, lanes }));

/* ---------------- flags (flag-icons, MIT): only the countries we have ---------------- */
const FLAGS = path.join('node_modules', 'flag-icons', 'flags', '4x3');
fs.mkdirSync(path.join(OUT, 'flags'), { recursive: true });
let nFlags = 0;
for (const c of countries) {
  const f = path.join(FLAGS, `${c.iso2}.svg`);
  if (c.iso2 && fs.existsSync(f)) { fs.copyFileSync(f, path.join(OUT, 'flags', `${c.iso2}.svg`)); nFlags++; }
}
fs.copyFileSync(path.join('node_modules', 'flag-icons', 'LICENSE'), path.join(OUT, 'flags', 'LICENSE.txt'));
console.log('flags', nFlags);
console.log('done');

/* ---------------- optional preview: lanes over the day map (DEBUG=1) ---------------- */
if (process.env.DEBUG) {
  const PW = 2048, PH = 1024, X = (lo) => (lo + 180) / 360 * PW, Y = (la) => (90 - la) / 180 * PH;
  const segs = lanes.map(({ pts }) => {
    let d = '';
    pts.forEach(([la, lo], i) => { const jump = i && Math.abs(lo - pts[i - 1][1]) > 180; d += `${i && !jump ? 'L' : 'M'}${X(lo).toFixed(1)} ${Y(la).toFixed(1)} `; });
    return `<path d="${d}" fill="none" stroke="#ff3" stroke-width="2"/>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PW}" height="${PH}">${segs}</svg>`;
  await sharp(path.join(OUT, 'day.jpg')).resize(PW, PH).composite([{ input: Buffer.from(svg) }]).jpeg().toFile(path.join(process.env.DEBUG, 'lanes.jpg'));
  await sharp(relief, { raw: { width: RW, height: RH, channels: 3 } }).png().toFile(path.join(process.env.DEBUG, 'relief-full.png'));
  console.log('preview ok');
}
