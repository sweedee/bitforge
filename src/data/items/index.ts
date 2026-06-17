import type { Item } from '@/types'
import { ELEMENTS } from './elements'
import { HARDWARE } from './hardware'
import { ARCHITECTURE } from './architecture'
import { ENCODING } from './encoding'
import { CONCEPTS } from './concepts'
import { LANGUAGES } from './languages'
import { DATASTRUCTURES } from './datastructures'
import { ALGORITHMS } from './algorithms'
import { DATABASES } from './databases'
import { WEB } from './web'
import { OS } from './os'
import { SOFTWARE_ENG } from './software-eng'
import { SECURITY } from './security'
import { AI_ML } from './ai-ml'
import { THEORY } from './theory'
import { CAPSTONE } from './capstone'

export const ITEMS: Item[] = [
  ...ELEMENTS,
  ...HARDWARE,
  ...ARCHITECTURE,
  ...ENCODING,
  ...CONCEPTS,
  ...LANGUAGES,
  ...DATASTRUCTURES,
  ...ALGORITHMS,
  ...DATABASES,
  ...WEB,
  ...OS,
  ...SOFTWARE_ENG,
  ...SECURITY,
  ...AI_ML,
  ...THEORY,
  ...CAPSTONE,
]

export const ITEMS_BY_ID: Map<string, Item> = new Map(ITEMS.map((item) => [item.id, item]))

export const STARTER_ITEM_IDS: string[] = ITEMS.filter((item) => item.isStarter).map((item) => item.id)

if (import.meta.env.DEV) {
  const seen = new Set<string>()
  for (const item of ITEMS) {
    if (seen.has(item.id)) throw new Error(`Duplicate item id: ${item.id}`)
    seen.add(item.id)
  }
}
