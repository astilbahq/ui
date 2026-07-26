# `@astilba/ui`

Accessible React controls for Astilba products, built with Base UI and statically extracted Panda CSS.

## Installation

```sh
pnpm add @astilba/ui @astilba/tokens
```

React and React DOM are peer dependencies.

## Usage

Import the framework-neutral tokens and component styles once:

```ts
import "@astilba/tokens/css";
import "@astilba/ui/styles.css";
```

Then use the components from React:

```tsx
import { Button, LinkButton, Tooltip, TooltipProvider } from "@astilba/ui";

export const Actions = () => (
  <TooltipProvider>
    <Button appearance="primary">Continue</Button>
    <LinkButton href="/docs">Read the docs</LinkButton>
    <Tooltip label="More information">
      <Button>Details</Button>
    </Tooltip>
  </TooltipProvider>
);
```

Links remain native anchors. `Button` uses Base UI's button primitive and defaults to `type="button"`.

Component subpaths are also available when a consumer needs the narrowest possible server or browser module graph:

```tsx
import { LinkButton } from "@astilba/ui/link-button";
import { Tooltip, TooltipProvider } from "@astilba/ui/tooltip";
```

The root entry remains tree-shakeable. Component JavaScript contains no Panda runtime; Panda generates the static class contract and stylesheet at build time.

The component stylesheet contains recipe defaults only. Consumer Panda utilities remain later in the `astilba` layer order and can override those defaults without specificity workarounds.

## Astro

Install and configure Astro's official React integration before importing these components. Astro can then server-render them without a client directive when native HTML behaviour is sufficient:

```astro
---
import { LinkButton } from "@astilba/ui/link-button";
---

<LinkButton href="/docs">Read the docs</LinkButton>
```

Add an Astro client directive when a component needs React-managed browser behaviour, including state, event handlers, effects, context, or an interactive primitive such as `Tooltip`. Server-rendered controls can also be enhanced by a separate Astro or vanilla browser script without hydrating React.

## Compatibility

- The package is ESM-only.
- Supported React and React DOM versions are declared as peer dependencies.
- Consumers own their reset, fonts, layout, routing, and application state.
- Import `@astilba/tokens/css` and `@astilba/ui/styles.css` once for the complete component styling contract.
