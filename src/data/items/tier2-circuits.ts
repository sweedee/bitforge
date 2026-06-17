import type { Item } from '@/types'

export const TIER2_CIRCUITS: Item[] = [
  { id: 'capacitor', name: 'Capacitor', emoji: '🔋', tier: 'circuits', description: 'A passive component that stores electrical energy in an electric field between two conductive plates.' },
  { id: 'binary', name: 'Binary', emoji: '🔢', tier: 'circuits', description: 'A base-2 numeral system using only the digits 0 and 1, the native representation of data in digital electronics.' },
  { id: 'flip-flop', name: 'Flip-Flop', emoji: '🔄', tier: 'circuits', description: 'A circuit with two stable states that can store one bit of information, forming the basis of digital memory.' },
  { id: 'clock', name: 'Clock', emoji: '⏰', tier: 'circuits', description: 'A circuit that generates a repeating signal to synchronize the timing of operations across a digital system.' },
  { id: 'register', name: 'Register', emoji: '📥', tier: 'circuits', description: "A small, fast storage location inside a processor that holds data being actively worked on." },
  { id: 'adder', name: 'Adder', emoji: '➕', tier: 'circuits', description: 'A digital circuit that performs addition of binary numbers.' },
  { id: 'multiplexer', name: 'Multiplexer', emoji: '🔀', tier: 'circuits', description: 'A circuit that selects one of several input signals and forwards it to a single output line.' },
  { id: 'bus', name: 'Bus', emoji: '🚌', tier: 'circuits', description: "A shared set of wires that transfers data between components inside a computer." },
  { id: 'ram', name: 'RAM', emoji: '🧠', tier: 'circuits', description: "Random-access memory — volatile storage that holds data and instructions a processor is actively using." },
]
