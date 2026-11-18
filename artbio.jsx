// Illustrations for biology. Selection, inheritance, sequencing and the helix are computed, not canned.
import { useMemo } from 'react';
import { Svg, T, D2R } from './sciart.jsx';
import { clamp, gauss, path, rng, useClock } from './artkit.jsx';

const Step = ({ x, y, w = 74, h = 40, t, s = 10 }) => <g><rect x={x} y={y} width={w} height={h} rx="7" className="s f2" /><T x={x + w / 2} y={y + h / 2 + 4} s={s}>{t}</T></g>;
const Arrow = ({ x1, y1, x2, y2 }) => <path d={`M${x1} ${y1} L${x2} ${y2}`} className="s" style={{ strokeWidth: 2.2 }} />;

const Selection = () => {
  const t = useClock(8), gens = useMemo(() => {
    const r = rng(3), opt = 13, N = 70; let pop = Array.from({ length: N }, () => 10 + gauss(r)); const G = [pop];
    for (let g = 0; g < 10; g++) { const w = pop.map((x) => Math.exp(-((x - opt) ** 2) / 8)), tot = w.reduce((a, b) => a + b, 0); pop = Array.from({ length: N }, () => { let u = r() * tot, i = 0; while (i < N - 1 && u > w[i]) { u -= w[i]; i++; } return pop[i] + gauss(r) * 0.35; }); G.push(pop); }
    return G;
  }, []);
  const g = Math.min(10, Math.floor((t % 12) / 1.1)), pop = gens[g], bins = Array(20).fill(0);
  pop.forEach((x) => { const b = Math.floor((x - 6) * 2); if (b >= 0 && b < 20) bins[b]++; });
  const mean = pop.reduce((a, b) => a + b, 0) / pop.length;
  return (
    <Svg>{bins.map((v, b) => <rect key={b} x={30 + b * 12} y={110 - v * 6} width="10" height={v * 6} className="f" style={{ opacity: 0.8 }} />)}
      <line x1={30 + (13 - 6) * 24} y1="20" x2={30 + (13 - 6) * 24} y2="112" className="s" style={{ strokeDasharray: '4 3' }} /><T x={30 + 7 * 24} y="14" m>best beak</T>
      <line x1="30" y1="112" x2="270" y2="112" className="s" /><circle cx={30 + (mean - 6) * 24} cy="122" r="4" style={{ fill: '#fff' }} />
      <T x="160" y="144" m>generation {g}/10 · mean beak depth {mean.toFixed(1)} · hard seeds favor deeper beaks</T></Svg>
  );
};

const Helix = () => {
  const t = useClock(1), pairs = ['A', 'T', 'G', 'C', 'T', 'A', 'C', 'G', 'A', 'T', 'G', 'C', 'A', 'T', 'C', 'G', 'T', 'A'], cmp = { A: 'T', T: 'A', G: 'C', C: 'G' };
  return (
    <Svg>{pairs.map((b, i) => { const x = 22 + i * 16, a = i * 0.62 + t * 1.8, y1 = 75 + Math.sin(a) * 40, y2 = 75 - Math.sin(a) * 40, d = Math.cos(a); return (
      <g key={i}><line x1={x} y1={y1} x2={x} y2={y2} className="s" style={{ strokeWidth: 1.6, opacity: 0.35 + 0.3 * Math.abs(d) }} /><circle cx={x} cy={y1} r={4 + d * 1.2} className="f" style={{ opacity: 0.6 + 0.4 * d }} /><circle cx={x} cy={y2} r={4 - d * 1.2} className="f" style={{ fill: '#7ad7ff', opacity: 0.6 - 0.4 * d }} />
        {Math.abs(d) < 0.8 && <><text x={x} y={75 - Math.sin(a) * 14 + 3} className="t m" textAnchor="middle" style={{ fontSize: 7 }}>{b}</text><text x={x} y={75 + Math.sin(a) * 14 + 3} className="t m" textAnchor="middle" style={{ fontSize: 7 }}>{cmp[b]}</text></>}</g>); })}
      <T x="160" y="144" m>A always pairs with T, G with C: each strand holds a copy of the other</T></Svg>
  );
};

