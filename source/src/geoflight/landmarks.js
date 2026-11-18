// Famous buildings and sights, modelled in code from simple shapes (not to scale, a toy-like look).
// Each model is about 1 unit tall, standing on y = 0, front facing +Z (south when placed).
// `iso` links it to the country it belongs to (shown when the plane flies over that country).
import * as THREE from 'three';

const M = {};
const mat = (k, c, o = {}) => (M[k] ||= new THREE.MeshStandardMaterial({ color: c, roughness: 0.75, metalness: 0.05, flatShading: true, ...o }));
// warm lights that glow at night (emissive intensity driven by the engine)
export const nightMats = [];
const glow = (k, c, e = 0xffc46b) => { if (!M[k]) { M[k] = new THREE.MeshStandardMaterial({ color: c, emissive: e, emissiveIntensity: 0, roughness: 0.6, flatShading: true }); nightMats.push(M[k]); } return M[k]; };

function add(g, geo, m, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const mesh = new THREE.Mesh(geo, m);
  mesh.position.set(x, y, z); mesh.rotation.set(rx, ry, rz);
  g.add(mesh);
  return mesh;
}
const box = (g, w, h, d, m, x = 0, y = 0, z = 0, ry = 0) => add(g, new THREE.BoxGeometry(w, h, d), m, x, y + h / 2, z, 0, ry);
const cyl = (g, rt, rb, h, m, x = 0, y = 0, z = 0, seg = 12) => add(g, new THREE.CylinderGeometry(rt, rb, h, seg), m, x, y + h / 2, z);
const frustum4 = (g, rt, rb, h, m, x = 0, y = 0, z = 0) => add(g, new THREE.CylinderGeometry(rt, rb, h, 4), m, x, y + h / 2, z, 0, Math.PI / 4);
const sphere = (g, r, m, x = 0, y = 0, z = 0, sy = 1) => { const s = add(g, new THREE.SphereGeometry(r, 14, 10), m, x, y, z); s.scale.y = sy; return s; };
const cone = (g, r, h, m, x = 0, y = 0, z = 0, seg = 12) => add(g, new THREE.ConeGeometry(r, h, seg), m, x, y + h / 2, z);

const B = {
  eiffel(g) {
    const m = mat('bronze', 0x8a6a4a), l = glow('eiffelL', 0x9a7650);
    frustum4(g, 0.2, 0.42, 0.28, m);
    box(g, 0.34, 0.03, 0.34, l, 0, 0.28);
    frustum4(g, 0.08, 0.17, 0.32, l, 0, 0.31);
    box(g, 0.15, 0.025, 0.15, l, 0, 0.63);
    frustum4(g, 0.02, 0.07, 0.34, m, 0, 0.655);
    cyl(g, 0.006, 0.006, 0.08, m, 0, 0.99, 0, 6);
    // arches under the first floor
    add(g, new THREE.TorusGeometry(0.11, 0.025, 6, 12, Math.PI), m, 0, 0.08, 0.21);
    add(g, new THREE.TorusGeometry(0.11, 0.025, 6, 12, Math.PI), m, 0.21, 0.08, 0, 0, Math.PI / 2);
  },
  bigben(g) {
    const stone = mat('ben', 0xd8c38a), roof = mat('benRoof', 0x4f6a5a), face = glow('clock', 0xfffbe8, 0xfff1c0);
    box(g, 0.9, 0.22, 0.22, stone, 0.35, 0, 0.05);
    box(g, 0.18, 0.72, 0.18, stone);
    [[0, 0.091], [0.091, 0], [0, -0.091], [-0.091, 0]].forEach(([x, z]) => { const c = add(g, new THREE.CylinderGeometry(0.06, 0.06, 0.01, 16), face, x, 0.6, z, Math.PI / 2, 0, 0); if (x) c.rotation.set(0, 0, Math.PI / 2); });
    frustum4(g, 0.02, 0.13, 0.26, roof, 0, 0.72);
    cyl(g, 0.006, 0.006, 0.06, roof, 0, 0.98, 0, 6);
  },
  colosseum(g) {
    const s = mat('colo', 0xd9b98a), d = mat('coloD', 0xb8935f);
    const outer = add(g, new THREE.CylinderGeometry(0.5, 0.5, 0.34, 40, 1, true, 0, Math.PI * 1.45), s, 0, 0.17, 0);
    outer.material.side = THREE.DoubleSide; outer.scale.x = 1.25;
    const low = add(g, new THREE.CylinderGeometry(0.5, 0.5, 0.22, 40, 1, true), s, 0, 0.11, 0); low.scale.x = 1.25;
    const inner = add(g, new THREE.CylinderGeometry(0.34, 0.34, 0.16, 32, 1, true), d, 0, 0.08, 0); inner.scale.x = 1.25;
    [0.08, 0.17, 0.26].forEach((y) => { const r = add(g, new THREE.TorusGeometry(0.5, 0.012, 4, 40, Math.PI * 1.45), d, 0, y, 0, Math.PI / 2, 0, 0); r.scale.x = 1.25; });
    const arena = add(g, new THREE.CylinderGeometry(0.3, 0.3, 0.02, 28), mat('sand', 0xe8d2a0), 0, 0.01, 0); arena.scale.x = 1.25;
  },
  pisa(g) {
    const w = mat('marble', 0xf2ece0);
    const t = new THREE.Group(); t.rotation.z = 0.09; g.add(t);
    for (let i = 0; i < 7; i++) { cyl(t, 0.12, 0.12, 0.1, w, 0, i * 0.11, 0, 18); add(t, new THREE.TorusGeometry(0.125, 0.012, 4, 18), mat('marbleD', 0xd8cfbf), 0, i * 0.11 + 0.1, 0, Math.PI / 2); }
    cyl(t, 0.09, 0.1, 0.12, w, 0, 0.77, 0, 18);
  },
  parthenon(g) {
    const w = mat('marble', 0xf2ece0), d = mat('marbleD', 0xd8cfbf);
    box(g, 1.0, 0.06, 0.5, d); box(g, 0.94, 0.04, 0.44, w, 0, 0.06);
    for (let i = 0; i < 8; i++) for (const z of [-0.19, 0.19]) cyl(g, 0.025, 0.028, 0.3, w, -0.42 + i * 0.12, 0.1, z, 10);
    box(g, 0.94, 0.06, 0.44, w, 0, 0.4);
    const roof = new THREE.Shape([new THREE.Vector2(-0.24, 0), new THREE.Vector2(0.24, 0), new THREE.Vector2(0, 0.1)]);
    const r = add(g, new THREE.ExtrudeGeometry(roof, { depth: 0.94, bevelEnabled: false }), d, -0.47, 0.46, 0, 0, Math.PI / 2, 0);
    r.position.set(-0.47, 0.46, 0);
  },
  brandenburg(g) {
    const s = mat('sandstone', 0xe2cfa3), c = mat('copper', 0x5f9a86);
    box(g, 0.9, 0.04, 0.3, s);
    for (let i = 0; i < 6; i++) cyl(g, 0.03, 0.035, 0.42, s, -0.38 + i * 0.152, 0.04, 0, 10);
    box(g, 0.94, 0.12, 0.3, s, 0, 0.46); box(g, 0.4, 0.06, 0.2, s, 0, 0.58);
    box(g, 0.16, 0.1, 0.06, c, 0, 0.64); cone(g, 0.02, 0.12, c, 0, 0.66, 0, 6);
  },
  windmill(g) {
    const brick = mat('mill', 0x8a5a3a), cap = mat('millCap', 0x3f3f46), sail = mat('sail', 0xf5efe0);
    cyl(g, 0.12, 0.22, 0.55, brick, 0, 0.04, 0, 8);
    cone(g, 0.15, 0.16, cap, 0, 0.59, 0, 8);
    const hub = new THREE.Group(); hub.position.set(0, 0.6, 0.17); g.add(hub); hub.userData.spin = true;
    for (let i = 0; i < 4; i++) { const b = add(hub, new THREE.BoxGeometry(0.07, 0.38, 0.01), sail, 0, 0.19, 0); const p = new THREE.Group(); p.rotation.z = (i * Math.PI) / 2; p.add(b); hub.add(p); }
  },
  stbasil(g) {
    const red = mat('basilR', 0xb8453a), w = mat('basilW', 0xf3ead8);
    box(g, 0.7, 0.18, 0.5, red);
    const domes = [[0, 0.5, 0, 0x2f9a6a, 0.12], [-0.22, 0.32, 0.12, 0xe8a13a, 0.08], [0.22, 0.32, 0.12, 0x3f7fd0, 0.08], [-0.22, 0.32, -0.14, 0xe85d5d, 0.08], [0.22, 0.32, -0.14, 0x9c5fd0, 0.08]];
    domes.forEach(([x, h, z, c, r]) => {
      cyl(g, r * 0.7, r * 0.8, h, w, x, 0.18, z, 10);
      sphere(g, r, mat(`dome${c}`, c), x, 0.18 + h + r * 0.6, z, 1.25);
      cone(g, r * 0.35, r * 1.2, mat(`dome${c}`, c), x, 0.18 + h + r * 1.4, z, 8);
    });
  },
  liberty(g) {
    const stone = mat('ped', 0xcdbf9e), green = mat('verdigris', 0x6fb59b), gold = glow('torch', 0xffd257);
    frustum4(g, 0.15, 0.22, 0.3, stone, 0, 0.04);
    cyl(g, 0.07, 0.1, 0.36, green, 0, 0.34, 0, 10);
    sphere(g, 0.05, green, 0, 0.75, 0);
    add(g, new THREE.CylinderGeometry(0.018, 0.022, 0.2, 8), green, 0.06, 0.8, 0, 0, 0, -0.35);
    cone(g, 0.03, 0.06, gold, 0.1, 0.89, 0, 8);
    for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; add(g, new THREE.ConeGeometry(0.01, 0.05, 4), green, Math.cos(a) * 0.05, 0.81, Math.sin(a) * 0.05, Math.sin(a) * 0.6, 0, -Math.cos(a) * 0.6); }
  },
  goldengate(g) {
    const red = glow('ggRed', 0xc8442f, 0xff7a4a);
    box(g, 1.8, 0.03, 0.1, red, 0, 0.2);
    for (const x of [-0.5, 0.5]) { box(g, 0.04, 0.75, 0.04, red, x, 0, -0.05); box(g, 0.04, 0.75, 0.04, red, x, 0, 0.05); box(g, 0.04, 0.04, 0.14, red, x, 0.6); }
    for (const z of [-0.05, 0.05]) {
      const pts = []; for (let i = 0; i <= 30; i++) { const x = -0.9 + (i / 30) * 1.8; const ax = Math.abs(x); const y = ax < 0.5 ? 0.25 + 0.5 * (ax / 0.5) ** 2 : 0.75 - (ax - 0.5) * 0.9; pts.push(new THREE.Vector3(x, y, z)); }
      add(g, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.008, 4), red);
    }
  },
  cntower(g) {
    const c = mat('concrete', 0xd6d3cc), pod = glow('cnPod', 0xbfc7d2);
    for (const a of [0, 2.09, 4.19]) box(g, 0.05, 0.6, 0.12, c, Math.cos(a) * 0.04, 0, Math.sin(a) * 0.04, a);
    cyl(g, 0.035, 0.05, 0.75, c, 0, 0, 0, 8);
    cyl(g, 0.11, 0.08, 0.07, pod, 0, 0.6, 0, 16);
    cyl(g, 0.006, 0.02, 0.32, c, 0, 0.75, 0, 6);
  },
  chichen(g) {
    const s = mat('maya', 0xd7c49a), t = mat('mayaT', 0xc4ab78);
    for (let i = 0; i < 9; i++) box(g, 0.9 - i * 0.08, 0.06, 0.9 - i * 0.08, i % 2 ? t : s, 0, i * 0.06);
    box(g, 0.14, 0.54, 0.05, s, 0, 0, 0.42 - 0.02);
    box(g, 0.22, 0.14, 0.22, t, 0, 0.54);
  },
  christ(g) {
    const rock = mat('rock', 0x5f7a4a), w = mat('soapstone', 0xeeeae2);
    cone(g, 0.45, 0.45, rock, 0, 0, 0, 9);
    cyl(g, 0.05, 0.07, 0.35, w, 0, 0.45, 0, 8);
    box(g, 0.5, 0.05, 0.05, w, 0, 0.72);
    sphere(g, 0.035, w, 0, 0.84, 0);
  },
  opera(g) {
    const w = mat('shell', 0xfbfaf6), base = mat('podium', 0xc9a57a);
    box(g, 1.0, 0.08, 0.5, base);
    [[-0.3, 0.32], [-0.08, 0.28], [0.14, 0.24], [0.33, 0.18]].forEach(([x, r], i) => {
      const s = add(g, new THREE.SphereGeometry(r, 14, 10, 0, Math.PI, 0, Math.PI / 2), w, x, 0.08, 0.05 - i * 0.02, 0, Math.PI / 2, 0);
      s.scale.set(0.55, 1.15, 1); s.rotation.z = -0.25;
    });
  },
  moai(g) {
    const s = mat('tuff', 0x6b5d50), p = mat('ahu', 0x8a8070);
    box(g, 0.8, 0.08, 0.2, p);
    for (let i = 0; i < 5; i++) { box(g, 0.11, 0.38, 0.12, s, -0.3 + i * 0.15, 0.08); box(g, 0.13, 0.06, 0.07, s, -0.3 + i * 0.15, 0.36, 0.06); }
  },
  pyramids(g) {
    const s = mat('sandP', 0xe0c08a);
    [[0, 0.62, 0.42], [0.62, 0.48, 0.32], [1.05, 0.3, 0.2]].forEach(([x, h, r]) => add(g, new THREE.ConeGeometry(r, h, 4), s, x - 0.4, h / 2, 0, 0, Math.PI / 4, 0));
  },
  taj(g) {
    const w = mat('marbleW', 0xfbf8f2), water = mat('pool', 0x5fb6d9, { roughness: 0.2 });
    box(g, 0.9, 0.06, 0.9, mat('red', 0xc77d5a));
    box(g, 0.08, 0.01, 0.8, water, 0, 0.06, 0.1);
    box(g, 0.44, 0.3, 0.44, w, 0, 0.07);
    cyl(g, 0.12, 0.13, 0.08, w, 0, 0.37, 0, 16);
    sphere(g, 0.16, w, 0, 0.5, 0, 1.15);
    cone(g, 0.02, 0.12, mat('gold', 0xd8b04a, { metalness: 0.6 }), 0, 0.66, 0, 8);
    [[-0.36, -0.36], [0.36, -0.36], [-0.36, 0.36], [0.36, 0.36]].forEach(([x, z]) => { cyl(g, 0.025, 0.03, 0.5, w, x, 0.06, z, 8); sphere(g, 0.035, w, x, 0.58, z); });
  },
  burj(g) {
    const glass = glow('burj', 0x9fb6c9, 0xbfd8ff);
    const tiers = [[0.13, 0.3], [0.11, 0.28], [0.09, 0.26], [0.07, 0.22], [0.05, 0.2], [0.035, 0.18]];
    let y = 0;
    tiers.forEach(([r, h]) => { cyl(g, r * 0.85, r, h, glass, 0, y, 0, 6); y += h; });
    cyl(g, 0.004, 0.02, 0.25, glass, 0, y, 0, 6);
  },
  petronas(g) {
    const steel = glow('petronas', 0xc9d2dc, 0xd8e4ff);
    for (const x of [-0.16, 0.16]) {
      let y = 0, r = 0.11;
      [0.36, 0.2, 0.14, 0.08].forEach((h) => { cyl(g, r, r, h, steel, x, y, 0, 8); y += h; r *= 0.8; });
      cyl(g, 0.004, 0.03, 0.2, steel, x, y, 0, 8);
    }
    box(g, 0.2, 0.025, 0.04, steel, 0, 0.42);
  },
  mbs(g) {
    const t = glow('mbs', 0xd6dde4, 0xd8e4ff), deck = mat('deck', 0x7fa36a);
    [-0.3, 0, 0.3].forEach((x) => { add(g, new THREE.BoxGeometry(0.12, 0.62, 0.16), t, x, 0.31, 0, 0.06, 0, 0); });
    box(g, 0.95, 0.04, 0.18, deck, 0.05, 0.62);
  },
  angkor(g) {
    const s = mat('laterite', 0x8f8572), d = mat('lateriteD', 0x6f6758);
    box(g, 0.9, 0.06, 0.9, d); box(g, 0.7, 0.08, 0.7, s, 0, 0.06); box(g, 0.5, 0.08, 0.5, d, 0, 0.14);
    [[0, 0, 0.42], [-0.22, -0.22, 0.28], [0.22, -0.22, 0.28], [-0.22, 0.22, 0.28], [0.22, 0.22, 0.28]].forEach(([x, z, h]) => {
      cyl(g, 0.05, 0.07, h * 0.5, s, x, 0.22, z, 8);
      add(g, new THREE.SphereGeometry(0.06, 8, 8), s, x, 0.22 + h * 0.5 + 0.03, z).scale.y = 2.3;
    });
    const moat = water('moat', 0x4f9ab8);
    box(g, 1.3, 0.008, 0.14, moat, 0, 0, 0.6); box(g, 1.3, 0.008, 0.14, moat, 0, 0, -0.6); box(g, 0.14, 0.008, 1.06, moat, 0.58); box(g, 0.14, 0.008, 1.06, moat, -0.58);
    box(g, 0.08, 0.02, 0.2, mat('lateriteD', 0x6f6758), 0, 0, 0.6); // causeway
  },
  watarun(g) {
    const w = mat('arun', 0xefe8dc), tile = mat('arunT', 0xc9b48f);
    box(g, 0.7, 0.05, 0.7, tile);
    let y = 0.05, r = 0.16;
    for (let i = 0; i < 6; i++) { cyl(g, r * 0.85, r, 0.1, i % 2 ? tile : w, 0, y, 0, 12); y += 0.1; r *= 0.78; }
    cone(g, 0.03, 0.2, w, 0, y, 0, 8);
    [[-0.24, -0.24], [0.24, -0.24], [-0.24, 0.24], [0.24, 0.24]].forEach(([x, z]) => { cyl(g, 0.04, 0.06, 0.18, w, x, 0.05, z, 8); cone(g, 0.02, 0.1, w, x, 0.23, z, 8); });
  },
  seoultower(g) {
    const c = mat('concrete', 0xd6d3cc), pod = glow('seoulPod', 0xdfe6ee);
    cone(g, 0.45, 0.25, mat('hill', 0x5f8a4a), 0, 0, 0, 10);
    cyl(g, 0.03, 0.045, 0.45, c, 0, 0.25, 0, 8);
    cyl(g, 0.09, 0.07, 0.08, pod, 0, 0.62, 0, 14);
    cyl(g, 0.006, 0.02, 0.22, c, 0, 0.7, 0, 6);
  },
  tokyotower(g) {
    const red = glow('ttRed', 0xe2533b, 0xff8a4a), w = mat('ttW', 0xf6f2ea);
    frustum4(g, 0.14, 0.32, 0.3, red);
    box(g, 0.24, 0.04, 0.24, w, 0, 0.3);
    frustum4(g, 0.05, 0.12, 0.35, red, 0, 0.34);
    box(g, 0.1, 0.03, 0.1, w, 0, 0.69);
    frustum4(g, 0.01, 0.04, 0.28, red, 0, 0.72);
  },
  fuji(g) {
    const rock = mat('fujiR', 0x6f6a78), snow = mat('snow', 0xffffff);
    add(g, new THREE.ConeGeometry(0.9, 0.6, 20, 1, false), rock, 0, 0.3, 0);
    add(g, new THREE.ConeGeometry(0.34, 0.23, 20), snow, 0, 0.485, 0);
    const torii = new THREE.Group(); torii.position.set(0.6, 0, 0.65); g.add(torii);
    const red = mat('toriiR', 0xd8402f);
    box(torii, 0.02, 0.16, 0.02, red, -0.07); box(torii, 0.02, 0.16, 0.02, red, 0.07); box(torii, 0.22, 0.02, 0.03, red, 0, 0.16); box(torii, 0.18, 0.015, 0.02, red, 0, 0.12);
  },
  onepillar(g) {
    const water = mat('pond', 0x4fa3b8, { roughness: 0.25 }), wood = mat('wood', 0x8a4a2a), roof = mat('roofTile', 0x5a4a3f), stone = mat('stone', 0xb8b0a0);
    add(g, new THREE.BoxGeometry(0.9, 0.03, 0.9), water, 0, 0.015, 0);
    box(g, 0.94, 0.04, 0.06, stone, 0, 0, 0.47); box(g, 0.94, 0.04, 0.06, stone, 0, 0, -0.47);
    box(g, 0.06, 0.04, 0.94, stone, 0.47); box(g, 0.06, 0.04, 0.94, stone, -0.47);
    cyl(g, 0.05, 0.06, 0.3, stone, 0, 0.03, 0, 10);
    box(g, 0.32, 0.04, 0.32, wood, 0, 0.32);
    box(g, 0.24, 0.16, 0.24, mat('pagodaWall', 0xc8462f), 0, 0.36);
    const r = add(g, new THREE.ConeGeometry(0.3, 0.16, 4), roof, 0, 0.6, 0, 0, Math.PI / 4, 0); r.scale.y = 1;
    [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([sx, sz]) => add(g, new THREE.ConeGeometry(0.025, 0.08, 4), roof, sx * 0.19, 0.55, sz * 0.19, -sz * 0.6, 0, sx * 0.6));
    cyl(g, 0.012, 0.02, 0.08, mat('gold', 0xd8b04a, { metalness: 0.6 }), 0, 0.68, 0, 6);
    box(g, 0.08, 0.025, 0.42, stone, 0, 0.03, 0.55);
  },
  halong(g) {
    // ~2,000 limestone islets in the real bay: low, steep, bushy tops, scattered over open water
    const rock = mat('karst', 0x8f8f85), green = mat('karstG', 0x4f8a3f);
    [[0, 0, 0.36, 0.12], [-0.35, 0.22, 0.26, 0.1], [0.32, -0.18, 0.3, 0.11], [0.5, 0.32, 0.18, 0.07], [-0.55, -0.28, 0.22, 0.08], [-0.12, -0.48, 0.16, 0.07],
      [0.15, 0.48, 0.2, 0.08], [0.62, -0.05, 0.14, 0.06], [-0.7, 0.05, 0.15, 0.06], [-0.28, -0.08, 0.12, 0.05], [0.28, 0.15, 0.1, 0.05], [0.45, -0.48, 0.13, 0.06], [-0.45, 0.5, 0.12, 0.05], [0.05, -0.25, 0.09, 0.04]].forEach(([x, z, h, r], i) => {
      const k = add(g, new THREE.DodecahedronGeometry(r, 0), rock, x, h * 0.42, z, 0, i * 1.3, 0); k.scale.set(1, (h / r) * 0.6, 0.8 + (i % 3) * 0.12);
      sphere(g, r * 0.72, green, x, h * 0.78, z, 0.5);
    });
    // junk boats with brown-red sails
    [[0.15, 0.22, 0.4], [-0.3, -0.32, -0.8]].forEach(([x, z, ry]) => {
      const boat = new THREE.Group(); boat.position.set(x, 0.01, z); boat.rotation.y = ry; g.add(boat);
      box(boat, 0.16, 0.03, 0.05, mat('boat', 0x6b3f22)); box(boat, 0.05, 0.03, 0.04, mat('boatCab', 0xe8dcc0), -0.03, 0.03);
      for (const sx of [-0.03, 0.04]) add(boat, new THREE.BoxGeometry(0.005, 0.11, 0.07), mat('sailRed', 0xb8442f), sx, 0.1, 0, 0, Math.PI / 2, 0);
    });
  },
  guilin(g) {
    // Li River: a broad river winding between rounded, tree-covered karst hills; a bamboo raft with a fisherman
    const wet = water('liRiver', 0x6fb4c0), hills = [mat('guilinG', 0x4f9a52), mat('guilinD', 0x3f7f45), mat('guilinL', 0x6aa85a)], rock = mat('guilinR', 0x9a9a88);
    const riverZ = (x) => Math.sin(x * 3.2) * 0.16;
    for (let i = 0; i < 16; i++) { const x = -0.9 + i * 0.12; box(g, 0.14, 0.008, 0.22, wet, x, 0, riverZ(x), -Math.atan(Math.cos(x * 3.2) * 0.51)); }
    [[-0.75, 0.42, 0.34], [-0.48, 0.48, 0.42], [-0.2, 0.36, 0.28], [0.1, 0.5, 0.4], [0.38, 0.44, 0.3], [0.68, 0.38, 0.36], [-0.7, -0.36, 0.3], [-0.42, -0.5, 0.38], [-0.12, -0.42, 0.26], [0.2, -0.44, 0.36], [0.5, -0.5, 0.3], [0.8, -0.32, 0.26], [-0.3, 0.72, 0.3], [0.3, 0.75, 0.34], [0, -0.75, 0.3]].forEach(([x, z, h], i) => {
      const r = h * 0.55;
      const m = add(g, new THREE.SphereGeometry(r, 10, 7, 0, Math.PI * 2, 0, Math.PI / 2), hills[i % 3], x, 0, z); m.scale.y = h / r;
      if (i % 3 === 1) add(g, new THREE.SphereGeometry(r * 0.5, 7, 5, 0, Math.PI * 2, 0, Math.PI / 2), rock, x + r * 0.55, 0, z + 0.02).scale.y = h * 0.9 / (r * 0.5); // bare cliff face
    });
    const raft = new THREE.Group(); raft.position.set(0.05, 0.01, riverZ(0.05)); raft.rotation.y = 0.3; g.add(raft);
    for (let k = 0; k < 5; k++) cyl(raft, 0.009, 0.009, 0.22, mat('bamboo', 0xc9b25a), 0, 0, -0.035 + k * 0.017, 6).rotation.z = Math.PI / 2;
    cyl(raft, 0.013, 0.015, 0.06, mat('fisher', 0x3a4a6a), 0.03, 0.01, 0, 6); cone(raft, 0.035, 0.018, mat('hat', 0xd8c28a), 0.03, 0.07, 0, 8);
    [-0.06, -0.08].forEach((x, i) => sphere(raft, 0.013, mat('black', 0x2a2a2a), x, 0.025, (i - 0.5) * 0.03, 1.3));
    cyl(raft, 0.003, 0.003, 0.14, mat('bamboo', 0xc9b25a), 0.06, 0.02, 0, 4).rotation.z = -0.8; // the lantern pole
  },
  landmark81(g) {
    const glass = glow('lm81', 0x9fb8cc, 0xd8e8ff);
    const tiers = [[0.2, 0.34], [0.17, 0.22], [0.14, 0.18], [0.1, 0.14], [0.06, 0.1]];
    let y = 0;
    tiers.forEach(([w, h]) => { box(g, w, h, w, glass, 0, y, 0); y += h; });
    cyl(g, 0.004, 0.015, 0.12, glass, 0, y, 0, 6);
  }
};

