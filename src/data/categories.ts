import type { Category } from '@/types'

export const CATEGORY_ORDER: Category[] = [
  'elements',
  'hardware',
  'architecture',
  'encoding',
  'concepts',
  'languages',
  'datastructures',
  'algorithms',
  'databases',
  'web',
  'os',
  'software-eng',
  'security',
  'ai-ml',
  'theory',
  'capstone',
]

export const CATEGORY_LABELS: Record<Category, string> = {
  elements: 'Elements',
  hardware: 'Hardware',
  architecture: 'Architecture',
  encoding: 'Encoding',
  concepts: 'Concepts',
  languages: 'Languages',
  datastructures: 'Data Structures',
  algorithms: 'Algorithms',
  databases: 'Databases',
  web: 'Web & Networking',
  os: 'Operating Systems',
  'software-eng': 'Software Engineering',
  security: 'Security & Crypto',
  'ai-ml': 'AI & Machine Learning',
  theory: 'Theory of Computation',
  capstone: 'Capstone',
}
