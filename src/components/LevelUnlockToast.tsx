import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ITEMS_BY_ID } from '@/data/items'
import { useGameStore } from '@/store'

export function LevelUnlockToast() {
  const recentLevelUnlockId = useGameStore((s) => s.recentLevelUnlockId)
  const clearRecentLevelUnlock = useGameStore((s) => s.clearRecentLevelUnlock)
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion)

  useEffect(() => {
    if (!recentLevelUnlockId) return
    const timer = setTimeout(clearRecentLevelUnlock, 3200)
    return () => clearTimeout(timer)
  }, [recentLevelUnlockId, clearRecentLevelUnlock])

  const item = recentLevelUnlockId ? ITEMS_BY_ID.get(recentLevelUnlockId) : undefined

  return (
    <div className="fixed bottom-20 inset-x-0 flex justify-center z-50 pointer-events-none">
      <AnimatePresence>
        {item && (
          <motion.div
            key={item.id}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
            transition={reducedMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 380, damping: 16 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-orange-400 bg-stone-900 shadow-2xl shadow-[0_0_16px_0px_rgba(251,146,60,0.4)]"
          >
            <span className="text-2xl">{item.emoji}</span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-orange-300">New starter unlocked</span>
              <span className="text-sm font-bold text-stone-100">{item.name}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
