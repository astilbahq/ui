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

The component stylesheet contains recipe defaults only. Consumer Panda utilities remain later in the `astilba` layer order and can override those defaults without specificity workarounds.
