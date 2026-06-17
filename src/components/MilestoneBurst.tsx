import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ITEMS_BY_ID } from '@/data/items'
import { rarityRank } from '@/data/rarity'
import { useGameStore } from '@/store'
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

export function MilestoneBurst() {
  const discoveredCount = useGameStore((s) => s.discoveredItemIds.size)
  const recentDiscoveryId = useGameStore((s) => s.recentDiscoveryId)
  const prevCountRef = useRef(discoveredCount)
  const [active, setActive] = useState(false)

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

  // Burst when an especially rare or landmark item is discovered.
  useEffect(() => {
    if (!recentDiscoveryId) return
    const item = ITEMS_BY_ID.get(recentDiscoveryId)
    if (!item) return
    const special = item.milestone !== undefined || rarityRank(item.rarity) >= 3 // epic+
    if (!special) return

    setActive(true)
    sounds.fanfare()
    const timer = setTimeout(() => setActive(false), 1000)
    return () => clearTimeout(timer)
  }, [recentDiscoveryId])

  return (
    <AnimatePresence>
      {active && (
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
  )
}
