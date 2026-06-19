import type { StateCreator } from 'zustand'
import { RECIPE_BY_RESULT, RECIPES_BY_INPUT } from '@/data/recipes'
import { getHint } from '@/engine/combine'
import { sounds } from '@/sound'
import { saveStats } from './statsAchievementsSlice'
import type { GameStore, HintsSlice, StatsState } from './types'

export const HINT_MAX_TIER = 3

export const createHintsSlice: StateCreator<GameStore, [], [], HintsSlice> = (set, get) => ({
  highlightedItemIds: [],
  hintTargetId: null,
  hintTier: 0,

  useHint: () => {
    const { discoveredItemIds, hintTargetId, hintTier, stats } = get()
    const sameTargetStillValid = hintTargetId !== null && !discoveredItemIds.has(hintTargetId)

    let targetId: string | null = sameTargetStillValid ? hintTargetId : null
    if (!sameTargetStillValid) {
      const hint = getHint(discoveredItemIds, RECIPES_BY_INPUT)
      if (!hint) return
      targetId = hint.resultId
    }

    const recipe = targetId ? RECIPE_BY_RESULT.get(targetId) : undefined
    if (!targetId || !recipe) return

    const nextTier = sameTargetStillValid ? Math.min(HINT_MAX_TIER, hintTier + 1) : 1
    const [a, b] = recipe.inputs
    const highlightedItemIds = nextTier === 1 ? [] : nextTier === 2 ? [discoveredItemIds.has(a) ? a : b] : [a, b]

    const nextStats: StatsState = { ...stats, hintsUsed: stats.hintsUsed + 1 }
    saveStats(nextStats)
    sounds.tierUp()
    set({
      stats: nextStats,
      highlightedItemIds,
      hintTargetId: targetId,
      hintTier: nextTier,
    })
  },

  clearHighlight: () => set({ highlightedItemIds: [] }),
})
