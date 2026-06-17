import type { Item } from '@/types'
import { TIER0_ELEMENTS } from './tier0-elements'
import { TIER1_LOGIC } from './tier1-logic'
import { TIER2_CIRCUITS } from './tier2-circuits'
import { TIER3_ARCHITECTURE } from './tier3-architecture'
import { TIER4_LOWLEVEL } from './tier4-lowlevel'
import { TIER5_LANGUAGES_LOW } from './tier5-languages-low'
import { TIER6_LANGUAGES_HIGH } from './tier6-languages-high'
import { TIER7_PARADIGMS } from './tier7-paradigms'
import { TIER8_DATASTRUCTURES } from './tier8-datastructures'
import { TIER9_ALGORITHMS } from './tier9-algorithms'
import { TIER10_CAPSTONE } from './tier10-capstone'

export const ITEMS: Item[] = [
  ...TIER0_ELEMENTS,
  ...TIER1_LOGIC,
  ...TIER2_CIRCUITS,
  ...TIER3_ARCHITECTURE,
  ...TIER4_LOWLEVEL,
  ...TIER5_LANGUAGES_LOW,
  ...TIER6_LANGUAGES_HIGH,
  ...TIER7_PARADIGMS,
  ...TIER8_DATASTRUCTURES,
  ...TIER9_ALGORITHMS,
  ...TIER10_CAPSTONE,
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
