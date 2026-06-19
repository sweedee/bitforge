import { motion } from 'framer-motion'
import { ACHIEVEMENTS } from '@/data/achievements'
import { ITEMS_BY_ID } from '@/data/items'
import { useGameStore } from '@/store'

interface HistoryModalProps {
  onClose: () => void
}

function formatRelativeTime(at: number): string {
  const seconds = Math.max(0, Math.floor((Date.now() - at) / 1000))
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function HistoryModal({ onClose }: HistoryModalProps) {
  const history = useGameStore((s) => s.history)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        className="bg-stone-900 border border-stone-700 rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-700 shrink-0">
          <span className="text-sm font-bold tracking-widest text-stone-300 uppercase">History</span>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-200 text-lg leading-none transition-colors">
            ×
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4">
          {history.length === 0 ? (
            <p className="text-sm text-stone-500">Nothing yet — discover something.</p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {history.map((entry, i) => {
                if (entry.kind === 'discovery') {
                  const item = ITEMS_BY_ID.get(entry.itemId)
                  if (!item) return null
                  return (
                    <div key={`${entry.kind}:${entry.itemId}:${entry.at}:${i}`} className="flex items-center gap-2 text-sm">
                      <span className="text-lg leading-none">{item.emoji}</span>
                      <span className="text-stone-200 truncate">{item.name}</span>
                      <span className="ml-auto text-[11px] text-stone-500 shrink-0">{formatRelativeTime(entry.at)}</span>
                    </div>
                  )
                }
                const achievement = ACHIEVEMENTS.find((a) => a.id === entry.achievementId)
                if (!achievement) return null
                return (
                  <div key={`${entry.kind}:${entry.achievementId}:${entry.at}:${i}`} className="flex items-center gap-2 text-sm">
                    <span className="text-lg leading-none">{achievement.emoji}</span>
                    <span className="text-amber-300 truncate">{achievement.name}</span>
                    <span className="ml-auto text-[11px] text-stone-500 shrink-0">{formatRelativeTime(entry.at)}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
