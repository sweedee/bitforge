import type { Item, Rarity } from '@/types'

/** XP awarded per discovery, by rarity — doubling per tier so rare finds feel like real progress. */
export const RARITY_XP: Record<Rarity, number> = {
  common: 10,
  uncommon: 20,
  rare: 40,
  epic: 80,
  legendary: 160,
  mythic: 320,
}

export interface LevelTier {
  title: string
  threshold: number
}

export const LEVEL_TIERS: LevelTier[] = [
  { title: 'Noob', threshold: 0 },
  { title: "Bachelor's", threshold: 2500 },
  { title: "Master's", threshold: 8000 },
  { title: 'PhD', threshold: 20000 },
  { title: 'Frontier Researcher', threshold: 40000 },
]

export function getTotalXp(discoveredItemIds: Set<string>, itemsById: Map<string, Item>): number {
  let xp = 0
  for (const id of discoveredItemIds) {
    const item = itemsById.get(id)
    if (item) xp += RARITY_XP[item.rarity]
  }
  return xp
}

export function getLevelIndex(xp: number): number {
  let index = 0
  for (let i = 0; i < LEVEL_TIERS.length; i++) {
    if (xp >= LEVEL_TIERS[i].threshold) index = i
  }
  return index
}

export function getLevelTitle(xp: number): string {
  return LEVEL_TIERS[getLevelIndex(xp)].title
}

export interface LevelProgress {
  levelIndex: number
  /** XP progress within the current level, 0-100. 100 at max level. */
  pct: number
}

export function getLevelProgress(xp: number): LevelProgress {
  const levelIndex = getLevelIndex(xp)
  const current = LEVEL_TIERS[levelIndex].threshold
  const next = LEVEL_TIERS[levelIndex + 1]?.threshold
  if (next === undefined) return { levelIndex, pct: 100 }
  return { levelIndex, pct: Math.min(100, Math.round(((xp - current) / (next - current)) * 100)) }
}