const Gel = () => {
  const seq = 'TGCATCGGATCCA', lanes = ['A', 'C', 'G', 'T'], t = useClock(9), shown = Math.min(seq.length, Math.floor(t * 2.2) % (seq.length + 6));
  return (
    <Svg>{lanes.map((l, i) => <g key={l}><rect x={60 + i * 44} y="14" width="30" height="104" className="s f2" style={{ opacity: 0.7 }} /><T x={75 + i * 44} y="132" s={11}>{l}</T>
      {seq.split('').map((c, k) => (c === l && k < shown ? <rect key={k} x={62 + i * 44} y={22 + (seq.length - 1 - k) * 7.6} width="26" height="4" className="f" /> : null))}</g>)}
      <T x="255" y="40" m a="middle">read from the bottom up:</T><T x="255" y="64" s={12}>{seq.slice(0, shown) || '…'}</T><T x="255" y="90" m>shortest fragment runs farthest</T></Svg>
  );
};

const Pcr = () => {
  const t = useClock(6), c = Math.floor((t % 21) / 7), p = (t % 7) / 7;
  const profile = [[0, 55], [0.2, 95], [0.4, 95], [0.55, 55], [0.75, 72], [1, 72]], X = (u) => 30 + u * 120;
  const temp = (() => { for (let i = 0; i < profile.length - 1; i++) if (p >= profile[i][0] && p <= profile[i + 1][0]) { const [a, ta] = profile[i], [b, tb] = profile[i + 1]; return ta + (tb - ta) * ((p - a) / (b - a)); } return 72; })();
  return (
    <Svg><path d={path(profile.map(([u, T0]) => [X(u), 120 - (T0 - 50) * 1.6]))} className="s" /><circle cx={X(p)} cy={120 - (temp - 50) * 1.6} r="4" className="f" /><T x="90" y="136" m>95° separate · 55° anneal · 72° extend</T>
      {Array.from({ length: Math.min(2 ** (c + 1), 16) }, (_, i) => <line key={i} x1={186 + (i % 8) * 14} y1={30 + Math.floor(i / 8) * 18} x2={186 + (i % 8) * 14} y2={44 + Math.floor(i / 8) * 18} className="s" style={{ strokeWidth: 3 }} />)}
      <T x="250" y="92" s={12}>cycle {c + 1}: 2^{c + 1} = {2 ** (c + 1)} copies</T><T x="250" y="112" m>30 cycles: 2³⁰ = {(2 ** 30).toLocaleString('en-US')}</T></Svg>
  );
};

const Crispr = () => {
  const t = useClock(5), ph = (t % 6) / 6, slide = clamp(ph / 0.35, 0, 1), cut = clamp((ph - 0.55) / 0.2, 0, 1), s = 'GACCTGTTCGAAGGTCCATAG';
  return (
    <Svg>{s.split('').map((b, i) => <g key={i}><text x={30 + i * 12.6} y="60" className="t m" textAnchor="middle" style={{ fontSize: 9 }}>{b}</text><text x={30 + i * 12.6} y={96 + cut * 12} className="t m" textAnchor="middle" style={{ fontSize: 9, opacity: 0.55 }}>{{ A: 'T', T: 'A', G: 'C', C: 'G' }[b]}</text></g>)}
      <rect x={28 + 3 * 12.6 - 6} y={cut ? 66 - slide * 0 : 8 + (66 - 8) * slide} width="150" height="9" rx="4" className="f" style={{ opacity: 0.8 }} /><T x="150" y="38" s={9}><tspan style={{ fill: '#fff' }}>Guide RNA (20 letters) binds the target</tspan></T>
      <T x="270" y="76" s={10} a="middle">PAM</T><path d={`M${30 + 14 * 12.6} 40 v${22 + cut * 6}`} className="s" style={{ stroke: '#ff8a8a', strokeWidth: 3, opacity: slide > 0.9 ? 1 : 0 }} />
      <T x="160" y="136" m>Cas9 cuts at the match ({cut > 0 ? 'cut' : 'not cut yet'}); the cell repairs itself, or we insert a new gene</T></Svg>
  );
};

