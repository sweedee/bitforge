import { ITEMS } from '@/data/items'
import { useGameStore } from '@/store'

export function ProgressBar() {
  const discoveredCount = useGameStore((s) => s.discoveredItemIds.size)
  const total = ITEMS.length
  const pct = total === 0 ? 0 : Math.round((discoveredCount / total) * 100)

  return (
    <div className="flex items-center gap-2 min-w-[8rem]">
      <div className="flex-1 h-2 rounded-full bg-stone-800 overflow-hidden">
        <div className="h-full bg-amber-500 transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-stone-400 shrink-0">
        {discoveredCount}/{total}
      </span>
    </div>
  )
}
