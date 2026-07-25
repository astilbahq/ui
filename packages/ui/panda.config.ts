import { defineConfig } from "@pandacss/dev";
import presetBase from "@pandacss/preset-base";

import { astilbaPreset } from "../tokens/src/panda";

export default defineConfig({
  clean: true,
  cssVarRoot: ":root",
  exclude: ["./dist/**", "./styled-system/**"],
  hash: false,
  include: ["./src/**/*.{ts,tsx}"],
  jsxFramework: "react",
  layers: {
    base: "astilba.base",
    recipes: "astilba.recipes",
    reset: "astilba.reset",
    tokens: "astilba.tokens",
    utilities: "astilba.utilities",
  },
  outdir: "styled-system",
  prefix: "astilba",
  preflight: false,
  presets: [presetBase, astilbaPreset],
  validation: "error",
});
