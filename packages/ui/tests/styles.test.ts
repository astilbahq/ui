import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("compiled component CSS", () => {
  it("leaves semantic variables to @astilba/tokens", async () => {
    const css = await readFile(
      path.resolve(import.meta.dirname, "../dist/styles.css"),
      "utf-8"
    );

    expect(css).toContain(".astilba-control--size_large");
    expect(css).toContain(".astilba-tooltip-popup");
    expect(css).toContain(".astilba-tooltip-popup[data-starting-style]");
    expect(css).toContain(".astilba-tooltip-popup[data-ending-style]");
    expect(css).toContain("--astilba-durations-tooltip-close");
    expect(css).toContain('.astilba-tooltip-labels[data-active="true"]');
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("transition: none;");
    expect(css).toContain("@layer astilba.utilities");
    expect(css).not.toMatch(/--astilba-colors-[\w-]+\s*:/u);
  });
});
