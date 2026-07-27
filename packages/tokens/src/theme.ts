export interface ModeValue {
  readonly dark: string;
  readonly light: string;
}

const modeValue = (dark: string, light: string): ModeValue => ({
  dark,
  light,
});

export const tokens = {
  blurs: {
    chrome: "0.75rem",
    disclosure: "2px",
    iconSwap: "2px",
  },
  durations: {
    control: "180ms",
    disclosure: "250ms",
    fast: "160ms",
    iconSwap: "250ms",
    instant: "0.01ms",
    menuClose: "150ms",
    menuOpen: "250ms",
    modalClose: "150ms",
    modalOpen: "250ms",
    tooltipClose: "50ms",
    tooltipOpen: "150ms",
  },
  easings: {
    inOut: "ease-in-out",
    outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
    outQuint: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  fontWeights: {
    brand: "650",
    medium: "500",
    regular: "400",
    semibold: "600",
  },
  fonts: {
    body: '"Geist Variable", ui-sans-serif, sans-serif',
    heading: '"Inter Variable", ui-sans-serif, sans-serif',
    mono: '"JetBrains Mono Variable", ui-monospace, monospace',
  },
  radii: {
    badge: "0.25rem",
    codeBlock: "0",
    inlineCode: "0.375rem",
  },
  shadows: {
    none: "none",
  },
} as const;

export const semanticColors = {
  accent: {
    DEFAULT: modeValue("oklch(0.72 0.17 32)", "oklch(0.55 0.19 32)"),
    high: modeValue("oklch(0.91 0.04 32)", "oklch(0.35 0.13 32)"),
    low: modeValue("oklch(0.22 0.04 32)", "oklch(0.95 0.025 32)"),
  },
  border: {
    DEFAULT: modeValue("rgba(196, 196, 196, 0.08)", "rgba(0, 0, 0, 0.06)"),
    chrome: modeValue("rgba(255, 255, 255, 0.08)", "rgba(0, 0, 0, 0.07)"),
    control: modeValue("rgba(255, 255, 255, 0.12)", "rgba(0, 0, 0, 0.12)"),
    field: modeValue("#767676", "#8f8f8f"),
    guide: modeValue("#767676", "#8f8f8f"),
    overlay: modeValue("rgba(196, 196, 196, 0.08)", "rgba(0, 0, 0, 0.06)"),
    strong: modeValue("rgba(196, 196, 196, 0.08)", "rgba(0, 0, 0, 0.06)"),
    structure: modeValue("rgba(196, 196, 196, 0.08)", "rgba(0, 0, 0, 0.06)"),
    subtle: modeValue("rgba(255, 255, 255, 0.02)", "rgba(0, 0, 0, 0.04)"),
  },
  canvas: modeValue("#121212", "#fdfdfd"),
  ink: {
    control: modeValue("#ededed", "#0d0d0d"),
    default: modeValue("#ffffff", "#0d0d0d"),
    faint: modeValue("#8f8f8f", "#8f8f8f"),
    inverse: modeValue("#121212", "#fdfdfd"),
    muted: modeValue("rgba(202, 202, 202, 0.7)", "#6c6c6c"),
    onBanner: modeValue("#e3e3e3", "#17181c"),
    onPrimary: modeValue("#0d0d0d", "#ffffff"),
    secondary: modeValue("rgba(202, 202, 202, 0.7)", "#6c6c6c"),
    strong: modeValue("#ffffff", "#0d0d0d"),
    subtle: modeValue("#767676", "#767676"),
  },
  link: {
    DEFAULT: modeValue("#ffffff", "#0d0d0d"),
    hover: modeValue("oklch(0.72 0.17 32)", "oklch(0.55 0.19 32)"),
  },
  signal: modeValue("oklch(0.72 0.17 32)", "oklch(0.55 0.19 32)"),
  surface: {
    action: {
      primary: modeValue("#ffffff", "#0d0d0d"),
      primaryHover: modeValue("#e3e3e3", "#2a2a2a"),
    },
    banner: modeValue("rgba(255, 255, 255, 0.04)", "rgba(243, 243, 243, 0.9)"),
    chrome: modeValue("rgba(18, 18, 18, 0.85)", "rgba(255, 255, 255, 0.85)"),
    codeBlock: modeValue("#181818", "#f7f7f7"),
    copy: {
      DEFAULT: modeValue("transparent", "transparent"),
      hover: modeValue("rgba(255, 255, 255, 0.1)", "rgba(0, 0, 0, 0.04)"),
      pressed: modeValue("rgba(255, 255, 255, 0.1)", "rgba(0, 0, 0, 0.06)"),
    },
    elevated: modeValue("#181818", "#ffffff"),
    field: modeValue("#181818", "#ffffff"),
    highlight: modeValue("rgba(255, 255, 255, 0.06)", "rgba(0, 0, 0, 0.02)"),
    hover: modeValue("rgba(255, 255, 255, 0.06)", "rgba(0, 0, 0, 0.02)"),
    inlineCode: modeValue("rgba(255, 255, 255, 0.07)", "rgba(0, 0, 0, 0.04)"),
    kbd: modeValue("rgba(255, 255, 255, 0.07)", "#f4f4f4"),
    pressed: modeValue("rgba(255, 255, 255, 0.08)", "#eae9e9"),
    quiet: modeValue("#131313", "#f9f9f9"),
    recessed: modeValue("rgba(255, 255, 255, 0.07)", "#f4f4f4"),
    scrim: modeValue("hsla(223, 13%, 10%, 0.66)", "hsla(225, 9%, 36%, 0.66)"),
    selected: modeValue("rgba(255, 255, 255, 0.07)", "#f4f4f4"),
    selection: modeValue(
      "color-mix(in oklab, oklch(0.72 0.17 32) 32%, transparent)",
      "color-mix(in oklab, oklch(0.55 0.19 32) 32%, transparent)"
    ),
    subtle: modeValue("rgba(255, 255, 255, 0.04)", "rgba(0, 0, 0, 0.02)"),
  },
} as const;

export const semanticShadows = {
  elevated: modeValue(
    "0 1px 3px 0 rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.04), inset 0 0 0 1px rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(196, 196, 196, 0.08)",
    "0 0 0 1px rgba(0, 0, 0, 0.06), 0 2px 6px 0 rgba(0, 0, 0, 0.05), 0 4px 42px 0 rgba(0, 0, 0, 0.06)"
  ),
  overlay: modeValue(
    "0 1px 3px 0 rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.04), inset 0 0 0 1px rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(196, 196, 196, 0.08)",
    "0 0 0 1px rgba(0, 0, 0, 0.06), 0 2px 6px 0 rgba(0, 0, 0, 0.05), 0 4px 42px 0 rgba(0, 0, 0, 0.06)"
  ),
} as const;

export const semanticRadii = {
  elevated: "0px",
} as const;

export const semanticSpacing = {
  elevatedInset: "16px",
  menuInset: "4px",
  tocInset: "2rem",
} as const;
