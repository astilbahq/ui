import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { fieldStyles } from "./styles.js";

const classNames = (...values: (string | undefined)[]): string =>
  values.filter(Boolean).join(" ");

export interface FieldRootProps extends ComponentPropsWithoutRef<"div"> {
  readonly className?: string;
}

export const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>(
  ({ className, ...properties }, ref) => (
    <div
      {...properties}
      className={classNames(fieldStyles.root, className)}
      ref={ref}
    />
  )
);

export interface FieldLabelProps extends ComponentPropsWithoutRef<"label"> {
  readonly className?: string;
}

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, ...properties }, ref) => (
    <label
      {...properties}
      className={classNames(fieldStyles.label, className)}
      ref={ref}
    />
  )
);

export interface FieldDescriptionProps extends ComponentPropsWithoutRef<"p"> {
  readonly className?: string;
}

export const FieldDescription = forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(({ className, ...properties }, ref) => (
  <p
    {...properties}
    className={classNames(fieldStyles.description, className)}
    ref={ref}
  />
));

export interface FieldErrorProps extends ComponentPropsWithoutRef<"div"> {
  readonly className?: string;
}

export const FieldError = forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, ...properties }, ref) => (
    <div
      {...properties}
      className={classNames(fieldStyles.error, className)}
      ref={ref}
    />
  )
);

export const Field = {
  Description: FieldDescription,
  Error: FieldError,
  Label: FieldLabel,
  Root: FieldRoot,
} as const;
