import { ProgressBar } from '@/components/ProgressBar'
import { HintPanel } from '@/components/HintPanel'
import { useGameStore } from '@/store'

interface HeaderProps {
  onOpenJournal: () => void
  sidebarSide: boolean
  onToggleSidebarSide: () => void
}

export function Header({ onOpenJournal, sidebarSide, onToggleSidebarSide }: HeaderProps) {
  const clearCanvas = useGameStore((s) => s.clearCanvas)

  return (
    <header className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-stone-800 shrink-0 flex-wrap">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-base tracking-widest text-orange-400 uppercase font-bold">BitForge</span>
      </div>

      <div className="flex-1 max-w-xs min-w-[6rem]">
        <ProgressBar />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <HintPanel />
        <button
          onClick={onToggleSidebarSide}
          title="Move the item library to the side"
          className="px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors"
        >
          {sidebarSide ? '⬒ Top' : '⬓ Side'}
        </button>
        <button
          onClick={onOpenJournal}
          className="px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors"
        >
          📖 Journal
        </button>
        <button
          onClick={clearCanvas}
          className="px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 transition-colors"
        >
          Clear canvas
        </button>
      </div>
    </header>
  )
}