/* ---------- more helpers ---------- */
// rectangular hip roof: bottom w x d, top k times smaller
const roof = (g, w, d, h, k, m, x = 0, y = 0, z = 0) => { const r = add(g, new THREE.CylinderGeometry(k * Math.SQRT1_2, Math.SQRT1_2, h, 4).rotateY(Math.PI / 4), m, x, y + h / 2, z); r.scale.set(w, 1, d); return r; };
// a hall with a (double) Asian roof
const hall = (g, x, z, w, d, h, body, roofM, y = 0, double = false) => {
  box(g, w, h, d, body, x, y, z);
  roof(g, w * 1.3, d * 1.45, h * 0.45, 0.45, roofM, x, y + h, z);
  if (double) roof(g, w * 0.95, d * 1.05, h * 0.5, 0.35, roofM, x, y + h + h * 0.32, z);
};
// triangular gable, w wide, h high, d deep, facing +Z
const gable = (g, w, h, d, m, x = 0, y = 0, z = 0) => { const s = new THREE.Shape([new THREE.Vector2(-w / 2, 0), new THREE.Vector2(w / 2, 0), new THREE.Vector2(0, h)]); return add(g, new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false }).translate(0, 0, -d / 2), m, x, y, z); };
// a rod between two points
const _up = new THREE.Vector3(0, 1, 0);
const rod = (g, a, b, r, m) => { const d = new THREE.Vector3().subVectors(b, a); const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d.length(), 6), m); mesh.position.copy(a).addScaledVector(d, 0.5); mesh.quaternion.setFromUnitVectors(_up, d.normalize()); g.add(mesh); return mesh; };
const water = (k = 'water', c = 0x3f8aa8) => mat(k, c, { roughness: 0.2 });
// mountains: peaks [x, z, height scale, radius scale]; snow = share of the height under snow
const mountain = (o) => (g) => {
  const rock = mat(`mt${o.c}`, o.c), snow = mat('snow', 0xffffff), H = o.h || 0.8, R = o.r || 0.6;
  (o.peaks || [[0, 0, 1, 1]]).forEach(([x, z, hk, rk], i) => {
    const h = H * hk, r = R * rk, seg = o.seg || 9, ry = i * 1.7 + 0.3;
    const top = o.flat ? r * o.flat : 0;
    const m = add(g, new THREE.CylinderGeometry(top, r, h, seg), rock, x, h / 2, z, 0, ry); m.scale.x = o.sx || 1;
    if (o.snow) {
      const sh = h * o.snow;
      const s = add(g, new THREE.CylinderGeometry(top * 1.04, top + (r - top) * o.snow * 1.04, sh, seg), snow, x, h - sh / 2 + 0.003, z, 0, ry); s.scale.x = o.sx || 1;
    }
  });
  if (o.smoke) [[0, 0.06, 0.07], [0.06, 0.15, 0.09], [0.15, 0.25, 0.11]].forEach(([dx, dy, r]) => sphere(g, r, mat('smoke', 0xe8e8ec), dx, H + dy, 0));
  if (o.extra) o.extra(g);
  if (o.trees) for (let i = 0; i < 9; i++) { const a = i * 2.4, rr = R * (0.95 + (i % 3) * 0.08); cone(g, 0.04, 0.13, mat('pine', 0x3f6a3a), Math.cos(a) * rr, 0, Math.sin(a) * rr, 6); }
};

