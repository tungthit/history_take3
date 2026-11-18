// Generative ambient sound with the Web Audio API (no audio files to download):
// a slow, warm pad of soft chords, a few sparse bell notes, a soft engine hum and wind that grows with
// altitude and speed. Starts on the first user gesture (browser rule) and fades in.
const CHORDS = [ // gentle lo-fi progression (MIDI notes)
  [48, 55, 59, 64, 67], // Cmaj7
  [45, 52, 57, 60, 64], // Am7
  [41, 48, 52, 57, 60], // Fmaj7
  [43, 50, 55, 59, 62]  // G6-ish
];
const PENTA = [72, 74, 76, 79, 81, 84, 86, 88];
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

export class Ambience {
  constructor() {
    this.ctx = null; this.on = true; this.started = false; this.timers = [];
  }

  start() {
    if (this.started) { this.ctx?.resume?.(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.started = true;
    const ctx = this.ctx = new AC();
    this.master = ctx.createGain(); this.master.gain.value = 0;
    this.master.connect(ctx.destination);
    this.master.gain.linearRampToValueAtTime(this.on ? 0.9 : 0, ctx.currentTime + 3);

    // soft reverb from a generated impulse
    const len = ctx.sampleRate * 3.2, imp = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = imp.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    this.verb = ctx.createConvolver(); this.verb.buffer = imp;
    const wet = ctx.createGain(); wet.gain.value = 0.55; this.verb.connect(wet).connect(this.master);

    this.music = ctx.createGain(); this.music.gain.value = 0.32;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400; lp.Q.value = 0.3;
    this.music.connect(lp); lp.connect(this.master); lp.connect(this.verb);

    // wind: looping filtered noise
    const nb = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate), nd = nb.getChannelData(0);
    let last = 0;
    for (let i = 0; i < nd.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; nd[i] = last * 3.5; } // brown-ish
    const noise = ctx.createBufferSource(); noise.buffer = nb; noise.loop = true;
    this.windF = ctx.createBiquadFilter(); this.windF.type = 'bandpass'; this.windF.frequency.value = 500; this.windF.Q.value = 0.6;
    this.windG = ctx.createGain(); this.windG.gain.value = 0.15;
    noise.connect(this.windF).connect(this.windG).connect(this.master);
    noise.start();
    // engine hum, very low and quiet
    this.hum = ctx.createOscillator(); this.hum.type = 'sawtooth'; this.hum.frequency.value = 58;
    const hf = ctx.createBiquadFilter(); hf.type = 'lowpass'; hf.frequency.value = 180;
    this.humG = ctx.createGain(); this.humG.gain.value = 0.02;
    this.hum.connect(hf).connect(this.humG).connect(this.master); this.hum.start();

    this.chordIx = 0;
    this.nextChord(ctx.currentTime + 0.2);
    this.bells();
  }

  nextChord(at) {
    if (!this.ctx) return;
    const ctx = this.ctx, notes = CHORDS[this.chordIx % CHORDS.length], dur = 9;
    this.chordIx++;
    notes.forEach((m, i) => {
      [-6, 6].forEach((det) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = i === 0 ? 'sine' : 'triangle'; o.frequency.value = hz(m); o.detune.value = det + (Math.random() - 0.5) * 4;
        g.gain.setValueAtTime(0, at);
        g.gain.linearRampToValueAtTime((i === 0 ? 0.09 : 0.045) / 2, at + 3);
        g.gain.setValueAtTime((i === 0 ? 0.09 : 0.045) / 2, at + dur - 1);
        g.gain.linearRampToValueAtTime(0, at + dur + 2.5);
        o.connect(g).connect(this.music); o.start(at); o.stop(at + dur + 3);
      });
    });
    const t = setTimeout(() => this.nextChord(this.ctx.currentTime + 0.05), (dur - 0.3) * 1000);
    this.timers.push(t);
  }

  bells() {
    if (!this.ctx) return;
    const ctx = this.ctx, at = ctx.currentTime + 0.05;
    const m = PENTA[Math.floor(Math.random() * PENTA.length)];
    const o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = hz(m); o2.type = 'sine'; o2.frequency.value = hz(m) * 2.01;
    g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(0.05, at + 0.02); g.gain.exponentialRampToValueAtTime(0.0008, at + 3.5);
    o.connect(g); o2.connect(g); g.connect(this.music);
    o.start(at); o2.start(at); o.stop(at + 3.6); o2.stop(at + 3.6);
    const t = setTimeout(() => this.bells(), 1800 + Math.random() * 4200);
    this.timers.push(t);
    if (this.timers.length > 50) this.timers = this.timers.slice(-10);
  }

  // altitude 0..1, speed 0..1, zoom 0..1 (orbit view is quieter)
  update(alt, speed, zoom) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const near = 1 - zoom;
    this.windG.gain.setTargetAtTime((0.05 + 0.2 * alt + 0.12 * speed) * (0.35 + 0.65 * near), t, 0.4);
    this.windF.frequency.setTargetAtTime(380 + 700 * alt + 400 * speed, t, 0.5);
    this.humG.gain.setTargetAtTime(0.025 * near, t, 0.4);
    this.hum.frequency.setTargetAtTime(54 + speed * 10, t, 0.5);
  }

  setOn(on) {
    this.on = on;
    if (this.ctx) this.master.gain.setTargetAtTime(on ? 0.9 : 0, this.ctx.currentTime, 0.3);
  }

  dispose() {
    this.timers.forEach(clearTimeout); this.timers = [];
    try { this.ctx?.close(); } catch { /* already closed */ }
    this.ctx = null;
  }
}
