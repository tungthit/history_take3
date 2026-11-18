// Illustrations for physics and chemistry. The animated ones compute the physics they show (Planck's law,
// Coulomb scattering, radioactive decay, hydrogen levels, a chirp, ...) rather than looping a picture.
import { useMemo } from 'react';
import { Svg, T, D2R } from './sciart.jsx';
import { clamp, path, rng, useClock } from './artkit.jsx';

const hue = (nm) => `hsl(${clamp(270 - (nm - 400) * 0.9, 0, 270)} 90% 60%)`;
const Dash = ({ x1, y1, x2, y2, w = 1.6 }) => <line x1={x1} y1={y1} x2={x2} y2={y2} className="s" style={{ strokeDasharray: '6 5', strokeWidth: w }}><animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1s" repeatCount="indefinite" /></line>;
const Ring = ({ cx, cy, r }) => <circle cx={cx} cy={cy} r={r} className="s"><animate attributeName="r" values={`${r};${r + 46}`} dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.9;0" dur="2s" repeatCount="indefinite" /></circle>;

const Planck = () => {
  const t = useClock(0), T0 = 4500 + 1500 * Math.sin(t * 0.6), C2 = 1.4388e7;
  const B = (l, K) => 1 / (l ** 5 * (Math.exp(C2 / (l * K)) - 1)), RJ = (l, K) => K / (C2 * l ** 4);
  const ref = Math.max(...Array.from({ length: 200 }, (_, i) => B(150 + i * 12, 6000)));
  const X = (l) => 30 + ((l - 150) / 2400) * 260, Y = (v) => 120 - clamp(v / ref, 0, 1.15) * 88, ls = Array.from({ length: 160 }, (_, i) => 150 + i * 15);
  return (
    <Svg><path d={path(ls.map((l) => [X(l), Y(RJ(l, T0))]))} className="s" style={{ strokeDasharray: '4 4', opacity: 0.55 }} /><path d={path(ls.map((l) => [X(l), Y(B(l, T0))]))} className="s" style={{ strokeWidth: 2.6 }} />
      <line x1="30" y1="120" x2="290" y2="120" className="s" style={{ opacity: 0.4 }} />
      <T x="160" y="16" s={11}>T = {T0.toFixed(0)} K · peak {(2.898e6 / T0).toFixed(0)} nm</T><T x="250" y="40" m a="end">classical: blows up in the UV</T><T x="160" y="142" m>solid: Planck (energy in quanta hf) · dashed: old theory</T></Svg>
  );
};

const Photo = () => {
  const t = useClock(4), blue = Math.floor(t / 3.5) % 2 === 1, nm = blue ? 400 : 690, E = 1240 / nm, phi = 2.3, ke = E - phi;
  const ph = (i) => ((t * 0.9 + i * 0.33) % 1);
  return (
    <Svg><rect x="170" y="96" width="120" height="18" className="s f2" /><T x="230" y="130" m>metal (work function {phi} eV)</T>
      {[0, 1, 2].map((i) => { const k = ph(i), x = 30 + i * 36 + k * 90, y = 14 + k * 74; return <circle key={i} cx={x} cy={y} r="4" style={{ fill: hue(nm) }} />; })}
      {blue && [0, 1, 2].map((i) => { const k = ph(i + 0.5); return <circle key={i} cx={215 + i * 22 + k * 20} cy={92 - k * 56} r="3.5" className="f" style={{ opacity: 1 - k }} />; })}
      <T x="80" y="120" s={11} a="middle">{nm} nm · hf = {E.toFixed(1)} eV</T><T x="230" y="40" m>{blue ? `electron ejected, kinetic energy ${ke.toFixed(1)} eV` : 'hf < work function: no electrons ejected'}</T></Svg>
  );
};

const Scatter = () => {
  const t = useClock(3), tr = useMemo(() => [4, 15, 30, 50, 70].map((b) => {
    let x = -170, y = -b, vx = 1, vy = 0; const P = [];
    for (let i = 0; i < 900; i++) { const r2 = x * x + y * y, r = Math.sqrt(r2), a = 15 / r2; vx += (x / r) * a; vy += (y / r) * a; x += vx; y += vy; P.push([x, y]); if (Math.abs(x) > 230 || Math.abs(y) > 150) break; }
    return P;
  }), []);
  const cx = 160, cy = 76, step = Math.floor(t * 110) % 620;
  return (
    <Svg>{tr.map((P, i) => <g key={i}><path d={path(P.filter((_, k) => k % 6 === 0).map(([x, y]) => [cx + x * 0.62, cy + y * 0.62]))} className="s" style={{ strokeWidth: 1.2, opacity: 0.55 }} />{P[Math.min(step, P.length - 1)] && <circle cx={cx + P[Math.min(step, P.length - 1)][0] * 0.62} cy={cy + P[Math.min(step, P.length - 1)][1] * 0.62} r="3" style={{ fill: '#fff' }} />}</g>)}
      <circle cx={cx} cy={cy} r="5" className="f" /><T x="160" y="146" m>α particles near the nucleus are pushed hard; a few bounce back (Coulomb 1/r² force, real simulation)</T></Svg>
  );
};

