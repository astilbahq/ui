import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithoutRef } from "react";

import { control } from "./styles.js";

export type ControlAppearance = "ghost" | "outline" | "primary";
export type ControlSize = "default" | "large";

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
    className={classNames(control({ appearance, iconOnly, size }), className)}
    type={type}
  />
);
