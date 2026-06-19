import { memo } from 'react'
import type { Item } from '@/types'
import { RARITY_STYLES } from '@/data/rarity'

interface ItemChipProps {
  item: Item
  selected?: boolean
  highlighted?: boolean
  dim?: boolean
  size?: 'sm' | 'md'
}

export const ItemChip = memo(function ItemChip({ item, selected = false, highlighted = false, dim = false, size = 'md' }: ItemChipProps) {
  const padding = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
  const rarity = RARITY_STYLES[item.rarity]

  // Rarity styling is the base; selection/hint states override the border color.
  const stateClasses = selected
    ? 'border-orange-400 bg-orange-950/60 text-orange-200'
    : highlighted
      ? 'border-orange-500 bg-orange-900/30 text-orange-300 animate-pulse'
      : `${rarity.border} ${rarity.bg} ${rarity.text}`

  return (
    <div
      className={`relative flex items-center gap-1.5 rounded-lg border whitespace-nowrap font-mono select-none transition-colors ${padding} ${stateClasses} ${
        dim ? 'opacity-40' : ''
      }`}
    >
      <span className="text-base leading-none">{item.emoji}</span>
      <span className="font-semibold">{item.name}</span>
    </div>
  )
})
