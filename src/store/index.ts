import { create } from 'zustand'
import type { CanvasToken } from '@/types'
import { STARTER_ITEM_IDS } from '@/data/items'
import { RECIPES, RECIPE_INDEX, RECIPES_BY_INPUT } from '@/data/recipes'
import { getHint, tryCombine } from '@/engine/combine'
import { computeGridPositions } from '@/lib/gridLayout'
import { ACHIEVEMENTS } from '@/data/achievements'
import { sounds } from '@/sound'

const LS_DISCOVERED_KEY = 'bitforge:discovered'
const LS_HINTS_KEY = 'bitforge:hints'
const LS_STATS_KEY = 'bitforge:stats'
const LS_SETTINGS_KEY = 'bitforge:settings'
const LS_ACHIEVEMENTS_KEY = 'bitforge:achievements'

export const HINT_MAX = 3
export const HINT_REGEN_MS = 5 * 1000

const MIN_TOKEN_DIST = 18

function isFarFromAll(x: number, y: number, tokens: CanvasToken[], excludeInstanceId?: string) {
  return tokens.every((t) => t.instanceId === excludeInstanceId || Math.hypot(t.x - x, t.y - y) >= MIN_TOKEN_DIST)
}

function findFreePosition(tokens: CanvasToken[], desiredX: number, desiredY: number, excludeInstanceId?: string) {
  if (isFarFromAll(desiredX, desiredY, tokens, excludeInstanceId)) return { x: desiredX, y: desiredY }
  for (let radius = MIN_TOKEN_DIST; radius < 60; radius += MIN_TOKEN_DIST) {
    for (let angle = 0; angle < 360; angle += 30) {
      const rad = (angle * Math.PI) / 180
      const x = Math.min(95, Math.max(5, desiredX + radius * Math.cos(rad)))
      const y = Math.min(95, Math.max(5, desiredY + radius * Math.sin(rad)))
      if (isFarFromAll(x, y, tokens, excludeInstanceId)) return { x, y }
    }
  }
  return { x: desiredX, y: desiredY }
}

function loadDiscovered(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_DISCOVERED_KEY)
    if (raw) return new Set(JSON.parse(raw) as string[])
  } catch {
    /* ignore */
  }
  return new Set(STARTER_ITEM_IDS)
}

