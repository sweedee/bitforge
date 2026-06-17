import { create } from 'zustand'
import type { CanvasToken } from '@/types'
import { STARTER_ITEM_IDS } from '@/data/items'
import { RECIPES, RECIPE_INDEX } from '@/data/recipes'
import { getHint, tryCombine } from '@/engine/combine'
import { sounds } from '@/sound'

const LS_DISCOVERED_KEY = 'bitforge:discovered'
const LS_HINTS_KEY = 'bitforge:hints'

export const HINT_MAX = 3
export const HINT_REGEN_MS = 3 * 60 * 1000

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

let nextInstanceId = 0

interface GameStore {
  discoveredItemIds: Set<string>
  recentDiscoveryId: string | null
  lastFailedComboInstanceIds: [string, string] | null

  canvasTokens: CanvasToken[]

  hintsAvailable: number
  hintLastGrantedAt: number
  highlightedItemId: string | null

  addCanvasToken: (itemId: string, x: number, y: number) => string
  removeCanvasToken: (instanceId: string) => void
  moveCanvasToken: (instanceId: string, x: number, y: number) => void
  clearCanvas: () => void
  combineTokens: (instanceIdA: string, instanceIdB: string) => void
  clearRecentDiscovery: () => void
  clearFailedCombo: () => void

  useHint: () => void
  clearHighlight: () => void
}

export const useGameStore = create<GameStore>()((set, get) => ({
  discoveredItemIds: loadDiscovered(),
  recentDiscoveryId: null,
  lastFailedComboInstanceIds: null,

  canvasTokens: [],

  hintsAvailable: regenerateHints(loadHintState()).count,
  hintLastGrantedAt: regenerateHints(loadHintState()).lastGrantedAt,
  highlightedItemId: null,

  addCanvasToken: (itemId, x, y) => {
    const instanceId = `t${nextInstanceId++}`
    const token: CanvasToken = { instanceId, itemId, x, y }
    set({ canvasTokens: [...get().canvasTokens, token] })
    return instanceId
  },

  removeCanvasToken: (instanceId) => {
    set({ canvasTokens: get().canvasTokens.filter((t) => t.instanceId !== instanceId) })
  },

  moveCanvasToken: (instanceId, x, y) => {
    set({ canvasTokens: get().canvasTokens.map((t) => (t.instanceId === instanceId ? { ...t, x, y } : t)) })
  },

  clearCanvas: () => set({ canvasTokens: [] }),

  combineTokens: (instanceIdA, instanceIdB) => {
    const { canvasTokens, discoveredItemIds } = get()
    const tokenA = canvasTokens.find((t) => t.instanceId === instanceIdA)
    const tokenB = canvasTokens.find((t) => t.instanceId === instanceIdB)
    if (!tokenA || !tokenB) return

    const result = tryCombine(tokenA.itemId, tokenB.itemId, RECIPE_INDEX, discoveredItemIds)

    if (result.kind === 'unknown') {
      sounds.buzz()
      set({ lastFailedComboInstanceIds: [instanceIdA, instanceIdB] })
      return
    }

    const remaining = canvasTokens.filter((t) => t.instanceId !== instanceIdA && t.instanceId !== instanceIdB)
    const midX = (tokenA.x + tokenB.x) / 2
    const midY = (tokenA.y + tokenB.y) / 2
    const resultToken: CanvasToken = { instanceId: `t${nextInstanceId++}`, itemId: result.resultId, x: midX, y: midY }

    if (result.isNewDiscovery) {
      sounds.chime()
      const updated = new Set(discoveredItemIds)
      updated.add(result.resultId)
      saveDiscovered(updated)
      set({
        discoveredItemIds: updated,
        recentDiscoveryId: result.resultId,
        canvasTokens: [...remaining, resultToken],
      })
    } else {
      sounds.blip()
      set({ canvasTokens: [...remaining, resultToken] })
    }
  },

  clearRecentDiscovery: () => set({ recentDiscoveryId: null }),
  clearFailedCombo: () => set({ lastFailedComboInstanceIds: null }),

  useHint: () => {
    const hintState = regenerateHints({ count: get().hintsAvailable, lastGrantedAt: get().hintLastGrantedAt })
    if (hintState.count <= 0) {
      saveHintState(hintState)
      set({ hintsAvailable: hintState.count, hintLastGrantedAt: hintState.lastGrantedAt })
      return
    }
    const hint = getHint(get().discoveredItemIds, RECIPES)
    if (!hint) {
      saveHintState(hintState)
      set({ hintsAvailable: hintState.count, hintLastGrantedAt: hintState.lastGrantedAt })
      return
    }
    const nextState: HintState = { count: hintState.count - 1, lastGrantedAt: hintState.lastGrantedAt }
    saveHintState(nextState)
    set({ hintsAvailable: nextState.count, hintLastGrantedAt: nextState.lastGrantedAt, highlightedItemId: hint.knownIngredientId })
  },

  clearHighlight: () => set({ highlightedItemId: null }),
}))
