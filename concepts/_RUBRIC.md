# Concept Taxonomy Rubric

Shared contract for every agent expanding or curating a file in `concepts/`. Read this in
full before editing your assigned file. Apply it consistently — other agents are doing the
same work on sibling files and the results need to feel like one document.

## What this is

`concepts/` is a curated, standalone taxonomy of computer-science concepts. It is the raw
material a future phase will turn into craftable items/recipes for a build-from-bits CS
crafting game (think: combine simpler concepts to discover more advanced ones). **Do not**
think about craftability, recipes, or game mechanics right now — just build the best
taxonomy of CS concepts for this area. That mapping is later work, out of scope here.

The game crafts upward from bits/hardware → software → systems/AI. When in doubt, prefer
concrete, nameable techniques, structures, and artifacts over soft process/cultural topics.

## What a concept node is

A named, recognizable CS idea worth being its own entry — something you could put on a
flashcard with a one-sentence definition. Examples of good leaves: "Binary Search Tree",
"TCP Handshake", "Garbage Collection". Not a leaf: vague restatements of a parent
("Algorithms", "Data") or a sentence-long compound idea — split those into real leaves.

## Structure & formatting

- Keep the existing `## N. Area Name` heading at the top of the file — don't change it.
- Nested markdown bullets, 2-space indent per level (matches existing files 01–10).
- `- **Bold**` for grouping/category headers (organizational, not concepts themselves).
- Plain text for leaves (the actual concepts). Parenthetical examples are fine, e.g.
  `Boosting (AdaBoost, Gradient Boosting, XGBoost)`.
- Reuse the existing top-level groupings in your file where they make sense; add new
  groupings if a cluster of new concepts doesn't fit any existing one.

## Expand-phase inclusion bar (Phase 1)

Be broad. Include anything that appears in a real CS curriculum (undergrad or grad) or is
commonly encountered in industry practice. Maximize coverage — err on the side of adding.

If something feels borderline (very niche/research-only, or only loosely on-theme for a
CS-crafting game), **still include it**, but tag the line with an inline HTML comment so
the later cut phase can judge it deliberately rather than it silently vanishing:

```
  - Robin Hood Hashing <!-- flag: obscure -->
  - Crowdsourcing <!-- flag: off-theme -->
```

Do not delete or rewrite existing entries during the expand phase — only add. If you
spot a clear duplicate of something already in the file, skip adding it again.

## Cut-phase rules (Phase 2)

When curating (not expanding):
- Resolve every `<!-- flag: ... -->` marker: either remove the flag (concept stays, it's
  fine) or remove the whole line (concept goes). No flags should remain when you're done.
- Cut research-only / niche-specialist concepts that almost no working developer or CS
  grad would recognize by name, even unflagged ones you spot.
- Cut anything off-theme for a CS-crafting game (soft process, cultural, or purely
  organizational topics with no concrete technical artifact behind them).
- Trim, don't rewrite: prefer deleting lines over restructuring sections, unless fixing a
  duplicate or miscategorization.

## Canonical placement & dedup

Each concept gets exactly **one** home file/section — wherever it most naturally belongs.
If a concept clearly belongs to another area (e.g. "Merkle Tree" → security/crypto, not
data structures), don't add it to your file even if it would technically fit — leave a
short mental note but only act on your assigned file. The cross-cutting dedup pass (a
separate, later step with a global view) handles actually moving/removing duplicates
across files — don't try to fix other files yourself.

## Scope discipline

- Only edit your assigned file. Never touch other files in `concepts/`.
- Don't add explanatory prose, descriptions, or commentary — this is a structured list,
  not an essay. The structure and naming *is* the content.
