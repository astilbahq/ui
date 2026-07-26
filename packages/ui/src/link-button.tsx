import type { ComponentPropsWithoutRef } from "react";

import { controlClassName } from "./control.js";
import type { ControlAppearance, ControlSize } from "./control.js";

export interface LinkButtonProps extends Omit<
  ComponentPropsWithoutRef<"a">,
  "className" | "href"
> {
  readonly appearance?: ControlAppearance;
  readonly className?: string;
  readonly href: string;
  readonly iconOnly?: boolean;
  readonly size?: ControlSize;
}

const classNames = (...values: (string | undefined)[]): string =>
  values.filter(Boolean).join(" ");

export const LinkButton = ({
  appearance = "ghost",
  className,
  href,
  iconOnly = false,
  size = "default",
  ...properties
}: LinkButtonProps) => (
  <a
    {...properties}
    className={classNames(
      controlClassName({ appearance, iconOnly, size }),
      className
    )}
    href={href}
  />
);
