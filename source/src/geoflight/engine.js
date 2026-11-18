// Geo-Flight engine: a small Earth (radius 1), the player's plane, ships on real shipping lanes, airliners
// with contrails, drifting clouds, day / night and the camera. Plain three.js, one draw call per kind of
// thing (instancing), all data pre-baked (see tools/geoflight-bake).
import * as THREE from 'three';
import { makeAtmosphere, makeGlobe, makeStars } from './globe.js';
import { blobTexture, glintTexture, makeAirlinerGeometry, makeCargoShipGeometry, makeCloudGeometry, makeCruiseShipGeometry, makePlayerPlane, wakeTexture } from './models.js';
import { DetailStreamer } from './detail.js';
import { makeArc, makeRoute, MapLayers } from './layers.js';
import { KIND_ICON } from './history.js';
import { BRANCH_COLOR, hex } from './branches.js';
import { buildAreaLandmark, buildLandmark, buildPathLandmark, LANDMARKS, nightMats } from './landmarks.js';
import { oceanName, PLACES } from './places.js';
import dayUrl from './assets/day.jpg';
import nightUrl from './assets/night.jpg';
import idsUrl from './assets/ids.png';
import idsCpuUrl from './assets/ids-cpu.png';
import reliefUrl from './assets/relief.png';
import worldUrl from './assets/world.json?url';

const D2R = Math.PI / 180;
const tmpV = new THREE.Vector3(), tmpV2 = new THREE.Vector3(), tmpQ = new THREE.Quaternion(), tmpM = new THREE.Matrix4(), tmpS = new THREE.Vector3();
export const llToVec = (lat, lon, r = 1, out = new THREE.Vector3()) => out.set(Math.cos(lat * D2R) * Math.cos(lon * D2R) * r, Math.sin(lat * D2R) * r, -Math.cos(lat * D2R) * Math.sin(lon * D2R) * r);
export const vecToLL = (v) => { const n = v.length(); return [Math.asin(THREE.MathUtils.clamp(v.y / n, -1, 1)) / D2R, Math.atan2(-v.z, v.x) / D2R]; };
const smooth = (a, b, t) => { const x = THREE.MathUtils.clamp((t - a) / (b - a), 0, 1); return x * x * (3 - 2 * x); };
const ALT_MIN = 0.007, ALT_MAX = 0.055;
// explore mode: camera height above the ground for zoom 0..1 (exponential, so every step feels the same)
const EX_H0 = 0.032, EX_H1 = 2.6;
const exHeight = (z) => EX_H0 * Math.pow(EX_H1 / EX_H0, z);
const northOf = (p, out = new THREE.Vector3()) => out.set(0, 1, 0).projectOnPlane(p).normalize();
const _e = new THREE.Vector3(), _d = new THREE.Vector3(), _a = new THREE.Vector3();

// Matrix that puts a model (nose +Z, up +Y) at `pos` facing `fwd` with `up`.
const _x = new THREE.Vector3(), _y = new THREE.Vector3(), _z = new THREE.Vector3(), _s = new THREE.Vector3();
function placeMatrix(m, pos, fwd, up, scale) {
  _z.copy(fwd);
  _x.crossVectors(up, _z).normalize();
  _y.crossVectors(_z, _x).normalize();
  m.makeBasis(_x, _y, _z);
  m.scale(_s.set(scale, scale, scale));
  m.setPosition(pos);
  return m;
}
// Great-circle slerp between unit vectors.
function slerp(a, b, t, out) {
  const d = THREE.MathUtils.clamp(a.dot(b), -1, 1), w = Math.acos(d);
  if (w < 1e-6) return out.copy(a);
  const s = Math.sin(w);
  return out.copy(a).multiplyScalar(Math.sin((1 - t) * w) / s).addScaledVector(b, Math.sin(t * w) / s);
}

export class GeoEngine {
  constructor(container, cb = {}) {
    this.el = container;
    this.cb = cb;
    this.input = { turn: 0, climb: 0 };
    this.keys = new Set();
    this.zoom = 0.3; this.zoomT = 0.3;
    this.timeFlow = true;
    this.auto = null; // { target: Vector3, place, wander, arrived }
    this.disposed = false;
    this.flying = false; // the plane waits on the intro screen until take-off
    this.mode = 'explore'; // 'explore': browse freely, always daytime | 'fly': the plane, day / night cycle
    this.panV = new THREE.Vector2(); // explore: glide after a drag (radians per second, east / north)
    this.dragging = false;
    this.allDay = 1;
    this.showFamous = true; // Explore: the "Famous places" layer (3D landmarks)
    this.mobile = matchMedia('(pointer: coarse)').matches;
  }

  /* ---------------- loading ---------------- */
  async load() {
    const mgr = new THREE.LoadingManager();
    let done = 0;
    const total = 6;
    const tick = () => { done++; this.cb.onProgress?.((done / total) * 0.85); };
    const tl = new THREE.TextureLoader(mgr);
    const get = (url, srgb) => new Promise((res, rej) => tl.load(url, (t) => { if (srgb) t.colorSpace = THREE.SRGBColorSpace; tick(); res(t); }, undefined, rej));
    const [day, night, ids, relief, world, cpu] = await Promise.all([
      get(dayUrl, true), get(nightUrl, false), get(idsUrl, false), get(reliefUrl, false),
      fetch(worldUrl).then((r) => r.json()).then((j) => { tick(); return j; }),
      new Promise((res, rej) => { const img = new Image(); img.onload = () => { tick(); res(img); }; img.onerror = rej; img.src = idsCpuUrl; })
    ]);
    if (this.disposed) return;
    ids.magFilter = ids.minFilter = THREE.NearestFilter; ids.generateMipmaps = false; ids.wrapS = THREE.RepeatWrapping;
    relief.wrapS = THREE.RepeatWrapping;
    day.anisotropy = 4;
    // country index on the CPU (2048x1024, red channel)
    const c = document.createElement('canvas'); c.width = cpu.width; c.height = cpu.height;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(cpu, 0, 0);
    const px = g.getImageData(0, 0, c.width, c.height).data;
    this.idGrid = new Uint8Array(c.width * c.height); this.idW = c.width; this.idH = c.height;
    for (let i = 0; i < this.idGrid.length; i++) this.idGrid[i] = px[i * 4];
    this.world = world;
    this.countryById = new Map(world.countries.map((k) => [k.id, k]));
    this.build({ day, night, ids, relief });
    // fetch the sharp tiles round the starting point before take-off
    const [la, lo] = this.planeLL();
    this.cb.onProgress?.(0.92);
    await this.detail.update(la, lo);
    if (this.disposed) return;
    this.cb.onProgress?.(1);
    this.cb.onReady?.();
  }

