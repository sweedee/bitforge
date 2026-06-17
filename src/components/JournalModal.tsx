import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Item } from '@/types'
import { ITEMS_BY_ID } from '@/data/items'
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
    const byCategory = new Map<string, Item[]>()
    for (const id of discoveredItemIds) {
      const item = ITEMS_BY_ID.get(id)
      if (!item) continue
      const list = byCategory.get(item.category) ?? []
      list.push(item)
      byCategory.set(item.category, list)
    }
    for (const list of byCategory.values()) list.sort((a, b) => a.name.localeCompare(b.name))
    return CATEGORY_ORDER.filter((category) => byCategory.has(category)).map((category) => ({
      category,
      items: byCategory.get(category)!,
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
          {groups.map(({ category, items }) => (
            <div key={category}>
              <div className="text-xs uppercase tracking-widest text-orange-400 mb-2">{CATEGORY_LABELS[category]}</div>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <button key={item.id} onClick={() => setSelectedItem(item)} className="cursor-pointer active:scale-95 transition-transform">
                    <ItemChip item={item} />
                  </button>
                ))}
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
