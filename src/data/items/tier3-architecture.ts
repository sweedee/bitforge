import type { Item } from '@/types'

export const TIER3_ARCHITECTURE: Item[] = [
  { id: 'alu', name: 'ALU', emoji: '🧮', tier: 'architecture', description: 'The arithmetic logic unit — the part of a processor that performs arithmetic and logical operations.' },
  { id: 'control-unit', name: 'Control Unit', emoji: '🎛️', tier: 'architecture', description: 'The component of a processor that directs the operation of the other units by interpreting instructions.' },
  { id: 'cpu', name: 'CPU', emoji: '🖥️', tier: 'architecture', description: 'The central processing unit — the primary component that executes instructions in a computer.' },
  { id: 'cache', name: 'Cache', emoji: '🗃️', tier: 'architecture', description: "A small, fast memory layer that stores frequently used data to reduce access time to slower main memory." },
  { id: 'motherboard', name: 'Motherboard', emoji: '🧩', tier: 'architecture', description: "The main circuit board that connects and allows communication between a computer's components." },
  { id: 'instruction-set', name: 'Instruction Set', emoji: '📜', tier: 'architecture', description: "The set of commands a processor's hardware is designed to understand and execute." },
  { id: 'von-neumann-architecture', name: 'Von Neumann Architecture', emoji: '🏛️', tier: 'architecture', description: 'A computer design in which a single memory store holds both program instructions and data.' },
  { id: 'computer', name: 'Computer', emoji: '💻', tier: 'architecture', description: 'A programmable machine that can execute a sequence of instructions to perform calculations or process data.' },
]
