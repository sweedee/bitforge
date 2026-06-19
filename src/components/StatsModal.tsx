import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Category } from '@/types'
import { ITEMS_BY_ID } from '@/data/items'
import { CATEGORY_LABELS } from '@/data/categories'
import { ACHIEVEMENTS } from '@/data/achievements'
import { useGameStore } from '@/store'

interface StatsModalProps {
  onClose: () => void
}

function formatDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-lg border border-stone-800 bg-stone-800/40 px-3 py-2">
      <span className="text-[10px] uppercase tracking-widest text-stone-500">{label}</span>
      <span className="text-lg font-bold text-stone-100">{value}</span>
    </div>
  )
}

export function StatsModal({ onClose }: StatsModalProps) {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const stats = useGameStore((s) => s.stats)
  const unlockedAchievementIds = useGameStore((s) => s.unlockedAchievementIds)
  const [selectedAchievementId, setSelectedAchievementId] = useState<string | null>(null)
  const selectedAchievement = selectedAchievementId ? ACHIEVEMENTS.find((a) => a.id === selectedAchievementId) : undefined
  const selectedUnlocked = selectedAchievement ? unlockedAchievementIds.has(selectedAchievement.id) : false

  const favoriteDomain = useMemo(() => {
    const counts = new Map<Category, number>()
    for (const id of discoveredItemIds) {
      const category = ITEMS_BY_ID.get(id)?.category
      if (category) counts.set(category, (counts.get(category) ?? 0) + 1)
    }
    let best: Category | null = null
    let bestCount = 0
    for (const [category, count] of counts) {
      if (count > bestCount) {
        best = category
        bestCount = count
      }
    }
    return best
  }, [discoveredItemIds])

  const successRate = stats.totalAttempts > 0 ? `${Math.round((stats.totalSuccesses / stats.totalAttempts) * 100)}%` : '—'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        className="bg-stone-900 border border-stone-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-700 shrink-0">
          <span className="text-sm font-bold tracking-widest text-stone-300 uppercase">Stats</span>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-200 text-lg leading-none transition-colors">
            ×
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <StatRow label="Total attempts" value={stats.totalAttempts} />
            <StatRow label="Successful combines" value={stats.totalSuccesses} />
            <StatRow label="Success rate" value={successRate} />
            <StatRow label="Longest streak" value={stats.longestDiscoveryStreak} />
            <StatRow label="Hints used" value={stats.hintsUsed} />
            <StatRow label="Time played" value={formatDuration(stats.totalTimePlayedMs)} />
            <StatRow label="Favorite domain" value={favoriteDomain ? CATEGORY_LABELS[favoriteDomain] : '—'} />
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-orange-400 mb-2">
              Achievements · {unlockedAchievementIds.size}/{ACHIEVEMENTS.length}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ACHIEVEMENTS.map((achievement) => {
                const unlocked = unlockedAchievementIds.has(achievement.id)
                return (
                  <button
                    key={achievement.id}
                    type="button"
                    onClick={() => setSelectedAchievementId(achievement.id)}
                    title={unlocked ? achievement.description : 'Locked'}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs min-w-0 text-left transition-colors ${
                      unlocked
                        ? 'border-amber-500/60 bg-amber-950/20 text-amber-100 hover:border-amber-400'
                        : 'border-stone-800 bg-stone-800/40 text-stone-600 hover:border-stone-600'
                    }`}
                  >
                    <span className="text-lg leading-none shrink-0">{unlocked ? achievement.emoji : '🔒'}</span>
                    <span className="truncate">{unlocked ? achievement.name : '???'}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedAchievement && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedAchievementId(null)
            }}
          >
            <motion.div
              className="bg-stone-900 border border-amber-500/50 rounded-lg shadow-2xl max-w-sm w-full p-4"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl leading-none">{selectedUnlocked ? selectedAchievement.emoji : '🔒'}</span>
                  <span className="text-sm font-bold text-stone-100">{selectedUnlocked ? selectedAchievement.name : '???'}</span>
                </div>
                <button
                  onClick={() => setSelectedAchievementId(null)}
                  className="text-stone-500 hover:text-stone-200 text-lg leading-none transition-colors"
                >
                  ×
                </button>
              </div>
              <p className="text-xs text-stone-400">
                {selectedUnlocked ? selectedAchievement.description : 'Keep playing to unlock this achievement.'}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
