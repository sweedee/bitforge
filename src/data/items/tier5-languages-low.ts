import type { Item } from '@/types'

export const TIER5_LANGUAGES_LOW: Item[] = [
  { id: 'c', name: 'C', emoji: '🔧', tier: 'languages-low', description: 'A general-purpose, low-level programming language that gives direct access to memory, widely used for systems programming.' },
  { id: 'memory-address', name: 'Memory Address', emoji: '📍', tier: 'languages-low', description: "A unique identifier denoting a specific location in a computer's memory." },
  { id: 'pointer', name: 'Pointer', emoji: '👉', tier: 'languages-low', description: 'A variable that stores the memory address of another value rather than the value itself.' },
  { id: 'null-pointer', name: 'Null Pointer', emoji: '❌', tier: 'languages-low', description: "A pointer that does not refer to any valid memory location, often used to signal the absence of a value." },
  { id: 'segmentation-fault', name: 'Segmentation Fault', emoji: '💥', tier: 'languages-low', description: "An error raised when a program tries to access a memory location it isn't permitted to access." },
  { id: 'header-file', name: 'Header File', emoji: '📄', tier: 'languages-low', description: 'A file containing declarations shared across multiple source files, commonly used to organize C and C++ code.' },
  { id: 'unix', name: 'Unix', emoji: '🐚', tier: 'languages-low', description: 'A foundational multitasking operating system, originally written in C, that influenced most modern operating systems.' },
]