Object.assign(B, {
  /* ---------- China ---------- */
  forbidden(g) {
    const red = mat('palRed', 0xa8382c), gold = mat('palGold', 0xe3a83a), white = mat('marble', 0xf2ece0);
    box(g, 1.1, 0.02, 0.9, mat('court', 0xcfc2a8));
    box(g, 1.1, 0.1, 0.05, red, 0, 0, 0.45); box(g, 1.1, 0.1, 0.05, red, 0, 0, -0.45); box(g, 0.05, 0.1, 0.9, red, 0.55); box(g, 0.05, 0.1, 0.9, red, -0.55);
    box(g, 0.62, 0.05, 0.42, white, 0, 0.02); box(g, 0.54, 0.05, 0.36, white, 0, 0.07);
    hall(g, 0, 0, 0.44, 0.24, 0.14, red, gold, 0.12, true);
    hall(g, 0, 0.45, 0.34, 0.1, 0.1, red, gold, 0.1);
    hall(g, 0, -0.33, 0.28, 0.1, 0.08, red, gold, 0.02);
    [[0.55, 0.45], [-0.55, 0.45], [0.55, -0.45], [-0.55, -0.45]].forEach(([x, z]) => hall(g, x, z, 0.08, 0.08, 0.08, red, gold, 0.08));
  },
  pearl(g) {
    const pink = glow('pearl', 0xd4508a, 0xff7ab0), c = mat('concrete', 0xd6d3cc);
    for (const a of [0, 2.09, 4.19]) rod(g, new THREE.Vector3(Math.cos(a) * 0.16, 0, Math.sin(a) * 0.16), new THREE.Vector3(Math.cos(a) * 0.05, 0.32, Math.sin(a) * 0.05), 0.025, c);
    cyl(g, 0.035, 0.045, 0.85, c, 0, 0, 0, 8);
    sphere(g, 0.13, pink, 0, 0.32, 0); sphere(g, 0.09, pink, 0, 0.64, 0); sphere(g, 0.04, pink, 0, 0.84, 0);
    cyl(g, 0.004, 0.015, 0.18, c, 0, 0.86, 0, 6);
  },
  terracotta(g) {
    const clay = mat('clay', 0xa8825a), dark = mat('clayD', 0x7a5a3a);
    box(g, 1.0, 0.03, 0.7, mat('pit', 0x9c7a55));
    for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) {
      const x = -0.38 + i * 0.15, z = -0.24 + j * 0.16;
      cyl(g, 0.03, 0.045, 0.15, clay, x, 0.03, z, 6); sphere(g, 0.03, dark, x, 0.21, z);
    }
    // the horses at the front
    for (const x of [-0.12, 0.12]) { box(g, 0.06, 0.08, 0.16, dark, x, 0.08, 0.36); box(g, 0.04, 0.08, 0.05, dark, x, 0.14, 0.43); }
  },
  potala(g) {
    const white = mat('potW', 0xf3efe6), red = mat('potR', 0x8f2f2a), gold = mat('gold', 0xd8b04a, { metalness: 0.6 });
    add(g, new THREE.CylinderGeometry(0.45, 0.7, 0.22, 10), mat('hillDry', 0x8a7a55), 0, 0.11, 0);
    box(g, 1.0, 0.22, 0.36, white, 0, 0.12, 0.1); box(g, 0.78, 0.2, 0.3, white, 0, 0.34, 0.06);
    box(g, 0.34, 0.2, 0.26, red, 0, 0.5, 0.05);
    for (let i = 0; i < 9; i++) box(g, 0.03, 0.04, 0.005, mat('win', 0x3a2a22), -0.4 + i * 0.1, 0.22, 0.281);
    [-0.1, 0.1].forEach((x) => roof(g, 0.1, 0.1, 0.06, 0.3, gold, x, 0.7, 0.05));
  },
  zhangjiajie(g) {
    const sand = mat('zjjR', 0xa8977a), band = mat('zjjB', 0x9c8b70), pine = mat('pine', 0x3f6a3a), mist = mat('mist', 0xffffff, { transparent: true, opacity: 0.35, depthWrite: false });
    const cols = [[-0.42, 0, 0.95, 0.07], [0.42, 0, 0.92, 0.07], [-0.15, 0.25, 0.78, 0.06], [0.18, -0.28, 0.85, 0.065], [0.05, 0.42, 0.6, 0.05], [-0.4, -0.35, 0.7, 0.055], [0.5, 0.35, 0.65, 0.055], [-0.6, 0.3, 0.55, 0.05], [0.65, -0.3, 0.6, 0.05], [-0.05, -0.05, 0.5, 0.05]];
    cols.forEach(([x, z, h, r], i) => {
      const n = Math.round(h / 0.12);
      for (let k = 0; k < n; k++) { const w = r * (1 - k * 0.03) * (0.92 + ((i * 7 + k * 3) % 5) * 0.04); cyl(g, w * 0.94, w, h / n, k % 3 === 1 ? band : sand, x, (k * h) / n, z, 7).rotation.y = i + k * 0.25; }
      [[0, 0, 0.09], [0.03, 0.02, 0.07], [-0.03, -0.01, 0.06]].forEach(([dx, dz, ph]) => cone(g, 0.028, ph, pine, x + dx, h, z + dz, 6));
    });
    // the glass bridge between the two tallest columns
    box(g, 0.84, 0.012, 0.05, mat('glass', 0xbfe8ff, { transparent: true, opacity: 0.6, roughness: 0.1 }), 0, 0.8);
    box(g, 0.84, 0.03, 0.005, mat('rail', 0xd8402f), 0, 0.812, 0.025); box(g, 0.84, 0.03, 0.005, mat('rail', 0xd8402f), 0, 0.812, -0.025);
    [[-0.25, 0.32, 0.15, 0.22], [0.3, 0.25, -0.12, 0.2], [0, 0.45, 0.3, 0.18], [-0.1, 0.2, -0.3, 0.2]].forEach(([x, y, z, r]) => sphere(g, r, mist, x, y, z, 0.35).scale.set(1.6, 0.35, 1));
  },

  /* ---------- Russia ---------- */
  hermitage(g) {
    const green = mat('hermG', 0x6fae8f), w = mat('hermW', 0xf3efe6);
    box(g, 1.1, 0.22, 0.45, green); box(g, 1.12, 0.03, 0.47, w, 0, 0.22);
    for (let i = 0; i < 14; i++) cyl(g, 0.012, 0.012, 0.2, w, -0.52 + i * 0.08, 0.01, 0.235, 6);
    box(g, 1.06, 0.06, 0.41, mat('hermR', 0x6a7a6a), 0, 0.25);
    for (let i = 0; i < 9; i++) cone(g, 0.012, 0.05, mat('bronze', 0x8a6a4a), -0.48 + i * 0.12, 0.25, 0.22, 6);
    // the Alexander Column on Palace Square
    cyl(g, 0.022, 0.028, 0.42, mat('granite', 0xa04a3a), 0, 0, 0.62, 8); sphere(g, 0.03, mat('bronze', 0x8a6a4a), 0, 0.45, 0.62);
  },
  motherland(g) {
    const c = mat('mother', 0xd8d4cc);
    cone(g, 0.5, 0.3, mat('hill', 0x5f8a4a), 0, 0, 0, 12);
    cyl(g, 0.05, 0.1, 0.36, c, 0, 0.3, 0, 8);
    sphere(g, 0.04, c, 0, 0.71, 0);
    add(g, new THREE.BoxGeometry(0.025, 0.2, 0.025), c, -0.08, 0.68, 0, 0, 0, 0.9); // raised arm
    add(g, new THREE.BoxGeometry(0.015, 0.36, 0.02), c, -0.25, 0.86, 0, 0, 0, 0.5); // sword
    add(g, new THREE.BoxGeometry(0.025, 0.18, 0.025), c, 0.1, 0.58, 0, 0, 0, -1.1);
    add(g, new THREE.BoxGeometry(0.14, 0.28, 0.012), c, 0.02, 0.52, -0.07, 0.35, 0, 0.1); // cape in the wind
  },

  /* ---------- Viet Nam ---------- */
  hue(g) {
    const stone = mat('hueS', 0x8a8578), red = mat('hueR', 0xb03a2e), yellow = mat('hueY', 0xe6b43a), dark = mat('dark', 0x2a2a2a);
    box(g, 1.0, 0.012, 0.2, water('lotus', 0x4f9a8a), 0, 0, 0.5);
    box(g, 0.9, 0.18, 0.22, stone); box(g, 0.2, 0.18, 0.4, stone, -0.35, 0, 0.25); box(g, 0.2, 0.18, 0.4, stone, 0.35, 0, 0.25);
    [-0.12, 0, 0.12].forEach((x) => box(g, 0.06, 0.1, 0.01, dark, x, 0, 0.111));
    hall(g, 0, 0, 0.5, 0.16, 0.08, red, yellow, 0.18, true);
    hall(g, -0.35, 0.3, 0.14, 0.14, 0.06, red, yellow, 0.18); hall(g, 0.35, 0.3, 0.14, 0.14, 0.06, red, yellow, 0.18);
    // the flag tower
    box(g, 0.16, 0.1, 0.16, stone, 0.65, 0, 0.55); cyl(g, 0.006, 0.006, 0.45, mat('pole', 0xdddddd), 0.65, 0.1, 0.55, 6);
    box(g, 0.12, 0.08, 0.004, mat('vnFlag', 0xda251d), 0.71, 0.45, 0.55);
  },
  hoian(g) {
    const wood = mat('hoiW', 0x8a4a2a), roofM = mat('hoiRoof', 0x9a5a3a), yellow = mat('hoiY', 0xe8c25a), stone = mat('stone', 0xb8b0a0), lan = glow('lantern', 0xe8452f, 0xff8a4a);
    box(g, 1.2, 0.012, 0.36, water('river', 0x4f8aa0));
    box(g, 0.06, 0.1, 0.16, stone, -0.28); box(g, 0.06, 0.1, 0.16, stone, 0.28);
    box(g, 0.7, 0.04, 0.18, wood, 0, 0.1); box(g, 0.6, 0.12, 0.16, yellow, 0, 0.14);
    roof(g, 0.74, 0.28, 0.1, 0.25, roofM, 0, 0.26);
    box(g, 0.16, 0.1, 0.16, yellow, 0, 0.14, -0.15); roof(g, 0.22, 0.22, 0.07, 0.3, roofM, 0, 0.24, -0.15);
    [[-0.42, 0.34], [-0.15, 0.36], [0.2, 0.35], [0.45, 0.33], [-0.4, -0.34], [0.38, -0.35]].forEach(([x, z], i) => {
      box(g, 0.2, 0.14, 0.16, yellow, x, 0, z); roof(g, 0.26, 0.22, 0.07, 0.3, roofM, x, 0.14, z);
      sphere(g, 0.022, lan, x + 0.06, 0.1, z + (z > 0 ? -0.09 : 0.09), 1.2);
      if (i % 2) sphere(g, 0.022, lan, x - 0.06, 0.1, z + (z > 0 ? -0.09 : 0.09), 1.2);
    });
  },
  fansipan: mountain({
    c: 0x4f6f45, h: 0.75, r: 0.55, peaks: [[0, 0, 1, 1], [-0.4, 0.2, 0.7, 0.8], [0.4, -0.15, 0.65, 0.7]], seg: 7, trees: true,
    extra(g) { // the summit marker and the cable car from Sa Pa
      frustum4(g, 0.005, 0.03, 0.08, mat('bronze', 0x8a6a4a), 0, 0.74);
      rod(g, new THREE.Vector3(0.75, 0.05, 0.45), new THREE.Vector3(0.05, 0.72, 0.05), 0.004, mat('cable', 0x333333));
      box(g, 0.05, 0.04, 0.04, mat('cabin', 0xe2533b), 0.4, 0.36, 0.25);
    }
  }),

  /* ---------- Japan, Korea ---------- */
  himeji(g) {
    const w = mat('himW', 0xf7f5ef), roofM = mat('himRoof', 0x5a6670);
    frustum4(g, 0.36, 0.5, 0.18, mat('himS', 0x9a958a));
    let y = 0.18, s = 0.46;
    for (let i = 0; i < 5; i++) { box(g, s, 0.09, s * 0.8, w, 0, y); roof(g, s * 1.25, s * 1.05, 0.06, 0.55, roofM, 0, y + 0.09); y += 0.13; s *= 0.8; }
    roof(g, 0.16, 0.12, 0.08, 0.1, roofM, 0, y);
    hall(g, 0.42, 0.2, 0.16, 0.12, 0.1, w, roofM, 0.1);
  },
  kinkakuji(g) {
    const gold = mat('goldLeaf', 0xe2b13c, { metalness: 0.5, roughness: 0.35 }), roofM = mat('kinRoof', 0x4a3a2f), w = mat('kinW', 0xf3efe6), pine = mat('pine', 0x3f6a3a);
    const pond = new THREE.Shape(); pond.moveTo(-0.55, 0.2); pond.bezierCurveTo(-0.6, 0.55, -0.1, 0.62, 0.2, 0.5); pond.bezierCurveTo(0.6, 0.45, 0.62, 0.15, 0.4, 0.12); pond.bezierCurveTo(0.1, 0.1, -0.5, -0.05, -0.55, 0.2);
    add(g, new THREE.ShapeGeometry(pond).rotateX(Math.PI / 2), water('pond', 0x4fa3b8), 0, 0.004, -0.02).material.side = THREE.DoubleSide;
    [[-0.3, 0.38], [0.35, 0.3], [-0.45, -0.2], [0.45, -0.25]].forEach(([x, z]) => sphere(g, 0.08, pine, x, 0.02, z, 0.7));
    box(g, 0.36, 0.12, 0.28, w, 0, 0.012); roof(g, 0.46, 0.38, 0.05, 0.6, roofM, 0, 0.13);
    box(g, 0.3, 0.1, 0.24, gold, 0, 0.18); roof(g, 0.4, 0.34, 0.05, 0.6, roofM, 0, 0.28);
    box(g, 0.18, 0.09, 0.16, gold, 0, 0.33); roof(g, 0.3, 0.28, 0.1, 0.15, roofM, 0, 0.42);
    cone(g, 0.02, 0.07, gold, 0, 0.51, 0, 6);
  },
  itsukushima(g) {
    const red = glow('torii2', 0xd8402f, 0xff6a3a), black = mat('black', 0x2a2a2a);
    for (const x of [-0.25, 0.25]) { cyl(g, 0.035, 0.04, 0.56, red, x, 0, 0, 10); cyl(g, 0.02, 0.02, 0.3, red, x, 0, 0.12, 6); cyl(g, 0.02, 0.02, 0.3, red, x, 0, -0.12, 6); }
    box(g, 0.82, 0.05, 0.08, black, 0, 0.57); box(g, 0.72, 0.04, 0.06, red, 0, 0.52); box(g, 0.62, 0.035, 0.05, red, 0, 0.4);
    hall(g, 0, -0.48, 0.5, 0.14, 0.08, red, mat('shrineRoof', 0x6a5a4a), 0.01);
  },
  bulguksa(g) {
    const stone = mat('stone', 0xb8b0a0), red = mat('bulR', 0xa8423a), roofM = mat('bulRoof', 0x4a5258);
    box(g, 1.0, 0.12, 0.6, stone);
    for (const x of [-0.2, 0.2]) for (let i = 0; i < 3; i++) box(g, 0.14, 0.12 - i * 0.04, 0.05, stone, x, 0, 0.32 + i * 0.05);
    hall(g, 0, -0.08, 0.46, 0.22, 0.12, red, roofM, 0.12);
    [-0.32, 0.32].forEach((x) => { let y = 0.12, s = 0.12; for (let i = 0; i < 3; i++) { box(g, s, 0.05, s, stone, x, y, 0.18); box(g, s * 1.4, 0.015, s * 1.4, stone, x, y + 0.05, 0.18); y += 0.065; s *= 0.85; } cone(g, 0.02, 0.07, stone, x, y, 0.18, 6); });
  },

  /* ---------- South-East Asia ---------- */
  ayutthaya(g) {
    const brick = mat('brickA', 0xa0603f), d = mat('brickD', 0x7a4a32);
    box(g, 1.0, 0.03, 0.7, mat('grass', 0x7fa35a));
    [[0, 0, 0.7], [-0.32, 0.15, 0.45], [0.32, 0.15, 0.45], [-0.2, -0.22, 0.35], [0.25, -0.22, 0.32]].forEach(([x, z, h]) => {
      box(g, h * 0.42, h * 0.15, h * 0.42, d, x, 0.03, z);
      sphere(g, h * 0.16, brick, x, 0.03 + h * 0.15 + h * 0.3, z, 2.6);
      cone(g, h * 0.035, h * 0.18, brick, x, 0.03 + h * 0.15 + h * 0.66, z, 6);
    });
  },
  borobudur(g) {
    const s = mat('andesite', 0x7f7a70), d = mat('andesiteD', 0x67625a);
    box(g, 1.1, 0.03, 1.1, mat('jungle', 0x4f7a3f));
    let y = 0.03, w = 0.9;
    for (let i = 0; i < 5; i++) { box(g, w, 0.06, w, i % 2 ? d : s, 0, y); y += 0.06; w -= 0.12; }
    let r = 0.2;
    for (let i = 0; i < 3; i++) {
      cyl(g, r, r, 0.04, s, 0, y, 0, 20);
      const n = 14 - i * 3;
      for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2; sphere(g, 0.022, d, Math.cos(a) * (r - 0.03), y + 0.06, Math.sin(a) * (r - 0.03), 1.3); }
      y += 0.04; r -= 0.055;
    }
    sphere(g, 0.08, s, 0, y + 0.04, 0, 1.1); cone(g, 0.02, 0.12, s, 0, y + 0.1, 0, 8);
  },
  mayon: mountain({ c: 0x6f7468, h: 0.85, r: 0.62, seg: 18, snow: 0.18, smoke: true }),
  shwedagon(g) {
    const gold = mat('goldS', 0xe2b13c, { metalness: 0.55, roughness: 0.35 });
    box(g, 0.9, 0.06, 0.9, mat('marbleW', 0xfbf8f2));
    frustum4(g, 0.3, 0.4, 0.1, gold, 0, 0.06);
    cyl(g, 0.22, 0.26, 0.06, gold, 0, 0.16, 0, 16); cyl(g, 0.18, 0.21, 0.05, gold, 0, 0.22, 0, 16);
    const bell = add(g, new THREE.SphereGeometry(0.17, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), gold, 0, 0.27, 0); bell.scale.y = 1.4;
    cyl(g, 0.06, 0.09, 0.08, gold, 0, 0.49, 0, 12); cone(g, 0.06, 0.4, gold, 0, 0.56, 0, 12);
    sphere(g, 0.015, glow('gem', 0xffffff, 0xffffff), 0, 0.97, 0);
    [[-0.34, -0.34], [0.34, -0.34], [-0.34, 0.34], [0.34, 0.34]].forEach(([x, z]) => cone(g, 0.04, 0.2, gold, x, 0.06, z, 8));
  },
  bagan(g) {
    const brick = mat('baganB', 0xa86a45), gold = mat('goldS', 0xe2b13c, { metalness: 0.55, roughness: 0.35 });
    [[0, 0, 0.5, gold], [-0.4, 0.2, 0.32], [0.35, 0.25, 0.3], [0.42, -0.3, 0.36], [-0.3, -0.35, 0.28], [0.05, 0.5, 0.24], [-0.55, -0.05, 0.22]].forEach(([x, z, h, top]) => {
      box(g, h * 0.6, h * 0.25, h * 0.6, brick, x, 0.03, z); box(g, h * 0.42, h * 0.15, h * 0.42, brick, x, 0.03 + h * 0.25, z);
      const b = add(g, new THREE.SphereGeometry(h * 0.18, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), top || brick, x, 0.03 + h * 0.4, z); b.scale.y = 1.5;
      cone(g, h * 0.05, h * 0.3, top || brick, x, 0.03 + h * 0.62, z, 6);
    });
    // a hot-air balloon at sunrise
    const bl = new THREE.Group(); bl.position.set(0.15, 0.75, 0.1); bl.userData.bob = 1; g.add(bl);
    sphere(bl, 0.08, mat('balloonR', 0xe0553a), 0, 0, 0, 1.15); box(bl, 0.03, 0.03, 0.03, mat('basket', 0x6b4a2a), 0, -0.13);
  },
  thatluang(g) {
    const gold = mat('goldS', 0xe2b13c, { metalness: 0.55, roughness: 0.35 });
    box(g, 0.9, 0.06, 0.9, mat('ochre', 0xc9a45a)); box(g, 0.62, 0.12, 0.62, gold, 0, 0.06);
    for (let i = 0; i < 16; i++) { const t = (i / 16) * 4, side = Math.floor(t), f = t - side, a = -0.27 + f * 0.54; const [x, z] = [[a, -0.27], [0.27, a], [-a, 0.27], [-0.27, -a]][side]; cone(g, 0.025, 0.16, gold, x, 0.18, z, 6); }
    frustum4(g, 0.1, 0.18, 0.14, gold, 0, 0.18); sphere(g, 0.1, gold, 0, 0.38, 0, 1.2); cone(g, 0.05, 0.42, gold, 0, 0.44, 0, 4);
  },

  /* ---------- South Asia, Middle East, Africa ---------- */
  indiagate(g) {
    const s = mat('sandIG', 0xc98a5a);
    box(g, 0.9, 0.03, 0.5, mat('path', 0xd8cbb0));
    box(g, 0.16, 0.5, 0.22, s, -0.22, 0.03); box(g, 0.16, 0.5, 0.22, s, 0.22, 0.03); box(g, 0.6, 0.16, 0.22, s, 0, 0.53);
    box(g, 0.5, 0.06, 0.18, s, 0, 0.69); cyl(g, 0.07, 0.08, 0.04, s, 0, 0.75, 0, 12);
    add(g, new THREE.TorusGeometry(0.14, 0.012, 4, 16, Math.PI), mat('sandD', 0xa86f45), 0, 0.42, 0.112);
  },
  goldentemple(g) {
    const gold = mat('goldS', 0xe2b13c, { metalness: 0.55, roughness: 0.35 }), marble = mat('marbleW', 0xfbf8f2);
    box(g, 1.1, 0.03, 1.1, marble); box(g, 0.92, 0.02, 0.92, water('poolG', 0x4f8fa8), 0, 0.03);
    box(g, 0.08, 0.03, 0.4, marble, 0, 0.03, 0.27);
    box(g, 0.26, 0.1, 0.26, marble, 0, 0.04); box(g, 0.2, 0.14, 0.2, gold, 0, 0.14);
    sphere(g, 0.09, gold, 0, 0.3, 0, 1.1); cone(g, 0.02, 0.09, gold, 0, 0.38, 0, 8);
    [[-0.09, -0.09], [0.09, -0.09], [-0.09, 0.09], [0.09, 0.09]].forEach(([x, z]) => sphere(g, 0.03, gold, x, 0.29, z, 1.3));
  },
  gatewayindia(g) {
    const b = mat('basalt', 0xc9b28a);
    box(g, 0.8, 0.05, 0.4, mat('quay', 0x9a958a));
    box(g, 0.16, 0.42, 0.26, b, -0.2, 0.05); box(g, 0.16, 0.42, 0.26, b, 0.2, 0.05); box(g, 0.56, 0.12, 0.26, b, 0, 0.47);
    add(g, new THREE.TorusGeometry(0.12, 0.015, 4, 16, Math.PI), mat('basaltD', 0xa8946c), 0, 0.35, 0.131);
    [[-0.24, -0.1], [0.24, -0.1], [-0.24, 0.1], [0.24, 0.1]].forEach(([x, z]) => { cyl(g, 0.035, 0.035, 0.12, b, x, 0.59, z, 8); sphere(g, 0.035, b, x, 0.72, z, 1.2); });
  },
  everest: mountain({
    c: 0x6b6870, h: 0.95, r: 0.55, peaks: [[0, 0, 1, 1], [-0.42, 0.18, 0.78, 0.75], [0.4, -0.1, 0.72, 0.7], [0.1, 0.42, 0.55, 0.55]], seg: 6, snow: 0.5,
    extra(g) { // base camp: tents and prayer flags
      [[0.55, 0.45, 0xf2c14e], [0.62, 0.36, 0xe0553a], [0.48, 0.52, 0x4f8fd0]].forEach(([x, z, c]) => cone(g, 0.035, 0.04, mat(`tent${c}`, c), x, 0, z, 4));
      [0x4f8fd0, 0xffffff, 0xe0553a, 0x4faa5a, 0xf2c14e].forEach((c, i) => box(g, 0.025, 0.02, 0.004, mat(`flag${c}`, c), 0.4 + i * 0.035, 0.07 - i * 0.004, 0.6));
    }
  }),
  genghis(g) {
    const steel = mat('steelG', 0xc8ccd2, { metalness: 0.7, roughness: 0.3 });
    cyl(g, 0.3, 0.32, 0.2, mat('ghBase', 0xe8e4dc), 0, 0.04, 0, 24);
    box(g, 0.32, 0.12, 0.1, steel, 0, 0.36);
    [[-0.12, -0.035], [-0.12, 0.035], [0.12, -0.035], [0.12, 0.035]].forEach(([x, z]) => box(g, 0.025, 0.12, 0.025, steel, x, 0.24, z));
    add(g, new THREE.BoxGeometry(0.06, 0.16, 0.07), steel, 0.17, 0.5, 0, 0, 0, -0.5);
    add(g, new THREE.BoxGeometry(0.1, 0.05, 0.06), steel, 0.24, 0.57, 0);
    cyl(g, 0.035, 0.045, 0.15, steel, -0.02, 0.48, 0, 8); sphere(g, 0.032, steel, -0.02, 0.66, 0);
  },
  hagia(g) {
    const pink = mat('hagiaP', 0xd9a88a), dome = mat('hagiaD', 0x8a9aa8), w = mat('marbleW', 0xfbf8f2);
    box(g, 0.6, 0.22, 0.5, pink); cyl(g, 0.2, 0.21, 0.06, pink, 0, 0.22, 0, 20);
    sphere(g, 0.2, dome, 0, 0.27, 0, 0.6);
    for (const z of [-0.18, 0.18]) add(g, new THREE.SphereGeometry(0.15, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), dome, 0, 0.22, z).scale.y = 0.6;
    [[-0.42, -0.34], [0.42, -0.34], [-0.42, 0.34], [0.42, 0.34]].forEach(([x, z]) => { cyl(g, 0.02, 0.025, 0.6, w, x, 0, z, 8); cone(g, 0.025, 0.14, dome, x, 0.6, z, 8); });
  },
  cappadocia(g) {
    const tuff = mat('tuffC', 0xd8c3a0), cap = mat('tuffD', 0x8a6a50);
    [[0, 0, 0.32], [-0.3, 0.2, 0.26], [0.32, 0.12, 0.3], [0.2, -0.3, 0.22], [-0.25, -0.28, 0.28], [-0.5, 0, 0.2], [0.5, -0.1, 0.18]].forEach(([x, z, h]) => { cyl(g, 0.035, 0.07, h, tuff, x, 0.04, z, 7); cone(g, 0.06, 0.08, cap, x, 0.04 + h, z, 7); });
    [[0.1, 0.62, 0.2, 0xe0553a], [-0.3, 0.8, -0.1, 0xf2c14e], [0.38, 0.9, -0.25, 0x4f8fd0], [-0.1, 1.0, 0.3, 0x9c5fd0]].forEach(([x, y, z, c], i) => {
      const bl = new THREE.Group(); bl.position.set(x, y, z); bl.userData.bob = 1 + i * 0.7; g.add(bl);
      sphere(bl, 0.075, mat(`balloon${c}`, c), 0, 0, 0, 1.15); box(bl, 0.025, 0.025, 0.025, mat('basket', 0x6b4a2a), 0, -0.12);
    });
  },
  petra(g) {
    const rock = mat('petraR', 0xc77a5a), d = mat('petraD', 0xa85f45);
    box(g, 1.0, 0.03, 0.6, mat('sand', 0xe8d2a0), 0, 0, 0.1);
    box(g, 1.0, 0.85, 0.3, rock, 0, 0, -0.22);
    for (let i = 0; i < 6; i++) cyl(g, 0.018, 0.018, 0.24, d, -0.2 + i * 0.08, 0.03, -0.05, 8);
    box(g, 0.5, 0.05, 0.05, d, 0, 0.27, -0.06); gable(g, 0.46, 0.08, 0.04, d, 0, 0.32, -0.06);
    for (const x of [-0.2, 0.2]) { box(g, 0.1, 0.18, 0.04, d, x, 0.42, -0.06); gable(g, 0.1, 0.05, 0.04, d, x, 0.6, -0.06); }
    cyl(g, 0.06, 0.06, 0.18, d, 0, 0.42, -0.06, 10); cone(g, 0.07, 0.07, d, 0, 0.6, -0.06, 10); sphere(g, 0.02, d, 0, 0.68, -0.06);
    box(g, 0.07, 0.14, 0.01, mat('dark', 0x2a2a2a), 0, 0.03, -0.068);
  },
  abusimbel(g) {
    const s = mat('nubia', 0xd9a46a), d = mat('nubiaD', 0xb8844f);
    box(g, 1.2, 0.012, 0.3, water('nasser', 0x3f7fa0), 0, 0, 0.42);
    box(g, 1.1, 0.03, 0.3, mat('sand', 0xe8d2a0), 0, 0, 0.13);
    box(g, 1.1, 0.55, 0.3, s, 0, 0, -0.18);
    [-0.36, -0.12, 0.12, 0.36].forEach((x) => {
      box(g, 0.15, 0.17, 0.13, d, x, 0.03, 0.03); box(g, 0.12, 0.17, 0.08, d, x, 0.2, -0.01);
      sphere(g, 0.042, d, x, 0.41, -0.01, 1.2); frustum4(g, 0.02, 0.04, 0.07, s, x, 0.43, -0.01);
    });
    box(g, 0.06, 0.13, 0.01, mat('dark', 0x2a2a2a), 0, 0.03, -0.029);
  },
  kilimanjaro: mountain({
    c: 0x6a6255, h: 0.55, r: 0.9, flat: 0.22, snow: 0.25, seg: 14, sx: 1.2,
    extra(g) { // flat-topped acacias of the savanna below
      [[0.95, 0.35], [-0.95, 0.4], [0.7, 0.75], [-0.6, 0.8]].forEach(([x, z]) => { cyl(g, 0.008, 0.012, 0.08, mat('bark', 0x5a3f2a), x, 0, z, 5); add(g, new THREE.CylinderGeometry(0.08, 0.05, 0.03, 8), mat('acacia', 0x6f8a3a), x, 0.095, z); });
    }
  }),
  tablemountain: mountain({
    c: 0x7a7462, h: 0.38, r: 0.55, flat: 0.8, seg: 8, sx: 1.7,
    extra(g) { // the "tablecloth" cloud and the cable car
      add(g, new THREE.CylinderGeometry(0.42, 0.44, 0.03, 16), mat('tablecloth', 0xffffff, { transparent: true, opacity: 0.8 }), 0, 0.395, 0).scale.x = 1.7;
      rod(g, new THREE.Vector3(0.2, 0.0, 0.7), new THREE.Vector3(0.1, 0.38, 0.3), 0.004, mat('cable', 0x333333));
      box(g, 0.05, 0.04, 0.04, mat('cabin', 0xe2533b), 0.15, 0.19, 0.5);
    }
  }),

  /* ---------- Europe ---------- */
  montstmichel(g) {
    const stone = mat('msmS', 0xb8b0a0), roofM = mat('slate', 0x4a4f58);
    cone(g, 0.33, 0.36, mat('msmR', 0x8a8478), 0, 0, 0, 10);
    add(g, new THREE.CylinderGeometry(0.35, 0.35, 0.08, 18, 1, true), stone, 0, 0.04, 0);
    [[-0.2, 0.18], [0.05, 0.25], [0.22, 0.12], [-0.25, -0.05]].forEach(([x, z]) => { box(g, 0.08, 0.08, 0.06, stone, x, 0.05, z); roof(g, 0.1, 0.08, 0.04, 0.2, roofM, x, 0.13, z); });
    box(g, 0.24, 0.12, 0.14, stone, 0, 0.3); roof(g, 0.26, 0.16, 0.06, 0.2, roofM, 0, 0.42);
    cyl(g, 0.03, 0.035, 0.1, stone, 0, 0.46, 0, 8); cone(g, 0.03, 0.22, roofM, 0, 0.56, 0, 8);
    sphere(g, 0.012, mat('gold', 0xd8b04a, { metalness: 0.6 }), 0, 0.79, 0);
  },
  stonehenge(g) {
    const st = mat('sarsen', 0x9a968a);
    const n = 14, R = 0.32;
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2;
      box(g, 0.07, 0.2, 0.05, st, Math.cos(a) * R, 0.04, Math.sin(a) * R, -(a + Math.PI / 2));
      if (k % 3 !== 2) { const b = a + Math.PI / n; box(g, 0.15, 0.035, 0.05, st, Math.cos(b) * R, 0.24, Math.sin(b) * R, -(b + Math.PI / 2)); }
    }
    [-0.6, -0.3, 0, 0.3, 0.6].forEach((a0) => { const a = a0 + Math.PI / 2; const r = 0.16; box(g, 0.11, 0.26, 0.05, st, Math.cos(a) * r, 0.04, Math.sin(a) * r, -(a + Math.PI / 2)); box(g, 0.13, 0.04, 0.05, st, Math.cos(a) * r, 0.3, Math.sin(a) * r, -(a + Math.PI / 2)); });
  },
  edinburgh(g) {
    const st = mat('edS', 0x8f8a80), roofM = mat('slate', 0x4a4f58);
    add(g, new THREE.CylinderGeometry(0.28, 0.55, 0.3, 7), mat('crag', 0x5a5a52), 0, 0.15, 0).scale.x = 1.4;
    box(g, 0.42, 0.12, 0.18, st, 0, 0.3); roof(g, 0.44, 0.2, 0.06, 0.2, roofM, 0, 0.42);
    cyl(g, 0.12, 0.12, 0.09, st, -0.3, 0.3, 0.04, 14);
    for (const [x, z] of [[0.24, 0.06], [0.1, -0.08]]) { cyl(g, 0.035, 0.035, 0.2, st, x, 0.3, z, 8); cone(g, 0.045, 0.1, roofM, x, 0.5, z, 8); }
  },
  sagrada(g) {
    const s = mat('sagS', 0xc9b48a), d = mat('sagD', 0xa8936a), tip = mat('sagTop', 0xd85a3a);
    box(g, 0.6, 0.22, 0.36, s);
    for (const z of [0.16, -0.16]) [-0.21, -0.07, 0.07, 0.21].forEach((x) => {
      const h = Math.abs(x) > 0.1 ? 0.62 : 0.72;
      cyl(g, 0.028, 0.045, h * 0.7, d, x, 0.1, z, 8); cone(g, 0.028, h * 0.3, d, x, 0.1 + h * 0.7, z, 8); sphere(g, 0.016, tip, x, 0.1 + h, z);
    });
    cyl(g, 0.06, 0.08, 0.6, s, 0, 0.22, 0, 10); cone(g, 0.06, 0.24, s, 0, 0.82, 0, 10);
    box(g, 0.07, 0.015, 0.015, glow('star', 0xfff3c0, 0xffffff), 0, 1.04); box(g, 0.015, 0.07, 0.015, glow('star', 0xfff3c0, 0xffffff), 0, 1.01);
  },
  alhambra(g) {
    const red = mat('alhR', 0xc07a50), cyp = mat('cypress', 0x2f5a35);
    add(g, new THREE.CylinderGeometry(0.55, 0.65, 0.12, 9), mat('hillDry', 0x8a7a55), 0, 0.06, 0).scale.z = 0.62;
    box(g, 0.9, 0.12, 0.04, red, 0, 0.12, 0.2); box(g, 0.9, 0.12, 0.04, red, 0, 0.12, -0.2); box(g, 0.04, 0.12, 0.4, red, 0.45, 0.12); box(g, 0.04, 0.12, 0.4, red, -0.45, 0.12);
    [[-0.45, 0.2, 0.1, 0.24], [0.45, 0.2, 0.1, 0.2], [-0.45, -0.2, 0.1, 0.2], [0.45, -0.2, 0.1, 0.22], [-0.15, -0.2, 0.15, 0.32], [0.2, 0.2, 0.1, 0.22]].forEach(([x, z, w, h]) => box(g, w, h, w, red, x, 0.12, z));
    box(g, 0.42, 0.01, 0.3, mat('garden', 0x4f7a3f), 0.1, 0.12, 0); box(g, 0.08, 0.012, 0.24, water('pool', 0x5fb6d9), 0.1, 0.125, 0);
    [[-0.1, 0.1], [-0.1, -0.1], [0.3, 0.1], [0.3, -0.1]].forEach(([x, z]) => cone(g, 0.025, 0.15, cyp, x, 0.13, z, 6));
  },
  belem(g) {
    const lime = mat('belemW', 0xeee6d2), dome = mat('belemD', 0xd8cfb8);
    box(g, 0.36, 0.12, 0.36, lime, 0, 0, 0.12);
    for (let i = 0; i < 6; i++) box(g, 0.03, 0.03, 0.03, lime, -0.15 + i * 0.06, 0.12, 0.29);
    box(g, 0.2, 0.42, 0.2, lime, 0, 0, -0.08); box(g, 0.24, 0.03, 0.24, lime, 0, 0.42, -0.08);
    [[-0.1, -0.18], [0.1, -0.18], [-0.1, 0.02], [0.1, 0.02]].forEach(([x, z]) => { cyl(g, 0.025, 0.025, 0.06, lime, x, 0.45, z, 8); sphere(g, 0.025, dome, x, 0.51, z, 1.2); });
  },
  venice(g) {
    const brick = mat('veniceB', 0xb85a3f), w = mat('marbleW', 0xfbf8f2), lead = mat('lead', 0x8a9aa0);
    box(g, 0.75, 0.03, 0.4, w, 0, 0, -0.12);
    box(g, 0.1, 0.55, 0.1, brick, 0.28, 0.03, -0.18); box(g, 0.12, 0.08, 0.12, w, 0.28, 0.58, -0.18); frustum4(g, 0.01, 0.08, 0.14, mat('verd', 0x6fb59b), 0.28, 0.66, -0.18);
    box(g, 0.32, 0.14, 0.2, w, -0.12, 0.03, -0.2);
    [[-0.12, -0.2, 0.06], [-0.22, -0.2, 0.04], [-0.02, -0.2, 0.04], [-0.12, -0.28, 0.04], [-0.12, -0.12, 0.04]].forEach(([x, z, r]) => sphere(g, r, lead, x, 0.2, z, 1.1));
    const gon = new THREE.Group(); gon.position.set(0.12, 0.012, 0.32); gon.rotation.y = 0.3; g.add(gon);
    box(gon, 0.26, 0.018, 0.045, mat('black', 0x2a2a2a)); cyl(gon, 0.01, 0.012, 0.06, mat('striped', 0xf3efe6), 0.08, 0.018, 0, 6);
  },
  neuschwanstein(g) {
    const w = mat('neuW', 0xf0ece4), roofM = mat('neuRoof', 0x4a6a9a);
    add(g, new THREE.CylinderGeometry(0.3, 0.55, 0.25, 8), mat('forest', 0x4f7a3f), 0, 0.125, 0);
    box(g, 0.36, 0.25, 0.14, w, 0, 0.25); roof(g, 0.38, 0.16, 0.08, 0.1, roofM, 0, 0.5);
    [[0.2, 0.05, 0.38], [-0.18, 0.06, 0.3], [0.05, 0.1, 0.45], [-0.05, -0.08, 0.28]].forEach(([x, z, h]) => { cyl(g, 0.04, 0.04, h, w, x, 0.25, z, 10); cone(g, 0.05, 0.13, roofM, x, 0.25 + h, z, 10); });
  },
  atomium(g) {
    const steel = mat('atom', 0xc8ccd2, { metalness: 0.8, roughness: 0.25 });
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 1, 1).normalize(), _up);
    const P = []; for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) P.push(new THREE.Vector3(x, y, z).multiplyScalar(0.2).applyQuaternion(q).add(new THREE.Vector3(0, 0.5, 0)));
    const C = new THREE.Vector3(0, 0.5, 0);
    P.forEach((p, i) => { sphere(g, 0.06, steel, p.x, p.y, p.z); rod(g, p, C, 0.014, steel); P.forEach((o, j) => { if (j > i && p.distanceTo(o) < 0.41) rod(g, p, o, 0.014, steel); }); });
    sphere(g, 0.06, steel, 0, 0.5, 0);
    const sorted = [...P].sort((a, b) => a.y - b.y), low = sorted[0];
    rod(g, low, new THREE.Vector3(low.x, 0, low.z), 0.02, steel);
    sorted.slice(1, 4).forEach((p) => rod(g, p, new THREE.Vector3(p.x * 1.8, 0, p.z * 1.8), 0.014, steel));
  },
  elbrus: mountain({ c: 0x6b6870, h: 0.7, r: 0.75, seg: 10, snow: 0.6, peaks: [[-0.18, 0, 1, 0.8], [0.22, 0.05, 0.95, 0.75]] }),
  matterhorn: mountain({ c: 0x6b6870, h: 0.95, r: 0.42, seg: 5, snow: 0.45, peaks: [[0, 0, 1, 1], [0.4, 0.2, 0.5, 0.6]] }),

  /* ---------- the Americas, Oceania ---------- */
  capitol(g) {
    const w = mat('marbleW', 0xfbf8f2);
    box(g, 1.1, 0.01, 0.7, mat('lawn', 0x6fa35a), 0, 0, 0.1);
    box(g, 0.9, 0.14, 0.26, w); box(g, 0.3, 0.18, 0.3, w);
    for (let i = 0; i < 8; i++) cyl(g, 0.01, 0.01, 0.12, w, -0.12 + i * 0.035, 0.01, 0.16, 6);
    cyl(g, 0.11, 0.12, 0.12, w, 0, 0.18, 0, 16); cyl(g, 0.09, 0.1, 0.06, w, 0, 0.3, 0, 16);
    sphere(g, 0.1, w, 0, 0.36, 0, 1.15); cyl(g, 0.02, 0.02, 0.06, w, 0, 0.46, 0, 8); sphere(g, 0.018, mat('bronze', 0x8a6a4a), 0, 0.54, 0);
  },
  rushmore(g) {
    const rock = mat('granR', 0xb0a89a), face = mat('granF', 0xc8c0b0);
    add(g, new THREE.CylinderGeometry(0.3, 0.6, 0.55, 7), rock, 0, 0.275, -0.1);
    [-0.24, -0.08, 0.08, 0.23].forEach((x, i) => { sphere(g, 0.075, face, x, 0.4 - Math.abs(x) * 0.25, 0.22 - Math.abs(x) * 0.15, 1.3); box(g, 0.02, 0.04, 0.03, face, x, 0.37 - Math.abs(x) * 0.25 + (i % 2) * 0.004, 0.29 - Math.abs(x) * 0.15); });
    for (let i = 0; i < 10; i++) { const a = 0.4 + i * 0.25; cone(g, 0.04, 0.14, mat('pine', 0x3f6a3a), Math.cos(a) * 0.62, 0, Math.sin(a) * 0.45 + 0.05, 6); }
  },
  spaceneedle(g) {
    const w = glow('needle', 0xeeeeee, 0xffe8c0);
    for (const a of [0, 2.09, 4.19]) {
      const b = new THREE.Vector3(Math.cos(a) * 0.14, 0, Math.sin(a) * 0.14), m = new THREE.Vector3(Math.cos(a) * 0.03, 0.36, Math.sin(a) * 0.03), t = new THREE.Vector3(Math.cos(a) * 0.06, 0.62, Math.sin(a) * 0.06);
      rod(g, b, m, 0.012, w); rod(g, m, t, 0.012, w);
    }
    cyl(g, 0.16, 0.08, 0.05, w, 0, 0.62, 0, 20); cyl(g, 0.13, 0.16, 0.03, mat('needleTop', 0xd8763a), 0, 0.67, 0, 20);
    cyl(g, 0.004, 0.012, 0.25, w, 0, 0.7, 0, 6);
  },
  gatewayarch(g) {
    const steel = glow('arch', 0xd8dde4, 0xe8f0ff), pts = [], c = Math.cosh(1.8) - 1;
    for (let i = 0; i <= 40; i++) { const t = -1 + (i / 40) * 2; pts.push(new THREE.Vector3(0.45 * t, 0.95 * (1 - (Math.cosh(1.8 * t) - 1) / c), 0)); }
    add(g, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.025, 3), steel);
    box(g, 1.1, 0.012, 0.25, water('river', 0x4f8aa0), 0, 0, 0.35);
  },
  machupicchu(g) {
    const green = mat('mpG', 0x4f8a45), st = mat('mpS', 0xb8b0a0), roofM = mat('thatch', 0x8a7a4a);
    cone(g, 0.22, 0.8, green, 0.05, 0, -0.38, 8);
    add(g, new THREE.CylinderGeometry(0.38, 0.55, 0.2, 8), green, 0, 0.1, 0.08).scale.x = 1.4;
    for (let i = 0; i < 4; i++) box(g, 0.75 - i * 0.1, 0.03, 0.06, st, 0, 0.08 + i * 0.03, 0.42 - i * 0.07);
    [[-0.25, 0.05], [-0.1, 0.12], [0.08, 0.05], [0.25, 0.12], [0.18, -0.08], [-0.2, -0.1]].forEach(([x, z]) => { box(g, 0.1, 0.05, 0.07, st, x, 0.2, z); roof(g, 0.11, 0.08, 0.05, 0.1, roofM, x, 0.25, z); });
  },
  obelisco(g) {
    const w = mat('obel', 0xf3efe6), road = mat('road', 0x5a5a60);
    box(g, 1.0, 0.01, 0.14, road); box(g, 0.14, 0.01, 1.0, road);
    box(g, 0.08, 0.75, 0.08, w, 0, 0.01); frustum4(g, 0.001, 0.057, 0.08, w, 0, 0.76);
  },
  uluru(g) {
    sphere(g, 0.5, mat('uluru', 0xc0582f), 0, 0, 0).scale.set(1.3, 0.38, 0.6);
  }
});

