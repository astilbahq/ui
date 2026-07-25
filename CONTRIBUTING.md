# Contributing

Thanks for considering a contribution to ui.

Open an issue before investing in a substantial change. Keep pull requests focused and use a [Conventional Commit](https://www.conventionalcommits.org/) title.

## Local setup

```sh
pnpm install
pnpm verify
```

The repository pins Node.js and pnpm versions. Run `pnpm install` again after dependency changes and commit the resulting `pnpm-lock.yaml`.

## Pull requests

- Add or update tests for observable behaviour.
- Keep generated files and lockfiles in sync with their sources.
- Run `pnpm verify` before opening the pull request.
- Explain any security, compatibility, or migration impact in the description.
