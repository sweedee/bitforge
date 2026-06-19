import { useState } from 'react'
import { ProgressBar } from '@/components/ProgressBar'
import { HintPanel } from '@/components/HintPanel'
import { LevelBadge } from '@/components/LevelBadge'
import { SettingsMenu } from '@/components/SettingsMenu'
import { useGameStore } from '@/store'

interface HeaderProps {
  onOpenJournal: () => void
  onOpenStats: () => void
  onOpenHistory: () => void
}

function streakFlames(streak: number): string {
  if (streak >= 25) return '🔥🔥🔥'
  if (streak >= 10) return '🔥🔥'
  return '🔥'
}

function MoreMenu({
  onOpenJournal,
  onOpenStats,
  onOpenHistory,
  onUndo,
  canUndo,
}: {
  onOpenJournal: () => void
  onOpenStats: () => void
  onOpenHistory: () => void
  onUndo: () => void
  canUndo: boolean
}) {
  const [open, setOpen] = useState(false)

  function pick(action: () => void) {
    action()
    setOpen(false)
  }

  return (
    <div className="relative shrink-0 sm:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        title="More"
        className="px-2.5 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors"
      >
        ☰
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-50 w-44 rounded border border-stone-700 bg-stone-900 shadow-2xl p-1.5 space-y-1">
            <button
              onClick={() => pick(onOpenJournal)}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded text-stone-300 hover:bg-stone-800 hover:text-stone-100 transition-colors"
            >
              📖 Journal
            </button>
            <button
              onClick={() => pick(onOpenStats)}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded text-stone-300 hover:bg-stone-800 hover:text-stone-100 transition-colors"
            >
              📊 Stats
            </button>
            <button
              onClick={() => pick(onOpenHistory)}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded text-stone-300 hover:bg-stone-800 hover:text-stone-100 transition-colors"
            >
              🕘 History
            </button>
            <button
              onClick={() => pick(onUndo)}
              disabled={!canUndo}
              title="Undo last combine (the discovery itself stays unlocked)"
              className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded text-stone-300 hover:bg-stone-800 hover:text-stone-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              ↩ Undo
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export function Header({ onOpenJournal, onOpenStats, onOpenHistory }: HeaderProps) {
  const clearCanvas = useGameStore((s) => s.clearCanvas)
  const tidyCanvas = useGameStore((s) => s.tidyCanvas)
  const undoLastCombine = useGameStore((s) => s.undoLastCombine)
  const canUndo = useGameStore((s) => s.lastCombineSnapshot !== null)
  const streak = useGameStore((s) => s.stats.currentDiscoveryStreak)

  return (
    <header className="border-b border-stone-800 shrink-0">
      <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2">
        <div className="flex items-center gap-2 shrink-0 min-w-0">
          <span className="text-sm sm:text-base tracking-widest text-amber-400 uppercase font-bold">BitForge</span>
          <LevelBadge />
          {streak > 0 && (
            <span
              title={`Discovery streak: ${streak} in a row`}
              className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs rounded border border-amber-700/60 bg-amber-950/40 text-amber-300"
            >
              <span>{streakFlames(streak)}</span>
              <span className="font-semibold">{streak}</span>
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <ProgressBar />
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <HintPanel />

          <button
            onClick={tidyCanvas}
            title="Tidy canvas"
            className="px-2 sm:px-2.5 py-1.5 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 transition-colors"
          >
            🧹<span className="hidden sm:inline"> Tidy</span>
          </button>
          <button
            onClick={clearCanvas}
            title="Clear canvas"
            className="px-2 sm:px-2.5 py-1.5 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 transition-colors"
          >
            🗑️<span className="hidden sm:inline"> Clear</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5">
            <div className="h-5 w-px bg-stone-800" />
            <button
              onClick={onOpenJournal}
              className="px-2.5 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors"
            >
              📖 Journal
            </button>
            <button
              onClick={onOpenStats}
              className="px-2.5 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors"
            >
              📊 Stats
            </button>
            <button
              onClick={onOpenHistory}
              className="px-2.5 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors"
            >
              🕘 History
            </button>
            <button
              onClick={undoLastCombine}
              disabled={!canUndo}
              title="Undo last combine (the discovery itself stays unlocked)"
              className="px-2.5 py-1.5 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 disabled:opacity-40 disabled:hover:border-stone-700 disabled:hover:text-stone-400 transition-colors"
            >
              ↩ Undo
            </button>
            <div className="h-5 w-px bg-stone-800" />
          </div>

          <MoreMenu
            onOpenJournal={onOpenJournal}
            onOpenStats={onOpenStats}
            onOpenHistory={onOpenHistory}
            onUndo={undoLastCombine}
            canUndo={canUndo}
          />

          <SettingsMenu />
        </div>
      </div>
    </header>
  )
}
