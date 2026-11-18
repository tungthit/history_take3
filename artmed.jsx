// Illustrations for medicine. Where a picture shows numbers (blood compatibility, glucose, circulation volume),
// they are computed from the rule or the model they illustrate; historical figures are rounded and marked "~".
import { useMemo } from 'react';
import { Svg, T, D2R } from './sciart.jsx';
import { clamp, path, rng, useClock } from './artkit.jsx';

const Step = ({ x, y, w = 74, h = 40, t, s = 10 }) => <g><rect x={x} y={y} width={w} height={h} rx="7" className="s f2" /><T x={x + w / 2} y={y + h / 2 + 4} s={s}>{t}</T></g>;
const Arrow = ({ x1, y1, x2, y2 }) => <path d={`M${x1} ${y1} L${x2} ${y2}`} className="s" style={{ strokeWidth: 2.2 }} />;
const Bars = ({ list, max, unit = '' }) => list.map(([l, v, lab], i) => { const n = list.length, w = 200 / n - 12, h = (v / max) * 84; return <g key={l}><rect x={40 + i * (200 / n)} y={112 - h} width={w} height={h} className="f" style={{ opacity: 0.85 }} /><T x={40 + i * (200 / n) + w / 2} y="126" m>{l}</T><T x={40 + i * (200 / n) + w / 2} y={106 - h} s={10}>{lab || `${v}${unit}`}</T></g>; });

const Abo = () => {
  const types = ['O', 'A', 'B', 'AB'], ag = { O: '', A: 'A', B: 'B', AB: 'AB' }, ok = (d, r) => ag[d].split('').every((a) => ag[r].includes(a));
  const t = useClock(1), hi = Math.floor(t / 1.3) % 4;
  return (
    <Svg>{types.map((r, j) => <T key={r} x={106 + j * 36} y="20" s={11}>{r}</T>)}<T x="42" y="14" m a="middle">gets ▸ gives ▾</T>
      {types.map((d, i) => <g key={d}><T x="42" y={46 + i * 24} s={11}>{d}</T>{types.map((r, j) => <rect key={r} x={92 + j * 36} y={30 + i * 24} width="28" height="20" rx="4" className={ok(d, r) ? 'f' : 's'} style={{ opacity: ok(d, r) ? (hi === i ? 1 : 0.55) : 0.3 }} />)}</g>)}
      <T x="262" y="60" m>O can give to all</T><T x="262" y="78" m>AB can receive from all</T><T x="262" y="100" m>rule: the donor's antigens</T><T x="262" y="112" m>must be present in the recipient</T></Svg>
  );
};

const Glucose = () => {
  const t = useClock(6), tt = (t % 10) / 10 * 8;
  const sim = (k) => { let G = 5, out = []; for (let m = 0; m < 80; m++) { const h = m / 10; const meal = [0.5, 3.5, 6].some((s) => h >= s && h < s + 0.4) ? 5 : 0; G += (meal - k * (G - 4.5) * 0.9) * 0.1 * 0.5 + (k < 0.5 ? 0.02 : 0); out.push(G); } return out; };
  const a = useMemo(() => sim(1.4), []), b = useMemo(() => sim(0.15), []), X = (i) => 30 + (i / 80) * 250, Y = (g) => 130 - clamp(g, 3, 20) * 5.4;
  const cur = Math.min(79, Math.floor(tt * 10));
  return (
    <Svg><path d={path(a.slice(0, cur + 1).map((g, i) => [X(i), Y(g)]))} className="s" /><path d={path(b.slice(0, cur + 1).map((g, i) => [X(i), Y(g)]))} className="s" style={{ stroke: '#ff8a8a' }} />
      <T x="120" y="24" m a="middle"><tspan style={{ fill: '#ff8a8a' }}>no insulin: blood sugar stuck high</tspan></T><T x="120" y="38" m a="middle">with insulin: back to normal after each meal</T>
      <T x="160" y="144" m>illustration of a simple blood-sugar model</T></Svg>
  );
};

