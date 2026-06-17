import type { Recipe } from '@/types'

export const RECIPES_TIER5_LANGUAGES_LOW: Recipe[] = [
  { inputs: ['assembly-language', 'computer'], result: 'c' },
  { inputs: ['byte', 'ram'], result: 'memory-address' },
  { inputs: ['c', 'memory-address'], result: 'pointer' },
  { inputs: ['pointer', 'pointer'], result: 'null-pointer' },
  { inputs: ['null-pointer', 'pointer'], result: 'segmentation-fault' },
  { inputs: ['c', 'c'], result: 'header-file' },
  { inputs: ['c', 'computer'], result: 'unix' },
]
