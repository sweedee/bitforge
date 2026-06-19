import { create } from 'zustand'
import { createCanvasSlice } from './canvasSlice'
import { createDiscoverySlice } from './discoverySlice'
import { createHintsSlice, HINT_MAX_TIER } from './hintsSlice'
import { createSettingsSlice } from './settingsSlice'
import { createStatsAchievementsSlice, isStreakMilestone } from './statsAchievementsSlice'
import type { GameStore } from './types'

export type { GameStore, SettingsState, StatsState, ToastEntry } from './types'
export { HINT_MAX_TIER, isStreakMilestone }

export const useGameStore = create<GameStore>()((...a) => ({
  ...createDiscoverySlice(...a),
  ...createCanvasSlice(...a),
  ...createSettingsSlice(...a),
  ...createStatsAchievementsSlice(...a),
  ...createHintsSlice(...a),
}))
