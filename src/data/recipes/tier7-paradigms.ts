import type { Recipe } from '@/types'

export const RECIPES_TIER7_PARADIGMS: Recipe[] = [
  { inputs: ['memory-address', 'python'], result: 'variable' },
  { inputs: ['variable', 'variable'], result: 'function' },
  { inputs: ['function', 'function'], result: 'loop' },
  { inputs: ['binary', 'function'], result: 'conditional' },
  { inputs: ['function', 'loop'], result: 'recursion' },
  { inputs: ['function', 'variable'], result: 'class' },
  { inputs: ['class', 'memory-address'], result: 'object' },
  { inputs: ['class', 'class'], result: 'inheritance' },
  { inputs: ['function', 'inheritance'], result: 'polymorphism' },
  { inputs: ['inheritance', 'polymorphism'], result: 'oop' },
  { inputs: ['function', 'javascript'], result: 'lambda' },
  { inputs: ['lambda', 'variable'], result: 'closure' },
  { inputs: ['closure', 'lambda'], result: 'functional-programming' },
]
