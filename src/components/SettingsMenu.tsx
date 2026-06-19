import { useState } from 'react'
import { useGameStore } from '@/store'

export function SettingsMenu() {
  const [open, setOpen] = useState(false)
  const muted = useGameStore((s) => s.settings.muted)
  const volume = useGameStore((s) => s.settings.volume)
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion)
  const autoCleanup = useGameStore((s) => s.settings.autoCleanup)
  const dedupeOnTidy = useGameStore((s) => s.settings.dedupeOnTidy)
  const easyMode = useGameStore((s) => s.settings.easyMode)
  const disableNotifications = useGameStore((s) => s.settings.disableNotifications)
  const toggleMute = useGameStore((s) => s.toggleMute)
  const setVolume = useGameStore((s) => s.setVolume)
  const toggleReducedMotion = useGameStore((s) => s.toggleReducedMotion)
  const toggleAutoCleanup = useGameStore((s) => s.toggleAutoCleanup)
  const toggleDedupeOnTidy = useGameStore((s) => s.toggleDedupeOnTidy)
  const toggleEasyMode = useGameStore((s) => s.toggleEasyMode)
  const toggleDisableNotifications = useGameStore((s) => s.toggleDisableNotifications)

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        title="Settings"
        className="px-2 sm:px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors"
      >
        ⚙️
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-50 w-56 rounded border border-stone-700 bg-stone-900 shadow-2xl p-3 space-y-3">
            <button
              onClick={toggleMute}
              className="flex items-center justify-between w-full text-xs text-stone-300 hover:text-stone-100 transition-colors"
            >
              <span>{muted ? '🔇 Sound muted' : '🔊 Sound on'}</span>
              <span className="text-stone-500">{muted ? 'Unmute' : 'Mute'}</span>
            </button>
            <label className="flex flex-col gap-1 text-xs text-stone-400">
              <span>Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                disabled={muted}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="accent-stone-400 disabled:opacity-40"
              />
            </label>
            <label className="flex items-center gap-1.5 text-xs text-stone-400 select-none cursor-pointer">
              <input type="checkbox" checked={reducedMotion} onChange={toggleReducedMotion} className="accent-stone-400" />
              <span>Reduced motion</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-stone-400 select-none cursor-pointer">
              <input type="checkbox" checked={autoCleanup} onChange={toggleAutoCleanup} className="accent-stone-400" />
              <span>Auto-cleanup explored items on Tidy</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-stone-400 select-none cursor-pointer">
              <input type="checkbox" checked={dedupeOnTidy} onChange={toggleDedupeOnTidy} className="accent-stone-400" />
              <span>Remove duplicate items on Tidy</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-stone-400 select-none cursor-pointer">
              <input type="checkbox" checked={easyMode} onChange={toggleEasyMode} className="accent-stone-400" />
              <span>Easy mode: highlight matches on drag</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-stone-400 select-none cursor-pointer">
              <input type="checkbox" checked={disableNotifications} onChange={toggleDisableNotifications} className="accent-stone-400" />
              <span>Disable notifications</span>
            </label>
          </div>
        </>
      )}
    </div>
  )
}
