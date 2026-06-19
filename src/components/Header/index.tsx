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

export function Header({ onOpenJournal, onOpenStats, onOpenHistory }: HeaderProps) {
  const clearCanvas = useGameStore((s) => s.clearCanvas)
  const tidyCanvas = useGameStore((s) => s.tidyCanvas)
  const undoLastCombine = useGameStore((s) => s.undoLastCombine)
  const canUndo = useGameStore((s) => s.lastCombineSnapshot !== null)
  const streak = useGameStore((s) => s.stats.currentDiscoveryStreak)

  return (
    <header className="border-b border-stone-800 shrink-0">
      <div className="flex items-center gap-3 px-3 py-2 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-base tracking-widest text-amber-400 uppercase font-bold">BitForge</span>
          <LevelBadge />
          {streak > 0 && (
            <span
              title={`Discovery streak: ${streak} in a row`}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-amber-700/60 bg-amber-950/40 text-amber-300"
            >
              <span>{streakFlames(streak)}</span>
              <span className="font-semibold">{streak}</span>
            </span>
          )}
        </div>

        <div className="flex-1 min-w-[8rem] max-w-xs order-3 basis-full sm:order-none sm:basis-auto">
          <ProgressBar />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1.5">
            <HintPanel />
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
          </div>

          <div className="hidden sm:block h-5 w-px bg-stone-800" />

          <div className="flex items-center gap-1.5">
            <button
              onClick={undoLastCombine}
              disabled={!canUndo}
              title="Undo last combine (the discovery itself stays unlocked)"
              className="px-2.5 py-1.5 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 disabled:opacity-40 disabled:hover:border-stone-700 disabled:hover:text-stone-400 transition-colors"
            >
              ↩ Undo
            </button>
            <button
              onClick={tidyCanvas}
              className="px-2.5 py-1.5 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 transition-colors"
            >
              🧹 Tidy
            </button>
            <button
              onClick={clearCanvas}
              className="px-2.5 py-1.5 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 transition-colors"
            >
              Clear canvas
            </button>
          </div>

          <div className="hidden sm:block h-5 w-px bg-stone-800" />

          <SettingsMenu />
        </div>
      </div>
    </header>
  )
}
