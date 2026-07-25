import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import axe from "axe-core";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "../src/app";

describe("showcase", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<App />);

    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });

  it("changes theme without changing control semantics", () => {
    render(<App />);

    const [themeToggle] = screen.getAllByRole("button", {
      name: "Use light theme",
    });
    if (!themeToggle) {
      throw new Error("Theme toggle not found");
    }
    fireEvent.click(themeToggle);

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(
      screen.getAllByRole("button", { name: "Use dark theme" })
    ).toHaveLength(2);
  });

  it("shows copy feedback for the full reset interval", () => {
    vi.useFakeTimers();
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(screen.getByRole("tooltip", { name: "Copied!" })).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(1399);
    });
    expect(screen.getByRole("tooltip", { name: "Copied!" })).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.queryByRole("tooltip", { name: "Copied!" })).toBeNull();
  });

  it("provides a focusable skip-link destination", () => {
    render(<App />);

    const skipLink = screen.getByRole("link", { name: "Skip to specimens" });
    const destination = document.querySelector("#specimens");

    expect(skipLink.getAttribute("href")).toBe("#specimens");
    expect(destination?.getAttribute("tabindex")).toBe("-1");
  });
});
