import type { Item } from '@/types'

export const THEORY: Item[] = [
  { id: 'algorithm', name: 'Algorithm', emoji: '♟️', category: 'theory', rarity: 'uncommon', description: 'A finite, well-defined sequence of steps for solving a problem.' },
  { id: 'finite-state-machine', name: 'Finite State Machine', emoji: '🎰', category: 'theory', rarity: 'rare', description: 'An abstract machine that is in exactly one of a finite number of states at any time.' },
  { id: 'regular-expression', name: 'Regular Expression', emoji: '*️⃣', category: 'theory', rarity: 'rare', description: 'A pattern describing a set of strings, recognizable by a finite state machine.' },
  { id: 'turing-machine', name: 'Turing Machine', emoji: '🎞️', category: 'theory', rarity: 'legendary', milestone: '1936', description: 'An abstract model of computation capable of simulating any algorithm — the foundation of CS theory.' },
  { id: 'lambda-calculus', name: 'Lambda Calculus', emoji: '🔮', category: 'theory', rarity: 'epic', milestone: '1936', description: 'A formal system expressing computation purely through function abstraction and application.' },
  { id: 'computability', name: 'Computability', emoji: '🎲', category: 'theory', rarity: 'epic', description: 'The study of which problems can, even in principle, be solved by an algorithm.' },
  { id: 'decidability', name: 'Decidability', emoji: '🃏', category: 'theory', rarity: 'epic', description: 'Whether a problem can be solved by an algorithm guaranteed to halt with a yes/no answer.' },
  { id: 'halting-problem', name: 'Halting Problem', emoji: '🛑', category: 'theory', rarity: 'legendary', milestone: '1936', description: 'The proven-undecidable problem of determining whether an arbitrary program will ever stop.' },
  { id: 'complexity-class', name: 'Complexity Class', emoji: '🧗', category: 'theory', rarity: 'epic', description: 'A grouping of problems by the resources needed to solve them, such as time or space.' },
  { id: 'np-complete', name: 'NP-Complete', emoji: '🧨', category: 'theory', rarity: 'epic', description: 'The hardest problems in NP — solving any one efficiently would solve them all.' },
  { id: 'p-vs-np', name: 'P vs NP', emoji: '⁉️', category: 'theory', rarity: 'legendary', description: 'The famous open question of whether every quickly-checkable problem is also quickly solvable.' },
  { id: 'superposition', name: 'Superposition', emoji: '🌓', category: 'theory', rarity: 'epic', description: 'A quantum state representing a blend of multiple classical states at once.' },
]
