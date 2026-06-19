import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ACHIEVEMENTS } from '@/data/achievements'
import { useGameStore } from '@/store'

export function AchievementToast() {
  const recentAchievementId = useGameStore((s) => s.recentAchievementId)
  const clearRecentAchievement = useGameStore((s) => s.clearRecentAchievement)
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion)

  useEffect(() => {
    if (!recentAchievementId) return
    const timer = setTimeout(clearRecentAchievement, 3200)
    return () => clearTimeout(timer)
  }, [recentAchievementId, clearRecentAchievement])

  const achievement = recentAchievementId ? ACHIEVEMENTS.find((a) => a.id === recentAchievementId) : undefined

  return (
    <div className="fixed top-24 sm:top-16 left-4 z-50 pointer-events-none">
      <AnimatePresence>
        {achievement && (
          <motion.div
            key={achievement.id}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
