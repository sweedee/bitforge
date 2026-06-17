import { motion } from 'framer-motion'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import type { CanvasToken as CanvasTokenData } from '@/types'
import type { DragPayload, DropPayload } from '@/types/dnd'
import { ITEMS_BY_ID } from '@/data/items'
import { ItemChip } from '@/components/ItemChip'

interface CanvasTokenProps {
  token: CanvasTokenData
  selected: boolean
  shake: boolean
  onClick: () => void
}

export function CanvasToken({ token, selected, shake, onClick }: CanvasTokenProps) {
  const item = ITEMS_BY_ID.get(token.itemId)

  const dragData: DragPayload = { kind: 'canvas-token', instanceId: token.instanceId, itemId: token.itemId, x: token.x, y: token.y }
  const dropData: DropPayload = { kind: 'canvas-token', instanceId: token.instanceId, itemId: token.itemId, x: token.x, y: token.y }

  const { attributes, listeners, setNodeRef: setDragRef, isDragging } = useDraggable({
    id: `canvas:${token.instanceId}`,
    data: dragData,
  })
  const { setNodeRef: setDropRef } = useDroppable({
    id: `canvas:${token.instanceId}`,
    data: dropData,
  })

  if (!item) return null

  return (
    <motion.button
      ref={(el) => {
        setDragRef(el)
        setDropRef(el)
      }}
      {...attributes}
      {...listeners}
      onClick={onClick}
      data-testid="canvas-token"
      className={`absolute touch-none cursor-grab active:cursor-grabbing ${shake ? 'animate-shake' : ''} ${isDragging ? 'opacity-0' : ''}`}
      style={{ left: `${token.x}%`, top: `${token.y}%`, x: '-50%', y: '-50%' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <ItemChip item={item} selected={selected} />
    </motion.button>
  )
}
