import { Menu as BaseMenu } from "@base-ui/react/menu";
import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useState,
} from "react";
import type {
  ComponentPropsWithoutRef,
  Dispatch,
  RefAttributes,
  SetStateAction,
} from "react";

import { menuStyles } from "./styles.js";

const classNames = (...values: (string | undefined)[]): string =>
  values.filter(Boolean).join(" ");

type MenuInputModality = "keyboard" | "pointer";

interface MenuInputModalityContextValue {
  readonly inputModality: MenuInputModality;
  readonly setInputModality: Dispatch<SetStateAction<MenuInputModality>>;
}

const MenuInputModalityContext =
  createContext<MenuInputModalityContextValue | null>(null);

const useMenuInputModality = (): MenuInputModalityContextValue => {
  const context = useContext(MenuInputModalityContext);
  if (!context) {
    throw new Error("Menu parts must be rendered within Menu.Root");
  }
  return context;
};

export type MenuRootProps<Payload = unknown> = BaseMenu.Root.Props<Payload>;

export const MenuRoot = <Payload = unknown,>({
  highlightItemOnHover = true,
  modal = false,
  ...properties
}: MenuRootProps<Payload>) => {
  const [inputModality, setInputModality] =
    useState<MenuInputModality>("pointer");
  const context = useMemo(
    () => ({ inputModality, setInputModality }),
    [inputModality]
  );

  return (
    <MenuInputModalityContext.Provider value={context}>
      <BaseMenu.Root
        {...properties}
        highlightItemOnHover={highlightItemOnHover}
        modal={modal}
      />
    </MenuInputModalityContext.Provider>
  );
};

export type MenuTriggerProps<Payload = unknown> =
  BaseMenu.Trigger.Props<Payload> & RefAttributes<HTMLElement>;

export const MenuTrigger = <Payload = unknown,>({
  onKeyDown,
  onPointerDown,
  ref,
  ...properties
}: MenuTriggerProps<Payload>) => {
  const { setInputModality } = useMenuInputModality();

  return (
    <BaseMenu.Trigger
      {...properties}
      onKeyDown={(event) => {
        setInputModality("keyboard");
        onKeyDown?.(event);
      }}
      onPointerDown={(event) => {
        setInputModality("pointer");
        onPointerDown?.(event);
      }}
      ref={ref}
    />
  );
};

export const MenuPortal = BaseMenu.Portal;
export type MenuPortalProps = BaseMenu.Portal.Props;

export interface MenuPositionerProps extends Omit<
  BaseMenu.Positioner.Props,
  "className"
> {
  readonly className?: string;
}

export const MenuPositioner = forwardRef<HTMLDivElement, MenuPositionerProps>(
  (
    {
      align = "start",
      className,
      collisionAvoidance = {
        align: "shift",
        fallbackAxisSide: "none",
        side: "shift",
      },
      collisionPadding = 8,
      side = "bottom",
      sideOffset = 4,
      ...properties
    },
    ref
  ) => (
    <BaseMenu.Positioner
      {...properties}
      align={align}
      className={classNames(menuStyles.positioner, className)}
      collisionAvoidance={collisionAvoidance}
      collisionPadding={collisionPadding}
      ref={ref}
      side={side}
      sideOffset={sideOffset}
    />
  )
);

export interface MenuPopupProps extends Omit<
  BaseMenu.Popup.Props,
  "className"
> {
  readonly className?: string;
}

export const MenuPopup = forwardRef<HTMLDivElement, MenuPopupProps>(
  (
    { className, onKeyDownCapture, onPointerMoveCapture, ...properties },
    ref
  ) => {
    const { inputModality, setInputModality } = useMenuInputModality();

    return (
      <BaseMenu.Popup
        {...properties}
        className={classNames(menuStyles.popup, className)}
        data-input-modality={inputModality}
        onKeyDownCapture={(event) => {
          setInputModality("keyboard");
          onKeyDownCapture?.(event);
        }}
        onPointerMoveCapture={(event) => {
          setInputModality("pointer");
          onPointerMoveCapture?.(event);
        }}
        ref={ref}
      />
    );
  }
);

export interface MenuItemProps extends Omit<
  BaseMenu.Item.Props,
  "className" | "label" | "render"
> {
  readonly className?: string;
  readonly label: string;
}

export const MenuItem = forwardRef<HTMLElement, MenuItemProps>(
  ({ className, label, ...properties }, ref) => (
    <BaseMenu.Item
      {...properties}
      className={classNames(menuStyles.item, className)}
      label={label}
      ref={ref}
    />
  )
);

export interface MenuLinkItemProps extends Omit<
  BaseMenu.LinkItem.Props,
  "className" | "href" | "label" | "render"
> {
  readonly className?: string;
  readonly href: string;
  readonly label: string;
}

export const MenuLinkItem = forwardRef<Element, MenuLinkItemProps>(
  ({ className, closeOnClick = true, label, ...properties }, ref) => (
    <BaseMenu.LinkItem
      {...properties}
      className={classNames(menuStyles.item, className)}
      closeOnClick={closeOnClick}
      label={label}
      ref={ref}
    />
  )
);

export interface MenuItemLabelProps extends ComponentPropsWithoutRef<"span"> {
  readonly className?: string;
}

export const MenuItemLabel = ({
  className,
  ...properties
}: MenuItemLabelProps) => (
  <span
    {...properties}
    className={classNames(menuStyles.itemLabel, className)}
  />
);

export interface MenuItemTrailingProps extends ComponentPropsWithoutRef<"span"> {
  readonly className?: string;
}

export const MenuItemTrailing = ({
  className,
  ...properties
}: MenuItemTrailingProps) => (
  <span
    {...properties}
    className={classNames(menuStyles.itemTrailing, className)}
  />
);

export const Menu = {
  Item: MenuItem,
  ItemLabel: MenuItemLabel,
  ItemTrailing: MenuItemTrailing,
  LinkItem: MenuLinkItem,
  Popup: MenuPopup,
  Portal: MenuPortal,
  Positioner: MenuPositioner,
  Root: MenuRoot,
  Trigger: MenuTrigger,
} as const;