// Moscow: St Basil's with the Kremlin wall and the Spasskaya Tower behind it
const stBasil = B.stbasil;
B.stbasil = (g) => {
  stBasil(g);
  const red = mat('kremlin', 0xa83a2e), green = mat('spire', 0x3f7a5a);
  box(g, 1.6, 0.14, 0.06, red, -0.1, 0, -0.55);
  for (let i = 0; i < 14; i++) box(g, 0.04, 0.04, 0.06, red, -0.85 + i * 0.115, 0.14, -0.55);
  box(g, 0.16, 0.42, 0.16, red, -0.62, 0, -0.55); box(g, 0.12, 0.14, 0.12, mat('basilW', 0xf3ead8), -0.62, 0.42, -0.55);
  frustum4(g, 0.005, 0.09, 0.22, green, -0.62, 0.56, -0.55);
  sphere(g, 0.03, glow('redStar', 0xe2382f, 0xff3a2a), -0.62, 0.81, -0.55, 1);
  box(g, 1.6, 0.005, 0.32, mat('cobble', 0x6a5f5a), -0.1, 0, -0.36);
};

// Ha Long Bay and similar karst towers reuse the pillar helper

B.baikal = (g) => {
  // famous for its clear blue winter ice, the nerpa (the only freshwater seal) and the taiga round it
  const ice = mat('ice', 0x9fe3ff, { transparent: true, opacity: 0.8, roughness: 0.1, metalness: 0.1 }), snow = mat('snow', 0xffffff);
  box(g, 0.7, 0.02, 0.36, mat('iceSheet', 0xcdeefc, { roughness: 0.15 }));
  [[-0.2, 0.05, 0.22, 0.4], [-0.05, -0.08, 0.3, -0.3], [0.15, 0.06, 0.18, 0.9], [0.25, -0.1, 0.14, 0.2], [-0.32, -0.1, 0.12, -0.7]].forEach(([x, z, h, rz]) => { const c = add(g, new THREE.ConeGeometry(0.06, h, 4), ice, x, 0.02 + h / 2, z, 0, rz, rz * 0.3); c.scale.x = 0.6; });
  sphere(g, 0.05, mat('nerpa', 0x7a7a80), 0.05, 0.05, 0.12, 0.7).scale.set(1.6, 0.7, 0.9); sphere(g, 0.025, mat('nerpa', 0x7a7a80), 0.12, 0.07, 0.12);
  [[-0.5, -0.3, 0.32], [0.5, -0.32, 0.28], [-0.05, -0.42, 0.36]].forEach(([x, z, h]) => { cone(g, 0.18, h, mat('mt0x6b6870', 0x6b6870), x, 0, z, 7); cone(g, 0.07, h * 0.38, snow, x, h * 0.62, z, 7); });
  for (let i = 0; i < 9; i++) { const x = -0.6 + i * 0.15; cone(g, 0.035, 0.13, mat('pine', 0x3f6a3a), x, 0, 0.3 + (i % 2) * 0.06, 6); }
};

