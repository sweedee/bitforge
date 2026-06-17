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
  knownIngredientId: string
  recipeKey: string
}

export function getHint(discoveredItemIds: Set<string>, recipes: Recipe[]): Hint | null {
  const candidates: Hint[] = []
  for (const recipe of recipes) {
    if (discoveredItemIds.has(recipe.result)) continue
    const [a, b] = recipe.inputs
    const aKnown = discoveredItemIds.has(a)
    const bKnown = discoveredItemIds.has(b)
    if (aKnown || bKnown) {
      candidates.push({ knownIngredientId: aKnown ? a : b, recipeKey: makeRecipeKey(a, b) })
    }
  }
  if (candidates.length === 0) return null
  return candidates[Math.floor(Math.random() * candidates.length)]
}
