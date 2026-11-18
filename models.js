// Low-poly models built in code (no model files to download) and small canvas textures.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Paint every vertex of a geometry one colour (for merged, vertex-coloured models).
function tint(geo, color) {
  const c = new THREE.Color(color), n = geo.attributes.position.count, a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b; }
  geo.setAttribute('color', new THREE.BufferAttribute(a, 3));
  return geo;
}
const nonIndexed = (g) => (g.index ? g.toNonIndexed() : g);
const merge = (parts, keepNormals = false) => {
  const g = mergeGeometries(parts.map((p) => { const q = nonIndexed(p); delete q.attributes.uv; return q; }));
  if (!keepNormals) g.computeVertexNormals();
  return g;
};

/* ---------- the player's plane: a little yellow bush plane, nose along +Z, up +Y ---------- */
export function makePlayerPlane() {
  const group = new THREE.Group();
  const paint = new THREE.MeshStandardMaterial({ color: 0xffc23a, roughness: 0.45, metalness: 0.05 });
  const trim = new THREE.MeshStandardMaterial({ color: 0xe8402f, roughness: 0.5 });
  const white = new THREE.MeshStandardMaterial({ color: 0xfff7e6, roughness: 0.6 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2b2f45, roughness: 0.4, metalness: 0.3 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x9ad8ff, roughness: 0.1, metalness: 0.2, emissive: 0x16304a, emissiveIntensity: 0.35 });

  const body = new THREE.LatheGeometry([
    [0, -1.55], [0.13, -1.5], [0.2, -1.1], [0.28, -0.3], [0.32, 0.3], [0.31, 0.75], [0.26, 1.0], [0.1, 1.08], [0, 1.08]
  ].map(([r, y]) => new THREE.Vector2(r, y)), 18);
  body.rotateX(Math.PI / 2); // lathe axis Y -> Z (nose +Z)
  group.add(new THREE.Mesh(body, paint));
  const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.325, 0.325, 0.12, 18, 1, true), trim);
  stripe.rotation.x = Math.PI / 2; stripe.position.z = 0.35; group.add(stripe);
  const cowl = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.31, 0.22, 18), trim);
  cowl.rotation.x = Math.PI / 2; cowl.position.z = 0.98; group.add(cowl);
  const spinner = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.26, 14), white);
  spinner.rotation.x = Math.PI / 2; spinner.position.z = 1.2; group.add(spinner);
  const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), glass);
  cockpit.scale.set(0.85, 0.75, 1.6); cockpit.position.set(0, 0.22, 0.2); group.add(cockpit);

  const wing = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.07, 0.62), paint);
  wing.position.set(0, 0.26, 0.28); group.add(wing);
  [-1, 1].forEach((s) => {
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.075, 0.63), trim);
    tip.position.set(s * 1.4, 0.26, 0.28); group.add(tip);
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.95), dark);
    strut.position.set(s * 0.55, 0.02, 0.3); strut.rotation.z = s * 1.05; group.add(strut);
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.07, 12), dark);
    wheel.rotation.z = Math.PI / 2; wheel.position.set(s * 0.32, -0.42, 0.62); group.add(wheel);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.4), dark);
    leg.position.set(s * 0.2, -0.24, 0.62); leg.rotation.z = s * 0.6; group.add(leg);
  });
  const tail = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.05, 0.36), paint);
  tail.position.set(0, 0.06, -1.35); group.add(tail);
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.5, 0.42), trim);
  fin.position.set(0, 0.3, -1.38); fin.rotation.x = -0.25; group.add(fin);

  const prop = new THREE.Group();
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.0, 0.03), dark);
  prop.add(blade);
  const disc = new THREE.Mesh(new THREE.CircleGeometry(0.52, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide }));
  prop.add(disc);
  prop.position.z = 1.12; group.add(prop);

  // navigation lights (red left, green right, white tail): brighter at night
  const navMat = (c) => new THREE.MeshBasicMaterial({ color: c });
  const navL = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), navMat(0xff3344)); navL.position.set(-1.62, 0.26, 0.28);
  const navR = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), navMat(0x33ff77)); navR.position.set(1.62, 0.26, 0.28);
  group.add(navL, navR);

  group.traverse((o) => { o.castShadow = false; });
  return { group, prop };
}

