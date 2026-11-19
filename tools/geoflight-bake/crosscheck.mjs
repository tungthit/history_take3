// Cross-check of the elevation source used by the game (Mapzen Terrain Tiles, terrarium) against an
// independent official dataset (Copernicus DEM GLO-30, read straight from its public COG files).
//
//   node crosscheck.mjs <sampleDir> [--n 75] [--seed 1] [--json out.json]
//
// <sampleDir> caches the downloaded Terrain Tiles (outside the repo, e.g. D:\_WORKSPACE\terr-sample).
// Spec FR-015 / SC-007, task T004. Nothing here is shipped with the game.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fromUrl } from 'geotiff';

const args = process.argv.slice(2);
const SAMPLE = args[0];
if (!SAMPLE) { console.error('usage: node crosscheck.mjs <sampleDir> [--n 75] [--seed 1] [--json out.json]'); process.exit(1); }
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const PER_RANGE = +opt('--n', 75), SEED = +opt('--seed', 1), JSON_OUT = opt('--json', null);
fs.mkdirSync(SAMPLE, { recursive: true });

// ---- reference points: published height (m) and a coordinate good to about 1 km ----
// height = the figure the owner's data-sources.md quotes (see its table for the source of each)
const REFS = [
  { name: 'Mount Everest', lat: 27.9881, lon: 86.9250, h: 8848.86 },
  { name: 'K2', lat: 35.8811, lon: 76.5133, h: 8611 },
  { name: 'Mont Blanc', lat: 45.8326, lon: 6.8652, h: 4805.59 },
  { name: 'Aconcagua', lat: -32.6531, lon: -70.0117, h: 6962 },
  { name: 'Denali', lat: 63.0692, lon: -151.0064, h: 6190.5 },
  { name: 'Kilimanjaro (Uhuru Peak)', lat: -3.0674, lon: 37.3556, h: 5895 },
  { name: 'Mount Elbrus', lat: 43.3525, lon: 42.4379, h: 5642 },
  { name: 'Mauna Kea', lat: 19.8206, lon: -155.4681, h: 4207.3 },
  { name: 'Badwater Basin (Death Valley)', lat: 36.2503, lon: -116.8258, h: -86 },
  { name: 'Dead Sea (shore)', lat: 31.5207, lon: 35.4845, h: -441.5 },
];
// ---- sampling boxes for the major ranges (same four ranges as planned for B/ranges.json) ----
const RANGES = [
  { name: 'Himalaya and Tibet', latMin: 26, latMax: 37, lonMin: 70, lonMax: 100 },
  { name: 'Alps', latMin: 43.5, latMax: 48.5, lonMin: 5, lonMax: 16 },
  { name: 'Andes', latMin: -40, latMax: -10, lonMin: -74, lonMax: -63 },
  { name: 'Rockies', latMin: 32, latMax: 60, lonMin: -125, lonMax: -104 },
];
const MOUNTAIN_MIN = 500; // random points are kept only when the reference DEM says at least this many metres

// ---- seeded random ----
let st = SEED >>> 0 || 1;
const rnd = () => { st = (st * 1664525 + 1013904223) >>> 0; return st / 4294967296; };

