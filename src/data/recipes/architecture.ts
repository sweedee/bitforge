import type { Recipe } from '@/types'

export const RECIPES_ARCHITECTURE: Recipe[] = [
  { inputs: ['flip-flop', 'clock'], result: 'register' },
  { inputs: ['wire', 'register'], result: 'bus' },
  { inputs: ['flip-flop', 'bus'], result: 'ram' },
  { inputs: ['ram', 'register'], result: 'cache' },
  { inputs: ['adder', 'multiplexer'], result: 'alu' },
  { inputs: ['clock', 'register'], result: 'control-unit' },
  { inputs: ['alu', 'control-unit'], result: 'cpu' },
  { inputs: ['bus', 'integrated-circuit'], result: 'motherboard' },
  { inputs: ['cpu', 'opcode'], result: 'instruction-set' },
  { inputs: ['cpu', 'ram'], result: 'von-neumann-architecture' },
  { inputs: ['cpu', 'motherboard'], result: 'computer' },
  { inputs: ['bytecode', 'cpu'], result: 'virtual-machine' },
]
