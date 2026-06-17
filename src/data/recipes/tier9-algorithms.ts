import type { Recipe } from '@/types'

export const RECIPES_TIER9_ALGORITHMS: Recipe[] = [
  { inputs: ['array', 'conditional'], result: 'linear-search' },
  { inputs: ['binary-tree', 'linear-search'], result: 'binary-search' },
  { inputs: ['array', 'recursion'], result: 'sorting-algorithm' },
  { inputs: ['loop', 'sorting-algorithm'], result: 'bubble-sort' },
  { inputs: ['recursion', 'sorting-algorithm'], result: 'quicksort' },
  { inputs: ['graph', 'recursion'], result: 'depth-first-search' },
  { inputs: ['graph', 'queue'], result: 'breadth-first-search' },
  { inputs: ['breadth-first-search', 'heap'], result: 'dijkstras-algorithm' },
  { inputs: ['hash-map', 'recursion'], result: 'dynamic-programming' },
  { inputs: ['dijkstras-algorithm', 'sorting-algorithm'], result: 'greedy-algorithm' },
  { inputs: ['bubble-sort', 'quicksort'], result: 'big-o-notation' },
  { inputs: ['conditional', 'depth-first-search'], result: 'backtracking' },
]