const Bohr = () => {
  const t = useClock(1), cyc = [[3, 2], [4, 2], [5, 2]], k = Math.floor(t / 2.6) % 3, [hi, lo] = cyc[k], ph = (t % 2.6) / 2.6;
  const R = 1.0968e7, lam = (n) => 1e9 / (R * (0.25 - 1 / n ** 2)), cx = 90, cy = 76, rad = (n) => 4.2 * n * n;
  const jump = clamp((ph - 0.35) / 0.25, 0, 1), rr = ph < 0.35 ? rad(hi) : rad(hi) + (rad(lo) - rad(hi)) * jump;
  return (
    <Svg>{[1, 2, 3, 4, 5].map((n) => <circle key={n} cx={cx} cy={cy} r={rad(n) > 68 ? 68 : rad(n)} className="s" style={{ opacity: 0.3, display: n === 5 ? 'none' : undefined }} />)}
      <circle cx={cx} cy={cy} r="4" className="f" /><circle cx={cx + Math.min(rr, 68)} cy={cy} r="3.5" style={{ fill: '#fff' }} />
      {ph > 0.55 && <path d={`M${cx + 30} ${cy - 40} q 20 -10 40 0 t 40 0`} className="s" style={{ stroke: hue(lam(hi)), opacity: 1 - (ph - 0.55) * 2 }} />}
      <rect x="170" y="100" width="130" height="14" className="s" />{[3, 4, 5, 6].map((n) => <line key={n} x1={170 + ((lam(n) - 380) / 340) * 130} y1="100" x2={170 + ((lam(n) - 380) / 340) * 130} y2="114" style={{ stroke: hue(lam(n)), strokeWidth: 2.4 }} />)}
      <T x="235" y="94" m>Balmer lines {lam(3).toFixed(0)} · {lam(4).toFixed(0)} · {lam(5).toFixed(0)} · {lam(6).toFixed(0)} nm</T><T x="235" y="132" s={11}>n = {hi} → {lo}: emits {lam(hi).toFixed(0)} nm</T><T x="235" y="30" m>E = −13.6 / n² (eV)</T></Svg>
  );
};

const Decay = () => {
  const t = useClock(2), p = useMemo(() => { const r = rng(5); return Array.from({ length: 48 }, (_, i) => ({ tau: -Math.log(1 - r()), x: 22 + (i % 8) * 17, y: 22 + Math.floor(i / 8) * 17 })); }, []), h = ((t % 8) / 8) * 3.6;
  const N = p.filter((a) => a.tau / Math.LN2 > h).length;
  const X = (v) => 190 + v * 30, Y = (n) => 120 - n * 90;
  return (
    <Svg>{p.map((a, i) => <circle key={i} cx={a.x} cy={a.y} r="5" className={a.tau / Math.LN2 > h ? 'f' : 's'} style={{ opacity: a.tau / Math.LN2 > h ? 1 : 0.25 }} />)}
      <path d={path(Array.from({ length: 49 }, (_, i) => [X(i * 0.075), Y(2 ** -(i * 0.075))]))} className="s" /><line x1="190" y1="120" x2="300" y2="120" className="s" style={{ opacity: 0.4 }} /><circle cx={X(h)} cy={Y(2 ** -h)} r="4" style={{ fill: '#fff' }} />
      {[1, 2, 3].map((k) => <line key={k} x1={X(k)} y1="120" x2={X(k)} y2="124" className="s" />)}<T x="205" y="136" m>1</T><T x="235" y="136" m>2</T><T x="265" y="136" m>3 half-lives</T>
      <T x="70" y="136" s={11}>{N}/48 left</T><T x="245" y="22" m>N = N₀ · 2^(−t/T½)</T></Svg>
  );
};

