import { getLevelTitle } from '@/engine/level'
import { useGameStore } from '@/store'

export function LevelBadge() {
  const discoveredCount = useGameStore((s) => s.discoveredItemIds.size)
  const title = getLevelTitle(discoveredCount)

  return (
    <span className="px-2 py-1 text-xs rounded border border-stone-700 text-stone-300 shrink-0" title={`${discoveredCount} items discovered`}>
      {title}
    </span>
  )
}