const Fly = () => (
  <Svg><rect x="30" y="64" width="260" height="14" rx="7" className="s f2" />{[['y', 0], ['w', 1.5], ['v', 33], ['m', 36.1]].map(([g, d]) => <g key={g}><line x1={40 + d * 6.6} y1="58" x2={40 + d * 6.6} y2="84" className="s" style={{ strokeWidth: 3 }} /><T x={40 + d * 6.6} y="50" s={11}>{g}</T><T x={40 + d * 6.6} y="100" m>{d}</T></g>)}
    <T x="160" y="124" m>distance ∝ crossover frequency (unit: centimorgan) on the X chromosome</T><T x="160" y="144" m>first gene map (Sturtevant, 1913)</T></Svg>
);

const Mendel = () => {
  const t = useClock(1), k = Math.floor(t / 1.5) % 4, cells = [['A', 'A'], ['A', 'a'], ['a', 'A'], ['a', 'a']];
  return (
    <Svg>{cells.map(([a, b], i) => { const dom = a === 'A' || b === 'A'; return <g key={i}><rect x={50 + (i % 2) * 54} y={30 + Math.floor(i / 2) * 44} width="50" height="40" rx="6" style={{ fill: dom ? '#b07aff' : '#e8efff', opacity: k === i ? 1 : 0.55 }} className="s" /><T x={75 + (i % 2) * 54} y={55 + Math.floor(i / 2) * 44} s={14}><tspan style={{ fill: '#0b1020' }}>{a}{b}</tspan></T></g>; })}
      <T x="75" y="22" m>A</T><T x="129" y="22" m>a</T><T x="38" y="54" m>A</T><T x="38" y="98" m>a</T><T x="230" y="50" s={13}>3 purple : 1 white</T><T x="230" y="72" m>Mendel counted 705 : 224</T><T x="230" y="88" m>(≈ {(705 / 224).toFixed(2)} : 1)</T></Svg>
  );
};

const Neuron = () => {
  const t = useClock(1), u = (t * 0.35) % 1;
  const br = (x, y, a, l, d) => (d === 0 ? [] : [`M${x} ${y} L${(x + Math.cos(a) * l).toFixed(1)} ${(y + Math.sin(a) * l).toFixed(1)}`, ...br(x + Math.cos(a) * l, y + Math.sin(a) * l, a - 0.5, l * 0.7, d - 1), ...br(x + Math.cos(a) * l, y + Math.sin(a) * l, a + 0.5, l * 0.7, d - 1)]);
  return (
    <Svg><path d={br(86, 75, Math.PI, 28, 3).join(' ')} className="s" style={{ strokeWidth: 1.2 }} /><circle cx="90" cy="75" r="12" className="f" style={{ opacity: 0.8 }} /><line x1="102" y1="75" x2="270" y2="75" className="s" style={{ strokeWidth: 2.6 }} />
      {[0.15, 0.45, 0.75].map((v) => <ellipse key={v} cx={102 + v * 168} cy="75" rx="14" ry="6" className="s f2" />)}<circle cx={102 + u * 168} cy="75" r="5" style={{ fill: '#fff' }} /><path d="M270 75 l16 -14 M270 75 l16 14 M270 75 l18 0" className="s" /><T x="90" y="116" m>cell body</T><T x="190" y="100" m>axon · myelin sheath</T><T x="160" y="144" m>the nerve impulse runs one way, jumping between nodes</T></Svg>
  );
};

