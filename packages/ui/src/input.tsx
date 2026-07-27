import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { inputStyles } from "./styles.js";

const classNames = (...values: (string | undefined)[]): string =>
  values.filter(Boolean).join(" ");

export type InputType =
  | "email"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url";

export interface InputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "className" | "type"
> {
  readonly className?: string;
  readonly type?: InputType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...properties }, ref) => (
    <input
      {...properties}
      className={classNames(inputStyles.control, className)}
      ref={ref}
      type={type}
    />
  )
);
