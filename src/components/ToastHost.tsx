import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ACHIEVEMENTS } from '@/data/achievements'
import { ITEMS_BY_ID } from '@/data/items'
import { RARITY_LABELS, RARITY_STYLES, rarityRank } from '@/data/rarity'
import { getItemStars } from '@/engine/depth'
import { isStreakMilestone, useGameStore } from '@/store'

const TOAST_DURATION_MS = { discovery: 4000, achievement: 4500 } as const

export function ToastHost() {
  const entry = useGameStore((s) => s.toastQueue[0])
  const dequeueToast = useGameStore((s) => s.dequeueToast)
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion)
  const currentStreak = useGameStore((s) => s.stats.currentDiscoveryStreak)

  useEffect(() => {
    if (!entry) return
    const timer = setTimeout(dequeueToast, TOAST_DURATION_MS[entry.kind])
    return () => clearTimeout(timer)
  }, [entry, dequeueToast])

  const discoveryItem = entry?.kind === 'discovery' ? ITEMS_BY_ID.get(entry.itemId) : undefined
  const discoveryRarity = discoveryItem ? RARITY_STYLES[discoveryItem.rarity] : undefined
  const discoveryStars = discoveryItem ? getItemStars(discoveryItem.id) : 0
  const discoveryBig = discoveryItem ? rarityRank(discoveryItem.rarity) >= 3 && !reducedMotion : false

  const achievement = entry?.kind === 'achievement' ? ACHIEVEMENTS.find((a) => a.id === entry.achievementId) : undefined

  return (
    <div className="fixed top-24 sm:top-16 right-4 z-50 pointer-events-none">
      <AnimatePresence>
        {discoveryItem && discoveryRarity && (
          <motion.div
            key={`discovery:${discoveryItem.id}`}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: discoveryBig ? 0.8 : 0.9 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.9 }}
            transition={
              reducedMotion ? { duration: 0.15 } : discoveryBig ? { type: 'spring', stiffness: 380, damping: 16 } : { duration: 0.25 }
            }
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-stone-900 shadow-2xl ${discoveryRarity.border}`}
          >
            <span className="text-2xl">{discoveryItem.emoji}</span>
            <div className="flex flex-col">
              <span className={`text-[10px] uppercase tracking-widest ${discoveryRarity.accent}`}>
                {`${RARITY_LABELS[discoveryItem.rarity]} discovery`}
              </span>
              <span className="text-sm font-bold text-stone-100">{discoveryItem.name}</span>
              {discoveryStars > 0 && (
                <span className="text-[10px] text-stone-500 tracking-wide" aria-label={`depth ${discoveryStars} of 5`}>
                  {'★'.repeat(discoveryStars)}
                  {'☆'.repeat(5 - discoveryStars)}
                </span>
              )}
              {isStreakMilestone(currentStreak) && (
                <span className="text-[10px] text-orange-400 font-semibold">🔥 {currentStreak} in a row!</span>
              )}
            </div>
          </motion.div>
        )}
        {achievement && (
          <motion.div
            key={`achievement:${achievement.id}`}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.9 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.9 }}
            transition={reducedMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 380, damping: 16 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-amber-400 bg-stone-900 shadow-2xl shadow-[0_0_16px_0px_rgba(251,191,36,0.4)]"
          >
            <span className="text-2xl">{achievement.emoji}</span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-amber-300">Achievement unlocked</span>
              <span className="text-sm font-bold text-stone-100">{achievement.name}</span>
              <span className="text-[11px] text-stone-400">{achievement.description}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
