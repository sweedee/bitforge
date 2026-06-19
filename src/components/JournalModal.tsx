import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Item } from '@/types'
import { ITEMS, ITEMS_BY_ID } from '@/data/items'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/data/categories'
import { useGameStore } from '@/store'
import { ItemChip } from '@/components/ItemChip'
import { ItemDetailModal } from '@/components/ItemDetailModal'

interface JournalModalProps {
  onClose: () => void
}

export function JournalModal({ onClose }: JournalModalProps) {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const groups = useMemo(() => {
    const discoveredCategories = new Set<string>()
    for (const id of discoveredItemIds) {
      const item = ITEMS_BY_ID.get(id)
      if (item) discoveredCategories.add(item.category)
    }

    const allByCategory = new Map<string, Item[]>()
    for (const item of ITEMS) {
      const list = allByCategory.get(item.category) ?? []
      list.push(item)
      allByCategory.set(item.category, list)
    }
    for (const list of allByCategory.values()) list.sort((a, b) => a.name.localeCompare(b.name))
    return CATEGORY_ORDER.filter((category) => allByCategory.has(category)).map((category) => ({
      category,
      items: allByCategory.get(category)!,
      discovered: discoveredCategories.has(category),
    }))
  }, [discoveredItemIds])

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
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-700 shrink-0">
          <span className="text-sm font-bold tracking-widest text-stone-300 uppercase">Journal</span>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-200 text-lg leading-none transition-colors">
            ×
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4 space-y-5">
          {groups.map(({ category, items, discovered }) => (
            <div key={category}>
              <div className={`text-xs uppercase tracking-widest mb-2 ${discovered ? 'text-orange-400' : 'text-stone-600'}`}>
                {discovered ? CATEGORY_LABELS[category] : `${CATEGORY_LABELS[category]} (Locked)`}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item) =>
                  discoveredItemIds.has(item.id) ? (
                    <button key={item.id} onClick={() => setSelectedItem(item)} className="cursor-pointer active:scale-95 transition-transform">
                      <ItemChip item={item} />
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
