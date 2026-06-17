import type { Recipe } from '@/types'

export const RECIPES_WEB: Recipe[] = [
  { inputs: ['data', 'binary'], result: 'packet' },
  { inputs: ['packet', 'instruction-set'], result: 'protocol' },
  { inputs: ['memory-address', 'packet'], result: 'ip-address' },
  { inputs: ['protocol', 'packet'], result: 'tcp' },
  { inputs: ['string', 'tree'], result: 'html' },
  { inputs: ['protocol', 'html'], result: 'http' },
  { inputs: ['html', 'glass'], result: 'css' },
  { inputs: ['ip-address', 'hash-map'], result: 'dns' },
  { inputs: ['http', 'function'], result: 'api' },
  { inputs: ['data', 'javascript'], result: 'json' },
  { inputs: ['api', 'http'], result: 'rest' },
  { inputs: ['html', 'http'], result: 'browser' },
  { inputs: ['computer', 'http'], result: 'server' },
  { inputs: ['computer', 'browser'], result: 'client' },
  { inputs: ['javascript', 'api'], result: 'framework' },
  { inputs: ['http', 'data'], result: 'cookie' },
]
