import type { Item } from '@/types'

export const DATABASES: Item[] = [
  { id: 'table', name: 'Table', emoji: '📋', category: 'databases', rarity: 'uncommon', description: 'A collection of related data organized into rows and columns.' },
  { id: 'sql', name: 'SQL', emoji: '🗄️', category: 'databases', rarity: 'uncommon', description: 'A domain-specific language used to manage and query data held in relational databases.' },
  { id: 'database', name: 'Database', emoji: '🛢️', category: 'databases', rarity: 'rare', milestone: '1970', description: 'An organized collection of structured data, typically stored and accessed electronically.' },
  { id: 'index', name: 'Index', emoji: '📇', category: 'databases', rarity: 'rare', description: 'A data structure that speeds up lookups in a database at the cost of extra storage.' },
  { id: 'query', name: 'Query', emoji: '🔎', category: 'databases', rarity: 'uncommon', description: 'A request to retrieve or modify specific data from a database.' },
  { id: 'join', name: 'Join', emoji: '🪢', category: 'databases', rarity: 'uncommon', description: 'An operation that combines rows from two tables based on a related column.' },
  { id: 'transaction', name: 'Transaction', emoji: '💳', category: 'databases', rarity: 'rare', description: 'A group of database operations that succeed or fail as a single, atomic unit.' },
  { id: 'nosql', name: 'NoSQL', emoji: '🍃', category: 'databases', rarity: 'rare', description: 'A family of non-relational databases optimized for scale, flexibility, or specialized data models.' },
  { id: 'b-tree', name: 'B-Tree', emoji: '🎄', category: 'databases', rarity: 'epic', description: 'A self-balancing tree that keeps data sorted and allows efficient disk-based search, central to database indexes.' },
]
