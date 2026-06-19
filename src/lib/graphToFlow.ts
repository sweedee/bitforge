import type { Node, Edge } from '@xyflow/react'
import { ITEMS_BY_ID } from '@/data/items'
import { layoutNodes, type TechTreeGraph } from '@/engine/techtree'

export function graphToFlow(graph: TechTreeGraph): { nodes: Node[]; edges: Edge[] } {
  const positions = layoutNodes(graph.nodes.map((n) => n.id))
  const nodes: Node[] = graph.nodes.map((n) => {
    const item = ITEMS_BY_ID.get(n.id)
    const pos = positions.get(n.id) ?? { x: 0, y: 0 }
    return {
      id: n.id,
      position: pos,
      data: { label: item ? `${item.emoji} ${item.name}` : n.id },
      style: {
        background: n.locked ? '#1c1917' : '#292524',
        color: n.locked ? '#78716c' : '#e7e5e4',
        border: n.locked ? '1px dashed #57534e' : '1px solid #d97706',
        borderRadius: 8,
        padding: '6px 10px',
        fontSize: 12,
        fontFamily: 'inherit',
        width: 'auto',
      },
    }
  })
  const edges: Edge[] = graph.edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    type: 'smoothstep',
    pathOptions: { borderRadius: 2 },
    animated: !e.locked,
    style: { stroke: e.locked ? '#57534e' : '#d97706', strokeDasharray: e.locked ? '4 4' : undefined },
  }))
  return { nodes, edges }
}
