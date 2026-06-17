import type { Item } from '@/types'

export const TIER9_ALGORITHMS: Item[] = [
  { id: 'linear-search', name: 'Linear Search', emoji: '🔍', tier: 'algorithms', description: 'An algorithm that checks each element in a collection one by one until a match is found.' },
  { id: 'binary-search', name: 'Binary Search', emoji: '🎯', tier: 'algorithms', description: 'An algorithm that repeatedly halves a sorted collection to quickly locate a target value.' },
  { id: 'sorting-algorithm', name: 'Sorting Algorithm', emoji: '📶', tier: 'algorithms', description: 'A method for arranging elements of a collection into a particular order.' },
  { id: 'bubble-sort', name: 'Bubble Sort', emoji: '🫧', tier: 'algorithms', description: 'A simple sorting algorithm that repeatedly swaps adjacent elements that are out of order.' },
  { id: 'quicksort', name: 'Quicksort', emoji: '🏎️', tier: 'algorithms', description: 'An efficient, divide-and-conquer sorting algorithm that partitions data around a chosen pivot element.' },
  { id: 'depth-first-search', name: 'Depth-First Search', emoji: '🕳️', tier: 'algorithms', description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.' },
  { id: 'breadth-first-search', name: 'Breadth-First Search', emoji: '🌊', tier: 'algorithms', description: 'A graph traversal algorithm that explores all neighbors at the current depth before moving deeper.' },
  { id: 'dijkstras-algorithm', name: "Dijkstra's Algorithm", emoji: '🗺️', tier: 'algorithms', description: 'An algorithm for finding the shortest paths between nodes in a weighted graph.' },
  { id: 'dynamic-programming', name: 'Dynamic Programming', emoji: '🧩', tier: 'algorithms', description: 'A technique that solves complex problems by breaking them into overlapping subproblems and caching their results.' },
  { id: 'greedy-algorithm', name: 'Greedy Algorithm', emoji: '🍰', tier: 'algorithms', description: 'An algorithm that makes the locally optimal choice at each step in hopes of finding a global optimum.' },
  { id: 'big-o-notation', name: 'Big O Notation', emoji: '📈', tier: 'algorithms', description: "A mathematical notation describing how an algorithm's running time or memory use grows with input size." },
  { id: 'backtracking', name: 'Backtracking', emoji: '↩️', tier: 'algorithms', description: 'An algorithmic technique that incrementally builds a solution and abandons paths that fail to satisfy constraints.' },
]