/* ---------- South America ---------- */
const flatLine = (g, a, b, w, m, y = 0.012) => { const dx = b[0] - a[0], dz = b[1] - a[1]; box(g, Math.hypot(dx, dz) + w, 0.006, w, m, (a[0] + b[0]) / 2, y, (a[1] + b[1]) / 2, -Math.atan2(dz, dx)); };
const camel = (g, x, z, ry) => {
  const c = new THREE.Group(); c.position.set(x, 0, z); c.rotation.y = ry; g.add(c);
  const m = mat('camel', 0xc8955a);
  box(c, 0.14, 0.06, 0.05, m, 0, 0.1); sphere(c, 0.035, m, 0.01, 0.17, 0, 1.2);
  rod(c, new THREE.Vector3(0.06, 0.14, 0), new THREE.Vector3(0.1, 0.22, 0), 0.012, m); box(c, 0.04, 0.025, 0.025, m, 0.115, 0.21);
  [[-0.05, -0.015], [-0.05, 0.015], [0.05, -0.015], [0.05, 0.015]].forEach(([lx, lz]) => box(c, 0.012, 0.1, 0.012, m, lx, 0, lz));
};
const acacia = (g, x, z, s = 1) => { cyl(g, 0.008 * s, 0.014 * s, 0.12 * s, mat('bark', 0x5a3f2a), x, 0, z, 5); add(g, new THREE.CylinderGeometry(0.1 * s, 0.06 * s, 0.035 * s, 9), mat('acacia', 0x6f8a3a), x, 0.13 * s, z); };
const fallM = () => mat('fall', 0xf4fbff, { transparent: true, opacity: 0.9, emissive: 0xa8c8dc, emissiveIntensity: 0.6 }); // white water stays bright in shade
const mistM = () => mat('mist', 0xffffff, { transparent: true, opacity: 0.35, depthWrite: false });
const rainbow = (g, x, y, z, r, ry = 0) => [[0xff5a5a, 0], [0xffd23a, -0.018], [0x5ab0ff, -0.036]].forEach(([c, d]) => add(g, new THREE.TorusGeometry(r + d, 0.007, 4, 28, Math.PI), mat(`rb${c}`, c, { transparent: true, opacity: 0.55 }), x, y, z, 0, ry, 0));

