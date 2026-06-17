import type { Item } from '@/types'

export const ARCHITECTURE: Item[] = [
  { id: 'register', name: 'Register', emoji: '📥', category: 'architecture', rarity: 'uncommon', description: 'A small, fast storage location inside a processor that holds data being actively worked on.' },
  { id: 'bus', name: 'Bus', emoji: '🚌', category: 'architecture', rarity: 'uncommon', description: 'A shared set of wires that transfers data between components inside a computer.' },
  { id: 'ram', name: 'RAM', emoji: '🧠', category: 'architecture', rarity: 'uncommon', description: 'Random-access memory — volatile storage that holds data and instructions a processor is actively using.' },
  { id: 'cache', name: 'Cache', emoji: '🗃️', category: 'architecture', rarity: 'uncommon', description: 'A small, fast memory layer that stores frequently used data to reduce access time to slower main memory.' },
  { id: 'alu', name: 'ALU', emoji: '🧮', category: 'architecture', rarity: 'rare', description: 'The arithmetic logic unit — the part of a processor that performs arithmetic and logical operations.' },
  { id: 'control-unit', name: 'Control Unit', emoji: '🎛️', category: 'architecture', rarity: 'rare', description: 'The component of a processor that directs the other units by interpreting instructions.' },
  { id: 'cpu', name: 'CPU', emoji: '🖥️', category: 'architecture', rarity: 'rare', milestone: '1971', description: 'The central processing unit — the primary component that executes instructions in a computer.' },
  { id: 'motherboard', name: 'Motherboard', emoji: '🧩', category: 'architecture', rarity: 'uncommon', description: "The main circuit board that connects and allows communication between a computer's components." },
  { id: 'instruction-set', name: 'Instruction Set', emoji: '📜', category: 'architecture', rarity: 'rare', description: "The set of commands a processor's hardware is designed to understand and execute." },
  { id: 'von-neumann-architecture', name: 'Von Neumann Architecture', emoji: '🏛️', category: 'architecture', rarity: 'rare', milestone: '1945', description: 'A computer design in which a single memory store holds both program instructions and data.' },
  { id: 'computer', name: 'Computer', emoji: '💻', category: 'architecture', rarity: 'rare', milestone: '1946', description: 'A programmable machine that executes a sequence of instructions to perform calculations or process data.' },
  { id: 'virtual-machine', name: 'Virtual Machine', emoji: '📟', category: 'architecture', rarity: 'rare', description: 'A software emulation of a computer that runs portable bytecode independently of the underlying hardware.' },
]
