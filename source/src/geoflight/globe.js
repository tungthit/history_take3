// The Earth: one sphere with a hand-written shader. Everything is read from pre-baked textures (no heavy
// work at run time): day colour, city lights, country ids, coast distance + terrain normals.
import * as THREE from 'three';

const vert = /* glsl */`
varying vec2 vUv;
varying vec3 vN;
varying vec3 vW;
void main() {
  vUv = uv;
  vN = normalize(position);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

const frag = /* glsl */`
uniform sampler2D dayMap, nightMap, idMap, reliefMap, detailMap, detailAux;
uniform float reliefAmt;
uniform vec2 slotTile[49];
uniform float detailN;
uniform vec3 sunDir;
uniform float time, activeId, activeFade, borderAmt, lightsAmt, allDay;
uniform vec2 idSize;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vW;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float isActive(vec2 uv) { return abs(texture2D(idMap, uv).r * 255.0 - activeId) < 0.5 ? 1.0 : 0.0; }
// smooth "inside the active country" value, bilinear over the nearest-sampled id map
float activeMask(vec2 uv) {
  vec2 tc = uv * idSize - 0.5, f = fract(tc), b = (floor(tc) + 0.5) / idSize, o = 1.0 / idSize;
  return mix(mix(isActive(b), isActive(b + vec2(o.x, 0.0)), f.x), mix(isActive(b + vec2(0.0, o.y)), isActive(b + o), f.x), f.y);
}

