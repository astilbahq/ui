import { css, cva } from "../styled-system/css";

export const control = cva({
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
    transitionProperty: "background-color, border-color, color, opacity",
    transitionTimingFunction: "outExpo",
    whiteSpace: "nowrap",
  },
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
    iconOnly: {
      true: {
        inlineSize: "2rem",
        paddingInline: 0,
      },
    },
    size: {
      default: {},
      large: {
        blockSize: "2.5rem",
        paddingInline: "0.875rem",
      },
    },
  },
});

export const tooltipStyles = {
  labels: css({
    '& [data-tooltip-label="active"]': {
      justifySelf: "center",
      opacity: 0,
      visibility: "hidden",
    },
    "& [data-tooltip-label]": {
      gridArea: "1 / 1",
    },
    '&[data-active="true"] [data-tooltip-label="active"]': {
      opacity: 1,
      visibility: "visible",
    },
    '&[data-active="true"] [data-tooltip-label="idle"]': {
      opacity: 0,
      visibility: "hidden",
    },
    display: "inline-grid",
  }),
  popup: css({
    _endingStyle: {
      opacity: 0,
      transform: "scale(0.96)",
      transitionDuration: "tooltipClose",
    },
    _reducedMotion: {
      transition: "none",
    },
    _startingStyle: {
      opacity: 0,
      transform: "scale(0.96)",
    },
    background: "surface.elevated",
    boxShadow: "elevated",
    color: "ink.control",
    display: "inline-grid",
    fontFamily: "body",
    fontSize: "0.75rem",
    fontWeight: "medium",
    lineHeight: 1,
    opacity: 1,
    paddingBlock: "0.375rem",
    paddingInline: "0.5rem",
    transform: "scale(1)",
    transformOrigin: "50% 100%",
    transitionDuration: "tooltipOpen",
    transitionProperty: "opacity, transform",
    transitionTimingFunction: "outExpo",
    whiteSpace: "nowrap",
    willChange: "opacity, transform",
    zIndex: 1000,
  }),
  positioner: css({
    zIndex: 1000,
  }),
};
