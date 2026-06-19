import { ITEMS_BY_ID } from '@/data/items'
import { RECIPES, RECIPES_BY_INPUT, RECIPE_BY_RESULT } from '@/data/recipes'
import { getItemDepth } from '@/engine/depth'

export interface TechTreeNode {
  id: string
  locked: boolean
}

export interface TechTreeEdge {
  id: string
  source: string
  target: string
  locked: boolean
}

export interface TechTreeGraph {
  nodes: TechTreeNode[]
  edges: TechTreeEdge[]
}

function toGraph(nodeIds: Set<string>, edges: TechTreeEdge[], discoveredItemIds: Set<string>): TechTreeGraph {
  return {
    nodes: [...nodeIds].map((id) => ({ id, locked: !discoveredItemIds.has(id) })),
    edges,
  }
}

/** Pushes an edge for each distinct input — self-combo recipes (e.g. transistor + transistor) only need one. */
function pushInputEdges(edges: TechTreeEdge[], a: string, b: string, target: string, aLocked: boolean, bLocked: boolean) {
  edges.push({ id: `${a}->${target}`, source: a, target, locked: aLocked })
  if (b !== a) edges.push({ id: `${b}->${target}`, source: b, target, locked: bLocked })
}

/** Default view: undiscovered items reachable in one combine step from what's already discovered. */
export function buildFrontierGraph(discoveredItemIds: Set<string>): TechTreeGraph {
  const nodeIds = new Set<string>()
  const edges: TechTreeEdge[] = []
  for (const recipe of RECIPES) {
    if (discoveredItemIds.has(recipe.result)) continue
    const [a, b] = recipe.inputs
    const aKnown = discoveredItemIds.has(a)
    const bKnown = discoveredItemIds.has(b)
    if (!aKnown && !bKnown) continue
    nodeIds.add(a)
    nodeIds.add(b)
    nodeIds.add(recipe.result)
    pushInputEdges(edges, a, b, recipe.result, !aKnown, !bKnown)
  }
  return toGraph(nodeIds, edges, discoveredItemIds)
}

/** Focus view: one hop of ingredients (parents) and one hop of consumers (children) around a single item. */
export function buildFocusGraph(itemId: string, discoveredItemIds: Set<string>): TechTreeGraph {
  const nodeIds = new Set<string>([itemId])
  const edges: TechTreeEdge[] = []

  const recipe = RECIPE_BY_RESULT.get(itemId)
  if (recipe) {
    const [a, b] = recipe.inputs
    nodeIds.add(a)
    nodeIds.add(b)
    pushInputEdges(edges, a, b, itemId, !discoveredItemIds.has(a), !discoveredItemIds.has(b))
  }

  const seenConsumerResults = new Set<string>()
  for (const consumer of RECIPES_BY_INPUT.get(itemId) ?? []) {
    if (seenConsumerResults.has(consumer.result)) continue
    seenConsumerResults.add(consumer.result)
    nodeIds.add(consumer.result)
    edges.push({ id: `${itemId}->${consumer.result}`, source: itemId, target: consumer.result, locked: !discoveredItemIds.has(consumer.result) })
  }

  return toGraph(nodeIds, edges, discoveredItemIds)
}

/**
 * Full ancestor DAG for a single item, back to starters, deduplicated (unlike a naive
 * binary tree, a shared sub-ancestor used in multiple branches collapses to one node).
 * Optionally adds one hop of consumers (what this item is used to make).
 */
export function buildLineageGraph(itemId: string, discoveredItemIds: Set<string>, includeConsumers = false): TechTreeGraph {
  const nodeIds = new Set<string>([itemId])
  const edges: TechTreeEdge[] = []
  const visited = new Set<string>()

  function addAncestors(id: string) {
    if (visited.has(id)) return
    visited.add(id)
    const recipe = RECIPE_BY_RESULT.get(id)
    if (!recipe) return
    const [a, b] = recipe.inputs
    nodeIds.add(a)
    nodeIds.add(b)
    pushInputEdges(edges, a, b, id, !discoveredItemIds.has(a), !discoveredItemIds.has(b))
    addAncestors(a)
    addAncestors(b)
  }
  addAncestors(itemId)

  if (includeConsumers) {
    const seenConsumerResults = new Set<string>()
    for (const consumer of RECIPES_BY_INPUT.get(itemId) ?? []) {
      if (seenConsumerResults.has(consumer.result)) continue
      seenConsumerResults.add(consumer.result)
      nodeIds.add(consumer.result)
      edges.push({ id: `${itemId}->${consumer.result}`, source: itemId, target: consumer.result, locked: !discoveredItemIds.has(consumer.result) })
    }
  }

  return toGraph(nodeIds, edges, discoveredItemIds)
}

/** Every recipe whose inputs and result are all already discovered. Heavier — opt-in only. */
export function buildDiscoveredGraph(discoveredItemIds: Set<string>): TechTreeGraph {
  const nodeIds = new Set<string>()
  const edges: TechTreeEdge[] = []
  for (const recipe of RECIPES) {
    const [a, b] = recipe.inputs
    if (!discoveredItemIds.has(a) || !discoveredItemIds.has(b) || !discoveredItemIds.has(recipe.result)) continue
    nodeIds.add(a)
    nodeIds.add(b)
    nodeIds.add(recipe.result)
    pushInputEdges(edges, a, b, recipe.result, false, false)
  }
  return toGraph(nodeIds, edges, discoveredItemIds)
}

const COL_WIDTH = 220
const ROW_HEIGHT = 64

/** Columns by crafting depth (reusing the existing depth engine), rows ordered alphabetically within a column. */
export function layoutNodes(nodeIds: string[]): Map<string, { x: number; y: number }> {
  const byDepth = new Map<number, string[]>()
  for (const id of nodeIds) {
    const depth = getItemDepth(id)
    const list = byDepth.get(depth) ?? []
    list.push(id)
    byDepth.set(depth, list)
  }

  const positions = new Map<string, { x: number; y: number }>()
  for (const [depth, ids] of byDepth) {
    ids.sort((a, b) => (ITEMS_BY_ID.get(a)?.name ?? '').localeCompare(ITEMS_BY_ID.get(b)?.name ?? ''))
    ids.forEach((id, i) => positions.set(id, { x: depth * COL_WIDTH, y: i * ROW_HEIGHT }))
  }
  return positions
}
