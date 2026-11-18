// Original line illustrations for the science milestones (drawn here, not copied from anywhere): one small animated
// SVG per milestone showing the principle of the thing, plus a one-line caption. Colours come from the branch
// (--c); see .gf-art in geoflight.css. A milestone without an entry simply shows no picture.
export const Svg = ({ children }) => <svg viewBox="0 0 320 150" aria-hidden="true">{children}</svg>;
export const T = ({ x, y, m, s, a = 'middle', children }) => <text x={x} y={y} className={`t${m ? ' m' : ''}`} style={s ? { fontSize: s } : undefined} textAnchor={a}>{children}</text>;
export const D2R = Math.PI / 180;

// a toothed wheel; `cls` picks the spin direction / speed
export const Gear = ({ cx: x0, cy: y0, r: r0, n, cls = 'spin', s }) => {
  const cx = +x0, cy = +y0, r = +r0, a = (Math.PI * 2) / n, p = [];
  for (let i = 0; i < n; i++) [[-0.3, 0.8], [-0.18, 1], [0.18, 1], [0.3, 0.8]].forEach(([d, k]) => p.push(`${(cx + Math.cos((i + d) * a) * r * k).toFixed(1)},${(cy + Math.sin((i + d) * a) * r * k).toFixed(1)}`));
  return <g className={cls} style={s}><polygon points={p.join(' ')} className="f2 s" /><circle cx={cx} cy={cy} r={r * 0.22} className="s" /></g>;
};
const Tube = ({ x, y, d = 0 }) => (
  <g>
    <rect x={x} y={y} width="14" height="30" rx="7" className="s f2" />
    <path d={`M${x + 4} ${y + 24} V${y + 10} M${x + 10} ${y + 24} V${y + 10}`} className="s" />
    <circle cx={x + 7} cy={y + 14} r="3" className="f glow" style={{ animationDelay: `${d}s` }} />
    <path d={`M${x + 4} ${y + 30} v6 M${x + 10} ${y + 30} v6`} className="s" />
  </g>
);
const Card = ({ x, y, w = 100, h = 56, rows = 5, cols = 12, seed = 3 }) => (
  <g>
    <path d={`M${x} ${y} h${w - 10} l10 10 v${h - 10} h${-w} z`} className="s f2" />
    {Array.from({ length: rows * cols }, (_, i) => ((i * 7 + seed * 13) % 5 < 2 ? <rect key={i} x={x + 8 + (i % cols) * ((w - 16) / cols)} y={y + 8 + Math.floor(i / cols) * ((h - 16) / rows)} width="5" height="5" className="f" /> : null))}
  </g>
);
const Sw = ({ x, y, on }) => <g><circle cx={x} cy={y} r="2.5" className="f" /><circle cx={x + 28} cy={y} r="2.5" className="f" /><line x1={x} y1={y} x2={x + 26} y2={on ? y : y - 12} className="s" /></g>;
const Wheels = ({ n, y }) => Array.from({ length: n }, (_, i) => <Gear key={i} cx={50 + i * 44} cy={y} r={17} n={10} cls={i % 2 ? 'spinr' : 'spin'} />);