/* ---------- AI airliner: white, slim, swept wings (merged, vertex coloured) ---------- */
export function makeAirlinerGeometry() {
  const body = tint(new THREE.CylinderGeometry(0.16, 0.12, 2.6, 10).rotateX(Math.PI / 2), 0xf6f8fb);
  const nose = tint(new THREE.SphereGeometry(0.16, 10, 8).scale(1, 1, 1.6).translate(0, 0, 1.3), 0xf6f8fb);
  const wingShape = new THREE.Shape([new THREE.Vector2(0, 0.35), new THREE.Vector2(1.5, -0.35), new THREE.Vector2(1.5, -0.6), new THREE.Vector2(0, -0.25)]);
  const wr = tint(new THREE.ExtrudeGeometry(wingShape, { depth: 0.04, bevelEnabled: false }).rotateX(Math.PI / 2).translate(0, 0, 0.1), 0xdfe6ef);
  const wl = wr.clone().scale(-1, 1, 1);
  const tailShape = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(0.55, -0.35), new THREE.Vector2(0.55, -0.5), new THREE.Vector2(0, -0.35)]);
  const tr = tint(new THREE.ExtrudeGeometry(tailShape, { depth: 0.03, bevelEnabled: false }).rotateX(Math.PI / 2).translate(0, 0.02, -0.85), 0xdfe6ef);
  const tl = tr.clone().scale(-1, 1, 1);
  const fin = tint(new THREE.BoxGeometry(0.04, 0.55, 0.4).translate(0, 0.32, -1.15), 0x3f7fd0);
  const engs = [-0.6, 0.6].map((x) => tint(new THREE.CylinderGeometry(0.09, 0.09, 0.35, 8).rotateX(Math.PI / 2).translate(x, -0.12, 0.2), 0x9aa4b4));
  // mirrored parts flip their winding: rebuild with correct side
  [wl, tl].forEach((g) => { const p = g.attributes.position; for (let i = 0; i < p.count; i += 3) { const ax = p.getX(i), ay = p.getY(i), az = p.getZ(i); p.setXYZ(i, p.getX(i + 1), p.getY(i + 1), p.getZ(i + 1)); p.setXYZ(i + 1, ax, ay, az); } });
  return merge([body, nose, wr, wl, tr, tl, fin, ...engs].map(nonIndexed));
}

