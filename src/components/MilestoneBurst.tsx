import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ITEMS_BY_ID } from '@/data/items'
import { rarityRank } from '@/data/rarity'
import { getLevelIndex, getTotalXp } from '@/engine/level'
import { isStreakMilestone, useGameStore } from '@/store'
import { sounds } from '@/sound'

const MILESTONE_INTERVAL = 25

const PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2
  const dist = 100 + (i % 4) * 30
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    delay: i * 0.04,
    color: ['bg-orange-400', 'bg-amber-400', 'bg-yellow-400', 'bg-red-400'][i % 4],
  }
})

const TROPHY_PARTICLES = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2
  const dist = 90 + (i % 3) * 30
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    delay: i * 0.05,
  }
})

export function MilestoneBurst() {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const discoveredCount = discoveredItemIds.size
  const xp = useMemo(() => getTotalXp(discoveredItemIds, ITEMS_BY_ID), [discoveredItemIds])
  const recentDiscoveryId = useGameStore((s) => s.lastDiscoveredItemId)
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion)
  const currentStreak = useGameStore((s) => s.stats.currentDiscoveryStreak)
  const prevCountRef = useRef(discoveredCount)
  const [active, setActive] = useState(false)
  const [levelUpActive, setLevelUpActive] = useState(false)
  const prevLevelIndexRef = useRef(getLevelIndex(xp))

  // Burst on every Nth discovery (count milestone).
  useEffect(() => {
    const prev = prevCountRef.current
    prevCountRef.current = discoveredCount
    if (discoveredCount <= prev) return
    if (Math.floor(discoveredCount / MILESTONE_INTERVAL) <= Math.floor(prev / MILESTONE_INTERVAL)) return

    setActive(true)
    sounds.fanfare()
    const timer = setTimeout(() => setActive(false), 1000)
    return () => clearTimeout(timer)
  }, [discoveredCount])

  // Burst when the player's flavor title levels up.
  useEffect(() => {
    const levelIndex = getLevelIndex(xp)
    const prev = prevLevelIndexRef.current
    prevLevelIndexRef.current = levelIndex
    if (levelIndex <= prev) return

    setLevelUpActive(true)
    sounds.fanfare()
    const timer = setTimeout(() => setLevelUpActive(false), 1000)
    return () => clearTimeout(timer)
  }, [xp])

  // Burst when an especially rare item is discovered.
  useEffect(() => {
    if (!recentDiscoveryId) return
    const item = ITEMS_BY_ID.get(recentDiscoveryId)
    if (!item) return
    const special = rarityRank(item.rarity) >= 3 // epic+
    if (!special) return

    setActive(true)
    sounds.fanfare()
    const timer = setTimeout(() => setActive(false), 1000)
    return () => clearTimeout(timer)
  }, [recentDiscoveryId])

  // Burst on discovery-streak milestones (3, then every multiple of 5).
  useEffect(() => {
    if (!recentDiscoveryId) return
    if (!isStreakMilestone(currentStreak)) return

    setActive(true)
    sounds.fanfare()
    const timer = setTimeout(() => setActive(false), 1000)
    return () => clearTimeout(timer)
  }, [recentDiscoveryId, currentStreak])

  return (
    <>
      <AnimatePresence>
        {active && !reducedMotion && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
            {PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                className={`absolute w-2.5 h-2.5 rounded-full ${p.color}`}
                style={{ top: '50%', left: '50%' }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1.2 }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: p.delay }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {levelUpActive && !reducedMotion && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
            {TROPHY_PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                className="absolute text-xl leading-none"
                style={{ top: '50%', left: '50%' }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.6, rotate: 0 }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 1.1, rotate: 90 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: p.delay }}
              >
                🏆
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
