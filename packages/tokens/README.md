# `@astilba/tokens`

Framework-neutral semantic tokens for Astilba interfaces.

The package is private while its first real consumer proves the contract.

## Static CSS

Import the variables once near the root of an application:

```ts
import "@astilba/tokens/css";
```

Dark mode is the default. Set `data-theme="light"` on the document element to apply the light values.

## Panda CSS

Add the preset after Panda's base preset and use the `astilba` prefix:

```ts
import { defineConfig } from "@pandacss/dev";
import presetBase from "@pandacss/preset-base";
import { astilbaPreset } from "@astilba/tokens/panda";

export default defineConfig({
  prefix: "astilba",
  preflight: false,
  presets: [presetBase, astilbaPreset],
});
```
