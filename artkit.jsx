import { useEffect, useState } from 'react';
// shared helpers for the simulation-style illustrations (sciart*.jsx)
// seconds since mount, updated every frame; frozen at a readable moment when the user prefers reduced motion
export const useClock = (still = 2.4) => {
  const [t, setT] = useState(() => globalThis.__artT ?? 0);
  useEffect(() => {
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(still); return undefined; }
    let raf; const s = performance.now();
    const f = (n) => { setT((n - s) / 1000); raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [still]);
  return t;
};
// small seeded random generator so a drawing is the same every time
export const rng = (seed = 1) => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
export const gauss = (r) => Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
export const path = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, k) => a + (b - a) * k;
