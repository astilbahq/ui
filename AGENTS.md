# Astilba UI

Astilba's public interface foundation. The repository is a pnpm monorepo:

- `packages/tokens` owns framework-neutral semantic tokens, static CSS, and the Panda preset.
- `packages/ui` owns React components built with Base UI and statically extracted Panda CSS.
- `apps/showcase` is the private visual and accessibility test harness.

## Ground rules

1. Run `pnpm verify` before proposing a commit.
2. Add or update tests for observable behaviour.
3. Keep dependencies and GitHub Actions exactly pinned. Update the lockfile with dependency changes.
4. Do not weaken type, lint, test, packaging, or security gates to make a change pass.
5. Never commit credentials, local environment files, deployment identifiers, or private URLs.
6. Keep changes focused and preserve unrelated work in a dirty worktree.
7. Prefer deterministic behaviour and explicit inputs over ambient time, randomness, or machine state.
8. Keep tokens framework-neutral. React and Panda belong in `@astilba/ui`, not in the CSS-only consumption path.
9. Links that look like buttons remain anchors. Do not route them through the Base UI Button primitive.
10. Use logical CSS properties and preserve visible focus, reduced-motion, and WCAG 2.2 AA behaviour.
