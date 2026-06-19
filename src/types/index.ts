export type Category =
  | 'elements'
  | 'hardware'
  | 'architecture'
  | 'encoding'
  | 'concepts'
  | 'languages'
  | 'datastructures'
  | 'algorithms'
  | 'databases'
  | 'web'
  | 'os'
  | 'software-eng'
  | 'security'
  | 'ai-ml'
  | 'theory'
  | 'distributed'
  | 'graphics'
  | 'gamedev'
  | 'cloud'
  | 'capstone'
  | 'fun'

export type Rarity = 'common' | 'uncommon' | 'rare' | 'advanced' | 'epic' | 'legendary' | 'mythic'

export interface Item {
  id: string
  name: string
  emoji: string
  category: Category
  /** Hand-tuned by obscurity — drives the rarity color. */
  rarity: Rarity
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
