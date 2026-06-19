import type { StateCreator } from 'zustand'
import type { GameStore, SettingsSlice, SettingsState } from './types'

const LS_SETTINGS_KEY = 'bitforge:settings'

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

function loadSettings(): SettingsState {
  const defaults: SettingsState = {
    muted: false,
    volume: 1,
    reducedMotion: prefersReducedMotion(),
    autoCleanup: false,
    dedupeOnTidy: false,
    easyMode: false,
    disableNotifications: false,
  }
  try {
    const raw = localStorage.getItem(LS_SETTINGS_KEY)
    if (raw) return { ...defaults, ...(JSON.parse(raw) as Partial<SettingsState>) }
  } catch {
    /* ignore */
  }
  return defaults
}

function saveSettings(settings: SettingsState) {
  localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings))
}

export const createSettingsSlice: StateCreator<GameStore, [], [], SettingsSlice> = (set, get) => ({
  settings: loadSettings(),
  toggleMute: () => {
    const next = { ...get().settings, muted: !get().settings.muted }
    saveSettings(next)
    set({ settings: next })
  },
  setVolume: (volume) => {
    const next = { ...get().settings, volume: Math.min(1, Math.max(0, volume)) }
    saveSettings(next)
    set({ settings: next })
  },
  toggleReducedMotion: () => {
    const next = { ...get().settings, reducedMotion: !get().settings.reducedMotion }
    saveSettings(next)
    set({ settings: next })
  },
  toggleAutoCleanup: () => {
    const next = { ...get().settings, autoCleanup: !get().settings.autoCleanup }
    saveSettings(next)
    set({ settings: next })
  },
  toggleDedupeOnTidy: () => {
    const next = { ...get().settings, dedupeOnTidy: !get().settings.dedupeOnTidy }
    saveSettings(next)
    set({ settings: next })
  },
  toggleEasyMode: () => {
    const next = { ...get().settings, easyMode: !get().settings.easyMode }
    saveSettings(next)
    set({ settings: next })
  },
  toggleDisableNotifications: () => {
    const next = { ...get().settings, disableNotifications: !get().settings.disableNotifications }
    saveSettings(next)
    set({ settings: next })
  },
})
