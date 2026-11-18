// Streams full-resolution imagery round the plane. The Earth is cut into 10° x 10° tiles (600 px, 60 px per
// degree, from NASA's 21600 px Blue Marble). Only an N x N window of tiles lives on the GPU, in one atlas
// addressed like a torus (tile (x, y) always sits in slot (x mod N, y mod N)), so when the window moves only
// the new tiles are uploaded. The globe shader checks `slotTile` to know which tile each slot holds and falls
// back to the 4096 px base map elsewhere.
import * as THREE from 'three';

const TILE = 600, DEG = 10, TX = 36, TY = 18;
const BASE = `./geoflight/tiles/`;

export class DetailStreamer {
  constructor(renderer, n) {
    this.renderer = renderer;
    this.N = Math.max(3, Math.min(n, Math.floor(renderer.capabilities.maxTextureSize / TILE)));
    const S = this.N * TILE;
    this.rt = new THREE.WebGLRenderTarget(S, S, { depthBuffer: false, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter, magFilter: THREE.LinearFilter });
    this.rt.texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    // second atlas, same layout: terrain normal (R, G) and distance to the coast (B)
    this.aux = this.rt.clone();
    const keep = renderer.getClearColor(new THREE.Color()), keepA = renderer.getClearAlpha();
    renderer.setClearColor(0x000000, 1);
    for (const t of [this.rt, this.aux]) { renderer.setRenderTarget(t); renderer.clear(); }
    renderer.setRenderTarget(null);
    renderer.setClearColor(keep, keepA);
    this.slotTile = Array.from({ length: this.N * this.N }, () => new THREE.Vector2(-1, -1));
    this.want = new Set();      // tiles asked for and not in yet
    this.inFlight = new Set();  // tiles being downloaded now
    this.waiters = {};
    this.queue = [];
    this.disposed = false;
  }

  get texture() { return this.rt.texture; }
  get auxTexture() { return this.aux.texture; }

  // Tiles of the window centred on (lat, lon), nearest first.
  windowTiles(lat, lon) {
    const N = this.N, h = Math.floor(N / 2);
    const cx = Math.floor((lon + 180) / DEG), cy = Math.min(TY - 1, Math.max(0, Math.floor((90 - lat) / DEG)));
    const y0 = Math.min(TY - N, Math.max(0, cy - h));
    const out = [];
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const tx = (((cx - h + i) % TX) + TX) % TX, ty = y0 + j;
      out.push({ tx, ty, d: Math.min(Math.abs(i - h), N) + Math.abs(ty - cy) });
    }
    return out.sort((a, b) => a.d - b.d);
  }

  has(tx, ty) { const s = this.slotTile[(ty % this.N) * this.N + (tx % this.N)]; return s.x === tx && s.y === ty; }

  // Queue whatever the window round (lat, lon) still needs. The promise settles once those tiles are in.
  update(lat, lon) {
    const need = this.windowTiles(lat, lon).filter((t) => !this.has(t.tx, t.ty));
    const fresh = need.filter((t) => !this.want.has(`${t.tx},${t.ty}`));
    // nearest first; tiles that left the window and have not started are dropped
    const keep = new Set(need.map((t) => `${t.tx},${t.ty}`));
    this.queue = [...fresh, ...this.queue.filter((t) => keep.has(`${t.tx},${t.ty}`))];
    const waits = need.map((t) => {
      const k = `${t.tx},${t.ty}`;
      this.want.add(k);
      return new Promise((res) => { (this.waiters[k] ||= []).push(res); });
    });
    for (const k of [...this.want]) if (!keep.has(k) && !this.inFlight.has(k)) { this.want.delete(k); (this.waiters[k] || []).forEach((r) => r()); delete this.waiters[k]; }
    this.pump();
    return Promise.all(waits);
  }

  pump() {
    while (this.inFlight.size < 6 && this.queue.length && !this.disposed) {
      const t = this.queue.shift(), k = `${t.tx},${t.ty}`;
      if (this.inFlight.has(k) || this.has(t.tx, t.ty)) continue;
      this.inFlight.add(k);
      this.load(t).finally(() => {
        this.inFlight.delete(k); this.want.delete(k);
        this.dirty = true;
        (this.waiters[k] || []).forEach((r) => r()); delete this.waiters[k];
        this.pump();
      });
    }
  }

  async load({ tx, ty }) {
    try {
      const get = async (u) => createImageBitmap(await (await fetch(u)).blob(), { colorSpaceConversion: 'none', premultiplyAlpha: 'none' });
      const [bmp, abmp] = await Promise.all([get(`${BASE}${ty}_${tx}.webp`), get(`${BASE}${ty}_${tx}a.webp`).catch(() => null)]);
      if (this.disposed) { bmp.close?.(); abmp?.close?.(); return; }
      const sx = tx % this.N, sy = ty % this.N, at = new THREE.Vector2(sx * TILE, sy * TILE);
      this.slotTile[sy * this.N + sx].set(-1, -1); // not usable while half written
      for (const [b, dst] of [[bmp, this.rt.texture], [abmp, this.aux.texture]]) {
        if (!b) continue;
        const tex = new THREE.Texture(b); tex.flipY = false;
        this.renderer.copyTextureToTexture(tex, dst, null, at);
        tex.dispose(); b.close?.();
      }
      if (abmp) this.slotTile[sy * this.N + sx].set(tx, ty);
    } catch { /* offline or missing tile: the base map stays */ }
  }

  // Rebuild the atlas mipmaps after new tiles arrived (once per frame at most, cheap on the GPU).
  flush() {
    if (!this.dirty || this.disposed) return;
    this.dirty = false;
    const gl = this.renderer.getContext();
    for (const tex of [this.rt.texture, this.aux.texture]) {
      const t = this.renderer.properties.get(tex).__webglTexture;
      if (!t) continue;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.generateMipmap(gl.TEXTURE_2D);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.renderer.state.reset();
  }

  dispose() { this.disposed = true; this.queue = []; this.rt.dispose(); this.aux.dispose(); }
}
