import { useEffect, useState } from 'react'
import { HINT_MAX, HINT_REGEN_MS, useGameStore } from '@/store'

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function HintPanel() {
  const hintsAvailable = useGameStore((s) => s.hintsAvailable)
  const hintLastGrantedAt = useGameStore((s) => s.hintLastGrantedAt)
  const useHint = useGameStore((s) => s.useHint)
  const clearHighlight = useGameStore((s) => s.clearHighlight)

  const [now, setNow] = useState(() => Date.now())

  function handleClick() {
    useHint()
    setTimeout(clearHighlight, 6000)
  }

  useEffect(() => {
    if (hintsAvailable >= HINT_MAX) return
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [hintsAvailable])

  const msUntilNext = hintLastGrantedAt + HINT_REGEN_MS - now

  return (
    <button
      onClick={handleClick}
      disabled={hintsAvailable <= 0}
      title="Reveal a known ingredient for an undiscovered combination"
      className="shrink-0 px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-orange-500 hover:text-orange-300 disabled:opacity-40 disabled:hover:border-stone-700 disabled:hover:text-stone-300 transition-colors"
    >
      💡 Hint {hintsAvailable}/{HINT_MAX}
      {hintsAvailable < HINT_MAX && <span className="text-stone-500"> ({formatCountdown(msUntilNext)})</span>}
    </button>
  )
}
