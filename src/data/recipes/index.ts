import type { Recipe } from '@/types'
import { ITEMS, ITEMS_BY_ID, STARTER_ITEM_IDS } from '@/data/items'
import { makeRecipeKey } from '@/engine/combine'
import { RECIPES_HARDWARE } from './hardware'
import { RECIPES_ARCHITECTURE } from './architecture'
import { RECIPES_ENCODING } from './encoding'
import { RECIPES_CONCEPTS } from './concepts'
import { RECIPES_LANGUAGES } from './languages'
import { RECIPES_DATASTRUCTURES } from './datastructures'
import { RECIPES_ALGORITHMS } from './algorithms'
import { RECIPES_DATABASES } from './databases'
import { RECIPES_WEB } from './web'
import { RECIPES_OS } from './os'
import { RECIPES_SOFTWARE_ENG } from './software-eng'
import { RECIPES_SECURITY } from './security'
import { RECIPES_AI_ML } from './ai-ml'
import { RECIPES_THEORY } from './theory'
import { RECIPES_DISTRIBUTED } from './distributed'
import { RECIPES_GRAPHICS } from './graphics'
import { RECIPES_GAMEDEV } from './gamedev'
import { RECIPES_CLOUD } from './cloud'
import { RECIPES_CAPSTONE } from './capstone'
import { RECIPES_FUN } from './fun'

export const RECIPES: Recipe[] = [
  ...RECIPES_HARDWARE,
  ...RECIPES_ARCHITECTURE,
  ...RECIPES_ENCODING,
  ...RECIPES_CONCEPTS,
  ...RECIPES_LANGUAGES,
  ...RECIPES_DATASTRUCTURES,
  ...RECIPES_ALGORITHMS,
  ...RECIPES_DATABASES,
  ...RECIPES_WEB,
  ...RECIPES_OS,
  ...RECIPES_SOFTWARE_ENG,
  ...RECIPES_SECURITY,
  ...RECIPES_AI_ML,
  ...RECIPES_THEORY,
  ...RECIPES_DISTRIBUTED,
  ...RECIPES_GRAPHICS,
  ...RECIPES_GAMEDEV,
  ...RECIPES_CLOUD,
  ...RECIPES_CAPSTONE,
  ...RECIPES_FUN,
]

export const RECIPE_INDEX: Map<string, Recipe> = new Map(
  RECIPES.map((recipe) => [makeRecipeKey(recipe.inputs[0], recipe.inputs[1]), recipe]),
)

export const RECIPE_BY_RESULT: Map<string, Recipe> = new Map(RECIPES.map((recipe) => [recipe.result, recipe]))

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

  // Reachability: every non-starter item must be craftable from the starter elements.
  const reachable = new Set<string>(STARTER_ITEM_IDS)
  let changed = true
  while (changed) {
    changed = false
    for (const recipe of RECIPES) {
      const [a, b] = recipe.inputs
      if (reachable.has(a) && reachable.has(b) && !reachable.has(recipe.result)) {
        reachable.add(recipe.result)
        changed = true
      }
    }
  }
  const orphans = ITEMS.filter((item) => !reachable.has(item.id)).map((item) => item.id)
  if (orphans.length > 0) {
    throw new Error(`Unreachable items (no path from starters): ${orphans.join(', ')}`)
  }
}
