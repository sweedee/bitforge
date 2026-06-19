import { ProgressBar } from '@/components/ProgressBar'
import { HintPanel } from '@/components/HintPanel'
import { LevelBadge } from '@/components/LevelBadge'
import { SettingsMenu } from '@/components/SettingsMenu'
import { useGameStore } from '@/store'

interface HeaderProps {
  onOpenJournal: () => void
  onOpenStats: () => void
  onOpenTechTree: () => void
}

export function Header({ onOpenJournal, onOpenStats, onOpenTechTree }: HeaderProps) {
  const clearCanvas = useGameStore((s) => s.clearCanvas)
  const tidyCanvas = useGameStore((s) => s.tidyCanvas)
  const undoLastCombine = useGameStore((s) => s.undoLastCombine)
  const canUndo = useGameStore((s) => s.lastCombineSnapshot !== null)

  return (
    <header className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-stone-800 shrink-0 flex-wrap">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-base tracking-widest text-orange-400 uppercase font-bold">BitForge</span>
        <LevelBadge />
      </div>

      <div className="flex-1 max-w-xs min-w-[6rem]">
        <ProgressBar />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <HintPanel />
        <button
          onClick={onOpenJournal}
          className="px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors"
        >
          📖 Journal
        </button>
        <button
          onClick={onOpenStats}
          className="px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors"
        >
          📊 Stats
        </button>
        <button
          onClick={onOpenTechTree}
          className="px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors"
        >
          🌳 Tech Tree
        </button>
        <button
          onClick={undoLastCombine}
          disabled={!canUndo}
          title="Undo last combine (the discovery itself stays unlocked)"
          className="px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 disabled:opacity-40 disabled:hover:border-stone-700 disabled:hover:text-stone-400 transition-colors"
        >
          ↩ Undo
        </button>
        <button
          onClick={tidyCanvas}
          className="px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 transition-colors"
        >
          🧹 Tidy
        </button>
        <button
          onClick={clearCanvas}
          className="px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 transition-colors"
        >
          Clear canvas
        </button>
        <SettingsMenu />
      </div>
    </header>
  )
}
