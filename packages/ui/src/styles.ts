import { css } from "../styled-system/css";

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
