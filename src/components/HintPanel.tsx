import { useEffect, useState } from 'react'
import { HINT_MAX, HINT_MAX_TIER, HINT_REGEN_MS, useGameStore } from '@/store'
import { ITEMS_BY_ID } from '@/data/items'

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function HintPanel() {
  const hintsAvailable = useGameStore((s) => s.hintsAvailable)
  const hintLastGrantedAt = useGameStore((s) => s.hintLastGrantedAt)
  const hintTargetId = useGameStore((s) => s.hintTargetId)
  const hintTier = useGameStore((s) => s.hintTier)
  const highlightedItemIds = useGameStore((s) => s.highlightedItemIds)
  const useHint = useGameStore((s) => s.useHint)
  const tickHintRegen = useGameStore((s) => s.tickHintRegen)
  const clearHighlight = useGameStore((s) => s.clearHighlight)

  const [now, setNow] = useState(() => Date.now())

  function handleClick() {
    useHint()
    setTimeout(clearHighlight, 6000)
  }

  useEffect(() => {
    if (hintsAvailable >= HINT_MAX) return
    const interval = setInterval(() => {
      setNow(Date.now())
      tickHintRegen()
    }, 1000)
    return () => clearInterval(interval)
  }, [hintsAvailable, tickHintRegen])

  const msUntilNext = hintLastGrantedAt + HINT_REGEN_MS - now

  const targetItem = hintTargetId ? ITEMS_BY_ID.get(hintTargetId) : null
  const ingredientNames = highlightedItemIds.map((id) => ITEMS_BY_ID.get(id)?.name).filter(Boolean)

  let message: string | null = null
  if (targetItem) {
    if (hintTier === 1) message = `Next discovery: ${targetItem.emoji} ${targetItem.name}`
    else if (hintTier === 2) message = `${targetItem.emoji} ${targetItem.name} — needs ${ingredientNames[0]} (highlighted)`
    else message = `${targetItem.emoji} ${targetItem.name} = ${ingredientNames.join(' + ')}`
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        disabled={hintsAvailable <= 0}
        title="Reveal progressively more about an undiscovered combination"
        className="shrink-0 px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-orange-500 hover:text-orange-300 disabled:opacity-40 disabled:hover:border-stone-700 disabled:hover:text-stone-300 transition-colors"
      >
        💡 Hint {hintsAvailable}/{HINT_MAX}
        {hintsAvailable < HINT_MAX && <span className="text-stone-500"> ({formatCountdown(msUntilNext)})</span>}
      </button>
      {message && (
        <span className="text-xs text-amber-300/90 max-w-[16rem] truncate">
          {message}
          {hintTier < HINT_MAX_TIER && <span className="text-stone-500"> · hint again for more</span>}
        </span>
      )}
    </div>
  )
}
