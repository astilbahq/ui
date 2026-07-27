---
name: Astilba UI
description: Compact, border-led interface primitives with quiet monochrome surfaces and precise state.
colors:
  canvas-dark: "#121212"
  canvas-light: "#fdfdfd"
  ink-dark: "#ffffff"
  ink-light: "#0d0d0d"
  muted-dark: "rgba(202, 202, 202, 0.7)"
  muted-light: "#6c6c6c"
  signal-dark: "oklch(0.72 0.17 32)"
  signal-light: "oklch(0.55 0.19 32)"
  primary-dark: "#ffffff"
  primary-light: "#0d0d0d"
  on-primary-dark: "#0d0d0d"
  on-primary-light: "#ffffff"
typography:
  heading:
    fontFamily: "Inter Variable, ui-sans-serif, sans-serif"
    fontWeight: 500
  body:
    fontFamily: "Geist Variable, ui-sans-serif, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontWeight: 400
rounded:
  control: "0px"
  elevated: "0px"
  inline-code: "6px"
spacing:
  control-default-inline: "10px"
  control-large-inline: "14px"
  elevated-inset: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.on-primary-dark}"
    rounded: "{rounded.control}"
    padding: "0 10px"
    height: "32px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted-dark}"
    rounded: "{rounded.control}"
    padding: "0 10px"
    height: "32px"
  button-large:
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "40px"
  icon-button-large:
    rounded: "{rounded.control}"
    padding: "0"
    height: "40px"
    width: "40px"
---

# Design System: Astilba UI

## Overview

**Creative North Star: "Quiet Precision"**

Astilba UI is a compact, border-led system that recedes behind the product task. Its nearly monochrome surfaces, square geometry, restrained motion, and exact alignment create hierarchy without decorative noise. A warm signal accent appears only when focus or meaningful state needs to be unmistakable.

The library owns semantic theme roles and common control behaviour. Consumers still own their reset, typography scale, layout, content, and application architecture.

**Key Characteristics:**

- Compact controls with explicit 32px and 40px size contracts
- Flat, square geometry instead of rounded card language
- Semantic light and dark roles rather than consumer-facing raw palettes
- Quiet default states with clear hover, active, disabled, and keyboard focus
- Static CSS with no runtime styling engine

## Colors

Dark mode is the default; light mode is activated with `data-theme="light"` on the document element. The public contract is the semantic CSS variable, while the values below describe its current expression.

### Primary

- **Signal ember** (`oklch(0.72 0.17 32)` dark, `oklch(0.55 0.19 32)` light): reserved for focus and meaningful state.

### Neutral

- **Dark canvas** (`#121212`) and **light canvas** (`#fdfdfd`): page foundations.
- **Dark ink** (`#ffffff`) and **light ink** (`#0d0d0d`): primary content.
- **Muted dark ink** (`rgba(202, 202, 202, 0.7)`) and **muted light ink** (`#6c6c6c`): secondary labels and resting controls.
- **Primary action** (`#ffffff` dark, `#0d0d0d` light): the one high-contrast action surface.

**The Signal Rarity Rule.** Warm color communicates focus or state; it is not ambient decoration.

## Typography

- **Display Font:** Inter Variable with a system sans-serif fallback
- **Body Font:** Geist Variable with a system sans-serif fallback
- **Label/Mono Font:** JetBrains Mono Variable with a system monospace fallback

The package supplies families and weights as tokens, not a global typographic scale. Controls use the body family at `0.8125rem`, weight 500, and line-height 1. Consumers choose their own reading and display hierarchy.

## Layout

Controls are dense by design: default controls are 32px high and large controls are 40px high. Default inline padding is 10px, large inline padding is 14px, and icon-only controls remove inline padding while retaining their square size. Use logical CSS properties so the contract holds in either inline direction.

The package does not own containers, grids, breakpoints, or page composition. The showcase demonstrates the system; it does not make its editorial layout part of the public component contract.

## Elevation & Depth

Interfaces are flat by default. Borders and tonal surface changes establish most hierarchy. Elevated surfaces use the semantic `shadows.elevated` role only when an element genuinely leaves the page plane, such as a tooltip or overlay.

**The Flat-by-Default Rule.** Do not add a shadow to compensate for weak grouping; first use spacing, structure, and the correct semantic surface.

## Shapes

Controls, elevated surfaces, and code blocks are square. Inline code is the narrow exception, using a 6px radius to distinguish a small textual token without introducing rounded-card language.

## Components

### Buttons

- **Shape:** square, 32px default height or 40px large height.
- **Primary:** high-contrast action surface with inverse ink.
- **Outline:** transparent surface with the semantic control border.
- **Ghost:** transparent at rest with muted ink.
- **Hover / Active:** quiet semantic surface changes; primary actions remain high contrast.
- **Focus:** a 2px signal outline drawn inside the control.
- **Disabled:** non-interactive with a default cursor and 50% opacity; each appearance remains recognizable.

### Icon Buttons

- **Shape:** square with equal block and inline dimensions.
- **Content:** the accessible name is mandatory and remains independent of the visible glyph.
- **Sizing:** consumers size the glyph; the showcase uses 16px in default controls and 18px in large controls.

### Tooltips

- **Surface:** semantic elevated background, elevated shadow, compact 6px by 8px padding.
- **Motion:** 150ms exponential ease-out on entry and 50ms on exit.
- **Reduced motion:** removes the transition without removing the state change.
- **Feedback:** idle and active labels share one grid area so copy feedback never shifts layout.

## Do's and Don'ts

### Do:

- **Do** use semantic roles such as `ink.muted`, `surface.hover`, and `border.control`.
- **Do** preserve native button and anchor semantics.
- **Do** test the computed browser result, not only generated class names.
- **Do** give every interaction an intentional hover, focus, active, disabled, and reduced-motion state where applicable.
- **Do** add components only after repeated product use proves a shared contract.

### Don't:

- **Don't** expose a raw color scale as the public styling API.
- **Don't** add radii, shadows, or warm accent as generic decoration.
- **Don't** route anchors through the Base UI button primitive.
- **Don't** make product layout, routing, or application state part of this package.
- **Don't** rely on source-order assumptions without a browser-level contract test.