Object.assign(B, {
  iguazu(g) {
    // the Devil's Throat: a horseshoe of cliffs with a curtain of water all round, mist and a rainbow
    const rock = mat('igRock', 0x6a5040), green = mat('jungle', 0x3f7a3f), fall = fallM();
    const N = 16;
    for (let i = 0; i < N; i++) {
      const a = Math.PI * 0.2 + ((i + 0.5) / N) * Math.PI * 1.6, s = Math.sin(a), c = Math.cos(a);
      box(g, 0.19, 0.3, 0.07, rock, s * 0.44, 0, c * 0.44, a);
      box(g, 0.22, 0.06, 0.26, green, s * 0.6, 0.26, c * 0.6, a);
      if (i % 5 !== 4) box(g, 0.17, 0.27, 0.012, fall, s * 0.4, 0.02, c * 0.4, a);
    }
    for (let i = 0; i < 6; i++) { const a = Math.PI * 0.35 + i * 0.25; sphere(g, 0.07, green, Math.sin(a) * 0.72, 0.34, Math.cos(a) * 0.72, 0.8); }
    box(g, 0.6, 0.01, 0.75, water('igRiver', 0x8a8a5a), 0, 0, 0.2);
    sphere(g, 0.24, mistM(), 0, 0.06, 0.05, 0.45);
    rainbow(g, 0, 0.04, 0.3, 0.3);
  },
  angelfalls(g) {
    // the world's highest waterfall, falling off a flat-topped "tepui" mountain into the jungle
    const t = add(g, new THREE.CylinderGeometry(0.4, 0.5, 0.85, 7), mat('tepui', 0x7a5a48), 0, 0.425, -0.12); t.scale.x = 1.3;
    add(g, new THREE.CylinderGeometry(0.41, 0.41, 0.03, 7), mat('jungle', 0x3f7a3f), 0, 0.86, -0.12).scale.x = 1.3;
    box(g, 0.045, 0.8, 0.02, fallM(), 0.12, 0.05, 0.34); box(g, 0.025, 0.5, 0.02, fallM(), 0.06, 0.05, 0.345);
    sphere(g, 0.1, mistM(), 0.1, 0.05, 0.4, 0.6);
    [[-0.5, 0.35], [-0.3, 0.5], [0.35, 0.5], [0.55, 0.3], [-0.6, 0.05], [0.65, -0.05]].forEach(([x, z]) => sphere(g, 0.08, mat('jungleD', 0x2f6a35), x, 0.04, z, 0.9));
  },
  galapagos(g) {
    // a giant tortoise, a blue-footed booby and a prickly-pear cactus by a young volcano
    add(g, new THREE.CylinderGeometry(0.1, 0.45, 0.35, 10), mat('lava', 0x3a3634), 0, 0.175, -0.35);
    const shell = mat('tortoise', 0x5a5040), skin = mat('tortSkin', 0x8a8270);
    add(g, new THREE.SphereGeometry(0.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), shell, 0, 0.08, 0.15).scale.set(1.25, 1, 1);
    cyl(g, 0.2, 0.2, 0.06, skin, 0, 0.03, 0.15, 12).scale.x = 1.2;
    [[-0.16, 0.05], [-0.16, 0.25], [0.16, 0.05], [0.16, 0.25]].forEach(([x, z]) => cyl(g, 0.035, 0.04, 0.08, skin, x, 0, z, 6));
    rod(g, new THREE.Vector3(0.24, 0.1, 0.15), new THREE.Vector3(0.34, 0.2, 0.15), 0.03, skin); sphere(g, 0.042, skin, 0.36, 0.21, 0.15);
    const pad = mat('opuntia', 0x5f9a4a);
    cyl(g, 0.02, 0.025, 0.2, mat('bark', 0x5a3f2a), -0.4, 0, 0.2, 6);
    [[-0.4, 0.26, 0.2], [-0.35, 0.3, 0.22], [-0.45, 0.31, 0.18], [-0.4, 0.36, 0.2]].forEach(([x, y, z]) => sphere(g, 0.045, pad, x, y, z, 1).scale.set(1, 1, 0.3));
    sphere(g, 0.035, mat('booby', 0xf2efe6), 0.42, 0.07, 0.38, 1.2); sphere(g, 0.02, mat('booby', 0xf2efe6), 0.44, 0.12, 0.38);
    box(g, 0.025, 0.01, 0.02, mat('bluefeet', 0x3f8fe0), 0.41, 0, 0.37); box(g, 0.025, 0.01, 0.02, mat('bluefeet', 0x3f8fe0), 0.43, 0, 0.4);
  },
  uyuni(g) {
    // the world's largest salt flat: white honeycomb crust, a mirror of rain water, flamingos and a jeep
    const salt = mat('salt', 0xf6f4ee), saltD = mat('saltD', 0xe6e2d8), mirror = mat('mirror', 0xbfe4f6, { roughness: 0.05, metalness: 0.3 });
    for (let r = -4; r <= 4; r++) for (let c = -5; c <= 5; c++) {
      const x = c * 0.105 + (r % 2 ? 0.052 : 0), z = r * 0.091;
      if (Math.hypot(x / 1.15, z) > 0.52) continue;
      cyl(g, 0.05, 0.052, 0.008, (r + c) % 3 ? salt : saltD, x, 0, z, 6).rotation.y = Math.PI / 6;
    }
    box(g, 0.34, 0.006, 0.2, mirror, 0.25, 0.008, 0.2);
    const pink = mat('flamingo', 0xf28aa0);
    [[0.2, 0.18], [0.3, 0.24], [0.26, 0.12]].forEach(([x, z]) => { sphere(g, 0.025, pink, x, 0.1, z, 0.8); rod(g, new THREE.Vector3(x + 0.015, 0.11, z), new THREE.Vector3(x + 0.02, 0.17, z), 0.005, pink); cyl(g, 0.003, 0.003, 0.09, pink, x, 0.01, z, 4); });
    const jeep = new THREE.Group(); jeep.position.set(-0.25, 0.008, 0.05); jeep.rotation.y = 0.4; g.add(jeep);
    box(jeep, 0.14, 0.05, 0.07, mat('jeep', 0xe8e2d0), 0, 0.02); box(jeep, 0.08, 0.035, 0.065, mat('jeepW', 0x5a6a7a), -0.02, 0.07);
    [[-0.045, 0.036], [-0.045, -0.036], [0.045, 0.036], [0.045, -0.036]].forEach(([x, z]) => cyl(jeep, 0.018, 0.018, 0.012, mat('black', 0x2a2a2a), x, 0.018, z, 8).rotation.x = Math.PI / 2);
  },
  perito(g) {
    // Perito Moreno: a glacier front of blue ice towers breaking into a turquoise lake
    const ice = mat('ice2', 0xe6f6ff), blue = mat('iceBlue', 0x9fd4f2), snow = mat('snow', 0xffffff);
    box(g, 1.3, 0.01, 0.45, water('glacierLake', 0x6fc8c8), 0, 0, 0.42);
    for (let i = 0; i < 13; i++) { const h = 0.2 + ((i * 7) % 5) * 0.03; box(g, 0.1, h, 0.3, i % 3 ? ice : blue, -0.6 + i * 0.1, 0, 0.05); }
    add(g, new THREE.BoxGeometry(1.3, 0.06, 0.8), ice, 0, 0.26, -0.42, 0.28, 0, 0);
    [[0.1, 0.5], [-0.3, 0.55], [0.4, 0.48]].forEach(([x, z], i) => add(g, new THREE.DodecahedronGeometry(0.035 + i * 0.01, 0), blue, x, 0.02, z));
    [[-0.45, -0.85, 0.6], [0.05, -0.9, 0.75], [0.5, -0.82, 0.55]].forEach(([x, z, h]) => { cone(g, 0.26, h, mat('mt0x6b6870', 0x6b6870), x, 0, z, 6); cone(g, 0.12, h * 0.45, snow, x, h * 0.55, z, 6); });
  },
  alma(g) {
    // ALMA in the Atacama desert: radio dishes looking at the sky, under the Licancabur volcano
    const white = mat('dish', 0xf2f2f0, { metalness: 0.3, roughness: 0.4 });
    cone(g, 0.4, 0.6, mat('licancabur', 0x7a5a4a), 0.1, 0, -0.5, 12); cone(g, 0.1, 0.12, mat('snow', 0xffffff), 0.1, 0.48, -0.5, 12);
    [[-0.4, 0.1, 0.5], [-0.1, 0.25, 0.2], [0.25, 0.15, -0.3], [0.5, 0.35, 0.4], [-0.3, 0.42, 1.2], [0.05, -0.1, 0.8]].forEach(([x, z, ry]) => {
      cyl(g, 0.03, 0.04, 0.1, white, x, 0, z, 8);
      const d = add(g, new THREE.SphereGeometry(0.11, 14, 6, 0, Math.PI * 2, 0, 0.95), white, x, 0.22, z); d.rotation.set(Math.PI - 0.6, ry, 0); d.material.side = THREE.DoubleSide;
      rod(g, new THREE.Vector3(x, 0.17, z), new THREE.Vector3(x, 0.3, z), 0.006, white);
    });
  },
  brasilia(g) {
    // Cathedral of Brasilia: 16 curved concrete columns like hands rising to the sky, with a glass roof
    const w = mat('concreteW', 0xf4f4f2), glass = mat('glassB', 0x6fa8d8, { transparent: true, opacity: 0.55 });
    box(g, 1.0, 0.006, 0.18, water('poolB', 0x5fb6d9), 0, 0, 0.45);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      const p0 = new THREE.Vector3(c * 0.32, 0, s * 0.32), p1 = new THREE.Vector3(c * 0.1, 0.38, s * 0.1), p2 = new THREE.Vector3(c * 0.2, 0.58, s * 0.2);
      rod(g, p0, p1, 0.018, w); rod(g, p1, p2, 0.014, w);
    }
    add(g, new THREE.CylinderGeometry(0.11, 0.3, 0.37, 16, 1, true), glass, 0, 0.185, 0).material.side = THREE.DoubleSide;
    box(g, 0.03, 0.55, 0.06, w, 0.5, 0, -0.1); [0.36, 0.44, 0.5].forEach((y) => sphere(g, 0.02, mat('bell', 0xb08a3a, { metalness: 0.6 }), 0.5, y, -0.05));
  },
  nazca(g) {
    // the Nazca hummingbird: a giant line drawing on the desert, seen from the observation tower
    box(g, 1.2, 0.01, 0.9, mat('nazcaDesert', 0xa8805a));
    const line = mat('nazcaLine', 0xeadcc0), P = [[0.0, -0.38], [0.02, -0.12], [-0.3, -0.25], [-0.5, -0.05], [-0.12, -0.02], [0.0, 0.05], [0.12, -0.02], [0.5, -0.05], [0.3, -0.25], [0.02, -0.12]];
    for (let i = 0; i + 1 < P.length; i++) flatLine(g, P[i], P[i + 1], 0.018, line);
    flatLine(g, [0, 0.05], [-0.04, 0.3], 0.018, line); flatLine(g, [-0.04, 0.3], [0.04, 0.3], 0.018, line); flatLine(g, [0.04, 0.3], [0, 0.05], 0.018, line); // tail
    flatLine(g, [0, -0.38], [0, -0.5], 0.012, line); // beak
    const steel = mat('steelT', 0x8a8f96);
    [[-0.04, -0.04], [0.04, -0.04], [-0.04, 0.04], [0.04, 0.04]].forEach(([dx, dz]) => rod(g, new THREE.Vector3(0.48 + dx * 1.6, 0, 0.35 + dz * 1.6), new THREE.Vector3(0.48 + dx, 0.3, 0.35 + dz), 0.006, steel));
    box(g, 0.1, 0.012, 0.1, steel, 0.48, 0.3, 0.35);
  },
  cartagena(g) {
    // Cartagena: colourful colonial houses with balconies inside the old walls, and the yellow Clock Tower gate
    const wall = mat('cartWall', 0xb8a88a), cols = [0xf2c14e, 0xe8603f, 0x4fb0c8, 0x8ac85a, 0xe88ab0, 0xf2f0e6], roofM = mat('cartRoof', 0xb8603a), wood = mat('wood', 0x8a4a2a);
    box(g, 1.1, 0.08, 0.08, wall, 0, 0, 0.42);
    [-0.5, 0.5].forEach((x) => { cyl(g, 0.035, 0.035, 0.08, wall, x, 0.08, 0.42, 8); sphere(g, 0.036, wall, x, 0.16, 0.42); });
    box(g, 0.16, 0.24, 0.12, mat('clockY', 0xf2c14e), 0, 0, 0.42); box(g, 0.1, 0.14, 0.1, mat('clockY', 0xf2c14e), 0, 0.24, 0.42);
    cyl(g, 0.035, 0.035, 0.01, mat('clockFace', 0xffffff), 0, 0.3, 0.474, 14).rotation.x = Math.PI / 2; cone(g, 0.05, 0.08, roofM, 0, 0.38, 0.42, 4);
    for (let i = 0; i < 6; i++) for (const z of [0.12, -0.18]) {
      const x = -0.45 + i * 0.18, h = 0.12 + (i % 3) * 0.03;
      box(g, 0.16, h, 0.14, mat(`house${cols[(i + (z > 0 ? 0 : 3)) % 6]}`, cols[(i + (z > 0 ? 0 : 3)) % 6]), x, 0, z);
      roof(g, 0.18, 0.16, 0.04, 0.4, roofM, x, h, z); box(g, 0.12, 0.012, 0.03, wood, x, h * 0.6, z + 0.08);
    }
  },

  /* ---------- Africa ---------- */
  victoria(g) {
    // Victoria Falls: the Zambezi drops into a long straight gorge, with "the smoke that thunders" and the old bridge
    const rock = mat('basaltV', 0x5a4f45), fall = fallM(), green = mat('jungle', 0x3f7a3f);
    box(g, 1.3, 0.01, 0.4, water('zambezi', 0x5f8fa0), 0, 0.3, -0.35);
    box(g, 1.3, 0.3, 0.12, rock, 0, 0, -0.11); box(g, 1.3, 0.1, 0.12, rock, 0, 0, 0.21); // the near rim is low so the falls show across the gorge
    for (let i = 0; i < 12; i++) if (i % 4 !== 3) box(g, 0.1, 0.28, 0.01, fall, -0.6 + i * 0.11, 0.02, -0.045);
    box(g, 1.3, 0.008, 0.2, water('gorge', 0x4f7a80), 0, 0, 0.05);
    [[-0.35, 0.36, 0.13], [0.05, 0.42, 0.16], [0.4, 0.34, 0.12]].forEach(([x, y, r]) => sphere(g, r, mistM(), x, y, -0.02, 1).scale.set(1.5, 1.1, 0.8));
    rainbow(g, -0.1, 0.3, 0.02, 0.22);
    [[-0.5, 0.42], [0.2, 0.46], [0.55, 0.4], [-0.2, -0.65], [0.4, -0.6]].forEach(([x, z]) => sphere(g, 0.07, green, x, 0.3, z, 0.8));
    const steel = mat('bridgeV', 0x8a8f96), pts = [];
    for (let i = 0; i <= 16; i++) { const t = i / 16; pts.push(new THREE.Vector3(0.7, 0.05 + Math.sin(t * Math.PI) * 0.2, -0.05 + t * 0.32)); }
    add(g, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, 0.008, 4), steel); box(g, 0.03, 0.012, 0.36, steel, 0.7, 0.29, 0.11);
  },
  serengeti(g) {
    // the Serengeti: acacias, a giraffe, an elephant, zebras and a termite mound
    acacia(g, -0.35, -0.2, 1.4); acacia(g, 0.4, -0.3, 1.1); acacia(g, 0.1, 0.4, 0.9);
    const gir = mat('giraffe', 0xd8a24a);
    [[-0.02, -0.02], [-0.02, 0.02], [0.06, -0.02], [0.06, 0.02]].forEach(([x, z]) => box(g, 0.012, 0.14, 0.012, gir, x - 0.1, 0, z + 0.05));
    box(g, 0.12, 0.05, 0.05, gir, -0.08, 0.14, 0.05); rod(g, new THREE.Vector3(-0.03, 0.17, 0.05), new THREE.Vector3(0.03, 0.36, 0.05), 0.012, gir); box(g, 0.05, 0.025, 0.025, gir, 0.05, 0.355, 0.05);
    const el = mat('elephant', 0x8a8580);
    sphere(g, 0.1, el, 0.25, 0.16, 0.1, 0.8).scale.set(1.3, 0.8, 0.8);
    [[0.18, 0.05], [0.18, 0.15], [0.32, 0.05], [0.32, 0.15]].forEach(([x, z]) => cyl(g, 0.025, 0.025, 0.1, el, x, 0, z, 6));
    sphere(g, 0.055, el, 0.39, 0.2, 0.1); box(g, 0.01, 0.08, 0.07, el, 0.37, 0.16, 0.16); box(g, 0.01, 0.08, 0.07, el, 0.37, 0.16, 0.04);
    rod(g, new THREE.Vector3(0.43, 0.18, 0.1), new THREE.Vector3(0.46, 0.05, 0.1), 0.012, el);
    [[-0.4, 0.25], [-0.25, 0.32]].forEach(([x, z]) => {
      box(g, 0.09, 0.04, 0.035, mat('zebraW', 0xf2f0ea), x, 0.06, z); for (let k = 0; k < 3; k++) box(g, 0.01, 0.042, 0.037, mat('black', 0x2a2a2a), x - 0.03 + k * 0.03, 0.06, z);
      [[-0.03, -0.01], [0.03, 0.01], [-0.03, 0.01], [0.03, -0.01]].forEach(([dx, dz]) => box(g, 0.008, 0.06, 0.008, mat('zebraW', 0xf2f0ea), x + dx, 0, z + dz));
      box(g, 0.03, 0.02, 0.02, mat('zebraW', 0xf2f0ea), x + 0.055, 0.1, z);
    });
    cone(g, 0.05, 0.16, mat('termite', 0xa8693f), 0.5, 0, 0.35, 7);
  },
  merzouga(g) {
    // the Sahara at Erg Chebbi: orange dunes with sharp crests, a camel caravan and a Berber tent
    const sand = mat('dune', 0xe0904a), sandD = mat('duneD', 0xc8783a);
    [[-0.3, -0.25, 0.32, 0.5, 0.3], [0.3, -0.3, 0.38, 0.55, -0.4], [0.0, -0.55, 0.45, 0.6, 0.2], [-0.6, 0.1, 0.2, 0.35, 0.8], [0.62, 0.05, 0.22, 0.35, -0.6]].forEach(([x, z, h, r, ry], i) => {
      const d = add(g, new THREE.ConeGeometry(r, h, 4), i % 2 ? sand : sandD, x, h / 2, z, 0, ry, 0); d.scale.set(1.6, 1, 0.7);
    });
    camel(g, -0.2, 0.25, 0.2); camel(g, 0.0, 0.3, 0.2); camel(g, 0.2, 0.35, 0.2);
    const tent = mat('tent', 0x6a3a2a);
    add(g, new THREE.ConeGeometry(0.12, 0.08, 4), tent, 0.45, 0.04, 0.4, 0, Math.PI / 4, 0).scale.set(1.5, 1, 1);
  },
  hassan2(g) {
    // Hassan II Mosque in Casablanca: a 210 m minaret of green tiles on a platform over the Atlantic
    const w = mat('hassanW', 0xf0e8d8), green = mat('hassanG', 0x2f8a6a), tile = mat('hassanT', 0x4fa88a);
    box(g, 1.1, 0.04, 0.6, mat('marbleW', 0xfbf8f2));
    box(g, 0.6, 0.16, 0.4, w, -0.15, 0.04, -0.05); roof(g, 0.62, 0.42, 0.08, 0.5, green, -0.15, 0.2, -0.05);
    box(g, 0.14, 0.75, 0.14, w, 0.38, 0.04, -0.05);
    for (let i = 0; i < 5; i++) box(g, 0.145, 0.06, 0.145, tile, 0.38, 0.12 + i * 0.13, -0.05);
    box(g, 0.08, 0.1, 0.08, w, 0.38, 0.79, -0.05); roof(g, 0.1, 0.1, 0.05, 0.1, green, 0.38, 0.89, -0.05); cyl(g, 0.004, 0.004, 0.06, mat('gold', 0xd8b04a, { metalness: 0.6 }), 0.38, 0.94, -0.05, 4);
    box(g, 1.2, 0.01, 0.25, water('atlantic', 0x2f6f9a), 0, 0, 0.42);
  },
  djenne(g) {
    // the Great Mosque of Djenne: the largest mud-brick building, with palm-wood sticks poking out of its walls
    const mud = mat('mud', 0xb07a4f), mudD = mat('mudD', 0x9a6a42), stick = mat('toron', 0x5a3f2a), egg = mat('egg', 0xf2ece0);
    box(g, 1.0, 0.06, 0.7, mudD);
    box(g, 0.8, 0.18, 0.5, mud, 0, 0.06, -0.05);
    for (let i = 0; i < 9; i++) { const x = -0.38 + i * 0.095; box(g, 0.04, 0.24, 0.04, mud, x, 0.06, 0.2); cone(g, 0.02, 0.05, mud, x, 0.3, 0.2, 4); }
    [-0.22, 0, 0.22].forEach((x) => {
      frustum4(g, 0.05, 0.085, 0.42, mud, x, 0.06, 0.24); sphere(g, 0.018, egg, x, 0.5, 0.24);
      for (let k = 0; k < 4; k++) box(g, 0.006, 0.006, 0.07, stick, x, 0.14 + k * 0.08, 0.27);
    });
    for (let i = 0; i < 8; i++) for (let k = 0; k < 2; k++) box(g, 0.006, 0.006, 0.05, stick, -0.36 + i * 0.1, 0.12 + k * 0.08, 0.235);
  },
  lalibela(g) {
    // Church of St George, Lalibela: a cross-shaped church carved down into the solid rock
    const rock = mat('lalRock', 0x9a5a3f), rockD = mat('lalRockD', 0x7a4630), church = mat('lalChurch', 0xa8644a);
    box(g, 1.0, 0.22, 0.22, rock, 0, 0, -0.39); box(g, 1.0, 0.22, 0.22, rock, 0, 0, 0.39); box(g, 0.22, 0.22, 0.56, rock, -0.39); box(g, 0.22, 0.22, 0.56, rock, 0.39);
    box(g, 0.56, 0.01, 0.56, rockD);
    box(g, 0.42, 0.22, 0.14, church); box(g, 0.14, 0.22, 0.42, church);
    box(g, 0.24, 0.012, 0.03, rockD, 0, 0.22); box(g, 0.03, 0.012, 0.24, rockD, 0, 0.22);
    for (const x of [-0.12, 0.12]) box(g, 0.03, 0.06, 0.005, mat('dark', 0x2a2a2a), x, 0.1, 0.071);
  },
  baobabs(g) {
    // Avenue of the Baobabs: giant bottle-shaped trees lining a red dirt road
    box(g, 0.14, 0.008, 1.2, mat('redRoad', 0xb8603a));
    const bark = mat('baobab', 0x9a8070), leaf = mat('baobabL', 0x5f8a3f);
    [[-0.2, -0.45, 0.55], [0.2, -0.3, 0.6], [-0.22, -0.05, 0.5], [0.22, 0.15, 0.58], [-0.2, 0.35, 0.52], [0.2, 0.5, 0.48]].forEach(([x, z, h], i) => {
      cyl(g, 0.035, 0.07, h, bark, x, 0, z, 8);
      for (let k = 0; k < 4; k++) { const a = k * 1.57 + i; rod(g, new THREE.Vector3(x, h, z), new THREE.Vector3(x + Math.cos(a) * 0.08, h + 0.06, z + Math.sin(a) * 0.08), 0.008, bark); }
      sphere(g, 0.07, leaf, x, h + 0.07, z, 0.4);
    });
  },
  sossusvlei(g) {
    // Sossusvlei and Deadvlei: some of the tallest red dunes on Earth round a white clay pan with dead camelthorn trees
    const red = mat('redDune', 0xc8552f), redD = mat('redDuneD', 0xa8432a);
    [[-0.35, -0.3, 0.5, 0.55, 0.4], [0.3, -0.35, 0.55, 0.6, -0.3], [0.6, 0.2, 0.3, 0.4, 0.9], [-0.62, 0.2, 0.3, 0.4, -0.8]].forEach(([x, z, h, r, ry], i) => {
      const d = add(g, new THREE.ConeGeometry(r, h, 4), i % 2 ? red : redD, x, h / 2, z, 0, ry, 0); d.scale.set(1.7, 1, 0.65);
    });
    const pan = new THREE.Shape(); pan.moveTo(-0.35, 0.1); pan.bezierCurveTo(-0.3, 0.45, 0.25, 0.48, 0.38, 0.22); pan.bezierCurveTo(0.45, 0.05, 0.1, 0.0, -0.35, 0.1);
    add(g, new THREE.ShapeGeometry(pan).rotateX(Math.PI / 2), mat('clayPan', 0xeee6d6), 0, 0.004, 0).material.side = THREE.DoubleSide;
    const dead = mat('deadTree', 0x2a2420);
    [[-0.15, -0.25], [0.1, -0.32], [0.25, -0.2]].forEach(([x, z]) => {
      const b = new THREE.Vector3(x, 0, -z), t = new THREE.Vector3(x + 0.01, 0.12, -z);
      rod(g, b, t, 0.01, dead);
      [[0.06, 0.06], [-0.05, 0.05], [0.02, -0.06]].forEach(([dx, dz]) => rod(g, t, new THREE.Vector3(t.x + dx, 0.18, t.z + dz), 0.005, dead));
    });
  },
  renaissance(g) {
    // African Renaissance Monument in Dakar: a bronze family rising out of a hill towards the ocean
    const br = mat('bronzeA', 0x7a5a3a, { metalness: 0.5, roughness: 0.45 });
    cone(g, 0.55, 0.3, mat('hillDry', 0x8a7a55), 0, 0, 0, 10);
    cyl(g, 0.05, 0.08, 0.32, br, -0.04, 0.28, 0, 8); sphere(g, 0.045, br, -0.04, 0.66, 0);
    rod(g, new THREE.Vector3(-0.02, 0.56, 0), new THREE.Vector3(0.1, 0.78, 0), 0.02, br); sphere(g, 0.035, br, 0.11, 0.82, 0); cyl(g, 0.025, 0.03, 0.08, br, 0.11, 0.84, 0, 6);
    cyl(g, 0.04, 0.09, 0.26, br, 0.1, 0.28, 0.06, 8); sphere(g, 0.035, br, 0.12, 0.58, 0.06);
    add(g, new THREE.BoxGeometry(0.12, 0.2, 0.01), br, 0.18, 0.42, 0.04, 0, 0, -0.5);
  },
  gorilla(g) {
    // Bwindi Impenetrable Forest: a silverback mountain gorilla in misty bamboo and trees
    const fur = mat('gorilla', 0x2a2826), silver = mat('silverback', 0x8a8a88), greens = [mat('canopyA', 0x2f7a3a), mat('canopyC', 0x24602f)];
    for (let i = 0; i < 14; i++) { const a = i * 0.45 + 0.3, r = 0.42 + (i % 3) * 0.1, x = Math.cos(a) * r, z = -Math.abs(Math.sin(a)) * r * 0.8 - 0.05; cyl(g, 0.012, 0.016, 0.18, mat('bark', 0x5a3f2a), x, 0, z, 5); sphere(g, 0.1, greens[i % 2], x, 0.24, z, 0.8); }
    sphere(g, 0.12, fur, 0, 0.14, 0.15, 1.1); sphere(g, 0.09, silver, 0, 0.17, 0.08, 0.8);
    sphere(g, 0.065, fur, 0, 0.3, 0.22); box(g, 0.06, 0.03, 0.02, mat('gorillaFace', 0x3a3632), 0, 0.29, 0.28);
    for (const x of [-0.1, 0.1]) { rod(g, new THREE.Vector3(x, 0.22, 0.17), new THREE.Vector3(x * 1.4, 0.0, 0.3), 0.03, fur); }
    [[-0.2, 0.2, 0.12], [0.25, 0.4, 0.1]].forEach(([x, y, r]) => sphere(g, r * 2, mistM(), x, y, -0.1, 0.35));
  },
  capecoast(g) {
    // Cape Coast Castle, Ghana: a white fort on the rocks with cannons over the sea, and painted fishing canoes
    const w = mat('fortW', 0xf2efe6), black = mat('black', 0x2a2a2a);
    box(g, 1.2, 0.01, 0.3, water('gulf', 0x2f7a9a), 0, 0, 0.45);
    box(g, 0.8, 0.06, 0.5, mat('rockC', 0x6a645a), 0, 0, -0.05);
    box(g, 0.7, 0.14, 0.04, w, 0, 0.06, 0.18); box(g, 0.04, 0.14, 0.44, w, -0.35, 0.06, -0.04); box(g, 0.04, 0.14, 0.44, w, 0.35, 0.06, -0.04);
    for (let i = 0; i < 8; i++) box(g, 0.035, 0.03, 0.045, w, -0.32 + i * 0.09, 0.2, 0.18);
    box(g, 0.3, 0.22, 0.2, w, -0.1, 0.06, -0.12); box(g, 0.12, 0.12, 0.12, w, 0.22, 0.06, -0.14);
    for (let i = 0; i < 4; i++) cyl(g, 0.01, 0.012, 0.08, black, -0.2 + i * 0.13, 0.22, 0.22, 6).rotation.x = Math.PI / 2;
    [[-0.3, 0.42, 0xe0553a], [0.05, 0.48, 0xf2c14e], [0.35, 0.4, 0x4f8fd0]].forEach(([x, z, c]) => box(g, 0.16, 0.025, 0.04, mat(`canoe${c}`, c), x, 0.01, z));
  }
});

