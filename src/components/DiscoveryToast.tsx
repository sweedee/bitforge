import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ITEMS_BY_ID } from '@/data/items'
import { useGameStore } from '@/store'

export function DiscoveryToast() {
  const recentDiscoveryId = useGameStore((s) => s.recentDiscoveryId)
  const clearRecentDiscovery = useGameStore((s) => s.clearRecentDiscovery)

  useEffect(() => {
    if (!recentDiscoveryId) return
    const timer = setTimeout(clearRecentDiscovery, 2600)
    return () => clearTimeout(timer)
  }, [recentDiscoveryId, clearRecentDiscovery])

  const item = recentDiscoveryId ? ITEMS_BY_ID.get(recentDiscoveryId) : undefined

  return (
    <div className="fixed top-16 right-4 z-50 pointer-events-none">
      <AnimatePresence>
        {item && (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-orange-500 bg-stone-900 shadow-2xl"
          >
            <span className="text-2xl">{item.emoji}</span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-orange-400">New discovery</span>
              <span className="text-sm font-bold text-stone-100">{item.name}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
