import type { StateCreator } from 'zustand'
import { ACHIEVEMENTS } from '@/data/achievements'
import type { GameStore, HistoryEntry, StatsAchievementsSlice, StatsState } from './types'

const LS_STATS_KEY = 'bitforge:stats'
const LS_ACHIEVEMENTS_KEY = 'bitforge:achievements'
const LS_HISTORY_KEY = 'bitforge:history'
const HISTORY_LIMIT = 50

export const DEFAULT_STATS: StatsState = {
  totalAttempts: 0,
  totalSuccesses: 0,
  longestDiscoveryStreak: 0,
  currentDiscoveryStreak: 0,
  totalTimePlayedMs: 0,
  hintsUsed: 0,
}

function loadStats(): StatsState {
  try {
    const raw = localStorage.getItem(LS_STATS_KEY)
    if (raw) return { ...DEFAULT_STATS, ...(JSON.parse(raw) as Partial<StatsState>) }
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_STATS }
}

export function saveStats(stats: StatsState) {
  localStorage.setItem(LS_STATS_KEY, JSON.stringify(stats))
}

function loadAchievements(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_ACHIEVEMENTS_KEY)
    if (raw) return new Set(JSON.parse(raw) as string[])
  } catch {
    /* ignore */
  }
  return new Set()
}

export function saveAchievements(ids: Set<string>) {
  localStorage.setItem(LS_ACHIEVEMENTS_KEY, JSON.stringify([...ids]))
}

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(LS_HISTORY_KEY)
    if (raw) return JSON.parse(raw) as HistoryEntry[]
  } catch {
    /* ignore */
  }
  return []
}

export function saveHistory(history: HistoryEntry[]) {
  localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(history))
}

/** Streak lengths celebrated with a special toast/burst: 3, then every multiple of 5. */
export function isStreakMilestone(streak: number): boolean {
  return streak === 3 || (streak >= 5 && streak % 5 === 0)
}

export const createStatsAchievementsSlice: StateCreator<GameStore, [], [], StatsAchievementsSlice> = (set, get) => ({
  stats: loadStats(),
  tickPlayTime: (ms) => {
    const nextStats = { ...get().stats, totalTimePlayedMs: get().stats.totalTimePlayedMs + ms }
    saveStats(nextStats)
    set({ stats: nextStats })
  },

  unlockedAchievementIds: loadAchievements(),
  checkAchievements: () => {
    const { discoveredItemIds, stats, unlockedAchievementIds, history } = get()
    const ctx = { discoveredItemIds, stats }
    const next = new Set(unlockedAchievementIds)
    const newlyUnlockedIds: string[] = []
    for (const achievement of ACHIEVEMENTS) {
      if (next.has(achievement.id) || !achievement.check(ctx)) continue
      next.add(achievement.id)
      newlyUnlockedIds.push(achievement.id)
    }
    if (newlyUnlockedIds.length === 0) return
    saveAchievements(next)
    const now = Date.now()
    const nextHistory = [
      ...newlyUnlockedIds.map((achievementId): HistoryEntry => ({ kind: 'achievement', achievementId, at: now })),
      ...history,
    ].slice(0, HISTORY_LIMIT)
    saveHistory(nextHistory)
    set({
      unlockedAchievementIds: next,
      toastQueue: [...get().toastQueue, { kind: 'achievement', achievementId: newlyUnlockedIds[0]! }],
      history: nextHistory,
    })
  },

  history: loadHistory(),
  addHistoryEntry: (entry) => {
    const next = [entry, ...get().history].slice(0, HISTORY_LIMIT)
    saveHistory(next)
    set({ history: next })
  },
})
