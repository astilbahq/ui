import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { inputStyles } from "./styles.js";

const classNames = (...values: (string | undefined)[]): string =>
  values.filter(Boolean).join(" ");

export interface TextareaProps extends Omit<
  ComponentPropsWithoutRef<"textarea">,
  "className"
> {
  readonly className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...properties }, ref) => (
    <textarea
      {...properties}
      className={classNames(
        inputStyles.control,
        inputStyles.textarea,
        className
      )}
      ref={ref}
    />
  )
);