const Ligo = () => {
  const t = useClock(3), data = useMemo(() => {
    const P = []; let ph = 0; const tc = 1, n = 700;
    for (let i = 0; i < n; i++) { const tt = (i / n) * 0.998, f = 30 * (1 - tt / tc) ** (-3 / 8), dt = 0.998 / n * 0.25; ph += 2 * Math.PI * f * dt * 8; P.push({ f, ph, a: (f / 30) ** (2 / 3) }); }
    return P;
  }, []), i = Math.min(699, Math.floor(((t % 6) / 5) * 700)), X = (k) => 150 + (k / 700) * 150, mx = Math.max(...data.map((d) => d.a));
  return (
    <Svg><path d={path(data.slice(0, i).map((d, k) => [X(k), 76 - (d.a / mx) * 52 * Math.sin(d.ph)]))} className="s" /><line x1="150" y1="76" x2="300" y2="76" className="s" style={{ opacity: 0.3 }} />
      {i < 699 && (() => { const d = data[i], r = 30 * d.a ** -1; return <g><circle cx={70 + Math.cos(d.ph / 2) * r} cy={76 + Math.sin(d.ph / 2) * r} r="8" className="f" /><circle cx={70 - Math.cos(d.ph / 2) * r} cy={76 - Math.sin(d.ph / 2) * r} r="6" className="f" style={{ opacity: 0.8 }} /></g>; })()}
      <T x="70" y="136" m>two black holes spiral together</T><T x="225" y="136" m>gravitational waves: faster, stronger</T></Svg>
  );
};

const Higgs = () => {
  const t = useClock(4), ev = useMemo(() => { const r = rng(11); return Array.from({ length: 900 }, () => (r() < 0.11 ? 125 + (r() + r() + r() - 1.5) * 3.2 : 100 - Math.log(1 - r() * 0.93) * 24)); }, []);
  const n = Math.min(900, Math.floor(40 + (t % 7) * 150)), bins = Array(30).fill(0);
  ev.slice(0, n).forEach((m) => { const b = Math.floor((m - 100) / 2); if (b >= 0 && b < 30) bins[b]++; });
  const mx = Math.max(...Array.from({ length: 900 }, () => 1), 60);
  return (
    <Svg>{bins.map((v, b) => <rect key={b} x={40 + b * 8.4} y={116 - (v / mx) * 90} width="7" height={(v / mx) * 90} className="f" style={{ opacity: b >= 11 && b <= 14 ? 1 : 0.55 }} />)}
      <line x1="40" y1="116" x2="292" y2="116" className="s" /><T x="166" y="132" m>mass of photon pair (GeV): 100 → 160</T><T x="166" y="22" s={11}>{n} events: bump near 125 GeV (illustration)</T>
      <T x="40" y="144" m a="start">background: most photon pairs are noise · bump: Higgs decaying</T></Svg>
  );
};

const Eht = () => {
  const t = useClock(0), ph = t * 0.5;
  return (
    <Svg><circle cx="160" cy="75" r="62" className="s" style={{ opacity: 0.12 }} />{Array.from({ length: 90 }, (_, i) => { const a = (i / 90) * 2 * Math.PI, b = 0.45 + 0.55 * Math.cos(a - ph), r = 42 + 6 * Math.sin(a * 3 + 1); return <circle key={i} cx={160 + Math.cos(a) * r} cy={75 + Math.sin(a) * r * 0.97} r={3 + 4 * b} style={{ fill: `hsl(${22 + 18 * b} 95% ${40 + 25 * b}%)`, opacity: 0.25 + 0.75 * b }} />; })}
      <circle cx="160" cy="75" r="32" style={{ fill: '#02040a' }} /><T x="160" y="148" m>dark shadow in the middle; the bright ring is spinning hot gas, brighter on one side as it moves toward us</T></Svg>
  );
};

const Nif = () => {
  const t = useClock(1.5), ph = (t % 5) / 5, sz = ph < 0.55 ? 28 - 21 * (ph / 0.55) : 7, flash = ph > 0.6 && ph < 0.8;
  return (
    <Svg>{Array.from({ length: 24 }, (_, i) => { const a = i * 15 * D2R, ox = 160 + Math.cos(a) * 130, oy = 75 + Math.sin(a) * 70; return <line key={i} x1={ox} y1={oy} x2={160 + Math.cos(a) * 24} y2={75 + Math.sin(a) * 24} className="s" style={{ strokeWidth: 1.2, opacity: ph < 0.5 ? 0.9 : 0.15 }} />; })}
      <ellipse cx="160" cy="75" rx="34" ry="30" className="s" style={{ opacity: 0.4 }} /><circle cx="160" cy="75" r={flash ? 40 : sz} className="f" style={{ opacity: flash ? 0.9 : 0.8, fill: flash ? '#fff' : undefined }} />
      <T x="160" y="146" m>192 laser beams squeeze the fuel pellet; 2022: 3.15 MJ out from 2.05 MJ (gain ≈ {(3.15 / 2.05).toFixed(2)})</T></Svg>
  );
};

