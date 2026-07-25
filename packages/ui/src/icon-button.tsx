import type { ReactNode } from "react";

import { Button } from "./button.js";
import type { ButtonProps } from "./button.js";

export interface IconButtonProps extends Omit<
  ButtonProps,
  "aria-label" | "children" | "iconOnly"
> {
  readonly children: ReactNode;
  readonly label: string;
}

export const IconButton = ({
  children,
  label,
  ...properties
}: IconButtonProps) => (
  <Button {...properties} aria-label={label} iconOnly>
    {children}
  </Button>
);