// The Amazon rainforest, roughly the outline of the biome [lat, lon], clockwise from the Colombian Andes
const AMAZON = [
  [1.0, -77.0], [4.0, -74.5], [4.5, -70.0], [6.0, -67.0], [5.5, -64.0], [5.0, -60.5], [5.8, -57.0], [5.0, -54.0], [4.0, -51.5],
  [1.5, -50.5], [-0.5, -49.0], [-1.5, -46.5], [-3.0, -44.5], [-5.0, -46.0], [-7.5, -48.5], [-10.0, -50.0], [-12.5, -52.5],
  [-13.5, -56.0], [-13.0, -60.0], [-15.5, -63.0], [-16.5, -64.5], [-15.0, -67.5], [-13.0, -69.5], [-12.0, -72.0], [-10.0, -74.5],
  [-7.0, -76.0], [-4.5, -77.5], [-1.5, -78.0]
];

// The great rivers through it [lat, lon], kept clear of trees so they show: Amazon, Rio Negro, Madeira
const AMAZON_RIVERS = [
  [[-3.75, -73.25], [-4.2, -69.9], [-3.3, -64.7], [-3.13, -60.02], [-3.3, -58.5], [-2.6, -56.7], [-2.43, -54.7], [-1.9, -52.5], [-0.5, -50.2]],
  [[-3.13, -60.02], [-2.0, -61.6], [-1.0, -62.9], [0.1, -67.0]],
  [[-3.4, -58.8], [-5.8, -61.3], [-8.76, -63.9]]
];

// The Ming Great Wall, west to east: Jiayu Pass in the Gobi to Old Dragon's Head on the Bohai Sea [lat, lon]
const GREAT_WALL = [
  [39.80, 98.22], [39.55, 98.95], [39.22, 99.7], [38.93, 100.45], [38.62, 101.2], [38.25, 101.95], [37.93, 102.64], [37.6, 103.3],
  [37.2, 104.05], [37.45, 104.7], [37.5, 105.2], [37.95, 105.75], [38.5, 106.2], [38.15, 106.75], [37.8, 107.4], [37.6, 107.75],
  [37.75, 108.6], [38.3, 109.7], [38.8, 110.5], [39.4, 111.5], [39.85, 112.3], [40.1, 113.3], [40.55, 114.1], [40.8, 114.9],
  [40.62, 115.5], [40.36, 116.02], [40.43, 116.57], [40.68, 117.24], [40.42, 118.3], [40.18, 119.1], [40.01, 119.75], [39.97, 119.8]
];

