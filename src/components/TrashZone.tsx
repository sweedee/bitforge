import { useDroppable } from '@dnd-kit/core'
import type { DropPayload } from '@/types/dnd'

interface TrashZoneProps {
  visible: boolean
}

export function TrashZone({ visible }: TrashZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'trash-zone',
    data: { kind: 'trash' } satisfies DropPayload,
  })

  if (!visible) return null

  return (
    <div
      ref={setNodeRef}
      className={`fixed bottom-5 right-5 z-40 flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all ${
        isOver ? 'border-red-500 bg-red-900/60 scale-110' : 'border-stone-700 bg-stone-900/90'
      }`}
    >
      <span className="text-2xl">🗑️</span>
    </div>
  )
}
