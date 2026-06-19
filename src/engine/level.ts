export interface LevelTier {
  title: string
  threshold: number
}

export const LEVEL_TIERS: LevelTier[] = [
  { title: 'Noob', threshold: 0 },
  { title: "Bachelor's", threshold: 50 },
  { title: "Master's", threshold: 150 },
  { title: 'PhD', threshold: 400 },
  { title: 'Frontier Researcher', threshold: 750 },
]

export function getLevelIndex(discoveredCount: number): number {
  let index = 0
  for (let i = 0; i < LEVEL_TIERS.length; i++) {
    if (discoveredCount >= LEVEL_TIERS[i].threshold) index = i
  }
  return index
}

export function getLevelTitle(discoveredCount: number): string {
  return LEVEL_TIERS[getLevelIndex(discoveredCount)].title
}
