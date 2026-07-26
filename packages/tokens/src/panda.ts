import {
  semanticColors,
  semanticRadii,
  semanticShadows,
  semanticSpacing,
  tokens,
} from "./theme.js";
import type { ModeValue } from "./theme.js";

const themed = ({ dark, light }: ModeValue) => ({
  value: { _light: light, base: dark },
});

export const astilbaPreset = {
  conditions: {
    extend: {
      dark: ':root:not([data-theme="light"]) &',
      endingStyle: "&[data-ending-style]",
      light: ':root[data-theme="light"] &',
      reducedMotion: "@media (prefers-reduced-motion: reduce)",
      startingStyle: "&[data-starting-style]",
    },
  },
  name: "@astilba/tokens",
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          accent: {
            DEFAULT: themed(semanticColors.accent.DEFAULT),
            high: themed(semanticColors.accent.high),
            low: themed(semanticColors.accent.low),
          },
          border: {
            DEFAULT: themed(semanticColors.border.DEFAULT),
            chrome: themed(semanticColors.border.chrome),
            control: themed(semanticColors.border.control),
            guide: themed(semanticColors.border.guide),
            overlay: themed(semanticColors.border.overlay),
            strong: themed(semanticColors.border.strong),
            structure: themed(semanticColors.border.structure),
            subtle: themed(semanticColors.border.subtle),
          },
          canvas: themed(semanticColors.canvas),
          ink: {
            control: themed(semanticColors.ink.control),
            default: themed(semanticColors.ink.default),
            faint: themed(semanticColors.ink.faint),
            inverse: themed(semanticColors.ink.inverse),
            muted: themed(semanticColors.ink.muted),
            onBanner: themed(semanticColors.ink.onBanner),
            onPrimary: themed(semanticColors.ink.onPrimary),
            secondary: themed(semanticColors.ink.secondary),
            strong: themed(semanticColors.ink.strong),
            subtle: themed(semanticColors.ink.subtle),
          },
          link: {
            DEFAULT: themed(semanticColors.link.DEFAULT),
            hover: themed(semanticColors.link.hover),
          },
          signal: themed(semanticColors.signal),
          surface: {
            action: {
              primary: themed(semanticColors.surface.action.primary),
              primaryHover: themed(semanticColors.surface.action.primaryHover),
            },
            banner: themed(semanticColors.surface.banner),
            chrome: themed(semanticColors.surface.chrome),
            codeBlock: themed(semanticColors.surface.codeBlock),
            copy: {
              DEFAULT: themed(semanticColors.surface.copy.DEFAULT),
              hover: themed(semanticColors.surface.copy.hover),
              pressed: themed(semanticColors.surface.copy.pressed),
            },
            elevated: themed(semanticColors.surface.elevated),
            highlight: themed(semanticColors.surface.highlight),
            hover: themed(semanticColors.surface.hover),
            inlineCode: themed(semanticColors.surface.inlineCode),
            kbd: themed(semanticColors.surface.kbd),
            pressed: themed(semanticColors.surface.pressed),
            quiet: themed(semanticColors.surface.quiet),
            recessed: themed(semanticColors.surface.recessed),
            scrim: themed(semanticColors.surface.scrim),
            selected: themed(semanticColors.surface.selected),
            selection: themed(semanticColors.surface.selection),
            subtle: themed(semanticColors.surface.subtle),
          },
        },
        radii: {
          elevated: { value: semanticRadii.elevated },
        },
        shadows: {
          elevated: themed(semanticShadows.elevated),
          overlay: themed(semanticShadows.overlay),
        },
        spacing: {
          elevatedInset: { value: semanticSpacing.elevatedInset },
          menuInset: { value: semanticSpacing.menuInset },
          tocInset: { value: semanticSpacing.tocInset },
        },
      },
      tokens: {
        blurs: {
          chrome: { value: tokens.blurs.chrome },
          disclosure: { value: tokens.blurs.disclosure },
          iconSwap: { value: tokens.blurs.iconSwap },
        },
        durations: {
          control: { value: tokens.durations.control },
          disclosure: { value: tokens.durations.disclosure },
          fast: { value: tokens.durations.fast },
          iconSwap: { value: tokens.durations.iconSwap },
          instant: { value: tokens.durations.instant },
          menuClose: { value: tokens.durations.menuClose },
          menuOpen: { value: tokens.durations.menuOpen },
          modalClose: { value: tokens.durations.modalClose },
          modalOpen: { value: tokens.durations.modalOpen },
          tooltipClose: { value: tokens.durations.tooltipClose },
          tooltipOpen: { value: tokens.durations.tooltipOpen },
        },
        easings: {
          inOut: { value: tokens.easings.inOut },
          outExpo: { value: tokens.easings.outExpo },
          outQuint: { value: tokens.easings.outQuint },
        },
        fontWeights: {
          brand: { value: tokens.fontWeights.brand },
          medium: { value: tokens.fontWeights.medium },
          regular: { value: tokens.fontWeights.regular },
          semibold: { value: tokens.fontWeights.semibold },
        },
        fonts: {
          body: { value: tokens.fonts.body },
          heading: { value: tokens.fonts.heading },
          mono: { value: tokens.fonts.mono },
        },
        radii: {
          badge: { value: tokens.radii.badge },
          codeBlock: { value: tokens.radii.codeBlock },
          inlineCode: { value: tokens.radii.inlineCode },
        },
        shadows: {
          none: { value: tokens.shadows.none },
        },
      },
    },
  },
};
