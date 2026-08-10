import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Tabs } from "../src/tabs";

interface TabsFixtureProps {
  readonly activateOnFocus?: boolean;
}

const TabsFixture = ({ activateOnFocus = false }: TabsFixtureProps) => (
  <Tabs.Root defaultValue="overview">
    <Tabs.List activateOnFocus={activateOnFocus} aria-label="Project sections">
      <Tabs.Tab value="overview">Overview</Tabs.Tab>
      <Tabs.Tab value="activity">Activity</Tabs.Tab>
      <Tabs.Tab value="settings">Settings</Tabs.Tab>
      <Tabs.Indicator data-testid="tabs-indicator" />
    </Tabs.List>
    <Tabs.Panel keepMounted value="overview">
      Overview panel
    </Tabs.Panel>
    <Tabs.Panel keepMounted value="activity">
      Activity panel
    </Tabs.Panel>
    <Tabs.Panel keepMounted value="settings">
      Settings panel
    </Tabs.Panel>
  </Tabs.Root>
);

describe("Tabs", () => {
  it("associates each tab with its panel and exposes shared styles", () => {
    render(<TabsFixture />);

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const overviewPanel = screen.getByRole("tabpanel", { name: "Overview" });
    const activityPanel = screen
      .getByText("Activity panel")
      .closest<HTMLElement>('[role="tabpanel"]');

    expect(overviewTab.getAttribute("aria-selected")).toBe("true");
    expect(overviewTab.getAttribute("aria-controls")).toBe(overviewPanel.id);
    expect(overviewPanel.getAttribute("aria-labelledby")).toBe(overviewTab.id);
    expect(activityPanel?.hidden).toBe(true);
    expect(overviewTab.classList.contains("astilba-tabs-tab")).toBe(true);
    expect(
      screen
        .getByRole("tablist", { name: "Project sections" })
        .classList.contains("astilba-tabs-list")
    ).toBe(true);
    expect(
      screen
        .getByTestId("tabs-indicator")
        .classList.contains("astilba-tabs-indicator")
    ).toBe(true);
  });

  it("supports manual keyboard activation by default", async () => {
    const user = userEvent.setup();
    render(<TabsFixture />);

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const activityTab = screen.getByRole("tab", { name: "Activity" });

    overviewTab.focus();
    await user.keyboard("{ArrowRight}");

    expect(document.activeElement).toBe(activityTab);
    expect(overviewTab.getAttribute("aria-selected")).toBe("true");
    expect(activityTab.getAttribute("aria-selected")).toBe("false");

    await user.keyboard("{Enter}");
    expect(activityTab.getAttribute("aria-selected")).toBe("true");
    expect(
      screen.getByRole("tabpanel", { name: "Activity" }).textContent
    ).toContain("Activity panel");
  });

  it("can activate tabs while arrow-key focus moves", async () => {
    const user = userEvent.setup();
    render(<TabsFixture activateOnFocus />);

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const activityTab = screen.getByRole("tab", { name: "Activity" });

    overviewTab.focus();
    await user.keyboard("{ArrowRight}");

    expect(document.activeElement).toBe(activityTab);
    expect(activityTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tabpanel", { name: "Activity" })).toBeDefined();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<TabsFixture />);

    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
        region: { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
