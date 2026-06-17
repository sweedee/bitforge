export type DragPayload =
  | { kind: 'sidebar'; itemId: string }
  | { kind: 'canvas-token'; instanceId: string; itemId: string; x: number; y: number }

export type DropPayload =
  | { kind: 'canvas-dropzone' }
  | { kind: 'canvas-token'; instanceId: string; itemId: string; x: number; y: number }
