import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { useState } from "react";
import type { ReactElement, ReactNode } from "react";

import { tooltipStyles } from "./styles.js";

export interface TooltipProps {
  readonly active?: boolean;
  readonly activeLabel?: string;
  readonly children: ReactElement;
  readonly label: string;
  readonly onActiveDismiss?: () => void;
}

export const Tooltip = ({
  active = false,
  activeLabel,
  children,
  label,
  onActiveDismiss,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const currentLabel = active && activeLabel ? activeLabel : label;

  return (
    <BaseTooltip.Root
      onOpenChange={(nextOpen, eventDetails) => {
        setOpen(nextOpen);

        if (!nextOpen && active && eventDetails.reason === "escape-key") {
          onActiveDismiss?.();
        }
      }}
      open={open || active}
    >
      <BaseTooltip.Trigger closeOnClick={false} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          align="center"
          className={tooltipStyles.positioner}
          collisionPadding={8}
          side="top"
          sideOffset={8}
        >
          <BaseTooltip.Popup
            aria-label={currentLabel}
            className={tooltipStyles.popup}
            role="tooltip"
          >
            <span
              aria-hidden="true"
              className={tooltipStyles.labels}
              data-active={active ? "true" : "false"}
            >
              <span data-tooltip-label="idle">{label}</span>
              {activeLabel ? (
                <span data-tooltip-label="active">{activeLabel}</span>
              ) : null}
            </span>
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
};

export interface TooltipProviderProps {
  readonly children: ReactNode;
}

export const TooltipProvider = ({ children }: TooltipProviderProps) => (
  <BaseTooltip.Provider closeDelay={0} delay={0}>
    {children}
  </BaseTooltip.Provider>
);
