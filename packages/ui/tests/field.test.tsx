import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Field, Input, Textarea } from "../src";

describe("form fields", () => {
  it("associates a label and description with an input", () => {
    render(
      <Field.Root>
        <Field.Label htmlFor="project-name">Project name</Field.Label>
        <Input
          aria-describedby="project-name-help"
          defaultValue="astilba-app"
          id="project-name"
          name="projectName"
          required
        />
        <Field.Description id="project-name-help">
          Used for the package name.
        </Field.Description>
      </Field.Root>
    );

    const input = screen.getByRole("textbox", { name: "Project name" });
    const description = screen.getByText("Used for the package name.");

    expect(input.getAttribute("name")).toBe("projectName");
    expect(input.getAttribute("aria-describedby")).toContain(description.id);
  });

  it("supports externally controlled validation messages", () => {
    render(
      <Field.Root data-invalid="">
        <Field.Label htmlFor="github-owner">GitHub owner</Field.Label>
        <Input
          aria-describedby="github-owner-error"
          aria-invalid="true"
          defaultValue="invalid--owner"
          id="github-owner"
          name="githubOwner"
        />
        <Field.Error id="github-owner-error">
          Use a valid GitHub account name.
        </Field.Error>
      </Field.Root>
    );

    const input = screen.getByRole("textbox", { name: "GitHub owner" });
    const error = screen.getByText("Use a valid GitHub account name.");

    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("emits native changes from controlled inputs", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Field.Root>
        <Field.Label htmlFor="directory">Directory</Field.Label>
        <Input id="directory" name="directory" onChange={onChange} />
      </Field.Root>
    );

    const input = screen.getByRole("textbox", { name: "Directory" });

    await user.type(input, "project");

    expect(onChange).toHaveBeenCalledTimes(7);
    expect((input as HTMLInputElement).value).toBe("project");
  });

  it("focuses the associated control when its label is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Field.Root>
        <Field.Label htmlFor="labelled-input">Project name</Field.Label>
        <Input id="labelled-input" name="projectName" />
      </Field.Root>
    );

    await user.click(screen.getByText("Project name"));

    expect(document.activeElement).toBe(
      screen.getByRole("textbox", { name: "Project name" })
    );
  });

  it("renders a native textarea with field semantics and a precise ref", () => {
    const ref = createRef<HTMLTextAreaElement>();

    render(
      <Field.Root>
        <Field.Label htmlFor="description">Description</Field.Label>
        <Textarea
          defaultValue="A useful project."
          id="description"
          name="description"
          ref={ref}
          rows={3}
        />
      </Field.Root>
    );

    const textarea = screen.getByRole("textbox", { name: "Description" });

    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea.getAttribute("name")).toBe("description");
    expect(ref.current).toBe(textarea);
  });

  it("preserves native submission, reset, readonly, and validation behavior", () => {
    const { container } = render(
      <form>
        <Field.Root>
          <Field.Label htmlFor="native-project">Project name</Field.Label>
          <Input
            defaultValue="astilba-app"
            id="native-project"
            minLength={3}
            name="projectName"
            required
          />
        </Field.Root>
        <Field.Root>
          <Field.Label htmlFor="native-summary">Summary</Field.Label>
          <Textarea
            defaultValue="Original summary"
            id="native-summary"
            name="summary"
            readOnly
          />
        </Field.Root>
      </form>
    );

    const form = container.querySelector("form");
    const input = screen.getByRole("textbox", { name: "Project name" });
    const textarea = screen.getByRole("textbox", { name: "Summary" });

    expect(form).not.toBeNull();
    expect(input.hasAttribute("required")).toBe(true);
    expect(input.getAttribute("minlength")).toBe("3");
    expect(textarea.hasAttribute("readonly")).toBe(true);
    expect(Object.fromEntries(new FormData(form ?? undefined))).toEqual({
      projectName: "astilba-app",
      summary: "Original summary",
    });

    (input as HTMLInputElement).value = "changed";
    form?.reset();

    expect((input as HTMLInputElement).value).toBe("astilba-app");
    expect((textarea as HTMLTextAreaElement).value).toBe("Original summary");
  });

  it("keeps validation messages mounted while visibility changes", () => {
    const { rerender } = render(
      <Field.Root>
        <Field.Label htmlFor="stable-error">Project name</Field.Label>
        <Input id="stable-error" name="projectName" />
        <Field.Error hidden id="stable-error-message">
          Enter a project name.
        </Field.Error>
      </Field.Root>
    );

    const error = screen.getByText("Enter a project name.", {
      selector: "div",
    });
    const input = screen.getByRole("textbox", { name: "Project name" });
    expect(error.hasAttribute("hidden")).toBe(true);
    expect(input.hasAttribute("aria-describedby")).toBe(false);

    rerender(
      <Field.Root data-invalid="">
        <Field.Label htmlFor="stable-error">Project name</Field.Label>
        <Input
          aria-describedby="stable-error-message"
          aria-invalid="true"
          id="stable-error"
          name="projectName"
        />
        <Field.Error id="stable-error-message">
          Enter a project name.
        </Field.Error>
      </Field.Root>
    );

    expect(error.hasAttribute("hidden")).toBe(false);
    expect(
      screen
        .getByRole("textbox", { name: "Project name" })
        .getAttribute("aria-describedby")
    ).toBe("stable-error-message");
  });

  it("preserves a disabled input", () => {
    render(
      <Field.Root>
        <Field.Label htmlFor="disabled-field">Disabled field</Field.Label>
        <Input
          defaultValue="Unavailable"
          disabled
          id="disabled-field"
          name="disabledField"
        />
      </Field.Root>
    );

    expect(
      screen
        .getByRole("textbox", { name: "Disabled field" })
        .hasAttribute("disabled")
    ).toBe(true);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(
      <main>
        <Field.Root>
          <Field.Label htmlFor="axe-project-name">Project name</Field.Label>
          <Input
            aria-describedby="axe-project-name-help"
            defaultValue="astilba-app"
            id="axe-project-name"
            name="projectName"
            required
          />
          <Field.Description id="axe-project-name-help">
            Used for the package name.
          </Field.Description>
        </Field.Root>
        <Field.Root data-invalid="">
          <Field.Label htmlFor="axe-description">Description</Field.Label>
          <Textarea
            aria-describedby="axe-description-error"
            aria-invalid="true"
            defaultValue="Too short"
            id="axe-description"
            name="description"
            rows={3}
          />
          <Field.Error id="axe-description-error">
            Describe the project in more detail.
          </Field.Error>
        </Field.Root>
      </main>
    );

    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