// ---- Terrain Tiles (terrarium), cached on disk ----
const tileCache = new Map();
async function tileRaw(z, x, y) {
  const k = `${z}/${x}/${y}`;
  if (tileCache.has(k)) return tileCache.get(k);
  const file = path.join(SAMPLE, String(z), String(x), `${y}.png`);
  let buf;
  if (fs.existsSync(file) && fs.statSync(file).size) buf = fs.readFileSync(file);
  else {
    const r = await fetch(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`);
    if (!r.ok) throw new Error(`tile ${k}: HTTP ${r.status}`);
    buf = Buffer.from(await r.arrayBuffer());
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, buf);
  }
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const t = { data, w: info.width };
  tileCache.set(k, t);
  return t;
}
const merc = (lat, lon, z) => {
  const n = 256 * 2 ** z, s = Math.sin(lat * Math.PI / 180);
  return [(lon + 180) / 360 * n, (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n];
};
async function ttPixel(z, px, py) { // elevation of one pixel
  const x = Math.floor(px / 256), y = Math.floor(py / 256), n = 2 ** z;
  const t = await tileRaw(z, ((x % n) + n) % n, Math.min(n - 1, Math.max(0, y)));
  const i = ((Math.floor(py) - y * 256) * 256 + (Math.floor(px) - x * 256)) * 3;
  return t.data[i] * 256 + t.data[i + 1] + t.data[i + 2] / 256 - 32768;
}
async function ttSample(lat, lon, z, windowKm) {
  const [px, py] = merc(lat, lon, z);
  const x0 = Math.floor(px - 0.5), y0 = Math.floor(py - 0.5), fx = px - 0.5 - x0, fy = py - 0.5 - y0;
  const [a, b, c, d] = await Promise.all([ttPixel(z, x0, y0), ttPixel(z, x0 + 1, y0), ttPixel(z, x0, y0 + 1), ttPixel(z, x0 + 1, y0 + 1)]);
  const at = (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
  let max = at;
  if (windowKm) {
    const mPerPx = 40075016.7 * Math.cos(lat * Math.PI / 180) / (256 * 2 ** z), r = Math.ceil(windowKm * 1000 / mPerPx);
    const jobs = [];
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) jobs.push(ttPixel(z, Math.floor(px) + i, Math.floor(py) + j));
    for (const v of await Promise.all(jobs)) if (v > max) max = v;
  }
  return { at, max };
}

// ---- Copernicus GLO-30 (COG on AWS Open Data), window reads over HTTP ----
const cogs = new Map();
async function cog(lat, lon) {
  const la = Math.floor(lat), lo = Math.floor(lon);
  const name = `Copernicus_DSM_COG_10_${la >= 0 ? 'N' : 'S'}${String(Math.abs(la)).padStart(2, '0')}_00_${lo >= 0 ? 'E' : 'W'}${String(Math.abs(lo)).padStart(3, '0')}_00_DEM`;
  if (!cogs.has(name)) {
    cogs.set(name, (async () => {
      try {
        const tiff = await fromUrl(`https://copernicus-dem-30m.s3.amazonaws.com/${name}/${name}.tif`);
        const img = await tiff.getImage();
        return { img, o: img.getOrigin(), res: img.getResolution(), w: img.getWidth(), h: img.getHeight() };
      } catch { return null; } // tile not published (ocean or withheld)
    })());
  }
  return cogs.get(name);
}
async function glSample(lat, lon, windowKm) {
  const c = await cog(lat, lon);
  if (!c) return null;
  const px = (lon - c.o[0]) / c.res[0] - 0.5, py = (lat - c.o[1]) / c.res[1] - 0.5;
  const rx = windowKm ? Math.ceil(windowKm * 1000 / (111320 * Math.cos(lat * Math.PI / 180) * Math.abs(c.res[0]))) : 1;
  const ry = windowKm ? Math.ceil(windowKm * 1000 / (110574 * Math.abs(c.res[1]))) : 1;
  const x0 = Math.max(0, Math.floor(px) - rx), y0 = Math.max(0, Math.floor(py) - ry);
  const x1 = Math.min(c.w, Math.floor(px) + rx + 2), y1 = Math.min(c.h, Math.floor(py) + ry + 2);
  if (x1 <= x0 || y1 <= y0) return null;
  const r = (await c.img.readRasters({ window: [x0, y0, x1, y1], samples: [0] }))[0];
  const w = x1 - x0, at = (xx, yy) => r[(Math.min(y1 - 1, Math.max(y0, yy)) - y0) * w + (Math.min(x1 - 1, Math.max(x0, xx)) - x0)];
  const ix = Math.floor(px), iy = Math.floor(py), fx = px - ix, fy = py - iy;
  const v = (at(ix, iy) * (1 - fx) + at(ix + 1, iy) * fx) * (1 - fy) + (at(ix, iy + 1) * (1 - fx) + at(ix + 1, iy + 1) * fx) * fy;
  let max = -1e9;
  for (let i = 0; i < r.length; i++) if (r[i] > max) max = r[i];
  return { at: v, max };
}

