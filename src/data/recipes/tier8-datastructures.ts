import type { Recipe } from '@/types'

export const RECIPES_TIER8_DATASTRUCTURES: Recipe[] = [
  { inputs: ['memory-address', 'variable'], result: 'array' },
  { inputs: ['array', 'pointer'], result: 'linked-list' },
  { inputs: ['array', 'function'], result: 'stack' },
  { inputs: ['array', 'loop'], result: 'queue' },
  { inputs: ['linked-list', 'linked-list'], result: 'tree' },
  { inputs: ['conditional', 'tree'], result: 'binary-tree' },
  { inputs: ['tree', 'tree'], result: 'graph' },
  { inputs: ['array', 'hexadecimal'], result: 'hash-map' },
  { inputs: ['binary-tree', 'queue'], result: 'heap' },
  { inputs: ['hash-map', 'hash-map'], result: 'set' },
]
