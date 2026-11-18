// Bakes the map layers of Geo-Flight's Explore mode (roads, railways, waterways) from Natural Earth 1:10m,
// plus the high-speed railways in service, drawn through their real stations (Natural Earth has no
// high-speed flag). No dependencies: `node bake-layers.mjs <sources> <out>` (see README.md).
//
// Output, one file per layer (<out>/roads.bin, rail.bin, water.bin), little-endian Int16 stream of lines:
//   [pointCount, class, lat0, lon0, dLat1, dLon1, ...]   lat / lon in 1/100 degree, then deltas
import fs from 'node:fs';
import path from 'node:path';

const [src, out] = process.argv.slice(2);
if (!src || !out) { console.error('usage: node bake-layers.mjs <sources> <out>'); process.exit(1); }
fs.mkdirSync(out, { recursive: true });
const read = (f) => JSON.parse(fs.readFileSync(path.join(src, f), 'utf8')).features;
const lines = (g) => (!g ? [] : g.type === 'LineString' ? [g.coordinates] : g.type === 'MultiLineString' ? g.coordinates : []);

// Douglas-Peucker in degrees
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a], [bx, by] = pts[b], dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1e-9;
    let best = -1, bd = tol;
    for (let i = a + 1; i < b; i++) { const d = Math.abs((pts[i][0] - ax) * dy - (pts[i][1] - ay) * dx) / L; if (d > bd) { bd = d; best = i; } }
    if (best > 0) { keep[best] = 1; stack.push([a, best], [best, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

function writeLayer(name, items, tol) {
  const buf = [];
  let n = 0, segs = 0;
  for (const { pts, cls } of items) {
    // split where a line jumps across the date line
    let run = [];
    const flush = () => {
      const s = simplify(run, tol).map(([lo, la]) => [Math.round(la * 100), Math.round(lo * 100)]);
      const u = s.filter((p, i) => i === 0 || p[0] !== s[i - 1][0] || p[1] !== s[i - 1][1]);
      if (u.length >= 2) {
        buf.push(u.length, cls, u[0][0], u[0][1]);
        for (let i = 1; i < u.length; i++) buf.push(u[i][0] - u[i - 1][0], u[i][1] - u[i - 1][1]);
        n++; segs += u.length - 1;
      }
      run = [];
    };
    for (const p of pts) { if (run.length && Math.abs(p[0] - run[run.length - 1][0]) > 180) flush(); run.push(p); }
    flush();
  }
  const a = Int16Array.from(buf);
  fs.writeFileSync(path.join(out, `${name}.bin`), Buffer.from(a.buffer));
  console.log(`${name}: ${n} lines, ${segs} segments, ${(a.byteLength / 1024).toFixed(0)} KB`);
}

/* ---------- roads: 0 expressway, 1 main road, 2 other road ---------- */
const roads = [];
for (const f of read('ne_10m_roads.geojson')) {
  const p = f.properties;
  if (p.featurecla !== 'Road' || p.scalerank > 7) continue;
  const cls = p.expressway === 1 ? 0 : p.type === 'Major Highway' || p.scalerank <= 5 ? 1 : 2;
  for (const l of lines(f.geometry)) roads.push({ pts: l, cls });
}
writeLayer('roads', roads, 0.012);

/* ---------- railways: 0 high-speed, 1 main line, 2 other line ---------- */
// stations [lat, lon] of high-speed lines in service (design speed 250 km/h or more, plus Acela and Sapsan)
const HSR = [
  // China
  [[39.90, 116.40], [39.13, 117.20], [36.67, 117.00], [34.26, 117.18], [32.94, 117.39], [32.06, 118.80], [31.81, 119.97], [31.30, 120.62], [31.23, 121.47]],
  [[39.90, 116.40], [38.04, 114.51], [36.61, 114.49], [34.75, 113.62], [30.59, 114.30], [28.23, 112.94], [26.89, 112.57], [23.13, 113.26], [22.54, 114.06], [22.30, 114.17]],
  [[31.23, 121.47], [30.27, 120.16], [29.08, 119.65], [28.68, 115.86], [28.23, 112.94], [27.57, 110.00], [26.65, 106.63], [25.04, 102.71]],
  [[45.80, 126.53], [43.82, 125.32], [41.80, 123.43], [41.10, 121.13], [39.94, 119.60], [39.63, 118.18], [39.90, 116.40]],
  [[34.26, 117.18], [34.41, 115.66], [34.75, 113.62], [34.62, 112.45], [34.34, 108.94], [34.36, 107.24], [34.58, 105.72], [36.06, 103.83], [36.62, 101.78], [38.93, 100.45], [39.73, 98.49], [42.82, 93.51], [42.95, 89.19], [43.83, 87.62]],
  [[30.27, 120.16], [29.87, 121.55], [28.00, 120.67], [26.07, 119.30], [24.48, 118.09], [23.35, 116.68], [22.54, 114.06]],
  [[32.06, 118.80], [31.82, 117.23], [30.59, 114.30], [30.69, 111.29], [29.56, 106.55], [30.66, 104.07]],
  [[34.34, 108.94], [33.07, 107.03], [32.44, 105.84], [30.66, 104.07]],
  [[23.13, 113.26], [22.82, 108.37], [23.90, 106.62], [25.04, 102.71]],
  [[36.07, 120.38], [36.67, 117.00]],
  // Japan (Shinkansen)
  [[35.68, 139.77], [35.51, 139.62], [34.97, 138.39], [34.70, 137.73], [35.17, 136.88], [34.99, 135.76], [34.73, 135.50], [34.69, 135.20], [34.66, 133.92], [34.40, 132.48], [33.89, 130.88], [33.59, 130.42], [32.79, 130.69], [31.58, 130.54]],
  [[35.68, 139.77], [35.91, 139.62], [36.56, 139.90], [37.75, 140.47], [38.26, 140.88], [39.70, 141.14], [40.51, 141.49], [40.83, 140.69], [41.90, 140.65]],
  [[35.91, 139.62], [36.32, 139.01], [37.91, 139.04]],
  [[36.32, 139.01], [36.64, 138.19], [36.70, 137.21], [36.58, 136.65], [35.65, 136.06]],
  // Korea (KTX), Taiwan (THSR)
  [[37.55, 126.97], [36.62, 127.33], [36.33, 127.43], [35.88, 128.63], [35.12, 129.04]],
  [[36.62, 127.33], [35.14, 126.79], [34.79, 126.39]],
  [[25.05, 121.52], [25.01, 121.21], [24.81, 121.04], [24.11, 120.62], [23.46, 120.32], [22.92, 120.29], [22.69, 120.31]],
  // Europe
  [[48.84, 2.37], [45.76, 4.86], [44.99, 4.98], [43.92, 4.79], [43.30, 5.38]],
  [[48.88, 2.36], [50.64, 3.07], [50.93, 1.81], [51.09, 1.12], [51.53, -0.13]],
  [[50.64, 3.07], [50.84, 4.34], [50.62, 5.57], [50.94, 6.96]],
  [[48.84, 2.32], [47.39, 0.69], [46.58, 0.34], [44.83, -0.56]],
  [[48.84, 2.32], [48.00, 0.19], [48.10, -1.67]],
  [[48.88, 2.36], [49.25, 4.03], [48.95, 6.17], [48.58, 7.74]],
  [[40.41, -3.69], [41.66, -0.88], [41.62, 0.62], [41.38, 2.14], [42.27, 2.96], [42.70, 2.88]],
  [[40.41, -3.69], [37.89, -4.78], [37.39, -5.98]],
  [[37.89, -4.78], [36.72, -4.42]],
  [[40.41, -3.69], [39.47, -0.38]],
  [[50.94, 6.96], [50.11, 8.66], [49.48, 8.47], [48.78, 9.18]],
  [[52.52, 13.37], [51.35, 12.38], [50.97, 11.04], [49.45, 11.08], [48.14, 11.56]],
  [[52.38, 9.74], [49.79, 9.94]],
  [[52.52, 13.37], [53.55, 10.01]],
  [[45.06, 7.68], [45.49, 9.20], [44.51, 11.34], [43.78, 11.25], [41.90, 12.50], [40.85, 14.27], [40.68, 14.77]],
  [[40.88, 29.23], [39.78, 30.51], [39.93, 32.85], [37.87, 32.48]],
  [[55.78, 37.66], [56.86, 35.90], [59.93, 30.36]],
  // Africa, Middle East, Central Asia, Indonesia, United States
  [[35.77, -5.80], [34.26, -6.58]],
  [[21.42, 39.83], [21.54, 39.17], [22.40, 39.10], [24.47, 39.61]],
  [[41.31, 69.28], [39.65, 66.96], [39.77, 64.42]],
  [[-6.27, 106.89], [-6.97, 107.75]],
  [[38.90, -77.01], [39.31, -76.62], [39.96, -75.18], [40.75, -73.99], [41.30, -72.93], [41.83, -71.41], [42.35, -71.06]]
];
// densify each station-to-station leg along the great circle so it bends with the globe
const D = Math.PI / 180;
function greatCircle(a, b, step = 0.25) {
  const v = ([la, lo]) => [Math.cos(la * D) * Math.cos(lo * D), Math.cos(la * D) * Math.sin(lo * D), Math.sin(la * D)];
  const A = v(a), B = v(b), w = Math.acos(Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]));
  const n = Math.max(1, Math.ceil(w / D / step)), res = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, s = Math.sin(w) || 1, ka = Math.sin((1 - t) * w) / s, kb = Math.sin(t * w) / s;
    const x = A[0] * ka + B[0] * kb, y = A[1] * ka + B[1] * kb, z = A[2] * ka + B[2] * kb;
    res.push([Math.atan2(y, x) / D, Math.asin(z / Math.hypot(x, y, z)) / D]);
  }
  return res;
}
const rail = HSR.map((st) => ({ pts: st.slice(1).flatMap((b, i) => greatCircle(st[i], b).slice(i ? 1 : 0)), cls: 0 }));
for (const f of read('ne_10m_railroads.geojson')) {
  const p = f.properties;
  if (p.featurecla !== 'Railroad' || p.scalerank > 9) continue;
  const cls = p.category === 1 || p.mult_track > 0 || p.electric > 0 ? 1 : 2;
  for (const l of lines(f.geometry)) rail.push({ pts: l, cls });
}
writeLayer('rail', rail, 0.012);

/* ---------- waterways: 0 great river, 1 river, 2 ferry route ---------- */
const water = [];
for (const f of read('ne_10m_rivers_lake_centerlines.geojson')) {
  const p = f.properties;
  if (p.featurecla !== 'River') continue;
  for (const l of lines(f.geometry)) water.push({ pts: l, cls: p.scalerank <= 4 ? 0 : 1 });
}
for (const f of read('ne_10m_roads.geojson')) if (f.properties.featurecla === 'Ferry') for (const l of lines(f.geometry)) water.push({ pts: l, cls: 2 });
writeLayer('water', water, 0.01);
