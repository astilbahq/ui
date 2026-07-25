export const cssSegment = (segment: string): string =>
  segment === "DEFAULT"
    ? ""
    : segment.replaceAll(
        /[A-Z]/gu,
        (character) => `-${character.toLowerCase()}`
      );

export const cssVariable = (...segments: string[]): string =>
  `--astilba-${segments.map(cssSegment).filter(Boolean).join("-")}`;
