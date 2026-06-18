import type { Recipe } from '@/types'

export const RECIPES_CAPSTONE: Recipe[] = [
  { inputs: ['dns', 'tcp'], result: 'the-internet' },
  { inputs: ['the-internet', 'html'], result: 'world-wide-web' },
  { inputs: ['world-wide-web', 'index'], result: 'search-engine' },
  { inputs: ['server', 'the-internet'], result: 'cloud' },
  { inputs: ['superposition', 'electricity'], result: 'qubit' },
  { inputs: ['qubit', 'cpu'], result: 'quantum-computer' },
  { inputs: ['llm', 'deep-learning'], result: 'agi' },
  { inputs: ['agi', 'quantum-computer'], result: 'singularity' },
  { inputs: ['quantum-computer', 'shors-algorithm'], result: 'quantum-supremacy' },
]