const Hearts = () => {
  const t = useClock(1), k = 1 + 0.07 * Math.max(0, Math.sin(t * 6)) ;
  const heart = (x, y, c) => <path d="M0 14 C-34 -8 -14 -34 0 -14 C14 -34 34 -8 0 14z" transform={`translate(${x} ${y}) scale(${k})`} className="s f2" style={{ stroke: c }} />;
  return (
    <Svg>{heart(70, 66)}{heart(240, 66)}<Arrow x1="110" y1="66" x2="196" y2="66" /><T x="153" y="56" m>transplant</T><path d={path(Array.from({ length: 81 }, (_, i) => { const u = (i / 80 * 3 + t * 0.4) % 1, y = u < 0.45 ? 0 : u < 0.5 ? -(u - 0.45) * 160 : u < 0.55 ? (u - 0.5) * 300 - 8 : 0; return [30 + i * 3.5, 120 - y]; }))} className="s" /><T x="160" y="146" m>3 Dec 1967: first human heart transplant, Cape Town</T></Svg>
  );
};

const Circ = () => {
  const t = useClock(1), ml = 70, bpm = 72;
  return (
    <Svg><path d="M160 30 C 250 30 270 116 160 120 C 50 116 70 30 160 30" className="s" style={{ strokeWidth: 2.4, opacity: 0.5 }} /><path d="M148 20 C 130 4 112 28 148 54 C 184 28 166 4 148 20z" className="f" style={{ opacity: 0.8 }} transform="translate(12 30) scale(.8)" />
      {Array.from({ length: 14 }, (_, i) => { const u = (i / 14 + t * 0.12) % 1, a = u * 2 * Math.PI; return <circle key={i} cx={160 + Math.sin(a) * 90} cy={75 - Math.cos(a) * 45} r="3" style={{ fill: u < 0.5 ? '#ff8a8a' : '#7ad7ff' }} />; })}
      <T x="160" y="76" s={11}>{ml} ml × {bpm}/min</T><T x="160" y="90" m>= {((ml * bpm * 60) / 1000).toFixed(0)} liters/hour?</T><T x="160" y="146" m>more than the body's whole mass: blood must circulate</T></Svg>
  );
};

const Snow = () => {
  const t = useClock(5), dots = useMemo(() => { const r = rng(21), P = []; for (let i = 0; i < 80; i++) { const a = r() * 6.28, d = (r() ** 1.6) * (i < 62 ? 50 : 100); P.push([160 + Math.cos(a) * d * 1.3, 75 + Math.sin(a) * d * 0.8]); } return P; }, []), n = Math.min(80, Math.floor((t % 9) * 12));
  return (
    <Svg>{[30, 60, 90, 120].map((y) => <line key={y} x1="20" y1={y} x2="300" y2={y} className="s" style={{ opacity: 0.2 }} />)}{[70, 130, 190, 250].map((x) => <line key={x} x1={x} y1="10" x2={x} y2="140" className="s" style={{ opacity: 0.2 }} />)}
      {dots.slice(0, n).map(([x, y], i) => <rect key={i} x={x - 2} y={y - 2} width="4" height="4" className="f" style={{ fill: '#ff8a8a' }} />)}<circle cx="160" cy="75" r="6" className="s f2" style={{ stroke: '#7ad7ff' }} /><T x="160" y="64" m>Broad St pump</T><T x="160" y="146" m>cases cluster around one pump: the source is water, not "bad air" (illustration)</T></Svg>
  );
};

const Pasteur = () => {
  const t = useClock(1);
  return (
    <Svg>{[0, 1].map((c) => <g key={c}><ellipse cx={70 + c * 150} cy="104" rx="30" ry="22" className="s f2" /><ellipse cx={70 + c * 150} cy="112" rx="22" ry="12" className="f" style={{ opacity: c ? 0.2 : 0.7 }} />
      <path d={c ? `M${70 + c * 150} 84 q 0 -34 24 -34 q 18 0 18 18` : `M${70 + c * 150} 84 v-70`} className="s" style={{ strokeWidth: 3 }} />
      {Array.from({ length: 5 }, (_, i) => { const u = ((t * 0.3 + i / 5) % 1); return c ? (u < 0.6 ? <circle key={i} cx={220 + 18 * (u / 0.6) - 18} cy={50 - 4 * u} r="2" style={{ fill: '#fff' }} /> : null) : <circle key={i} cx={70 + c * 150} cy={14 + u * 90} r="2" style={{ fill: '#fff' }} />; })}</g>)}
      <T x="70" y="144" m>straight neck: dust falls in the broth → cloudy</T><T x="220" y="144" m>swan neck: dust is trapped in the bend → clear</T></Svg>
  );
};