const mapLimit = async (items, n, fn) => { const out = new Array(items.length); let k = 0; await Promise.all(Array.from({ length: n }, async () => { while (k < items.length) { const i = k++; out[i] = await fn(items[i], i); } })); return out; };
const stats = (d) => {
  if (!d.length) return null;
  const a = d.map(Math.abs).sort((x, y) => x - y), n = d.length, mean = d.reduce((s, v) => s + v, 0) / n;
  return { n, bias: mean, rmse: Math.sqrt(d.reduce((s, v) => s + v * v, 0) / n), p90: a[Math.floor(0.9 * (n - 1))], max: a[n - 1] };
};
const f = (v, d = 1) => (v == null || Number.isNaN(v) ? 'n/a' : v.toFixed(d));

// ---------------- reference points ----------------
const WIN = 1; // km: coordinates are good to about 1 km, and a DEM smooths summits, so the highest cell nearby is compared too
const refRows = await mapLimit(REFS, 4, async (p) => {
  const [t8, t6, g] = await Promise.all([ttSample(p.lat, p.lon, 8, WIN), ttSample(p.lat, p.lon, 6, 3), glSample(p.lat, p.lon, WIN)]);
  return { ...p, t8, t6, g };
});
console.log('## Reference points (metres)\n');
console.log('| Point | Published | Terrain Tiles z8 at point / max within 1 km | Terrain Tiles z6 max within 3 km | GLO-30 at point / max within 1 km |');
console.log('|---|---|---|---|---|');
for (const r of refRows) console.log(`| ${r.name} | ${f(r.h, 2)} | ${f(r.t8.at)} / ${f(r.t8.max)} | ${f(r.t6.max)} | ${r.g ? f(r.g.at) + ' / ' + f(r.g.max) : 'n/a'} |`);

// ---------------- random mountain points ----------------
const results = { refs: refRows, ranges: {} };
console.log(`\n## Random mountain points (GLO-30 height >= ${MOUNTAIN_MIN} m), Terrain Tiles minus GLO-30, metres\n`);
console.log('| Range | Zoom | n | bias | RMSE | 90th pct of abs | max abs |');
console.log('|---|---|---|---|---|---|---|');
const all = { 8: [], 6: [] }, worst = [];
for (const R of RANGES) {
  const pts = [];
  for (let tries = 0; pts.length < PER_RANGE && tries < PER_RANGE * 60; tries += 8) {
    const batch = Array.from({ length: 8 }, () => ({ lat: R.latMin + rnd() * (R.latMax - R.latMin), lon: R.lonMin + rnd() * (R.lonMax - R.lonMin) }));
    const got = await mapLimit(batch, 8, async (b) => {
      const g = await glSample(b.lat, b.lon, 0);
      return g && g.at >= MOUNTAIN_MIN ? { ...b, g: g.at } : null;
    });
    for (const g of got) if (g && pts.length < PER_RANGE) pts.push(g);
  }
  const rows = await mapLimit(pts, 8, async (p) => ({ ...p, d8: (await ttSample(p.lat, p.lon, 8, 0)).at - p.g, d6: (await ttSample(p.lat, p.lon, 6, 0)).at - p.g }));
  results.ranges[R.name] = rows;
  for (const z of [8, 6]) {
    const d = rows.map((r) => r['d' + z]);
    all[z].push(...d);
    const s = stats(d);
    console.log(`| ${R.name} | ${z} | ${s ? s.n : 0} | ${f(s?.bias)} | ${f(s?.rmse)} | ${f(s?.p90)} | ${f(s?.max)} |`);
  }
  for (const r of rows) worst.push({ range: R.name, lat: r.lat, lon: r.lon, gl: r.g, d8: r.d8 });
}
for (const z of [8, 6]) {
  const s = stats(all[z]);
  console.log(`| **All four** | ${z} | ${s.n} | ${f(s.bias)} | ${f(s.rmse)} | ${f(s.p90)} | ${f(s.max)} |`);
}
worst.sort((a, b) => Math.abs(b.d8) - Math.abs(a.d8));
console.log('\n## Five largest zoom 8 differences\n');
console.log('| Range | lat | lon | GLO-30 (m) | Terrain Tiles z8 minus GLO-30 (m) |');
console.log('|---|---|---|---|---|');
for (const w of worst.slice(0, 5)) console.log(`| ${w.range} | ${f(w.lat, 3)} | ${f(w.lon, 3)} | ${f(w.gl)} | ${f(w.d8)} |`);
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(results, null, 1));
