import type { Recipe } from '@/types'

export const RECIPES_LANGUAGES: Recipe[] = [
  { inputs: ['assembly-language', 'function'], result: 'c' },
  { inputs: ['c', 'c'], result: 'header-file' },
  { inputs: ['c', 'class'], result: 'cpp' },
  { inputs: ['c', 'oop'], result: 'python' },
  { inputs: ['oop', 'virtual-machine'], result: 'java' },
  { inputs: ['c', 'lambda'], result: 'javascript' },
  { inputs: ['python', 'object'], result: 'ruby' },
  { inputs: ['c', 'unix'], result: 'go' },
  { inputs: ['cpp', 'segmentation-fault'], result: 'rust' },
  { inputs: ['javascript', 'java'], result: 'typescript' },
  { inputs: ['c', 'assembly-language'], result: 'compiler' },
]
