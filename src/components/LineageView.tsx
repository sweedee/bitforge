import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ReactFlow, Background, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { Item } from '@/types'
import { buildLineageGraph } from '@/engine/techtree'
import { graphToFlow } from '@/lib/graphToFlow'
import { useGameStore } from '@/store'

interface LineageViewProps {
  item: Item
  onClose: () => void
}

export function LineageView({ item, onClose }: LineageViewProps) {
  const discoveredItemIds = useGameStore((s) => s.discoveredItemIds)
  const [showConsumers, setShowConsumers] = useState(false)

  const graph = useMemo(
    () => buildLineageGraph(item.id, discoveredItemIds, showConsumers),
    [item.id, discoveredItemIds, showConsumers],
  )
  const { nodes, edges } = useMemo(() => graphToFlow(graph), [graph])

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        className="bg-stone-900 border border-stone-700 rounded-lg shadow-2xl w-full max-w-3xl h-[70vh] flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-700 shrink-0">
          <span className="text-sm font-bold tracking-widest text-stone-300 uppercase">Lineage · {item.name}</span>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs text-stone-400 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={showConsumers}
                onChange={(e) => setShowConsumers(e.target.checked)}
                className="accent-orange-500"
              />
              <span>Show what uses this</span>
            </label>
            <button onClick={onClose} className="text-stone-500 hover:text-stone-200 text-lg leading-none transition-colors">
              ×
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-0 relative">
          {nodes.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-stone-500 text-sm">No lineage data.</div>
          ) : (
            <ReactFlow
              key={showConsumers ? 'with-consumers' : 'ancestors'}
              nodes={nodes}
              edges={edges}
              fitView
              colorMode="dark"
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
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