const Gr = () => {
  const t = useClock(1), k = 1 + 0.35 * Math.sin(t * 0.8), pts = (x, y) => { const dx = x - 160, dy = y - 75, r2 = dx * dx + dy * dy, f = 1 - 0.55 * k * Math.exp(-r2 / 2200); return [160 + dx * f, 75 + dy * f]; };
  return (
    <Svg>{Array.from({ length: 11 }, (_, i) => <g key={i}><path d={path(Array.from({ length: 41 }, (_, j) => pts(20 + j * 7, 15 + i * 12)))} className="s" style={{ strokeWidth: 1, opacity: 0.55 }} /><path d={path(Array.from({ length: 41 }, (_, j) => pts(40 + i * 24, 15 + j * 3)))} className="s" style={{ strokeWidth: 1, opacity: 0.55 }} /></g>)}
      <circle cx="160" cy="75" r="9" style={{ fill: '#ffd27a' }} /><T x="160" y="146" m>mass bends spacetime; light follows the curve (measured in 1919: 1.75″)</T></Svg>
  );
};

const Transistor = () => {
  const t = useClock(1), on = Math.floor(t / 2.5) % 2 === 1;
  return (
    <Svg><rect x="30" y="40" width="80" height="60" className="s f2" /><rect x="110" y="40" width="40" height="60" className="s" style={{ fill: 'rgba(255,255,255,.12)' }} /><rect x="150" y="40" width="80" height="60" className="s f2" />
      <T x="70" y="74" s={11}>N · emitter</T><T x="130" y="74" s={9}>P</T><T x="190" y="74" s={11}>N · collector</T>
      <line x1="130" y1="40" x2="130" y2="14" className="s" /><T x="130" y="10" m>base {on ? '+' : '0'}</T>
      {on && Array.from({ length: 7 }, (_, i) => <circle key={i} cx={36 + (((t * 60 + i * 28) % 190))} cy={52 + (i % 4) * 14} r="3" style={{ fill: '#fff' }} />)}
      <T x="160" y="128" m>{on ? 'a small current at the base lets a large current flow: amplifier / switch' : 'no current at the base: main current blocked'}</T></Svg>
  );
};

const Fission = () => {
  const t = useClock(1), ph = (t % 6) / 6, split = ph > 0.3, d = clamp((ph - 0.3) / 0.35, 0, 1);
  return (
    <Svg>{[[220, 40], [220, 110], [270, 75]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="11" className="f2 s" style={{ fill: ph > 0.7 ? 'rgba(255,200,100,.6)' : undefined }} />)}
      {!split && <circle cx={30 + (ph / 0.3) * 80} cy="75" r="4" style={{ fill: '#fff' }} />}
      {!split ? <circle cx="120" cy="75" r="16" className="f2 s" /> : <><circle cx={120 - d * 18} cy={75 + d * 12} r="11" className="f2 s" /><circle cx={120 + d * 18} cy={75 - d * 12} r="9" className="f2 s" />
        {[[220, 40], [220, 110], [260, 20]].map(([x, y], i) => <circle key={i} cx={120 + (x - 120) * d} cy={75 + (y - 75) * d} r="3.5" style={{ fill: '#fff' }} />)}</>}
      <T x="160" y="144" m>U-235 absorbs a neutron, splits in two and releases ~3 new neutrons: a chain reaction</T></Svg>
  );
};

const Pile = () => {
  const t = useClock(1), g = (t * 22) % 300, X = (v) => 30 + (v / 300) * 150;
  const lines = [[0.99, 'k < 1'], [1, 'k = 1'], [1.01, 'k > 1']];
  return (
    <Svg>{lines.map(([k, l], i) => <g key={k}><path d={path(Array.from({ length: 61 }, (_, j) => [X(j * 5), 120 - clamp(Math.log(k ** (j * 5)) * 30 + 55, 8, 100)]))} className="s" style={{ opacity: 0.6 }} /><circle cx={X(g)} cy={120 - clamp(Math.log(k ** g) * 30 + 55, 8, 100)} r="3.5" className="f" /><T x={190} y={36 + i * 14} a="start" m>{l}: N = {(k ** g).toFixed(2)}</T></g>)}
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={206 + c * 22} y={74 + r * 14} width="20" height="12" className={(r + c) % 3 ? 's f2' : 's f'} style={{ opacity: (r + c) % 3 ? 1 : 0.7 }} />))}
      <T x="105" y="136" m>neutrons per generation</T><T x="250" y="144" m>graphite pile + control rods</T></Svg>
  );
};

