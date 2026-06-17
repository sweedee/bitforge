import type { Recipe } from '@/types'

export const RECIPES_HARDWARE: Recipe[] = [
  { inputs: ['sand', 'fire'], result: 'glass' },
  { inputs: ['copper', 'metal'], result: 'wire' },
  { inputs: ['silicon', 'water'], result: 'wafer' },
  { inputs: ['wafer', 'fire'], result: 'semiconductor' },
  { inputs: ['semiconductor', 'metal'], result: 'diode' },
  { inputs: ['semiconductor', 'copper'], result: 'transistor' },
  { inputs: ['copper', 'fire'], result: 'resistor' },
  { inputs: ['metal', 'glass'], result: 'capacitor' },
  { inputs: ['transistor', 'transistor'], result: 'and-gate' },
  { inputs: ['transistor', 'diode'], result: 'or-gate' },
  { inputs: ['transistor', 'resistor'], result: 'not-gate' },
  { inputs: ['and-gate', 'or-gate'], result: 'xor-gate' },
  { inputs: ['and-gate', 'not-gate'], result: 'nand-gate' },
  { inputs: ['nand-gate', 'nand-gate'], result: 'flip-flop' },
  { inputs: ['capacitor', 'resistor'], result: 'clock' },
  { inputs: ['or-gate', 'not-gate'], result: 'multiplexer' },
  { inputs: ['xor-gate', 'and-gate'], result: 'adder' },
  { inputs: ['transistor', 'wafer'], result: 'integrated-circuit' },
]
