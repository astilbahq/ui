import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithoutRef } from "react";

import { controlClassName } from "./control.js";
import type { ControlAppearance, ControlSize } from "./control.js";

export type { ControlAppearance, ControlSize } from "./control.js";

export interface ButtonProps extends Omit<
  ComponentPropsWithoutRef<typeof BaseButton>,
  "className"
> {
  readonly appearance?: ControlAppearance;
  readonly className?: string;
  readonly iconOnly?: boolean;
  readonly size?: ControlSize;
}

const classNames = (...values: (string | undefined)[]): string =>
  values.filter(Boolean).join(" ");

export const Button = ({
  appearance = "ghost",
  className,
  iconOnly = false,
  size = "default",
  type = "button",
  ...properties
}: ButtonProps) => (
  <BaseButton
    {...properties}
    className={classNames(
      controlClassName({ appearance, iconOnly, size }),
      className
    )}
    type={type}
  />
);
