// Illustrations for mathematics and the late computing milestones. Several are small live simulations that
// compute the real thing (RSA arithmetic, entropy, a series, a forward pass) rather than playing a canned loop.
import { useMemo } from 'react';
import { Svg, T, D2R } from './sciart.jsx';
import { clamp, path, useClock } from './artkit.jsx';

const Rects = ({ list }) => list.map(([x, y, w, h, c], i) => <rect key={i} x={x} y={y} width={w} height={h} className={c || 's f2'} />);

const Fib = () => {
  const arcs = [[0, 0, 1, 1, 1], [1, 1, 2, 0, 1], [2, 0, 0, -2, 2], [0, -2, -3, 1, 3], [-3, 1, 2, 6, 5], [2, 6, 10, -2, 8], [10, -2, -3, -15, 13]];
  const sq = [[0, 0, 1], [1, 0, 1], [0, -2, 2], [-3, -2, 3], [-3, 1, 5], [2, -2, 8], [-3, -15, 13]];
  const u = 6.2, ox = 24 + 3 * u, oy = 8 + 15 * u, X = (v) => ox + v * u, Y = (v) => oy + v * u;
  return (
    <Svg>{sq.map(([x, y, f], i) => <rect key={i} x={X(x)} y={Y(y)} width={f * u} height={f * u} className="s f2" style={{ opacity: 0.8 }} />)}
      <path d={arcs.map(([a, b, c, d, r], i) => `${i ? '' : `M${X(a)} ${Y(b)}`} A${r * u} ${r * u} 0 0 0 ${X(c)} ${Y(d)}`).join(' ')} className="s" style={{ strokeWidth: 3 }} />
      <T x="200" y="40" a="start" s={12}>1 1 2 3 5 8 13 21 …</T><T x="200" y="64" a="start" m>each = sum of previous two</T>
      <T x="200" y="92" a="start" s={12}>21 ÷ 13 ≈ {(21 / 13).toFixed(3)}</T><T x="200" y="110" a="start" m>ratio approaches 1.618...</T></Svg>
  );
};

const Series = () => {
  const t = useClock(5), k = 1 + (Math.floor(t / 1.6) % 4);
  const f = (x, n) => { let s = 0, term = x; for (let j = 0; j < n; j++) { s += term; term *= -x * x / ((2 * j + 2) * (2 * j + 3)); } return s; };
  const X = (x) => 30 + (x / (2 * Math.PI)) * 260, Y = (v) => 70 - clamp(v, -1.45, 1.45) * 46;
  const pts = (fn) => path(Array.from({ length: 121 }, (_, i) => { const x = (i / 120) * 2 * Math.PI; return [X(x), Y(fn(x))]; }));
  return (
    <Svg><line x1="30" y1="70" x2="290" y2="70" className="s" style={{ opacity: 0.4 }} /><path d={pts(Math.sin)} className="s" style={{ opacity: 0.45, strokeWidth: 3 }} />
      <path d={pts((x) => f(x, k))} className="s" style={{ stroke: '#ffd27a' }} />
      <T x="160" y="132" s={11}>{['x', 'x − x³/3!', 'x − x³/3! + x⁵/5!', '… + x⁷/7! (4 terms)'][k - 1]}</T><T x="160" y="146" m>more terms, closer to sin x</T></Svg>
  );
};

const modpow = (b, e, m) => { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = (r * b) % m; b = (b * b) % m; e >>= 1n; } return r; };
const Rsa = () => {
  const n = 3233n, e = 17n, d = 2753n, m = 65n, c = modpow(m, e, n), back = modpow(c, d, n);
  return (
    <Svg><rect x="120" y="20" width="80" height="62" rx="10" className="s f2" /><path d="M140 20 v-8 a20 20 0 0 1 40 0 v8" className="s" /><circle cx="160" cy="50" r="6" className="f glow" />
      <T x="60" y="40" m>public</T><T x="60" y="54" s={11}>n = {String(n)}, e = {String(e)}</T><T x="260" y="40" m>secret</T><T x="260" y="54" s={11}>d = {String(d)}</T>
      <T x="160" y="106" s={12}>{String(m)}<tspan baselineShift="super" fontSize="8">{String(e)}</tspan> mod {String(n)} = {String(c)}</T>
      <T x="160" y="124" s={12}>{String(c)}<tspan baselineShift="super" fontSize="8">{String(d)}</tspan> mod {String(n)} = {String(back)}</T><T x="160" y="144" m>anyone can lock; only who knows d (from the factors of n) can open</T></Svg>
  );
};

