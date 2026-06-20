import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import type { CanvasToken as CanvasTokenData } from '@/types'
import type { DragPayload, DropPayload } from '@/types/dnd'
import { ITEMS_BY_ID } from '@/data/items'
import { ItemChip } from '@/components/ItemChip'
import { useGameStore } from '@/store'

interface CanvasTokenProps {
  token: CanvasTokenData
  selected: boolean
  shake: boolean
  justMerged: boolean
  compatible?: boolean
  onClick: (instanceId: string) => void
  onDelete: (instanceId: string) => void
}

export function CanvasToken({ token, selected, shake, justMerged, compatible = false, onClick, onDelete }: CanvasTokenProps) {
  const item = ITEMS_BY_ID.get(token.itemId)
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion)
  const addCanvasToken = useGameStore((s) => s.addCanvasToken)

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

  // Touch devices can synthesize click/dblclick events right after a drag release,
  // which would otherwise spawn an unintended duplicate of the token being dropped.
  const recentlyDraggedRef = useRef(false)
  const wasDraggingRef = useRef(isDragging)
  useEffect(() => {
    if (isDragging) {
      recentlyDraggedRef.current = true
      wasDraggingRef.current = true
      return
    }
    if (!wasDraggingRef.current) return
    wasDraggingRef.current = false
    const timer = setTimeout(() => {
      recentlyDraggedRef.current = false
    }, 400)
    return () => clearTimeout(timer)
  }, [isDragging])

  if (!item) return null

  return (
    <motion.div
      ref={(el) => {
        setDragRef(el)
        setDropRef(el)
      }}
      {...attributes}
      {...listeners}
      onClick={() => onClick(token.instanceId)}
      onDoubleClick={(e) => {
        e.stopPropagation()
        if (recentlyDraggedRef.current) return
        addCanvasToken(token.itemId, token.x, token.y)
      }}
      data-testid="canvas-token"
      className={`absolute touch-none cursor-grab active:cursor-grabbing ${shake && !reducedMotion ? 'animate-shake' : ''} ${justMerged && !reducedMotion ? 'animate-merge-pop' : ''} ${isDragging ? 'opacity-0' : ''}`}
      style={{ left: `${token.x}%`, top: `${token.y}%`, x: '-50%', y: '-50%' }}
      initial={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
      animate={reducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { scale: 1.3, opacity: 0 }}
      whileTap={{ scale: 0.95 }}
      transition={reducedMotion ? { duration: 0.12 } : { type: 'spring', stiffness: 400, damping: 25 }}
    >
      <ItemChip item={item} selected={selected} highlighted={compatible} />
      <button
        type="button"
        title="Remove from canvas"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          onDelete(token.instanceId)
        }}
        className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-stone-800 border border-stone-600 text-stone-400 text-[10px] leading-none opacity-70 hover:opacity-100 hover:bg-red-900 hover:text-red-200 hover:border-red-500 transition-colors"
      >
        ×
      </button>
    </motion.div>
  )
}
