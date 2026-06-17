import type { Recipe } from '@/types'

export const RECIPES_TIER6_LANGUAGES_HIGH: Recipe[] = [
  { inputs: ['c', 'unix'], result: 'python' },
  { inputs: ['c', 'header-file'], result: 'html' },
  { inputs: ['html', 'html'], result: 'css' },
  { inputs: ['c', 'html'], result: 'javascript' },
  { inputs: ['c', 'segmentation-fault'], result: 'java' },
  { inputs: ['null-pointer', 'segmentation-fault'], result: 'rust' },
  { inputs: ['java', 'unix'], result: 'go' },
  { inputs: ['javascript', 'python'], result: 'ruby' },
  { inputs: ['c', 'ram'], result: 'sql' },
  { inputs: ['java', 'javascript'], result: 'typescript' },
]
