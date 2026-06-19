import type { StateCreator } from 'zustand'
import { ITEMS, STARTER_ITEM_IDS } from '@/data/items'
import { DEFAULT_STATS, saveAchievements, saveHistory, saveStats } from './statsAchievementsSlice'
import type { DiscoverySlice, GameStore } from './types'

const LS_DISCOVERED_KEY = 'bitforge:discovered'

function loadDiscovered(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_DISCOVERED_KEY)
    if (raw) return new Set(JSON.parse(raw) as string[])
  } catch {
    /* ignore */
  }
  return new Set(STARTER_ITEM_IDS)
}

let discoveredSaveTimer: number | undefined
let pendingDiscovered: Set<string> | null = null

function flushDiscovered() {
  if (discoveredSaveTimer !== undefined) {
    clearTimeout(discoveredSaveTimer)
    discoveredSaveTimer = undefined
  }
  if (pendingDiscovered) {
    localStorage.setItem(LS_DISCOVERED_KEY, JSON.stringify([...pendingDiscovered]))
    pendingDiscovered = null
  }
}

if (typeof window !== 'undefined') window.addEventListener('beforeunload', flushDiscovered)

/** Debounced write — rapid combines shouldn't each trigger a full Set serialization. Flushed on unload. */
export function saveDiscovered(ids: Set<string>) {
  pendingDiscovered = ids
  if (discoveredSaveTimer !== undefined) clearTimeout(discoveredSaveTimer)
  discoveredSaveTimer = window.setTimeout(flushDiscovered, 400)
}

/** Synchronous write for rare, deliberate actions (reset/unlock-all) where there's no rapid-fire concern. */
export function saveDiscoveredImmediate(ids: Set<string>) {
  pendingDiscovered = null
  if (discoveredSaveTimer !== undefined) {
    clearTimeout(discoveredSaveTimer)
    discoveredSaveTimer = undefined
  }
  localStorage.setItem(LS_DISCOVERED_KEY, JSON.stringify([...ids]))
}

export const createDiscoverySlice: StateCreator<GameStore, [], [], DiscoverySlice> = (set, get) => ({
  discoveredItemIds: loadDiscovered(),
  toastQueue: [],
  dequeueToast: () => set({ toastQueue: get().toastQueue.slice(1) }),
  lastDiscoveredItemId: null,

  discoverItem: (itemId) => {
    if (get().discoveredItemIds.has(itemId)) return
    const updated = new Set(get().discoveredItemIds)
    updated.add(itemId)
    saveDiscovered(updated)
    set({ discoveredItemIds: updated })
    get().addHistoryEntry({ kind: 'discovery', itemId, at: Date.now() })
    get().checkAchievements()
  },

  unlockAllItems: () => {
    const updated = new Set(ITEMS.map((item) => item.id))
    saveDiscoveredImmediate(updated)
    set({ discoveredItemIds: updated })
    get().checkAchievements()
  },

  resetProgress: () => {
    const starters = new Set(STARTER_ITEM_IDS)
    saveDiscoveredImmediate(starters)
    saveAchievements(new Set())
    saveStats(DEFAULT_STATS)
    saveHistory([])
    set({
      discoveredItemIds: starters,
      unlockedAchievementIds: new Set(),
      stats: { ...DEFAULT_STATS },
      history: [],
      hintTargetId: null,
      hintTier: 0,
      highlightedItemIds: [],
      canvasTokens: [],
      lastCombineSnapshot: null,
      toastQueue: [],
      lastDiscoveredItemId: null,
    })
  },
})
