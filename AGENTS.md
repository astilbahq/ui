# ui

Astilba's interface foundation and design system.

## Ground rules

1. Run `pnpm verify` before proposing a commit.
2. Add or update tests for observable behaviour.
3. Keep dependencies and GitHub Actions exactly pinned. Update the lockfile with dependency changes.
4. Do not weaken type, lint, test, packaging, or security gates to make a change pass.
5. Never commit credentials, local environment files, deployment identifiers, or private URLs.
6. Keep changes focused and preserve unrelated work in a dirty worktree.
7. Prefer deterministic behaviour and explicit inputs over ambient time, randomness, or machine state.
