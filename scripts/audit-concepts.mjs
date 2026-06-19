// Cross-checks concepts/*.md checkbox state against actual src/data/items content.
// A "[x]" line claims the concept is implemented as a craftable item — this verifies
// that claim instead of trusting it, since the taxonomy and the game data can drift
// apart silently as items get renamed/merged/removed.
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const itemsDir = path.join(root, '..', 'src', 'data', 'items')
const conceptsDir = path.join(root, '..', 'concepts')

const ITEM_RE = /id:\s*'([^']+)'[^}]*?name:\s*'((?:[^'\\]|\\.)*)'/g

const itemsById = new Map()
for (const file of readdirSync(itemsDir).filter((f) => f.endsWith('.ts') && f !== 'index.ts')) {
  const text = readFileSync(path.join(itemsDir, file), 'utf8')
  for (const m of text.matchAll(ITEM_RE)) itemsById.set(m[1], { name: m[2].replace(/\\'/g, "'"), file })
}

// English plurals are irregular enough ("semaphores"/"semaphore" vs "caches"/"cache") that a
// single stem is unreliable - instead expand each word into every plausible singular spelling
// and treat a match as a hit if any of them coincide with any form of the candidate word.
function wordForms(word) {
  const forms = new Set([word])
  if (word.endsWith('ies') && word.length > 4) forms.add(word.slice(0, -3) + 'y')
  if (word.endsWith('es')) forms.add(word.slice(0, -2))
  if (word.endsWith('s') && !word.endsWith('ss')) forms.add(word.slice(0, -1))
  return forms
}

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
}

function wordsMatch(a, b) {
  if (a === b) return true
  for (const fa of wordForms(a)) for (const fb of wordForms(b)) if (fa === fb) return true
  return false
}

const itemWordLists = [...itemsById.values()].map((v) => normalize(v.name))

/** Fraction of the concept's significant words that appear in the best-matching item name. */
function bestOverlapScore(conceptText) {
  const mainWords = normalize(conceptText.split('(')[0]).filter((w) => w.length > 2)
  if (mainWords.length === 0) return 1 // too short/symbolic to judge, don't flag
  let best = 0
  for (const itemWords of itemWordLists) {
    let overlap = 0
    for (const w of mainWords) if (itemWords.some((iw) => wordsMatch(w, iw))) overlap++
    best = Math.max(best, overlap / mainWords.length)
  }
  return best
}

const LINE_RE = /^(\s*)-\s*\[( |x)\]\s*(.+)$/
const ID_COMMENT_RE = /implemented as '([^']+)'/

const missingIdRefs = []
const unverified = []

for (const file of readdirSync(conceptsDir).filter((f) => f.endsWith('.md') && f !== '_RUBRIC.md')) {
  const lines = readFileSync(path.join(conceptsDir, file), 'utf8').split('\n')
  for (const [i, line] of lines.entries()) {
    const m = line.match(LINE_RE)
    if (!m || m[2] !== 'x') continue
    const [, , , rest] = m
    const commentSplit = rest.split('<!--')
    const conceptText = commentSplit[0].trim()
    const comment = commentSplit[1] ?? ''

    const idMatch = comment.match(ID_COMMENT_RE)
    if (idMatch) {
      if (!itemsById.has(idMatch[1])) {
        missingIdRefs.push(`${file}:${i + 1} "${conceptText}" -> claims id '${idMatch[1]}' which does not exist`)
      }
      continue
    }
    // Any other comment (e.g. "merged into X above", "covered by Y") is an explicit
    // human justification for the checkmark - trust it rather than re-deriving it.
    if (comment.trim()) continue

    const score = bestOverlapScore(conceptText)
    if (score < 0.5) {
      unverified.push(`${file}:${i + 1} "${conceptText}" (overlap ${score.toFixed(2)})`)
    }
  }
}

console.log(`Scanned ${itemsById.size} items.\n`)

console.log(`Stale id references (${missingIdRefs.length}):`)
for (const e of missingIdRefs) console.log(`  - ${e}`)

console.log(`\nChecked-off concepts with no plausible matching item, need manual review (${unverified.length}):`)
for (const e of unverified) console.log(`  - ${e}`)
