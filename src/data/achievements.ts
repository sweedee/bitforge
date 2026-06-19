import type { Category, Rarity } from '@/types'
import { ITEMS, ITEMS_BY_ID } from '@/data/items'
import { LEVEL_TIERS } from '@/engine/level'

export interface AchievementContext {
  discoveredItemIds: Set<string>
  stats: {
    longestDiscoveryStreak: number
    currentDiscoveryStreak: number
    totalAttempts: number
    totalSuccesses: number
  }
}

export interface Achievement {
  id: string
  name: string
  description: string
  emoji: string
  check: (ctx: AchievementContext) => boolean
}

const ITEMS_PER_CATEGORY = new Map<Category, number>()
for (const item of ITEMS) {
  ITEMS_PER_CATEGORY.set(item.category, (ITEMS_PER_CATEGORY.get(item.category) ?? 0) + 1)
}

function isCategoryComplete(category: Category, discoveredItemIds: Set<string>): boolean {
  const total = ITEMS_PER_CATEGORY.get(category) ?? 0
  if (total === 0) return false
  let count = 0
  for (const item of ITEMS) {
    if (item.category === category && discoveredItemIds.has(item.id)) count++
  }
  return count >= total
}

function hasDiscoveredRarity(discoveredItemIds: Set<string>, rarity: Rarity): boolean {
  for (const id of discoveredItemIds) {
    if (ITEMS_BY_ID.get(id)?.rarity === rarity) return true
  }
  return false
}

function countDiscoveredMilestones(discoveredItemIds: Set<string>): number {
  let count = 0
  for (const id of discoveredItemIds) {
    if (ITEMS_BY_ID.get(id)?.milestone !== undefined) count++
  }
  return count
}

const levelAchievements: Achievement[] = LEVEL_TIERS.slice(1).map((tier) => ({
  id: `level-${tier.title.toLowerCase().replace(/[^a-z]/g, '')}`,
  name: `Reached ${tier.title}`,
  description: `Discover ${tier.threshold}+ items to reach the ${tier.title} title.`,
  emoji: '🎓',
  check: (ctx) => ctx.discoveredItemIds.size >= tier.threshold,
}))

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-discovery',
    name: 'First Discovery',
    description: 'Make your first discovery.',
    emoji: '🎉',
    check: (ctx) => ctx.discoveredItemIds.size >= 1,
  },
  {
    id: 'streak-3',
    name: 'On a Roll',
    description: '3 new discoveries in a row.',
    emoji: '🔥',
    check: (ctx) => ctx.stats.longestDiscoveryStreak >= 3,
  },
  {
    id: 'streak-10',
    name: 'Unstoppable',
    description: '10 new discoveries in a row.',
    emoji: '🔥',
    check: (ctx) => ctx.stats.longestDiscoveryStreak >= 10,
  },
  ...levelAchievements,
  {
    id: 'discoveries-100',
    name: 'Centurion',
    description: 'Discover 100 items.',
    emoji: '💯',
    check: (ctx) => ctx.discoveredItemIds.size >= 100,
  },
  {
    id: 'discoveries-250',
    name: 'Collector',
    description: 'Discover 250 items.',
    emoji: '🗃️',
    check: (ctx) => ctx.discoveredItemIds.size >= 250,
  },
  {
    id: 'discoveries-500',
    name: 'Archivist',
    description: 'Discover 500 items.',
    emoji: '🏛️',
    check: (ctx) => ctx.discoveredItemIds.size >= 500,
  },
  {
    id: 'domain-datastructures',
    name: 'Data Structures Mastered',
    description: 'Discover every item in the Data Structures domain.',
    emoji: '🌳',
    check: (ctx) => isCategoryComplete('datastructures', ctx.discoveredItemIds),
  },
  {
    id: 'domain-algorithms',
    name: 'Algorithms Mastered',
    description: 'Discover every item in the Algorithms domain.',
    emoji: '⚡',
    check: (ctx) => isCategoryComplete('algorithms', ctx.discoveredItemIds),
  },
  {
    id: 'domain-languages',
    name: 'Polyglot',
    description: 'Discover every item in the Languages domain.',
    emoji: '🗣️',
    check: (ctx) => isCategoryComplete('languages', ctx.discoveredItemIds),
  },
  {
    id: 'mythic-find',
    name: 'Mythic Find',
    description: 'Discover a mythic-rarity item.',
    emoji: '💎',
    check: (ctx) => hasDiscoveredRarity(ctx.discoveredItemIds, 'mythic'),
  },
  {
    id: 'time-traveler',
    name: 'Time Traveler',
    description: 'Discover 3 historical milestone items.',
    emoji: '🕰️',
    check: (ctx) => countDiscoveredMilestones(ctx.discoveredItemIds) >= 3,
  },
]
