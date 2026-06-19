import { motion } from 'framer-motion'

interface ConfirmBulkAddModalProps {
  count: number
  cappedCount: number
  onCancel: () => void
  onAddCapped: () => void
  onAddAll: () => void
}

export function ConfirmBulkAddModal({ count, cappedCount, onCancel, onAddCapped, onAddAll }: ConfirmBulkAddModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onCancel}>
      <motion.div
        className="bg-stone-900 border border-stone-700 rounded-lg shadow-2xl w-full max-w-sm p-4"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-sm font-bold text-stone-100 mb-2">Add {count} items?</div>
        <p className="text-xs text-stone-400 mb-4">
          You're about to add {count} items to the canvas at once. This could cause performance issues.
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={onAddCapped}
            className="px-3 py-2 text-xs rounded border border-amber-600/60 bg-amber-950/20 text-amber-200 hover:border-amber-500 transition-colors"
          >
            Add first {cappedCount} only
          </button>
          <button
            onClick={onAddAll}
            className="px-3 py-2 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-600 hover:text-stone-300 transition-colors"
          >
            Add all anyway
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-2 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}