const Koch = () => (
  <Svg>{['1. germ in every case', '2. isolate, pure culture', '3. inject healthy host: disease', '4. re-isolate: same germ'].map((l, i) => <g key={l}><rect x={20 + (i % 2) * 150} y={14 + Math.floor(i / 2) * 56} width="140" height="44" rx="8" className="s f2" /><T x={90 + (i % 2) * 150} y={40 + Math.floor(i / 2) * 56} s={10}>{l}</T></g>)}
    <path d="M160 36 h-0 M90 58 v12 M250 58 v12" className="s" /><T x="160" y="144" m>four criteria to prove a bacterium causes a disease</T></Svg>
);

const Plague = () => {
  const t = useClock(1);
  return (
    <Svg>{[['rat', 160, 28], ['flea', 56, 118], ['human', 264, 118]].map(([l, x, y]) => <g key={l}><circle cx={x} cy={y} r="22" className="s f2" /><T x={x} y={y + 4} s={11}>{l}</T></g>)}
      {[[160, 28, 56, 118], [56, 118, 264, 118], [264, 118, 160, 28]].map(([a, b, c, d], i) => { const u = (t * 0.4 + i / 3) % 1; return <g key={i}><Arrow x1={a} y1={b} x2={c} y2={d} /><circle cx={a + (c - a) * u} cy={b + (d - b) * u} r="3.6" className="f" /></g>; })}
      <T x="160" y="76" s={10}>Yersinia pestis</T><T x="160" y="92" m>Yersin isolated it in 1894 from a groin bubo in Hong Kong</T></Svg>
  );
};

const Cases = () => {
  const t = useClock(3), k = (t % 5) / 5;
  return (
    <Svg><circle cx="160" cy="70" r={10 + k * 50} className="s" style={{ opacity: 1 - k, stroke: '#7ad7ff' }} /><circle cx="160" cy="70" r="7" style={{ fill: '#ff8a8a' }} />{Array.from({ length: 16 }, (_, i) => { const a = i * 22.5 * D2R, r = 24 + (i % 3) * 14; return <circle key={i} cx={160 + Math.cos(a) * r * 1.6} cy={70 + Math.sin(a) * r} r="3" style={{ fill: 10 + k * 50 > r * 1.2 ? '#7ad7ff' : '#e8efff', opacity: 0.8 }} />; })}
      <T x="160" y="144" m>ring vaccination around cases: the virus runs out of people to infect (smallpox eradicated 1980)</T></Svg>
  );
};

