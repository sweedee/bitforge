import { getLevelProgress, getTotalXp, LEVEL_TIERS } from '@/engine/level'
import { ITEMS_BY_ID } from '@/data/items'
import { useGameStore } from '@/store'

export function LevelBadge() {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const xp = getTotalXp(discoveredItemIds, ITEMS_BY_ID)
  const { levelIndex, pct } = getLevelProgress(xp)
  const tier = LEVEL_TIERS[levelIndex]!
  const next = LEVEL_TIERS[levelIndex + 1]

  return (
    <span
      className="relative px-2 py-1 text-xs rounded border border-stone-700 shrink-0 overflow-hidden flex flex-col gap-0.5"
      title={next ? `${xp} / ${next.threshold} XP to ${next.title}` : `${xp} XP · max level`}
    >
      <span className={`relative z-10 flex items-center gap-1 font-semibold leading-none ${tier.color}`}>
        <span>{tier.icon}</span>
        <span>{tier.title}</span>
      </span>
      <span className="relative z-10 text-[9px] text-stone-500 leading-none">
        {next ? `${next.threshold - xp} XP to ${next.title}` : 'Max level'}
      </span>
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-500/70" style={{ width: `${pct}%` }} />
    </span>
  )
}
