import { motion } from 'framer-motion'
import { ITEMS } from '@/data/items'

interface CompletionModalProps {
  onClose: () => void
}

export function CompletionModal({ onClose }: CompletionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        className="bg-stone-900 border border-amber-500/50 rounded-lg shadow-2xl w-full max-w-sm p-5 text-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl mb-2">🏆</div>
        <div className="text-sm font-bold tracking-widest text-amber-300 uppercase mb-2">Collection Complete</div>
        <p className="text-xs text-stone-400 mb-4">
          You've discovered all {ITEMS.length} items. Thanks for playing through the whole tree!
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs rounded border border-amber-600/60 bg-amber-950/20 text-amber-200 hover:border-amber-500 transition-colors"
        >
          Nice!
        </button>
      </motion.div>
    </div>
  )
}
