import type { Recipe } from '@/types'

export const RECIPES_THEORY: Recipe[] = [
  { inputs: ['function', 'loop'], result: 'algorithm' },
  { inputs: ['flip-flop', 'conditional'], result: 'finite-state-machine' },
  { inputs: ['finite-state-machine', 'string'], result: 'regular-expression' },
  { inputs: ['finite-state-machine', 'memory-address'], result: 'turing-machine' },
  { inputs: ['lambda', 'recursion'], result: 'lambda-calculus' },
  { inputs: ['turing-machine', 'boolean'], result: 'computability' },
  { inputs: ['halting-problem', 'boolean'], result: 'decidability' },
  { inputs: ['turing-machine', 'recursion'], result: 'halting-problem' },
  { inputs: ['big-o-notation', 'algorithm'], result: 'complexity-class' },
  { inputs: ['complexity-class', 'greedy-algorithm'], result: 'np-complete' },
  { inputs: ['complexity-class', 'backtracking'], result: 'p-vs-np' },
  { inputs: ['bit', 'boolean'], result: 'superposition' },
]
