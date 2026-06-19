import type { Recipe } from '@/types'

export const RECIPES_FUN: Recipe[] = [
  { inputs: ['operating-system', 'esoteric-language'], result: 'holy-c' },
  { inputs: ['holy-c', 'kernel'], result: 'templeos' },
  { inputs: ['ai-alignment', 'game-theory'], result: 'rokos-basilisk' },
  { inputs: ['llm', 'prompt-engineering'], result: 'ai-waifu' },
  { inputs: ['heisenbug', 'container'], result: 'works-on-my-machine' },
  { inputs: ['stack-overflow', 'code-review'], result: 'ctrl-c-ctrl-v-programming' },
  { inputs: ['ctrl-c-ctrl-v-programming', 'git'], result: '10x-engineer' },
  { inputs: ['10x-engineer', 'agile'], result: 'brogrammer' },
  { inputs: ['transfer-learning', 'code-review'], result: 'resume-driven-development' },
  { inputs: ['code-review', 'technical-debt'], result: 'bikeshedding' },
  { inputs: ['bikeshedding', 'works-on-my-machine'], result: 'yak-shaving' },
  { inputs: ['gradient-descent', 'technical-debt'], result: 'premature-optimization' },
  { inputs: ['bsod', 'premature-optimization'], result: 'two-hard-things-in-cs' },
  { inputs: ['10x-engineer', 'resume-driven-development'], result: 'dunning-kruger-tech' },
]
