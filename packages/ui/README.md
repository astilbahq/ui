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
import {
  Button,
  Collapsible,
  LinkButton,
  Menu,
  ScrollArea,
  Tooltip,
  TooltipProvider,
} from "@astilba/ui";

export const Actions = () => (
  <TooltipProvider>
    <Button appearance="primary">Continue</Button>
    <LinkButton href="/docs">Read the docs</LinkButton>
    <Tooltip label="More information">
      <Button>Details</Button>
    </Tooltip>
    <Collapsible.Root>
      <Collapsible.Trigger>Deployment details</Collapsible.Trigger>
      <Collapsible.Panel>Deployed from a verified artifact.</Collapsible.Panel>
    </Collapsible.Root>
    <Menu.Root>
      <Menu.Trigger>More actions</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item label="Refresh">Refresh</Menu.Item>
            <Menu.LinkItem href="/docs" label="Read the docs">
              Read the docs
            </Menu.LinkItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
    <ScrollArea.Root>
      <ScrollArea.Viewport fade="block">
        <ScrollArea.Content>{/* Scrollable content */}</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  </TooltipProvider>
);
```

Links remain native anchors. `Button` uses Base UI's button primitive and defaults to `type="button"`.

Component subpaths are also available when a consumer needs the narrowest possible server or browser module graph:

```tsx
import { LinkButton } from "@astilba/ui/link-button";
import { Collapsible } from "@astilba/ui/collapsible";
import { Menu } from "@astilba/ui/menu";
import { ScrollArea } from "@astilba/ui/scroll-area";
import { Tooltip, TooltipProvider } from "@astilba/ui/tooltip";
```

The root entry remains tree-shakeable. Component JavaScript contains no Panda runtime; Panda generates the static class contract and stylesheet at build time.

The component stylesheet contains recipe defaults only. Consumer Panda utilities remain later in the `astilba` layer order and can override those defaults without specificity workarounds.

`Collapsible.Panel` owns only the disclosure transition. Consumers retain their own trigger presentation, content layout, chevrons, and state persistence. Set the panel transition to `none` in a consumer class while restoring persisted state to avoid animating initialization. Keep padding and borders on a child of the measured panel so its closed block size can reach zero cleanly.

`ScrollArea` owns overflow-edge feedback, focus treatment, and a scrollbar that appears on hover, focus, or active scrolling. Pass `fade="block"` to `ScrollArea.Viewport` for a vertical edge fade, and set `direction="rtl"` on `ScrollArea.Root` when the scroll coordinates follow right-to-left reading order. Consumers retain sizing, content layout, overscroll policy, and scroll-position persistence. Include `ScrollArea.Content` whenever horizontal overflow is possible.

## Astro

Install and configure Astro's official React integration before importing these components. Astro can then server-render them without a client directive when native HTML behaviour is sufficient:

```astro
---
import { LinkButton } from "@astilba/ui/link-button";
---

<LinkButton href="/docs">Read the docs</LinkButton>
```

Add an Astro client directive when a component needs React-managed browser behaviour, including state, event handlers, effects, context, or an interactive primitive such as `Menu`, `ScrollArea`, or `Tooltip`. `ScrollArea` needs hydration before it can measure overflow, update edge signals, and position its thumb. Server-rendered controls can also be enhanced by a separate Astro or vanilla browser script without hydrating React.

## Compatibility

- The package is ESM-only.
- Supported React and React DOM versions are declared as peer dependencies.
- Consumers own their reset, fonts, layout, routing, and application state.
- Import `@astilba/tokens/css` and `@astilba/ui/styles.css` once for the complete component styling contract.
- Base UI writes inline geometry for positioned or measured primitives, including `ScrollArea`. Strict CSP consumers must account for those style attributes in `style-src-attr`. `ScrollArea` disables Base UI's inline scrollbar-hiding style element and ships the equivalent rule in the static component stylesheet.