void main() {
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  vec3 east = normalize(vec3(N.z, 0.0, -N.x) + 1e-5);
  vec3 north = cross(N, east);

  // ---- coarse data (whole globe) ----
  vec3 rel = texture2D(reliefMap, vUv).rgb;
  float coastC = (rel.r * 255.0 - 128.0) / 6.0;      // px on the 2048 grid, > 0 at sea
  float seaC = smoothstep(-0.4, 0.6, coastC);
  vec2 nrmC = (rel.gb * 2.0 - 1.0) * mix(0.15, 0.55, smoothstep(1.1, 2.0, length(cameraPosition)));
  vec3 day = texture2D(dayMap, vUv).rgb;

  // ---- full-resolution tiles streamed in round the plane (see detail.js): colour + terrain/coast ----
  float detailW = 1.0 - smoothstep(1.9, 2.5, length(cameraPosition));
  float lonD = degrees(atan(-N.z, N.x)), latD = degrees(asin(clamp(N.y, -1.0, 1.0)));
  vec2 g = vec2((lonD + 180.0) / 10.0, (90.0 - latD) / 10.0);
  vec2 gx = dFdx(g), gy = dFdy(g);                       // taken outside the branch (mip selection)
  gx.x = mod(gx.x + 18.0, 36.0) - 18.0; gy.x = mod(gy.x + 18.0, 36.0) - 18.0; // no seam at the date line
  float hasDetail = 0.0, coastF = 99.0;
  vec2 nrmF = vec2(0.0);
  if (detailW > 0.0) {
    vec2 t = min(floor(g), vec2(35.0, 17.0));
    vec2 slot = mod(t, detailN);
    vec2 owner = slotTile[int(slot.y * detailN + slot.x)];
    if (owner.x == t.x && owner.y == t.y) {
      vec2 f = clamp(g - t, 0.5 / 600.0, 1.0 - 0.5 / 600.0);
      vec2 auv = (slot + f) / detailN;
      vec3 d = textureGrad(detailMap, auv, gx / detailN, gy / detailN).rgb;
      vec3 aux = textureGrad(detailAux, auv, gx / detailN, gy / detailN).rgb;
      day = mix(day, pow(d, vec3(2.2)), detailW);
      hasDetail = detailW;
      nrmF = (aux.rg * 255.0 - 128.0) / 127.0;
      coastF = (aux.b * 255.0 - 128.0) / 5.0;            // px at 60 px / degree, > 0 at sea
    }
  }
  float seaF = smoothstep(-0.6, 0.6, coastF);
  float sea = mix(seaC, seaF, hasDetail);
  vec2 nrm = mix(nrmC * (1.0 - seaC), nrmF * reliefAmt, hasDetail);
  vec3 Nt = normalize(N + east * nrm.x + north * nrm.y);

  // ---- sea: deeper open water, lagoon-blue shallows, a crisp shoreline and surf rolling in ----
  float shallowC = (1.0 - smoothstep(0.0, 3.0, coastC)) * seaC;
  float shallowF = (1.0 - smoothstep(0.0, 10.0, coastF)) * seaF * 0.45;
  float shallow = mix(shallowC * 0.6, shallowF, hasDetail);
  day = mix(day, day * vec3(0.8, 0.9, 1.0), seaC * smoothstep(3.0, 12.0, coastC) * 0.45);
  day = mix(day, mix(day, vec3(0.2, 0.68, 0.8), 0.55), shallow * 0.5);
  float surfC = smoothstep(0.9, 1.0, sin(coastC * 5.5 - time * 1.1)) * (1.0 - smoothstep(0.6, 3.0, coastC)) * seaC;
  float shoreC = (1.0 - smoothstep(0.0, 0.32, abs(coastC - 0.28))) * seaC;
  float surfF = smoothstep(0.86, 1.0, sin(coastF * 1.1 - time * 1.6)) * (1.0 - smoothstep(1.2, 7.0, coastF)) * seaF;
  float shoreF = (1.0 - smoothstep(0.0, 1.1, coastF)) * seaF;
  float foam = mix((surfC * 0.3 + shoreC * 0.55) * 0.25, surfF * 0.22 + shoreF * 0.5, hasDetail);
  day = mix(day, vec3(0.94, 0.98, 1.0), clamp(foam, 0.0, 0.85));

  // light: soft wrap-around sun, warm band at sunrise / sunset, faint moonlight on the night side
  float sdG0 = dot(N, sunDir);
  // explore mode: the whole visible side stays in daylight (the relief still shades slopes)
  float sdG = mix(sdG0, 0.4 + 0.6 * max(sdG0, 0.0), allDay);
  float sd = dot(Nt, sunDir) - sdG0 + sdG;
  float lit = smoothstep(-0.12, 0.42, sd) * smoothstep(-0.16, 0.08, sdG); // relief shades slopes but never lights the night side
  float twilight = exp(-sdG * sdG * 45.0);
  vec3 col = day * (0.035 + 1.02 * lit);
  col += day * vec3(1.0, 0.52, 0.28) * twilight * 0.35;
  float moon = dot(day, vec3(0.3, 0.5, 0.2));               // moonlight: a faint blue copy of the day map
  col += (vec3(0.2, 0.3, 0.55) * moon * 0.22 + vec3(0.004, 0.008, 0.02)) * (1.0 - lit);
  // sun glint on water
  vec3 H = normalize(sunDir + V);
  col += vec3(1.0, 0.93, 0.8) * pow(max(dot(N, H), 0.0), 70.0) * 0.55 * sea * smoothstep(-0.05, 0.25, sdG);

  // city lights switch on in small clusters at slightly different moments as dusk sweeps over them
  float cluster = hash(floor(vUv * vec2(640.0, 320.0)));
  float dark = 1.0 - smoothstep(-0.22, 0.04, sdG + (cluster - 0.5) * 0.16);
  float L = texture2D(nightMap, vUv).r;
  float twinkle = 0.85 + 0.15 * sin(time * (2.0 + cluster * 3.0) + cluster * 40.0);
  vec3 lights = vec3(1.0, 0.68, 0.32) * pow(L, 1.1) * 2.2 + vec3(1.0, 0.92, 0.75) * pow(L, 3.0) * 1.6;
  col += lights * dark * twinkle * lightsAmt * (1.0 - sea * 0.85);

  // borders: faint everywhere, a soft glowing outline round the country under the plane
  vec2 o = 1.0 / idSize;
  float idc = texture2D(idMap, vUv).r;
  float diff = 0.0;
  diff += step(0.001, abs(texture2D(idMap, vUv + vec2(o.x, 0.0)).r - idc));
  diff += step(0.001, abs(texture2D(idMap, vUv + vec2(0.0, o.y)).r - idc));
  float landHere = step(0.001, idc);
  col = mix(col, vec3(1.0, 0.97, 0.88), clamp(diff, 0.0, 1.0) * borderAmt * 0.3 * (0.35 + 0.65 * lit) * mix(0.45, 1.0, smoothstep(1.1, 1.5, length(cameraPosition))) * landHere * (1.0 - sea));
  if (activeId > 0.5 && activeFade > 0.001) {
    // a slightly blurred inside-mask gives a smooth outline instead of the map's pixel steps
    float m = 0.0;
    for (int i = 0; i < 4; i++) { float a = float(i) * 1.5707963 + 0.785; m += activeMask(vUv + vec2(cos(a), sin(a)) * o * 0.7); }
    m = m * 0.25;
    float blur = 0.0;
    for (int i = 0; i < 8; i++) {
      float a = float(i) * 0.7853981;
      blur += activeMask(vUv + vec2(cos(a), sin(a)) * o * 3.5);
    }
    blur /= 8.0;
    float line = 1.0 - smoothstep(0.0, max(fwidth(m) * 1.6, 0.04), abs(m - 0.5));
    float inner = m * (1.0 - blur);
    float outer = (1.0 - m) * blur;
    vec3 glowCol = vec3(1.0, 0.86, 0.52);
    float pulse = 0.85 + 0.15 * sin(time * 2.0);
    float near = smoothstep(1.15, 1.6, length(cameraPosition)); // up close the soft halo would fog the land: keep mostly the line
    col += glowCol * (line * mix(0.5, 0.9, near) + (inner * 0.9 + outer * 0.45) * near * near) * activeFade * pulse * (0.45 + 0.55 * max(lit, 0.35));
    col *= 1.0 + glowCol * 0.1 * m * activeFade; // a gentle warm tint, multiplied so dark land does not turn milky
  }

  // atmosphere seen through the edge of the globe
  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0) * smoothstep(1.25, 2.2, length(cameraPosition));
  col += vec3(0.32, 0.6, 1.0) * fres * (0.25 + 0.75 * smoothstep(-0.3, 0.4, sdG)) * 0.7;
  // haze towards the horizon when flying low
  float haze = (1.0 - smoothstep(1.25, 1.6, length(cameraPosition))) * smoothstep(0.08, 0.9, distance(cameraPosition, vW));
  col = mix(col, vec3(0.62, 0.78, 0.95) * (0.08 + 0.92 * smoothstep(-0.2, 0.4, sdG)), haze * 0.35);

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

