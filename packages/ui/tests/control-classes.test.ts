import { describe, expect, it } from "vitest";

import { controlClassName } from "../src/control";
import { control } from "../styled-system/recipes";

describe("static control class contract", () => {
  it("matches Panda for every supported variant combination", () => {
    const appearances = ["ghost", "outline", "primary"] as const;
    const iconOnlyValues = [false, true] as const;
    const sizes = ["default", "large"] as const;

    for (const appearance of appearances) {
      for (const iconOnly of iconOnlyValues) {
        for (const size of sizes) {
          const variants = { appearance, iconOnly, size };

          expect(controlClassName(variants)).toBe(control(variants));
        }
      }
    }
  });
});
