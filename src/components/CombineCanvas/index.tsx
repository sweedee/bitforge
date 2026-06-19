import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useDroppable } from '@dnd-kit/core'
import { useGameStore } from '@/store'
import { CanvasToken } from '@/components/CanvasToken'
import type { DropPayload } from '@/types/dnd'

export function CombineCanvas() {
  const canvasTokens = useGameStore((s) => s.canvasTokens)
  const combineTokens = useGameStore((s) => s.combineTokens)
  const removeCanvasToken = useGameStore((s) => s.removeCanvasToken)
  const lastFailedComboInstanceIds = useGameStore((s) => s.lastFailedComboInstanceIds)
  const clearFailedCombo = useGameStore((s) => s.clearFailedCombo)
  const justMergedInstanceId = useGameStore((s) => s.justMergedInstanceId)
  const clearJustMerged = useGameStore((s) => s.clearJustMerged)

  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null)

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
    <div ref={setNodeRef} data-testid="combine-canvas" className="relative flex-1 min-h-0 overflow-hidden bg-stone-950">
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
            onClick={() => handleTokenClick(token.instanceId)}
            onDelete={() => handleTokenDelete(token.instanceId)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
