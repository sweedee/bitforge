import type { StateCreator } from 'zustand'
import type { CanvasToken } from '@/types'
import { RECIPE_INDEX, RECIPES_BY_INPUT } from '@/data/recipes'
import { isItemExhausted, tryCombine } from '@/engine/combine'
import { computeGridPositions } from '@/lib/gridLayout'
import { sounds } from '@/sound'
import { saveDiscovered } from './discoverySlice'
import { saveStats } from './statsAchievementsSlice'
import type { CanvasSlice, GameStore, StatsState } from './types'

const MIN_TOKEN_DIST = 9

function isFarFromAll(x: number, y: number, tokens: CanvasToken[], excludeInstanceId?: string) {
  return tokens.every((t) => t.instanceId === excludeInstanceId || Math.hypot(t.x - x, t.y - y) >= MIN_TOKEN_DIST)
}

function findFreePosition(tokens: CanvasToken[], desiredX: number, desiredY: number, excludeInstanceId?: string) {
  if (isFarFromAll(desiredX, desiredY, tokens, excludeInstanceId)) return { x: desiredX, y: desiredY }
  for (let radius = MIN_TOKEN_DIST; radius < 40; radius += MIN_TOKEN_DIST) {
    for (let angle = 0; angle < 360; angle += 30) {
      const rad = (angle * Math.PI) / 180
      const x = Math.min(95, Math.max(5, desiredX + radius * Math.cos(rad)))
      const y = Math.min(95, Math.max(5, desiredY + radius * Math.sin(rad)))
      if (isFarFromAll(x, y, tokens, excludeInstanceId)) return { x, y }
    }
  }
  return { x: desiredX, y: desiredY }
}

let nextInstanceId = 0

export const createCanvasSlice: StateCreator<GameStore, [], [], CanvasSlice> = (set, get) => ({
  canvasTokens: [],
  lastCombineSnapshot: null,
  lastFailedComboInstanceIds: null,
  justMergedInstanceId: null,
  draggingItemId: null,
  draggingInstanceId: null,
  setDraggingItem: (itemId, instanceId = null) => set({ draggingItemId: itemId, draggingInstanceId: instanceId }),

  addCanvasToken: (itemId, x, y, options) => {
    const instanceId = `t${nextInstanceId++}`
    const tokens = get().canvasTokens
    const pos = findFreePosition(tokens, x, y)
    const token: CanvasToken = { instanceId, itemId, x: pos.x, y: pos.y }
    set({ canvasTokens: [...tokens, token] })
    if (!options?.silent) sounds.place()
    return instanceId
  },

  removeCanvasToken: (instanceId) => {
    set({ canvasTokens: get().canvasTokens.filter((t) => t.instanceId !== instanceId) })
    sounds.remove()
  },

  moveCanvasToken: (instanceId, x, y) => {
    const tokens = get().canvasTokens
    const pos = findFreePosition(tokens, x, y, instanceId)
    set({ canvasTokens: tokens.map((t) => (t.instanceId === instanceId ? { ...t, x: pos.x, y: pos.y } : t)) })
  },

  clearCanvas: () => set({ canvasTokens: [], lastCombineSnapshot: null }),

  tidyCanvas: () => {
    const { canvasTokens, discoveredItemIds, settings } = get()
    let tokens = settings.autoCleanup
      ? canvasTokens.filter((t) => !isItemExhausted(t.itemId, discoveredItemIds, RECIPES_BY_INPUT))
      : canvasTokens
    if (settings.dedupeOnTidy) {
      const seen = new Set<string>()
      tokens = tokens.filter((t) => {
        if (seen.has(t.itemId)) return false
        seen.add(t.itemId)
        return true
      })
    }
    const positions = computeGridPositions(tokens.length)
    set({ canvasTokens: tokens.map((t, i) => ({ ...t, x: positions[i]!.x, y: positions[i]!.y })) })
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
      get().addHistoryEntry({ kind: 'discovery', itemId: result.resultId, at: Date.now() })
      const hintResolved = get().hintTargetId === result.resultId
      set({
        discoveredItemIds: updated,
        toastQueue: [...get().toastQueue, { kind: 'discovery', itemId: result.resultId }],
        lastDiscoveredItemId: result.resultId,
        canvasTokens: [...remaining, resultToken],
        justMergedInstanceId: resultToken.instanceId,
        stats: nextStats,
        lastCombineSnapshot: { removed: [tokenA, tokenB], added: resultToken },
        ...(hintResolved ? { hintTargetId: null, hintTier: 0, highlightedItemIds: [] } : {}),
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

  clearFailedCombo: () => set({ lastFailedComboInstanceIds: null }),
  clearJustMerged: () => set({ justMergedInstanceId: null }),
})
