import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { speak } from './speech.js';
import { Ambience } from './audio.js';
import { GeoEngine } from './engine.js';
import { LANDMARKS } from './landmarks.js';
import { LAYER_STYLE } from './layers.js';
import { hasHistory, HISTORY_COUNTRIES, HISTORY_REGIONS, KIND_ICON, loadHistory } from './history.js';
import { PLACES, REGIONS } from './places.js';
import './geoflight.css';

const SciStory = lazy(() => import('./SciStory.jsx')); // the science timeline and its milestones load on demand

// Chill Geo-Flight: a small Earth to look round. No score, no timer, no way to fail. Two modes:
// - Explore (default): drag to move over the globe, wheel / pinch to zoom, always daytime.
// - Fly: a little plane. Left half of the screen: a floating stick (turn, climb). Right half: swipe up / down
//   or pinch to zoom. The sun moves, night falls, city lights come on.
// The 👁 button hides the interface (for screenshots); it stays on screen to bring it back.
const FLAGS = import.meta.glob('./assets/flags/*.svg', { query: '?url', import: 'default', eager: true });
const flagUrl = (iso) => FLAGS[`./assets/flags/${iso}.svg`];
const hhmm = (h) => `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.floor((h % 1) * 60)).padStart(2, '0')}`;
const dayWord = (h) => (h < 4.5 || h >= 20.5 ? 'Night' : h < 7 ? 'Dawn' : h < 17 ? 'Daytime' : h < 19.3 ? 'Sunset' : 'Dusk');
const LAYERS = [
  { k: 'famous', e: '🏛️', t: 'Famous landmarks', s: '3D models of buildings and wonders' },
  { k: 'history', e: '📜', t: 'History', s: 'Vietnam and other countries: eras, battles, commanders' },
  { k: 'science', e: '🔬', t: 'Science', s: 'Drag time: why each discovery was needed, where it happened, what it built on' },
  { k: 'roads', e: '🛣️', t: 'Main roads', s: 'Motorways and highways' },
  { k: 'rail', e: '🚆', t: 'Railways', s: 'High-speed trains stand out in pink' },
  { k: 'water', e: '⛴️', t: 'Waterways', s: 'Big rivers, ferry and sea routes' }
];
const fmtPop = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)} million people` : `${Math.round(n / 1000)} thousand people`);

export default function GeoFlight({ onBack }) {
  const rootRef = useRef(null);
  const viewRef = useRef(null);
  const tagRef = useRef(null);
  const stickRef = useRef(null);
  const knobRef = useRef(null);
  const eng = useRef(null);
  const amb = useRef(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState('');
  const [hidden, setHidden] = useState(false);
  const [sound, setSound] = useState(() => { try { return localStorage.getItem('gf-sound') !== 'off'; } catch { return true; } });
  const [country, setCountry] = useState(null);
  const [sea, setSea] = useState(null);
  const [city, setCity] = useState(null);
  const [auto, setAuto] = useState(null);
  const [panel, setPanel] = useState(null); // 'places' | 'time' | 'layers' | null
  const [histIso, setHistIso] = useState('vn'); // country whose history is listed
  const [hist, setHist] = useState(null);        // its data { iso, name, eras } once loaded
  const [era, setEra] = useState(null);          // index in hist.eras shown on the map
  const [histOpen, setHistOpen] = useState(false); // the history card (country overview or one period)
  const [histSel, setHistSel] = useState(-1); // selected event of that period
  const histList = useRef(null);
  const [layers, setLayers] = useState({ famous: 'on' }); // name -> 'on' | 'loading' | undefined; famous places on by default
  const [hour, setHour] = useState(16.6);
  const [zoom, setZoomUi] = useState(0.3);
  const [flow, setFlow] = useState(true);
  const [toast, setToast] = useState(null);
  const [hint, setHint] = useState(true);
  const [mode, setModeUi] = useState('explore');
  const fly = mode === 'fly';
  const dragHour = useRef(false);

  useEffect(() => {
    const a = amb.current = new Ambience();
    const e = eng.current = new GeoEngine(viewRef.current, {
      labelLayer: tagRef.current,
      audio: a,
      onProgress: setProgress,
      onReady: () => setReady(true),
      onCountry: (c, oc) => { setCountry(c); setSea(c ? null : oc); },
      onCity: setCity,
      onSay: (t) => speak(t),
      onAuto: (x) => setAuto(x ? { place: x.place, wander: x.wander } : null),
      onHistoryPick: (i) => { setHistSel(i); eng.current?.focusHistory(i); },
      onArrive: (pl) => { if (pl.silent) return; setToast(pl); speak(pl.en); setTimeout(() => setToast((t) => (t === pl ? null : t)), 5000); },
      onTick: ({ hour: h, zoom: z }) => { if (!dragHour.current) setHour(h); setZoomUi(z); }
    });
    e.load().catch(() => setError('Could not load the map. Check your connection and try again.'));
    return () => { e.dispose(); a.dispose(); };
  }, []);

  useEffect(() => { amb.current?.setOn(sound); try { localStorage.setItem('gf-sound', sound ? 'on' : 'off'); } catch { /* private mode */ } }, [sound]);
  useEffect(() => { if (!started) return undefined; setHint(true); const t = setTimeout(() => setHint(false), 9000); return () => clearTimeout(t); }, [started, mode]);

  const switchMode = (m) => {
    if (m === mode) return;
    eng.current?.setMode(m);
    setModeUi(m); setPanel(null); setFlow(true); setAuto(null);
    if (m === 'fly' && era != null) showEra(null); // the history layer belongs to Explore
  };
  const takeOff = (m = 'explore') => { switchMode(m); setStarted(true); eng.current?.start(); amb.current?.start(); amb.current?.setOn(sound); };

  /* ---------- touch / mouse on the view ---------- */
  const pts = useRef(new Map());
  const gesture = useRef(null);
  const onDown = (e) => {
    if (!started) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return; // only the left button moves the map
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: performance.now() });
    const r = rootRef.current.getBoundingClientRect();
    if (pts.current.size === 2) {
      const [a, b] = [...pts.current.values()];
      gesture.current = { kind: 'pinch', d: Math.hypot(a.x - b.x, a.y - b.y) };
      release();
      return;
    }
    if (!fly) {
      gesture.current = { kind: 'pan', id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
      eng.current?.setDragging(true);
    } else if (e.clientX - r.left < r.width * 0.5) {
      gesture.current = { kind: 'stick', id: e.pointerId, cx: e.clientX - r.left, cy: e.clientY - r.top };
      const s = stickRef.current;
      s.style.left = `${e.clientX - r.left}px`; s.style.top = `${e.clientY - r.top}px`; s.classList.add('on');
      knobRef.current.style.transform = 'translate(-50%, -50%)';
    } else {
      gesture.current = { kind: 'zoom', id: e.pointerId, y: e.clientY };
    }
    setPanel(null);
  };
  const onMove = (e) => {
    const p = pts.current.get(e.pointerId);
    if (!p) return;
    p.x = e.clientX; p.y = e.clientY;
    const g = gesture.current, E = eng.current;
    if (!g || !E) return;
    if (g.kind === 'pan' && g.id === e.pointerId) {
      const now = performance.now();
      E.pan(e.clientX - g.x, e.clientY - g.y, now - g.t);
      g.x = e.clientX; g.y = e.clientY; g.t = now;
    } else if (g.kind === 'pinch' && pts.current.size >= 2) {
      const [a, b] = [...pts.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      E.zoomBy((g.d - d) / 320); g.d = d;
    } else if (g.kind === 'stick' && g.id === e.pointerId) {
      const r = rootRef.current.getBoundingClientRect();
      const R = 56;
      let dx = e.clientX - r.left - g.cx, dy = e.clientY - r.top - g.cy;
      const l = Math.hypot(dx, dy);
      if (l > R) { dx *= R / l; dy *= R / l; }
      knobRef.current.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      const turn = Math.abs(dx) < 6 ? 0 : dx / R, climb = Math.abs(dy) < 6 ? 0 : -dy / R;
      E.input.turn = turn; E.input.climb = climb;
      if (Math.abs(turn) > 0.05 || Math.abs(climb) > 0.05) E.stopAuto(true);
    } else if (g.kind === 'zoom' && g.id === e.pointerId) {
      E.zoomBy((e.clientY - g.y) / 260); g.y = e.clientY;
    }
  };
  const release = () => {
    stickRef.current?.classList.remove('on');
    if (eng.current) {
      eng.current.input.turn = 0; eng.current.input.climb = 0;
      // a finger that stopped before lifting should not fling the globe
      const g = gesture.current;
      if (g?.kind === 'pan' && performance.now() - g.t > 90) eng.current.panV.set(0, 0);
      eng.current.setDragging(false);
    }
  };
  const onUp = (e) => {
    const p = pts.current.get(e.pointerId);
    pts.current.delete(e.pointerId);
    if (pts.current.size === 0) { gesture.current = null; release(); }
  };
  const onWheel = (e) => { eng.current?.zoomBy(e.deltaY / 1200); };
  const stop = (e) => e.stopPropagation();
  const eras = hist?.eras || [];
  const showEra = (i, data = hist) => {
    setEra(i); setHistSel(-1);
    eng.current?.setHistory(i == null || !data ? null : data.eras[i]);
    if (i != null) setPanel(null);
  };
  // pick a country: glide to it and open its overview in the history card
  const pickHistCountry = async (iso, fly = true) => {
    setHistIso(iso); setHist(null); showEra(null); setHistOpen(true);
    if (fly) eng.current?.focusCountry(iso);
    try { setHist(await loadHistory(iso)); } catch { setHist({ iso, eras: [] }); }
  };
  const pickEvent = (i) => { setHistSel(i); eng.current?.focusHistory(i); };
  useEffect(() => { histList.current?.querySelector('.sel')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [histSel]);
  const toggleLayer = async (k) => {
    const on = layers[k] !== 'on' && layers[k] !== 'loading';
    if (k === 'science') {
      // the science timeline has its own panels, so the history card gives way to it
      setLayers((l) => ({ ...l, science: on ? 'on' : undefined, history: undefined }));
      showEra(null); setHistOpen(false);
      if (on) setPanel(null);
      return;
    }
    if (k === 'history') {
      setLayers((l) => ({ ...l, history: on ? 'on' : undefined, science: undefined }));
      if (!on) { showEra(null); setHistOpen(false); }
      // start with the country under the view when it has a history (no camera move), else Viet Nam
      else if (!hist) { const here = country && hasHistory(country.iso2); pickHistCountry(here ? country.iso2 : 'vn', !here); }
      else setHistOpen(true);
      return;
    }
    setLayers((l) => ({ ...l, [k]: on ? 'loading' : undefined }));
    try { await eng.current?.setLayer(k, on); } catch { /* offline: the layer stays off */ }
    setLayers((l) => ({ ...l, [k]: on ? 'on' : undefined }));
  };

  const say = (t) => t && speak(t);
  const grouped = useMemo(() => Object.entries(REGIONS).map(([k, v]) => ({ k, v, list: PLACES.filter((p) => p.region === k) })), []);
  const fullScreen = () => { const el = rootRef.current; if (document.fullscreenElement) document.exitFullscreen?.(); else el.requestFullscreen?.().catch(() => {}); };
  const canFull = typeof document !== 'undefined' && !!document.documentElement.requestFullscreen;

  return (
    <div className={`gf-root${hidden ? ' gf-hidden' : ''}`} ref={rootRef} onWheel={onWheel}>
      <div className="gf-view" ref={viewRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onContextMenu={(e) => e.preventDefault()} />
      <div className="gf-tags" ref={tagRef} aria-hidden="true" />
      <div className="gf-stick" ref={stickRef} aria-hidden="true"><span className="gf-knob" ref={knobRef} /></div>

      {/* ---------- HUD ---------- */}
      {started && <div className="gf-hud">
        <div className="gf-top" onPointerDown={stop}>
          {onBack && <button type="button" className="gf-btn" onClick={onBack} aria-label="Exit">←</button>}
          <div className="gf-mode" role="tablist" aria-label="Mode">
            <button type="button" role="tab" aria-selected={!fly} className={fly ? '' : 'on'} onClick={() => switchMode('explore')}><span aria-hidden="true">🌍</span> Explore</button>
            <button type="button" role="tab" aria-selected={fly} className={fly ? 'on' : ''} onClick={() => switchMode('fly')}><span aria-hidden="true">✈️</span> Bay</button>
          </div>
          <div className="gf-top-r">
            <button type="button" className={`gf-btn${panel === 'places' ? ' on' : ''}`} onClick={() => setPanel(panel === 'places' ? null : 'places')} aria-label={fly ? 'Fly to a place' : 'Go to a place'} title={fly ? 'Fly to…' : 'Go to…'}>🧭</button>
            {!fly && <button type="button" className={`gf-btn${panel === 'layers' ? ' on' : ''}${Object.entries(layers).some(([k, v]) => v && k !== 'famous') ? ' dot' : ''}`} onClick={() => setPanel(panel === 'layers' ? null : 'layers')} aria-label="Map layers" title="Map layers">🗺️</button>}
            {fly && <button type="button" className={`gf-btn${panel === 'time' ? ' on' : ''}`} onClick={() => setPanel(panel === 'time' ? null : 'time')} aria-label="Time of day" title="Time">{hour >= 6 && hour < 18.5 ? '☀️' : '🌙'}</button>}
            <button type="button" className="gf-btn" onClick={() => setSound(!sound)} aria-label={sound ? 'Mute sound' : 'Turn sound on'}>{sound ? '🔊' : '🔇'}</button>
            {canFull && <button type="button" className="gf-btn gf-full" onClick={fullScreen} aria-label="Full screen">⛶</button>}
            <button type="button" className={`gf-btn gf-eye${hidden ? ' on' : ''}`} onClick={() => setHidden(!hidden)} aria-label={hidden ? 'Show controls' : 'Hide controls'} title={hidden ? 'Show controls' : 'Hide controls'}>{hidden ? '🙈' : '👁'}</button>
          </div>
        </div>

        {panel === 'places' && (
          <div className="gf-panel gf-places" onPointerDown={stop} onWheel={stop}>
            <div className="gf-panel-h">{fly ? 'Fly to…' : 'Go to…'}<button type="button" className="gf-x" onClick={() => setPanel(null)} aria-label="Close">✕</button></div>
            <button type="button" className={`gf-wander${auto?.wander ? ' on' : ''}`} onClick={() => { if (auto?.wander) eng.current.stopAuto(true); else { eng.current.wander(); setPanel(null); } }} aria-label={fly ? 'Random flight' : 'Random explore'}>
              <span aria-hidden="true">🎲</span>
              <span>{fly
                ? <><b>{auto?.wander ? 'Flying at random' : 'Random flight'}</b><small>{auto?.wander ? 'Tap to stop and take the controls' : 'Glides past landmarks like a screensaver'}</small></>
                : <><b>{auto?.wander ? 'Exploring at random' : 'Random explore'}</b><small>{auto?.wander ? 'Tap to stop' : 'Takes you past landmarks, 9 seconds each'}</small></>}</span>
            </button>
            {grouped.map((g) => (
              <div key={g.k} className="gf-group">
                <p>{g.v}</p>
                <div className="gf-chips">
                  {g.list.map((pl) => (
                    <button type="button" key={pl.id} className={`gf-chip${auto?.place?.id === pl.id ? ' on' : ''}`} onClick={() => { eng.current.flyTo(pl); setPanel(null); }}>
                      <span aria-hidden="true">{pl.e}</span> {pl.en}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {panel === 'layers' && !fly && (
          <div className="gf-panel gf-layers" onPointerDown={stop} onWheel={stop}>
            <div className="gf-panel-h">Map layers<button type="button" className="gf-x" onClick={() => setPanel(null)} aria-label="Close">✕</button></div>
            {LAYERS.map((L) => (
              <div key={L.k} className={`gf-layer${layers[L.k] ? ' on' : ''}`}>
                <button type="button" className="gf-layer-t" onClick={() => toggleLayer(L.k)} aria-pressed={layers[L.k] === 'on'}>
                  <span className="gf-layer-e" aria-hidden="true">{L.e}</span>
                  <span><b>{L.t}</b><small>{layers[L.k] === 'loading' ? 'Loading data…' : L.s}</small></span>
                  <i className="gf-switch" aria-hidden="true" />
                </button>
                {L.k === 'history' && layers.history === 'on' && (
                  // pick a country here; its timeline opens in the history card on the left
                  <div className="gf-hregions">{HISTORY_REGIONS.map((R) => {
                    const list = R.countries.filter((c) => hasHistory(c.iso));
                    return list.length > 0 && (
                      <div key={R.name}>
                        <p>{R.name}</p>
                        <div className="gf-hcountries">{list.map((c) => (
                          <button type="button" key={c.iso} className={histIso === c.iso ? 'on' : ''} onClick={() => pickHistCountry(c.iso)} title={c.name}>
                            {flagUrl(c.iso) && <img src={flagUrl(c.iso)} alt="" />}<span>{c.name}</span>
                          </button>
                        ))}</div>
                      </div>
                    );
                  })}</div>
                )}
                {layers[L.k] === 'on' && LAYER_STYLE[L.k] && (
                  <div className="gf-legend">{LAYER_STYLE[L.k].map((st) => (
                    <span key={st.label}><i className={st.dash ? 'dash' : ''} style={{ '--c': `#${st.color.toString(16).padStart(6, '0')}`, '--w': `${Math.max(2, st.width)}px` }} />{st.label}</span>
                  ))}</div>
                )}
              </div>
            ))}
            <p className="gf-src">Landmark models are not to scale (except the Great Wall and the Amazon rainforest). Data: Natural Earth (roads, railways, rivers). High-speed trains: lines in service, drawn through the main stations.</p>
          </div>
        )}

        {panel === 'time' && (
          <div className="gf-panel gf-time" onPointerDown={stop}>
            <div className="gf-panel-h">{dayWord(hour)} · <b>{hhmm(hour)}</b> <small>local time</small><button type="button" className="gf-x" onClick={() => setPanel(null)} aria-label="Close">✕</button></div>
            <input type="range" min="0" max="23.99" step="0.05" value={hour} className="gf-range" aria-label="Hour of day"
              onPointerDown={() => { dragHour.current = true; }} onPointerUp={() => { dragHour.current = false; }}
              onChange={(e) => { const h = Number(e.target.value); setHour(h); eng.current.setLocalHour(h); }} />
            <div className="gf-time-marks"><span>🌙 0h</span><span>🌅 6h</span><span>☀️ 12h</span><span>🌇 18h</span><span>24h</span></div>
            <div className="gf-time-row">
              {[['🌅 Dawn', 6.2], ['☀️ Noon', 12], ['🌇 Sunset', 18.1], ['🌃 Night', 22]].map(([t, h]) => (
                <button type="button" key={t} className="gf-chip" onClick={() => { setHour(h); eng.current.setLocalHour(h); }}>{t}</button>
              ))}
              <button type="button" className={`gf-chip${flow ? '' : ' on'}`} onClick={() => { setFlow(!flow); eng.current.setTimeFlow(!flow); }}>{flow ? '⏸ Pause time' : '▶ Let time flow'}</button>
            </div>
          </div>
        )}

        {!fly && histOpen && layers.history === 'on' && era == null && (
          <div className="gf-card gf-hcard" key={`hc-${histIso}`} onPointerDown={stop} onWheel={stop}>
            <div className="gf-hcard-h">
              {flagUrl(histIso) && <img className="gf-hflag" src={flagUrl(histIso)} alt="" />}
              <div><b>History of {HISTORY_COUNTRIES.find((c) => c.iso === histIso)?.name}</b><small>{hist ? `${eras.length} eras · ${eras.reduce((n, E) => n + E.ev.length, 0)} events` : 'Loading…'}</small></div>
              <button type="button" className="gf-x" onClick={() => setHistOpen(false)} aria-label="Close">✕</button>
            </div>
            <p className="gf-hcard-d">Pick an era to see its battles, events and commanders on the map.</p>
            <ol className="gf-hev">{eras.map((E, i) => (
              <li key={E.id}>
                <button type="button" onClick={() => showEra(i)}>
                  <span className="gf-hev-i" aria-hidden="true">{i + 1}</span>
                  <span className="gf-hev-t"><b>{E.t}</b><small>{E.y} · {E.ev.length} events</small></span>
                </button>
              </li>
            ))}</ol>
          </div>
        )}

        {!fly && era != null && eras[era] && (
          <div className="gf-card gf-hcard" key={`era-${histIso}-${era}`} onPointerDown={stop} onWheel={stop}>
            <div className="gf-hcard-h">
              <button type="button" className="gf-say sm" disabled={era === 0} onClick={() => showEra(era - 1)} aria-label="Previous era">‹</button>
              {flagUrl(histIso) && <img className="gf-hflag" src={flagUrl(histIso)} alt="" />}
              <div><b>{eras[era].t}</b><small>{eras[era].y}</small></div>
              <button type="button" className="gf-say sm" disabled={era === eras.length - 1} onClick={() => showEra(era + 1)} aria-label="Next era">›</button>
              <button type="button" className="gf-x" onClick={() => { showEra(null); setHistOpen(false); }} aria-label="Close">✕</button>
            </div>
            <button type="button" className="gf-hback" onClick={() => showEra(null)}>← Eras of {HISTORY_COUNTRIES.find((c) => c.iso === histIso)?.name}</button>
            <p className="gf-hcard-d">{eras[era].d}{eras[era].route && <em> · Dashed line: {eras[era].route.t}</em>}</p>
            <ol className="gf-hev" ref={histList}>{eras[era].ev.map((e, i) => (
              <li key={e.n + e.y} className={`k-${e.k}${histSel === i ? ' sel' : ''}`}>
                <button type="button" onClick={() => pickEvent(i)}>
                  <span className="gf-hev-i" aria-hidden="true">{KIND_ICON[e.k]}</span>
                  <span className="gf-hev-t"><b>{e.n}</b><small>{e.y}{e.approx ? ' · approximate location' : ''}</small></span>
                </button>
                {histSel === i && (
                  <div className="gf-hev-d">
                    {e.vn && <p><span>{e.k === 'battle' ? 'Commander' : 'Key figure'}</span>{e.vn}</p>}
                    {e.vs && <p className="vs"><span>Opponent</span>{e.vs}</p>}
                    <p className="txt">{e.d}</p>
                  </div>
                )}
              </li>
            ))}</ol>
          </div>
        )}

        {(country || sea) && (fly || (era == null && layers.science !== 'on' && !(histOpen && layers.history === 'on'))) && (
          <div className="gf-card" key={country ? country.id : sea.en} onPointerDown={stop}>
            <div className="gf-card-main">
              {country ? (flagUrl(country.iso2) ? <img className="gf-flag" src={flagUrl(country.iso2)} alt="" /> : <span className="gf-flag gf-flag-e">🏳️</span>) : <span className="gf-flag gf-flag-e">🌊</span>}
              <div className="gf-card-t">
                <b>{country ? country.name : sea.en}</b>

              </div>
              <button type="button" className="gf-say" onClick={() => say(country ? country.name : sea.en)} aria-label="Hear the name">🔈</button>
            </div>
            {country?.cap && (
              <div className="gf-card-row"><span>Capital</span><b>{country.cap[0]}</b><button type="button" className="gf-say sm" onClick={() => say(`The capital of ${country.name} is ${country.cap[0]}`)} aria-label="Hear the capital">🔈</button></div>
            )}
            {country && LANDMARKS.some((l) => l.iso === country.iso2) && (
              <div className="gf-card-row gf-lms"><span>Famous</span>
                <div>{LANDMARKS.filter((l) => l.iso === country.iso2).map((l) => (
                  <button type="button" key={l.id} className="gf-lm" onClick={() => { say(l.en); eng.current.flyTo(l); }} title={`Fly to `}>{l.e} {l.en}</button>
                ))}</div>
              </div>
            )}
            {city && city[4] === country?.id && (
              <div className="gf-card-row city"><span>{fly ? (city[5] ? '⭐ Below you' : '📍 Below you') : (city[5] ? '⭐ City' : '📍 City')}</span><b>{city[0]}</b><em>{fmtPop(city[3])}</em><button type="button" className="gf-say sm" onClick={() => say(city[0])} aria-label="Hear the city name">🔈</button></div>
            )}
          </div>
        )}

        {!fly && layers.science === 'on' && (
          <Suspense fallback={null}><SciStory eng={eng} onClose={() => toggleLayer('science')} /></Suspense>
        )}

        {auto && (
          <div className="gf-auto" onPointerDown={stop}>
            <span className="gf-auto-dot" aria-hidden="true" />
            {fly ? (auto.wander ? 'Random flight' : 'Autopilot') : (auto.wander ? 'Random explore' : 'Heading to')} · <b>{auto.place.e} {auto.place.en}</b>
            <button type="button" className="gf-x" onClick={() => eng.current.stopAuto(true)} aria-label={fly ? 'Take the controls' : 'Stop'}>✕</button>
          </div>
        )}

        <div className="gf-zoom" aria-hidden="true"><span style={{ top: `${zoom * 100}%` }} /><i>{fly ? '🛩️' : '🏙️'}</i><i>🪐</i></div>

        {toast && (
          <div className="gf-toast" onPointerDown={stop}>
            <span aria-hidden="true">{toast.e}</span>
            <div><b>{toast.en}</b></div>
            <button type="button" className="gf-say" onClick={() => say(toast.en)} aria-label="Listen">🔈</button>
          </div>
        )}

        {started && hint && (
          <div className="gf-hint" aria-hidden="true">
            {fly ? <>
              <span>👈 Hold and drag on the left to <b>steer</b></span>
              <span>Slide on the right or pinch to <b>zoom</b> 👉</span>
              <span>The 👁 button <b>hides the controls</b> · keyboard: ← → ↑ ↓, + −</span>
            </> : <>
              <span>✋ Drag to <b>move</b> around the globe</span>
              <span>Scroll or pinch to <b>zoom</b>; get close to see the 3D landmarks</span>
              <span>The 👁 button <b>hides the controls</b> · keyboard: ← → ↑ ↓, + −</span>
            </>}
          </div>
        )}
      </div>}

      {!started && (
        <div className="gf-intro">
          <div className="gf-intro-card">
            <div className="gf-intro-globe" aria-hidden="true"><span>✈️</span></div>
            <h2>Chill Geo-Flight</h2>
            <p>Wander around a tiny Earth: find countries, capitals, famous landmarks, ships and planes. No score, no time limit.</p>
            {error ? <p className="gf-err">{error}</p> : ready
              ? <div className="gf-go-row">
                <button type="button" className="gf-go" onClick={() => takeOff('explore')}>Explore 🌍</button>
                <button type="button" className="gf-go gf-go-2" onClick={() => takeOff('fly')}>Fly experience ✈️<small>fly a plane · day and night</small></button>
              </div>
              : <div className="gf-bar"><span style={{ width: `${Math.round(progress * 100)}%` }} /><em>{progress < 0.86 ? 'Loading the map' : 'Loading detailed satellite imagery'}… {Math.round(progress * 100)}%</em></div>}
            {onBack && <button type="button" className="gf-back-link" onClick={onBack}>← Back</button>}
          </div>
        </div>
      )}
    </div>
  );
}
