export interface GridPosition {
  x: number
  y: number
}

/** Evenly spreads `count` items across a 10–90% grid, centered when a row/column has only one slot. */
export function computeGridPositions(count: number): GridPosition[] {
  if (count === 0) return []
  const cols = Math.max(1, Math.ceil(Math.sqrt(count)))
  const rows = Math.max(1, Math.ceil(count / cols))
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    return {
      x: cols === 1 ? 50 : 10 + (col / (cols - 1)) * 80,
      y: rows === 1 ? 50 : 10 + (row / (rows - 1)) * 80,
    }
  })
}
