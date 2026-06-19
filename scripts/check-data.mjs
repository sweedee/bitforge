// Static validation of src/data/items and src/data/recipes, run before build so
// data-graph bugs (dangling ids, duplicate recipe pairs, unreachable items) are
// caught without needing the app to boot in a browser.
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const itemsDir = path.join(root, '..', 'src', 'data', 'items')
const recipesDir = path.join(root, '..', 'src', 'data', 'recipes')

function tsFiles(dir) {
  return readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'index.ts')
}

const ID_RE = /id:\s*'([^']+)'/g
const STARTER_RE = /id:\s*'([^']+)'[^}]*?isStarter:\s*true/g
const RECIPE_RE = /inputs:\s*\[\s*'([^']+)'\s*,\s*'([^']+)'\s*\]\s*,\s*result:\s*'([^']+)'/g

const itemIds = new Set()
const starterIds = new Set()
for (const file of tsFiles(itemsDir)) {
  const text = readFileSync(path.join(itemsDir, file), 'utf8')
  for (const m of text.matchAll(ID_RE)) {
    if (itemIds.has(m[1])) errors.push(`Duplicate item id "${m[1]}" (seen again in ${file})`)
    itemIds.add(m[1])
  }
  for (const m of text.matchAll(STARTER_RE)) starterIds.add(m[1])
}

const errors = []
const recipes = []
for (const file of tsFiles(recipesDir)) {
  const text = readFileSync(path.join(recipesDir, file), 'utf8')
  for (const m of text.matchAll(RECIPE_RE)) {
    recipes.push({ a: m[1], b: m[2], result: m[3], file })
  }
}

const seenPairs = new Map()
for (const { a, b, result, file } of recipes) {
  if (!itemIds.has(a)) errors.push(`${file}: recipe input "${a}" is not a known item id`)
  if (!itemIds.has(b)) errors.push(`${file}: recipe input "${b}" is not a known item id`)
  if (!itemIds.has(result)) errors.push(`${file}: recipe result "${result}" is not a known item id`)

  const key = [a, b].sort().join('+')
  if (seenPairs.has(key)) {
    const prev = seenPairs.get(key)
    errors.push(
      `Duplicate recipe pair "${key}": ${prev.file} -> ${prev.result} conflicts with ${file} -> ${result}`,
    )
  } else {
    seenPairs.set(key, { file, result })
  }
}

// Reachability: every item must be craftable from a starter via some chain of recipes.
const reachable = new Set(starterIds)
let changed = true
while (changed) {
  changed = false
  for (const { a, b, result } of recipes) {
    if (reachable.has(a) && reachable.has(b) && !reachable.has(result)) {
      reachable.add(result)
      changed = true
    }
  }
}
const orphans = [...itemIds].filter((id) => !reachable.has(id))
if (orphans.length > 0) {
  errors.push(`Unreachable items (no path from starters): ${orphans.join(', ')}`)
}

if (errors.length > 0) {
  console.error(`\n✗ Data validation failed (${errors.length} issue${errors.length > 1 ? 's' : ''}):\n`)
  for (const e of errors) console.error(`  - ${e}`)
  console.error('')
  process.exit(1)
}

console.log(`✓ Data validation passed: ${itemIds.size} items, ${recipes.length} recipes, 0 issues.`)
