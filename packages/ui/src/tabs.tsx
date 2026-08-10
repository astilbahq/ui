import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { forwardRef } from "react";

import { tabsStyles } from "./styles.js";

const classNames = (...values: (string | undefined)[]): string =>
  values.filter(Boolean).join(" ");

export const TabsRoot = BaseTabs.Root;
export type TabsRootProps = BaseTabs.Root.Props;

export interface TabsListProps extends Omit<BaseTabs.List.Props, "className"> {
  readonly className?: string;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...properties }, ref) => (
    <BaseTabs.List
      {...properties}
      className={classNames(tabsStyles.list, className)}
      ref={ref}
    />
  )
);

export interface TabsTabProps extends Omit<BaseTabs.Tab.Props, "className"> {
  readonly className?: string;
}

export const TabsTab = forwardRef<HTMLElement, TabsTabProps>(
  ({ className, ...properties }, ref) => (
    <BaseTabs.Tab
      {...properties}
      className={classNames(tabsStyles.tab, className)}
      ref={ref}
    />
  )
);

export interface TabsIndicatorProps extends Omit<
  BaseTabs.Indicator.Props,
  "className"
> {
  readonly className?: string;
}

export const TabsIndicator = forwardRef<HTMLSpanElement, TabsIndicatorProps>(
  ({ className, ...properties }, ref) => (
    <BaseTabs.Indicator
      {...properties}
      className={classNames(tabsStyles.indicator, className)}
      ref={ref}
    />
  )
);

export interface TabsPanelProps extends Omit<
  BaseTabs.Panel.Props,
  "className"
> {
  readonly className?: string;
}

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ className, ...properties }, ref) => (
    <BaseTabs.Panel
      {...properties}
      className={classNames(tabsStyles.panel, className)}
      ref={ref}
    />
  )
);

export const Tabs = {
  Indicator: TabsIndicator,
  List: TabsList,
  Panel: TabsPanel,
  Root: TabsRoot,
  Tab: TabsTab,
} as const;
