import type { Recipe } from '@/types'

export const RECIPES_DATASTRUCTURES: Recipe[] = [
  { inputs: ['variable', 'loop'], result: 'array' },
  { inputs: ['array', 'pointer'], result: 'linked-list' },
  { inputs: ['array', 'function'], result: 'stack' },
  { inputs: ['linked-list', 'pointer'], result: 'queue' },
  { inputs: ['array', 'array'], result: 'matrix' },
  { inputs: ['linked-list', 'linked-list'], result: 'tree' },
  { inputs: ['tree', 'boolean'], result: 'binary-tree' },
  { inputs: ['binary-tree', 'array'], result: 'heap' },
  { inputs: ['tree', 'tree'], result: 'graph' },
  { inputs: ['array', 'hexadecimal'], result: 'hash-map' },
  { inputs: ['hash-map', 'boolean'], result: 'set' },
  { inputs: ['tree', 'char'], result: 'trie' },
  { inputs: ['queue', 'heap'], result: 'priority-queue' },
]