const Entropy = () => {
  const t = useClock(3), p = 0.5 + 0.48 * Math.sin(t * 0.7), H = (q) => (q <= 0 || q >= 1 ? 0 : -q * Math.log2(q) - (1 - q) * Math.log2(1 - q));
  const X = (q) => 40 + q * 240, Y = (h) => 120 - h * 90;
  return (
    <Svg><path d={path(Array.from({ length: 101 }, (_, i) => [X(i / 100), Y(H(i / 100))]))} className="s" /><line x1="40" y1="120" x2="280" y2="120" className="s" style={{ opacity: 0.4 }} />
      <line x1={X(p)} y1="120" x2={X(p)} y2={Y(H(p))} className="s" style={{ strokeDasharray: '3 3', opacity: 0.6 }} /><circle cx={X(p)} cy={Y(H(p))} r="5" className="f" />
      <T x="160" y="22" s={11}>p = {p.toFixed(2)} → H = {H(p).toFixed(2)} bit</T><T x="160" y="140" m>probability p of "heads" · fair coin (p = 0.5) is most surprising: 1 bit</T></Svg>
  );
};

const Qubit = () => {
  const t = useClock(1.5), th = ((t * 0.9) % (2 * Math.PI)), p1 = Math.sin(th / 2) ** 2;
  return (
    <Svg><circle cx="90" cy="72" r="52" className="s f2" /><line x1="90" y1="14" x2="90" y2="130" className="s" style={{ opacity: 0.35 }} /><line x1="38" y1="72" x2="142" y2="72" className="s" style={{ opacity: 0.35 }} />
      <line x1="90" y1="72" x2={90 + Math.sin(th) * 50} y2={72 - Math.cos(th) * 50} className="s" style={{ strokeWidth: 3 }} /><circle cx={90 + Math.sin(th) * 50} cy={72 - Math.cos(th) * 50} r="5" className="f" />
      <T x="90" y="12" m>|0⟩</T><T x="90" y="142" m>|1⟩</T>
      {[['0', 1 - p1, 190], ['1', p1, 240]].map(([l, v, x]) => <g key={l}><rect x={x} y={120 - v * 90} width="34" height={v * 90} className="f" /><rect x={x} y="30" width="34" height="90" className="s" style={{ opacity: 0.4 }} /><T x={x + 17} y="138" m>P(|{l}⟩)</T><T x={x + 17} y="24" s={10}>{(v * 100).toFixed(0)}%</T></g>)}
      <T x="270" y="80" m a="start" /></Svg>
  );
};

const NeuralNet = () => {
  const t = useClock(1), L = [3, 4, 4, 2], sg = (z) => 1 / (1 + Math.exp(-z));
  const W = (l, i, j) => Math.sin((l + 1) * 7.3 + i * 2.9 + j * 5.1) * 2.2;
  let act = [[Math.sin(t), Math.cos(t * 1.3), Math.sin(t * 0.7 + 1)].map((v) => 0.5 + 0.5 * v)];
  for (let l = 1; l < L.length; l++) act.push(Array.from({ length: L[l] }, (_, j) => sg(act[l - 1].reduce((s, a, i) => s + (a - 0.5) * W(l, i, j) * 2, 0))));
  const px = (l) => 40 + l * 80, py = (l, i) => 75 + (i - (L[l] - 1) / 2) * 30;
  return (
    <Svg>{L.slice(1).map((n, l0) => Array.from({ length: L[l0] }, (_, i) => Array.from({ length: n }, (_, j) => <line key={`${l0}${i}${j}`} x1={px(l0)} y1={py(l0, i)} x2={px(l0 + 1)} y2={py(l0 + 1, j)} className="s" style={{ strokeWidth: 1, opacity: 0.18 + 0.4 * Math.abs(W(l0 + 1, i, j)) / 2.2 }} />)))}
      {L.map((n, l) => Array.from({ length: n }, (_, i) => <circle key={`${l}${i}`} cx={px(l)} cy={py(l, i)} r="9" className="f" style={{ opacity: 0.15 + 0.85 * act[l][i] }} />))}
      <T x="40" y="144" m>input</T><T x="120" y="144" m>hidden</T><T x="200" y="144" m>hidden</T><T x="280" y="144" m>output</T></Svg>
  );
};

