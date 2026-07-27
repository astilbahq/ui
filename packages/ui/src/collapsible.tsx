import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { forwardRef } from "react";

import { collapsibleStyles } from "./styles.js";

const classNames = (...values: (string | undefined)[]): string =>
  values.filter(Boolean).join(" ");

export const CollapsibleRoot = BaseCollapsible.Root;
export type CollapsibleRootProps = BaseCollapsible.Root.Props;

export const CollapsibleTrigger = BaseCollapsible.Trigger;
export type CollapsibleTriggerProps = BaseCollapsible.Trigger.Props;

export interface CollapsiblePanelProps extends Omit<
  BaseCollapsible.Panel.Props,
  "className"
> {
  readonly className?: string;
}

export const CollapsiblePanel = forwardRef<
  HTMLDivElement,
  CollapsiblePanelProps
>(({ className, ...properties }, ref) => (
  <BaseCollapsible.Panel
    {...properties}
    className={classNames(collapsibleStyles.panel, className)}
    ref={ref}
  />
));

export const Collapsible = {
  Panel: CollapsiblePanel,
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
} as const;