const Cork = () => {
  const r = rng(9);
  return (
    <Svg>{Array.from({ length: 44 }, (_, i) => { const row = Math.floor(i / 11), c = i % 11, w = 18 + r() * 8; return <rect key={i} x={26 + c * 26 + (row % 2) * 6} y={16 + row * 28} width={w} height="22" rx="2" className="s f2" style={{ opacity: 0.8 }} />; })}
      <circle cx="270" cy="110" r="28" className="s" /><line x1="290" y1="130" x2="308" y2="148" className="s" style={{ strokeWidth: 4 }} /><T x="150" y="144" m>"cellula": small cells like monks' rooms, in a thin slice of cork</T></Svg>
  );
};

const Microbes = () => {
  const t = useClock(1);
  return (
    <Svg><circle cx="160" cy="75" r="62" className="s f2" />{Array.from({ length: 14 }, (_, i) => { const a = t * (0.6 + (i % 4) * 0.2) + i * 2.1, rr = 14 + (i * 13) % 38, x = 160 + Math.cos(a + i) * rr, y = 75 + Math.sin(a * 1.3) * rr * 0.8; return i % 3 === 0 ? <ellipse key={i} cx={x} cy={y} rx="7" ry="2.6" transform={`rotate(${a * 40} ${x} ${y})`} className="f" /> : <circle key={i} cx={x} cy={y} r="2.8" className="f" style={{ opacity: 0.8 }} />; })}
      <T x="160" y="146" m>"animalcules" in a water drop: Leeuwenhoek saw microbes for the first time (~270x)</T></Svg>
  );
};

const Tree = () => (
  <Svg>{[['Kingdom', 0], ['Phylum', 1], ['Class', 2], ['Order', 3], ['Family', 4], ['Genus: Homo', 5], ['Species: sapiens', 6]].map(([l, i]) => <g key={l}><rect x={20 + i * 8} y={10 + i * 8} width={280 - i * 16} height={140 - i * 16} rx="8" className="s" style={{ opacity: 0.3 + i * 0.1 }} /><T x={30 + i * 8} y={22 + i * 8} a="start" s={8}>{l}</T></g>)}<T x="160" y="148" m>two names: genus + species. One name per species, in nested ranks</T></Svg>
);

const Beaks = () => (
  <Svg>{[['hard seeds', 40, 'M20 70 q 18 -30 46 -4 q -10 18 -46 4z'], ['cactus', 120, 'M100 68 q 40 -20 62 -2 q -30 12 -62 2z'], ['insects', 200, 'M180 68 q 40 -16 60 -2 q -30 8 -60 2z'], ['small seeds', 270, 'M255 66 q 24 -16 36 -2 q -18 14 -36 2z']].map(([l, x, d]) => <g key={l}><path d={d} className="s f2" /><circle cx={x - 8} cy="68" r="12" className="s" style={{ opacity: 0.4 }} /><T x={x + 10} y="108" m>{l}</T></g>)}
    <T x="160" y="30" s={11}>same ancestor, different beaks by each island's food</T><T x="160" y="144" m>Galápagos finches</T></Svg>
);

const Cell2 = () => (
  <Svg><rect x="20" y="24" width="120" height="96" rx="10" className="s f2" style={{ strokeWidth: 3 }} /><circle cx="68" cy="68" r="16" className="f" style={{ opacity: 0.8 }} /><rect x="96" y="40" width="30" height="60" rx="10" className="s" /><T x="80" y="138" m>plant cell (cell wall)</T>
    <ellipse cx="240" cy="72" rx="62" ry="48" className="s f2" /><circle cx="240" cy="72" r="16" className="f" style={{ opacity: 0.8 }} /><T x="240" y="138" m>animal cell</T><T x="160" y="12" m>all living things are made of cells</T></Svg>
);

const Avery = () => (
  <Svg>{[['+ protease', 1], ['+ RNase', 1], ['+ DNase', 0]].map(([l, ok], i) => <g key={l}><path d={`M${30 + i * 66} 20 v70 a14 14 0 0 0 28 0 v-70`} className="s f2" /><rect x={32 + i * 66} y="70" width="24" height="30" className="f" style={{ opacity: ok ? 0.8 : 0.25 }} /><T x={44 + i * 66} y="124" m>{l}</T><T x={44 + i * 66} y="140" s={12}>{ok ? '✓ S' : '✗ R'}</T></g>)}
    <T x="256" y="46" m>harmless R bacteria + S extract:</T><T x="256" y="64" s={11}>destroy the DNA and it loses the power to cause disease</T><T x="256" y="82" m>→ DNA is the genetic material</T></Svg>
);