const Attention = () => {
  const t = useClock(1.2), tok = ['the', 'cat', 'sat', 'on', 'mat'];
  const S = [[2, 1, 0, 0, 0], [1, 3, 1, 0, 0], [0, 3, 2, 1, 1], [0, 0, 2, 2, 3], [0, 1, 1, 3, 2]];
  const A = S.map((r) => { const e = r.map(Math.exp), s = e.reduce((a, b) => a + b, 0); return e.map((v) => v / s); });
  const row = Math.floor(t / 1.4) % 5;
  return (
    <Svg>{A.map((r, i) => r.map((v, j) => <rect key={`${i}${j}`} x={130 + j * 30} y={22 + i * 22} width="28" height="20" className="f" style={{ opacity: 0.1 + 0.9 * v, outline: i === row ? '1px solid #fff' : 'none' }} />))}
      {tok.map((w, i) => <g key={w}><text x="124" y={36 + i * 22} className={`t${i === row ? '' : ' m'}`} textAnchor="end">{w}</text><text x={144 + i * 30} y="16" className="t m" textAnchor="middle">{w}</text></g>)}
      <T x="160" y="142" m>"{tok[row]}" sees every word at once; brighter = more attention (illustrative)</T></Svg>
  );
};

const Pythag = () => (
  <Svg><polygon points="106,82 150,49 117,5 73,38" className="s f2" /><rect x="106" y="82" width="44" height="44" className="s f2" /><rect x="150" y="49" width="33" height="33" className="s f2" />
    <polygon points="106,82 150,82 150,49" className="s f" style={{ opacity: 0.6 }} />
    <T x="128" y="108" s={11}>4² = 16</T><T x="166" y="70" s={10}>3²</T><T x="95" y="42" s={11}>5² = 25</T><T x="250" y="70" s={14}>9 + 16 = 25</T><T x="250" y="92" m>a² + b² = c²</T></Svg>
);

const Euclid = () => {
  const t = useClock(9), s = Math.min(4, Math.floor((t % 7) / 1.4) + 1);
  const o = (n) => ({ opacity: s >= n ? 1 : 0.1, transition: 'opacity .3s' });
  return (
    <Svg><rect x="20" y="20" width="192" height="72" className="s" />
      <g style={o(1)}><rect x="20" y="20" width="72" height="72" className="s f2" /><rect x="92" y="20" width="72" height="72" className="s f2" /></g>
      <g style={o(2)}><rect x="164" y="20" width="48" height="48" className="s f2" /></g>
      <g style={o(3)}><rect x="164" y="68" width="24" height="24" className="s f2" /><rect x="188" y="68" width="24" height="24" className="s f2" /></g>
      <T x="116" y="116" s={11}>48 = 2·18 + 12 · 18 = 1·12 + 6 · 12 = 2·6</T><g style={o(4)}><T x="116" y="138" s={12}>GCD(48, 18) = 6</T></g></Svg>
  );
};

const Halve = () => (
  <Svg>{Array.from({ length: 6 }, (_, i) => <rect key={i} x="30" y={14 + i * 20} width={240 / 2 ** i} height="12" rx="3" className="f" style={{ opacity: 0.9 - i * 0.1 }} />)}<circle cx="34" cy="136" r="4" className="f glow" /><T x="170" y="140" a="start" m>... cut until it cannot be cut: ATOMOS</T></Svg>
);

