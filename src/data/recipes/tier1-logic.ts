import type { Recipe } from '@/types'

export const RECIPES_TIER1_LOGIC: Recipe[] = [
  { inputs: ['sand', 'fire'], result: 'glass' },
  { inputs: ['silicon', 'metal'], result: 'diode' },
  { inputs: ['silicon', 'copper'], result: 'transistor' },
  { inputs: ['copper', 'fire'], result: 'resistor' },
  { inputs: ['transistor', 'transistor'], result: 'and-gate' },
  { inputs: ['transistor', 'diode'], result: 'or-gate' },
  { inputs: ['transistor', 'resistor'], result: 'not-gate' },
  { inputs: ['and-gate', 'or-gate'], result: 'xor-gate' },
]
