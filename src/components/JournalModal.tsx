import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Item, Rarity } from '@/types'
import { ITEMS, ITEMS_BY_ID } from '@/data/items'
import { RECIPES } from '@/data/recipes'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/data/categories'
import { RARITY_LABELS, RARITY_ORDER } from '@/data/rarity'
import { isItemExhausted } from '@/engine/combine'
import { useGameStore } from '@/store'
import { ItemChip } from '@/components/ItemChip'
import { ItemDetailModal } from '@/components/ItemDetailModal'

interface JournalModalProps {
  onClose: () => void
}

export function JournalModal({ onClose }: JournalModalProps) {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [rarityFilter, setRarityFilter] = useState<Rarity | 'all'>('all')
  const [hideExplored, setHideExplored] = useState(false)

  const exhaustedIds = useMemo(() => {
    const set = new Set<string>()
    for (const id of discoveredItemIds) {
      if (isItemExhausted(id, discoveredItemIds, RECIPES)) set.add(id)
    }
    return set
  }, [discoveredItemIds])

  const groups = useMemo(() => {
    const discoveredCategories = new Set<string>()
    for (const id of discoveredItemIds) {
      const item = ITEMS_BY_ID.get(id)
      if (item) discoveredCategories.add(item.category)
    }

    const allByCategory = new Map<string, Item[]>()
    for (const item of ITEMS) {
      if (rarityFilter !== 'all' && item.rarity !== rarityFilter) continue
      if (hideExplored && discoveredItemIds.has(item.id) && exhaustedIds.has(item.id)) continue
      const list = allByCategory.get(item.category) ?? []
      list.push(item)
      allByCategory.set(item.category, list)
    }
    for (const list of allByCategory.values()) list.sort((a, b) => a.name.localeCompare(b.name))
    return CATEGORY_ORDER.filter((category) => allByCategory.has(category)).map((category) => {
      const items = allByCategory.get(category)!
      return {
        category,
        items,
        discovered: discoveredCategories.has(category),
        discoveredCount: items.filter((item) => discoveredItemIds.has(item.id)).length,
      }
    })
  }, [discoveredItemIds, rarityFilter, hideExplored, exhaustedIds])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        className="bg-stone-900 border border-stone-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-stone-700 shrink-0 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-widest text-stone-300 uppercase">Journal</span>
            <span className="text-xs text-stone-500">
              {discoveredItemIds.size}/{ITEMS.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs text-stone-400 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={hideExplored}
                onChange={(e) => setHideExplored(e.target.checked)}
                className="accent-orange-500"
              />
              <span>Hide fully explored</span>
            </label>
            <select
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value as Rarity | 'all')}
              className="px-2 py-1 text-xs rounded border border-stone-700 bg-stone-950 text-stone-200 focus:outline-none focus:border-orange-500"
            >
              <option value="all">All rarities</option>
              {RARITY_ORDER.map((rarity) => (
                <option key={rarity} value={rarity}>
                  {RARITY_LABELS[rarity]}
                </option>
              ))}
            </select>
            <button onClick={onClose} className="text-stone-500 hover:text-stone-200 text-lg leading-none transition-colors">
              ×
            </button>
          </div>
        </div>
        <div className="overflow-y-auto px-5 py-4 space-y-5">
          {groups.map(({ category, items, discovered, discoveredCount }) => (
            <div key={category}>
              <div className={`text-xs uppercase tracking-widest mb-2 ${discovered ? 'text-orange-400' : 'text-stone-600'}`}>
                {CATEGORY_LABELS[category]} <span className="text-stone-500">· {discoveredCount}/{items.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item) =>
                  discoveredItemIds.has(item.id) ? (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="relative cursor-pointer active:scale-95 transition-transform"
                    >
                      <ItemChip item={item} />
                      {exhaustedIds.has(item.id) && (
                        <span
                          title="Fully explored"
                          className="absolute -top-1.5 -right-1.5 bg-emerald-700 text-emerald-100 rounded-full w-4 h-4 flex items-center justify-center leading-none"
                        >
                          <svg viewBox="0 0 16 16" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3,8.5 6.5,12 13,4" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ) : (
                    <div
                      key={item.id}
                      title="Undiscovered"
                      className="flex items-center justify-center w-9 h-9 rounded-lg border border-stone-800 bg-stone-800/40 text-stone-600 text-sm select-none"
                    >
                      ?
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedItem && <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </div>
  )
}
