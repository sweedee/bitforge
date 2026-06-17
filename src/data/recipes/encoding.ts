import type { Recipe } from '@/types'

export const RECIPES_ENCODING: Recipe[] = [
  { inputs: ['flip-flop', 'electricity'], result: 'bit' },
  { inputs: ['bit', 'bit'], result: 'byte' },
  { inputs: ['bit', 'adder'], result: 'binary' },
  { inputs: ['byte', 'byte'], result: 'hexadecimal' },
  { inputs: ['byte', 'register'], result: 'word' },
  { inputs: ['byte', 'binary'], result: 'ascii' },
  { inputs: ['ascii', 'byte'], result: 'char' },
  { inputs: ['char', 'char'], result: 'string' },
  { inputs: ['byte', 'ram'], result: 'data' },
  { inputs: ['byte', 'control-unit'], result: 'opcode' },
  { inputs: ['opcode', 'binary'], result: 'machine-code' },
  { inputs: ['opcode', 'char'], result: 'mnemonic' },
  { inputs: ['machine-code', 'mnemonic'], result: 'assembly-language' },
  { inputs: ['ram', 'binary'], result: 'memory-address' },
  { inputs: ['assembly-language', 'byte'], result: 'bytecode' },
]
