# Astilba UI

Astilba's public interface foundation and design system.

The repository contains two intentionally small packages:

- `@astilba/tokens` — semantic CSS variables and a Panda CSS preset.
- `@astilba/ui` — accessible React controls built with Base UI and static CSS.

Both packages are public. The private showcase app is a visual test harness, not a separate documentation product.

## Packages

```sh
pnpm add @astilba/tokens
pnpm add @astilba/ui @astilba/tokens
```

See the package guides for the supported entrypoints and integration examples:

- [`@astilba/tokens`](packages/tokens/README.md)
- [`@astilba/ui`](packages/ui/README.md)

## Development

```sh
pnpm install
pnpm verify
pnpm dev
```

Agent instructions are canonical in `AGENTS.md`; `CLAUDE.md` is a symbolic link. Checkouts require symbolic-link support. On Windows, enable Developer Mode or use an elevated shell and configure Git to preserve symbolic links before cloning.

Temporary toolchain exceptions are recorded in [`docs/typechecking-exceptions.md`](docs/typechecking-exceptions.md).

Release operators should follow the [release process](docs/releasing.md).
