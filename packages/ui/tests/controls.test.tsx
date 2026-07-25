import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Copy } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

import {
  Button,
  IconButton,
  LinkButton,
  Tooltip,
  TooltipProvider,
} from "../src";

describe("controls", () => {
  it("keeps button semantics and defaults to a non-submitting type", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });

    expect(button.getAttribute("type")).toBe("button");
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("keeps disabled buttons non-interactive", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>
    );

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders links as anchors rather than button-shaped buttons", () => {
    render(<LinkButton href="/docs">Read the docs</LinkButton>);

    expect(
      screen.getByRole("link", { name: "Read the docs" }).getAttribute("href")
    ).toBe("/docs");
    expect(screen.queryByRole("button", { name: "Read the docs" })).toBeNull();
  });

  it("gives icon-only buttons an accessible name", () => {
    render(
      <IconButton label="Copy">
        <Copy aria-hidden="true" />
      </IconButton>
    );

    expect(screen.getByRole("button", { name: "Copy" })).toBeDefined();
  });

  it("shows an immediate accessible tooltip", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip label="Copy">
          <IconButton label="Copy">
            <Copy aria-hidden="true" />
          </IconButton>
        </Tooltip>
      </TooltipProvider>
    );

    await user.hover(screen.getByRole("button", { name: "Copy" }));
    expect(await screen.findByRole("tooltip", { name: "Copy" })).toBeDefined();
  });

  it("shows active feedback and handles Escape dismissal", async () => {
    const onActiveDismiss = vi.fn();
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip
          active
          activeLabel="Copied!"
          label="Copy"
          onActiveDismiss={onActiveDismiss}
        >
          <IconButton label="Copy">
            <Copy aria-hidden="true" />
          </IconButton>
        </Tooltip>
      </TooltipProvider>
    );

    expect(
      await screen.findByRole("tooltip", { name: "Copied!" })
    ).toBeDefined();
    await user.keyboard("{Escape}");
    expect(onActiveDismiss).toHaveBeenCalledOnce();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(
      <TooltipProvider>
        <main>
          <Button>Save</Button>
          <Button disabled>Unavailable</Button>
          <LinkButton href="/docs">Read the docs</LinkButton>
          <Tooltip label="Copy">
            <IconButton label="Copy">
              <Copy aria-hidden="true" />
            </IconButton>
          </Tooltip>
        </main>
      </TooltipProvider>
    );

    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
