import { Component, useEffect, useMemo, useRef, useState } from 'react';
import { BRANCH_BY_ID, BRANCHES, hex } from './branches.js';
import { ART } from './artall.js';
import { ACTIVE, fmtYear, LINKS, NODE_INDEX, NODES, posToYear } from './scistory.js';

// The Science layer: drag the time slider (or press play) and the globe fills with the discoveries made up to
// that year; arcs join each one to the ideas it was built on. Tap a flag to read why it was needed, what it
// grew out of, and what it led to; "‹ ›" walks the story one milestone at a time.
// a broken picture must never take the whole page down: it just disappears
class Safe extends Component {
  state = { bad: false };
  static getDerivedStateFromError() { return { bad: true }; }
  componentDidCatch(e) { console.error('illustration failed', e); }
  render() { return this.state.bad ? null : this.props.children; }
}
const MAX = 1000, SPEED = 20; // slider units per second while playing
const sections = [['❓', 'Why was it needed?', 'need'], ['🛠️', 'Effort and groundwork', 'how'], ['➡️', 'What it led to', 'so']];

export default function SciStory({ eng, onClose }) {
  const [pos, setPos] = useState(0);
  const [sel, setSel] = useState(-1);
  const [br, setBr] = useState(null);
  const [play, setPlay] = useState(false);
  const [open, setOpen] = useState(true);
  const body = useRef(null);
  const posRef = useRef(0);
  const setP = (v) => { posRef.current = v; setPos(v); };

  // the engine draws; this component owns the time, the selection and the filter
  useEffect(() => {
    const E = eng.current;
    E?.setSci(NODES, LINKS);
    E?.frameSci(32, 30, 0.82);
    E && (E.cb.onSciPick = (i) => { setSel(i); setP(Math.max(posRef.current, NODES[i].pos)); setPlay(false); E.focusSci(i); });
    return () => { if (E) { E.cb.onSciPick = null; E.clearSci(); } };
  }, [eng]);
  useEffect(() => { eng.current?.setSciView({ pos, br, sel }); }, [eng, pos, br, sel]);

  useEffect(() => {
    if (!play) return undefined;
    // frame-based so the thumb glides at any refresh rate
    let raf, last = performance.now();
    const tick = (now) => {
      const n = Math.min(MAX, posRef.current + Math.min(0.1, (now - last) / 1000) * SPEED);
      last = now; setP(n);
      if (n >= MAX) setPlay(false); else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play]);

  const year = posToYear(pos);
  // newest visible milestone (of the chosen branch): shown when nothing is selected
  const latest = useMemo(() => {
    let r = -1;
    NODES.forEach((n, i) => { if (n.pos <= pos && (!br || n.k === br)) r = i; });
    return r;
  }, [pos, br]);
  const shownIdx = sel >= 0 ? sel : latest;
  const N = shownIdx >= 0 ? NODES[shownIdx] : null;
  useEffect(() => { body.current?.scrollTo?.({ top: 0 }); }, [shownIdx]);

  const go = (i) => {
    if (i < 0 || i >= NODES.length) return;
    setSel(i); setP(Math.max(posRef.current, NODES[i].pos)); setPlay(false);
    eng.current?.focusSci(i);
  };
  // step through the milestones of the current filter in time order
  const visibleIdx = useMemo(() => NODES.map((n, i) => i).filter((i) => !br || NODES[i].k === br), [br]);
  const step = (d) => {
    const cur = shownIdx >= 0 ? visibleIdx.indexOf(shownIdx) : -1;
    const next = cur < 0 ? (d > 0 ? visibleIdx[0] : -1) : visibleIdx[cur + d];
    if (next != null && next >= 0) go(next);
  };
  // choosing a branch starts at its own first milestone, not at the beginning of time
  const pickBranch = (id) => {
    if (br === id) { setBr(null); return; }
    setBr(id); setPlay(false);
    const first = NODES.findIndex((n) => n.k === id);
    if (first >= 0) { setSel(first); setP(NODES[first].pos); eng.current?.focusSci(first); }
  };
  const stopEv = (e) => e.stopPropagation();
  const count = NODES.filter((n) => n.pos <= pos && (!br || n.k === br)).length;
  const links = (idx) => ({
    from: NODES[idx].from.map((id) => NODE_INDEX[id]),
    to: LINKS.filter(([a]) => a === idx).map(([, b]) => b)
  });
  const lk = N ? links(shownIdx) : null;
  const B = N && BRANCH_BY_ID[N.k];

  return (
    <>
      {open && (
        <div className="gf-card gf-story" onPointerDown={stopEv} onWheel={stopEv}>
          {N ? (
            <>
              <div className="gf-story-h" style={{ '--c': hex(B.c) }}>
                <span className="gf-story-i" aria-hidden="true">{B.e}</span>
                <div><b>{N.n}</b><small>{N.yl} · {B.t}{N.approx ? ' · approximate location' : ''}</small></div>
                <button type="button" className="gf-x" onClick={() => setOpen(false)} aria-label="Collapse">▾</button>
              </div>
              <div className="gf-story-b" ref={body}>
                {ART[N.id] && <Safe key={N.id}><figure className="gf-art" style={{ '--c': hex(B.c) }}>{ART[N.id].el}<figcaption>{ART[N.id].cap} <em>(Hand-drawn illustration, not a photo.)</em></figcaption></figure></Safe>}
                <p className="gf-story-who">{N.who}</p>
                {sections.map(([e, t, f]) => (
                  <section key={f}>
                    <h4><span aria-hidden="true">{e}</span> {t}</h4>
                    <p>{N[f]}</p>
                  </section>
                ))}
                {N.also && <section><h4><span aria-hidden="true">🌐</span> Elsewhere at the same time</h4><p>{N.also}</p></section>}
                {lk.from.length > 0 && (
                  <div className="gf-story-l"><h4>⬅️ Built on</h4>
                    {lk.from.map((i) => <button type="button" key={i} onClick={() => go(i)} style={{ '--c': hex(BRANCH_BY_ID[NODES[i].k].c) }}>{BRANCH_BY_ID[NODES[i].k].e} {NODES[i].n} <i>{NODES[i].yl}</i></button>)}
                  </div>
                )}
                {lk.to.length > 0 && (
                  <div className="gf-story-l"><h4>➡️ Led to</h4>
                    {lk.to.map((i) => <button type="button" key={i} onClick={() => go(i)} style={{ '--c': hex(BRANCH_BY_ID[NODES[i].k].c) }}>{BRANCH_BY_ID[NODES[i].k].e} {NODES[i].n} <i>{NODES[i].yl}</i></button>)}
                  </div>
                )}
              </div>
              <div className="gf-story-nav">
                <button type="button" onClick={() => step(-1)} disabled={visibleIdx.indexOf(shownIdx) <= 0}>‹ Previous</button>
                <span>{visibleIdx.indexOf(shownIdx) + 1} / {visibleIdx.length}</span>
                <button type="button" onClick={() => step(1)} disabled={visibleIdx.indexOf(shownIdx) >= visibleIdx.length - 1}>Next ›</button>
              </div>
            </>
          ) : (
            <div className="gf-story-intro">
              <div className="gf-story-h"><span className="gf-story-i" aria-hidden="true">🔬</span><div><b>How did science grow?</b><small>{NODES.length} milestones · 11,000 years</small></div>
                <button type="button" className="gf-x" onClick={onClose} aria-label="Close">✕</button></div>
              <p>Every discovery had a reason to exist and stood on the shoulders of earlier work. Press <b>▶</b> or drag the time bar to watch centres of knowledge move around the world. Curved lines join each discovery to the ideas it built on.</p>
              <button type="button" className="gf-story-go" onClick={() => go(visibleIdx[0])}>Start from the beginning ›</button>
            </div>
          )}
        </div>
      )}

      <div className="gf-sci" onPointerDown={stopEv} onWheel={stopEv}>
        <div className="gf-sci-row">
          <button type="button" className="gf-sci-play" onClick={() => { if (pos >= MAX) { setP(0); setSel(-1); } setPlay(!play); }} aria-label={play ? 'Pause' : 'Play'}>{play ? '❚❚' : '▶'}</button>
          <div className="gf-sci-yr"><b>{fmtYear(year)}</b><small>{count} milestones</small></div>
          <input type="range" min="0" max={MAX} step="any" value={pos} className="gf-range" aria-label="Time"
            onChange={(e) => { setPlay(false); setP(Number(e.target.value)); setSel(-1); }} />
          {!open && <button type="button" className="gf-sci-play sm" onClick={() => setOpen(true)} aria-label="Open card">▴</button>}
          <button type="button" className="gf-sci-play sm" onClick={onClose} aria-label="Close science">✕</button>
        </div>
        <div className="gf-sci-br" role="group" aria-label="Filter by field">
          <button type="button" className={br == null ? 'on' : ''} onClick={() => setBr(null)}>All</button>
          {BRANCHES.filter((b) => ACTIVE.includes(b.id)).map((b) => (
            <button type="button" key={b.id} className={br === b.id ? 'on' : ''} style={{ '--c': hex(b.c) }} onClick={() => pickBranch(b.id)}>{b.e} {b.t}</button>
          ))}
        </div>
      </div>
    </>
  );
}
