import type { Item } from '@/types'

export const SOFTWARE_ENG: Item[] = [
  { id: 'bug', name: 'Bug', emoji: '🐛', category: 'software-eng', rarity: 'common', description: 'A flaw in a program that causes it to behave incorrectly or unexpectedly.' },
  { id: 'commit', name: 'Commit', emoji: '✅', category: 'software-eng', rarity: 'common', description: 'A saved snapshot of changes recorded in a version control history.' },
  { id: 'branch', name: 'Branch', emoji: '🪵', category: 'software-eng', rarity: 'uncommon', description: 'An independent line of development that diverges from the main history.' },
  { id: 'merge-conflict', name: 'Merge Conflict', emoji: '😬', category: 'software-eng', rarity: 'uncommon', description: 'A situation where changes from different branches cannot be reconciled automatically.' },
  { id: 'repository', name: 'Repository', emoji: '📚', category: 'software-eng', rarity: 'uncommon', description: 'A stored project along with its complete version history.' },
  { id: 'git', name: 'Git', emoji: '🌿', category: 'software-eng', rarity: 'rare', milestone: '2005', description: 'A distributed version control system that tracks changes to source code as a tree of commits.' },
  { id: 'test', name: 'Unit Test', emoji: '✔️', category: 'software-eng', rarity: 'uncommon', description: 'Code that automatically checks whether a small piece of a program behaves as expected.' },
  { id: 'debugger', name: 'Debugger', emoji: '🔬', category: 'software-eng', rarity: 'rare', description: 'A tool that pauses and inspects a running program to find the cause of a bug.' },
  { id: 'refactoring', name: 'Refactoring', emoji: '🧹', category: 'software-eng', rarity: 'uncommon', description: 'Restructuring existing code to improve its design without changing its behavior.' },
  { id: 'design-pattern', name: 'Design Pattern', emoji: '🎀', category: 'software-eng', rarity: 'rare', description: 'A reusable, named solution to a commonly recurring problem in software design.' },
  { id: 'ci-cd', name: 'CI/CD', emoji: '♻️', category: 'software-eng', rarity: 'rare', description: 'Continuous integration and delivery — automatically building, testing, and shipping code changes.' },
  { id: 'agile', name: 'Agile', emoji: '🗓️', category: 'software-eng', rarity: 'rare', description: 'An iterative approach to software development that delivers work in small, frequent increments.' },
  { id: 'code-review', name: 'Code Review', emoji: '👓', category: 'software-eng', rarity: 'uncommon', description: 'The practice of having peers examine code changes before they are merged.' },
  { id: 'documentation', name: 'Documentation', emoji: '📖', category: 'software-eng', rarity: 'uncommon', description: 'Written explanations of how code works and how to use it.' },
  { id: 'technical-debt', name: 'Technical Debt', emoji: '💸', category: 'software-eng', rarity: 'epic', description: 'The accumulated cost of quick, suboptimal decisions that make future changes harder.' },
  { id: 'stack-overflow', name: 'Stack Overflow', emoji: '😵', category: 'software-eng', rarity: 'uncommon', description: 'An error caused by too-deep recursion exhausting the call stack — and the famous Q&A site named after it.' },
]
