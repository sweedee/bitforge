let _ctx: AudioContext | null = null
let _muted = false
let _volume = 1

/** Called from a store subscriber so this module stays framework-agnostic. */
export function setSoundSettings(muted: boolean, volume: number) {
  _muted = muted
  _volume = volume
}

function ctx(): AudioContext {
  if (!_ctx) _ctx = new AudioContext()
  if (_ctx.state === 'suspended') void _ctx.resume()
  return _ctx
}

function tone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.15) {
  if (_muted || _volume <= 0) return
  const c = ctx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.connect(gain)
  gain.connect(c.destination)
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol * _volume, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur)
  osc.start()
  osc.stop(c.currentTime + dur)
}

function safe(fn: () => void) {
  try {
    fn()
  } catch {
    /* browser may block until first user gesture */
  }
}

export const sounds = {
  blip: () => safe(() => tone(1100, 0.1, 'sine', 0.1)),
  buzz: () => safe(() => tone(100, 0.22, 'sawtooth', 0.1)),
  chime: () => {
    const notes = [523, 659, 784, 1047]
    notes.forEach((f, i) => setTimeout(() => safe(() => tone(f, 0.4, 'sine', 0.14)), i * 90))
  },
  fanfare: () => {
    const notes = [523, 659, 784, 1047, 1318]
    notes.forEach((f, i) => setTimeout(() => safe(() => tone(f, 0.5, 'sine', 0.16)), i * 80))
  },
}