const Photo51 = () => (
  <Svg><rect x="30" y="10" width="130" height="130" rx="8" style={{ fill: '#02060e' }} className="s" />{[-1, 1].map((sx) => [1, 2, 3, 4].map((k) => [-1, 1].map((sy) => <circle key={`${sx}${k}${sy}`} cx={95 + sx * k * 14} cy={75 + sy * k * 14} r="3.2" style={{ fill: '#e8efff', opacity: 0.9 - k * 0.1 }} />)))}
    <circle cx="95" cy="75" r="4" style={{ fill: '#e8efff' }} />{[-2, 2].map((s) => [-50, -34, -18, 18, 34, 50].map((y) => <circle key={`${s}${y}`} cx={95 + s * 8} cy={75 + y} r="2" style={{ fill: '#e8efff', opacity: 0.55 }} />))}
    <T x="95" y="146" m>X-ray diffraction image (illustration)</T><T x="236" y="40" s={11}>X shape → helix</T><T x="236" y="62" m>~34 Å per turn</T><T x="236" y="80" m>~3.4 Å between steps</T><T x="236" y="104" m>two strands, double helix</T></Svg>
);

const Code = () => {
  const t = useClock(1), x = (t * 30) % 60;
  return (
    <Svg><g transform={`translate(${-x} 0)`}>{Array.from({ length: 10 }, (_, i) => <g key={i}><rect x={20 + i * 30} y="22" width="28" height="22" className="s f2" /><T x={34 + i * 30} y="38" s={12}>U</T></g>)}</g>
      <rect x="130" y="56" width="60" height="38" rx="14" className="s f2" /><T x="160" y="80" s={11}>ribosome</T>{[0, 1, 2].map((i) => <g key={i}><circle cx={110 + i * 50} cy="118" r="13" className="f" style={{ opacity: 0.8 }} /><T x={110 + i * 50} y="122" s={10}><tspan style={{ fill: '#0b1020' }}>Phe</tspan></T></g>)}<T x="160" y="146" m>UUU → phenylalanine · 4³ = 64 triplets for 20 amino acids</T></Svg>
  );
};

const Ancient = () => {
  const r = rng(13), cells = Array.from({ length: 100 }, () => r() < 0.02);
  return (
    <Svg>{[0, 1, 2].map((row) => <g key={row}><T x="30" y={30 + row * 34} a="start" m>{['Africans', 'non-Africans', 'Neanderthal'][row]}</T>{Array.from({ length: 50 }, (_, i) => <rect key={i} x={120 + i * 3.6} y={22 + row * 34} width="3" height="14" className="f" style={{ opacity: row === 2 ? 0.9 : row === 1 && cells[i] ? 0.95 : row === 1 ? 0.25 : 0.25, fill: row === 1 && cells[i] ? '#ffd27a' : undefined }} />)}</g>)}
      <T x="160" y="140" m>~1–4% of non-African genomes inherited from Neanderthals (positions illustrative)</T></Svg>
  );
};

const Hgp = () => {
  const t = useClock(1), col = { A: '#7ad7ff', C: '#ffd27a', G: '#9dffa0', T: '#ff8a8a' }, r = rng(4), seq = Array.from({ length: 40 }, () => 'ACGT'[Math.floor(r() * 4)]);
  return (
    <Svg>{[0, 1, 2].map((row) => <g key={row} transform={`translate(${-((t * (20 + row * 8)) % 24)} 0)`}>{seq.map((c, i) => <g key={i}><rect x={10 + i * 24} y={20 + row * 36} width="22" height="26" rx="4" style={{ fill: col[seq[(i + row * 7) % 40]], opacity: 0.85 }} /><T x={21 + i * 24} y={38 + row * 36} s={12}><tspan style={{ fill: '#0b1020' }}>{seq[(i + row * 7) % 40]}</tspan></T></g>)}</g>)}
      <T x="160" y="144" m>~3.2 billion letters A · C · G · T, ~13 years, many countries cooperating</T></Svg>
  );
};

