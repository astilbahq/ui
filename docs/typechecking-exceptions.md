# Type-checking exceptions

## Panda CSS declarations under TypeScript 6

`packages/ui` and `apps/showcase` set `skipLibCheck` because Panda CSS 1.11.5's generated declarations import `@pandacss/types`, whose public index contains duplicate re-exports under TypeScript 6.0.3.

The exception is deliberately local to the Panda-consuming workspaces. Astilba source remains strictly type-checked, and both publishable packages must pass their builds, Publint, and Are the Types Wrong before a commit is proposed.

Remove the exception once the pinned Panda release type-checks successfully under the pinned TypeScript release.