const Laser = () => {
  const t = useClock(1), k = 1 + (Math.floor(t / 1.1) % 6), x = (t * 80) % 200;
  return (
    <Svg><rect x="40" y="30" width="190" height="80" className="s" /><rect x="34" y="28" width="6" height="84" className="f" /><rect x="230" y="28" width="6" height="84" className="f" style={{ opacity: 0.4 }} />
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={64 + (i % 6) * 28} cy={44 + Math.floor(i / 6) * 44} r="4" className="s" />)}
      {Array.from({ length: Math.min(k, 6) }, (_, i) => <path key={i} d={`M${50 + x} ${40 + i * 12} q 6 -6 12 0 t 12 0`} className="s" style={{ stroke: '#ffd27a' }} />)}
      {k >= 4 && <line x1="236" y1="70" x2="310" y2="70" className="s" style={{ stroke: '#ffd27a', strokeWidth: 3 }}><animate attributeName="opacity" values=".4;1;.4" dur="1s" repeatCount="indefinite" /></line>}
      <T x="135" y="132" m>each photon passing an excited atom makes it emit an identical photon: {Math.min(k, 6)} → {Math.min(k * 2, 12)}</T></Svg>
  );
};

const Cmb = () => {
  const dots = useMemo(() => { const r = rng(7), P = []; for (let i = 0; i < 520; i++) { const a = r() * 2 * Math.PI, d = Math.sqrt(r()); const x = d * Math.cos(a), y = d * Math.sin(a); P.push({ x: 160 + x * 100, y: 66 + y * 52, v: Math.sin(x * 9 + 1) * Math.cos(y * 7) * 0.5 + Math.sin(x * 21 + y * 13) * 0.3 + (r() - 0.5) * 0.6 }); } return P; }, []);
  return (
    <Svg><ellipse cx="160" cy="66" rx="106" ry="56" className="s f2" />{dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="3.4" style={{ fill: `hsl(${220 - d.v * 160} 80% 55%)`, opacity: 0.85 }} />)}<T x="160" y="144" m>2.725 K in every direction; red and blue spots differ by ~1/100,000 (illustrative colors)</T></Svg>
  );
};

