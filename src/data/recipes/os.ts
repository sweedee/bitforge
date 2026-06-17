import type { Recipe } from '@/types'

export const RECIPES_OS: Recipe[] = [
  { inputs: ['c', 'computer'], result: 'unix' },
  { inputs: ['cpu', 'machine-code'], result: 'process' },
  { inputs: ['process', 'clock'], result: 'thread' },
  { inputs: ['process', 'queue'], result: 'scheduler' },
  { inputs: ['data', 'tree'], result: 'file-system' },
  { inputs: ['data', 'file-system'], result: 'file' },
  { inputs: ['process', 'memory-address'], result: 'kernel' },
  { inputs: ['kernel', 'scheduler'], result: 'operating-system' },
  { inputs: ['memory-address', 'cache'], result: 'virtual-memory' },
  { inputs: ['thread', 'boolean'], result: 'mutex' },
  { inputs: ['mutex', 'mutex'], result: 'deadlock' },
  { inputs: ['unix', 'string'], result: 'shell' },
]
