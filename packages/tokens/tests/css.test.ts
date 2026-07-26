import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { cssVariable } from "../src/index.js";

describe("static token CSS", () => {
  it("uses the same stable variable names as the Panda preset", () => {
    expect(cssVariable("colors", "ink", "muted")).toBe(
      "--astilba-colors-ink-muted"
    );
    expect(cssVariable("colors", "surface", "action", "primaryHover")).toBe(
      "--astilba-colors-surface-action-primary-hover"
    );
  });

  it("contains dark defaults and light overrides", async () => {
    const css = await readFile(
      path.resolve(import.meta.dirname, "../dist/tokens.css"),
      "utf-8"
    );

    expect(css).toContain("--astilba-colors-canvas: #121212;");
    expect(css).toContain(':root[data-theme="light"]');
    expect(css).toContain("--astilba-colors-canvas: #fdfdfd;");
    expect(css).toContain("--astilba-colors-ink-default: #0d0d0d;");
    expect(css).toContain("--astilba-colors-surface-action-primary: #0d0d0d;");
    expect(css).toContain(
      "--astilba-colors-surface-banner: rgba(243, 243, 243, 0.9);"
    );
  });
});