export function makeGlobe(tex) {
  const uniforms = {
    dayMap: { value: tex.day }, nightMap: { value: tex.night }, idMap: { value: tex.ids }, reliefMap: { value: tex.relief },
    sunDir: { value: new THREE.Vector3(1, 0, 0) }, time: { value: 0 }, activeId: { value: 0 }, activeFade: { value: 0 },
    borderAmt: { value: 1 }, lightsAmt: { value: 1 }, allDay: { value: 0 }, idSize: { value: new THREE.Vector2(4096, 2048) },
    detailMap: { value: null }, detailAux: { value: null }, reliefAmt: { value: 1.1 }, detailN: { value: 1 }, slotTile: { value: Array.from({ length: 49 }, () => new THREE.Vector2(-1, -1)) }
  };
  const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag, extensions: { derivatives: true } });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 256, 128), mat);
  return { mesh, uniforms };
}

/* ---------- atmosphere halo (outside the globe) ---------- */
export function makeAtmosphere() {
  const mat = new THREE.ShaderMaterial({
    uniforms: { sunDir: { value: new THREE.Vector3(1, 0, 0) } },
    vertexShader: /* glsl */`
      varying vec3 vN; varying vec3 vW;
      void main() { vN = normalize(position); vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: /* glsl */`
      uniform vec3 sunDir; varying vec3 vN; varying vec3 vW;
      void main() {
        // how close the view ray passes to the Earth: thick glow at the limb, fading to nothing at the shell
        vec3 dir = normalize(vW - cameraPosition);
        vec3 closest = cameraPosition + dir * max(-dot(cameraPosition, dir), 0.0);
        float h = length(closest);
        float a = pow(clamp(1.0 - (h - 1.0) / 0.075, 0.0, 1.0), 2.6);
        float sunSide = smoothstep(-0.35, 0.5, dot(normalize(closest), sunDir));
        vec3 c = mix(vec3(0.05, 0.08, 0.2), vec3(0.4, 0.68, 1.0), sunSide);
        c = mix(c, vec3(1.0, 0.55, 0.3), exp(-pow(dot(normalize(closest), sunDir) * 4.0, 2.0)) * 0.6);
        gl_FragColor = vec4(c, a * (0.15 + 0.85 * sunSide) * 0.9);
        #include <colorspace_fragment>
      }`,
    side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  return new THREE.Mesh(new THREE.SphereGeometry(1.075, 96, 48), mat);
}

/* ---------- stars ---------- */
export function makeStars() {
  const n = 1800, p = new Float32Array(n * 3), s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(40 + Math.random() * 10);
    p.set([v.x, v.y, v.z], i * 3); s[i] = Math.random();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  g.setAttribute('seed', new THREE.BufferAttribute(s, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, px: { value: 1 } },
    vertexShader: /* glsl */`
      attribute float seed; uniform float time, px; varying float vA;
      void main() { vA = 0.45 + 0.55 * (0.5 + 0.5 * sin(time * (0.5 + seed * 1.5) + seed * 50.0)); vA *= 0.4 + seed * 0.6;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = (1.0 + seed * 1.8) * px; }`,
    fragmentShader: /* glsl */`
      varying float vA; void main() { float d = length(gl_PointCoord - 0.5); gl_FragColor = vec4(vec3(0.9, 0.95, 1.0), vA * smoothstep(0.5, 0.0, d)); }`,
    transparent: true, depthWrite: false
  });
  return new THREE.Points(g, mat);
}