export const ART_PHYS = {
  volta: { cap: 'A stack of zinc and copper discs separated by brine-soaked paper made the first steady electric current.', el: (
    <Svg>{Array.from({ length: 8 }, (_, i) => <rect key={i} x="40" y={20 + i * 14} width="70" height="11" rx="2" className={i % 2 ? 'f' : 's f2'} style={{ opacity: i % 2 ? 0.85 : 1 }} />)}
      <path d="M110 24 H200 V60 M110 118 H200 V90" className="s" /><circle cx="200" cy="75" r="15" className="s f2" /><circle cx="200" cy="75" r="8" className="f glow" /><Dash x1="110" y1="24" x2="200" y2="24" /><Dash x1="200" y1="118" x2="110" y2="118" />
      <T x="75" y="144" m>zinc · copper · brine paper</T><T x="250" y="80" m>lamp</T></Svg>) },
  faraday: { cap: 'A magnet moving in and out of a coil: a changing magnetic flux creates a current (the graph is −dΦ/dt, really computed).', el: (() => { const C = () => { const t = useClock(1), phi = (x) => 1 / (1 + x * x), emf = (tt) => { const x = 2 * Math.sin(tt * 1.4), v = 2.8 * Math.cos(tt * 1.4), h = 1e-3; return -((phi(x + v * h) - phi(x)) / h) * 1; }; const x0 = 2 * Math.sin(t * 1.4); return (
    <Svg><rect x={70 + x0 * 24} y="30" width="46" height="18" className="s f2" /><rect x={70 + x0 * 24} y="30" width="23" height="18" className="f" /><T x={81 + x0 * 24} y="43" s={9}><tspan style={{ fill: '#0b1020' }}>B</tspan></T><T x={104 + x0 * 24} y="43" s={9}>N</T>
      {Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx={96 + i * 6} cy="76" rx="9" ry="22" className="s" />)}<path d={path(Array.from({ length: 91 }, (_, i) => { const tt = t - 3 + (i / 90) * 3; return [190 + (i / 90) * 110, 100 - clamp(emf(tt) * 6, -34, 34)]; }))} className="s" /><line x1="190" y1="100" x2="300" y2="100" className="s" style={{ opacity: 0.3 }} /><T x="245" y="136" m>induced voltage over time</T><T x="96" y="132" m>coil</T></Svg>); }; return <C />; })() },
  maxwell: { cap: 'Electric field E and magnetic field B oscillate at right angles and propagate themselves as a wave at speed c = 1/√(μ₀ε₀) ≈ 300,000 km/s: light is an electromagnetic wave.', el: (() => { const C = () => { const t = useClock(1), ph = t * 3; return (
    <Svg><line x1="20" y1="82" x2="300" y2="82" className="s" style={{ opacity: 0.4 }} /><path d={path(Array.from({ length: 141 }, (_, i) => [20 + i * 2, 82 - 44 * Math.sin(i * 0.1 - ph)]))} className="s" style={{ strokeWidth: 2.4 }} /><path d={path(Array.from({ length: 141 }, (_, i) => [20 + i * 2 + 14 * Math.sin(i * 0.1 - ph), 82 + 22 * Math.sin(i * 0.1 - ph)]))} className="s" style={{ stroke: '#7ad7ff', strokeWidth: 2.4 }} />
      <T x="40" y="24" s={11}>E</T><T x="40" y="132" s={11}><tspan style={{ fill: '#7ad7ff' }}>B</tspan></T><T x="200" y="144" m>c = 1/√(μ₀ε₀) ≈ 299,792 km/s</T></Svg>); }; return <C />; })() },
  hertz: { cap: 'A spark at the transmitter makes electromagnetic waves; an open coil far away also throws a small spark: the waves Maxwell predicted are real.', el: (
    <Svg><line x1="30" y1="75" x2="76" y2="75" className="s" /><circle cx="80" cy="75" r="5" className="f glow" /><line x1="84" y1="75" x2="130" y2="75" className="s" /><Ring cx={105} cy={75} r={10} />
      <path d="M232 52 a26 26 0 1 0 0 46" className="s" /><circle cx="233" cy="75" r="3" className="f glow" /><T x="105" y="130" m>transmitter</T><T x="233" y="130" m>receiver</T></Svg>) },
  roentgen: { cap: 'X-rays pass through soft tissue but are blocked by bone, so a bone shadow appears on the fluorescent screen.', el: (
    <Svg><rect x="20" y="52" width="40" height="24" rx="5" className="s f2" /><Dash x1="60" y1="64" x2="150" y2="64" /><Dash x1="60" y1="64" x2="150" y2="30" /><Dash x1="60" y1="64" x2="150" y2="98" />
      <rect x="150" y="14" width="120" height="100" rx="8" className="s f2" />{[[170, 100, 170, 40], [190, 100, 190, 30], [210, 100, 210, 28], [230, 100, 230, 32], [250, 100, 250, 44]].map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} className="s" style={{ strokeWidth: 6, stroke: '#e8efff', opacity: 0.85 }} />)}
      <ellipse cx="212" cy="103" rx="38" ry="8" style={{ fill: '#e8efff', opacity: 0.8 }} /><T x="40" y="96" m>X-ray tube</T><T x="210" y="132" m>bone shadow on screen</T></Svg>) },
  curie: { cap: 'Radioactivity is a property of atoms: each particle decays at random, but after every half-life exactly half remain (real particle simulation).', el: <Decay /> },
  planck: { cap: 'To fit the black-body radiation spectrum, Planck assumed energy is emitted in packets E = hf. The old theory shot up to infinity in the ultraviolet; the Planck formula does not.', el: <Planck /> },
  einstein: { cap: 'Photoelectric effect: an electron is ejected only when a photon has enough energy (hf > work function), even though red light can be very bright.', el: <Photo /> },
  rutherford: { cap: 'Most α particles go straight through, some are deflected strongly, a few bounce back: mass and charge are packed into a tiny nucleus.', el: <Scatter /> },
  bohr: { cap: 'Electrons only occupy certain energy levels E = −13.6/n²; jumping down emits a photon, and the computed wavelengths match the measured Balmer lines.', el: <Bohr /> },
  gr: { cap: 'Mass bends spacetime; objects and light follow that curve.', el: <Gr /> },
  transistor: { cap: 'A small current in the middle P layer controls a large current through the whole N-P-N block: both a switch and an amplifier.', el: <Transistor /> },
  fission: { cap: 'A heavy nucleus absorbs a neutron and splits into two pieces plus a few new neutrons, and each neutron can split another nucleus.', el: <Fission /> },
  fermi: { cap: 'Chicago Pile-1: if each neutron generation produces k times the previous one, k < 1 dies out, k = 1 sustains, k > 1 grows fast; control rods pull k to exactly 1.', el: <Pile /> },
  laser: { cap: 'Stimulated emission: one photon makes an excited atom release an identical photon; two mirrors keep them bouncing back and forth, the photon count grows, then escapes as a beam.', el: <Laser /> },
  cmb: { cap: 'The cosmic background temperature is almost uniform across the sky, differing by only ~1/100,000: a leftover trace of the Big Bang.', el: <Cmb /> },
  higgs: { cap: 'Collisions at the LHC: photon pairs with total mass ~125 GeV occur more often than the random background: a sign of the Higgs particle.', el: <Higgs /> },
  graphene: { cap: 'A single layer of carbon atoms in a honeycomb, ~0.34 nm thick: two scientists peeled it off graphite with sticky tape.', el: (
    <Svg>{Array.from({ length: 5 }, (_, r) => Array.from({ length: 9 }, (_, c) => { const x = 40 + c * 26 + (r % 2) * 13, y = 24 + r * 22.5, p = Array.from({ length: 6 }, (_, k) => `${(x + Math.cos((k * 60 + 30) * D2R) * 15).toFixed(1)},${(y + Math.sin((k * 60 + 30) * D2R) * 15).toFixed(1)}`).join(' '); return <polygon key={`${r}${c}`} points={p} className="s f2" style={{ opacity: 0.9 }} />; }))}
      {[[53, 24], [105, 69], [196, 46], [66, 92]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" className="f glow" style={{ animationDelay: `${i * 0.4}s` }} />)}<T x="160" y="144" m>each vertex is a carbon atom · conductive, strong, thinnest possible</T></Svg>) },
  eht: { cap: 'Image of black hole M87*: a bright ring of hot gas around a dark shadow; the brighter side is where matter moves toward us.', el: <Eht /> },
  nif: { cap: '192 laser beams converge on a tiny fuel pellet; compressed to fusion, it gave out more energy than the laser put in.', el: <Nif /> },
  ligo: { cap: 'Two black holes spiral into each other, the frequency and amplitude of the gravitational waves rise (chirp) then stop at the merger; LIGO measured a stretch smaller than a thousandth of the diameter of a proton.', el: <Ligo /> },

  priest: { cap: 'Heating mercury oxide with a burning lens: 2HgO → 2Hg + O₂. The new gas makes a candle burn much brighter.', el: (
    <Svg><ellipse cx="60" cy="40" rx="8" ry="30" className="s f2" />{[20, 40, 60].map((y) => <Dash key={y} x1="10" y1={y} x2="64" y2={y} w={1.2} />)}<path d="M72 40 L120 92" className="s" /><rect x="108" y="86" width="34" height="30" rx="4" className="s f2" /><T x="125" y="132" m>HgO</T>
      <path d="M142 100 q 30 -4 60 -30" className="s" /><rect x="200" y="46" width="70" height="80" rx="6" className="s" /><rect x="228" y="84" width="14" height="30" className="s f2" /><ellipse cx="235" cy="76" rx="6" ry="11" className="f glow" /><T x="235" y="142" m>candle burns strongly in the "new air"</T></Svg>) },
  lav: { cap: 'Burning metal in a sealed flask, the total mass stays the same: matter is neither lost nor created, only changed.', el: (
    <Svg><g><animateTransform attributeName="transform" type="rotate" values="-0.6 160 40;0.6 160 40;-0.6 160 40" dur="3s" repeatCount="indefinite" /><rect x="50" y="40" width="220" height="5" className="s f2" /><path d="M80 45 V60 M240 45 V60" className="s" />
      <path d="M62 62 h36 v40 a18 18 0 0 1 -36 0z" className="s f2" /><circle cx="80" cy="96" r="6" className="f glow" /><rect x="222" y="82" width="36" height="22" className="f" style={{ opacity: 0.7 }} /></g><polygon points="160,45 150,120 170,120" className="s f2" />
      <T x="80" y="130" m>metal + gas → oxide</T><T x="240" y="130" m>weight</T><T x="160" y="22" s={11}>before = after</T></Svg>) },
  dalton: { cap: 'Atoms of one kind are identical and combine in small whole-number ratios: CO and CO₂ have 12 g of C with 16 g or 32 g of O (ratio 1 : 2).', el: (
    <Svg>{[[60, 'CO'], [190, 'CO₂']].map(([x, l]) => <g key={l}><circle cx={x} cy="60" r="20" className="f" style={{ opacity: 0.55 }} /><T x={x} y="64" s={11}>C</T><circle cx={x + 34} cy="60" r="16" className="f" /><T x={x + 34} y="64" s={11}><tspan style={{ fill: '#0b1020' }}>O</tspan></T>
      {l === 'CO₂' && <><circle cx={x - 30} cy="60" r="16" className="f" /><T x={x - 30} y="64" s={11}><tspan style={{ fill: '#0b1020' }}>O</tspan></T></>}<T x={x + (l === 'CO' ? 17 : 2)} y="104" s={13}>{l}</T></g>)}
      <T x="160" y="136" m>12 g C + 16 g O → CO · 12 g C + 32 g O → CO₂</T></Svg>) },
  mendeleev: { cap: 'Elements arranged by mass and properties; the gaps ("?") were predicted to hold new elements: gallium (1875) and germanium (1886) filled them.', el: (
    <Svg>{['Cu', 'Zn', '?68', '?72', 'As', 'Se', 'Br'].map((s, i) => <g key={i}><rect x={20 + i * 40} y="40" width="36" height="40" rx="4" className={s[0] === '?' ? 's' : 's f2'} style={s[0] === '?' ? { strokeDasharray: '3 3' } : undefined} /><T x={38 + i * 40} y="66" s={13}>{s}</T>{s[0] === '?' && <rect x={20 + i * 40} y="40" width="36" height="40" rx="4" className="f glow" style={{ opacity: 0.3 }} />}</g>)}
      <T x="120" y="100" m>eka-aluminium → gallium (69.7)</T><T x="200" y="116" m>eka-silicon → germanium (72.6)</T><T x="160" y="142" m>properties predicted before discovery</T></Svg>) },
  wohler: { cap: 'Heating ammonium cyanate (inorganic) gave urea (a substance of living things): same atoms, arranged differently; a "vital force" is no longer required.', el: (
    <Svg><rect x="20" y="30" width="110" height="64" rx="10" className="s f2" /><T x="75" y="58" s={12}>NH₄⁺ OCN⁻</T><T x="75" y="78" m>ammonium cyanate</T><path d="M136 62 H184 l-10 -8 M184 62 l-10 8" className="s glow" style={{ strokeWidth: 3 }} /><T x="160" y="48" m>heat</T>
      <rect x="190" y="30" width="110" height="64" rx="10" className="s f2" /><T x="245" y="58" s={12}>CO(NH₂)₂</T><T x="245" y="78" m>urea</T><T x="160" y="122" m>C₁ H₄ N₂ O₁ on both sides</T></Svg>) },
  haber: { cap: 'N₂ + 3H₂ ⇌ 2NH₃ over an iron catalyst, ~450 °C, ~200 atm: taking nitrogen from the air; the atoms balance on both sides.', el: (
    <Svg>{[[40, 40], [40, 84]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="10" className="f" style={{ opacity: 0.5 }} /><circle cx={x + 16} cy={y} r="10" className="f" style={{ opacity: 0.5 }} /></g>)}
      <circle cx="30" cy="124" r="10" className="f" /><circle cx="46" cy="124" r="10" className="f" /><T x="86" y="62" s={14}>+</T><T x="86" y="130" s={11}>N₂ + 3 H₂</T>{[0, 1, 2].map((i) => <circle key={i} cx={110 + i * 22} cy="36" r="7" className="f glow" style={{ animationDelay: `${i * 0.3}s` }} />)}
      <path d="M150 74 H196 l-10 -8 M196 74 l-10 8 M196 82 H150" className="s" /><T x="173" y="62" m>Fe · 450 °C</T><T x="173" y="98" m>200 atm</T>{[0, 1].map((i) => <g key={i}><circle cx={230 + i * 44} cy="72" r="12" className="f" /><circle cx={224 + i * 44} cy="52" r="6" className="f" style={{ opacity: 0.6 }} /><circle cx={242 + i * 44} cy="54" r="6" className="f" style={{ opacity: 0.6 }} /><circle cx={230 + i * 44} cy="92" r="6" className="f" style={{ opacity: 0.6 }} /></g>)}<T x="250" y="124" s={11}>2 NH₃</T></Svg>) },
  bakelite: { cap: 'Phenol and formaldehyde link into a 3D network when heated: the first synthetic plastic, hard, electrically insulating, and it does not melt again.', el: (() => { const C = () => { const t = useClock(5), n = Math.floor((t % 6) * 4); const P = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) P.push([50 + c * 44, 24 + r * 30]); const E = []; P.forEach((p, i) => { if (i % 6 < 5) E.push([i, i + 1]); if (i < 18) E.push([i, i + 6]); }); return (
    <Svg>{E.map(([a, b], i) => <line key={i} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} className="s" style={{ opacity: i < n ? 1 : 0, strokeWidth: 2.2 }} />)}{P.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" className="f" />)}<T x="160" y="144" m>{n} / {E.length} bonds · more links, harder</T></Svg>); }; return <C />; })() },
  liion: { cap: 'When charging, Li⁺ ions go from the positive electrode to the graphite; in use they go back while electrons run through the outer circuit to supply power.', el: (() => { const C = () => { const t = useClock(1), s = 0.5 + 0.5 * Math.sin(t * 0.9); return (
    <Svg><rect x="30" y="30" width="70" height="80" className="s f2" /><rect x="220" y="30" width="70" height="80" className="s f2" /><T x="65" y="72" m>graphite</T><T x="255" y="72" m>LiCoO₂</T>{Array.from({ length: 6 }, (_, i) => <circle key={i} cx={106 + (1 - s) * 4 + s * 100 + (i % 2) * 6} cy={42 + i * 12} r="4" className="f" />)}
      <path d="M65 30 V12 H255 V30" className="s" />{Array.from({ length: 4 }, (_, i) => <circle key={i} cx={80 + ((1 - s) * 170 + i * 20) % 170} cy="12" r="2.5" style={{ fill: '#fff' }} />)}<T x="160" y="136" m>Li⁺ ions through electrolyte · electrons through outer circuit</T></Svg>); }; return <C />; })() }
};
