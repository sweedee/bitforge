import type { Recipe } from '@/types'
import { RECIPES } from '@/data/recipes'
import { STARTER_ITEM_IDS } from '@/data/items'

/**
 * Crafting depth = shortest number of combination steps from the starter elements.
 * Starters are depth 0; every other item is `1 + min over recipes of max(depthA, depthB)`.
 * Computed once via iterative relaxation (the graph is a modest DAG).
 */
function computeDepths(recipes: Recipe[], starters: string[]): Map<string, number> {
  const depth = new Map<string, number>()
  for (const id of starters) depth.set(id, 0)

  let changed = true
  while (changed) {
    changed = false
    for (const recipe of recipes) {
      const [a, b] = recipe.inputs
      const da = depth.get(a)
      const db = depth.get(b)
      if (da === undefined || db === undefined) continue
      const candidate = 1 + Math.max(da, db)
      const current = depth.get(recipe.result)
      if (current === undefined || candidate < current) {
        depth.set(recipe.result, candidate)
        changed = true
      }
    }
  }
  return depth
}

export const ITEM_DEPTH: Map<string, number> = computeDepths(RECIPES, STARTER_ITEM_IDS)

export const MAX_DEPTH: number = Math.max(0, ...ITEM_DEPTH.values())

export function getItemDepth(itemId: string): number {
  return ITEM_DEPTH.get(itemId) ?? 0
}

const STAR_MAX = 5

/** Bucket raw depth into a 0–5 star rating. Starters (depth 0) get 0 stars. */
export function getItemStars(itemId: string): number {
  const depth = getItemDepth(itemId)
  if (depth <= 0) return 0
  if (MAX_DEPTH <= 0) return 1
  return Math.min(STAR_MAX, Math.max(1, Math.ceil((depth / MAX_DEPTH) * STAR_MAX)))
}