export const ART_MED = {
  edwin: { cap: 'A papyrus records 48 injury cases: examine, diagnose, then classify as "treatable", "maybe treatable", "untreatable".', el: (
    <Svg><rect x="30" y="14" width="260" height="70" rx="6" className="s f2" />{Array.from({ length: 4 }, (_, i) => <path key={i} d={`M46 ${30 + i * 15} h${150 + (i % 2) * 40}`} className="s" style={{ strokeDasharray: '2 4', opacity: 0.6 }} />)}
      {[['treatable', '#9dffa0'], ['maybe', '#ffd27a'], ['hopeless', '#ff8a8a']].map(([l, c], i) => <g key={l}><rect x={36 + i * 88} y="96" width="80" height="26" rx="6" style={{ fill: c, opacity: 0.8 }} /><T x={76 + i * 88} y="113" s={10}><tspan style={{ fill: '#0b1020' }}>{l}</tspan></T></g>)}<T x="160" y="144" m>~1600 BCE · examine → diagnose → prognosis</T></Svg>) },
  hippo: { cap: 'Observing at the bedside, recording the course (fever rising, peaking, falling) and predicting the outcome, instead of making offerings.', el: (
    <Svg><path d={path(Array.from({ length: 80 }, (_, i) => [30 + i * 3, 110 - 40 * Math.exp(-((i - 38) ** 2) / 260) - 8 * Math.sin(i * 0.5)]))} className="s" /><line x1="30" y1="110" x2="270" y2="110" className="s" style={{ opacity: 0.3 }} /><circle cx="144" cy="70" r="5" className="f glow" /><T x="144" y="56" m>"crisis" day</T>
      <T x="160" y="134" m>temperature by day: record, compare, predict</T></Svg>) },
  galen: { cap: 'Galen cut the nerve in the neck of a squealing pig: the squeal stopped; proof that commands from the brain control the body through nerves.', el: (
    <Svg><circle cx="60" cy="40" r="26" className="s f2" /><T x="60" y="44" m>brain</T><path d="M60 66 C 60 100 120 90 190 90" className="s" style={{ strokeWidth: 3 }} /><path d="M120 76 l16 28 M136 76 l-16 28" className="s" style={{ stroke: '#ff8a8a', strokeWidth: 3 }} />
      <ellipse cx="236" cy="88" rx="26" ry="18" className="s f2" /><T x="236" y="92" m>larynx</T><path d="M270 70 q 14 -10 22 -26 M274 82 q 20 -4 30 -18" className="s" style={{ opacity: 0.2 }} /><T x="160" y="136" m>cut the nerve → the pig still struggles but is silent</T></Svg>) },
  razi: { cap: 'Al-Razi told smallpox from measles by signs: large blisters or small rash, what kind of fever; the first clinical description.', el: (
    <Svg>{[['smallpox', 90, 7], ['measles', 230, 3.2]].map(([l, x, rs], i) => <g key={l}><circle cx={x} cy="66" r="44" className="s f2" />{Array.from({ length: i ? 36 : 14 }, (_, k) => { const a = k * 2.399, d = 8 + ((k * 17) % 34); return <circle key={k} cx={x + Math.cos(a) * d} cy={66 + Math.sin(a) * d * 0.9} r={rs} className="f" style={{ opacity: 0.75, fill: '#ff8a8a' }} />; })}<T x={x} y="130" s={11}>{l}</T></g>)}<T x="160" y="148" m>deep, large blisters · small, flat rash</T></Svg>) },
  sina: { cap: 'In "The Canon of Medicine", Ibn Sina stated: people arriving from an area with plague must be isolated for 40 days (arbaʿin, later "quarantine").', el: (() => { const C = () => { const t = useClock(1), d = Math.floor((t * 6) % 41); return (<Svg><path d="M50 90 h120 l-14 20 h-92z" className="s f2" /><line x1="110" y1="90" x2="110" y2="40" className="s" /><path d="M110 42 l34 16 l-34 14z" className="s f2" /><path d="M20 118 q 20 -8 40 0 t 40 0 t 40 0 t 40 0" className="s" style={{ opacity: 0.4 }} /><T x="250" y="70" s={22}>{d}</T><T x="250" y="92" m>/ 40 days</T><rect x="204" y="100" width="92" height="8" rx="4" className="s" /><rect x="204" y="100" width={(d / 40) * 92} height="8" rx="4" className="f" /><T x="160" y="144" m>wait the full days; only if no one falls ill may they land</T></Svg>); }; return <C />; })() },
  vesalius: { cap: 'Vesalius dissected bodies himself and drew the skeleton and muscles exactly as seen, correcting many errors of Galen (who dissected animals).', el: (
    <Svg><circle cx="160" cy="18" r="11" className="s f2" /><path d="M160 30 V90" className="s" style={{ strokeWidth: 4 }} />{[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M160 ${38 + i * 9} q -22 4 -26 14 M160 ${38 + i * 9} q 22 4 26 14`} className="s" />)}<path d="M138 92 h44 l-6 14 h-32z" className="s f2" /><path d="M146 106 L138 148 M174 106 L182 148 M134 44 L112 84 L100 120 M186 44 L208 84 L220 120" className="s" style={{ strokeWidth: 3 }} />
      <T x="60" y="70" m>De humani corporis fabrica, 1543</T></Svg>) },
  harvey: { cap: 'Harvey calculated: the heart pumps ~70 ml per beat, 72 beats/min → several hundred liters/hour, more than all we eat and drink; blood can only circle around.', el: <Circ /> },
  jenner: { cap: 'Cowpox pus inoculated into the boy James Phipps (1796); he was later exposed to smallpox and did not catch it: the origin of the word "vaccine" (vacca = cow).', el: (
    <Svg><Step x={14} y={20} w={84} t="cowpox pustule" /><Arrow x1="98" y1="40" x2="124" y2="40" /><Step x={124} y={20} w={84} t="inoculate boy" /><Arrow x1="208" y1="40" x2="234" y2="40" /><Step x={234} y={20} w={74} t="few weeks" /><Arrow x1="271" y1="60" x2="271" y2="82" />
      <Step x={196} y={84} w={112} h={44} t="exposed to smallpox: immune" /><T x="90" y="112" m>vacca = cow → vaccine</T></Svg>) },
  semmel: { cap: 'Ward A (doctors, coming from the autopsy room) had ~10% deaths; ward B (midwives) ~4%. After hand washing with chlorine water (April 1847), ~1–2%.', el: (() => { const C = () => { const t = useClock(3), k = clamp((t % 6) / 2, 0, 1); return (<Svg><Bars list={[['ward A', 10 * k, `~10%`], ['ward B', 4 * k, '~4%'], ['A after washing', 1.5 * k, '~1–2%']]} max={12} /><T x="270" y="70" m>maternal deaths</T></Svg>); }; return <C />; })() },
  snow: { cap: 'Dots for cholera cases on a map of Soho, 1854: clustered around one pump. Remove the pump handle and the outbreak stopped.', el: <Snow /> },
  pasteur: { cap: 'Swan-neck flask: air gets through but dust and microbes are trapped in the bend, so the broth stays clear, while a straight-neck flask turns cloudy: living things do not arise spontaneously.', el: <Pasteur /> },
  lister: { cap: 'Spraying carbolic acid on wounds and instruments: deaths after amputation fell from ~45% to ~15% in the cases he reported.', el: (() => { const C = () => { const t = useClock(3), k = clamp((t % 6) / 2, 0, 1); return (<Svg><Bars list={[['before', 45 * k, '~45%'], ['after antisepsis', 15 * k, '~15%']]} max={50} /><T x="270" y="40" m>carbolic acid</T><path d="M262 54 l14 14 M280 50 l8 6 M284 60 l8 2" className="s" /></Svg>); }; return <C />; })() },
  ether: { cap: 'Breathing ether vapor, then painless surgery: 16 Oct 1846 in Boston; surgery was no longer torture.', el: (() => { const C = () => { const t = useClock(1), p = clamp(1 - ((t % 8) / 4), 0, 1); return (<Svg><path d="M70 40 h40 v14 a28 28 0 1 1 -40 0z" className="s f2" /><ellipse cx="90" cy="92" rx="18" ry="10" className="f" style={{ opacity: 0.5 }} />{Array.from({ length: 5 }, (_, i) => <circle key={i} cx={90 + Math.sin(t * 2 + i) * 6} cy={36 - ((t * 20 + i * 12) % 40)} r="2.2" style={{ fill: '#fff', opacity: 0.8 }} />)}
    <T x="90" y="136" m>ether flask</T><rect x="190" y="30" width="26" height="90" className="s" /><rect x="190" y={30 + (1 - p) * 90} width="26" height={p * 90} className="f" style={{ fill: '#ff8a8a' }} /><T x="203" y="24" m>pain</T><T x="260" y="76" m>inhale ether → no pain felt</T></Svg>); }; return <C />; })() },
  nightingale: { cap: 'Nightingale drew a polar-area chart: each wedge is a month, length ∝ √deaths; most were from disease, not wounds (illustrative data following the original shape).', el: (() => { const C = () => { const t = useClock(3), k = clamp(t / 2, 0, 1), dis = [10, 14, 24, 26, 20, 16, 12, 9, 7, 6, 5, 8], wd = [2, 3, 4, 3, 2, 2, 2, 1, 2, 2, 1, 2]; return (<Svg>{dis.map((v, i) => { const a0 = (i * 30 - 90) * D2R, a1 = ((i + 1) * 30 - 90) * D2R, r = Math.sqrt(v) * 13 * k, r2 = Math.sqrt(wd[i]) * 13 * k, P = (rr, a) => `${(160 + Math.cos(a) * rr).toFixed(1)} ${(75 + Math.sin(a) * rr).toFixed(1)}`; return <g key={i}><path d={`M160 75 L${P(r, a0)} A${r} ${r} 0 0 1 ${P(r, a1)} Z`} className="f" style={{ opacity: 0.55 }} /><path d={`M160 75 L${P(r2, a0)} A${r2} ${r2} 0 0 1 ${P(r2, a1)} Z`} className="f" style={{ fill: '#ff8a8a', opacity: 0.8 }} /></g>; })}<T x="274" y="40" m a="middle">disease</T><T x="274" y="56" m a="middle"><tspan style={{ fill: '#ff8a8a' }}>wounds</tspan></T></Svg>); }; return <C />; })() },
  eijkman: { cap: 'Chickens fed polished white rice got a disease like beriberi; fed brown rice they recovered: the bran contains an essential substance (later called vitamin B1).', el: (
    <Svg>{[['white rice', 80, 0.15], ['brown rice', 240, 0.9]].map(([l, x, o]) => <g key={l}><path d={`M${x - 36} 90 h72 a36 30 0 0 1 -72 0z`} className="s f2" /><ellipse cx={x} cy="90" rx="30" ry="6" className="f" style={{ opacity: o }} /><ellipse cx={x} cy="52" rx="18" ry="14" className="s f2" /><circle cx={x + 8} cy="46" r="2" className="f" /><path d={`M${x + 18} 52 l12 3 l-12 3`} className="s" /><T x={x} y="132" m>{l}</T><T x={x} y="28" m>{o < 0.5 ? 'weak, leg paralysis' : 'healthy'}</T></g>)}</Svg>) },
  landsteiner: { cap: 'Mixing the blood of one person with the serum of another, some combinations clump: four groups A, B, AB, O; transfusion works only when the antigens of the donor are already present in the recipient (table computed from the rule).', el: <Abo /> },
  fleming: { cap: 'Around the Penicillium mold is a clear ring with no staphylococcus bacteria: the mold secretes a bacteria-killing substance.', el: (() => { const C = () => { const t = useClock(3), r = 18 + 14 * Math.min(1, (t % 6) / 3); return (<Svg><circle cx="160" cy="72" r="62" className="s f2" />{Array.from({ length: 70 }, (_, i) => { const a = i * 2.399, d = 8 + ((i * 29) % 56); return d > r + 6 ? <circle key={i} cx={160 + Math.cos(a) * d} cy={72 + Math.sin(a) * d * 0.98} r="3.4" className="f" style={{ opacity: 0.6 }} /> : null; })}<circle cx="160" cy="72" r="10" style={{ fill: '#9dffa0', opacity: 0.8 }} /><T x="160" y="146" m>clear ring: bacteria dead · 1928</T></Svg>); }; return <C />; })() },
  insulin: { cap: 'Without insulin, blood sugar after a meal stays high; with insulin it falls back to normal (simple blood-sugar model). Leonard Thompson, aged 14, was injected in January 1922.', el: <Glucose /> },
  salk: { cap: 'Inactivated polio vaccine, tested on over a million children in 1954: US cases fell from ~58,000 (1952) to under ~1,000 (early 1960s).', el: (() => { const C = () => { const t = useClock(3), k = clamp((t % 6) / 2, 0, 1); return (<Svg><Bars list={[['1952', 58 * k, '~58,000'], ['1957', 5.5 * k, '~5,500'], ['1962', 0.9 * k, '~900']]} max={60} /></Svg>); }; return <C />; })() },
  smallpox: { cap: 'Ring vaccination campaign: find a case, then vaccinate everyone around them; last natural case 1977, WHO declared eradication in 1980.', el: <Cases /> },
  heart: { cap: 'Barnard replaced the heart of Louis Washkansky (3 Dec 1967, Cape Town); the patient lived 18 days, opening the field of heart transplants.', el: <Hearts /> },
  ct: { cap: 'An X-ray source and detector rotate around the body, recording many slice measurements; a computer assembles them into a cross-section image.', el: (() => { const C = () => { const t = useClock(1), a = t * 1.2; return (<Svg><circle cx="100" cy="75" r="58" className="s" /><ellipse cx="100" cy="75" rx="32" ry="26" className="s f2" /><circle cx="94" cy="72" r="6" className="f" style={{ opacity: 0.6 }} /><circle cx={100 + Math.cos(a) * 58} cy={75 + Math.sin(a) * 58} r="6" className="f" /><rect x={100 - Math.cos(a) * 58 - 6} y={75 - Math.sin(a) * 58 - 6} width="12" height="12" className="s f2" /><line x1={100 + Math.cos(a) * 58} y1={75 + Math.sin(a) * 58} x2={100 - Math.cos(a) * 58} y2={75 - Math.sin(a) * 58} className="s" style={{ strokeDasharray: '4 4', opacity: 0.6 }} />
      <rect x="190" y="30" width="100" height="90" rx="6" style={{ fill: '#02060e' }} className="s" />{Array.from({ length: 20 }, (_, i) => <circle key={i} cx={240 + Math.cos(i * 0.9) * (6 + (i % 6) * 6)} cy={75 + Math.sin(i * 0.9) * (4 + (i % 5) * 6)} r={2 + (i % 4)} className="f" style={{ opacity: 0.25 + 0.15 * (i % 4) }} />)}<T x="240" y="136" m>reconstructed slice</T></Svg>); }; return <C />; })() },
  mri: { cap: 'In a strong magnetic field, hydrogen protons line up and spin around that direction at the Larmor frequency: 1.5 T → ~64 MHz; a radio pulse tips them over, then the signal is picked up as they return.', el: (() => { const C = () => { const t = useClock(1); return (<Svg><line x1="90" y1="140" x2="90" y2="14" className="s" style={{ strokeWidth: 3 }} /><path d="M82 24 l8 -12 l8 12" className="s" /><T x="62" y="22" m>B₀</T><ellipse cx="90" cy="70" rx="30" ry="9" className="s" style={{ opacity: 0.3 }} /><line x1="90" y1="100" x2={90 + Math.cos(t * 5) * 30} y2={70 + Math.sin(t * 5) * 9 - 10} className="s" style={{ strokeWidth: 3 }} /><circle cx={90 + Math.cos(t * 5) * 30} cy={70 + Math.sin(t * 5) * 9 - 10} r="5" className="f" />
      <T x="230" y="48" s={11}>f = 42.58 MHz/T × B₀</T><T x="230" y="70" m>1.5 T → {(42.58 * 1.5).toFixed(1)} MHz</T><T x="230" y="86" m>3 T → {(42.58 * 3).toFixed(1)} MHz</T></Svg>); }; return <C />; })() },
  hpylori: { cap: 'The spiral bacterium Helicobacter pylori lives in the stomach mucus layer; Marshall drank it himself to prove it causes ulcers.', el: (() => { const C = () => { const t = useClock(1); return (<Svg><path d="M20 120 H300" className="s" style={{ strokeWidth: 4 }} /><rect x="20" y="96" width="280" height="20" className="f2" style={{ fill: 'rgba(255,200,100,.18)' }} /><T x="60" y="108" m>mucus</T><T x="160" y="30" m>stomach acid</T>
      {[0, 1, 2].map((i) => { const x = 70 + i * 80 + Math.sin(t + i) * 8; return <g key={i}><path d={path(Array.from({ length: 24 }, (_, k) => [x + k * 2.2, 100 + Math.sin(k * 0.9 + t * 4 + i) * 4]))} className="s" style={{ strokeWidth: 4 }} /><path d={`M${x} 100 q -8 -6 -14 -2 q -4 -4 -8 2`} className="s" /></g>; })}<T x="160" y="144" m>spiral + flagella: drilling through the mucus</T></Svg>); }; return <C />; })() },
  hiv: { cap: 'HIV attaches to the CD4 receptor on T cells, injects its RNA, then the reverse transcriptase enzyme rewrites it as DNA inserted into the cell genes: the immune system is gradually exhausted.', el: (
    <Svg><ellipse cx="220" cy="80" rx="80" ry="60" className="s f2" />{[0, 1, 2, 3].map((i) => <path key={i} d={`M${160 + i * 14} 30 v14`} className="s" style={{ strokeWidth: 3 }} />)}<circle cx="160" cy="30" r="0" /><circle cx="90" cy="60" r="34" className="s f2" />{Array.from({ length: 12 }, (_, i) => <line key={i} x1={90 + Math.cos(i * 30 * D2R) * 34} y1={60 + Math.sin(i * 30 * D2R) * 34} x2={90 + Math.cos(i * 30 * D2R) * 44} y2={60 + Math.sin(i * 30 * D2R) * 44} className="s" style={{ strokeWidth: 3 }} />)}
      <path d="M100 60 q 6 -4 12 0 t 12 0" className="s" /><T x="90" y="64" m>RNA</T><T x="220" y="78" s={11}>T cell (CD4)</T><T x="90" y="116" m>HIV virus</T><T x="160" y="140" m>RNA → DNA via reverse transcriptase</T></Svg>) },
  artemisinin: { cap: 'Extracted from sweet wormwood (Project 523, Tu Youyou, 1972): it contains an O–O peroxide bridge; extracted with ether at low temperature because heating destroys it.', el: (
    <Svg><path d="M70 130 q 0 -50 30 -76 M70 130 q 18 -34 42 -52 M70 130 q -14 -30 -38 -44 M84 100 q 30 -6 44 -30" className="s" style={{ strokeWidth: 2.4 }} /><T x="70" y="146" m>sweet wormwood</T>
      <path d="M170 70 l16 -10 l16 10 v20 l-16 10 l-16 -10z M202 70 l16 -10 l16 10 v20 l-16 10 l-16 -10z" className="s f2" /><line x1="186" y1="80" x2="218" y2="80" className="s" style={{ stroke: '#ff8a8a', strokeWidth: 4 }} /><T x="202" y="52" m>O–O</T><circle cx="262" cy="120" r="18" className="s f2" /><circle cx="266" cy="116" r="5" className="f" /><T x="262" y="148" m>malaria parasite</T></Svg>) },
  ort: { cap: 'Glucose and sodium enter gut cells together through a shared channel, pulling water along: drinking a sugar-salt solution treats dehydration from diarrhea.', el: (() => { const C = () => { const t = useClock(1), u = (t * 0.5) % 1; return (<Svg><rect x="30" y="86" width="260" height="30" rx="6" className="s f2" /><T x="160" y="136" m>gut cell</T><rect x="150" y="80" width="20" height="40" rx="6" className="s" style={{ strokeWidth: 3 }} />{[0, 1, 2].map((i) => { const v = (u + i / 3) % 1; return <g key={i}><circle cx={150 + v * 20} cy={20 + v * 76} r="4" className="f" /><circle cx={170 - v * 0} cy={14 + v * 82} r="3" style={{ fill: '#7ad7ff' }} /></g>; })}
      <T x="92" y="40" m>Na⁺ (blue) + glucose (yellow)</T><T x="220" y="56" m>water follows</T></Svg>); }; return <C />; })() },
  mrna: { cap: 'mRNA wrapped in a lipid particle enters the cell; ribosomes read it to make the virus spike protein; the immune system learns to recognize it, then remembers: the mRNA breaks down after a few days.', el: (() => { const C = () => { const t = useClock(1), u = (t * 0.25) % 1; return (<Svg><circle cx="50" cy="75" r="24" className="s f2" /><path d="M36 70 q 6 -8 12 0 t 12 0" className="s" style={{ stroke: '#ffd27a' }} /><T x="50" y="116" m>lipid particle + mRNA</T><path d="M82 75 H118" className="s" style={{ strokeWidth: 2.4 }} />
      <rect x="120" y="30" width="110" height="90" rx="12" className="s f2" /><path d="M128 75 H200" className="s" style={{ stroke: '#ffd27a', strokeDasharray: '8 4' }} /><ellipse cx={128 + u * 70} cy="75" rx="10" ry="7" className="f" /><T x="175" y="108" m>ribosome</T>{[0, 1, 2].map((i) => <g key={i} style={{ opacity: u > i / 3 ? 1 : 0.15 }}><circle cx={252 + (i % 2) * 22} cy={44 + i * 28} r="7" className="f" style={{ fill: '#ff8a8a' }} /></g>)}<T x="270" y="130" m>spike protein</T></Svg>); }; return <C />; })() }
};

ART_MED.koch = { cap: 'The four Koch postulates (from his work on anthrax, then tuberculosis): the bacterium is in every case, can be grown pure, causes disease when put into a healthy host, and is re-isolated as the same one.', el: <Koch /> };
ART_MED.yersin = { cap: 'Plague spreads in the cycle rat → flea → human; Alexandre Yersin found the bacillus causing it in Hong Kong in 1894 (he later settled and founded an institute in Nha Trang).', el: <Plague /> };
