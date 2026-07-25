---
type: idea
tags: [code-quality, refactoring, tdd]
created: 2026-06-06T00:00:00
---

# Refactoring Code - 5-Step Plan

A structured approach to refactoring old code:

1. **Pick one messy module** — not the biggest, just one that bugs you.
2. **Map the behaviour** — inputs, key paths, invariants, and side effects.
3. **Characterise** — debug-log the paths and lock them into tests.
4. **Prove** — let the agent mutate and confirm tests scream.
5. **Refactor under TDD** — small, verified steps. Leave it cleaner.
