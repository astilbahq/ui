import { defineConfig, defineRecipe } from "@pandacss/dev";
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
  theme: {
    extend: {
      recipes: {
        control: defineRecipe({
          base: {
            _active: {
              background: "surface.pressed",
            },
            _disabled: {
              background: "transparent",
              color: "ink.muted",
              cursor: "default",
              opacity: 0.5,
            },
            _focusVisible: {
              background: "surface.hover",
              color: "ink.strong",
              outlineColor: "signal",
              outlineOffset: "-0.125rem",
              outlineStyle: "solid",
              outlineWidth: "0.125rem",
            },
            _hover: {
              background: "surface.hover",
              color: "ink.strong",
            },
            _reducedMotion: {
              transitionDuration: "instant",
            },
            alignItems: "center",
            background: "transparent",
            blockSize: "2rem",
            borderRadius: 0,
            borderWidth: 0,
            color: "ink.muted",
            cursor: "pointer",
            display: "inline-flex",
            fontFamily: "body",
            fontSize: "0.8125rem",
            fontWeight: "medium",
            gap: "0.4375rem",
            justifyContent: "center",
            lineHeight: 1,
            minInlineSize: "2rem",
            paddingInline: "0.625rem",
            position: "relative",
            textDecoration: "none",
            transitionDuration: "fast",
            transitionProperty:
              "background-color, border-color, color, opacity",
            transitionTimingFunction: "outExpo",
            whiteSpace: "nowrap",
          },
          className: "control",
          compoundVariants: [
            {
              css: {
                inlineSize: "2.5rem",
              },
              iconOnly: true,
              size: "large",
            },
          ],
          defaultVariants: {
            appearance: "ghost",
            size: "default",
          },
          staticCss: ["*"],
          // oxlint-disable-next-line sort-keys -- Variant order is the compiled cascade contract.
          variants: {
            appearance: {
              ghost: {},
              outline: {
                borderColor: "border.control",
                borderStyle: "solid",
                borderWidth: "1px",
              },
              primary: {
                "&::selection, & *::selection": {
                  background: "ink.onPrimary",
                  color: "surface.action.primary",
                },
                _active: {
                  background: "surface.action.primaryHover",
                  borderColor: "surface.action.primaryHover",
                  color: "ink.onPrimary",
                  opacity: 0.88,
                },
                _focusVisible: {
                  background: "surface.action.primaryHover",
                  borderColor: "surface.action.primaryHover",
                  color: "ink.onPrimary",
                },
                _hover: {
                  background: "surface.action.primaryHover",
                  borderColor: "surface.action.primaryHover",
                  color: "ink.onPrimary",
                },
                background: "surface.action.primary",
                borderColor: "surface.action.primary",
                borderStyle: "solid",
                borderWidth: "1px",
                color: "ink.onPrimary",
              },
            },
            size: {
              default: {},
              large: {
                blockSize: "2.5rem",
                paddingInline: "0.875rem",
              },
            },
            // Keep icon-only padding after size so it overrides large-size
            // padding. The compound variant above retains the 2.5rem width.
            iconOnly: {
              true: {
                inlineSize: "2rem",
                paddingInline: 0,
              },
            },
          },
        }),
      },
    },
  },
  validation: "error",
});
