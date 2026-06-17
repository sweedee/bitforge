import type { Recipe } from '@/types'

export const RECIPES_DATABASES: Recipe[] = [
  { inputs: ['array', 'record'], result: 'table' },
  { inputs: ['data', 'set'], result: 'sql' },
  { inputs: ['table', 'sql'], result: 'database' },
  { inputs: ['database', 'binary-tree'], result: 'index' },
  { inputs: ['sql', 'function'], result: 'query' },
  { inputs: ['table', 'table'], result: 'join' },
  { inputs: ['database', 'boolean'], result: 'transaction' },
  { inputs: ['database', 'hash-map'], result: 'nosql' },
  { inputs: ['index', 'tree'], result: 'b-tree' },
]
