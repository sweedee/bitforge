export type Tier =
  | 'elements'
  | 'logic'
  | 'circuits'
  | 'architecture'
  | 'lowlevel'
  | 'languages-low'
  | 'languages-high'
  | 'paradigms'
  | 'datastructures'
  | 'algorithms'
  | 'capstone'

export interface Item {
  id: string
  name: string
  emoji: string
  tier: Tier
  description: string
  isStarter?: boolean
}

export interface Recipe {
  inputs: [string, string]
  result: string
}

export interface CanvasToken {
  instanceId: string
  itemId: string
  x: number
  y: number
}
