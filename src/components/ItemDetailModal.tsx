import { motion } from 'framer-motion'
import type { Item } from '@/types'
import { TIER_LABELS } from '@/data/tiers'

interface ItemDetailModalProps {
  item: Item
  onClose: () => void
}

export function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-stone-900 border border-stone-700 rounded-lg shadow-2xl w-full max-w-sm overflow-hidden"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-700">
          <span className="text-xs uppercase tracking-widest text-orange-400">{TIER_LABELS[item.tier]}</span>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-200 text-lg leading-none transition-colors">
            ×
          </button>
        </div>
        <div className="px-5 py-5 flex flex-col items-center gap-2 text-center">
          <span className="text-4xl">{item.emoji}</span>
          <span className="text-lg font-bold text-stone-100">{item.name}</span>
          <p className="text-sm text-stone-400">{item.description}</p>
        </div>
      </motion.div>
    </div>
  )
}
