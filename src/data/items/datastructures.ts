import type { Item } from '@/types'

export const DATASTRUCTURES: Item[] = [
  { id: 'array', name: 'Array', emoji: '📊', category: 'datastructures', rarity: 'common', description: 'A data structure that stores an ordered collection of elements in contiguous memory.' },
  { id: 'linked-list', name: 'Linked List', emoji: '⛓️', category: 'datastructures', rarity: 'uncommon', description: 'A linear structure where each element points to the next, allowing flexible insertion and removal.' },
  { id: 'stack', name: 'Stack', emoji: '🥞', category: 'datastructures', rarity: 'uncommon', description: 'A last-in-first-out structure where elements are added and removed from the same end.' },
  { id: 'queue', name: 'Queue', emoji: '🎟️', category: 'datastructures', rarity: 'uncommon', description: 'A first-in-first-out structure where elements are added at one end and removed from the other.' },
  { id: 'matrix', name: 'Matrix', emoji: '🔲', category: 'datastructures', rarity: 'uncommon', description: 'A two-dimensional array of values arranged in rows and columns.' },
  { id: 'tree', name: 'Tree', emoji: '🌳', category: 'datastructures', rarity: 'uncommon', description: 'A hierarchical structure of nodes where each node has a parent and zero or more children.' },
  { id: 'binary-tree', name: 'Binary Tree', emoji: '🌲', category: 'datastructures', rarity: 'uncommon', description: 'A tree in which each node has at most two children, commonly used for fast searching.' },
  { id: 'heap', name: 'Heap', emoji: '⛰️', category: 'datastructures', rarity: 'uncommon', description: 'A tree-based structure that keeps the smallest or largest element quickly accessible at the root.' },
  { id: 'graph', name: 'Graph', emoji: '🕸️', category: 'datastructures', rarity: 'uncommon', description: 'A structure of nodes connected by edges, used to model networks and relationships.' },
  { id: 'hash-map', name: 'Hash Map', emoji: '🗂️', category: 'datastructures', rarity: 'uncommon', description: 'A structure that maps keys to values using a hash function for fast lookup.' },
  { id: 'set', name: 'Set', emoji: '🔘', category: 'datastructures', rarity: 'uncommon', description: 'A collection that stores unique elements with no duplicates and typically no defined order.' },
  { id: 'trie', name: 'Trie', emoji: '🌴', category: 'datastructures', rarity: 'epic', description: 'A tree keyed by character sequences, enabling fast prefix lookups for strings.' },
  { id: 'priority-queue', name: 'Priority Queue', emoji: '🎫', category: 'datastructures', rarity: 'rare', description: 'A queue where each element has a priority, and the highest-priority element is served first.' },
]
