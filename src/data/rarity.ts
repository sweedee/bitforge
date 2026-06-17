import type { Rarity } from '@/types'

export const RARITY_ORDER: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic']

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
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
  /** Accent color (labels, glow) — used in toast/detail surfaces. */
  accent: string
  /** Box-shadow glow class (stronger for higher rarities). */
  glow: string
}

/**
 * Fortnite-style palette, by obscurity (not depth):
 * Common grey · Uncommon green · Rare blue · Epic purple · Legendary gold · Mythic red/orange.
 */
export const RARITY_STYLES: Record<Rarity, RarityStyle> = {
  common: {
    border: 'border-stone-600',
    bg: 'bg-stone-900',
    text: 'text-stone-200',
    accent: 'text-stone-400',
    glow: '',
  },
  uncommon: {
    border: 'border-emerald-600',
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-50',
    accent: 'text-emerald-400',
    glow: 'shadow-[0_0_8px_-1px_rgba(16,185,129,0.5)]',
  },
  rare: {
    border: 'border-sky-500',
    bg: 'bg-sky-950/40',
    text: 'text-sky-50',
    accent: 'text-sky-400',
    glow: 'shadow-[0_0_10px_-1px_rgba(14,165,233,0.55)]',
  },
  epic: {
    border: 'border-violet-500',
    bg: 'bg-violet-950/40',
    text: 'text-violet-50',
    accent: 'text-violet-400',
    glow: 'shadow-[0_0_12px_0px_rgba(139,92,246,0.6)]',
  },
  legendary: {
    border: 'border-amber-400',
    bg: 'bg-amber-950/40',
    text: 'text-amber-50',
    accent: 'text-amber-300',
    glow: 'shadow-[0_0_16px_0px_rgba(251,191,36,0.65)]',
  },
  mythic: {
    border: 'border-red-500',
    bg: 'bg-red-950/40',
    text: 'text-red-50',
    accent: 'text-red-400',
    glow: 'shadow-[0_0_20px_2px_rgba(239,68,68,0.7)]',
  },
}

/** Rarities at or above this rank trigger extra celebration (burst, stronger toast). */
export function rarityRank(rarity: Rarity): number {
  return RARITY_ORDER.indexOf(rarity)
}
