import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { CombineCanvas } from '@/components/CombineCanvas'
import { ItemChip } from '@/components/ItemChip'
import { JournalModal } from '@/components/JournalModal'
import { StatsModal } from '@/components/StatsModal'
import { HistoryModal } from '@/components/HistoryModal'
import { TrashZone } from '@/components/TrashZone'
import { ToastHost } from '@/components/ToastHost'
import { MilestoneBurst } from '@/components/MilestoneBurst'
import { CompletionModal } from '@/components/CompletionModal'
import { DevPanel } from '@/components/DevPanel'
import { ITEMS_BY_ID } from '@/data/items'
import { useGameStore } from '@/store'
import { setSoundSettings } from '@/sound'
import type { DragPayload, DropPayload } from '@/types/dnd'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function App() {
  const addCanvasToken = useGameStore((s) => s.addCanvasToken)
  const moveCanvasToken = useGameStore((s) => s.moveCanvasToken)
  const justCompletedDiscovery = useGameStore((s) => s.justCompletedDiscovery)
  const acknowledgeCompletionCelebration = useGameStore((s) => s.acknowledgeCompletionCelebration)
  const removeCanvasToken = useGameStore((s) => s.removeCanvasToken)
  const combineTokens = useGameStore((s) => s.combineTokens)
  const tickPlayTime = useGameStore((s) => s.tickPlayTime)
  const muted = useGameStore((s) => s.settings.muted)
  const volume = useGameStore((s) => s.settings.volume)
  const setDraggingItem = useGameStore((s) => s.setDraggingItem)

  const [activeDrag, setActiveDrag] = useState<DragPayload | null>(null)
  const [journalOpen, setJournalOpen] = useState(false)
  const [statsOpen, setStatsOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [devMode] = useState(() => new URLSearchParams(window.location.search).has('dev'))

  useEffect(() => {
    const TICK_MS = 5000
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') tickPlayTime(TICK_MS)
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [tickPlayTime])

  useEffect(() => {
    setSoundSettings(muted, volume)
  }, [muted, volume])

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 8 } }),
  )

  function handleDragStart(event: DragStartEvent) {
    const drag = event.active.data.current as DragPayload | undefined
    if (drag) {
      setActiveDrag(drag)
      setDraggingItem(drag.itemId, drag.kind === 'canvas-token' ? drag.instanceId : null)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveDrag(null)
    setDraggingItem(null)

    const drag = event.active.data.current as DragPayload | undefined
    const drop = event.over?.data.current as DropPayload | undefined
    if (!drag || !drop) return

    let xPct = 50
    let yPct = 50
    if (event.over) {
      const overRect = event.over.rect
      const activeRect = event.active.rect.current.translated
      if (activeRect) {
        const centerX = activeRect.left + activeRect.width / 2
        const centerY = activeRect.top + activeRect.height / 2
        xPct = clamp(((centerX - overRect.left) / overRect.width) * 100, 5, 95)
        yPct = clamp(((centerY - overRect.top) / overRect.height) * 100, 5, 95)
      }
    }

    if (drag.kind === 'sidebar') {
      if (drop.kind === 'canvas-token') {
        const newInstanceId = addCanvasToken(drag.itemId, drop.x, drop.y)
        combineTokens(newInstanceId, drop.instanceId)
      } else if (drop.kind === 'canvas-dropzone') {
        addCanvasToken(drag.itemId, xPct, yPct)
      }
      return
    }

    if (drag.kind === 'canvas-token') {
      if (drop.kind === 'trash') {
        removeCanvasToken(drag.instanceId)
      } else if (drop.kind === 'canvas-token' && drop.instanceId !== drag.instanceId) {
        combineTokens(drag.instanceId, drop.instanceId)
      } else if (drop.kind === 'canvas-dropzone') {
        moveCanvasToken(drag.instanceId, xPct, yPct)
      }
    }
  }

  const activeItem = activeDrag ? ITEMS_BY_ID.get(activeDrag.itemId) : undefined

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen flex-col bg-stone-950 text-stone-100 font-mono">
        <Header
          onOpenJournal={() => setJournalOpen(true)}
          onOpenStats={() => setStatsOpen(true)}
          onOpenHistory={() => setHistoryOpen(true)}
        />
        <div className="flex flex-1 min-h-0 flex-col md:flex-row">
          <div className="shrink-0 border-stone-800 w-full md:w-80 h-[38vh] md:h-auto border-b md:border-b-0 md:border-r">
            <Sidebar />
          </div>
          <CombineCanvas />
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeItem && (
          <div className="opacity-90 rotate-2 scale-105 pointer-events-none">
            <ItemChip item={activeItem} />
          </div>
        )}
      </DragOverlay>

      <AnimatePresence>{journalOpen && <JournalModal onClose={() => setJournalOpen(false)} />}</AnimatePresence>
      <AnimatePresence>{statsOpen && <StatsModal onClose={() => setStatsOpen(false)} />}</AnimatePresence>
      <AnimatePresence>{historyOpen && <HistoryModal onClose={() => setHistoryOpen(false)} />}</AnimatePresence>
      <AnimatePresence>
        {justCompletedDiscovery && <CompletionModal onClose={acknowledgeCompletionCelebration} />}
      </AnimatePresence>

      <TrashZone visible={activeDrag?.kind === 'canvas-token'} />
      <ToastHost />
      <MilestoneBurst />
      {devMode && <DevPanel />}
    </DndContext>
  )
}
