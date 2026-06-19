import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ITEMS_BY_ID } from '@/data/items'
import { RARITY_LABELS, RARITY_STYLES, rarityRank } from '@/data/rarity'
import { getItemStars } from '@/engine/depth'
import { isStreakMilestone, useGameStore } from '@/store'

export function DiscoveryToast() {
  const recentDiscoveryId = useGameStore((s) => s.recentDiscoveryId)
  const clearRecentDiscovery = useGameStore((s) => s.clearRecentDiscovery)
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion)
  const currentStreak = useGameStore((s) => s.stats.currentDiscoveryStreak)

  useEffect(() => {
    if (!recentDiscoveryId) return
    const timer = setTimeout(clearRecentDiscovery, 2600)
    return () => clearTimeout(timer)
  }, [recentDiscoveryId, clearRecentDiscovery])

  const item = recentDiscoveryId ? ITEMS_BY_ID.get(recentDiscoveryId) : undefined
  const rarity = item ? RARITY_STYLES[item.rarity] : undefined
  const stars = item ? getItemStars(item.id) : 0
  const big = item ? rarityRank(item.rarity) >= 3 && !reducedMotion : false // epic+

  return (
    <div className="fixed top-24 sm:top-16 right-4 z-50 pointer-events-none">
      <AnimatePresence>
        {item && rarity && (
          <motion.div
            key={item.id}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: big ? 0.8 : 0.9 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.9 }}
            transition={reducedMotion ? { duration: 0.15 } : big ? { type: 'spring', stiffness: 380, damping: 16 } : { duration: 0.25 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-stone-900 shadow-2xl ${rarity.border} ${rarity.glow}`}
          >
            <span className="text-2xl">{item.emoji}</span>
            <div className="flex flex-col">
              <span className={`text-[10px] uppercase tracking-widest ${rarity.accent}`}>
                {item.milestone ? `⭐ Milestone · ${item.milestone}` : `${RARITY_LABELS[item.rarity]} discovery`}
              </span>
              <span className="text-sm font-bold text-stone-100">{item.name}</span>
              {stars > 0 && (
                <span className="text-[10px] text-stone-500 tracking-wide" aria-label={`depth ${stars} of 5`}>
                  {'★'.repeat(stars)}
                  {'☆'.repeat(5 - stars)}
                </span>
              )}
              {isStreakMilestone(currentStreak) && (
                <span className="text-[10px] text-orange-400 font-semibold">🔥 {currentStreak} in a row!</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
