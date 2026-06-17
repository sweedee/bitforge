import type { Item } from '@/types'

export const ALGORITHMS: Item[] = [
  { id: 'linear-search', name: 'Linear Search', emoji: '👀', category: 'algorithms', rarity: 'common', description: 'An algorithm that checks each element in a collection one by one until a match is found.' },
  { id: 'binary-search', name: 'Binary Search', emoji: '🎯', category: 'algorithms', rarity: 'uncommon', description: 'An algorithm that repeatedly halves a sorted collection to quickly locate a target value.' },
  { id: 'sorting-algorithm', name: 'Sorting Algorithm', emoji: '📶', category: 'algorithms', rarity: 'uncommon', description: 'A method for arranging the elements of a collection into a particular order.' },
  { id: 'bubble-sort', name: 'Bubble Sort', emoji: '🫧', category: 'algorithms', rarity: 'uncommon', description: 'A simple sorting algorithm that repeatedly swaps adjacent elements that are out of order.' },
  { id: 'quicksort', name: 'Quicksort', emoji: '🏎️', category: 'algorithms', rarity: 'rare', description: 'An efficient divide-and-conquer sort that partitions data around a chosen pivot element.' },
  { id: 'merge-sort', name: 'Merge Sort', emoji: '🔗', category: 'algorithms', rarity: 'rare', description: 'A stable divide-and-conquer sort that recursively splits data and merges the sorted halves.' },
  { id: 'depth-first-search', name: 'Depth-First Search', emoji: '🕳️', category: 'algorithms', rarity: 'uncommon', description: 'A graph traversal that explores as far as possible along each branch before backtracking.' },
  { id: 'breadth-first-search', name: 'Breadth-First Search', emoji: '🌊', category: 'algorithms', rarity: 'uncommon', description: 'A graph traversal that explores all neighbors at the current depth before moving deeper.' },
  { id: 'dijkstras-algorithm', name: "Dijkstra's Algorithm", emoji: '🗺️', category: 'algorithms', rarity: 'rare', description: 'An algorithm for finding the shortest paths between nodes in a weighted graph.' },
  { id: 'a-star', name: 'A* Search', emoji: '⭐', category: 'algorithms', rarity: 'epic', description: 'A best-first pathfinding algorithm that uses a heuristic to guide the search toward the goal.' },
  { id: 'dynamic-programming', name: 'Dynamic Programming', emoji: '🧩', category: 'algorithms', rarity: 'rare', description: 'A technique that solves complex problems by breaking them into overlapping subproblems and caching results.' },
  { id: 'memoization', name: 'Memoization', emoji: '📒', category: 'algorithms', rarity: 'epic', description: 'Caching the results of expensive function calls so repeated calls return instantly.' },
  { id: 'greedy-algorithm', name: 'Greedy Algorithm', emoji: '🍰', category: 'algorithms', rarity: 'rare', description: 'An algorithm that makes the locally optimal choice at each step, hoping to reach a global optimum.' },
  { id: 'backtracking', name: 'Backtracking', emoji: '↩️', category: 'algorithms', rarity: 'uncommon', description: 'A technique that builds a solution incrementally and abandons paths that fail to satisfy constraints.' },
  { id: 'big-o-notation', name: 'Big O Notation', emoji: '📈', category: 'algorithms', rarity: 'rare', description: "Mathematical notation describing how an algorithm's running time or memory use grows with input size." },
]
