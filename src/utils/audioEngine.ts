/**
 * Luxury Web Audio API Sound Engine
 * Synthesizes crystal glass flacon resonance, mist spray atomization, and gentle chimes
 * without external audio dependencies.
 */

let audioCtx: AudioContext | null = null;
let isAudioMuted = true; // start muted by default for luxury etiquette

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const AudioEngine = {
  isMuted: () => isAudioMuted,
  setMuted: (muted: boolean) => {
    isAudioMuted = muted;
    if (!muted) {
      getAudioContext();
    }
  },
  toggleMuted: () => {
    isAudioMuted = !isAudioMuted;
    if (!isAudioMuted) {
      getAudioContext();
    }
    return !isAudioMuted;
  },

  /**
   * Delicate crystal flacon bell chime on note tap or interaction
   */
  playCrystalChime: (freq = 880) => {
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // slight shimmer
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.3);
    } catch {
      // ignore audio context failures
    }
  },

  /**
   * 432 Hz pure harmonic crystal flacon strike
   */
  playResonant432Hz: () => {
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, ctx.currentTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(432 * 2, ctx.currentTime); // octave overtone

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 3.0);
      osc2.stop(ctx.currentTime + 3.0);
    } catch {
      // ignore
    }
  },

  /**
   * Fragrance atomization mist spray sound
   */
  playMistSpray: () => {
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // Pinkish noise generator for soft spray hiss
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.04;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(ctx.currentTime + 0.4);
    } catch {
      // ignore
    }
  },

  /**
   * Subtle luxury tactile feedback
   */
  playTactileClick: () => {
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // ignore
    }
  }
};
