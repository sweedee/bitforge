import type { Recipe } from '@/types'

export const RECIPES_TIER10_CAPSTONE: Recipe[] = [
  { inputs: ['assembly-language', 'python'], result: 'compiler' },
  { inputs: ['compiler', 'ram'], result: 'operating-system' },
  { inputs: ['hash-map', 'operating-system'], result: 'database' },
  { inputs: ['database', 'linked-list'], result: 'git' },
  { inputs: ['git', 'git'], result: 'merge-conflict' },
  { inputs: ['operating-system', 'operating-system'], result: 'the-internet' },
  { inputs: ['html', 'the-internet'], result: 'world-wide-web' },
  { inputs: ['hash-map', 'world-wide-web'], result: 'search-engine' },
  { inputs: ['search-engine', 'segmentation-fault'], result: 'stack-overflow' },
  { inputs: ['array', 'dynamic-programming'], result: 'neural-network' },
  { inputs: ['backtracking', 'binary'], result: 'turing-machine' },
  { inputs: ['neural-network', 'turing-machine'], result: 'quantum-computer' },
  { inputs: ['neural-network', 'the-internet'], result: 'agi' },
]