const Ipsc = () => {
  const t = useClock(3), k = clamp(((t % 6) - 1) / 3.5, 0, 1);
  return (
    <Svg><ellipse cx="70" cy="75" rx={46 - 24 * k} ry={14 + 24 * k} className="s f2" /><circle cx="70" cy="75" r="8" className="f" /><T x="70" y="130" m>{k < 0.5 ? 'skin cell' : 'pluripotent cell'}</T>
      {['Oct4', 'Sox2', 'Klf4', 'c-Myc'].map((g, i) => <T key={g} x="190" y={36 + i * 20} s={11} a="middle">{g}</T>)}<path d="M130 75 H150 M230 75 H250" className="s" style={{ strokeWidth: 2.4 }} />
      {[[270, 62], [284, 78], [262, 82], [276, 92], [292, 64]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={k > 0.6 ? 8 : 0} className="f" style={{ opacity: 0.8 }} />)}<T x="160" y="144" m>four genes added: an adult cell becomes pluripotent again</T></Svg>
  );
};

const Dolly = () => (
  <Svg><Step x={14} y={16} t="mammary cell" /><Step x={14} y={80} t="egg, nucleus removed" /><Arrow x1="88" y1="36" x2="122" y2="62" /><Arrow x1="88" y1="100" x2="122" y2="74" /><Step x={122} y={50} w={64} t="electric pulse" /><Arrow x1="186" y1="70" x2="214" y2="70" /><Step x={214} y={50} w={58} t="embryo" /><Arrow x1="243" y1="90" x2="243" y2="106" /><Step x={202} y={108} w={90} t="ewe → Dolly" />
    <T x="64" y="140" m>~277 eggs · 1 live lamb</T></Svg>
);

const Wheat = () => {
  const t = useClock(1), sw = Math.sin(t * 2) * 3;
  return (
    <Svg>{[[0, 0], [1, 1]].map(([c], i) => <g key={i}><line x1={70 + c * 160} y1="124" x2={70 + c * 160 + (c ? 0 : -34 + sw)} y2={c ? 54 : 100} className="s" style={{ strokeWidth: 3 }} />
      {Array.from({ length: 5 }, (_, k) => <ellipse key={k} cx={70 + c * 160 + (c ? 0 : -36 + sw) + (k % 2 ? 5 : -5)} cy={(c ? 54 : 100) - k * 5} rx={c ? 5 : 3} ry={c ? 8 : 5} className="f" style={{ opacity: 0.85 }} />)}</g>)}
      <T x="70" y="142" m>tall wheat: lodges (falls over)</T><T x="230" y="142" m>dwarf wheat: stays upright, more grain</T><T x="160" y="24" s={11}>India: wheat ~12 → ~20 million tons (1965 → 1970)</T></Svg>
  );
};

const Agri = () => (
  <Svg>{[0, 1, 2, 3].map((i) => <g key={i}><ellipse cx={50 + i * 70} cy="64" rx={5 + i * 3} ry={9 + i * 4} className="f" style={{ opacity: 0.8 }} /><T x={50 + i * 70} y="104" m>gen. {i * 1000 > 0 ? `~${i * 1000} yr` : 'wild'}</T>{i < 3 && <path d={`M${72 + i * 70} 64 h28`} className="s" />}</g>)}<T x="160" y="130" m>each harvest keeps the biggest seeds to sow: the crop is gradually domesticated</T></Svg>
);

const Aristo = () => (
  <Svg><Step x={110} y={8} w={100} t="Animals" /><Arrow x1="150" y1="48" x2="90" y2="66" /><Arrow x1="170" y1="48" x2="230" y2="66" /><Step x={30} y={64} w={120} t="red blood" /><Step x={170} y={64} w={120} t="no red blood" />
    <T x="90" y="124" m>mammals · birds · reptiles · fish</T><T x="230" y="124" m>insects · mollusks…</T><T x="160" y="146" m>Aristotle: observed 500+ species, sorted by structure and reproduction</T></Svg>
);

