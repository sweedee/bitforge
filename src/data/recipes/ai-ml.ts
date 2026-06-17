import type { Recipe } from '@/types'

export const RECIPES_AI_ML: Recipe[] = [
  { inputs: ['data', 'array'], result: 'dataset' },
  { inputs: ['dataset', 'function'], result: 'model' },
  { inputs: ['model', 'matrix'], result: 'weights' },
  { inputs: ['function', 'weights'], result: 'neuron' },
  { inputs: ['model', 'greedy-algorithm'], result: 'gradient-descent' },
  { inputs: ['model', 'gradient-descent'], result: 'training' },
  { inputs: ['neuron', 'graph'], result: 'neural-network' },
  { inputs: ['neural-network', 'training'], result: 'deep-learning' },
  { inputs: ['gradient-descent', 'neural-network'], result: 'backpropagation' },
  { inputs: ['neural-network', 'matrix'], result: 'cnn' },
  { inputs: ['neural-network', 'weights'], result: 'attention' },
  { inputs: ['attention', 'deep-learning'], result: 'transformer' },
  { inputs: ['transformer', 'dataset'], result: 'llm' },
  { inputs: ['model', 'string'], result: 'embedding' },
  { inputs: ['training', 'training'], result: 'overfitting' },
  { inputs: ['dataset', 'string'], result: 'tokenizer' },
  { inputs: ['model', 'backtracking'], result: 'reinforcement-learning' },
]
