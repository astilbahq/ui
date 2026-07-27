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
});

test("has no detectable accessibility violations in either theme", async ({
  page,
}) => {
  await openShowcase(page);

  const darkResults = await analyzeWcag(page);
  expect(darkResults.violations).toEqual([]);

  await page.getByRole("button", { name: "Use light theme" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("button", { name: "Dismiss" })).toHaveCSS(
    "color",
    "rgb(108, 108, 108)"
  );

  const lightResults = await analyzeWcag(page);
  expect(lightResults.violations).toEqual([]);
});

test("keeps the showcase within a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ height: 800, width: 320 });
  await openShowcase(page);

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
});
