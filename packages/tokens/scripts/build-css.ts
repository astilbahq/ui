import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { cssSegment } from "../src/css-variable.js";
import {
  semanticColors,
  semanticRadii,
  semanticShadows,
  semanticSpacing,
  tokens,
} from "../src/theme.js";
import type { ModeValue } from "../src/theme.js";

interface CssEntry {
  readonly name: string;
  readonly value: string;
}

const isModeValue = (value: unknown): value is ModeValue => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return "dark" in value && "light" in value;
};

const flatten = (
  value: unknown,
  segments: readonly string[],
  mode?: keyof ModeValue
): CssEntry[] => {
  if (isModeValue(value)) {
    if (!mode) {
      throw new Error(`Mode required for ${segments.join(".")}`);
    }

    return [{ name: segments.join("-"), value: value[mode] }];
  }

  if (typeof value === "string") {
    return [{ name: segments.join("-"), value }];
  }

  if (typeof value !== "object" || value === null) {
    throw new TypeError(`Unsupported token value at ${segments.join(".")}`);
  }

  return Object.entries(value).flatMap(([key, child]) =>
    flatten(child, [...segments, cssSegment(key)].filter(Boolean), mode)
  );
};

const declarations = (entries: readonly CssEntry[]): string =>
  entries
    .map(({ name, value }) => `    --astilba-${name}: ${value};`)
    .join("\n");

const primitiveEntries = flatten(tokens, []);
const sharedSemanticEntries = [
  ...flatten(semanticRadii, ["radii"]),
  ...flatten(semanticSpacing, ["spacing"]),
];
const darkEntries = [
  ...flatten(semanticColors, ["colors"], "dark"),
  ...flatten(semanticShadows, ["shadows"], "dark"),
];
const lightEntries = [
  ...flatten(semanticColors, ["colors"], "light"),
  ...flatten(semanticShadows, ["shadows"], "light"),
];

const css = `@layer astilba.tokens {
  :root {
    color-scheme: dark;
${declarations([...primitiveEntries, ...sharedSemanticEntries, ...darkEntries])}
  }

  :root[data-theme="light"] {
    color-scheme: light;
${declarations(lightEntries)}
  }
}
`;

const outputDirectory = path.resolve(import.meta.dirname, "../dist");
await mkdir(outputDirectory, { recursive: true });
await writeFile(path.resolve(outputDirectory, "tokens.css"), css, "utf-8");
