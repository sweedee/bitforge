import type { Item } from '@/types'

export const LANGUAGES: Item[] = [
  { id: 'c', name: 'C', emoji: '🔧', category: 'languages', rarity: 'rare', milestone: '1972', description: 'A general-purpose language giving direct access to memory, widely used for systems programming.' },
  { id: 'header-file', name: 'Header File', emoji: '📄', category: 'languages', rarity: 'uncommon', description: 'A file containing declarations shared across multiple source files, used to organize C and C++ code.' },
  { id: 'cpp', name: 'C++', emoji: '➕', category: 'languages', rarity: 'rare', milestone: '1985', description: 'C extended with classes and object-oriented features, while retaining low-level control and speed.' },
  { id: 'python', name: 'Python', emoji: '🐍', category: 'languages', rarity: 'rare', milestone: '1991', description: 'A high-level language known for its readable syntax and broad use in scripting and data science.' },
  { id: 'java', name: 'Java', emoji: '☕', category: 'languages', rarity: 'rare', milestone: '1995', description: 'A class-based, object-oriented language that compiles to bytecode and runs on a virtual machine for portability.' },
  { id: 'javascript', name: 'JavaScript', emoji: '⚙️', category: 'languages', rarity: 'rare', milestone: '1995', description: 'A high-level scripting language with first-class functions that powers interactive behavior in web browsers.' },
  { id: 'ruby', name: 'Ruby', emoji: '💎', category: 'languages', rarity: 'uncommon', milestone: '1995', description: 'A dynamic, object-oriented scripting language designed for programmer happiness and readability.' },
  { id: 'go', name: 'Go', emoji: '🐹', category: 'languages', rarity: 'rare', milestone: '2009', description: 'A statically typed, compiled language designed for simplicity and efficient concurrency.' },
  { id: 'rust', name: 'Rust', emoji: '🦀', category: 'languages', rarity: 'rare', milestone: '2010', description: 'A systems language that guarantees memory safety without a garbage collector, preventing whole classes of crashes.' },
  { id: 'typescript', name: 'TypeScript', emoji: '🔷', category: 'languages', rarity: 'uncommon', milestone: '2012', description: 'A superset of JavaScript that adds static typing to help catch errors before code runs.' },
  { id: 'compiler', name: 'Compiler', emoji: '🏭', category: 'languages', rarity: 'legendary', milestone: '1952', description: 'A program that translates source code written in a high-level language into machine code.' },
]
