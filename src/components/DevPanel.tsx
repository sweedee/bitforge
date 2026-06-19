import { useMemo, useState } from 'react'
import { ITEMS } from '@/data/items'
import { useGameStore } from '@/store'

export function DevPanel() {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const discoverItem = useGameStore((s) => s.discoverItem)
  const unlockAllItems = useGameStore((s) => s.unlockAllItems)
  const resetProgress = useGameStore((s) => s.resetProgress)

  const [open, setOpen] = useState(true)
  const [query, setQuery] = useState('')

  const matches = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ITEMS.filter((item) => item.name.toLowerCase().includes(q))
      .slice(0, 8)
      .map((item) => ({ ...item, known: discoveredItemIds.has(item.id) }))
  }, [query, discoveredItemIds])

  function handleResetProgress() {
    if (!window.confirm('Reset all progress (discoveries, achievements, stats)?')) return
    resetProgress()
  }

  return (
    <div className="fixed bottom-3 left-3 z-[60] w-64 rounded border-2 border-red-700 bg-stone-950 shadow-2xl font-mono text-xs">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-2.5 py-1.5 text-red-400 hover:bg-red-950/40 transition-colors"
      >
        <span>🛠 DEV MODE</span>
        <span>{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="p-2.5 space-y-2 border-t border-red-900">
          <div className="text-stone-500">
            {discoveredItemIds.size}/{ITEMS.length} discovered
          </div>
          <button
            onClick={unlockAllItems}
            className="w-full px-2 py-1 rounded border border-stone-700 text-stone-300 hover:border-orange-500 hover:text-orange-300 transition-colors"
          >
            Unlock all items
          </button>
          <button
            onClick={handleResetProgress}
            className="w-full px-2 py-1 rounded border border-stone-700 text-stone-300 hover:border-red-500 hover:text-red-300 transition-colors"
          >
            Reset all progress
          </button>
          <div className="space-y-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Jump to item…"
              className="w-full px-2 py-1 rounded border border-stone-700 bg-stone-900 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-orange-500"
            />
            {matches.length > 0 && (
              <div className="max-h-40 overflow-y-auto space-y-0.5">
                {matches.map((item) => (
                  <button
                    key={item.id}
                    disabled={item.known}
                    onClick={() => discoverItem(item.id)}
                    className="w-full flex items-center justify-between px-1.5 py-1 rounded text-left text-stone-300 hover:bg-stone-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                  >
                    <span className="truncate">
                      {item.emoji} {item.name}
                    </span>
                    {item.known && <span className="text-emerald-600 shrink-0">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
