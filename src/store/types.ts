import type { CanvasToken } from '@/types'

export type ToastEntry = { kind: 'discovery'; itemId: string } | { kind: 'achievement'; achievementId: string }

export type HistoryEntry =
  | { kind: 'discovery'; itemId: string; at: number }
  | { kind: 'achievement'; achievementId: string; at: number }

export interface StatsState {
  totalAttempts: number
  totalSuccesses: number
  longestDiscoveryStreak: number
  currentDiscoveryStreak: number
  totalTimePlayedMs: number
  hintsUsed: number
}

export interface SettingsState {
  muted: boolean
  volume: number
  reducedMotion: boolean
  autoCleanup: boolean
  dedupeOnTidy: boolean
  easyMode: boolean
  disableNotifications: boolean
}

export interface DiscoverySlice {
  discoveredItemIds: Set<string>
  toastQueue: ToastEntry[]
  dequeueToast: () => void
  /** One-shot signal for MilestoneBurst — changes to a new (always-unique) item id on every discovery. */
  lastDiscoveredItemId: string | null
  hasSeenCompletionCelebration: boolean
  /** One-shot signal for CompletionModal — true right after the final item is discovered. */
  justCompletedDiscovery: boolean
  discoverItem: (itemId: string) => void
  acknowledgeCompletionCelebration: () => void
  unlockAllItems: () => void
  resetProgress: () => void
}

export interface CanvasSlice {
  canvasTokens: CanvasToken[]
  lastCombineSnapshot: { removed: [CanvasToken, CanvasToken]; added: CanvasToken } | null
  lastFailedComboInstanceIds: [string, string] | null
  justMergedInstanceId: string | null
  draggingItemId: string | null
  draggingInstanceId: string | null
  /** Real pixel size of the combine canvas, used to keep token spacing visually consistent across aspect ratios. */
  canvasSize: { width: number; height: number }
  setCanvasSize: (width: number, height: number) => void
  setDraggingItem: (itemId: string | null, instanceId?: string | null) => void
  addCanvasToken: (itemId: string, x: number, y: number, options?: { silent?: boolean }) => string
  removeCanvasToken: (instanceId: string) => void
  moveCanvasToken: (instanceId: string, x: number, y: number) => void
  clearCanvas: () => void
  tidyCanvas: () => void
  combineTokens: (instanceIdA: string, instanceIdB: string) => void
  undoLastCombine: () => void
  clearFailedCombo: () => void
  clearJustMerged: () => void
}

export interface SettingsSlice {
  settings: SettingsState
  toggleMute: () => void
  setVolume: (volume: number) => void
  toggleReducedMotion: () => void
  toggleAutoCleanup: () => void
  toggleDedupeOnTidy: () => void
  toggleEasyMode: () => void
  toggleDisableNotifications: () => void
}

export interface StatsAchievementsSlice {
  stats: StatsState
  tickPlayTime: (ms: number) => void
  unlockedAchievementIds: Set<string>
  checkAchievements: () => void
  history: HistoryEntry[]
  addHistoryEntry: (entry: HistoryEntry) => void
}

export interface HintsSlice {
  highlightedItemIds: string[]
  hintTargetId: string | null
  hintTier: number
  useHint: () => void
  clearHighlight: () => void
}

export type GameStore = DiscoverySlice & CanvasSlice & SettingsSlice & StatsAchievementsSlice & HintsSlice
