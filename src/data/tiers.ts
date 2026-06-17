import type { Tier } from '@/types'

export const TIER_ORDER: Tier[] = [
  'elements',
  'logic',
  'circuits',
  'architecture',
  'lowlevel',
  'languages-low',
  'languages-high',
  'paradigms',
  'datastructures',
  'algorithms',
  'capstone',
]

export const TIER_LABELS: Record<Tier, string> = {
  elements: 'Elements',
  logic: 'Logic',
  circuits: 'Circuits',
  architecture: 'Architecture',
  lowlevel: 'Low-Level',
  'languages-low': 'Low-Level Languages',
  'languages-high': 'High-Level Languages',
  paradigms: 'Paradigms',
  datastructures: 'Data Structures',
  algorithms: 'Algorithms',
  capstone: 'Capstone',
}
