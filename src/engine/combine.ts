import type { Recipe } from '@/types'

export function makeRecipeKey(a: string, b: string): string {
  return [a, b].sort().join('+')
}

export type CombineResult =
  | { kind: 'success'; resultId: string; isNewDiscovery: boolean }
  | { kind: 'unknown' }

export function tryCombine(
  a: string,
  b: string,
  recipeIndex: Map<string, Recipe>,
  discoveredItemIds: Set<string>,
): CombineResult {
  const recipe = recipeIndex.get(makeRecipeKey(a, b))
  if (!recipe) return { kind: 'unknown' }
  return { kind: 'success', resultId: recipe.result, isNewDiscovery: !discoveredItemIds.has(recipe.result) }
}

export interface Hint {
  resultId: string
  knownIngredientId: string
}

/**
 * Hints are weighted toward results with more downstream fan-out (recipes
 * that consume them), since rarity tracks historical obscurity rather than
 * how much further progress a discovery unlocks.
 *
 * Recipes with both inputs already discovered (immediately craftable) are
 * strictly preferred over ones needing an undiscovered ingredient too —
 * otherwise the hint can point at something the player can't actually make yet.
 */
export function getHint(
  discoveredItemIds: Set<string>,
  recipes: Recipe[],
  recipesByInput: Map<string, Recipe[]>,
): Hint | null {
  const readyCandidates: { hint: Hint; weight: number }[] = []
  const partialCandidates: { hint: Hint; weight: number }[] = []
  for (const recipe of recipes) {
    if (discoveredItemIds.has(recipe.result)) continue
    const [a, b] = recipe.inputs
    const aKnown = discoveredItemIds.has(a)
    const bKnown = discoveredItemIds.has(b)
    if (!aKnown && !bKnown) continue
    const fanOut = recipesByInput.get(recipe.result)?.length ?? 0
    const candidate = { hint: { resultId: recipe.result, knownIngredientId: aKnown ? a : b }, weight: fanOut + 1 }
    if (aKnown && bKnown) readyCandidates.push(candidate)
    else partialCandidates.push(candidate)
  }
  const candidates = readyCandidates.length > 0 ? readyCandidates : partialCandidates
  if (candidates.length === 0) return null

  const totalWeight = candidates.reduce((sum, c) => sum + c.weight, 0)
  let roll = Math.random() * totalWeight
  for (const candidate of candidates) {
    roll -= candidate.weight
    if (roll <= 0) return candidate.hint
  }
  return candidates[candidates.length - 1].hint
}

/** All item ids that combine with `itemId` in some known recipe (used by easy mode to highlight valid drop targets). */
export function getCompatiblePartnerIds(itemId: string, recipesByInput: Map<string, Recipe[]>): Set<string> {
  const partners = new Set<string>()
  for (const recipe of recipesByInput.get(itemId) ?? []) {
    const [a, b] = recipe.inputs
    partners.add(a === itemId ? b : a)
  }
  return partners
}

export function isItemExhausted(itemId: string, discoveredItemIds: Set<string>, recipes: Recipe[]): boolean {
  for (const recipe of recipes) {
    const [a, b] = recipe.inputs
    if (a !== itemId && b !== itemId) continue
    const other = a === itemId ? b : a
    if (discoveredItemIds.has(other) && !discoveredItemIds.has(recipe.result)) return false
  }
  return true
}