// lat/lon of each model, its size in globe units and the country (ISO 3166-1 alpha-2)
export const LANDMARKS = [
  // Viet Nam
  { id: 'onepillar', e: '🛕', en: 'One Pillar Pagoda', iso: 'vn', lat: 21.036, lon: 105.834, s: 0.009 },
  { id: 'halong', e: '🏝️', en: 'Ha Long Bay', iso: 'vn', lat: 20.91, lon: 107.18, s: 0.011 },
  { id: 'fansipan', e: '⛰️', en: 'Fansipan', iso: 'vn', lat: 22.30, lon: 103.77, s: 0.011 },
  { id: 'hue', e: '🏯', en: 'Hue Imperial City', iso: 'vn', lat: 16.469, lon: 107.578, s: 0.01 },
  { id: 'hoian', e: '🏮', en: 'Hoi An Ancient Town', iso: 'vn', lat: 15.877, lon: 108.326, s: 0.009 },
  { id: 'landmark81', e: '🏙️', en: 'Landmark 81', iso: 'vn', lat: 10.795, lon: 106.722, s: 0.012 },
  // China
  { id: 'greatwall', e: '🧱', en: 'The Great Wall', iso: 'cn', lat: 40.43, lon: 116.57, s: 0.004, path: GREAT_WALL },
  { id: 'forbidden', e: '🏯', en: 'The Forbidden City', iso: 'cn', lat: 39.916, lon: 116.397, s: 0.012 },
  { id: 'terracotta', e: '🗿', en: 'Terracotta Army', iso: 'cn', lat: 34.385, lon: 109.273, s: 0.011 },
  { id: 'potala', e: '🏔️', en: 'Potala Palace', iso: 'cn', lat: 29.658, lon: 91.117, s: 0.013 },
  { id: 'zhangjiajie', e: '⛰️', en: 'Zhangjiajie Mountains', iso: 'cn', lat: 29.32, lon: 110.43, s: 0.012 },
  { id: 'guilin', e: '🛶', en: 'Li River, Guilin', iso: 'cn', lat: 24.78, lon: 110.5, s: 0.011 },
  { id: 'pearl', e: '🗼', en: 'Oriental Pearl Tower', iso: 'cn', lat: 31.24, lon: 121.5, s: 0.013 },
  // Japan, Korea, Mongolia
  { id: 'fuji', e: '🗻', en: 'Mount Fuji', iso: 'jp', lat: 35.36, lon: 138.73, s: 0.015 },
  { id: 'tokyotower', e: '🗼', en: 'Tokyo Tower', iso: 'jp', lat: 35.66, lon: 139.75, s: 0.011 },
  { id: 'kinkakuji', e: '⛩️', en: 'Kinkaku-ji (Golden Pavilion)', iso: 'jp', lat: 35.04, lon: 135.73, s: 0.009 },
  { id: 'himeji', e: '🏯', en: 'Himeji Castle', iso: 'jp', lat: 34.84, lon: 134.69, s: 0.01 },
  { id: 'itsukushima', e: '⛩️', en: 'Itsukushima Shrine', iso: 'jp', lat: 34.30, lon: 132.32, s: 0.01 },
  { id: 'seoultower', e: '📡', en: 'N Seoul Tower', iso: 'kr', lat: 37.55, lon: 126.99, s: 0.011 },
  { id: 'bulguksa', e: '🛕', en: 'Bulguksa Temple', iso: 'kr', lat: 35.79, lon: 129.33, s: 0.01 },
  { id: 'genghis', e: '🐎', en: 'Genghis Khan Statue', iso: 'mn', lat: 47.81, lon: 107.53, s: 0.012 },
  // South-East Asia
  { id: 'watarun', e: '🛕', en: 'Wat Arun', iso: 'th', lat: 13.74, lon: 100.49, s: 0.01 },
  { id: 'ayutthaya', e: '🛕', en: 'Ayutthaya', iso: 'th', lat: 14.36, lon: 100.57, s: 0.008 },
  { id: 'angkor', e: '🏯', en: 'Angkor Wat', iso: 'kh', lat: 13.41, lon: 103.87, s: 0.012 },
  { id: 'thatluang', e: '🛕', en: 'Pha That Luang', iso: 'la', lat: 17.976, lon: 102.636, s: 0.01 },
  { id: 'shwedagon', e: '🛕', en: 'Shwedagon Pagoda', iso: 'mm', lat: 16.798, lon: 96.149, s: 0.012 },
  { id: 'bagan', e: '🎈', en: 'Bagan Temples', iso: 'mm', lat: 21.17, lon: 94.86, s: 0.012 },
  { id: 'petronas', e: '🏢', en: 'Petronas Towers', iso: 'my', lat: 3.158, lon: 101.711, s: 0.012 },
  { id: 'mbs', e: '🏨', en: 'Marina Bay Sands', iso: 'sg', lat: 1.283, lon: 103.86, s: 0.01 },
  { id: 'borobudur', e: '🛕', en: 'Borobudur', iso: 'id', lat: -7.608, lon: 110.204, s: 0.012 },
  { id: 'mayon', e: '🌋', en: 'Mayon Volcano', iso: 'ph', lat: 13.257, lon: 123.685, s: 0.013 },
  // South Asia, Middle East
  { id: 'taj', e: '🕌', en: 'Taj Mahal', iso: 'in', lat: 27.17, lon: 78.04, s: 0.012 },
  { id: 'indiagate', e: '🏛️', en: 'India Gate', iso: 'in', lat: 28.613, lon: 77.229, s: 0.009 },
  { id: 'goldentemple', e: '🛕', en: 'Golden Temple', iso: 'in', lat: 31.62, lon: 74.877, s: 0.01 },
  { id: 'gatewayindia', e: '🏛️', en: 'Gateway of India', iso: 'in', lat: 18.922, lon: 72.835, s: 0.01 },
  { id: 'everest', e: '🏔️', en: 'Mount Everest', iso: 'np', lat: 27.988, lon: 86.925, s: 0.017 },
  { id: 'burj', e: '🏙️', en: 'Burj Khalifa', iso: 'ae', lat: 25.197, lon: 55.274, s: 0.016 },
  { id: 'hagia', e: '🕌', en: 'Hagia Sophia', iso: 'tr', lat: 41.008, lon: 28.98, s: 0.011 },
  { id: 'cappadocia', e: '🎈', en: 'Cappadocia', iso: 'tr', lat: 38.64, lon: 34.83, s: 0.012 },
  { id: 'petra', e: '🏜️', en: 'Petra', iso: 'jo', lat: 30.329, lon: 35.444, s: 0.011 },
  // Africa
  { id: 'pyramids', e: '🔺', en: 'Pyramids of Giza', iso: 'eg', lat: 29.98, lon: 31.13, s: 0.014 },
  { id: 'abusimbel', e: '🗿', en: 'Abu Simbel', iso: 'eg', lat: 22.336, lon: 31.626, s: 0.012 },
  { id: 'kilimanjaro', e: '🏔️', en: 'Mount Kilimanjaro', iso: 'tz', lat: -3.067, lon: 37.355, s: 0.016 },
  { id: 'tablemountain', e: '⛰️', en: 'Table Mountain', iso: 'za', lat: -33.96, lon: 18.40, s: 0.013 },
  { id: 'victoria', e: '💦', en: 'Victoria Falls', iso: 'zw', lat: -17.925, lon: 25.857, s: 0.013 },
  { id: 'serengeti', e: '🦒', en: 'Serengeti', iso: 'tz', lat: -2.33, lon: 34.83, s: 0.014 },
  { id: 'merzouga', e: '🐪', en: 'Sahara Dunes (Erg Chebbi)', iso: 'ma', lat: 31.15, lon: -3.97, s: 0.013 },
  { id: 'hassan2', e: '🕌', en: 'Hassan II Mosque', iso: 'ma', lat: 33.608, lon: -7.633, s: 0.011 },
  { id: 'djenne', e: '🕌', en: 'Great Mosque of Djenne', iso: 'ml', lat: 13.905, lon: -4.555, s: 0.012 },
  { id: 'lalibela', e: '⛪', en: 'Rock Churches of Lalibela', iso: 'et', lat: 12.03, lon: 39.04, s: 0.011 },
  { id: 'gorilla', e: '🦍', en: 'Mountain Gorillas (Bwindi)', iso: 'ug', lat: -1.0, lon: 29.7, s: 0.012 },
  { id: 'baobabs', e: '🌳', en: 'Avenue of the Baobabs', iso: 'mg', lat: -20.25, lon: 44.42, s: 0.012 },
  { id: 'sossusvlei', e: '🏜️', en: 'Sossusvlei Red Dunes', iso: 'na', lat: -24.76, lon: 15.29, s: 0.013 },
  { id: 'renaissance', e: '🗽', en: 'African Renaissance Monument', iso: 'sn', lat: 14.722, lon: -17.495, s: 0.012 },
  { id: 'capecoast', e: '🏰', en: 'Cape Coast Castle', iso: 'gh', lat: 5.105, lon: -1.241, s: 0.011 },
  // Europe
  { id: 'eiffel', e: '🗼', en: 'Eiffel Tower', iso: 'fr', lat: 48.858, lon: 2.294, s: 0.013 },
  { id: 'montstmichel', e: '🏰', en: 'Mont-Saint-Michel', iso: 'fr', lat: 48.636, lon: -1.511, s: 0.011 },
  { id: 'bigben', e: '🕰️', en: 'Big Ben', iso: 'gb', lat: 51.5, lon: -0.124, s: 0.012 },
  { id: 'stonehenge', e: '🪨', en: 'Stonehenge', iso: 'gb', lat: 51.179, lon: -1.826, s: 0.009 },
  { id: 'edinburgh', e: '🏰', en: 'Edinburgh Castle', iso: 'gb', lat: 55.949, lon: -3.2, s: 0.011 },
  { id: 'sagrada', e: '⛪', en: 'Sagrada Familia', iso: 'es', lat: 41.404, lon: 2.174, s: 0.012 },
  { id: 'alhambra', e: '🏰', en: 'The Alhambra', iso: 'es', lat: 37.176, lon: -3.588, s: 0.011 },
  { id: 'belem', e: '🏰', en: 'Belem Tower', iso: 'pt', lat: 38.69, lon: -9.216, s: 0.009 },
  { id: 'colosseum', e: '🏟️', en: 'The Colosseum', iso: 'it', lat: 41.89, lon: 12.49, s: 0.011 },
  { id: 'pisa', e: '🗼', en: 'Leaning Tower of Pisa', iso: 'it', lat: 43.72, lon: 10.4, s: 0.01 },
  { id: 'venice', e: '🛶', en: 'Venice', iso: 'it', lat: 45.434, lon: 12.339, s: 0.011 },
  { id: 'parthenon', e: '🏛️', en: 'The Parthenon', iso: 'gr', lat: 37.97, lon: 23.73, s: 0.011 },
  { id: 'brandenburg', e: '🏛️', en: 'Brandenburg Gate', iso: 'de', lat: 52.516, lon: 13.378, s: 0.01 },
  { id: 'neuschwanstein', e: '🏰', en: 'Neuschwanstein Castle', iso: 'de', lat: 47.557, lon: 10.75, s: 0.011 },
  { id: 'windmill', e: '🌷', en: 'Dutch windmills', iso: 'nl', lat: 51.88, lon: 4.64, s: 0.01 },
  { id: 'atomium', e: '⚛️', en: 'The Atomium', iso: 'be', lat: 50.895, lon: 4.341, s: 0.01 },
  { id: 'matterhorn', e: '🏔️', en: 'The Matterhorn', iso: 'ch', lat: 45.976, lon: 7.658, s: 0.013 },
  // Russia
  { id: 'stbasil', e: '⛪', en: 'Red Square & the Kremlin', iso: 'ru', lat: 55.752, lon: 37.623, s: 0.012 },
  { id: 'hermitage', e: '🏛️', en: 'Winter Palace (Hermitage)', iso: 'ru', lat: 59.94, lon: 30.314, s: 0.011 },
  { id: 'motherland', e: '🗽', en: 'The Motherland Calls', iso: 'ru', lat: 48.742, lon: 44.537, s: 0.013 },
  { id: 'elbrus', e: '🏔️', en: 'Mount Elbrus', iso: 'ru', lat: 43.35, lon: 42.44, s: 0.015 },
  { id: 'baikal', e: '🏞️', en: 'Lake Baikal', iso: 'ru', lat: 53.5, lon: 108.0, s: 0.016 },
  // the Americas, Oceania
  { id: 'liberty', e: '🗽', en: 'Statue of Liberty', iso: 'us', lat: 40.689, lon: -74.044, s: 0.012 },
  { id: 'capitol', e: '🏛️', en: 'The U.S. Capitol', iso: 'us', lat: 38.89, lon: -77.009, s: 0.011 },
  { id: 'gatewayarch', e: '🌈', en: 'Gateway Arch', iso: 'us', lat: 38.624, lon: -90.185, s: 0.012 },
  { id: 'rushmore', e: '🗿', en: 'Mount Rushmore', iso: 'us', lat: 43.879, lon: -103.459, s: 0.012 },
  { id: 'spaceneedle', e: '🗼', en: 'Space Needle', iso: 'us', lat: 47.62, lon: -122.349, s: 0.012 },
  { id: 'goldengate', e: '🌉', en: 'Golden Gate Bridge', iso: 'us', lat: 37.82, lon: -122.48, s: 0.012 },
  { id: 'cntower', e: '🗼', en: 'CN Tower', iso: 'ca', lat: 43.643, lon: -79.387, s: 0.013 },
  { id: 'chichen', e: '🛕', en: 'Chichen Itza', iso: 'mx', lat: 20.68, lon: -88.57, s: 0.011 },
  { id: 'cartagena', e: '🏘️', en: 'Cartagena Old Town', iso: 'co', lat: 10.423, lon: -75.548, s: 0.011 },
  { id: 'angelfalls', e: '💦', en: 'Angel Falls', iso: 've', lat: 5.967, lon: -62.535, s: 0.014 },
  { id: 'galapagos', e: '🐢', en: 'Galapagos Islands', iso: 'ec', lat: -0.74, lon: -90.31, s: 0.012 },
  { id: 'amazon', e: '🦜', en: 'Amazon Rainforest', iso: 'br', lat: -3.1, lon: -60.0, s: 0.004, area: AMAZON, clear: AMAZON_RIVERS },
  { id: 'brasilia', e: '⛪', en: 'Cathedral of Brasilia', iso: 'br', lat: -15.798, lon: -47.876, s: 0.011 },
  { id: 'nazca', e: '🐦', en: 'Nazca Lines', iso: 'pe', lat: -14.74, lon: -75.13, s: 0.012 },
  { id: 'uyuni', e: '🧂', en: 'Salar de Uyuni', iso: 'bo', lat: -20.13, lon: -67.49, s: 0.014 },
  { id: 'alma', e: '📡', en: 'ALMA Telescopes, Atacama', iso: 'cl', lat: -23.03, lon: -67.75, s: 0.012 },
  { id: 'iguazu', e: '💦', en: 'Iguazu Falls', iso: 'ar', lat: -25.695, lon: -54.437, s: 0.013 },
  { id: 'perito', e: '🧊', en: 'Perito Moreno Glacier', iso: 'ar', lat: -50.47, lon: -73.03, s: 0.013 },
  { id: 'machupicchu', e: '⛰️', en: 'Machu Picchu', iso: 'pe', lat: -13.163, lon: -72.545, s: 0.012 },
  { id: 'christ', e: '✝️', en: 'Christ the Redeemer', iso: 'br', lat: -22.95, lon: -43.21, s: 0.012 },
  { id: 'obelisco', e: '🏛️', en: 'Obelisk of Buenos Aires', iso: 'ar', lat: -34.603, lon: -58.381, s: 0.01 },
  { id: 'moai', e: '🗿', en: 'Moai of Easter Island', iso: 'cl', lat: -27.12, lon: -109.37, s: 0.011 },
  { id: 'opera', e: '🎭', en: 'Sydney Opera House', iso: 'au', lat: -33.857, lon: 151.215, s: 0.011 },
  { id: 'uluru', e: '🪨', en: 'Uluru', iso: 'au', lat: -25.345, lon: 131.036, s: 0.013 }
];

export function buildLandmark(id) {
  const g = new THREE.Group();
  (B[id] || B.pyramids)(g);
  g.traverse((o) => { if (o.isMesh) o.frustumCulled = false; if (o.userData.bob) o.userData.y0 = o.position.y; });
  return g;
}

// A landmark that follows a real path on the globe (the Great Wall): built straight in globe coordinates,
// at its true length and place. The wall rises out of the ground with `group.userData.rise` (0..1).
const D2R = Math.PI / 180;
const llv = (la, lo) => new THREE.Vector3(Math.cos(la * D2R) * Math.cos(lo * D2R), Math.sin(la * D2R), -Math.cos(la * D2R) * Math.sin(lo * D2R));
export function buildPathLandmark(l) {
  // densify the path (about 4 km steps) with a small wiggle, as the real wall follows the ridges
  const pts = [];
  for (let i = 0; i + 1 < l.path.length; i++) {
    const [a0, o0] = l.path[i], [a1, o1] = l.path[i + 1];
    const n = Math.max(1, Math.ceil(Math.hypot(a1 - a0, o1 - o0) / 0.035));
    for (let k = 0; k < n; k++) {
      const t = k / n, w = Math.sin((i * 7 + k) * 1.3) * 0.012 * Math.sin(t * Math.PI);
      pts.push(llv(a0 + (a1 - a0) * t + w, o0 + (o1 - o0) * t - w));
    }
  }
  pts.push(llv(...l.path[l.path.length - 1]));
  const W = 0.0007, H = 0.0011, TW = 0.0015, TH = 0.0017;
  const wall = { pos: [], h: [] }, towers = { pos: [], h: [] };
  const lift = (p, h) => p.clone().normalize().multiplyScalar(1 + h);
  // one triangle, wound so it faces `out`
  const tri = (G, a, b, c, ha, hb, hc, out) => {
    const nrm = new THREE.Vector3().subVectors(b, a).cross(new THREE.Vector3().subVectors(c, a));
    if (nrm.dot(out) < 0) { [b, c] = [c, b]; [hb, hc] = [hc, hb]; }
    for (const [v, h] of [[a, ha], [b, hb], [c, hc]]) { G.pos.push(v.x, v.y, v.z); G.h.push(h); }
  };
  // a block standing on four ground corners (in order round it), h high
  const block = (G, c, h) => {
    const base = c.map((p) => lift(p, -0.0003)), top = c.map((p) => lift(p, h));
    const mid = c.reduce((s, p) => s.add(p), new THREE.Vector3()).multiplyScalar(0.25), up = mid.clone().normalize();
    tri(G, top[0], top[1], top[2], h + 0.0003, h + 0.0003, h + 0.0003, up); tri(G, top[0], top[2], top[3], h + 0.0003, h + 0.0003, h + 0.0003, up);
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4, out = new THREE.Vector3().addVectors(c[i], c[j]).multiplyScalar(0.5).sub(mid);
      tri(G, base[i], base[j], top[j], 0, 0, h + 0.0003, out); tri(G, base[i], top[j], top[i], 0, h + 0.0003, h + 0.0003, out);
    }
  };
  const side = pts.map((p, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)]; const t = new THREE.Vector3().subVectors(b, a); return new THREE.Vector3().crossVectors(p, t).normalize(); });
  for (let i = 0; i + 1 < pts.length; i++) {
    const a = pts[i], b = pts[i + 1], sa = side[i], sb = side[i + 1];
    block(wall, [a.clone().addScaledVector(sa, W / 2), b.clone().addScaledVector(sb, W / 2), b.clone().addScaledVector(sb, -W / 2), a.clone().addScaledVector(sa, -W / 2)], H);
    if (i % 12 === 0) {
      const t = new THREE.Vector3().subVectors(b, a).normalize().multiplyScalar(TW / 2), s = sa.clone().multiplyScalar(TW / 2);
      block(towers, [a.clone().add(t).add(s), a.clone().add(t).sub(s), a.clone().sub(t).sub(s), a.clone().sub(t).add(s)], TH);
    }
  }
  const g = new THREE.Group(), rise = { value: 0 };
  const mk = (G, color) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(G.pos, 3));
    geo.setAttribute('aH', new THREE.Float32BufferAttribute(G.h, 1));
    geo.computeVertexNormals(); // unindexed, so these are the true face normals
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.85 });
    m.onBeforeCompile = (sh) => {
      sh.uniforms.rise = rise;
      sh.vertexShader = 'attribute float aH;\nuniform float rise;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n  transformed -= normalize(position) * aH * (1.0 - rise);');
    };
    const mesh = new THREE.Mesh(geo, m); mesh.frustumCulled = false; g.add(mesh);
  };
  mk(wall, 0xd2c3a2); mk(towers, 0xb3a07c);
  g.userData.rise = rise;
  return g;
}

// A landmark that covers a real area (the Amazon): thousands of trees scattered over the land inside the
// outline, at true size and place. `isLand(lat, lon)` keeps them off the sea and the big rivers' mouths.
export function buildAreaLandmark(l, isLand) {
  const poly = l.area, la = poly.map((p) => p[0]), lo = poly.map((p) => p[1]);
  const [a0, a1, o0, o1] = [Math.min(...la), Math.max(...la), Math.min(...lo), Math.max(...lo)];
  const inside = (y, x) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [yi, xi] = poly[i], [yj, xj] = poly[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
  // distance (degrees) from a point to the rivers to keep clear
  const nearRiver = (y, x) => (l.clear || []).some((r) => r.some(([y0, x0], i) => {
    if (!i) return false;
    const [y1, x1] = r[i - 1], dy = y1 - y0, dx = x1 - x0, t = Math.max(0, Math.min(1, ((y - y0) * dy + (x - x0) * dx) / (dy * dy + dx * dx)));
    return Math.hypot(y - (y0 + t * dy), x - (x0 + t * dx)) < 0.2;
  }));
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const pts = [];
  for (let t = 0; t < 40000 && pts.length < 11000; t++) {
    const y = a0 + rnd() * (a1 - a0), x = o0 + rnd() * (o1 - o0);
    if (inside(y, x) && (!isLand || isLand(y, x)) && !nearRiver(y, x)) pts.push([y, x]);
  }
  const geo = new THREE.IcosahedronGeometry(1, 0).translate(0, 1, 0); // a lumpy crown standing on the ground
  const m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true });
  const rise = { value: 0 };
  m.onBeforeCompile = (sh) => {
    sh.uniforms.rise = rise;
    sh.vertexShader = 'uniform float rise;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n  transformed *= max(rise, 0.001);');
  };
  const mesh = new THREE.InstancedMesh(geo, m, pts.length);
  const greens = [0x2f7a3a, 0x3f8f45, 0x24602f, 0x4a9a4a, 0x2a6a35].map((c) => new THREE.Color(c));
  const M4 = new THREE.Matrix4(), n = new THREE.Vector3(), x = new THREE.Vector3(), z = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
  pts.forEach(([y, xl], i) => {
    n.copy(llv(y, xl));
    z.copy(up).projectOnPlane(n).normalize(); x.crossVectors(n, z).normalize();
    const big = rnd() < 0.06, r = (big ? 0.0021 : 0.0013) * (0.8 + rnd() * 0.4); // emergent giants stand above the canopy
    M4.makeBasis(x.multiplyScalar(r), n.clone().multiplyScalar(r * (big ? 1.0 : 0.6)), z.multiplyScalar(r)).setPosition(n.multiplyScalar(1.0001));
    mesh.setMatrixAt(i, M4);
    mesh.setColorAt(i, greens[Math.floor(rnd() * greens.length)]);
  });
  mesh.frustumCulled = false;
  const g = new THREE.Group(); g.add(mesh);
  g.userData.rise = rise;
  return g;
}