function saveDiscovered(ids: Set<string>) {
  localStorage.setItem(LS_DISCOVERED_KEY, JSON.stringify([...ids]))
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

function saveAchievements(ids: Set<string>) {
  localStorage.setItem(LS_ACHIEVEMENTS_KEY, JSON.stringify([...ids]))
}

interface HintState {
  count: number
  lastGrantedAt: number
}

function loadHintState(): HintState {
  try {
    const raw = localStorage.getItem(LS_HINTS_KEY)
    if (raw) return JSON.parse(raw) as HintState
  } catch {
    /* ignore */
  }
  return { count: HINT_MAX, lastGrantedAt: Date.now() }
}

function saveHintState(state: HintState) {
  localStorage.setItem(LS_HINTS_KEY, JSON.stringify(state))
}

function regenerateHints(state: HintState): HintState {
  if (state.count >= HINT_MAX) return { ...state, lastGrantedAt: Date.now() }
  const elapsed = Date.now() - state.lastGrantedAt
  const earned = Math.floor(elapsed / HINT_REGEN_MS)
  if (earned <= 0) return state
  const count = Math.min(HINT_MAX, state.count + earned)
  return { count, lastGrantedAt: state.lastGrantedAt + earned * HINT_REGEN_MS }
}

/** Streak lengths celebrated with a special toast/burst: 3, then every multiple of 5. */
export function isStreakMilestone(streak: number): boolean {
  return streak === 3 || (streak >= 5 && streak % 5 === 0)
}

export interface StatsState {
  totalAttempts: number
  totalSuccesses: number
  longestDiscoveryStreak: number
  currentDiscoveryStreak: number
  totalTimePlayedMs: number
}

const DEFAULT_STATS: StatsState = {
  totalAttempts: 0,
  totalSuccesses: 0,
  longestDiscoveryStreak: 0,
  currentDiscoveryStreak: 0,
  totalTimePlayedMs: 0,
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

function saveStats(stats: StatsState) {
  localStorage.setItem(LS_STATS_KEY, JSON.stringify(stats))
}

export interface SettingsState {
  muted: boolean
  volume: number
  reducedMotion: boolean
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

function loadSettings(): SettingsState {
  const defaults: SettingsState = { muted: false, volume: 1, reducedMotion: prefersReducedMotion() }
  try {
    const raw = localStorage.getItem(LS_SETTINGS_KEY)
    if (raw) return { ...defaults, ...(JSON.parse(raw) as Partial<SettingsState>) }
  } catch {
    /* ignore */
  }
  return defaults
}

function saveSettings(settings: SettingsState) {
  localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings))
}

let nextInstanceId = 0

interface GameStore {
  discoveredItemIds: Set<string>
  recentDiscoveryId: string | null
  lastFailedComboInstanceIds: [string, string] | null
  justMergedInstanceId: string | null

  canvasTokens: CanvasToken[]
  lastCombineSnapshot: { removed: [CanvasToken, CanvasToken]; added: CanvasToken } | null

  hintsAvailable: number
  hintLastGrantedAt: number
  highlightedItemId: string | null

  stats: StatsState
  tickPlayTime: (ms: number) => void

  settings: SettingsState
  toggleMute: () => void
  setVolume: (volume: number) => void
  toggleReducedMotion: () => void

  unlockedAchievementIds: Set<string>
  recentAchievementId: string | null
  checkAchievements: () => void
  clearRecentAchievement: () => void

  addCanvasToken: (itemId: string, x: number, y: number) => string
  removeCanvasToken: (instanceId: string) => void
  moveCanvasToken: (instanceId: string, x: number, y: number) => void
  clearCanvas: () => void
  tidyCanvas: () => void
  combineTokens: (instanceIdA: string, instanceIdB: string) => void
  undoLastCombine: () => void
  clearRecentDiscovery: () => void
  clearFailedCombo: () => void
  clearJustMerged: () => void

  useHint: () => void
  tickHintRegen: () => void
  clearHighlight: () => void
}

export const useGameStore = create<GameStore>()((set, get) => ({
  discoveredItemIds: loadDiscovered(),
  recentDiscoveryId: null,
  lastFailedComboInstanceIds: null,
  justMergedInstanceId: null,

  canvasTokens: [],
  lastCombineSnapshot: null,

  hintsAvailable: regenerateHints(loadHintState()).count,
  hintLastGrantedAt: regenerateHints(loadHintState()).lastGrantedAt,
  highlightedItemId: null,

  stats: loadStats(),
  tickPlayTime: (ms) => {
    const nextStats = { ...get().stats, totalTimePlayedMs: get().stats.totalTimePlayedMs + ms }
    saveStats(nextStats)
    set({ stats: nextStats })
  },

  settings: loadSettings(),
  toggleMute: () => {
    const next = { ...get().settings, muted: !get().settings.muted }
    saveSettings(next)
    set({ settings: next })
  },
  setVolume: (volume) => {
    const next = { ...get().settings, volume: Math.min(1, Math.max(0, volume)) }
    saveSettings(next)
    set({ settings: next })
  },
  toggleReducedMotion: () => {
    const next = { ...get().settings, reducedMotion: !get().settings.reducedMotion }
    saveSettings(next)
    set({ settings: next })
  },

  unlockedAchievementIds: loadAchievements(),
  recentAchievementId: null,
  checkAchievements: () => {
    const { discoveredItemIds, stats, unlockedAchievementIds } = get()
    const ctx = { discoveredItemIds, stats }
    const next = new Set(unlockedAchievementIds)
    let newlyUnlocked: string | null = null
    for (const achievement of ACHIEVEMENTS) {
      if (next.has(achievement.id) || !achievement.check(ctx)) continue
      next.add(achievement.id)
      newlyUnlocked ??= achievement.id
    }
    if (next.size === unlockedAchievementIds.size) return
    saveAchievements(next)
    set({ unlockedAchievementIds: next, recentAchievementId: newlyUnlocked })
  },
  clearRecentAchievement: () => set({ recentAchievementId: null }),

  addCanvasToken: (itemId, x, y) => {
    const instanceId = `t${nextInstanceId++}`
    const tokens = get().canvasTokens
    const pos = findFreePosition(tokens, x, y)
    const token: CanvasToken = { instanceId, itemId, x: pos.x, y: pos.y }
    set({ canvasTokens: [...tokens, token] })
    return instanceId
  },

  removeCanvasToken: (instanceId) => {
    set({ canvasTokens: get().canvasTokens.filter((t) => t.instanceId !== instanceId) })
  },

  moveCanvasToken: (instanceId, x, y) => {
    const tokens = get().canvasTokens
    const pos = findFreePosition(tokens, x, y, instanceId)
    set({ canvasTokens: tokens.map((t) => (t.instanceId === instanceId ? { ...t, x: pos.x, y: pos.y } : t)) })
  },

  clearCanvas: () => set({ canvasTokens: [], lastCombineSnapshot: null }),

  tidyCanvas: () => {
    const tokens = get().canvasTokens
    const positions = computeGridPositions(tokens.length)
    set({ canvasTokens: tokens.map((t, i) => ({ ...t, x: positions[i].x, y: positions[i].y })) })
  },

  combineTokens: (instanceIdA, instanceIdB) => {
    const { canvasTokens, discoveredItemIds, stats } = get()
    const tokenA = canvasTokens.find((t) => t.instanceId === instanceIdA)
    const tokenB = canvasTokens.find((t) => t.instanceId === instanceIdB)
    if (!tokenA || !tokenB) return

    const result = tryCombine(tokenA.itemId, tokenB.itemId, RECIPE_INDEX, discoveredItemIds)

    if (result.kind === 'unknown') {
      sounds.buzz()
      const nextStats: StatsState = { ...stats, totalAttempts: stats.totalAttempts + 1 }
      saveStats(nextStats)
      set({ lastFailedComboInstanceIds: [instanceIdA, instanceIdB], stats: nextStats })
      return
    }

    const remaining = canvasTokens.filter((t) => t.instanceId !== instanceIdA && t.instanceId !== instanceIdB)
    const midX = (tokenA.x + tokenB.x) / 2
    const midY = (tokenA.y + tokenB.y) / 2
    const pos = findFreePosition(remaining, midX, midY)
    const resultToken: CanvasToken = { instanceId: `t${nextInstanceId++}`, itemId: result.resultId, x: pos.x, y: pos.y }

    if (result.isNewDiscovery) {
      sounds.chime()
      const updated = new Set(discoveredItemIds)
      updated.add(result.resultId)
      saveDiscovered(updated)
      const currentDiscoveryStreak = stats.currentDiscoveryStreak + 1
      const nextStats: StatsState = {
        ...stats,
        totalAttempts: stats.totalAttempts + 1,
        totalSuccesses: stats.totalSuccesses + 1,
        currentDiscoveryStreak,
        longestDiscoveryStreak: Math.max(stats.longestDiscoveryStreak, currentDiscoveryStreak),
      }
      saveStats(nextStats)
      set({
        discoveredItemIds: updated,
        recentDiscoveryId: result.resultId,
        canvasTokens: [...remaining, resultToken],
        justMergedInstanceId: resultToken.instanceId,
        stats: nextStats,
        lastCombineSnapshot: { removed: [tokenA, tokenB], added: resultToken },
      })
      get().checkAchievements()
    } else {
      sounds.blip()
      const nextStats: StatsState = {
        ...stats,
        totalAttempts: stats.totalAttempts + 1,
        totalSuccesses: stats.totalSuccesses + 1,
        currentDiscoveryStreak: 0,
      }
      saveStats(nextStats)
      set({
        canvasTokens: [...remaining, resultToken],
        justMergedInstanceId: resultToken.instanceId,
        stats: nextStats,
        lastCombineSnapshot: { removed: [tokenA, tokenB], added: resultToken },
      })
      get().checkAchievements()
    }
  },

  undoLastCombine: () => {
    const snapshot = get().lastCombineSnapshot
    if (!snapshot) return
    const tokens = get().canvasTokens.filter((t) => t.instanceId !== snapshot.added.instanceId)
    set({ canvasTokens: [...tokens, ...snapshot.removed], lastCombineSnapshot: null })
  },

  clearRecentDiscovery: () => set({ recentDiscoveryId: null }),
  clearFailedCombo: () => set({ lastFailedComboInstanceIds: null }),
  clearJustMerged: () => set({ justMergedInstanceId: null }),

  useHint: () => {
    const hintState = regenerateHints({ count: get().hintsAvailable, lastGrantedAt: get().hintLastGrantedAt })
    if (hintState.count <= 0) {
      saveHintState(hintState)
      set({ hintsAvailable: hintState.count, hintLastGrantedAt: hintState.lastGrantedAt })
      return
    }
    const hint = getHint(get().discoveredItemIds, RECIPES, RECIPES_BY_INPUT)
    if (!hint) {
      saveHintState(hintState)
      set({ hintsAvailable: hintState.count, hintLastGrantedAt: hintState.lastGrantedAt })
      return
    }
    const nextState: HintState = { count: hintState.count - 1, lastGrantedAt: hintState.lastGrantedAt }
    saveHintState(nextState)
    set({ hintsAvailable: nextState.count, hintLastGrantedAt: nextState.lastGrantedAt, highlightedItemId: hint.knownIngredientId })
  },

  tickHintRegen: () => {
    const current = { count: get().hintsAvailable, lastGrantedAt: get().hintLastGrantedAt }
    const next = regenerateHints(current)
    if (next.count === current.count && next.lastGrantedAt === current.lastGrantedAt) return
    saveHintState(next)
    set({ hintsAvailable: next.count, hintLastGrantedAt: next.lastGrantedAt })
  },

  clearHighlight: () => set({ highlightedItemId: null }),
}))