const Lever = () => (
  <Svg><g><animateTransform attributeName="transform" type="rotate" values="-1.5 160 78;1.5 160 78;-1.5 160 78" dur="4s" repeatCount="indefinite" /><rect x="30" y="72" width="260" height="8" rx="3" className="s f2" />
    <rect x="86" y="42" width="36" height="30" className="f" /><rect x="198" y="52" width="24" height="20" className="f" style={{ opacity: 0.75 }} /><T x="104" y="62" s={11}><tspan style={{ fill: '#0b1020' }}>3 kg</tspan></T><T x="210" y="66" s={10}><tspan style={{ fill: '#0b1020' }}>2</tspan></T></g>
    <polygon points="160,80 140,124 180,124" className="s f2" /><T x="104" y="102" m>2 m</T><T x="210" y="102" m>3 m</T><T x="160" y="144" s={11}>3 × 2 = 2 × 3 → balanced</T></Svg>
);

const Pinhole = () => (
  <Svg><line x1="50" y1="38" x2="50" y2="112" className="s" style={{ strokeWidth: 4 }} /><circle cx="50" cy="38" r="5" className="f glow" /><rect x="146" y="14" width="8" height="122" className="f2 s" /><circle cx="150" cy="75" r="3" style={{ fill: '#0b1020' }} />
    <line x1="250" y1="14" x2="250" y2="136" className="s" /><line x1="250" y1="112" x2="250" y2="38" className="s" style={{ strokeWidth: 4, stroke: '#fff', opacity: 0.8 }} />
    {[[38, 112], [112, 38]].map(([a, b]) => <line key={a} x1="50" y1={a} x2="250" y2={b} className="s" style={{ strokeDasharray: '6 5', strokeWidth: 1.4 }}><animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1s" repeatCount="indefinite" /></line>)}
    <T x="50" y="132" m>object</T><T x="150" y="146" m>pinhole</T><T x="250" y="132" m>inverted image</T></Svg>
);

const Orbit = () => {
  const t = useClock(2), e = 0.6;
  const trail = useMemo(() => { // velocity-Verlet integration of an inverse-square orbit (GM = 1)
    const P = []; let x = 1, y = 0, vx = 0, vy = Math.sqrt(1 + e); const dt = 0.01, a = (px, py) => { const r3 = Math.hypot(px, py) ** 3; return [-px / r3, -py / r3]; };
    let [ax, ay] = a(x, y);
    for (let i = 0; i < 2600; i++) { x += vx * dt + 0.5 * ax * dt * dt; y += vy * dt + 0.5 * ay * dt * dt; const [bx, by] = a(x, y); vx += 0.5 * (ax + bx) * dt; vy += 0.5 * (ay + by) * dt; ax = bx; ay = by; P.push([x, y]); }
    return P;
  }, []);
  const u = 24, cx = 150, cy = 80, i = Math.floor((t * 3 / 0.01) % trail.length), q = (k) => trail[(i + k) % trail.length], pt = ([x, y]) => `${(cx + x * u).toFixed(1)} ${(cy - y * u).toFixed(1)}`;
  const wedge = `M${cx} ${cy} ` + Array.from({ length: 30 }, (_, k) => `L${pt(q(k * 3))}`).join(' ') + ' Z';
  return (
    <Svg><path d={path(trail.filter((_, k) => k % 20 === 0).map(([x, y]) => [cx + x * u, cy - y * u]))} className="s" style={{ opacity: 0.4 }} /><path d={wedge} className="f" style={{ opacity: 0.35 }} />
      <circle cx={cx} cy={cy} r="7" className="f" style={{ fill: '#ffd27a' }} /><circle cx={cx + q(0)[0] * u} cy={cy - q(0)[1] * u} r="4.5" className="f" style={{ fill: '#fff' }} />
      <T x="270" y="40" s={11}>F = G·m₁m₂ / r²</T><T x="270" y="60" m>equal times,</T><T x="270" y="72" m>sweep equal areas</T><T x="270" y="86" m>(shaded)</T></Svg>
  );
};

export const ART_MATH = {
  egypt: { cap: 'The Rhind papyrus writes every fraction as a sum of unit fractions: 2/7 = 1/4 + 1/28.', el: (
    <Svg><rect x="20" y="30" width="280" height="22" className="s" /><T x="160" y="24" m>2/7 of one unit</T><Rects list={[[20, 80, 70, 22, 'f'], [90, 80, 10, 22, 'f glow']]} /><rect x="20" y="80" width="80" height="22" className="s" />
      <T x="55" y="116" s={11}>1/4</T><T x="95" y="130" s={11}>1/28</T><T x="230" y="96" s={14}>2/7 = 1/4 + 1/28</T></Svg>) },
  sumer: { cap: 'The Sumerians counted in base 60: 60 is divisible by 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, so splitting is easy. Still alive in 60 minutes, 360°.', el: (
    <Svg><circle cx="100" cy="72" r="54" className="s f2" />{Array.from({ length: 60 }, (_, i) => <line key={i} x1={100 + Math.cos(i * 6 * D2R) * (i % 5 ? 50 : 44)} y1={72 + Math.sin(i * 6 * D2R) * (i % 5 ? 50 : 44)} x2={100 + Math.cos(i * 6 * D2R) * 54} y2={72 + Math.sin(i * 6 * D2R) * 54} className="s" />)}
      <g className="spin" style={{ animationDuration: '12s' }}><line x1="100" y1="72" x2="100" y2="30" className="s" style={{ strokeWidth: 3 }} /></g><circle cx="100" cy="72" r="4" className="f" />
      <T x="232" y="56" s={13}>60 = 12 × 5</T><T x="232" y="76" m>12 divisors</T><T x="232" y="96" m>1 hour = 60 min</T></Svg>) },
  pythag: { cap: '3-4-5 triangle: the areas of the squares on the two legs add up to the square on the hypotenuse.', el: <Pythag /> },
  euclid: { cap: 'Euclid algorithm finds the greatest common divisor: cut the rectangle into the largest square, repeat with the remainder.', el: <Euclid /> },
  nine: { cap: 'Elimination on a number table ("fangcheng" equations): subtract one row from another until one unknown remains. Exactly Gaussian elimination, ~1,800 years later.', el: (
    <Svg>{[['3', '2', '1', '39'], ['2', '3', '1', '34'], ['1', '2', '3', '26']].map((r, i) => <g key={i}>{r.map((v, j) => <g key={j}><rect x={36 + j * 44} y={18 + i * 32} width="38" height="26" rx="3" className="s f2" /><T x={55 + j * 44} y={36 + i * 32} s={13}>{v}</T></g>)}</g>)}
      <T x="258" y="36" a="start" m>3x + 2y + z = 39</T><T x="258" y="52" a="start" m>2x + 3y + z = 34</T><T x="258" y="68" a="start" m>x + 2y + 3z = 26</T>
      <T x="160" y="128" s={12}>x = 9¼ · y = 4¼ · z = 2¾</T></Svg>) },
  brahma: { cap: 'Brahmagupta set rules for zero and negative numbers ("debts"): 5 minus 7 gives −2, i.e. a debt of 2.', el: (
    <Svg><line x1="20" y1="76" x2="300" y2="76" className="s" />{Array.from({ length: 13 }, (_, i) => <g key={i}><line x1={40 + i * 20} y1="70" x2={40 + i * 20} y2="82" className="s" /><text x={40 + i * 20} y="98" className="t m" textAnchor="middle">{i - 6}</text></g>)}
      <circle cy="76" r="7" className="f"><animate attributeName="cx" values="160;260;260;160;160" keyTimes="0;.3;.45;.8;1" dur="5s" repeatCount="indefinite" /></circle><circle cx="200" cy="40" r="0" />
      <T x="160" y="30" s={14}>5 − 7 = −2</T><T x="160" y="130" m>0 is a number: a + 0 = a, 0 − a = −a</T></Svg>) },
  baghdad: { cap: 'The Bayt al-Hikma in Baghdad gathered Greek, Persian and Indian books and translated them into Arabic: knowledge was collected before moving on.', el: (
    <Svg>{[['Greek', 40], ['Persian', 150], ['Indian', 260]].map(([t, x]) => <g key={t}><rect x={x - 28} y="16" width="56" height="28" rx="4" className="s f2" /><T x={x} y="35" s={10}>{t}</T><path d={`M${x} 44 L160 84`} className="s" style={{ strokeDasharray: '5 4' }}><animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.2s" repeatCount="indefinite" /></path></g>)}
      <rect x="110" y="84" width="100" height="36" rx="8" className="s f2" /><T x="160" y="106" s={11}>Bayt al-Hikma</T><T x="160" y="142" m>translate · copy · comment · add new findings</T></Svg>) },
  khwar: { cap: 'Solving x² + 10x = 39 with shapes: add a square of side 5 to get (x + 5)² = 64, so x + 5 = 8 and x = 3.', el: (
    <Svg><Rects list={[[60, 20, 24, 24, 'f'], [84, 20, 40, 24], [60, 44, 24, 40], [84, 44, 40, 40, 'f2 s glow']]} /><T x="72" y="36" s={10}><tspan style={{ fill: '#0b1020' }}>x²</tspan></T><T x="104" y="36" s={10}>5x</T><T x="72" y="68" s={10}>5x</T><T x="104" y="68" s={11}>25</T>
      <T x="226" y="40" a="start" s={12}>x² + 10x = 39</T><T x="226" y="62" a="start" s={12}>+ 25 → (x + 5)² = 64</T><T x="226" y="84" a="start" s={12}>x + 5 = 8 → x = 3</T><T x="160" y="142" m>"al-jabr": move terms, complete the square</T></Svg>) },
  toledo: { cap: 'After Toledo fell (1085), translators moved Arabic books into Latin; from then on Europe had Arab-Greek algebra, astronomy and medicine.', el: (
    <Svg><rect x="30" y="34" width="84" height="76" rx="6" className="s f2" /><T x="72" y="68" s={12}>الكتاب</T><T x="72" y="90" m>Arabic</T><path d="M120 72 H196 l-10 -8 M196 72 l-10 8" className="s" style={{ strokeWidth: 3 }}><animate attributeName="opacity" values=".3;1;.3" dur="2s" repeatCount="indefinite" /></path>
      <rect x="206" y="34" width="84" height="76" rx="6" className="s f2" /><T x="248" y="68" s={12}>LIBER</T><T x="248" y="90" m>Latin</T><T x="160" y="136" m>Toledo ~1180: Gerard of Cremona translated ~80 books</T></Svg>) },
  fibo: { cap: 'The sequence 1, 1, 2, 3, 5, 8... Fibonacci brought it to Europe along with Hindu-Arabic numerals. Squares with Fibonacci sides form a spiral.', el: <Fib /> },
  madhava: { cap: 'Madhava (Kerala) wrote sin x as an infinite series: x − x³/3! + x⁵/5! − ... Add terms and the curve fits sin x better.', el: <Series /> },
  desc: { cap: 'Descartes tied each point to a pair of numbers: an equation becomes a curve. The point runs along y = x²/2.', el: (() => { const C = () => { const t = useClock(1), x = 4 * Math.sin(t * 0.9), X = (v) => 160 + v * 20, Y = (v) => 112 - v * 8; return (<Svg><line x1="30" y1="112" x2="290" y2="112" className="s" style={{ opacity: 0.4 }} /><line x1="160" y1="10" x2="160" y2="140" className="s" style={{ opacity: 0.4 }} /><path d={path(Array.from({ length: 81 }, (_, i) => [X(-4 + i * 0.1), Y((-4 + i * 0.1) ** 2 / 2)]))} className="s" /><line x1={X(x)} y1="112" x2={X(x)} y2={Y(x * x / 2)} className="s" style={{ strokeDasharray: '3 3' }} /><circle cx={X(x)} cy={Y(x * x / 2)} r="5" className="f" /><T x="250" y="30" s={12}>y = x²/2</T><T x="250" y="48" m>({x.toFixed(1)}; {(x * x / 2).toFixed(1)})</T></Svg>); }; return <C />; })() },
  ngo: { cap: 'Fundamental Lemma (Ngô Bảo Châu, Fields Medal 2010): two ways of computing on two different groups give the same result: the scale always balances.', el: (
    <Svg><g><animateTransform attributeName="transform" type="rotate" values="-1;1;-1" dur="5s" repeatCount="indefinite" additive="sum" /><rect x="40" y="62" width="240" height="6" rx="3" className="s f2" /><path d="M70 68 L50 104 H110 Z M250 68 L230 104 H290 Z" className="s f2" /></g>
      <polygon points="160,68 148,124 172,124" className="s f2" /><T x="80" y="96" s={9}>G side</T><T x="260" y="96" s={9}>H side</T><T x="160" y="142" m>orbital integral of G = orbital integral of H</T></Svg>) },
  wiles: { cap: 'xⁿ + yⁿ = zⁿ has integer solutions for n = 2 but not for n ≥ 3. Wiles proved it after 7 years working almost alone.', el: (
    <Svg><T x="160" y="30" s={13}>3² + 4² = 5² → 9 + 16 = 25 ✓</T><T x="160" y="60" s={13}>5³ + 6³ = {5 ** 3 + 6 ** 3}, 7³ = {7 ** 3} ✗ (so close)</T><path d="M60 92 h200" className="s" /><T x="160" y="112" s={11}>Taniyama–Shimura → Frey → Ribet → Wiles (1994)</T><T x="160" y="136" m>no positive integer solutions when n ≥ 3</T></Svg>) },
  fourcolor: { cap: 'Every map can be colored with 4 colors so that neighboring countries differ; 4 mutually adjacent regions need all 4. Proved in 1976 with a computer.', el: (
    <Svg><g>{[[160, 30, '#ffd27a'], [90, 112, '#7ad7ff'], [230, 112, '#ff8a8a'], [160, 82, '#9dffa0']].map(([x, y, c], i) => [[160, 30], [90, 112], [230, 112], [160, 82]].slice(i + 1).map(([a, b], j) => <line key={`${i}${j}`} x1={x} y1={y} x2={a} y2={b} className="s" style={{ opacity: 0.5 }} />))}
      {[[160, 30, '#ffd27a'], [90, 112, '#7ad7ff'], [230, 112, '#ff8a8a'], [160, 82, '#9dffa0']].map(([x, y, c]) => <circle key={x + y} cx={x} cy={y} r="14" style={{ fill: c }} />)}</g><T x="160" y="146" m>4 mutually adjacent regions: need 4 colors</T></Svg>) },
  poincare: { cap: 'Ricci flow (Hamilton, then Perelman) smooths out the bumps of a shape the way heat evens out temperature; a sphere remains: proof of the Poincaré conjecture.', el: (() => { const C = () => { const t = useClock(1), a = 0.4 * Math.max(0, 1 - (t % 6) / 4.5); return (<Svg><path d={path(Array.from({ length: 121 }, (_, i) => { const th = i / 120 * 2 * Math.PI, r = 50 * (1 + a * (Math.sin(3 * th) + 0.6 * Math.sin(5 * th + 1))); return [160 + r * Math.cos(th), 72 + r * Math.sin(th)]; })) + ' Z'} className="s f2" /><T x="160" y="144" m>smoothing... bumpiness {(a * 100).toFixed(0)}%</T></Svg>); }; return <C />; })() },
  info: { cap: 'Shannon measures information with entropy H(p): the harder to guess, the more bits; a fair coin is exactly 1 bit.', el: <Entropy /> },
  rsa: { cap: 'RSA: public key (n, e) to encrypt, private key d to decrypt; safe because splitting n into two primes is very hard. The numbers in the picture are really computed.', el: <Rsa /> },
  quantum: { cap: 'A qubit is not just 0 or 1: it sits at any point on the Bloch sphere, and measures 0 or 1 with probability cos² and sin² of the half-angle.', el: <Qubit /> },
  deeplearn: { cap: 'Multi-layer neural network: each node sums its weighted inputs then switches on/off. Change the input and the output changes (really computed, fixed weights).', el: <NeuralNet /> },
  transformer: { cap: 'Attention: each word scores against every other word then softmax turns the scores into weights, so the model sees the whole sentence at once instead of word by word.', el: <Attention /> }
};

export const ART_PHYS0 = { democ: { cap: 'Keep halving: Democritus argued that at some point it cannot be divided further; that is the "atomos", the building block of matter.', el: <Halve /> }, archim: { cap: 'A lever balances when mass × lever arm is equal on both sides: 3 × 2 = 2 × 3.', el: <Lever /> }, haytham: { cap: 'Pinhole camera: light travels straight through a small hole so the image is inverted. Ibn al-Haytham used it to show that the eye receives light rather than emitting rays.', el: <Pinhole /> }, newton: { cap: 'One force law (proportional to 1/r²) explains the orbit: an ellipse, faster speed near the Sun, and equal areas swept in equal times (a real integration simulation).', el: <Orbit /> } };