  /* ---------------- scene ---------------- */
  build(tex) {
    const r = this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.dpr = Math.min(window.devicePixelRatio || 1, this.mobile ? 1.6 : 2);
    r.setPixelRatio(this.dpr);
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.setClearColor(0x02040c);
    this.el.appendChild(r.domElement);
    r.domElement.style.display = 'block';

    const scene = this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(52, 1, 0.0006, 120);

    const globe = makeGlobe(tex);
    this.globeU = globe.uniforms;
    scene.add(globe.mesh);
    this.atmo = makeAtmosphere(); scene.add(this.atmo);
    this.stars = makeStars(); scene.add(this.stars);
    this.stars.material.uniforms.px.value = this.dpr;

    this.sun = new THREE.DirectionalLight(0xfff1dc, 2.6); scene.add(this.sun, this.sun.target);
    this.hemi = new THREE.HemisphereLight(0xbfdcff, 0x29324a, 0.7); scene.add(this.hemi);

    this.tex = { blob: blobTexture(), wake: wakeTexture(), glint: glintTexture() };
    this.buildPlayer();
    this.buildClouds();
    this.buildShips();
    this.buildAirliners();
    this.buildCityGlows();
    this.mapLayers = new MapLayers(scene, { water: this.lanes.map((l) => l.pts) });
    this.lms = LANDMARKS.map((l) => {
      const n = llToVec(l.lat, l.lon);
      // a long landmark (the Great Wall) counts as near when any part of it is near
      const outline = l.path || l.area;
      const reach = outline ? Math.max(...outline.map(([a, o]) => llToVec(a, o).angleTo(n))) : 0;
      return { ...l, n, reach, north: new THREE.Vector3(0, 1, 0).projectOnPlane(n).normalize(), show: 0, target: 0, group: null };
    });
    this.citiesByPop = [...this.world.cities].sort((a, b) => b[3] - a[3]);
    // start over Viet Nam, north up
    // start over Viet Nam, heading towards Ha Long Bay, late afternoon
    this.p = llToVec(20.6, 105.2);
    this.f = northOf(this.p); // Explore keeps north up (the flight also starts heading north)
    this.alt = 0.022; this.bank = 0; this.pitch = 0;
    this.sunDecl = 14;
    this.setLocalHour(16.6);
    this.zoom = this.zoomT = 0.38; this.timeFlow = false;
    this.time = 0; this.scanT = 0; this.labelT = 0; this.tickT = 0;
    this.currentId = -1; this.currentCity = null;
    this.resize();
    this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this.el);
    this.onKey = (e) => {
      const k = e.key.toLowerCase();
      if (e.type === 'keydown') this.keys.add(k); else this.keys.delete(k);
      if (e.type === 'keydown' && ['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'a', 'd', 'w', 's'].includes(k)) { this.stopAuto(true); if (k.startsWith('arrow')) e.preventDefault(); }
      if (e.type === 'keydown' && (k === '+' || k === '=')) this.zoomBy(-0.12);
      if (e.type === 'keydown' && (k === '-' || k === '_')) this.zoomBy(0.12);
    };
    window.addEventListener('keydown', this.onKey); window.addEventListener('keyup', this.onKey);
    this.clock = new THREE.Clock();
    if (import.meta.env?.DEV) window.__geoflight = this; // preview / screenshots only
    this.detail = new DetailStreamer(r, this.mobile ? 5 : 6);
    this.globeU.detailMap.value = this.detail.texture;
    this.globeU.detailAux.value = this.detail.auxTexture;
    this.globeU.detailN.value = this.detail.N;
    this.globeU.slotTile.value = this.detail.slotTile.concat(Array.from({ length: 49 - this.detail.slotTile.length }, () => new THREE.Vector2(-1, -1)));
    this.detailT = 0;
    r.setAnimationLoop(() => this.frame());
  }

  buildPlayer() {
    const { group, prop } = makePlayerPlane();
    this.plane = group; this.prop = prop;
    this.planeScale = 0.0044;
    this.scene.add(group);
    this.planeShadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: this.tex.blob, color: 0x000814, transparent: true, opacity: 0.35, depthWrite: false }));
    this.planeShadow.renderOrder = 2;
    this.scene.add(this.planeShadow);
    // a soft beacon so the plane can be found from orbit
    this.beacon = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.tex.glint, color: 0xffd257, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending }));
    this.scene.add(this.beacon);
  }

  buildClouds() {
    const N = this.mobile ? 60 : 90;
    const geos = [makeCloudGeometry(7), makeCloudGeometry(13), makeCloudGeometry(29)];
    const mat = new THREE.ShaderMaterial({
      uniforms: { sunDir: { value: new THREE.Vector3(1, 0, 0) } },
      vertexShader: /* glsl */`
        uniform vec3 sunDir; varying float vLit; varying float vDay; varying float vTop;
        void main() {
          mat4 m = modelMatrix * instanceMatrix;
          vec3 n = normalize(mat3(m) * normal);
          vec3 c = normalize((m * vec4(0.0, 0.0, 0.0, 1.0)).xyz);
          vDay = smoothstep(-0.18, 0.25, dot(c, sunDir));
          vLit = 0.5 + 0.5 * max(dot(n, sunDir), 0.0);
          vTop = clamp(dot(n, c) * 0.5 + 0.5, 0.0, 1.0);
          gl_Position = projectionMatrix * viewMatrix * m * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */`
        uniform vec3 sunDir; varying float vLit; varying float vDay; varying float vTop;
        void main() {
          vec3 dayC = mix(vec3(0.66, 0.72, 0.84), vec3(1.0, 0.995, 0.98), smoothstep(0.25, 0.9, vTop)) * vLit;
          dayC = mix(dayC, dayC * vec3(1.0, 0.78, 0.62), (1.0 - smoothstep(0.2, 0.9, vDay)) * 0.8);
          vec3 nightC = vec3(0.07, 0.09, 0.15) + vec3(0.04, 0.05, 0.08) * vTop;
          gl_FragColor = vec4(mix(nightC, dayC, vDay), 1.0);
          #include <colorspace_fragment>
        }`
    });
    this.cloudGroup = new THREE.Group();
    this.scene.add(this.cloudGroup);
    this.clouds = [];
    this.cloudMeshes = geos.map((g) => { const m = new THREE.InstancedMesh(g, mat, Math.ceil(N / 3)); m.frustumCulled = false; this.cloudGroup.add(m); return m; });
    this.cloudMat = mat;
    const shadowMat = new THREE.MeshBasicMaterial({ map: this.tex.blob, color: 0x00050f, transparent: true, opacity: 0.28, depthWrite: false });
    this.cloudShadow = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), shadowMat, N);
    this.cloudShadow.frustumCulled = false; this.cloudShadow.renderOrder = 1;
    this.cloudGroup.add(this.cloudShadow);
    for (let i = 0; i < N; i++) {
      // more clouds in the tropics and mid-latitudes, few at the poles
      const lat = (Math.random() * 2 - 1) * 62 + (Math.random() - 0.5) * 6, lon = Math.random() * 360 - 180;
      const n = llToVec(lat, lon);
      const fwd = new THREE.Vector3(0, 1, 0).projectOnPlane(n).normalize().applyAxisAngle(n, Math.random() * Math.PI * 2);
      const scale = 0.009 + Math.random() * 0.014;
      const alt = 0.03 + Math.random() * 0.012;
      const mesh = this.cloudMeshes[i % 3], idx = Math.floor(i / 3);
      if (idx >= mesh.count) continue;
      placeMatrix(tmpM, tmpV.copy(n).multiplyScalar(1 + alt), fwd, n, scale);
      mesh.setMatrixAt(idx, tmpM);
      this.clouds.push({ n, fwd, scale, alt });
    }
    this.cloudMeshes.forEach((m) => { m.instanceMatrix.needsUpdate = true; });
  }

  // lanes: densify each polyline along great circles, round the corners, keep cumulative lengths
  buildShips() {
    this.lanes = this.world.lanes.map((ln) => {
      const raw = ln.pts.map(([la, lo]) => llToVec(la, lo));
      let pts = [];
      for (let i = 0; i + 1 < raw.length; i++) {
        const a = raw[i], b = raw[i + 1], w = Math.acos(THREE.MathUtils.clamp(a.dot(b), -1, 1));
        const n = Math.max(1, Math.ceil(w / 0.006));
        for (let k = 0; k < n; k++) pts.push(slerp(a, b, k / n, new THREE.Vector3()));
      }
      pts.push(raw[raw.length - 1].clone());
      for (let it = 0; it < 2; it++) { // Chaikin smoothing on the sphere
        const out = [pts[0]];
        for (let i = 0; i + 1 < pts.length; i++) {
          out.push(pts[i].clone().lerp(pts[i + 1], 0.25).normalize(), pts[i].clone().lerp(pts[i + 1], 0.75).normalize());
        }
        out.push(pts[pts.length - 1]);
        pts = out;
      }
      const cum = [0];
      for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
      return { from: ln.from, to: ln.to, pts, cum, len: cum[cum.length - 1] };
    });
    const total = this.lanes.reduce((s, l) => s + l.len, 0);
    const want = this.mobile ? 70 : 100;
    this.ships = [];
    this.lanes.forEach((ln, li) => {
      const n = Math.max(1, Math.round((ln.len / total) * want));
      for (let k = 0; k < n; k++) {
        this.ships.push({ lane: li, s: Math.random() * ln.len, dir: Math.random() < 0.5 ? 1 : -1, speed: 0.0028 + Math.random() * 0.0016, cruise: Math.random() < 0.18, i: 0, pos: new THREE.Vector3(), fwd: new THREE.Vector3() });
      }
    });
    const nCruise = this.ships.filter((s) => s.cruise).length;
    const shipMat = new THREE.MeshLambertMaterial({ vertexColors: true });
    this.cargoMesh = new THREE.InstancedMesh(makeCargoShipGeometry(), shipMat, this.ships.length - nCruise);
    this.cruiseMesh = new THREE.InstancedMesh(makeCruiseShipGeometry(), shipMat, Math.max(1, nCruise));
    const wakeMat = new THREE.MeshBasicMaterial({ map: this.tex.wake, transparent: true, depthWrite: false, opacity: 0.85, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    const wakeGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2).translate(0, 0, -0.5); // from the stern backwards
    this.wakeMesh = new THREE.InstancedMesh(wakeGeo, wakeMat, this.ships.length);
    [this.cargoMesh, this.cruiseMesh, this.wakeMesh].forEach((m) => { m.frustumCulled = false; this.scene.add(m); });
    this.wakeMesh.renderOrder = 1;
  }

  shipAt(sh) {
    const ln = this.lanes[sh.lane], cum = ln.cum;
    let i = Math.min(sh.i, cum.length - 2);
    while (i > 0 && cum[i] > sh.s) i--;
    while (i < cum.length - 2 && cum[i + 1] < sh.s) i++;
    sh.i = i;
    const t = (sh.s - cum[i]) / Math.max(1e-9, cum[i + 1] - cum[i]);
    sh.pos.copy(ln.pts[i]).lerp(ln.pts[i + 1], t).normalize();
    sh.fwd.copy(ln.pts[i + 1]).sub(ln.pts[i]).multiplyScalar(sh.dir).projectOnPlane(sh.pos).normalize();
  }

  buildAirliners() {
    const big = this.world.cities.filter((c) => c[3] >= 3000000 || c[5]).slice(0, 90);
    this.airports = big;
    const N = this.mobile ? 28 : 40;
    this.jets = [];
    for (let i = 0; i < N; i++) { const j = { a: new THREE.Vector3(), b: new THREE.Vector3(), t: Math.random(), pos: new THREE.Vector3(), fwd: new THREE.Vector3(), phase: Math.random() * 10 }; this.newRoute(j); this.jets.push(j); }
    this.jetMesh = new THREE.InstancedMesh(makeAirlinerGeometry(), new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }), N);
    this.jetMesh.frustumCulled = false; this.scene.add(this.jetMesh);
    // contrails: one ribbon per jet, rebuilt each frame along the jet's own great circle
    this.trailSeg = 22;
    const S = this.trailSeg, pos = new Float32Array(N * S * 2 * 3), fade = new Float32Array(N * S * 2), idx = [];
    for (let j = 0; j < N; j++) for (let k = 0; k < S; k++) {
      const v = (j * S + k) * 2;
      fade[v] = fade[v + 1] = 1 - k / (S - 1);
      if (k < S - 1) idx.push(v, v + 1, v + 2, v + 1, v + 3, v + 2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('fade', new THREE.BufferAttribute(fade, 1));
    g.setIndex(idx);
    this.trailGeo = g;
    this.trails = new THREE.Mesh(g, new THREE.ShaderMaterial({
      uniforms: { sunDir: { value: new THREE.Vector3(1, 0, 0) } },
      vertexShader: /* glsl */`attribute float fade; uniform vec3 sunDir; varying float vA;
        void main() { vec3 c = normalize(position); vA = fade * (0.2 + 0.8 * smoothstep(-0.2, 0.2, dot(c, sunDir)));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */`varying float vA; void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, vA * 0.5); }`,
      transparent: true, depthWrite: false, side: THREE.DoubleSide
    }));
    this.trails.frustumCulled = false; this.scene.add(this.trails);
    // blinking navigation lights (visible at night): white strobe, red / green wing tips
    const L = N * 3, lp = new Float32Array(L * 3), lc = new Float32Array(L * 3), lph = new Float32Array(L);
    for (let j = 0; j < N; j++) {
      [[1, 1, 1], [1, 0.2, 0.25], [0.25, 1, 0.45]].forEach((col, k) => { lc.set(col, (j * 3 + k) * 3); lph[j * 3 + k] = k === 0 ? Math.random() : 0.5; });
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(lp, 3).setUsage(THREE.DynamicDrawUsage));
    lg.setAttribute('color', new THREE.BufferAttribute(lc, 3));
    lg.setAttribute('phase', new THREE.BufferAttribute(lph, 1));
    this.navGeo = lg;
    this.navLights = new THREE.Points(lg, new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, sunDir: { value: new THREE.Vector3(1, 0, 0) }, px: { value: this.dpr }, map: { value: this.tex.glint } },
      vertexShader: /* glsl */`attribute vec3 color; attribute float phase; uniform float time, px; uniform vec3 sunDir; varying vec3 vC; varying float vA;
        void main() { vec3 c = normalize(position); float night = 1.0 - smoothstep(-0.15, 0.1, dot(c, sunDir));
          float blink = phase < 0.45 || phase > 0.55 ? step(0.88, fract(time * 0.9 + phase)) : 0.55 + 0.45 * step(0.5, fract(time * 0.5));
          vC = color; vA = night * blink;
          vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = clamp(0.0012 * px / -mv.z, 1.5, 12.0); }`,
      fragmentShader: /* glsl */`uniform sampler2D map; varying vec3 vC; varying float vA; void main() { vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vC, t.a * vA); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    }));
    this.navLights.frustumCulled = false; this.scene.add(this.navLights);
  }

  newRoute(j) {
    const A = this.airports;
    const from = j.toCity || A[Math.floor(Math.random() * A.length)];
    let to;
    for (let k = 0; k < 20; k++) {
      to = A[Math.floor(Math.random() * A.length)];
      const ang = llToVec(from[1], from[2]).angleTo(llToVec(to[1], to[2]));
      if (to !== from && ang > 0.35 && ang < 2.4) break;
    }
    j.fromCity = from; j.toCity = to;
    llToVec(from[1], from[2], 1, j.a); llToVec(to[1], to[2], 1, j.b);
    j.w = j.a.angleTo(j.b);
    j.t = j.t > 0.99 ? 0 : j.t;
  }

  // Glowing dots on big cities: each switches on at its own moment at dusk (shader), and twinkles a little.
  buildCityGlows() {
    const cs = this.world.cities.filter((c) => c[3] >= 900000);
    const p = new Float32Array(cs.length * 3), s = new Float32Array(cs.length), r = new Float32Array(cs.length);
    cs.forEach((c, i) => { llToVec(c[1], c[2], 1.0006, tmpV); p.set([tmpV.x, tmpV.y, tmpV.z], i * 3); s[i] = Math.min(1, Math.log10(c[3] / 900000) / 1.4 + 0.25); r[i] = Math.random(); });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    g.setAttribute('size', new THREE.BufferAttribute(s, 1));
    g.setAttribute('rnd', new THREE.BufferAttribute(r, 1));
    this.cityGlow = new THREE.Points(g, new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, sunDir: { value: new THREE.Vector3(1, 0, 0) }, px: { value: this.dpr }, map: { value: this.tex.glint } },
      vertexShader: /* glsl */`attribute float size, rnd; uniform float time, px; uniform vec3 sunDir; varying float vA;
        void main() { vec3 c = normalize(position); float d = dot(c, sunDir);
          float on = 1.0 - smoothstep(-0.2 + rnd * 0.18, -0.02 + rnd * 0.18, d);
          vA = on * (0.75 + 0.25 * sin(time * (1.5 + rnd * 2.0) + rnd * 30.0));
          vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(size * 0.0035 * px / -mv.z, 1.0, 36.0); }`,
      fragmentShader: /* glsl */`uniform sampler2D map; varying float vA; void main() { vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vec3(1.0, 0.78, 0.45), t.a * vA * 0.8); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    }));
    this.cityGlow.frustumCulled = false;
    this.scene.add(this.cityGlow);
  }

  /* ---------------- public controls ---------------- */
  start() { this.flying = true; }
  // Switch between free browsing (always daytime) and the flight with the day / night cycle.
  setMode(m) {
    if (m === this.mode) return;
    this.stopAuto(false);
    this.mode = m;
    this.panV.set(0, 0);
    this.f = northOf(this.p);
    if (m === 'fly') {
      this.alt = 0.022; this.bank = 0; this.pitch = 0;
      this.setLocalHour(10); this.timeFlow = true;
      this.zoomT = Math.min(this.zoomT, 0.3);
    } else {
      this.timeFlow = false;
      this.zoomT = Math.max(this.zoomT, 0.3);
    }
  }
  // explore: drag the globe by (dx, dy) screen pixels, the ground follows the finger
  pan(dx, dy, dtMs) {
    if (this.mode !== 'explore' || !this.camera) return;
    this.stopAuto(true);
    const H = this.el.clientHeight || 1;
    const a = (this.camH || 0.1) * 2 * Math.tan((this.camera.fov * D2R) / 2) / H;
    const ae = -dx * a, an = dy * a;
    this.nudge(ae, an);
    const s = Math.max(0.008, (dtMs || 16) / 1000);
    this.panV.set(this.panV.x * 0.4 + (ae / s) * 0.6, this.panV.y * 0.4 + (an / s) * 0.6);
  }
  // land or sea, from the country index map (0 = sea)
  isLand(lat, lon) {
    const x = Math.min(this.idW - 1, Math.floor(((lon + 180) / 360) * this.idW)), y = Math.min(this.idH - 1, Math.floor(((90 - lat) / 180) * this.idH));
    return this.idGrid[y * this.idW + x] > 0;
  }
  setLayer(name, on) {
    if (name === 'famous') { this.showFamous = on; return Promise.resolve(); } // the 3D landmarks
    return this.mapLayers.set(name, on);
  }
  setDragging(on) { this.dragging = on; if (on) this.panV.set(0, 0); }
  // move the point we look at by (east, north) radians
  nudge(ae, an) {
    const north = northOf(this.p, _d), east = _e.crossVectors(north, this.p);
    const dir = _a.copy(east).multiplyScalar(ae).addScaledVector(north, an);
    const ang = dir.length();
    if (ang < 1e-9) return;
    this.p.applyAxisAngle(dir.crossVectors(this.p, dir).normalize(), ang).normalize();
    const [la, lo] = vecToLL(this.p);
    if (Math.abs(la) > 78) llToVec(Math.sign(la) * 78, lo, 1, this.p);
    northOf(this.p, this.f);
  }
  zoomBy(d) { this.zoomT = THREE.MathUtils.clamp(this.zoomT + d, 0, 1); }
  setZoom(z) { this.zoomT = THREE.MathUtils.clamp(z, 0, 1); }
  planeLL() { return vecToLL(this.p); }
  localHour() { const lon = this.planeLL()[1]; return (((12 + (lon - this.sunLon) / 15) % 24) + 24) % 24; }
  setLocalHour(h) { const lon = this.p ? this.planeLL()[1] : 105; this.sunLon = lon - (h - 12) * 15; }
  setTimeFlow(on) { this.timeFlow = on; }
  flyTo(place) { this.panV.set(0, 0); this.auto = { target: llToVec(place.lat, place.lon), place, wander: false, arrived: false, v: 0 }; this.cb.onAuto?.(this.auto); }
  wander() {
    const here = this.p;
    const far = PLACES.filter((pl) => llToVec(pl.lat, pl.lon).angleTo(here) > 0.25);
    const place = far[Math.floor(Math.random() * far.length)];
    this.auto = { target: llToVec(place.lat, place.lon), place, wander: true, arrived: false, v: 0 };
    this.cb.onAuto?.(this.auto);
  }
  stopAuto(byUser) { if (this.auto) { this.auto = null; this.cb.onAuto?.(null, byUser); } }

  /* ---------------- per frame ---------------- */
  frame() {
    if (this.disposed) return;
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.time += dt;
    this.zoom += (this.zoomT - this.zoom) * Math.min(1, dt * 3.2);
    const z = this.zoom;

    // time of day: the sun drifts west (10 minutes per day)
    const explore = this.mode === 'explore';
    if (this.timeFlow && !explore) this.sunLon -= dt * 0.6;
    let sunDir = llToVec(this.sunDecl, this.sunLon);
    if (explore) {
      // always daytime: the sun stands high on the viewer's left, so fronts are lit and the relief still reads
      const north = northOf(this.p, _d), east = _e.crossVectors(north, this.p), k = 1 - smooth(0.3, 0.9, z) * 0.75;
      const want = new THREE.Vector3().copy(this.p).addScaledVector(east, -0.55 * k).addScaledVector(north, -0.12 * k).normalize();
      this.exSun = this.exSun ? this.exSun.lerp(want, Math.min(1, dt * 3)).normalize() : want;
      sunDir = this.exSun.clone();
    } else this.exSun = null;
    this.allDay += ((explore ? 1 : 0) - this.allDay) * Math.min(1, dt * 2.5);
    this.globeU.allDay.value = this.allDay;
    this.globeU.sunDir.value.copy(sunDir); this.globeU.time.value = this.time;
    this.atmo.material.uniforms.sunDir.value.copy(sunDir);
    this.cloudMat.uniforms.sunDir.value.copy(sunDir);
    this.trails.material.uniforms.sunDir.value.copy(sunDir);
    this.navLights.material.uniforms.sunDir.value.copy(sunDir); this.navLights.material.uniforms.time.value = this.time;
    this.cityGlow.material.uniforms.sunDir.value.copy(sunDir); this.cityGlow.material.uniforms.time.value = this.time;
    this.stars.material.uniforms.time.value = this.time;
    this.sun.position.copy(sunDir).multiplyScalar(10);
    const dayHere = smooth(-0.15, 0.3, this.p.dot(sunDir));
    this.sun.intensity = 0.25 + 2.5 * dayHere;
    this.hemi.intensity = 0.25 + 0.55 * dayHere;
    this.globeU.borderAmt.value = smooth(0.25, 0.6, z);

    if (explore) this.explore(dt, z); else this.fly(dt, z);
    this.plane.visible = this.planeShadow.visible = this.beacon.visible = !explore;
    this.updateShips(dt, z);
    this.updateJets(dt, z);
    this.updateClouds(dt, sunDir);
    this.updateLandmarks(dt, z, explore ? 1 : dayHere);
    if (explore) this.updateCameraExplore(dt, z); else this.updateCamera(dt, z);
    this.cloudGroup.visible = !explore || this.camH > 0.075; // never sit inside the cloud layer
    this.scan(dt);
    this.detailT -= dt;
    if (this.detailT <= 0) { this.detailT = 0.6; const [la, lo] = this.planeLL(); this.detail.update(la, lo); }
    this.labels(dt, z);
    this.cb.audio?.update(explore ? 0.5 : (this.alt - ALT_MIN) / (ALT_MAX - ALT_MIN), explore ? 0.25 : this.speedN || 0.5, z);
    this.tickT -= dt;
    if (this.tickT <= 0) { this.tickT = 0.5; this.cb.onTick?.({ hour: this.localHour(), zoom: z }); }
    this.mapLayers.update(explore, z, this.camH || 0.2, this.el.clientWidth, this.el.clientHeight);
    this.detail.flush();
    this.renderer.render(this.scene, this.camera);
  }

  fly(dt, z) {
    const k = this.keys;
    let turn = this.input.turn, climb = this.input.climb;
    if (k.has('arrowleft') || k.has('a')) turn = -1;
    if (k.has('arrowright') || k.has('d')) turn = 1;
    if (k.has('arrowup') || k.has('w')) climb = 1;
    if (k.has('arrowdown') || k.has('s')) climb = -1;
    if (Math.abs(turn) > 0.05 || Math.abs(climb) > 0.05) this.stopAuto(true);

    if (this.auto) {
      const T = this.auto.target, d = tmpV.copy(T).projectOnPlane(this.p);
      const ang = this.p.angleTo(T);
      if (!this.auto.arrived && ang < 0.02) {
        this.auto.arrived = true;
        this.cb.onArrive?.(this.auto.place);
        if (this.auto.wander) { const a = this.auto; setTimeout(() => { if (this.auto === a) this.wander(); }, 9000); }
      }
      if (this.auto.arrived) turn = 0.38; // circle gently over the place
      else if (d.lengthSq() > 1e-10) {
        d.normalize();
        const side = tmpV2.crossVectors(this.f, d).dot(this.p);
        const diff = Math.atan2(side, this.f.dot(d));
        turn = THREE.MathUtils.clamp(-diff * 1.6, -1, 1);
      }
      climb = THREE.MathUtils.clamp((0.024 - this.alt) * 60, -1, 1);
    }

    // speed grows with zoom so the world still moves when seen from orbit
    const speed = this.flying ? 0.032 * (1 + z * z * 5) : 0;
    this.speedN = THREE.MathUtils.clamp(speed / 0.2, 0, 1);
    const yaw = turn * 0.75 * (1 + z * 1.2);
    this.f.applyAxisAngle(this.p, -yaw * dt);
    const axis = tmpV.crossVectors(this.p, this.f).normalize();
    tmpQ.setFromAxisAngle(axis, speed * dt);
    this.p.applyQuaternion(tmpQ).normalize();
    this.f.applyQuaternion(tmpQ).projectOnPlane(this.p).normalize();
    this.alt = THREE.MathUtils.clamp(this.alt + climb * 0.012 * dt, ALT_MIN, ALT_MAX);

    // bank into turns and pitch with climbs, settle back level when the stick is released
    this.bank += (turn * 0.6 - this.bank) * Math.min(1, dt * 3);
    this.pitch += (climb * 0.25 - this.pitch) * Math.min(1, dt * 3);
    const pos = tmpV2.copy(this.p).multiplyScalar(1 + this.alt);
    placeMatrix(this.plane.matrix, pos, this.f, this.p, this.planeScale);
    this.plane.matrix.multiply(tmpM.makeRotationZ(this.bank)).multiply(tmpM.makeRotationX(-this.pitch));
    this.plane.matrixAutoUpdate = false; this.plane.matrixWorldNeedsUpdate = true;
    this.prop.rotation.z += dt * 40;
    // its shadow on the ground, softer and wider the higher we fly
    const sh = 0.004 + this.alt * 0.25;
    placeMatrix(this.planeShadow.matrix, tmpV.copy(this.p).multiplyScalar(1.0004), this.p, this.f, 1);
    this.planeShadow.matrix.scale(tmpV.set(sh * 1.4, sh, 1));
    this.planeShadow.matrixAutoUpdate = false; this.planeShadow.matrixWorldNeedsUpdate = true;
    this.planeShadow.material.opacity = 0.42 * (1 - (this.alt - ALT_MIN) / (ALT_MAX - ALT_MIN) * 0.6) * smooth(-0.1, 0.3, this.p.dot(this.globeU.sunDir.value)) * (1 - smooth(0.4, 0.8, z));
    this.beacon.position.copy(pos);
    const bs = 0.02 + z * 0.12;
    this.beacon.scale.set(bs, bs, 1);
    this.beacon.material.opacity = smooth(0.35, 0.85, z) * (0.7 + 0.3 * Math.sin(this.time * 3));
  }

  // Explore: drift after a drag, arrow keys, and glide to a chosen place (zooming out for long trips).
  explore(dt, z) {
    const k = this.keys, h = exHeight(z);
    let ke = 0, kn = 0;
    if (k.has('arrowleft') || k.has('a')) ke = -1;
    if (k.has('arrowright') || k.has('d')) ke = 1;
    if (k.has('arrowup') || k.has('w')) kn = 1;
    if (k.has('arrowdown') || k.has('s')) kn = -1;
    if (ke || kn) { this.stopAuto(true); this.panV.set(ke * h * 1.4, kn * h * 1.4); }
    else if (!this.dragging) this.panV.multiplyScalar(Math.exp(-dt * 3.5));
    if (!this.dragging && this.panV.lengthSq() > 1e-10) this.nudge(this.panV.x * dt, this.panV.y * dt);
    const A = this.auto;
    if (A && !A.arrived) {
      const ang = this.p.angleTo(A.target);
      if (ang < 0.003) {
        A.arrived = true;
        if (A.place.zoom != null) this.zoomT = A.place.zoom;
        this.cb.onArrive?.(A.place);
        if (A.wander) setTimeout(() => { if (this.auto === A) this.wander(); }, 9000);
      } else {
        A.v = Math.min(A.v + dt * 1.4, 1.1);
        const step = Math.min(ang, Math.min(A.v, ang * 1.6 + 0.02) * dt);
        this.p.applyAxisAngle(_a.crossVectors(this.p, A.target).normalize(), step).normalize();
        northOf(this.p, this.f);
        // a hop: up for long trips, back down near the end (to the place's own zoom if it has one)
        const endZ = A.place.zoom ?? 0.36;
        this.zoomT = THREE.MathUtils.clamp(endZ + ang * 0.28, endZ, Math.max(0.82, endZ));
      }
    }
  }

  updateCameraExplore(dt, z) {
    const p = this.p, n = this.f;
    const h = this.camH = exHeight(z);
    // close up the camera tilts to see buildings and mountains from the side; far away it looks straight down
    // (history and science layers stay in bird view: no low, sideways camera)
    const tilt = (this.hist || this.sci ? 0.1 : 0.95) * (1 - smooth(0.3, 0.82, z));
    const camPos = new THREE.Vector3().copy(p).addScaledVector(p, h * Math.cos(tilt)).addScaledVector(n, -h * Math.sin(tilt));
    const look = new THREE.Vector3().copy(p);
    const up = new THREE.Vector3().copy(n).multiplyScalar(Math.cos(tilt)).addScaledVector(p, Math.sin(tilt)).normalize();
    if (!this.camInit) { this.camPos = camPos.clone(); this.camLook = look.clone(); this.camUp = up.clone(); this.camInit = true; }
    const k = Math.min(1, dt * 9);
    this.camPos.lerp(camPos, k); this.camLook.lerp(look, k); this.camUp.lerp(up, k).normalize();
    this.camera.position.copy(this.camPos);
    this.camera.up.copy(this.camUp);
    this.camera.lookAt(this.camLook);
    this.camera.fov = 45;
    this.camera.updateProjectionMatrix();
    const pxScale = this.renderer.domElement.height / (2 * Math.tan((this.camera.fov * D2R) / 2));
    this.navLights.material.uniforms.px.value = pxScale;
    this.cityGlow.material.uniforms.px.value = pxScale;
  }

  updateCamera(dt, z) {
    const p = this.p, f = this.f;
    const planePos = tmpV.copy(p).multiplyScalar(1 + this.alt);
    // near: behind and above the plane looking ahead; far: high in orbit looking at the Earth's centre
    const e = Math.pow(z, 1.5);
    const height = THREE.MathUtils.lerp(0.07, 2.6, e);
    const back = THREE.MathUtils.lerp(0.075, 0.0, smooth(0.0, 0.8, z));
    const camPos = new THREE.Vector3().copy(planePos).addScaledVector(p, height).addScaledVector(f, -back);
    const look = new THREE.Vector3().copy(planePos).addScaledVector(f, THREE.MathUtils.lerp(0.035, 0, z));
    look.lerp(new THREE.Vector3(0, 0, 0), smooth(0.35, 1.0, z));
    const up = new THREE.Vector3().copy(p).lerp(f, smooth(0.15, 0.85, z)).normalize();
    if (!this.camInit) { this.camPos = camPos.clone(); this.camLook = look.clone(); this.camUp = up.clone(); this.camInit = true; }
    const k = Math.min(1, dt * 4);
    this.camPos.lerp(camPos, k); this.camLook.lerp(look, k); this.camUp.lerp(up, k).normalize();
    this.camera.position.copy(this.camPos);
    this.camera.up.copy(this.camUp);
    this.camera.lookAt(this.camLook);
    this.camera.fov = THREE.MathUtils.lerp(56, 40, z);
    this.camera.updateProjectionMatrix();
    const pxScale = this.renderer.domElement.height / (2 * Math.tan((this.camera.fov * D2R) / 2));
    this.navLights.material.uniforms.px.value = pxScale;
    this.cityGlow.material.uniforms.px.value = pxScale;
  }

  updateShips(dt, z) {
    const visible = z < 0.62 && this.mode === 'fly'; // ships and airliners only in the flight
    this.cargoMesh.visible = this.cruiseMesh.visible = this.wakeMesh.visible = visible;
    let ic = 0, iu = 0;
    this.ships.forEach((sh, n) => {
      const ln = this.lanes[sh.lane];
      sh.s += sh.dir * sh.speed * dt;
      if (sh.s > ln.len) { sh.s = ln.len; sh.dir = -1; }
      if (sh.s < 0) { sh.s = 0; sh.dir = 1; }
      if (!visible) return;
      this.shipAt(sh);
      const pos = tmpV.copy(sh.pos).multiplyScalar(1.0007);
      placeMatrix(tmpM, pos, sh.fwd, sh.pos, 0.0034);
      if (sh.cruise) this.cruiseMesh.setMatrixAt(iu++, tmpM); else this.cargoMesh.setMatrixAt(ic++, tmpM);
      // wake from the stern
      const stern = tmpV.copy(sh.pos).addScaledVector(sh.fwd, -0.0036).normalize().multiplyScalar(1.0003);
      placeMatrix(tmpM, stern, sh.fwd, sh.pos, 1);
      tmpM.scale(tmpS.set(0.011, 1, 0.038));
      this.wakeMesh.setMatrixAt(n, tmpM);
    });
    if (visible) { this.cargoMesh.instanceMatrix.needsUpdate = this.cruiseMesh.instanceMatrix.needsUpdate = this.wakeMesh.instanceMatrix.needsUpdate = true; }
  }

  updateJets(dt, z) {
    const visible = z < 0.7 && this.mode === 'fly';
    this.jetMesh.visible = this.trails.visible = this.navLights.visible = visible;
    const pos = this.trailGeo.attributes.position.array, lp = this.navGeo.attributes.position.array, S = this.trailSeg;
    const a = new THREE.Vector3(), b = new THREE.Vector3(), side = new THREE.Vector3();
    this.jets.forEach((j, n) => {
      j.t += (0.045 / j.w) * dt;
      if (j.t >= 1) { j.t = 1; this.newRoute(j); j.t = 0; }
      if (!visible) return;
      const altAt = (t) => 0.034 * Math.pow(Math.sin(Math.PI * THREE.MathUtils.clamp(t, 0, 1)), 0.35) + 0.002;
      slerp(j.a, j.b, j.t, a); slerp(j.a, j.b, Math.min(1, j.t + 0.002), b);
      j.fwd.copy(b).sub(a).projectOnPlane(a).normalize();
      j.pos.copy(a).multiplyScalar(1 + altAt(j.t));
      placeMatrix(tmpM, j.pos, j.fwd, a, 0.0023);
      this.jetMesh.setMatrixAt(n, tmpM);
      // contrail behind it
      for (let k = 0; k < S; k++) {
        const t = j.t - (k / (S - 1)) * (0.07 / j.w);
        slerp(j.a, j.b, Math.max(0, t), b);
        b.multiplyScalar(1 + altAt(Math.max(0, t)));
        side.crossVectors(j.fwd, a).normalize().multiplyScalar(0.0006 + k * 0.00009);
        const v = (n * S + k) * 6;
        pos[v] = b.x + side.x; pos[v + 1] = b.y + side.y; pos[v + 2] = b.z + side.z;
        pos[v + 3] = b.x - side.x; pos[v + 4] = b.y - side.y; pos[v + 5] = b.z - side.z;
      }
      // lights: belly strobe, left wing red, right wing green
      side.crossVectors(a, j.fwd).normalize().multiplyScalar(0.0034);
      lp.set([j.pos.x, j.pos.y, j.pos.z], n * 9);
      lp.set([j.pos.x - side.x, j.pos.y - side.y, j.pos.z - side.z], n * 9 + 3);
      lp.set([j.pos.x + side.x, j.pos.y + side.y, j.pos.z + side.z], n * 9 + 6);
    });
    if (visible) {
      this.jetMesh.instanceMatrix.needsUpdate = true;
      this.trailGeo.attributes.position.needsUpdate = true;
      this.navGeo.attributes.position.needsUpdate = true;
    }
  }

  updateClouds(dt, sunDir) {
    this.cloudGroup.rotation.y += dt * 0.0025; // the weather drifts east
    const inv = tmpQ.copy(this.cloudGroup.quaternion).invert();
    const sunLocal = tmpS.copy(sunDir).applyQuaternion(inv);
    this.clouds.forEach((c, i) => {
      // shadow: below the cloud, pushed away from the sun
      const st = tmpV.copy(sunLocal).projectOnPlane(c.n);
      const at = tmpV2.copy(c.n).addScaledVector(st, -c.alt * 1.1).normalize().multiplyScalar(1.0005);
      placeMatrix(tmpM, at, c.fwd, c.n, 1);
      tmpM.scale(new THREE.Vector3(c.scale * 3.2, 1, c.scale * 2.6));
      this.cloudShadow.setMatrixAt(i, tmpM);
    });
    this.cloudShadow.instanceMatrix.needsUpdate = true;
    this.cloudShadow.material.opacity = 0.28 * smooth(-0.1, 0.3, this.p.dot(sunDir));
  }

  // Famous buildings: they pop up when the plane is over their country (or close by) and sink away after.
  updateLandmarks(dt, z, dayHere) {
    const iso = this.countryById?.get(this.currentId)?.iso2, explore = this.mode === 'explore';
    nightMats.forEach((m) => { m.emissiveIntensity = (1 - dayHere) * 1.3; });
    // explore: every landmark in view; close up they shrink a little so neighbours do not pile up
    const viewR = (this.camH || 0.17) * 1.5 + 0.04;
    const k = explore ? THREE.MathUtils.clamp((this.camH || 0.17) / 0.17, 0.45, 1) : 1;
    this.lmK = this.lmK == null ? k : this.lmK + (k - this.lmK) * Math.min(1, dt * 4);
    for (const l of this.lms) {
      const ang = l.n.angleTo(this.p) - l.reach;
      l.target = (explore ? this.showFamous && z < 0.56 && ang < viewR : z < 0.5 && (l.iso === iso || ang < 0.09)) ? 1 : 0;
      if (l.target && !l.group) {
        l.group = l.path ? buildPathLandmark(l) : l.area ? buildAreaLandmark(l, (la, lo) => this.isLand(la, lo)) : buildLandmark(l.id);
        l.group.matrixAutoUpdate = false; this.scene.add(l.group);
      }
      if (!l.group) continue;
      l.show += (l.target - l.show) * Math.min(1, dt * (l.target ? 1.6 : 3));
      const vis = l.show > 0.01;
      l.group.visible = vis;
      if (!vis) continue;
      const t = l.show, back = 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2); // ease-out with a little overshoot
      if (l.path || l.area) { l.group.userData.rise.value = Math.max(0.001, back); continue; } // built in place, it rises out of the ground
      placeMatrix(l.group.matrix, tmpV.copy(l.n).multiplyScalar(1.0002), l.north.clone().negate(), l.n, l.s * 1.6 * this.lmK * Math.max(0.001, back));
      l.group.matrixWorldNeedsUpdate = true;
      l.group.traverse((o) => {
        if (o.userData.spin) o.rotation.z += dt * 1.5;
        if (o.userData.bob) o.position.y = o.userData.y0 + Math.sin(this.time * 0.8 + o.userData.bob) * 0.04;
      });
    }
  }

  // which country / city / sea is under the plane (4 times a second)
  scan(dt) {
    this.scanT -= dt;
    if (this.scanT > 0) return;
    this.scanT = 0.25;
    const [lat, lon] = this.planeLL();
    const x = Math.min(this.idW - 1, Math.floor((lon + 180) / 360 * this.idW)), y = Math.min(this.idH - 1, Math.floor((90 - lat) / 180 * this.idH));
    const id = this.idGrid[y * this.idW + x];
    if (id !== this.currentId) {
      this.currentId = id;
      this.fadeFrom = this.time;
      this.globeU.activeId.value = id;
      this.cb.onCountry?.(id ? this.countryById.get(id) : null, id ? null : oceanName(lat, lon));
    } else if (!id) {
      const oc = oceanName(lat, lon);
      if (oc.en !== this.lastOcean) { this.lastOcean = oc.en; this.cb.onCountry?.(null, oc); }
    }
    if (id) this.lastOcean = null;
    this.globeU.activeFade.value = id ? Math.min(1, (this.time - (this.fadeFrom || 0)) / 1.2) : 0;
    // nearest big city underneath (~150 km)
    let best = null, bd = 0.024;
    for (const c of this.world.cities) {
      if (Math.abs(c[1] - lat) > 2) continue;
      const d = llToVec(c[1], c[2], 1, tmpV).angleTo(this.p);
      if (d < bd) { bd = d; best = c; }
    }
    if (best !== this.currentCity) { this.currentCity = best; this.cb.onCity?.(best); }
  }

  // small labels on nearby ships and planes
  labels(dt, z) {
    const layer = this.cb.labelLayer;
    if (!layer) return;
    this.labelT -= dt;
    if (!this.labelEls) {
      this.labelEls = Array.from({ length: 3 }, () => { const d = document.createElement('div'); d.className = 'gf-tag'; layer.appendChild(d); return d; });
      this.lmEls = Array.from({ length: 8 }, () => { const d = document.createElement('div'); d.className = 'gf-tag gf-tag-lm'; layer.appendChild(d); return d; });
    }
    this.landmarkTags();
    this.cityLabels(dt, this.mode === 'explore');
    this.updateHistory(dt);
    this.updateSci(dt);
    if (this.labelT <= 0) {
      this.labelT = 0.3;
      const cand = [];
      if (z < 0.5 && this.mode === 'fly') {
        this.ships.forEach((sh) => { const d = sh.pos.angleTo(this.p); if (d < 0.07) cand.push({ d, kind: 'ship', o: sh }); });
        this.jets.forEach((j) => { const d = j.pos.angleTo(this.p); if (d < 0.09) cand.push({ d, kind: 'jet', o: j }); });
      }
      cand.sort((a, b) => a.d - b.d);
      this.labelPick = cand.slice(0, 3);
    }
    const w = this.el.clientWidth, h = this.el.clientHeight;
    this.labelEls.forEach((el, i) => {
      const c = this.labelPick?.[i];
      if (!c) { el.style.opacity = '0'; return; }
      const wp = c.kind === 'ship' ? tmpV.copy(c.o.pos).multiplyScalar(1.0007) : tmpV.copy(c.o.pos);
      const v = wp.clone().project(this.camera);
      const front = wp.clone().sub(this.camera.position).dot(this.camera.getWorldDirection(tmpV2)) > 0;
      if (!front || Math.abs(v.x) > 1.05 || Math.abs(v.y) > 1.05) { el.style.opacity = '0'; return; }
      let text;
      if (c.kind === 'ship') {
        const ln = this.lanes[c.o.lane];
        const [a, b] = c.o.dir > 0 ? [ln.from, ln.to] : [ln.to, ln.from];
        text = `${c.o.cruise ? '🛳️ Cruise ship' : '🚢 Cargo ship'} · ${a} → ${b}`;
      } else text = `✈️ Flight: ${c.o.fromCity[0]} → ${c.o.toCity[0]}`;
      if (el.textContent !== text) el.textContent = text;
      el.style.opacity = String(Math.max(0, 1 - c.d / 0.09) * 0.95 + 0.05);
      el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-50%, -150%)`;
    });
  }

  landmarkTags() {
    const w = this.el.clientWidth, h = this.el.clientHeight;
    // while a history period is shown its tags take the space; the landmark models stay
    const shown = this.lms.filter((l) => l.group && l.show > 0.6 && !(this.hist && this.mode === 'explore')).sort((a, b) => a.n.angleTo(this.p) - b.n.angleTo(this.p)).slice(0, this.mode === 'explore' ? this.lmEls.length : 4);
    const camDir = this.camera.getWorldDirection(new THREE.Vector3());
    this.lmEls.forEach((el, i) => {
      const l = shown[i];
      if (!l) { el.style.opacity = '0'; return; }
      const wp = l.n.clone().multiplyScalar(1 + l.s * 1.6 * (this.lmK || 1) * 0.85);
      const v = wp.clone().project(this.camera);
      const front = wp.clone().sub(this.camera.position).dot(camDir) > 0 && wp.clone().normalize().dot(this.camera.position.clone().normalize()) > 0.2;
      if (!front || Math.abs(v.x) > 1.05 || Math.abs(v.y) > 1.05) { el.style.opacity = '0'; return; }
      const text = `${l.e} ${l.en}`;
      if (el.textContent !== text) el.textContent = text;
      el.style.opacity = String(Math.min(1, (l.show - 0.6) * 2.5));
      el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-50%, -130%)`;
    });
  }

  cityLabels(dt, on) {
    const layer = this.cb.labelLayer;
    if (!layer) return;
    if (!this.cityEls) {
      this.cityEls = Array.from({ length: 18 }, () => {
        const d = document.createElement('div'); d.className = 'gf-city'; d.innerHTML = '<i></i><span></span>'; d.style.opacity = '0';
        d.addEventListener('click', () => { if (d.dataset.name) this.cb.onSay?.(d.dataset.name); });
        layer.appendChild(d); return d;
      });
      this.cityT = 0;
    }
    if (!on) { if (this.cityOn) { this.cityEls.forEach((e) => { e.style.opacity = '0'; e.style.pointerEvents = 'none'; }); this.cityOn = false; this.cityPick = []; } return; }
    this.cityOn = true;
    const w = this.el.clientWidth, h = this.el.clientHeight, cam = this.camera.position;
    const screen = (c) => {
      const v = llToVec(c[1], c[2], 1.0005, tmpV);
      if (tmpV2.copy(cam).sub(v).dot(v) < 0.002) return null; // on the far side of the globe
      v.project(this.camera);
      if (v.z > 1 || Math.abs(v.x) > 0.98 || Math.abs(v.y) > 0.96) return null;
      return [((v.x + 1) / 2) * w, ((1 - v.y) / 2) * h];
    };
    this.cityT -= dt;
    if (this.cityT <= 0) {
      this.cityT = 0.3;
      const placed = [], viewR = Math.min(1.5, (this.camH || 0.2) * 1.6 + 0.05);
      // keep clear of the landmark tags too
      [...this.lmEls, ...(this.hist?.items.map((it) => it.el) || [])].forEach((el) => { if (el.style.opacity !== '0') { const r = el.getBoundingClientRect(), o = this.el.getBoundingClientRect(); placed.push([r.left - o.left, r.top - o.top, r.right - o.left, r.bottom - o.top]); } });
      const pick = [];
      for (const c of this.citiesByPop) {
        if (pick.length >= this.cityEls.length) break;
        if (llToVec(c[1], c[2], 1, tmpS).angleTo(this.p) > viewR) continue;
        const sp = screen(c);
        if (!sp) continue;
        const bw = c[0].length * 7.4 + 22, r = [sp[0] - 8, sp[1] - 11, sp[0] - 8 + bw, sp[1] + 11];
        if (placed.some((q) => r[0] < q[2] + 4 && r[2] > q[0] - 4 && r[1] < q[3] + 2 && r[3] > q[1] - 2)) continue;
        placed.push(r); pick.push(c);
      }
      this.cityPick = pick;
    }
    this.cityEls.forEach((el, i) => {
      const c = this.cityPick?.[i], sp = c && screen(c);
      if (!sp) { el.style.opacity = '0'; el.style.pointerEvents = 'none'; return; }
      if (el.dataset.name !== c[0]) {
        el.dataset.name = c[0]; el.lastChild.textContent = c[0];
        el.className = `gf-city${c[5] ? ' cap' : ''}${c[3] > 8e6 ? ' big' : ''}`;
        el.title = `${c[0]} · click to listen`;
      }
      el.style.opacity = '1'; el.style.pointerEvents = 'auto';
      el.style.transform = `translate(${sp[0]}px, ${sp[1]}px) translate(-5px, -50%)`;
    });
  }

  /* ---------------- Vietnamese history layer ---------------- */
  // Show one period: a little flag on every battle / event, a tag with its name, year and leaders,
  // the period's march if it has one; then glide to frame the whole period.
  setHistory(era) {
    this.clearHistory();
    if (!era) return;
    const layer = this.cb.labelLayer, g = new THREE.Group();
    this.scene.add(g);
    this.histMats ||= {
      pole: new THREE.MeshStandardMaterial({ color: 0x6b5a48, roughness: 0.8 }),
      battle: new THREE.MeshStandardMaterial({ color: 0xd8302f, roughness: 0.6, side: THREE.DoubleSide, emissive: 0x5a0a0a }),
      event: new THREE.MeshStandardMaterial({ color: 0xf2c14e, roughness: 0.6, side: THREE.DoubleSide, emissive: 0x4a3200 }),
      legend: new THREE.MeshStandardMaterial({ color: 0xb48ae8, roughness: 0.6, side: THREE.DoubleSide, emissive: 0x2a1450 }),
      discovery: new THREE.MeshStandardMaterial({ color: 0x3fc8b0, roughness: 0.6, side: THREE.DoubleSide, emissive: 0x0a3a32 })
    };
    // science branches get a flag of their own colour, made the first time they are needed
    const matOf = (k) => this.histMats[k] ||= (BRANCH_COLOR[k] != null
      ? new THREE.MeshStandardMaterial({ color: BRANCH_COLOR[k], roughness: 0.6, side: THREE.DoubleSide, emissive: new THREE.Color(BRANCH_COLOR[k]).multiplyScalar(0.25) })
      : this.histMats.battle);
    this.histGeo ||= {
      pole: new THREE.CylinderGeometry(0.025, 0.035, 1, 6).translate(0, 0.5, 0),
      banner: new THREE.ShapeGeometry(new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(0.55, -0.16), new THREE.Vector2(0, -0.34)])),
      knob: new THREE.SphereGeometry(0.05, 8, 6)
    };
    const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const items = era.ev.map((e, i) => {
      const n = llToVec(e.lat, e.lon), north = new THREE.Vector3(0, 1, 0).projectOnPlane(n).normalize();
      const flag = new THREE.Group(); flag.matrixAutoUpdate = false;
      flag.add(new THREE.Mesh(this.histGeo.pole, this.histMats.pole));
      const knob = new THREE.Mesh(this.histGeo.knob, matOf(e.k)); knob.position.y = 1.02; flag.add(knob);
      const pivot = new THREE.Group(); pivot.position.y = 0.98; flag.add(pivot);
      pivot.add(new THREE.Mesh(this.histGeo.banner, matOf(e.k)));
      flag.traverse((o) => { o.frustumCulled = false; });
      g.add(flag);
      const el = document.createElement('div');
      el.className = `gf-hist k-${e.k}${BRANCH_COLOR[e.k] != null ? ' br' : ''}`;
      if (BRANCH_COLOR[e.k] != null) el.style.setProperty('--c', hex(BRANCH_COLOR[e.k]));
      el.innerHTML = `<b>${KIND_ICON[e.k] || '⚔️'} ${esc(e.n)}</b><small>${esc(e.y)}${e.vn ? ` · ${esc(e.vn)}` : ''}</small>`;
      el.style.opacity = '0';
      el.addEventListener('click', () => this.cb.onHistoryPick?.(i));
      layer?.appendChild(el);
      return { e, n, north, flag, pivot, el, show: 0, delay: i * 0.08 };
    });
    let route = null;
    if (era.route) { route = makeRoute(era.route.pts); g.add(route); }
    this.hist = { era, g, items, route, sel: -1, t: 0 };
    // frame the period: centre of its places, high enough to see the farthest one
    const c = items.reduce((v, it) => v.add(it.n), new THREE.Vector3()).normalize();
    // frame most of the places: one far-off event (Napoleon on Saint Helena) should not pull the camera to orbit
    const dists = items.map((it) => it.n.angleTo(c)).sort((x, y) => x - y);
    const far = Math.max(0.01, dists[Math.min(dists.length - 1, Math.floor(dists.length * 0.8))]);
    const [lat, lon] = vecToLL(c);
    const h = THREE.MathUtils.clamp(far * 1.9 + 0.03, 0.06, 1.2);
    const zoom = THREE.MathUtils.clamp(Math.log(h / EX_H0) / Math.log(EX_H1 / EX_H0), 0.18, 0.78);
    this.flyTo({ lat, lon, zoom, e: '📜', en: era.t, id: `era-${era.id}`, silent: true });
  }

  // Glide to a whole country, framed by its size on the country map (most of its land in view).
  focusCountry(iso) {
    // several entries can share a code (Australia and its small territories): take the most populous
    const c = this.world.countries.filter((k) => k.iso2 === iso).sort((x, y) => (y.pop || 0) - (x.pop || 0))[0];
    if (!c) return;
    const [lat, lon] = c.lab || [c.cap[1], c.cap[2]];
    const centre = llToVec(lat, lon), d = [], v = new THREE.Vector3();
    for (let y = 0; y < this.idH; y += 2) {
      const la = 90 - ((y + 0.5) / this.idH) * 180;
      for (let x = 0; x < this.idW; x += 2) if (this.idGrid[y * this.idW + x] === c.id) d.push(llToVec(la, ((x + 0.5) / this.idW) * 360 - 180, 1, v).angleTo(centre));
    }
    d.sort((a, b) => a - b);
    const far = d.length ? d[Math.floor(d.length * 0.85)] : 0.05; // far islands (Alaska, Hawaii) do not decide the zoom
    const h = THREE.MathUtils.clamp(far * 1.9 + 0.03, 0.05, 1.4);
    const zoom = THREE.MathUtils.clamp(Math.log(h / EX_H0) / Math.log(EX_H1 / EX_H0), 0.2, 0.8);
    this.flyTo({ lat, lon, zoom, e: '🗺️', en: c.name, id: `country-${iso}`, silent: true });
  }

  focusHistory(i) {
    const it = this.hist?.items[i];
    if (!it) return;
    this.hist.sel = i;
    this.flyTo({ lat: it.e.lat, lon: it.e.lon, zoom: 0.5, e: KIND_ICON[it.e.k], en: it.e.n, id: `ev-${i}`, silent: true });
  }

  clearHistory() {
    if (!this.hist) return;
    this.scene.remove(this.hist.g);
    this.hist.route?.geometry.dispose(); this.hist.route?.material.dispose();
    this.hist.items.forEach((it) => it.el.remove());
    this.hist = null;
  }

  updateHistory(dt) {
    const H = this.hist;
    if (!H) return;
    const on = this.mode === 'explore';
    H.g.visible = on;
    if (H.route) H.route.material.resolution.set(this.el.clientWidth, this.el.clientHeight);
    if (H.route) { H.route.material.dashSize = (this.camH || 0.2) * 0.03; H.route.material.gapSize = (this.camH || 0.2) * 0.02; }
    H.t += dt;
    const w = this.el.clientWidth, h = this.el.clientHeight, cam = this.camera.position;
    const k = THREE.MathUtils.clamp((this.camH || 0.17) / 0.17, 0.45, 1.6);
    const placed = [];
    // the selected one first, so its tag always wins the space
    const order = H.items.map((_, i) => i).sort((a, b) => (b === H.sel) - (a === H.sel));
    for (const i of order) {
      const it = H.items[i], sel = i === H.sel;
      it.show = Math.min(1, it.show + dt * (H.t > it.delay ? 2.2 : 0));
      const t = it.show, pop = t <= 0 ? 0 : 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
      const size = 0.006 * k * (sel ? 1.5 : 1) * Math.max(0.001, pop);
      placeMatrix(it.flag.matrix, tmpV.copy(it.n).multiplyScalar(1.0002), it.north.clone().negate(), it.n, size);
      it.flag.matrixWorldNeedsUpdate = true;
      it.pivot.rotation.y = Math.sin(H.t * 2.4 + i) * 0.35;
      // tag above the flag, hidden on the far side, when off screen or when it would cover another tag
      const wp = it.n.clone().multiplyScalar(1 + size * 1.1);
      let vis = on && t > 0.6 && tmpV2.copy(cam).sub(wp).dot(wp) > 0.002;
      let sx = 0, sy = 0;
      if (vis) {
        const v = wp.clone().project(this.camera);
        sx = ((v.x + 1) / 2) * w; sy = ((1 - v.y) / 2) * h;
        vis = v.z < 1 && Math.abs(v.x) < 1.02 && Math.abs(v.y) < 1.02;
        const bw = Math.max(it.e.n.length, 10) * 7 + 30, r = [sx - bw / 2, sy - 50, sx + bw / 2, sy - 6];
        if (vis && !sel && placed.some((q) => r[0] < q[2] && r[2] > q[0] && r[1] < q[3] && r[3] > q[1])) vis = false;
        if (vis) placed.push(r);
      }
      it.el.classList.toggle('sel', sel);
      it.el.style.opacity = vis ? '1' : '0';
      it.el.style.pointerEvents = vis ? 'auto' : 'none';
      if (vis) it.el.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, -112%)`;
    }
  }

  /* ---------------- science story ---------------- */
  // Every milestone is a flag; the ones up to the current year are shown (the newest in full, older ones
  // quieter), and an arc joins each milestone to the ones it was built on, so the spread of ideas can be seen.
  // nodes: { id, n, yl, who, lat, lon, k, pos } (pos: place on the time slider), links: [fromIndex, toIndex].
  setSci(nodes, links) {
    this.clearSci();
    const layer = this.cb.labelLayer, g = new THREE.Group();
    this.scene.add(g);
    this.histGeo ||= {
      pole: new THREE.CylinderGeometry(0.025, 0.035, 1, 6).translate(0, 0.5, 0),
      banner: new THREE.ShapeGeometry(new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(0.55, -0.16), new THREE.Vector2(0, -0.34)])),
      knob: new THREE.SphereGeometry(0.05, 8, 6)
    };
    this.sciPole ||= new THREE.MeshStandardMaterial({ color: 0x6b5a48, roughness: 0.8 });
    this.sciMats ||= {};
    const matOf = (k) => this.sciMats[k] ||= new THREE.MeshStandardMaterial({ color: BRANCH_COLOR[k], roughness: 0.6, side: THREE.DoubleSide, emissive: new THREE.Color(BRANCH_COLOR[k]).multiplyScalar(0.3) });
    const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    // milestones in the same town (Alexandria, Baghdad…) fan out a little so no flag hides another
    const seen = [];
    const items = nodes.map((e, i) => {
      let lat = e.lat, lon = e.lon;
      const same = seen.filter((s) => Math.abs(s[0] - e.lat) < 0.6 && Math.abs(s[1] - e.lon) < 0.6).length;
      seen.push([e.lat, e.lon]);
      if (same) { const a = same * 2.4, r = 0.45 * Math.ceil(same / 3); lat += Math.sin(a) * r; lon += Math.cos(a) * r / Math.max(0.3, Math.cos(e.lat * D2R)); }
      const n = llToVec(lat, lon), north = new THREE.Vector3(0, 1, 0).projectOnPlane(n).normalize();
      const flag = new THREE.Group(); flag.matrixAutoUpdate = false;
      flag.add(new THREE.Mesh(this.histGeo.pole, this.sciPole));
      const knob = new THREE.Mesh(this.histGeo.knob, matOf(e.k)); knob.position.y = 1.02; flag.add(knob);
      const pivot = new THREE.Group(); pivot.position.y = 0.98; flag.add(pivot);
      pivot.add(new THREE.Mesh(this.histGeo.banner, matOf(e.k)));
      flag.traverse((o) => { o.frustumCulled = false; });
      flag.visible = false; g.add(flag);
      const el = document.createElement('div');
      el.className = 'gf-hist br'; el.style.setProperty('--c', hex(BRANCH_COLOR[e.k]));
      el.innerHTML = `<b>${KIND_ICON[e.k]} ${esc(e.n)}</b><small>${esc(e.yl)}${e.who ? ` · ${esc(e.who)}` : ''}</small>`;
      el.style.opacity = '0';
      el.addEventListener('click', () => this.cb.onSciPick?.(i));
      layer?.appendChild(el);
      return { e, n, north, flag, pivot, el, show: 0 };
    });
    const arcs = links.map(([a, b]) => {
      const line = makeArc([nodes[a].lat, nodes[a].lon], [nodes[b].lat, nodes[b].lon], BRANCH_COLOR[nodes[b].k], 3);
      line.visible = false; g.add(line);
      return { a, b, line, op: 0 };
    });
    this.sci = { g, items, arcs, pos: 0, br: null, sel: -1, t: 0, fresh: 60 };
  }

  setSciView({ pos, br, sel }) { if (this.sci) { this.sci.pos = pos; this.sci.br = br ?? null; this.sci.sel = sel ?? -1; } }

  focusSci(i) {
    const it = this.sci?.items[i];
    if (it) this.flyTo({ lat: it.e.lat, lon: it.e.lon, zoom: 0.5, e: KIND_ICON[it.e.k], en: it.e.n, id: `sci-${i}`, silent: true });
  }

  frameSci(lat, lon, zoom) { this.flyTo({ lat, lon, zoom, e: '🔬', en: 'Science', id: 'sci-all', silent: true }); }

  clearSci() {
    if (!this.sci) return;
    this.scene.remove(this.sci.g);
    this.sci.arcs.forEach((a) => { a.line.geometry.dispose(); a.line.material.dispose(); });
    this.sci.items.forEach((it) => it.el.remove());
    this.sci = null;
  }

  updateSci(dt) {
    const S = this.sci;
    if (!S) return;
    const on = this.mode === 'explore';
    S.g.visible = on;
    S.t += dt;
    const w = this.el.clientWidth, h = this.el.clientHeight, cam = this.camera.position;
    const k = THREE.MathUtils.clamp((this.camH || 0.17) / 0.17, 0.45, 1.6);
    const placed = [];
    const order = S.items.map((_, i) => i).sort((a, b) => (b === S.sel) - (a === S.sel) || b - a);
    // the chain around the selected milestone stays bright
    const chain = new Set();
    if (S.sel >= 0) { chain.add(S.sel); S.arcs.forEach((a) => { if (a.b === S.sel || a.a === S.sel) { chain.add(a.a); chain.add(a.b); } }); }
    for (const i of order) {
      const it = S.items[i], e = it.e, sel = i === S.sel;
      const want = (e.pos <= S.pos || chain.has(i)) && (!S.br || e.k === S.br || chain.has(i)) ? 1 : 0;
      it.show = want ? Math.min(1, it.show + dt * 2.2) : Math.max(0, it.show - dt * 4);
      it.flag.visible = on && it.show > 0.01;
      const fresh = S.pos - e.pos < S.fresh;
      const t = it.show, pop = t <= 0 ? 0 : 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
      const size = 0.006 * k * (sel ? 1.6 : fresh ? 1.15 : 0.8) * Math.max(0.001, pop);
      placeMatrix(it.flag.matrix, tmpV.copy(it.n).multiplyScalar(1.0002), it.north.clone().negate(), it.n, size);
      it.flag.matrixWorldNeedsUpdate = true;
      it.pivot.rotation.y = Math.sin(S.t * 2.4 + i) * 0.35;
      const wp = it.n.clone().multiplyScalar(1 + size * 1.1);
      let vis = on && t > 0.6 && (sel || fresh || chain.has(i)) && tmpV2.copy(cam).sub(wp).dot(wp) > 0.002;
      let sx = 0, sy = 0;
      if (vis) {
        const v = wp.clone().project(this.camera);
        sx = ((v.x + 1) / 2) * w; sy = ((1 - v.y) / 2) * h;
        vis = v.z < 1 && Math.abs(v.x) < 1.02 && Math.abs(v.y) < 1.02;
        const bw = Math.max(e.n.length, 10) * 7 + 30, r = [sx - bw / 2, sy - 50, sx + bw / 2, sy - 6];
        if (vis && !sel && placed.some((q) => r[0] < q[2] && r[2] > q[0] && r[1] < q[3] && r[3] > q[1])) vis = false;
        if (vis) placed.push(r);
      }
      it.el.classList.toggle('sel', sel);
      it.el.style.opacity = vis ? '1' : '0';
      it.el.style.pointerEvents = vis ? 'auto' : 'none';
      if (vis) it.el.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, -112%)`;
    }
    for (const a of S.arcs) {
      const A = S.items[a.a], B = S.items[a.b], both = Math.min(A.show, B.show);
      const lit = S.sel >= 0 && (a.a === S.sel || a.b === S.sel);
      const target = both < 0.5 ? 0 : lit ? 1 : S.sel >= 0 ? 0.18 : S.pos - B.e.pos < S.fresh * 1.6 ? 0.9 : 0.32;
      a.op += (target - a.op) * Math.min(1, dt * 5);
      a.line.visible = on && a.op > 0.02;
      a.line.material.opacity = a.op;
      a.line.material.linewidth = lit ? 4.5 : 2.4;
      a.line.material.resolution.set(w, h);
    }
  }

  resize() {
    const w = this.el.clientWidth || 1, h = this.el.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = '100%'; this.renderer.domElement.style.height = '100%';
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.disposed = true;
    window.removeEventListener('keydown', this.onKey); window.removeEventListener('keyup', this.onKey);
    this.ro?.disconnect();
    this.detail?.dispose();
    this.mapLayers?.dispose();
    this.clearHistory(); this.clearSci();
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
      this.scene.traverse((o) => {
        o.geometry?.dispose?.();
        const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        ms.forEach((m) => { Object.values(m.uniforms || {}).forEach((u) => u.value?.isTexture && u.value.dispose()); m.map?.dispose?.(); m.dispose(); });
      });
      this.renderer.dispose();
      this.renderer.forceContextLoss?.();
      this.renderer.domElement.remove();
    }
  }
}
