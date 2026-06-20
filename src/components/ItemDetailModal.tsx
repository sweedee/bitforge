import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Item } from '@/types'
import { CATEGORY_LABELS } from '@/data/categories'
import { RARITY_LABELS, RARITY_STYLES } from '@/data/rarity'
import { getItemStars } from '@/engine/depth'
import { ITEMS_BY_ID } from '@/data/items'
import { RECIPE_BY_RESULT, RECIPES_BY_INPUT } from '@/data/recipes'
import { useGameStore } from '@/store'

interface ItemDetailModalProps {
  item: Item
  onClose: () => void
}

const USABLE_IN_LIMIT = 8

export const ItemDetailModal = memo(function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)

  const recipe = RECIPE_BY_RESULT.get(item.id)
  const ingredientA = recipe ? ITEMS_BY_ID.get(recipe.inputs[0]) : undefined
  const ingredientB = recipe ? ITEMS_BY_ID.get(recipe.inputs[1]) : undefined
  const rarity = RARITY_STYLES[item.rarity]
  const stars = getItemStars(item.id)

  const usableIn = useMemo(() => {
    const recipes = RECIPES_BY_INPUT.get(item.id) ?? []
    const uniqueRecipes = [...new Set(recipes)]
    return uniqueRecipes
      .filter((r) => discoveredItemIds.has(r.inputs[0] === item.id ? r.inputs[1] : r.inputs[0]) && discoveredItemIds.has(r.result))
      .map((r) => {
        const otherId = r.inputs[0] === item.id ? r.inputs[1] : r.inputs[0]
        return {
          other: ITEMS_BY_ID.get(otherId)!,
          result: ITEMS_BY_ID.get(r.result)!,
        }
      })
  }, [item.id, discoveredItemIds])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <motion.div
        className="bg-stone-900 border border-stone-700 rounded-lg shadow-2xl w-full max-w-sm overflow-hidden"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between px-5 py-3 border-b ${rarity.border}`}>
          <span className="text-xs uppercase tracking-widest text-amber-400">{CATEGORY_LABELS[item.category]}</span>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-200 text-lg leading-none transition-colors">
            ×
          </button>
        </div>
        <div className="px-5 py-5 flex flex-col items-center gap-2 text-center">
          <span className="text-4xl">{item.emoji}</span>
          <span className="text-lg font-bold text-stone-100">{item.name}</span>

          <div className="flex items-center gap-2 text-xs">
            <span className={`uppercase tracking-widest font-semibold ${rarity.accent}`}>{RARITY_LABELS[item.rarity]}</span>
            {stars > 0 && (
              <span className="text-amber-300" aria-label={`depth ${stars} of 5`}>
                {'★'.repeat(stars)}
                <span className="text-stone-600">{'☆'.repeat(5 - stars)}</span>
              </span>
            )}
          </div>
          <p className="text-sm text-stone-400">{item.description}</p>

          {ingredientA && ingredientB ? (
            <div className="mt-3 flex items-center gap-2 text-sm text-stone-300 bg-stone-800/60 border border-stone-700 rounded-lg px-3 py-2">
              <span>{ingredientA.emoji}</span>
              <span>{ingredientA.name}</span>
              <span className="text-stone-500">+</span>
              <span>{ingredientB.emoji}</span>
              <span>{ingredientB.name}</span>
            </div>
          ) : (
            <span className="mt-3 text-xs uppercase tracking-widest text-stone-500">Starting element</span>
          )}

          {usableIn.length > 0 && (
            <div className="mt-3 w-full text-left">
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">Used in</div>
              <div className="flex flex-col gap-1">
                {usableIn.slice(0, USABLE_IN_LIMIT).map(({ other, result }) => (
                  <div key={result.id} className="flex items-center gap-1.5 text-xs text-stone-300 min-w-0">
                    <span className="shrink-0">{item.emoji}</span>
                    <span className="truncate">{item.name}</span>
                    <span className="text-stone-500 shrink-0">+</span>
                    <span className="shrink-0">{other.emoji}</span>
                    <span className="truncate">{other.name}</span>
                    <span className="text-stone-500 shrink-0">→</span>
                    <span className="shrink-0">{result.emoji}</span>
                    <span className="truncate">{result.name}</span>
                  </div>
                ))}
              </div>
              {usableIn.length > USABLE_IN_LIMIT && (
                <span className="text-[11px] text-stone-500">+{usableIn.length - USABLE_IN_LIMIT} more</span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
})