export const ART = {
  abacus: { cap: 'Each wire is one place (ones, tens, hundreds...); pushing beads against the bar "writes" the number.', el: (
    <Svg><rect x="36" y="14" width="248" height="112" rx="8" className="s f2" /><line x1="36" y1="48" x2="284" y2="48" className="s" />
      {[3, 1, 4, 0, 2].map((u, i) => <g key={i}><line x1={76 + i * 42} y1="14" x2={76 + i * 42} y2="126" className="s" /><circle cx={76 + i * 42} cy={32} r="8" className="f" />
        {[0, 1, 2, 3].map((j) => <circle key={j} cx={76 + i * 42} cy={j < u ? 60 + j * 14 : 114 - (3 - j) * 14} r="6.5" className="f" />)}</g>)}
      <T x="160" y="144" m>3 · 1 · 4 · 0 · 2</T></Svg>) },
  antikythera: { cap: 'Gears with matched ratios follow the Moon and Sun cycles: turn the crank to get dates and lunar eclipses.', el: (
    <Svg><circle cx="86" cy="70" r="54" className="s" /><circle cx="86" cy="70" r="44" className="s" />
      {Array.from({ length: 24 }, (_, i) => <line key={i} x1={86 + Math.cos(i * 15 * D2R) * 44} y1={70 + Math.sin(i * 15 * D2R) * 44} x2={86 + Math.cos(i * 15 * D2R) * 50} y2={70 + Math.sin(i * 15 * D2R) * 50} className="s" />)}
      <line x1="86" y1="70" x2="116" y2="48" className="s" style={{ strokeWidth: 3 }} /><circle cx="86" cy="70" r="4" className="f" />
      <Gear cx="190" cy="52" r="34" n={24} /><Gear cx="238" cy="104" r="24" n={16} cls="spinr" /><Gear cx="160" cy="116" r="18" n={12} cls="spinr" />
      <T x="86" y="146" m>day dial</T><T x="210" y="146" m>gears</T></Svg>) },
  napier: { cap: 'Napier rods: each cell is the product of two digits; add along the diagonals to finish the multiplication (e.g. 3 × 7 → 2 and 1).', el: (
    <Svg>{[[0, 'm'], [3], [7], [4]].map(([d], i) => <g key={i}><rect x={40 + i * 60} y="12" width="50" height="126" className="s f2" /><text x={65 + i * 60} y="30" className="t" textAnchor="middle" style={{ fontSize: 14 }}>{i ? d : '×'}</text>
      {[1, 2, 3, 4].map((k) => { const p = i ? d * k : k, y = 38 + (k - 1) * 25; return <g key={k}><line x1={40 + i * 60} y1={y} x2={90 + i * 60} y2={y} className="s" />{i > 0 && <line x1={90 + i * 60} y1={y} x2={40 + i * 60} y2={y + 25} className="s" />}
        <text x={(i ? 52 : 65) + i * 60} y={y + 17} className="t" textAnchor="middle">{i ? Math.floor(p / 10) : k}</text>{i > 0 && <text x={78 + i * 60} y={y + 21} className="t" textAnchor="middle">{p % 10}</text>}</g>; })}</g>)}</Svg>) },
  schickard: { cap: 'The 0-9 gears are linked; when one wheel completes a turn it pushes the next wheel one step (carry).', el: (
    <Svg>{[0, 1, 2, 3, 4, 5].map((i) => <g key={i}><rect x={38 + i * 44} y="12" width="24" height="28" rx="4" className="s f2" /><text x={50 + i * 44} y="32" className="t" textAnchor="middle" style={{ fontSize: 15 }}>{[1, 6, 2, 3, 0, 4][i]}</text></g>)}<Wheels n={6} y={92} /><T x="160" y="144" m>6 digits, add · subtract · multiply with Napier rods</T></Svg>) },
  pascal: { cap: 'Turn the number wheels with a stylus: going past 9 automatically advances the tens wheel one step.', el: (
    <Svg>{[0, 1, 2, 3, 4, 5].map((i) => <g key={i}><rect x={37 + i * 46} y="12" width="26" height="24" rx="3" className="s f2" /><text x={50 + i * 46} y="30" className="t" textAnchor="middle" style={{ fontSize: 14 }}>{[0, 2, 5, 7, 1, 9][i]}</text>
      <circle cx={50 + i * 46} cy={88} r="21" className="s" />{Array.from({ length: 10 }, (_, k) => <circle key={k} cx={50 + i * 46 + Math.cos((k * 36 - 90) * D2R) * 15} cy={88 + Math.sin((k * 36 - 90) * D2R) * 15} r="2.6" className="f" />)}</g>)}<T x="160" y="136" m>8 digits · add and subtract</T></Svg>) },
  leibniz: { cap: 'Stepped drum: teeth of length 1...9; wherever the small wheel slides, it "adds" that many times: that is multiplication.', el: (
    <Svg>{Array.from({ length: 9 }, (_, i) => <rect key={i} x="50" y={22 + i * 11} width={(i + 1) * 12} height="8" className="f2 s" />)}<rect x="40" y="14" width="10" height="116" className="s f2" />
      <rect x="156" y="14" width="6" height="116" className="s" /><g className="slide"><Gear cx="146" cy="100" r="14" n={10} /></g><Gear cx="236" cy="70" r="30" n={18} cls="spinr" /><T x="236" y="124" m>quay tay</T></Svg>) },
  binary: { cap: 'Every number needs only 0 and 1; 10110101 is 128 + 32 + 16 + 4 + 1 = 181. The six lines of an I Ching hexagram are also six bits.', el: (
    <Svg>{[1, 0, 1, 1, 0, 1, 0, 1].map((b, i) => <g key={i}><rect x={20 + i * 29} y="28" width="25" height="34" rx="4" className={b ? 'f' : 's f2'} /><text x={32.5 + i * 29} y="52" className="t" textAnchor="middle" style={{ fontSize: 17, fill: b ? '#0b1020' : '#dfe8fb' }}>{b}</text><text x={32.5 + i * 29} y="80" className="t m" textAnchor="middle">{128 >> i}</text></g>)}
      <T x="126" y="108" s={13}>= 181</T>{[1, 0, 1, 1, 0, 1].map((b, i) => <g key={i}>{b ? <rect x="262" y={22 + i * 15} width="40" height="6" className="f" /> : <><rect x="262" y={22 + i * 15} width="16" height="6" className="f" /><rect x="286" y={22 + i * 15} width="16" height="6" className="f" /></>}</g>)}<T x="282" y="124" m>I Ching hexagram</T></Svg>) },
  jacquard: { cap: 'Each hole in the card lets one warp thread lift; change the card to change the pattern, no thread-puller needed.', el: (
    <Svg><Card x="14" y="20" w="104" h="60" rows={5} cols={12} seed={2} /><Card x="26" y="44" w="104" h="60" rows={5} cols={12} seed={5} />
      {Array.from({ length: 14 }, (_, i) => <line key={i} x1={176 + i * 10} y1="14" x2={176 + i * 10} y2="136" className="s" style={{ transform: `translateY(${(i * 5) % 3 === 0 ? -8 : 0}px)` }} />)}
      {Array.from({ length: 5 }, (_, j) => <path key={j} d={`M170 ${40 + j * 16} q 15 -10 30 0 t 30 0 t 30 0 t 30 0`} className="s" style={{ opacity: 0.5 }} />)}<T x="240" y="148" m>warp lifts / drops</T></Svg>) },
  babbage: { cap: 'Four columns of number wheels; turning the crank makes each column add into the next (method of differences), using only addition.', el: (
    <Svg>{[0, 1, 2, 3].map((c) => <g key={c}>{[0, 1, 2, 3].map((r) => <g key={r}><rect x={30 + c * 54} y={14 + r * 30} width="44" height="24" rx="4" className="s f2" /><text x={52 + c * 54} y={32 + r * 30} className="t" textAnchor="middle">{(c * 3 + r * 7 + 1) % 10}{(c * 5 + r * 2 + 4) % 10}</text></g>)}</g>)}<Gear cx="270" cy="75" r="28" n={16} /><T x="270" y="124" m>tay quay</T></Svg>) },
  scheutz: { cap: 'The Scheutz engine also used differences but was compact, and printed results on paper itself.', el: (
    <Svg>{[0, 1, 2].map((c) => <g key={c}>{[0, 1, 2].map((r) => <rect key={r} x={30 + c * 48} y={12 + r * 26} width="40" height="20" rx="4" className="s f2" />)}</g>)}<Gear cx="214" cy="48" r="24" n={14} />
      <rect x="30" y="98" width="230" height="40" className="s" /><path d="M30 98 h230" className="s" />{['1 2 3 4', '1 5 9 6', '2 0 2 5'].map((t, i) => <text key={i} x="46" y={112 + i * 11} className="t m">{t}</text>)}<T x="190" y="124" m>printed output</T></Svg>) },
  analytical: { cap: 'Store, mill, instruction cards and printer: all the parts of a modern computer.', el: (
    <Svg><rect x="14" y="30" width="86" height="90" rx="8" className="s f2" />{[0, 1, 2, 3].map((r) => <circle key={r} cx={57} cy={48 + r * 22} r="8" className="s" />)}<T x="57" y="144" m>STORE (memory)</T>
      <rect x="124" y="46" width="72" height="58" rx="8" className="s f2" /><Gear cx="160" cy="75" r="20" n={12} /><T x="160" y="144" m>MILL (compute)</T>
      <rect x="214" y="30" width="90" height="26" className="s f2" /><T x="259" y="47" s={9}>instr. cards</T><rect x="214" y="92" width="90" height="28" className="s f2" /><T x="259" y="110" s={9}>print output</T>
      <path d="M100 75 H124 M196 75 H214 M259 56 V68 H196 M196 98 H214 V106" className="s" /></Svg>) },
  lovelace: { cap: 'Note G: steps to compute Bernoulli numbers with variables V₁, V₂... including a loop, the first published program.', el: (
    <Svg><rect x="30" y="14" width="260" height="104" rx="6" className="s f2" />{['1.  V₂ × V₃ → V₄', '2.  V₄ − V₁ → V₄', '3.  V₅ + V₁ → V₅', '4.  V₄ ÷ V₅ → V₁₁', '5.  ... repeat to B₇'].map((t, i) => <text key={i} x="46" y={38 + i * 18} className="t" style={{ fontFamily: 'monospace', fontSize: 11 }}>{t}</text>)}
      <path d="M262 100 q 22 -30 0 -58" className="s" /><T x="160" y="140" m>Ada Lovelace, 1843</T></Svg>) },
  boole: { cap: 'True = 1, false = 0. "x and y" is the overlap of the two circles; "x or y" is both circles. Law: x·x = x.', el: (
    <Svg><circle cx="104" cy="66" r="46" className="s f2" /><circle cx="156" cy="66" r="46" className="s f2" /><path d="M130 24 a46 46 0 0 1 0 84 a46 46 0 0 1 0 -84z" className="f" style={{ opacity: 0.7 }} />
      <T x="82" y="70">x</T><T x="178" y="70">y</T><T x="130" y="70" s={11}><tspan style={{ fill: '#0b1020' }}>x·y</tspan></T><T x="130" y="136" m>x and y</T>
      <T x="250" y="50" s={14}>x · x = x</T><T x="250" y="76" s={14}>0 · 1 = 0</T><T x="250" y="102" s={14}>1 + 1 = 1</T></Svg>) },
  hollerith: { cap: 'One punched card per person; the press comes down, current flows wherever there is a hole and the counter ticks up one step.', el: (
    <Svg><Card x="16" y="24" w="170" h="92" rows={8} cols={22} seed={4} />{[0, 1, 2, 3].map((i) => <g key={i}><circle cx={236 + (i % 2) * 44} cy={44 + Math.floor(i / 2) * 52} r="19" className="s f2" /><line x1={236 + (i % 2) * 44} y1={44 + Math.floor(i / 2) * 52} x2={236 + (i % 2) * 44 + Math.cos((i * 70 - 60) * D2R) * 15} y2={44 + Math.floor(i / 2) * 52 + Math.sin((i * 70 - 60) * D2R) * 15} className="s" /></g>)}<T x="262" y="136" m>counter</T></Svg>) },
  bushda: { cap: 'A small wheel rolls on a spinning disc: its position on the disc is a quantity, and how much the wheel turns is the integral of it.', el: (
    <Svg><circle cx="120" cy="82" r="56" className="s f2" /><circle cx="120" cy="82" r="6" className="f" /><g className="spin" style={{ animationDuration: '14s' }}>{Array.from({ length: 12 }, (_, i) => <line key={i} x1="120" y1="82" x2={120 + Math.cos(i * 30 * D2R) * 56} y2={82 + Math.sin(i * 30 * D2R) * 56} className="s" style={{ opacity: 0.35 }} />)}</g>
      <ellipse cx="120" cy="52" rx="5" ry="14" className="f" /><line x1="120" y1="38" x2="120" y2="14" className="s" /><line x1="60" y1="14" x2="260" y2="14" className="s" />
      <Gear cx="236" cy="70" r="26" n={14} cls="spinr" /><T x="236" y="116" m>drive shaft</T><T x="120" y="148" m>∫ y dx</T></Svg>) },
  rejewski: { cap: 'Each Enigma rotor is a permutation of the 26 letters; from the messages, Rejewski worked out the wiring using algebra.', el: (
    <Svg>{[0, 1, 2].map((c) => <g key={c}>{[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={50 + c * 110} cy={20 + i * 22} r="4" className="f" />)}
      {c < 2 && [[0, 3], [1, 0], [2, 5], [3, 1], [4, 2], [5, 4]].map(([a, b], i) => <line key={i} x1={54 + c * 110} y1={20 + a * 22} x2={96 + c * 110} y2={20 + (c ? 5 - b : b) * 22} className="s" />)}</g>)}<T x="160" y="146" m>permutation</T></Svg>) },
  godel: { cap: 'Statement G speaks about itself: "G cannot be proved". If the system is consistent, G is true yet unprovable.', el: (
    <Svg><rect x="60" y="36" width="200" height="56" rx="12" className="s f2" /><T x="160" y="60" s={12}>G: "G cannot</T><T x="160" y="78" s={12}>be proved"</T>
      <path d="M260 64 C 300 64 300 20 160 20 C 20 20 20 64 60 64" className="s" /><T x="160" y="124" m>self-reference</T></Svg>) },
  church: { cap: 'Lambda calculus: every computation is written with λ functions; "λx. x x" applies a function to itself.', el: (
    <Svg><T x="160" y="64" s={34}>λx. x x</T><path d="M110 82 L160 112 L210 82 M160 112 V132" className="s" /><T x="160" y="146" m>expression tree</T></Svg>) },
  turing: { cap: 'The head reads a cell, writes a symbol, moves left or right and changes state; that is enough to compute anything computable.', el: (
    <Svg><g className="tape">{Array.from({ length: 12 }, (_, i) => <g key={i}><rect x={-30 + i * 36} y="46" width="36" height="40" className="s f2" /><text x={-12 + i * 36} y="72" className="t" textAnchor="middle" style={{ fontSize: 16 }}>{[1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1][i]}</text></g>)}</g>
      <path d="M142 96 l18 -26 l18 26 z" className="f" /><rect x="132" y="100" width="56" height="26" rx="6" className="s f2" /><T x="160" y="118">q₁</T><T x="160" y="144" m>infinite tape · head · state</T></Svg>) },
  shannon: { cap: 'Two switches in series light up only when both are closed (AND); in parallel they light up when either is closed (OR): Boolean algebra as a circuit.', el: (
    <Svg><line x1="20" y1="38" x2="40" y2="38" className="s" /><Sw x={40} y={38} on /><line x1="68" y1="38" x2="84" y2="38" className="s" /><Sw x={84} y={38} on /><line x1="112" y1="38" x2="150" y2="38" className="s" /><circle cx="162" cy="38" r="12" className="f glow" /><T x="214" y="42">A AND B</T>
      <line x1="20" y1="106" x2="34" y2="106" className="s" /><path d="M34 106 V88 H40 M34 106 V124 H40" className="s" /><Sw x={40} y={88} on /><Sw x={40} y={124} on={false} /><path d="M68 88 H100 V106 M68 124 H100 V106 H150" className="s" /><circle cx="162" cy="106" r="12" className="f glow" /><T x="214" y="110">A OR B</T></Svg>) },
  zuse: { cap: 'The Z3 read its program from punched 35 mm film and calculated in binary with relays.', el: (
    <Svg><rect x="14" y="30" width="292" height="60" className="s f2" />{Array.from({ length: 28 }, (_, i) => <g key={i}><rect x={20 + i * 10.2} y="33" width="5" height="5" className="s" /><rect x={20 + i * 10.2} y="82" width="5" height="5" className="s" /></g>)}
      {Array.from({ length: 9 * 3 }, (_, i) => ((i * 5 + 1) % 4 < 2 ? <rect key={i} x={30 + Math.floor(i / 3) * 30} y={46 + (i % 3) * 11} width="9" height="7" className="f" /> : null))}<T x="160" y="122" m>punched film · 22 bit · relays</T></Svg>) },
  stibitz: { cap: 'Relay: a small current in the coil pulls an iron bar, closes the switch, turns on "1"; cut the current and it returns to "0".', el: (
    <Svg><rect x="50" y="36" width="70" height="52" rx="6" className="s f2" />{Array.from({ length: 5 }, (_, i) => <line key={i} x1={60 + i * 12} y1="40" x2={60 + i * 12} y2="84" className="s" />)}<line x1="30" y1="62" x2="50" y2="62" className="s" /><line x1="120" y1="62" x2="140" y2="62" className="s" />
      <g className="flip"><rect x="130" y="36" width="90" height="8" className="f" /></g><circle cx="222" cy="68" r="3" className="f" /><circle cx="222" cy="106" r="3" className="f" /><line x1="222" y1="106" x2="290" y2="106" className="s" /><line x1="222" y1="68" x2="290" y2="68" className="s" /><T x="85" y="112" m>coil</T><T x="256" y="130" m>switch</T></Svg>) },
  atanasoff: { cap: 'A rotating drum holds capacitors that store each bit, "refreshed" every turn; vacuum tubes do the addition.', el: (
    <Svg><rect x="30" y="26" width="150" height="86" rx="10" className="s f2" />{Array.from({ length: 6 * 10 }, (_, i) => <circle key={i} cx={46 + (i % 10) * 14} cy={42 + Math.floor(i / 10) * 13} r="3" className="f" style={{ opacity: (i * 7) % 3 ? 0.9 : 0.25 }} />)}
      <Tube x={214} y={30} /><Tube x={242} y={30} d={0.4} /><Tube x={270} y={30} d={0.8} /><T x="105" y="132" m>capacitor drum</T><T x="242" y="98" m>vacuum tube</T></Svg>) },
  bombe: { cap: 'Many rotor sets spin in parallel testing each key setting; the circuit instantly rules out contradictory settings.', el: (
    <Svg>{[0, 1, 2].map((r) => [0, 1, 2].map((c) => <g key={`${r}${c}`} className={(r + c) % 2 ? 'spinr' : 'spin'} style={{ animationDuration: `${5 + r * 2 + c}s` }}><circle cx={66 + c * 94} cy={32 + r * 42} r="17" className="s f2" />{Array.from({ length: 8 }, (_, i) => <circle key={i} cx={66 + c * 94 + Math.cos(i * 45 * D2R) * 12} cy={32 + r * 42 + Math.sin(i * 45 * D2R) * 12} r="1.8" className="f" />)}</g>))}</Svg>) },
  colossus: { cap: 'Thousands of vacuum tubes read punched paper tape at very high speed to test Lorenz code possibilities.', el: (
    <Svg>{[0, 1].map((r) => Array.from({ length: 10 }, (_, i) => <Tube key={`${r}${i}`} x={26 + i * 28} y={14 + r * 54} d={(i + r * 3) * 0.17} />))}<ellipse cx="160" cy="134" rx="110" ry="10" className="s" style={{ strokeDasharray: '8 6' }} /><T x="160" y="150" m>paper tape</T></Svg>) },
  aiken: { cap: 'Mark I: a 15 m row of decimal number wheels, linked by one common shaft and controlled by punched paper tape.', el: (
    <Svg><rect x="14" y="26" width="292" height="70" rx="6" className="s f2" />{Array.from({ length: 12 }, (_, i) => <circle key={i} cx={34 + i * 23.5} cy="52" r="8" className="s" />)}<line x1="14" y1="78" x2="306" y2="78" className="s" style={{ strokeWidth: 4 }} />
      <Gear cx="40" cy="78" r="9" n={8} /><Gear cx="160" cy="78" r="9" n={8} cls="spinr" /><Gear cx="280" cy="78" r="9" n={8} /><rect x="60" y="108" width="200" height="14" className="s" />{Array.from({ length: 24 }, (_, i) => <circle key={i} cx={68 + i * 8} cy={i % 3 ? 112 : 118} r="1.8" className="f" />)}<T x="160" y="144" m>control tape</T></Svg>) },
  eniac: { cap: 'ENIAC: cabinets full of vacuum tubes, computing in decimal; changing the problem meant rewiring.', el: (
    <Svg>{[0, 1, 2].map((r) => Array.from({ length: 12 }, (_, i) => <Tube key={`${r}${i}`} x={18 + i * 24} y={10 + r * 44} d={((i * 3 + r) % 7) * 0.2} />))}<path d="M20 140 q 60 -22 120 0 t 120 0" className="s" /><T x="160" y="150" m>programming cables</T></Svg>) },
  edvac: { cap: 'Program and data share one memory; the processor reads and runs each instruction: the von Neumann architecture.', el: (
    <Svg><rect x="106" y="14" width="108" height="40" rx="8" className="s f2" /><T x="160" y="39" s={11}>MEMORY</T><T x="160" y="30" m s={8}>code + data</T>
      <rect x="106" y="96" width="108" height="40" rx="8" className="s f2" /><T x="160" y="121" s={11}>CPU</T><rect x="14" y="56" width="70" height="36" rx="8" className="s f2" /><T x="49" y="79">IN</T><rect x="236" y="56" width="70" height="36" rx="8" className="s f2" /><T x="271" y="79">OUT</T>
      <path d="M160 54 V96 M84 74 H124 V96 M196 96 V74 H236" className="s" /></Svg>) },
  baby: { cap: 'Memory is a cathode-ray tube screen: dot = 1, dash = 0; the first program ran for 52 minutes.', el: (
    <Svg><rect x="70" y="10" width="180" height="120" rx="22" className="s f2" /><rect x="86" y="26" width="148" height="88" rx="10" style={{ fill: '#07101c' }} className="s" />{Array.from({ length: 8 * 20 }, (_, i) => <rect key={i} x={94 + (i % 20) * 7} y={32 + Math.floor(i / 20) * 10} width={(i * 7) % 5 < 2 ? 3 : 5} height="3" className="f" style={{ opacity: 0.85 }} />)}<T x="160" y="146" m>Williams tube</T></Svg>) },
  edsac: { cap: 'Mercury delay-line memory: sound pulses travel through a mercury tube and are fed back around, each pulse being one bit.', el: (
    <Svg><rect x="30" y="56" width="260" height="30" rx="15" className="s f2" /><circle cx="30" cy="71" r="9" className="f" /><circle cx="290" cy="71" r="9" className="f" /><g className="run">{[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={56 + i * 36} cy="71" r={i % 2 ? 4 : 6} className="f" />)}</g><path d="M30 62 V28 H290 V62" className="s" style={{ strokeDasharray: '4 4' }} /><T x="160" y="118" m>mercury tube</T></Svg>) },
  hopper: { cap: 'Compiler: the programmer writes instructions close to everyday speech, and the machine translates them into machine code.', el: (
    <Svg><rect x="14" y="48" width="86" height="44" rx="8" className="s f2" /><T x="57" y="75" s={12}>ADD A B</T><path d="M100 70 H124" className="s" /><rect x="124" y="40" width="72" height="60" rx="10" className="s f2" /><Gear cx="160" cy="70" r="20" n={12} /><path d="M196 70 H220" className="s" />
      <rect x="220" y="48" width="86" height="44" rx="8" className="s f2" /><T x="263" y="75" s={11}>0110 1011</T><T x="160" y="124" m>compile</T></Svg>) },
  ic: { cap: 'The whole circuit of transistors and wires is etched onto one piece of silicon instead of hand-soldering each part.', el: (
    <Svg><rect x="90" y="14" width="140" height="112" rx="6" className="s f2" />{Array.from({ length: 6 * 8 }, (_, i) => <rect key={i} x={102 + (i % 8) * 15.5} y={26 + Math.floor(i / 8) * 16} width="9" height="9" className="f" style={{ opacity: ((i * 5) % 4) / 5 + 0.3 }} />)}<path d="M102 20 H218 M96 120 H224" className="s" />
      {Array.from({ length: 6 }, (_, i) => <g key={i}><line x1="90" y1={32 + i * 18} x2="72" y2={32 + i * 18} className="s" /><line x1="230" y1={32 + i * 18} x2="248" y2={32 + i * 18} className="s" /></g>)}<T x="160" y="144" m>silicon chip</T></Svg>) },
  micro: { cap: 'An entire processor (2,300 transistors) sits in one 16-pin chip.', el: (
    <Svg><rect x="80" y="30" width="160" height="70" rx="6" className="s f2" /><path d="M80 65 a10 10 0 0 1 0 0" className="s" /><T x="160" y="62" s={22}>4004</T><T x="160" y="84" m>intel · 1971</T>
      {Array.from({ length: 8 }, (_, i) => <g key={i}><rect x={92 + i * 19} y="16" width="8" height="14" className="f" /><rect x={92 + i * 19} y="100" width="8" height="14" className="f" /></g>)}<T x="160" y="140" m>2300 transistor</T></Svg>) },
  arpanet: { cap: 'The first four nodes (UCLA, UCSB, SRI, Utah) joined by packet switching; the first message only got as far as "LO".', el: (
    <Svg>{[[[210, 108], [90, 90]], [[210, 108], [60, 60]], [[90, 90], [60, 60]], [[60, 60], [150, 38]]].map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="s" style={{ strokeDasharray: '5 4' }} />)}
      {[['UCLA', 210, 108], ['UCSB', 90, 90], ['SRI', 60, 60], ['Utah', 150, 38]].map(([t, x, y]) => <g key={t}><circle cx={x} cy={y} r="9" className="f glow" /><text x={x + 14} y={y + 4} className="t">{t}</text></g>)}<T x="262" y="60" s={22}>LO</T><T x="262" y="80" m>first message</T></Svg>) },
  web: { cap: 'Documents link to each other with hyperlinks; each page has a shared address that anyone can open.', el: (
    <Svg>{[[40, 30], [150, 18], [250, 40], [90, 90], [210, 98]].map(([x, y], i) => <g key={i}><rect x={x} y={y} width="52" height="38" rx="4" className="s f2" /><line x1={x + 8} y1={y + 10} x2={x + 44} y2={y + 10} className="s" /><line x1={x + 8} y1={y + 20} x2={x + 36} y2={y + 20} className="s" /></g>)}
      <path d="M92 48 L150 36 M202 36 L250 54 M66 68 L100 90 M142 100 L210 108 M236 78 L236 98 M180 56 L220 98" className="s" style={{ strokeDasharray: '4 3' }} /><T x="160" y="144" m>http:// · hyperlinks</T></Svg>) },
  alphafold: { cap: 'A chain of amino acids folds itself into helices and sheets, and the shape decides what the protein does; AlphaFold predicts the shape from the chain.', el: (
    <Svg><path d={Array.from({ length: 61 }, (_, i) => `${i ? 'L' : 'M'}${30 + i * 3.4} ${60 + Math.sin(i * 0.55) * 28}`).join(' ')} className="s" style={{ strokeWidth: 6, opacity: 0.9 }} /><path d={Array.from({ length: 61 }, (_, i) => `${i ? 'L' : 'M'}${30 + i * 3.4} ${60 + Math.sin(i * 0.55 + 3.14) * 28}`).join(' ')} className="s" style={{ strokeWidth: 3, opacity: 0.4 }} />
      <path d="M40 118 H200 l-12 -8 M200 118 l-12 8" className="s" style={{ strokeWidth: 3 }} /><path d="M40 134 H200" className="s" style={{ strokeWidth: 3 }} /><T x="262" y="70" m>chain → shape</T></Svg>) }
};
