import type { Item } from '@/types'

export const HARDWARE: Item[] = [
  { id: 'glass', name: 'Glass', emoji: '🔍', category: 'hardware', rarity: 'common', description: 'An amorphous solid formed by melting silica — used for insulation, optics, and display screens.' },
  { id: 'wire', name: 'Wire', emoji: '🧵', category: 'hardware', rarity: 'common', description: 'A thin strand of conductive metal that carries electrical signals between components.' },
  { id: 'wafer', name: 'Silicon Wafer', emoji: '🥏', category: 'hardware', rarity: 'uncommon', description: 'A thin, polished slice of ultra-pure silicon on which integrated circuits are fabricated.' },
  { id: 'semiconductor', name: 'Semiconductor', emoji: '🔆', category: 'hardware', rarity: 'uncommon', description: 'A material whose conductivity can be controlled, forming the basis of every electronic switch.' },
  { id: 'diode', name: 'Diode', emoji: '↗️', category: 'hardware', rarity: 'common', description: 'A semiconductor component that allows current to flow in only one direction.' },
  { id: 'transistor', name: 'Transistor', emoji: '🔌', category: 'hardware', rarity: 'uncommon', milestone: '1947', description: 'A semiconductor device that amplifies or switches signals — the fundamental building block of all digital circuits.' },
  { id: 'resistor', name: 'Resistor', emoji: '🟤', category: 'hardware', rarity: 'common', description: 'A passive component that limits current flow, used to control voltage and current throughout a circuit.' },
  { id: 'capacitor', name: 'Capacitor', emoji: '🔋', category: 'hardware', rarity: 'common', description: 'A passive component that stores electrical energy in an electric field between two conductive plates.' },
  { id: 'and-gate', name: 'AND Gate', emoji: '🚪', category: 'hardware', rarity: 'common', description: 'A logic gate that outputs true only when all of its inputs are true.' },
  { id: 'or-gate', name: 'OR Gate', emoji: '🪟', category: 'hardware', rarity: 'common', description: 'A logic gate that outputs true when at least one of its inputs is true.' },
  { id: 'not-gate', name: 'NOT Gate', emoji: '🚫', category: 'hardware', rarity: 'common', description: 'A logic gate that inverts its single input — true becomes false and vice versa.' },
  { id: 'xor-gate', name: 'XOR Gate', emoji: '➗', category: 'hardware', rarity: 'uncommon', description: 'A logic gate that outputs true only when its inputs differ from one another.' },
  { id: 'nand-gate', name: 'NAND Gate', emoji: '🔻', category: 'hardware', rarity: 'rare', description: 'A universal logic gate — any other gate can be built entirely from NANDs.' },
  { id: 'flip-flop', name: 'Flip-Flop', emoji: '🔄', category: 'hardware', rarity: 'uncommon', description: 'A circuit with two stable states that can store one bit of information, forming the basis of digital memory.' },
  { id: 'clock', name: 'Clock', emoji: '⏰', category: 'hardware', rarity: 'uncommon', description: 'A circuit that generates a repeating signal to synchronize the timing of operations across a digital system.' },
  { id: 'multiplexer', name: 'Multiplexer', emoji: '🔀', category: 'hardware', rarity: 'uncommon', description: 'A circuit that selects one of several input signals and forwards it to a single output line.' },
  { id: 'adder', name: 'Adder', emoji: '➕', category: 'hardware', rarity: 'uncommon', description: 'A digital circuit that performs addition of binary numbers.' },
  { id: 'integrated-circuit', name: 'Integrated Circuit', emoji: '🔳', category: 'hardware', rarity: 'rare', milestone: '1958', description: 'A complete electronic circuit with many transistors etched onto a single chip of silicon.' },
]