/* ---------- ships ---------- */
export function makeCargoShipGeometry() {
  const hull = tint(new THREE.BoxGeometry(0.5, 0.22, 2.4).translate(0, 0.0, 0), 0x2f3b52);
  const bow = tint(new THREE.CylinderGeometry(0.25, 0.25, 0.22, 3, 1).rotateY(Math.PI / 6).scale(1, 1, 1.6).translate(0, 0, 1.2), 0x2f3b52);
  const water = tint(new THREE.BoxGeometry(0.52, 0.06, 2.42).translate(0, -0.08, 0), 0xc0392b);
  const colors = [0xe8402f, 0x3f7fd0, 0xffb400, 0x2fae6a, 0xe85d9a, 0xf2f2f2];
  const boxes = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) {
    boxes.push(tint(new THREE.BoxGeometry(0.2, 0.14 + ((r + c) % 3) * 0.05, 0.28).translate(c ? 0.11 : -0.11, 0.16, -0.7 + r * 0.3), colors[(r * 2 + c * 3) % colors.length]));
  }
  const bridge = tint(new THREE.BoxGeometry(0.46, 0.34, 0.3).translate(0, 0.26, -1.0), 0xf6f6f2);
  const stack = tint(new THREE.BoxGeometry(0.14, 0.2, 0.14).translate(0, 0.5, -1.05), 0xe8402f);
  return merge([hull, bow, water, ...boxes, bridge, stack].map(nonIndexed));
}
export function makeCruiseShipGeometry() {
  const hull = tint(new THREE.BoxGeometry(0.46, 0.24, 2.0), 0xf8f8f4);
  const bow = tint(new THREE.CylinderGeometry(0.23, 0.23, 0.24, 3, 1).rotateY(Math.PI / 6).scale(1, 1, 1.6).translate(0, 0, 1.0), 0xf8f8f4);
  const band = tint(new THREE.BoxGeometry(0.47, 0.05, 2.01).translate(0, -0.05, 0), 0x1f4f9a);
  const deck1 = tint(new THREE.BoxGeometry(0.4, 0.14, 1.5).translate(0, 0.19, -0.1), 0xffffff);
  const deck2 = tint(new THREE.BoxGeometry(0.34, 0.12, 1.1).translate(0, 0.32, -0.15), 0xf2f6fa);
  const pool = tint(new THREE.BoxGeometry(0.2, 0.02, 0.3).translate(0, 0.39, 0.25), 0x3fc6e8);
  const funnel = tint(new THREE.CylinderGeometry(0.08, 0.1, 0.22, 8).translate(0, 0.48, -0.45), 0x1f4f9a);
  return merge([hull, bow, band, deck1, deck2, pool, funnel].map(nonIndexed));
}

/* ---------- clouds: a cluster of soft lumps ---------- */
export function makeCloudGeometry(seed = 1) {
  let s = seed;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const parts = [];
  const n = 6 + Math.floor(rnd() * 5);
  for (let i = 0; i < n; i++) {
    const r = 0.35 + rnd() * 0.45;
    const g = new THREE.IcosahedronGeometry(r, 2);
    const a = rnd() * Math.PI * 2, d = rnd() * 0.9;
    g.translate(Math.cos(a) * d, r * 0.45 + rnd() * 0.2, Math.sin(a) * d * 0.7);
    parts.push(g);
  }
  const g = merge(parts.map((p) => tint(p, 0xffffff)), true); // keep the lumps' own smooth normals
  g.scale(1, 0.62, 1);
  return g;
}

/* ---------- canvas textures ---------- */
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
// soft round blob (shadows, glows)
export const blobTexture = () => canvasTex(128, 128, (g, w) => {
  const r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.45, 'rgba(255,255,255,.55)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, w, w);
});
// the white V of foam behind a ship (ship at the top edge, wake fanning out downwards)
export const wakeTexture = () => canvasTex(128, 256, (g, w, h) => {
  g.clearRect(0, 0, w, h);
  for (let y = 0; y < h; y++) {
    const t = y / h, spread = 6 + t * (w / 2 - 10), fade = Math.pow(1 - t, 1.4);
    // centre churn
    const cw = 5 + t * 14;
    g.fillStyle = `rgba(255,255,255,${0.75 * fade})`;
    g.fillRect(w / 2 - cw / 2, y, cw, 1);
    // the two arms
    g.fillStyle = `rgba(255,255,255,${0.9 * fade})`;
    g.fillRect(w / 2 - spread - 2, y, 4, 1); g.fillRect(w / 2 + spread - 2, y, 4, 1);
    if (y % 9 < 3) { g.fillStyle = `rgba(255,255,255,${0.35 * fade})`; g.fillRect(w / 2 - spread, y, spread * 2, 1); }
  }
});
// a star-like glint for city lights and plane strobes
export const glintTexture = () => canvasTex(64, 64, (g, w) => {
  const r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.2, 'rgba(255,255,255,.8)'); r.addColorStop(0.5, 'rgba(255,255,255,.15)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, w, w);
});
