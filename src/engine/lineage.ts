import type { Item, Recipe } from '@/types'

export interface LineageNode {
  item: Item
  /** null for starter elements or when the lineage couldn't be resolved. */
  children: [LineageNode, LineageNode] | null
}

/**
 * Builds the ancestor tree back to starter elements. Every recipe has exactly
 * two inputs, so this is a strict binary tree — shared sub-ancestors (e.g. a
 * common primitive used in many branches) will repeat across the tree rather
 * than collapsing into a DAG. That's an accepted simplification for a lineage
 * view, not a bug.
 */
export function buildLineage(
  itemId: string,
  itemsById: Map<string, Item>,
  recipeByResult: Map<string, Recipe>,
  depthLimit = 12,
): LineageNode | null {
  const item = itemsById.get(itemId)
  if (!item) return null

  const recipe = recipeByResult.get(itemId)
  if (!recipe || depthLimit <= 0) return { item, children: null }

  const [aId, bId] = recipe.inputs
  const a = buildLineage(aId, itemsById, recipeByResult, depthLimit - 1)
  const b = buildLineage(bId, itemsById, recipeByResult, depthLimit - 1)
  if (!a || !b) return { item, children: null }

  return { item, children: [a, b] }
}
