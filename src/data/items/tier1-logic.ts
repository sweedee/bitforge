import type { Item } from '@/types'

export const TIER1_LOGIC: Item[] = [
  {
    id: 'glass',
    name: 'Glass',
    emoji: '🔍',
    tier: 'logic',
    description: 'An amorphous solid formed by melting silica — used for insulation, optics, and display screens.',
  },
  {
    id: 'diode',
    name: 'Diode',
    emoji: '↗️',
    tier: 'logic',
    description: 'A semiconductor component that allows current to flow in only one direction.',
  },
  {
    id: 'transistor',
    name: 'Transistor',
    emoji: '🔌',
    tier: 'logic',
    description: 'A semiconductor device that amplifies or switches electronic signals — the fundamental building block of all digital circuits.',
  },
  {
    id: 'resistor',
    name: 'Resistor',
    emoji: '🟤',
    tier: 'logic',
    description: 'A passive component that limits current flow, used to control voltage and current throughout a circuit.',
  },
  {
    id: 'and-gate',
    name: 'AND Gate',
    emoji: '🚪',
    tier: 'logic',
    description: 'A logic gate that outputs true only when all of its inputs are true.',
  },
  {
    id: 'or-gate',
    name: 'OR Gate',
    emoji: '🚪',
    tier: 'logic',
    description: 'A logic gate that outputs true when at least one of its inputs is true.',
  },
  {
    id: 'not-gate',
    name: 'NOT Gate',
    emoji: '🚫',
    tier: 'logic',
    description: 'A logic gate that inverts its single input — true becomes false and vice versa.',
  },
  {
    id: 'xor-gate',
    name: 'XOR Gate',
    emoji: '➗',
    tier: 'logic',
    description: 'A logic gate that outputs true only when its inputs differ from one another.',
  },
]
