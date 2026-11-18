// Map layers of the Explore mode: main roads, railways (high-speed lines stand out) and waterways.
// Real data baked by tools/geoflight-bake/bake-layers.mjs from Natural Earth, loaded the first time a layer
// is switched on, drawn as screen-space lines (constant pixel width at any zoom).
import * as THREE from 'three';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

const BASE = `${import.meta.env.BASE_URL || '/'}geoflight/layers/`;
const D2R = Math.PI / 180;
const R = 1.0006; // a hair above the ground

// one style per class in the file; `near` classes only show when zoomed in, `dash` in screen-ish units
export const LAYER_STYLE = {
  roads: [
    { color: 0xffc23a, width: 2.6, label: 'Motorway' },
    { color: 0xff9a4d, width: 1.7, label: 'Highway, main road' },
    { color: 0xf6e7c8, width: 1.1, near: true, label: 'Other roads' }
  ],
  rail: [
    { color: 0xff3d8b, width: 3.2, label: 'High-speed rail' },
    { color: 0xf2f0ff, width: 1.8, dash: true, label: 'Main railway' },
    { color: 0xd8d4f0, width: 1.2, dash: true, near: true, label: 'Other railway' }
  ],
  water: [
    { color: 0x4fd6ff, width: 2.6, label: 'Major river' },
    { color: 0x7fd0f2, width: 1.5, label: 'River' },
    { color: 0xb4ecff, width: 1.6, dash: true, label: 'Ferry route' },
    { color: 0x9fe0ff, width: 1.6, dash: true, label: 'Sea route' }
  ]
};

const toVec = (la, lo, out) => out.set(Math.cos(la * D2R) * Math.cos(lo * D2R) * R, Math.sin(la * D2R) * R, -Math.cos(la * D2R) * Math.sin(lo * D2R) * R);

export class MapLayers {
  constructor(scene, extra = {}) {
    this.scene = scene;
    this.extra = extra; // { water: [[Vector3, ...], ...] } lines already in the game (shipping lanes)
    this.groups = {};
    this.loading = {};
    this.on = {};
    this.mats = [];
  }

  // Switch a layer on / off; the first time it downloads and builds it. Resolves when it is ready.
  async set(name, on) {
    this.on[name] = on;
    if (on && !this.groups[name]) {
      this.loading[name] ||= this.build(name);
      await this.loading[name];
    }
    if (this.groups[name]) this.groups[name].visible = on;
  }

  async build(name) {
    const buf = await (await fetch(`${BASE}${name}.bin`)).arrayBuffer();
    const a = new Int16Array(buf), styles = LAYER_STYLE[name];
    const segs = styles.map(() => []);
    const p = new THREE.Vector3(), q = new THREE.Vector3(), m = new THREE.Vector3();
    const push = (list, A, B) => {
      // long legs are split so the chord does not dip under the curved ground
      const w = A.angleTo(B), n = Math.max(1, Math.ceil(w / 0.012));
      let prev = A.clone();
      for (let k = 1; k <= n; k++) {
        const cur = k === n ? B.clone() : m.copy(A).lerp(B, k / n).setLength(R).clone();
        list.push(prev.x, prev.y, prev.z, cur.x, cur.y, cur.z);
        prev = cur;
      }
    };
    for (let i = 0; i < a.length;) {
      const n = a[i], cls = Math.min(a[i + 1], styles.length - 1);
      let la = a[i + 2], lo = a[i + 3];
      toVec(la / 100, lo / 100, p);
      for (let k = 1; k < n; k++) {
        la += a[i + 2 + k * 2]; lo += a[i + 3 + k * 2];
        toVec(la / 100, lo / 100, q);
        push(segs[cls], p, q);
        p.copy(q);
      }
      i += 4 + (n - 1) * 2;
    }
    (this.extra[name] || []).forEach((line) => { for (let k = 0; k + 1 < line.length; k++) push(segs[styles.length - 1], line[k].clone().setLength(R), line[k + 1].clone().setLength(R)); });
    const g = new THREE.Group();
    g.visible = !!this.on[name];
    segs.forEach((pos, c) => {
      if (!pos.length) return;
      const st = styles[c];
      const geo = new LineSegmentsGeometry().setPositions(pos);
      const mat = new LineMaterial({ color: st.color, linewidth: st.width, transparent: true, opacity: 0.95, dashed: !!st.dash, dashSize: 0.004, gapSize: 0.003, depthWrite: false });
      mat.userData = { near: !!st.near, dash: !!st.dash };
      const line = new LineSegments2(geo, mat);
      if (st.dash) line.computeLineDistances();
      line.frustumCulled = false; line.renderOrder = 3;
      g.add(line);
      this.mats.push(mat);
    });
    this.scene.add(g);
    this.groups[name] = g;
  }

  // per frame: only in Explore, fine classes fade in when close, dashes keep about the same size on screen
  update(show, z, camH, w, h) {
    for (const k in this.groups) this.groups[k].visible = show && !!this.on[k];
    if (!show) return;
    const nearA = 1 - THREE.MathUtils.smoothstep(z, 0.34, 0.5);
    for (const m of this.mats) {
      m.resolution.set(w, h);
      m.opacity = m.userData.near ? nearA * 0.9 : 0.95;
      if (m.userData.dash) { m.dashSize = camH * 0.025; m.gapSize = camH * 0.018; }
    }
  }

  dispose() { for (const k in this.groups) this.groups[k].traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); }); }
}

// A single dashed route on the globe (history marches), [lat, lon] points, densified along great circles.
export function makeRoute(pts, color = 0xffd27a, width = 3) {
  const P = pts.map(([la, lo]) => toVec(la, lo, new THREE.Vector3()).setLength(1.0012)), pos = [];
  for (let i = 0; i + 1 < P.length; i++) {
    const n = Math.max(1, Math.ceil(P[i].angleTo(P[i + 1]) / 0.004));
    for (let k = 0; k < n; k++) {
      const a = P[i].clone().lerp(P[i + 1], k / n).setLength(1.0012), b = P[i].clone().lerp(P[i + 1], (k + 1) / n).setLength(1.0012);
      pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  const mat = new LineMaterial({ color, linewidth: width, transparent: true, opacity: 0.95, dashed: true, dashSize: 0.004, gapSize: 0.003, depthWrite: false });
  const line = new LineSegments2(new LineSegmentsGeometry().setPositions(pos), mat);
  line.computeLineDistances(); line.frustumCulled = false; line.renderOrder = 4;
  return line;
}

// A solid arc lifted off the ground between two places (the way knowledge travelled), [lat, lon] ends.
export function makeArc(a, b, color = 0xffd27a, width = 3) {
  const A = toVec(a[0], a[1], new THREE.Vector3()), B = toVec(b[0], b[1], new THREE.Vector3());
  const ang = A.angleTo(B), lift = Math.min(0.22, 0.012 + ang * 0.09), n = Math.max(8, Math.ceil(ang / 0.02)), pos = [];
  let prev = null;
  for (let i = 0; i <= n; i++) {
    const t = i / n, p = A.clone().lerp(B, t).setLength(1.001 + lift * Math.sin(Math.PI * t));
    if (prev) pos.push(prev.x, prev.y, prev.z, p.x, p.y, p.z);
    prev = p;
  }
  const mat = new LineMaterial({ color, linewidth: width, transparent: true, opacity: 0.9, depthWrite: false });
  const line = new LineSegments2(new LineSegmentsGeometry().setPositions(pos), mat);
  line.frustumCulled = false; line.renderOrder = 4;
  return line;
}
