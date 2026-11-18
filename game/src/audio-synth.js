// Zero-Dependency WebAudio API Shinto Procedural Audio Synthesizer for YukiStrike: Zero

  const HIRAJOSHI_CHORD_HZ = [523.25, 587.33, 622.25, 783.99, 830.61, 1046.5];

export function createShintoAudioSynth() {
  let ctx = null;
  let masterGain = null;
  let noiseBuffer = null;
  let muted = false;

  function ensureContext() {
    if (muted) return null;
    if (typeof window === 'undefined' && typeof globalThis === 'undefined') return null;
    const AudioCtx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext))
      || (typeof globalThis !== 'undefined' && (globalThis.AudioContext || globalThis.webkitAudioContext));
    if (!AudioCtx) return null;

    try {
      if (!ctx) {
        ctx = new AudioCtx();
        masterGain = ctx.createGain();
        masterGain.gain.value = muted ? 0 : 0.42;
        masterGain.connect(ctx.destination);
      }
      if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
        const maybePromise = ctx.resume();
        if (maybePromise && typeof maybePromise.catch === 'function') {
          maybePromise.catch(() => {});
        }
      }
      return ctx;
    } catch {
      return null;
    }
  }

  function getNoiseBuffer(audioCtx) {
    if (noiseBuffer && noiseBuffer.sampleRate === audioCtx.sampleRate) return noiseBuffer;
    const length = Math.floor(audioCtx.sampleRate * 0.6);
    const buffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noiseBuffer = buffer;
    return noiseBuffer;
  }

  function scheduleTone(audioCtx, { type = 'sine', startFreq, endFreq, startTime, duration, peakGain = 0.25, attack = 0.01 }) {
    const osc = audioCtx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, startTime);
    if (endFreq && endFreq !== startFreq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), startTime + duration);
    }

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(peakGain, startTime + attack);
    gain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);

    osc.connect(gain).connect(masterGain);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  function playGunshot(pitchVariance = 1.0) {
    const audioCtx = ensureContext();
    if (!audioCtx || !masterGain) return false;
    try {
      const now = audioCtx.currentTime;

      // 1. Crisp cryo-snap noise burst
      const noise = audioCtx.createBufferSource();
      noise.buffer = getNoiseBuffer(audioCtx);
      const bandpass = audioCtx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1650 * pitchVariance, now);
      bandpass.frequency.exponentialRampToValueAtTime(340, now + 0.14);
      bandpass.Q.value = 1.1;

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.65, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      noise.connect(bandpass).connect(noiseGain).connect(masterGain);
      noise.start(now);
      noise.stop(now + 0.17);

      // 2. Low-mid kinetic punch + 3. High cryo-bolt metallic transient
      scheduleTone(audioCtx, {
        type: 'triangle',
        startFreq: 195 * pitchVariance,
        endFreq: 48,
        startTime: now,
        duration: 0.11,
        peakGain: 0.72,
        attack: 0.004,
      });
      scheduleTone(audioCtx, {
        type: 'sine',
        startFreq: 2650 * pitchVariance,
        endFreq: 860,
        startTime: now,
        duration: 0.045,
        peakGain: 0.18,
        attack: 0.002,
      });
      return true;
    } catch {
      return false;
    }
  }

  function playHeadshotChime() {
    const audioCtx = ensureContext();
    if (!audioCtx || !masterGain) return false;
    try {
      const now = audioCtx.currentTime;
      const partials = [987.77, 1479.98, 1975.53];
      partials.forEach((freq, idx) => {
        scheduleTone(audioCtx, {
          type: idx === 0 ? 'sine' : 'triangle',
          startFreq: freq,
          startTime: now,
          duration: 0.42 - idx * 0.06,
          peakGain: 0.34 / (idx + 1),
          attack: 0.008,
        });
      });
      return true;
    } catch {
      return false;
    }
  }

  function playBombBeep(urgency = 0) {
    const audioCtx = ensureContext();
    if (!audioCtx || !masterGain) return false;
    const now = audioCtx.currentTime;
    const clamped = Math.max(0, Math.min(1, urgency));

    const osc = audioCtx.createOscillator();
    osc.type = 'square';
    const baseFreq = 880 + clamped * 440;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.setValueAtTime(baseFreq * 1.12, now + 0.045);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 3200;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc.connect(filter).connect(gain).connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.12);

    return true;
  }

  function playDefuseHum(progress = 0) {
    const audioCtx = ensureContext();
    if (!audioCtx || !masterGain) return false;
    const now = audioCtx.currentTime;
    const clamped = Math.max(0, Math.min(1, progress));
    const rootFreq = 220 + clamped * 220;

    [rootFreq, rootFreq * 1.5].forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.04, now + 0.22);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(idx === 0 ? 0.22 : 0.12, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      osc.connect(gain).connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.25);
    });

    return true;
  }

  function playFrostDash() {
    const audioCtx = ensureContext();
    if (!audioCtx || !masterGain) return false;
    const now = audioCtx.currentTime;

    // Airy wind sweep
    const noise = audioCtx.createBufferSource();
    noise.buffer = getNoiseBuffer(audioCtx);
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(420, now);
    filter.frequency.exponentialRampToValueAtTime(2400, now + 0.16);
    filter.frequency.exponentialRampToValueAtTime(680, now + 0.34);
    filter.Q.value = 1.8;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);

    noise.connect(filter).connect(gain).connect(masterGain);
    noise.start(now);
    noise.stop(now + 0.38);

    // Icy crystal shimmer
    const crystal = audioCtx.createOscillator();
    crystal.type = 'sine';
    crystal.frequency.setValueAtTime(1318.5, now + 0.02);
    crystal.frequency.exponentialRampToValueAtTime(2093.0, now + 0.22);
    const cGain = audioCtx.createGain();
    cGain.gain.setValueAtTime(0.14, now + 0.02);
    cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    crystal.connect(cGain).connect(masterGain);
    crystal.start(now + 0.02);
    crystal.stop(now + 0.26);

    return true;
  }

  function playVictoryFanfare() {
    const audioCtx = ensureContext();
    if (!audioCtx || !masterGain) return false;
    const now = audioCtx.currentTime;

    HIRAJOSHI_CHORD_HZ.forEach((freq, idx) => {
      const start = now + idx * 0.085;
      const osc = audioCtx.createOscillator();
      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, start);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.24, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.65);

      osc.connect(gain).connect(masterGain);
      osc.start(start);
      osc.stop(start + 0.68);
    });

    return true;
  }

  function toggleMute() {
    muted = !muted;
    if (masterGain && ctx) {
      masterGain.gain.setValueAtTime(muted ? 0 : 0.42, ctx.currentTime);
    }
    return muted;
  }

  return {
    playGunshot,
    playHeadshotChime,
    playBombBeep,
    playDefuseHum,
    playFrostDash,
    playVictoryFanfare,
    toggleMute,
    isMuted: () => muted,
    unlock: () => Boolean(ensureContext()),
  };
}