export const ART_BIO = {
  agri: { cap: 'From wild grass to grain: each harvest keeps the biggest seeds to sow, repeated over thousands of years.', el: <Agri /> },
  aristo: { cap: 'Aristotle classified animals by observation: with blood or without, egg-laying or live-bearing, dissected to see their structure.', el: <Aristo /> },
  hooke: { cap: 'A thin slice of cork under the microscope: small boxes like monastery cells; Hooke called them "cells".', el: <Cork /> },
  leeuw: { cap: 'A tiny bead-sized lens magnified ~270 times: the first sight of bacteria and single-celled organisms swimming in a water drop.', el: <Microbes /> },
  linn: { cap: 'Each species gets a two-part name (genus + species), placed in nested groups from broad to narrow.', el: <Tree /> },
  beagle: { cap: 'Galápagos finches: a common ancestor, but beaks differ on each island, matching the food there.', el: <Beaks /> },
  darwin: { cap: 'Natural selection: individuals with deeper beaks survive and breed more when seeds are hard, so the population average shifts (real random simulation).', el: <Selection /> },
  mendel: { cap: 'Crossing two Aa × Aa plants: four combination boxes give 3 dominant : 1 recessive; Mendel counted 705 purple : 224 white.', el: <Mendel /> },
  celltheory: { cap: 'Plants and animals are both made of cells, and every cell comes from a pre-existing cell.', el: <Cell2 /> },
  cajal: { cap: 'Each neuron is a separate cell: it receives signals at the small branches and passes them one way along the axon.', el: <Neuron /> },
  morgan: { cap: 'Genes are arranged in a row on the chromosome; the farther apart two genes are, the more often they "cross over", which let a gene map be drawn in fruit flies.', el: <Fly /> },
  avery: { cap: 'Only when the DNA is destroyed do bacteria lose the ability to transform: DNA, not protein, is the genetic material.', el: <Avery /> },
  franklin: { cap: 'Photo 51 by Franklin and Gosling: the X shape in the X-ray diffraction pattern shows DNA is a helix.', el: <Photo51 /> },
  dna: { cap: 'Two strands in a double helix pair up A–T, G–C: each strand already holds a copy of the other.', el: <Helix /> },
  code: { cap: 'Nirenberg put RNA made only of U into a protein-making system and got a chain of phenylalanine: the triplet UUU codes for Phe.', el: <Code /> },
  sanger: { cap: 'Sequencing by chain termination: fragments of different lengths run on a gel, the shortest travels farthest; read from the bottom up.', el: <Gel /> },
  pcr: { cap: 'Thermal cycle: separate the strands, anneal primers, extend; each round doubles the copies.', el: <Pcr /> },
  dolly: { cap: 'Moving the nucleus of a mammary cell into an egg with its nucleus removed, then implanting it in a ewe: the first clone from an adult cell.', el: <Dolly /> },
  ipsc: { cap: 'Four genes added to a skin cell return it to an embryo-like pluripotent state, with no need to use human embryos.', el: <Ipsc /> },
  ancient: { cap: 'The Neanderthal genome, read from 40,000-year-old bones, shows that modern non-Africans carry a small part of their DNA.', el: <Ancient /> },
  hgp: { cap: 'Reading all ~3.2 billion letters of the human genome, with the first complete version published in 2003.', el: <Hgp /> },
  crispr: { cap: 'Guide RNA brings Cas9 to the exact sequence to cut, next to a PAM sequence; the cell repairs the cut, opening the way to gene editing.', el: <Crispr /> },
  borlaug: { cap: 'Dwarf, sturdy wheat withstands lots of fertilizer without falling over; with irrigation and fertilizer, Indian output nearly doubled in 5 years.', el: <Wheat /> }
};
