import type { Recipe } from '@/types'

export const RECIPES_SOFTWARE_ENG: Recipe[] = [
  { inputs: ['function', 'segmentation-fault'], result: 'bug' },
  { inputs: ['file-system', 'tree'], result: 'git' },
  { inputs: ['git', 'file'], result: 'commit' },
  { inputs: ['git', 'tree'], result: 'branch' },
  { inputs: ['branch', 'branch'], result: 'merge-conflict' },
  { inputs: ['git', 'file-system'], result: 'repository' },
  { inputs: ['function', 'boolean'], result: 'test' },
  { inputs: ['process', 'exception'], result: 'debugger' },
  { inputs: ['bug', 'test'], result: 'refactoring' },
  { inputs: ['oop', 'class'], result: 'design-pattern' },
  { inputs: ['test', 'repository'], result: 'ci-cd' },
  { inputs: ['ci-cd', 'loop'], result: 'agile' },
  { inputs: ['repository', 'bug'], result: 'code-review' },
  { inputs: ['function', 'string'], result: 'documentation' },
  { inputs: ['bug', 'bug'], result: 'technical-debt' },
  { inputs: ['recursion', 'stack'], result: 'stack-overflow' },
]
