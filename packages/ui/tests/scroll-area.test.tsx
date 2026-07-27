import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { ScrollArea } from "../src/scroll-area";

const ScrollAreaFixture = () => (
  <ScrollArea.Root data-contract="root">
    <ScrollArea.Viewport data-testid="viewport" fade="block">
      <ScrollArea.Content>
        <a href="#details">Deployment details</a>
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar data-testid="scrollbar" keepMounted>
      <ScrollArea.Thumb data-testid="thumb" />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);

describe("ScrollArea", () => {
  it("applies the shared contract without hiding Base UI state", () => {
    render(<ScrollAreaFixture />);

    const viewport = screen.getByTestId("viewport");
    const root = viewport.parentElement;
    const scrollbar = screen.getByTestId("scrollbar");
    const thumb = screen.getByTestId("thumb");

    expect(root?.classList.contains("astilba-scroll-area-root")).toBe(true);
    expect(root?.dataset.contract).toBe("root");
    expect(viewport.classList.contains("astilba-scroll-area-viewport")).toBe(
      true
    );
    expect(viewport.dataset.fade).toBe("block");
    expect(scrollbar.classList.contains("astilba-scroll-area-scrollbar")).toBe(
      true
    );
    expect(scrollbar.dataset.orientation).toBe("vertical");
    expect(thumb.classList.contains("astilba-scroll-area-thumb")).toBe(true);
  });

  it("preserves consumer classes, refs, events, and polymorphic rendering", async () => {
    const onClick = vi.fn();
    const rootRef = createRef<HTMLDivElement>();
    const viewportRef = createRef<HTMLDivElement>();
    const scrollbarRef = createRef<HTMLDivElement>();
    const thumbRef = createRef<HTMLDivElement>();
    const user = userEvent.setup();

    const { container } = render(
      <ScrollArea.Root
        className="consumer-root"
        onClick={onClick}
        ref={rootRef}
        render={<section aria-label="Release history" />}
      >
        <ScrollArea.Viewport className="consumer-viewport" ref={viewportRef}>
          <ScrollArea.Content>Release history</ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="consumer-scrollbar"
          keepMounted
          ref={scrollbarRef}
        >
          <ScrollArea.Thumb className="consumer-thumb" ref={thumbRef} />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    );

    const root = container.querySelector("section");
    expect(root).not.toBeNull();
    if (!root) {
      throw new Error("Expected the polymorphic scroll area root");
    }
    await user.click(root);

    expect(root.tagName).toBe("SECTION");
    expect(root.classList.contains("consumer-root")).toBe(true);
    expect(rootRef.current).toBe(root);
    expect(viewportRef.current?.classList.contains("consumer-viewport")).toBe(
      true
    );
    expect(scrollbarRef.current?.classList.contains("consumer-scrollbar")).toBe(
      true
    );
    expect(thumbRef.current?.classList.contains("consumer-thumb")).toBe(true);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("passes through horizontal orientation, direction, and root edge thresholds", () => {
    render(
      <ScrollArea.Root
        direction="rtl"
        overflowEdgeThreshold={{ xEnd: 8, xStart: 4 }}
      >
        <ScrollArea.Viewport>
          <ScrollArea.Content>Wide content</ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          data-testid="horizontal-scrollbar"
          keepMounted
          orientation="horizontal"
        >
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    );

    expect(screen.getByTestId("horizontal-scrollbar").dataset.orientation).toBe(
      "horizontal"
    );
    expect(screen.getByTestId("horizontal-scrollbar").parentElement?.dir).toBe(
      "rtl"
    );
    expect(document.querySelector("style[data-href]")).toBeNull();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<ScrollAreaFixture />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
