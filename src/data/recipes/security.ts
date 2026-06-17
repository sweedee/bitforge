import type { Recipe } from '@/types'

export const RECIPES_SECURITY: Recipe[] = [
  { inputs: ['function', 'binary'], result: 'hash' },
  { inputs: ['hexadecimal', 'binary'], result: 'key' },
  { inputs: ['key', 'string'], result: 'cipher' },
  { inputs: ['cipher', 'key'], result: 'encryption' },
  { inputs: ['key', 'key'], result: 'public-key' },
  { inputs: ['hash', 'hash'], result: 'hash-collision' },
  { inputs: ['string', 'hash'], result: 'password' },
  { inputs: ['password', 'hash'], result: 'authentication' },
  { inputs: ['server', 'boolean'], result: 'firewall' },
  { inputs: ['encryption', 'protocol'], result: 'tls' },
  { inputs: ['encryption', 'tcp'], result: 'vpn' },
  { inputs: ['bug', 'segmentation-fault'], result: 'exploit' },
  { inputs: ['exploit', 'machine-code'], result: 'malware' },
  { inputs: ['hash', 'linked-list'], result: 'blockchain' },
  { inputs: ['public-key', 'hash'], result: 'digital-signature' },
]
