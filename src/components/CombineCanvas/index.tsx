import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useDroppable } from '@dnd-kit/core'
import { useGameStore } from '@/store'
import { CanvasToken } from '@/components/CanvasToken'
import { RECIPES_BY_INPUT } from '@/data/recipes'
import { getCompatiblePartnerIds } from '@/engine/combine'
import type { DropPayload } from '@/types/dnd'

export function CombineCanvas() {
  const canvasTokens = useGameStore((s) => s.canvasTokens)
  const combineTokens = useGameStore((s) => s.combineTokens)
  const removeCanvasToken = useGameStore((s) => s.removeCanvasToken)
  const lastFailedComboInstanceIds = useGameStore((s) => s.lastFailedComboInstanceIds)
  const clearFailedCombo = useGameStore((s) => s.clearFailedCombo)
  const justMergedInstanceId = useGameStore((s) => s.justMergedInstanceId)
  const clearJustMerged = useGameStore((s) => s.clearJustMerged)
  const easyMode = useGameStore((s) => s.settings.easyMode)
  const draggingItemId = useGameStore((s) => s.draggingItemId)
  const draggingInstanceId = useGameStore((s) => s.draggingInstanceId)
  const setCanvasSize = useGameStore((s) => s.setCanvasSize)

  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setCanvasSize(width, height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [setCanvasSize])

  const compatiblePartnerIds = useMemo(() => {
    if (!easyMode || !draggingItemId) return null
    return getCompatiblePartnerIds(draggingItemId, RECIPES_BY_INPUT)
  }, [easyMode, draggingItemId])

  const dropzoneData: DropPayload = { kind: 'canvas-dropzone' }
  const { setNodeRef } = useDroppable({ id: 'canvas-dropzone', data: dropzoneData })

  useEffect(() => {
    if (!lastFailedComboInstanceIds) return
    const timer = setTimeout(clearFailedCombo, 240)
    return () => clearTimeout(timer)
  }, [lastFailedComboInstanceIds, clearFailedCombo])

  useEffect(() => {
    if (!justMergedInstanceId) return
    const timer = setTimeout(clearJustMerged, 400)
    return () => clearTimeout(timer)
  }, [justMergedInstanceId, clearJustMerged])

  function handleTokenClick(instanceId: string) {
    if (selectedInstanceId === null) {
      setSelectedInstanceId(instanceId)
      return
    }
    if (selectedInstanceId === instanceId) {
      setSelectedInstanceId(null)
      return
    }
    combineTokens(selectedInstanceId, instanceId)
    setSelectedInstanceId(null)
  }

  function handleTokenDelete(instanceId: string) {
    if (selectedInstanceId === instanceId) setSelectedInstanceId(null)
    removeCanvasToken(instanceId)
  }

  return (
    <div
      ref={(el) => {
        setNodeRef(el)
        containerRef.current = el
      }}
      data-testid="combine-canvas"
      className="relative flex-1 min-h-0 overflow-hidden bg-stone-950"
    >
      {canvasTokens.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs text-stone-600">Drag (or tap) an item from the library to bring it here</span>
        </div>
      )}
      <AnimatePresence>
        {canvasTokens.map((token) => (
          <CanvasToken
            key={token.instanceId}
            token={token}
            selected={token.instanceId === selectedInstanceId}
            shake={lastFailedComboInstanceIds?.includes(token.instanceId) ?? false}
            justMerged={token.instanceId === justMergedInstanceId}
            compatible={
              token.instanceId !== draggingInstanceId && (compatiblePartnerIds?.has(token.itemId) ?? false)
            }
            onClick={handleTokenClick}
            onDelete={handleTokenDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
