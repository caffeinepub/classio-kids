// Web Audio API sound engine — no external files needed
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (
    typeof AudioContext === "undefined" &&
    typeof (window as any).webkitAudioContext === "undefined"
  )
    return null;
  if (!ctx) {
    try {
      const AC = (
        typeof AudioContext !== "undefined"
          ? AudioContext
          : (window as any).webkitAudioContext
      ) as typeof AudioContext;
      ctx = new AC();
    } catch {
      return null;
    }
  }
  return ctx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  startTime = 0,
  gainVal = 0.3,
  endGain = 0,
  ac?: AudioContext,
) {
  const audioCtx = ac ?? getCtx();
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startTime);
    gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime + startTime);
    gainNode.gain.exponentialRampToValueAtTime(
      Math.max(endGain, 0.001),
      audioCtx.currentTime + startTime + duration,
    );
    osc.start(audioCtx.currentTime + startTime);
    osc.stop(audioCtx.currentTime + startTime + duration + 0.01);
  } catch {
    // silent
  }
}

export function playCorrect() {
  const ac = getCtx();
  if (!ac) return;
  // Cheerful 3-note ascending chime C5-E5-G5
  playTone(523.25, 0.08, "sine", 0, 0.3, 0.01, ac);
  playTone(659.25, 0.08, "sine", 0.09, 0.3, 0.01, ac);
  playTone(783.99, 0.15, "sine", 0.18, 0.35, 0.01, ac);
}

export function playWrong() {
  const ac = getCtx();
  if (!ac) return;
  // Descending buzzer C4-A3 sawtooth
  playTone(261.63, 0.12, "sawtooth", 0, 0.2, 0.01, ac);
  playTone(220.0, 0.2, "sawtooth", 0.13, 0.18, 0.001, ac);
}

export function playComplete() {
  const ac = getCtx();
  if (!ac) return;
  // Short fanfare 4 notes ascending
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) => {
    playTone(f, 0.1, "sine", i * 0.11, 0.35, 0.01, ac);
  });
}

export function playTap() {
  const ac = getCtx();
  if (!ac) return;
  // Soft pop — sine 400Hz 50ms quick decay
  playTone(400, 0.05, "sine", 0, 0.25, 0.001, ac);
}

export function playTrace() {
  const ac = getCtx();
  if (!ac) return;
  // Sparkle — high freq sine 800Hz 80ms
  playTone(800, 0.08, "sine", 0, 0.15, 0.001, ac);
}

export function playPaint() {
  const ac = getCtx();
  if (!ac) return;
  try {
    // Paint splat — filtered noise burst 80ms
    const bufferSize = Math.floor(ac.sampleRate * 0.08);
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const source = ac.createBufferSource();
    source.buffer = buffer;
    const filter = ac.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 600;
    filter.Q.value = 0.5;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.4, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);
    source.start();
    source.stop(ac.currentTime + 0.1);
  } catch {
    // silent
  }
}
