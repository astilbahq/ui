# Astilba UI

Astilba's public interface foundation and design system.

The repository contains two intentionally small packages:

- `@astilba/tokens` — semantic CSS variables and a Panda CSS preset.
- `@astilba/ui` — accessible React controls built with Base UI and static CSS.

Both packages remain private while the first real Astilba consumer proves the package boundaries. The private showcase app is a visual test harness, not a separate documentation product.

## Development

```sh
pnpm install
pnpm verify
pnpm dev
```

Agent instructions are canonical in `AGENTS.md`; `CLAUDE.md` is a symbolic link. Checkouts require symbolic-link support. On Windows, enable Developer Mode or use an elevated shell and configure Git to preserve symbolic links before cloning.

Temporary toolchain exceptions are recorded in [`docs/typechecking-exceptions.md`](docs/typechecking-exceptions.md).

After the first push, complete the [repository-settings checklist](docs/repository-settings.md).
