import type { Item } from '@/types'

export const TIER7_PARADIGMS: Item[] = [
  { id: 'variable', name: 'Variable', emoji: '📦', tier: 'paradigms', description: 'A named storage location that holds a value which can change during program execution.' },
  { id: 'function', name: 'Function', emoji: '🛠️', tier: 'paradigms', description: 'A reusable block of code that performs a specific task and can be invoked by name.' },
  { id: 'loop', name: 'Loop', emoji: '🔁', tier: 'paradigms', description: 'A control structure that repeats a block of code until a specified condition is met.' },
  { id: 'conditional', name: 'Conditional', emoji: '❓', tier: 'paradigms', description: 'A control structure that executes different code paths depending on whether a condition is true or false.' },
  { id: 'recursion', name: 'Recursion', emoji: '🪆', tier: 'paradigms', description: 'A technique where a function calls itself to solve smaller instances of the same problem.' },
  { id: 'class', name: 'Class', emoji: '🏗️', tier: 'paradigms', description: 'A blueprint that defines the properties and behaviors shared by all objects created from it.' },
  { id: 'object', name: 'Object', emoji: '🟦', tier: 'paradigms', description: 'An instance of a class that bundles state and behavior together.' },
  { id: 'inheritance', name: 'Inheritance', emoji: '🧬', tier: 'paradigms', description: 'A mechanism allowing one class to acquire the properties and behaviors of another class.' },
  { id: 'polymorphism', name: 'Polymorphism', emoji: '🎭', tier: 'paradigms', description: 'The ability of different objects to respond to the same operation in ways specific to their own type.' },
  { id: 'oop', name: 'OOP', emoji: '🧰', tier: 'paradigms', description: 'Object-oriented programming — a paradigm that organizes software design around objects rather than logic and functions.' },
  { id: 'lambda', name: 'Lambda', emoji: 'λ', tier: 'paradigms', description: 'An anonymous, inline function that can be defined without being bound to a name.' },
  { id: 'closure', name: 'Closure', emoji: '🔒', tier: 'paradigms', description: 'A function bundled together with references to variables from its surrounding scope at the time it was created.' },
  { id: 'functional-programming', name: 'Functional Programming', emoji: '🌀', tier: 'paradigms', description: 'A paradigm that treats computation as the evaluation of functions, favoring immutability and avoiding side effects.' },
]
