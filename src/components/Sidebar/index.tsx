import { useMemo, useRef, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useVirtualizer } from '@tanstack/react-virtual'
import { AnimatePresence } from 'framer-motion'
import type { Item, Category } from '@/types'
import type { DragPayload } from '@/types/dnd'
import { ITEMS, ITEMS_BY_ID } from '@/data/items'
import { RECIPES_BY_INPUT } from '@/data/recipes'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/data/categories'
import { isItemExhausted } from '@/engine/combine'
import { computeGridPositions } from '@/lib/gridLayout'
import { useGameStore } from '@/store'
import { sounds } from '@/sound'
import { ItemChip } from '@/components/ItemChip'
import { ConfirmBulkAddModal } from '@/components/ConfirmBulkAddModal'

const ITEMS_PER_ROW = 3
const BULK_ADD_WARNING_THRESHOLD = 18
const BULK_ADD_CAPPED_COUNT = 50

function randomCoord(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
  return chunks
}

function DraggableSidebarItem({
  item,
  highlighted,
  exhausted,
  onTap,
}: {
  item: Item
  highlighted: boolean
  exhausted: boolean
  onTap: () => void
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar:${item.id}`,
    data: { kind: 'sidebar', itemId: item.id } satisfies DragPayload,
  })

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      data-testid="sidebar-item"
      onClick={onTap}
      className={`relative touch-pan-y cursor-grab active:cursor-grabbing active:scale-95 transition-transform ${isDragging ? 'opacity-0' : ''}`}
    >
      <ItemChip item={item} highlighted={highlighted} dim={exhausted} />
    </button>
  )
}

type SidebarRow = { kind: 'header'; key: string; label: string } | { kind: 'items'; key: string; items: Item[] }

export function Sidebar() {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const highlightedItemIds = useGameStore((s) => s.highlightedItemIds)
  const addCanvasToken = useGameStore((s) => s.addCanvasToken)

  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all')
  const [hideExhausted, setHideExhausted] = useState(false)
  const [sortAlpha, setSortAlpha] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  const isFullyDiscovered = discoveredItemIds.size === ITEMS.length

  const exhaustedIds = useMemo(() => {
    const set = new Set<string>()
    if (isFullyDiscovered) return set
    for (const id of discoveredItemIds) {
      if (isItemExhausted(id, discoveredItemIds, RECIPES_BY_INPUT)) set.add(id)
    }
    return set
  }, [discoveredItemIds, isFullyDiscovered])

  const filteredItems = useMemo(() => {
    const list = [...discoveredItemIds].map((id) => ITEMS_BY_ID.get(id)!).filter(Boolean)
    return list
      .filter((item) => categoryFilter === 'all' || item.category === categoryFilter)
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .filter((item) => !hideExhausted || !exhaustedIds.has(item.id) || highlightedItemIds.includes(item.id))
  }, [discoveredItemIds, categoryFilter, query, hideExhausted, exhaustedIds, highlightedItemIds])

  const groups = useMemo(() => {
    if (sortAlpha) {
      const byLetter = new Map<string, Item[]>()
      for (const item of filteredItems) {
        const firstChar = item.name[0]
        const letter = firstChar && /[A-Za-z]/.test(firstChar) ? firstChar.toUpperCase() : '#'
        const group = byLetter.get(letter) ?? []
        group.push(item)
        byLetter.set(letter, group)
      }
      for (const group of byLetter.values()) group.sort((a, b) => a.name.localeCompare(b.name))
      return [...byLetter.keys()]
        .sort((a, b) => a.localeCompare(b))
        .map((letter) => ({ key: letter, label: letter, items: byLetter.get(letter)! }))
    }
    const byCategory = new Map<Category, Item[]>()
    for (const item of filteredItems) {
      const group = byCategory.get(item.category) ?? []
      group.push(item)
      byCategory.set(item.category, group)
    }
    for (const group of byCategory.values()) group.sort((a, b) => a.name.localeCompare(b.name))
    return CATEGORY_ORDER.filter((category) => byCategory.has(category)).map((category) => ({
      key: category,
      label: CATEGORY_LABELS[category],
      items: byCategory.get(category)!,
    }))
  }, [filteredItems, sortAlpha])

  const rows = useMemo(() => {
    const flat: SidebarRow[] = []
    for (const group of groups) {
      flat.push({ kind: 'header', key: `header:${group.key}`, label: group.label })
      for (const [i, itemsChunk] of chunk(group.items, ITEMS_PER_ROW).entries()) {
        flat.push({ kind: 'items', key: `items:${group.key}:${i}`, items: itemsChunk })
      }
    }
    return flat
  }, [groups])

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) => (rows[index]?.kind === 'header' ? 24 : 40),
    overscan: 10,
  })

  const availableCategories = useMemo(() => {
    const set = new Set<Category>()
    for (const id of discoveredItemIds) {
      const item = ITEMS_BY_ID.get(id)
      if (item) set.add(item.category)
    }
    return [...set]
  }, [discoveredItemIds])

  const [pendingBulkAddCount, setPendingBulkAddCount] = useState<number | null>(null)

  function addItems(items: Item[]) {
    const positions = computeGridPositions(items.length)
    items.forEach((item, i) => addCanvasToken(item.id, positions[i]!.x, positions[i]!.y, { silent: true }))
    if (items.length > 0) sounds.place()
  }

  function handleAddAll() {
    const visibleItems = groups.flatMap((g) => g.items)
    if (visibleItems.length > BULK_ADD_WARNING_THRESHOLD) {
      setPendingBulkAddCount(visibleItems.length)
      return
    }
    addItems(visibleItems)
  }

  function handleConfirmAddAll() {
    addItems(groups.flatMap((g) => g.items))
    setPendingBulkAddCount(null)
  }

  function handleConfirmAddCapped() {
    addItems(groups.flatMap((g) => g.items).slice(0, BULK_ADD_CAPPED_COUNT))
    setPendingBulkAddCount(null)
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-2 border-b border-stone-800 shrink-0 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="flex-1 min-w-0 px-2.5 py-1.5 text-sm rounded border border-stone-700 bg-stone-900 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as Category | 'all')}
            className="w-32 shrink-0 pl-1.5 pr-4 py-1.5 text-xs rounded border border-stone-700 bg-stone-900 text-stone-200 focus:outline-none focus:border-stone-400 truncate"
          >
            <option value="all">All domains</option>
            {CATEGORY_ORDER.filter((category) => availableCategories.includes(category)).map((category) => (
              <option key={category} value={category}>
                {CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-2">
          <label className="flex items-center gap-1.5 text-xs text-stone-400 select-none cursor-pointer min-w-0">
            <input
              type="checkbox"
              checked={hideExhausted}
              onChange={(e) => setHideExhausted(e.target.checked)}
              className="accent-stone-400 shrink-0"
            />
            <span className="truncate">Hide fully explored</span>
          </label>
          <label className="flex items-center gap-1.5 text-xs text-stone-400 select-none cursor-pointer min-w-0 shrink-0">
            <input
              type="checkbox"
              checked={sortAlpha}
              onChange={(e) => setSortAlpha(e.target.checked)}
              className="accent-stone-400 shrink-0"
            />
            <span className="truncate">A–Z</span>
          </label>
          <button
            onClick={handleAddAll}
            className="px-2 py-1 text-xs rounded border border-stone-700 text-stone-300 hover:border-amber-600 hover:text-amber-300 transition-colors shrink-0"
          >
            Add all
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2.5">
        <div style={{ position: 'relative', height: virtualizer.getTotalSize() }}>
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index]!
            return (
              <div
                key={row.key}
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, transform: `translateY(${virtualRow.start}px)` }}
              >
                {row.kind === 'header' ? (
                  <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5 mt-1">{row.label}</div>
                ) : (
                  <div className="flex flex-wrap gap-2 content-start pb-2">
                    {row.items.map((item) => (
                      <DraggableSidebarItem
                        key={item.id}
                        item={item}
                        highlighted={highlightedItemIds.includes(item.id)}
                        exhausted={exhaustedIds.has(item.id)}
                        onTap={() => addCanvasToken(item.id, randomCoord(25, 75), randomCoord(30, 70))}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {pendingBulkAddCount !== null && (
          <ConfirmBulkAddModal
            count={pendingBulkAddCount}
            cappedCount={BULK_ADD_CAPPED_COUNT}
            onCancel={() => setPendingBulkAddCount(null)}
            onAddCapped={handleConfirmAddCapped}
            onAddAll={handleConfirmAddAll}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
