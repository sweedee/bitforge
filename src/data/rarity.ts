import type { Rarity } from '@/types'

export const RARITY_ORDER: Rarity[] = ['common', 'uncommon', 'rare', 'advanced', 'epic', 'legendary', 'mythic']

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  advanced: 'Advanced',
  epic: 'Epic',
  legendary: 'Legendary',
  mythic: 'Mythic',
}

export interface RarityStyle {
  /** Border + ring color classes for an item chip. */
  border: string
  /** Background tint for the chip. */
  bg: string
  /** Text color for the item name. */
  text: string
  /** Accent color (labels) — used in toast/detail surfaces. */
  accent: string
}

/**
 * Fortnite-style palette, by obscurity (not depth):
 * Common grey · Uncommon green · Rare blue · Advanced teal · Epic purple · Legendary gold · Mythic red/orange.
 * Flat design — no glow; rarity reads from border/bg/text/accent color alone.
 */
export const RARITY_STYLES: Record<Rarity, RarityStyle> = {
  common: {
    border: 'border-stone-600',
    bg: 'bg-stone-900',
    text: 'text-stone-200',
    accent: 'text-stone-400',
  },
  uncommon: {
    border: 'border-emerald-600',
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-50',
    accent: 'text-emerald-400',
  },
  rare: {
    border: 'border-sky-500',
    bg: 'bg-sky-950/40',
    text: 'text-sky-50',
    accent: 'text-sky-400',
  },
  advanced: {
    border: 'border-teal-500',
    bg: 'bg-teal-950/40',
    text: 'text-teal-50',
    accent: 'text-teal-400',
  },
  epic: {
    border: 'border-violet-500',
    bg: 'bg-violet-950/40',
    text: 'text-violet-50',
    accent: 'text-violet-400',
  },
  legendary: {
    border: 'border-amber-400',
    bg: 'bg-amber-950/40',
    text: 'text-amber-50',
    accent: 'text-amber-300',
  },
  mythic: {
    border: 'border-red-500',
    bg: 'bg-red-950/40',
    text: 'text-red-50',
    accent: 'text-red-400',
  },
}

/** Rarities at or above this rank trigger extra celebration (burst, stronger toast). */
export function rarityRank(rarity: Rarity): number {
  return RARITY_ORDER.indexOf(rarity)
}
