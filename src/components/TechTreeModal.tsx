import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ReactFlow, Background, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { ITEMS } from '@/data/items'
import { buildDiscoveredGraph, buildFocusGraph, buildFrontierGraph } from '@/engine/techtree'
import { graphToFlow } from '@/lib/graphToFlow'
import { useGameStore } from '@/store'

interface TechTreeModalProps {
  onClose: () => void
}

export function TechTreeModal({ onClose }: TechTreeModalProps) {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const [query, setQuery] = useState('')
  const [focusId, setFocusId] = useState<string | null>(null)
  const [showFullDiscovered, setShowFullDiscovered] = useState(false)

  const graph = useMemo(() => {
    if (focusId) return buildFocusGraph(focusId, discoveredItemIds)
    if (showFullDiscovered) return buildDiscoveredGraph(discoveredItemIds)
    return buildFrontierGraph(discoveredItemIds)
  }, [focusId, showFullDiscovered, discoveredItemIds])

  const { nodes, edges } = useMemo(() => graphToFlow(graph), [graph])

  const matches = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ITEMS.filter((item) => item.name.toLowerCase().includes(q)).slice(0, 8)
  }, [query])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        className="bg-stone-900 border border-stone-700 rounded-lg shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-3 border-b border-stone-700 shrink-0">
          <span className="text-sm font-bold tracking-widest text-stone-300 uppercase shrink-0">Tech Tree</span>

          <div className="relative flex-1 max-w-xs">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Focus on an item…"
              className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-700 bg-stone-950 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-orange-500"
            />
            {matches.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 z-10 rounded border border-stone-700 bg-stone-900 shadow-xl max-h-48 overflow-y-auto">
                {matches.map((item) => (
                  <button
                    key={item.id}
                    data-testid="techtree-suggestion"
                    onClick={() => {
                      setFocusId(item.id)
                      setQuery(item.name)
                    }}
                    className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-left text-xs text-stone-300 hover:bg-stone-800 transition-colors"
                  >
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {focusId ? (
            <button
              onClick={() => {
                setFocusId(null)
                setQuery('')
              }}
              className="text-xs px-2 py-1 rounded border border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500 transition-colors shrink-0"
            >
              ← Frontier
            </button>
          ) : (
            <label className="flex items-center gap-1.5 text-xs text-stone-400 select-none cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={showFullDiscovered}
                onChange={(e) => setShowFullDiscovered(e.target.checked)}
                className="accent-orange-500"
              />
              <span>Full discovered tree</span>
            </label>
          )}

          <button onClick={onClose} className="text-stone-500 hover:text-stone-200 text-lg leading-none transition-colors shrink-0">
            ×
          </button>
        </div>

        <div className="flex-1 min-h-0 relative">
          {nodes.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-stone-500 text-sm">
              {focusId ? 'No known relationships for this item.' : 'Everything reachable has been discovered!'}
            </div>
          ) : (
            <ReactFlow
              key={focusId ?? (showFullDiscovered ? 'full' : 'frontier')}
              nodes={nodes}
              edges={edges}
              fitView
              colorMode="dark"
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              onNodeClick={(_, node) => setFocusId(node.id)}
            >
              <Background color="#44403c" />
              <Controls showInteractive={false} />
            </ReactFlow>
          )}
        </div>
      </motion.div>
    </div>
  )
}
