import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const openShowcase = async (page: Page): Promise<void> => {
  await page.goto("/");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
};

const analyzeWcag = (page: Page) =>
  new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

const analyzeOpenMenuWcag = (page: Page) =>
  new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .exclude("[data-base-ui-focus-guard]")
    .analyze();

test("renders the control contract in both themes", async ({ page }) => {
  await openShowcase(page);

  const defaultButton = page.getByRole("button", { name: "Dismiss" });
  const largeButton = page.getByRole("button", { name: "Continue large" });
  const largeIconButton = page.getByRole("button", {
    name: "Large icon control",
  });
  const largeIcon = largeIconButton.locator("svg");

  await expect(defaultButton).toHaveCSS("height", "32px");
  await expect(largeButton).toHaveCSS("height", "40px");
  await expect(largeIconButton).toHaveCSS("height", "40px");
  await expect(largeIconButton).toHaveCSS("width", "40px");
  await expect(largeIconButton).toHaveCSS("padding-inline-start", "0px");
  await expect(largeIconButton).toHaveCSS("padding-inline-end", "0px");
  await expect(largeIcon).toHaveCSS("height", "18px");
  await expect(largeIcon).toHaveCSS("width", "18px");

  const specimens = page.locator(".specimen-section").first();
  await expect(specimens).toHaveScreenshot("controls-dark.png");

  await page.getByRole("button", { name: "Use light theme" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.mouse.move(0, 0);
  await expect(
    page.getByRole("tooltip", { name: "Use dark theme" })
  ).toBeHidden();
  await expect(specimens).toHaveScreenshot("controls-light.png");
});

test("preserves hover, focus, disabled, and tooltip states", async ({
  page,
}) => {
  await openShowcase(page);

  const dismiss = page.getByRole("button", { name: "Dismiss" });
  const initialBackground = await dismiss.evaluate(
    (element) => getComputedStyle(element).backgroundColor
  );
  await dismiss.hover();
  expect(initialBackground).toBe("rgba(0, 0, 0, 0)");
  await expect(dismiss).toHaveCSS(
    "background-color",
    "rgba(255, 255, 255, 0.06)"
  );

  const continueButton = page.getByRole("button", {
    exact: true,
    name: "Continue",
  });
  await continueButton.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(continueButton).toBeFocused();
  await expect(continueButton).toHaveCSS(
    "outline-color",
    "oklch(0.72 0.17 32)"
  );
  await expect(continueButton).toHaveCSS("outline-offset", "-2px");
  await expect(continueButton).toHaveCSS("outline-style", "solid");
  await expect(continueButton).toHaveCSS("outline-width", "2px");

  const disabledButtons = page.getByRole("button", { name: "Not available" });
  await expect(disabledButtons).toHaveCount(3);
  const disabledButtonList = await disabledButtons.all();
  await Promise.all(
    disabledButtonList.flatMap((button) => [
      expect(button).toBeDisabled(),
      expect(button).toHaveCSS("cursor", "default"),
      expect(button).toHaveCSS("opacity", "0.5"),
    ])
  );
  await expect(disabledButtons.first()).toHaveCSS(
    "background-color",
    "rgb(255, 255, 255)"
  );

  await page.getByRole("button", { name: "Copy" }).hover();
  const tooltip = page.getByRole("tooltip", { name: "Copy" });
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveCSS("font-weight", "500");
  await expect(tooltip).toHaveCSS("transition-duration", "0.15s");
});

test("preserves menu pointer, keyboard, action, and link contracts", async ({
  page,
}) => {
  await openShowcase(page);

  const trigger = page.getByRole("button", { name: "More actions" });
  await trigger.click();
  const menu = page.getByRole("menu");
  await expect(menu).toBeVisible();
  await expect(menu).toHaveCSS("transition-duration", "0.25s");
  await expect(menu).toHaveCSS("border-radius", "0px");

  const updateItem = page.getByRole("menuitem", { name: "Update project" });
  await updateItem.hover();
  await expect(updateItem).toHaveAttribute("data-highlighted");
  await expect(updateItem).toHaveCSS(
    "background-color",
    "rgba(255, 255, 255, 0.06)"
  );
  await expect(updateItem).toHaveCSS("outline-style", "none");
  await expect(updateItem).toHaveCSS("line-height", "13px");

  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(updateItem).toHaveAttribute("data-highlighted");
  await expect(updateItem).toHaveCSS("outline-color", "oklch(0.72 0.17 32)");
  await expect(updateItem).toHaveCSS("outline-width", "2px");

  const persistentItem = page.getByRole("menuitem", {
    name: "Keep menu open",
  });
  await persistentItem.hover();
  await expect(persistentItem).toHaveAttribute("data-highlighted");
  await expect(persistentItem).toHaveCSS("outline-style", "none");
  await persistentItem.click();
  await expect(menu).toBeVisible();
  await expect(persistentItem).toHaveCSS("outline-style", "none");
  await expect(page.getByText("Menu kept open")).toBeVisible();

  const disabledItem = page.getByRole("menuitem", {
    name: "Archived action",
  });
  await expect(disabledItem).toHaveAttribute("aria-disabled", "true");
  const tokensLink = page.getByRole("menuitem", { name: "View tokens" });
  await expect(tokensLink).toHaveAttribute("href", "#tokens");

  await updateItem.click();
  await expect(menu).toBeHidden();
  await expect(page.getByText("Project updated")).toBeVisible();

  await trigger.click();
  await tokensLink.click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#tokens$/u);
});

test("renders the menu surface in both themes", async ({ page }) => {
  await openShowcase(page);

  const trigger = page.getByRole("button", { name: "More actions" });
  await trigger.click();
  const menu = page.getByRole("menu");
  await expect(menu).toHaveScreenshot("menu-dark.png");

  await page.keyboard.press("Escape");
  const header = page.locator(".showcase-header");
  await header.getByRole("button", { name: "Use light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await trigger.click();
  await expect(menu).toHaveScreenshot("menu-light.png");
});

test("keeps outside controls actionable while the menu is open", async ({
  page,
}) => {
  await openShowcase(page);

  await page.getByRole("button", { name: "More actions" }).click();
  await expect(page.getByRole("menu")).toBeVisible();

  const header = page.locator(".showcase-header");
  await header.getByRole("button", { name: "Use light theme" }).click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("menu")).toBeHidden();
});

test("removes tooltip motion when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openShowcase(page);

  await page.getByRole("button", { name: "Copy" }).hover();
  await expect(page.getByRole("tooltip", { name: "Copy" })).toHaveCSS(
    "transition-duration",
    "0s"
  );

  await page.getByRole("button", { name: "More actions" }).click();
  await expect(page.getByRole("menu")).toHaveCSS("transition-duration", "0s");
});

test("has no detectable accessibility violations in either theme", async ({
  page,
}) => {
  await openShowcase(page);

  const darkResults = await analyzeWcag(page);
  expect(darkResults.violations).toEqual([]);

  await page.getByRole("button", { name: "More actions" }).click();
  await page.waitForTimeout(300);
  const darkMenuResults = await analyzeOpenMenuWcag(page);
  expect(darkMenuResults.violations).toEqual([]);
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "Use light theme" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("button", { name: "Dismiss" })).toHaveCSS(
    "color",
    "rgb(108, 108, 108)"
  );

  const lightResults = await analyzeWcag(page);
  expect(lightResults.violations).toEqual([]);

  await page.getByRole("button", { name: "More actions" }).click();
  await page.waitForTimeout(300);
  const lightMenuResults = await analyzeOpenMenuWcag(page);
  expect(lightMenuResults.violations).toEqual([]);
});

test("keeps the showcase within a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ height: 800, width: 320 });
  await openShowcase(page);

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);

  await page.getByRole("button", { name: "More actions" }).click();
  const menuBounds = await page.getByRole("menu").boundingBox();
  expect(menuBounds).not.toBeNull();
  expect(menuBounds?.x ?? -1).toBeGreaterThanOrEqual(0);
  expect((menuBounds?.x ?? 0) + (menuBounds?.width ?? 0)).toBeLessThanOrEqual(
    320
  );
});
