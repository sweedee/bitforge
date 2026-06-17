import type { Item } from '@/types'

export const OS: Item[] = [
  { id: 'unix', name: 'Unix', emoji: '🐚', category: 'os', rarity: 'rare', milestone: '1969', description: 'A foundational multitasking operating system, written in C, that influenced most modern systems.' },
  { id: 'process', name: 'Process', emoji: '🏃', category: 'os', rarity: 'uncommon', description: 'An instance of a running program, with its own memory and execution state.' },
  { id: 'thread', name: 'Thread', emoji: '🪡', category: 'os', rarity: 'uncommon', description: 'A lightweight unit of execution within a process that can run concurrently with others.' },
  { id: 'scheduler', name: 'Scheduler', emoji: '📅', category: 'os', rarity: 'rare', description: 'The OS component that decides which process or thread runs on the CPU at any moment.' },
  { id: 'file-system', name: 'File System', emoji: '📁', category: 'os', rarity: 'uncommon', description: 'The structure an OS uses to organize, name, and store data on persistent storage.' },
  { id: 'file', name: 'File', emoji: '📄', category: 'os', rarity: 'common', description: 'A named collection of data stored together as a single unit on a file system.' },
  { id: 'kernel', name: 'Kernel', emoji: '🌽', category: 'os', rarity: 'rare', description: 'The core of an operating system that manages memory, processes, and access to hardware.' },
  { id: 'operating-system', name: 'Operating System', emoji: '💾', category: 'os', rarity: 'rare', milestone: '1964', description: "System software that manages a computer's hardware and provides services for running programs." },
  { id: 'virtual-memory', name: 'Virtual Memory', emoji: '🔃', category: 'os', rarity: 'rare', description: 'A technique that gives each process the illusion of a large, private, contiguous memory space.' },
  { id: 'mutex', name: 'Mutex', emoji: '🔏', category: 'os', rarity: 'rare', description: 'A lock that ensures only one thread accesses a shared resource at a time.' },
  { id: 'deadlock', name: 'Deadlock', emoji: '💀', category: 'os', rarity: 'epic', description: 'A standstill where threads each wait forever for a resource another holds.' },
  { id: 'shell', name: 'Shell', emoji: '⌨️', category: 'os', rarity: 'uncommon', description: 'A program that interprets typed commands and runs them against the operating system.' },
]
