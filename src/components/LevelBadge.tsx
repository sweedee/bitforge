import { getLevelProgress, getLevelTitle, getTotalXp, LEVEL_TIERS } from '@/engine/level'
import { ITEMS_BY_ID } from '@/data/items'
import { useGameStore } from '@/store'

export function LevelBadge() {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const xp = getTotalXp(discoveredItemIds, ITEMS_BY_ID)
  const title = getLevelTitle(xp)
  const { levelIndex, pct } = getLevelProgress(xp)
  const next = LEVEL_TIERS[levelIndex + 1]

  return (
    <span
      className="relative px-2 py-1 text-xs rounded border border-stone-700 text-stone-300 shrink-0 overflow-hidden"
      title={next ? `${xp} / ${next.threshold} XP to ${next.title}` : `${xp} XP · max level`}
    >
      <span className="relative z-10">{title}</span>
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-500/70" style={{ width: `${pct}%` }} />
    </span>
  )
}
