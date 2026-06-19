import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Item } from '@/types'
import { ITEMS_BY_ID } from '@/data/items'
import { RECIPE_BY_RESULT } from '@/data/recipes'
import { buildLineage, type LineageNode } from '@/engine/lineage'
import { ItemChip } from '@/components/ItemChip'

interface LineageViewProps {
  item: Item
  onClose: () => void
}

function LineageNodeView({ node }: { node: LineageNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <ItemChip item={node.item} size="sm" />
      {node.children && (
        <div className="flex items-start gap-3 pt-3 border-t border-stone-700">
          <LineageNodeView node={node.children[0]} />
          <span className="text-stone-500 text-xs self-center">+</span>
          <LineageNodeView node={node.children[1]} />
        </div>
      )}
    </div>
  )
}

export function LineageView({ item, onClose }: LineageViewProps) {
  const root = useMemo(() => buildLineage(item.id, ITEMS_BY_ID, RECIPE_BY_RESULT), [item.id])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-stone-900 border border-stone-700 rounded-lg shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-700 shrink-0">
          <span className="text-sm font-bold tracking-widest text-stone-300 uppercase">Lineage · {item.name}</span>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-200 text-lg leading-none transition-colors">
            ×
          </button>
        </div>
        <div className="overflow-auto px-5 py-6 flex justify-center">
          {root ? <LineageNodeView node={root} /> : <span className="text-xs text-stone-500">No lineage data.</span>}
        </div>
      </motion.div>
    </div>
  )
}
