// Text-to-speech via the browser's Web Speech API (prefers an English voice).
export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
export function cancelSpeech() { if (canSpeak) window.speechSynthesis.cancel(); }
export function speak(text) {
  if (!canSpeak || !text) return;
  cancelSpeech();
  const u = new SpeechSynthesisUtterance(text);
  const v = window.speechSynthesis.getVoices().find((x) => /^en(-|_)/i.test(x.lang));
  if (v) u.voice = v;
  u.lang = v ? v.lang : 'en-US';
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}
