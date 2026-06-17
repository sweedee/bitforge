import type { Recipe } from '@/types'

export const RECIPES_TIER2_CIRCUITS: Recipe[] = [
  { inputs: ['metal', 'glass'], result: 'capacitor' },
  { inputs: ['diode', 'resistor'], result: 'binary' },
  { inputs: ['and-gate', 'not-gate'], result: 'flip-flop' },
  { inputs: ['capacitor', 'resistor'], result: 'clock' },
  { inputs: ['flip-flop', 'clock'], result: 'register' },
  { inputs: ['xor-gate', 'and-gate'], result: 'adder' },
  { inputs: ['or-gate', 'not-gate'], result: 'multiplexer' },
  { inputs: ['register', 'register'], result: 'bus' },
  { inputs: ['register', 'bus'], result: 'ram' },
]
