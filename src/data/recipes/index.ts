import type { Recipe } from '@/types'
import { ITEMS_BY_ID } from '@/data/items'
import { makeRecipeKey } from '@/engine/combine'
import { RECIPES_TIER1_LOGIC } from './tier1-logic'
import { RECIPES_TIER2_CIRCUITS } from './tier2-circuits'
import { RECIPES_TIER3_ARCHITECTURE } from './tier3-architecture'
import { RECIPES_TIER4_LOWLEVEL } from './tier4-lowlevel'
import { RECIPES_TIER5_LANGUAGES_LOW } from './tier5-languages-low'
import { RECIPES_TIER6_LANGUAGES_HIGH } from './tier6-languages-high'
import { RECIPES_TIER7_PARADIGMS } from './tier7-paradigms'
import { RECIPES_TIER8_DATASTRUCTURES } from './tier8-datastructures'
import { RECIPES_TIER9_ALGORITHMS } from './tier9-algorithms'
import { RECIPES_TIER10_CAPSTONE } from './tier10-capstone'

export const RECIPES: Recipe[] = [
  ...RECIPES_TIER1_LOGIC,
  ...RECIPES_TIER2_CIRCUITS,
  ...RECIPES_TIER3_ARCHITECTURE,
  ...RECIPES_TIER4_LOWLEVEL,
  ...RECIPES_TIER5_LANGUAGES_LOW,
  ...RECIPES_TIER6_LANGUAGES_HIGH,
  ...RECIPES_TIER7_PARADIGMS,
  ...RECIPES_TIER8_DATASTRUCTURES,
  ...RECIPES_TIER9_ALGORITHMS,
  ...RECIPES_TIER10_CAPSTONE,
]

export const RECIPE_INDEX: Map<string, Recipe> = new Map(
  RECIPES.map((recipe) => [makeRecipeKey(recipe.inputs[0], recipe.inputs[1]), recipe]),
)

if (import.meta.env.DEV) {
  const seenKeys = new Set<string>()
  for (const recipe of RECIPES) {
    const [a, b] = recipe.inputs
    if (!ITEMS_BY_ID.has(a)) throw new Error(`Recipe input "${a}" is not a known item id`)
    if (!ITEMS_BY_ID.has(b)) throw new Error(`Recipe input "${b}" is not a known item id`)
    if (!ITEMS_BY_ID.has(recipe.result)) throw new Error(`Recipe result "${recipe.result}" is not a known item id`)
    const key = makeRecipeKey(a, b)
    if (seenKeys.has(key)) throw new Error(`Duplicate recipe for pair: ${key}`)
    seenKeys.add(key)
  }
}
