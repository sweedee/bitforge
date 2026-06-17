import type { Item } from '@/types'

export const ENCODING: Item[] = [
  { id: 'bit', name: 'Bit', emoji: '0️⃣', category: 'encoding', rarity: 'uncommon', description: 'The most basic unit of information in computing, representing a single binary value of 0 or 1.' },
  { id: 'byte', name: 'Byte', emoji: '🧱', category: 'encoding', rarity: 'common', description: 'A unit of digital information, almost always made up of eight bits.' },
  { id: 'binary', name: 'Binary', emoji: '🔢', category: 'encoding', rarity: 'common', description: 'A base-2 numeral system using only the digits 0 and 1 — the native representation of data in digital electronics.' },
  { id: 'hexadecimal', name: 'Hexadecimal', emoji: '🔣', category: 'encoding', rarity: 'common', description: 'A base-16 numeral system often used to represent binary data in a more compact, human-readable form.' },
  { id: 'word', name: 'Word', emoji: '🔠', category: 'encoding', rarity: 'uncommon', description: 'The natural unit of data a processor handles at once, typically a fixed number of bytes.' },
  { id: 'ascii', name: 'ASCII', emoji: '🔡', category: 'encoding', rarity: 'uncommon', milestone: '1963', description: 'A character-encoding standard that maps letters, digits, and symbols to numeric byte values.' },
  { id: 'char', name: 'Character', emoji: '🔤', category: 'encoding', rarity: 'common', description: 'A single textual symbol — a letter, digit, or punctuation mark — stored as an encoded numeric value.' },
  { id: 'string', name: 'String', emoji: '🧶', category: 'encoding', rarity: 'uncommon', description: 'An ordered sequence of characters used to represent text in a program.' },
  { id: 'data', name: 'Data', emoji: '🧾', category: 'encoding', rarity: 'uncommon', description: 'Raw facts and values stored or processed by a computer, encoded as bytes.' },
  { id: 'opcode', name: 'Opcode', emoji: '🏷️', category: 'encoding', rarity: 'uncommon', description: 'The portion of a machine instruction that specifies the operation to be performed.' },
  { id: 'machine-code', name: 'Machine Code', emoji: '🤖', category: 'encoding', rarity: 'uncommon', milestone: '1949', description: "The lowest-level set of instructions a computer's processor can execute directly." },
  { id: 'mnemonic', name: 'Mnemonic', emoji: '💬', category: 'encoding', rarity: 'uncommon', description: 'A short, memorable abbreviation used to represent a machine instruction in assembly language.' },
  { id: 'assembly-language', name: 'Assembly Language', emoji: '📝', category: 'encoding', rarity: 'rare', milestone: '1947', description: "A low-level language that uses mnemonics to represent a processor's machine instructions one-to-one." },
  { id: 'memory-address', name: 'Memory Address', emoji: '📍', category: 'encoding', rarity: 'uncommon', description: "A unique identifier denoting a specific location in a computer's memory." },
  { id: 'bytecode', name: 'Bytecode', emoji: '🧷', category: 'encoding', rarity: 'rare', description: 'A compact, portable instruction format executed by a virtual machine rather than directly by hardware.' },
]
