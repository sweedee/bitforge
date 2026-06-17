import type { Recipe } from '@/types'

export const RECIPES_TIER4_LOWLEVEL: Recipe[] = [
  { inputs: ['binary', 'electricity'], result: 'bit' },
  { inputs: ['bit', 'bit'], result: 'byte' },
  { inputs: ['byte', 'byte'], result: 'hexadecimal' },
  { inputs: ['byte', 'computer'], result: 'opcode' },
  { inputs: ['opcode', 'opcode'], result: 'machine-code' },
  { inputs: ['hexadecimal', 'opcode'], result: 'mnemonic' },
  { inputs: ['machine-code', 'mnemonic'], result: 'assembly-language' },
]
