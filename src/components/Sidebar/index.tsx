import { useMemo, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import type { Item, Tier } from '@/types'
import type { DragPayload } from '@/types/dnd'
import { ITEMS_BY_ID } from '@/data/items'
import { TIER_LABELS, TIER_ORDER } from '@/data/tiers'
import { useGameStore } from '@/store'
import { ItemChip } from '@/components/ItemChip'

function randomCoord(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function DraggableSidebarItem({ item, highlighted, onTap }: { item: Item; highlighted: boolean; onTap: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar:${item.id}`,
    data: { kind: 'sidebar', itemId: item.id } satisfies DragPayload,
  })

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      data-testid="sidebar-item"
      onClick={onTap}
      className={`touch-pan-y cursor-grab active:cursor-grabbing active:scale-95 transition-transform ${isDragging ? 'opacity-0' : ''}`}
    >
      <ItemChip item={item} highlighted={highlighted} />
    </button>
  )
}

export function Sidebar() {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const highlightedItemId = useGameStore((s) => s.highlightedItemId)
  const addCanvasToken = useGameStore((s) => s.addCanvasToken)

  const [query, setQuery] = useState('')
  const [tierFilter, setTierFilter] = useState<Tier | 'all'>('all')

  const groups = useMemo(() => {
    const list = [...discoveredItemIds].map((id) => ITEMS_BY_ID.get(id)!).filter(Boolean)
    const filtered = list
      .filter((item) => tierFilter === 'all' || item.tier === tierFilter)
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))

    const byTier = new Map<Tier, Item[]>()
    for (const item of filtered) {
      const group = byTier.get(item.tier) ?? []
      group.push(item)
      byTier.set(item.tier, group)
    }
    for (const group of byTier.values()) group.sort((a, b) => a.name.localeCompare(b.name))
    return TIER_ORDER.filter((tier) => byTier.has(tier)).map((tier) => ({ tier, items: byTier.get(tier)! }))
  }, [discoveredItemIds, tierFilter, query])

  const availableTiers = useMemo(() => {
    const set = new Set<Tier>()
    for (const id of discoveredItemIds) {
      const item = ITEMS_BY_ID.get(id)
      if (item) set.add(item.tier)
    }
    return [...set]
  }, [discoveredItemIds])

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-2.5 border-b border-stone-800 shrink-0 flex flex-col gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search discovered items…"
          className="w-full px-2.5 py-1.5 text-sm rounded border border-stone-700 bg-stone-900 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-orange-500"
        />
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value as Tier | 'all')}
          className="w-full px-2.5 py-1.5 text-sm rounded border border-stone-700 bg-stone-900 text-stone-200 focus:outline-none focus:border-orange-500"
        >
          <option value="all">All tiers</option>
          {availableTiers.map((tier) => (
            <option key={tier} value={tier}>
              {TIER_LABELS[tier]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 space-y-3">
        {groups.map(({ tier, items }) => (
          <div key={tier}>
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{TIER_LABELS[tier]}</div>
            <div className="flex flex-wrap gap-2 content-start">
              {items.map((item) => (
                <DraggableSidebarItem
                  key={item.id}
                  item={item}
                  highlighted={item.id === highlightedItemId}
                  onTap={() => addCanvasToken(item.id, randomCoord(15, 85), randomCoord(20, 80))}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
