import type { Recipe } from '@/types'

export const RECIPES_TIER3_ARCHITECTURE: Recipe[] = [
  { inputs: ['adder', 'multiplexer'], result: 'alu' },
  { inputs: ['clock', 'register'], result: 'control-unit' },
  { inputs: ['alu', 'control-unit'], result: 'cpu' },
  { inputs: ['ram', 'ram'], result: 'cache' },
  { inputs: ['bus', 'metal'], result: 'motherboard' },
  { inputs: ['binary', 'cpu'], result: 'instruction-set' },
  { inputs: ['cpu', 'ram'], result: 'von-neumann-architecture' },
  { inputs: ['instruction-set', 'von-neumann-architecture'], result: 'computer' },
]
