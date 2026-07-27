import { CSPProvider as BaseCSPProvider } from "@base-ui/react/csp-provider";
import { DirectionProvider as BaseDirectionProvider } from "@base-ui/react/direction-provider";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { forwardRef } from "react";

import { scrollAreaStyles } from "./styles.js";

const classNames = (...values: (string | undefined)[]): string =>
  values.filter(Boolean).join(" ");

export interface ScrollAreaRootProps extends Omit<
  BaseScrollArea.Root.Props,
  "className" | "dir"
> {
  readonly className?: string;
  readonly direction?: ScrollAreaDirection;
}

export type ScrollAreaDirection = "ltr" | "rtl";

export const ScrollAreaRoot = forwardRef<HTMLDivElement, ScrollAreaRootProps>(
  ({ className, direction = "ltr", ...properties }, ref) => (
    <BaseCSPProvider disableStyleElements>
      <BaseDirectionProvider direction={direction}>
        <BaseScrollArea.Root
          {...properties}
          className={classNames(scrollAreaStyles.root, className)}
          dir={direction}
          ref={ref}
        />
      </BaseDirectionProvider>
    </BaseCSPProvider>
  )
);

export type ScrollAreaFade = "block";

export interface ScrollAreaViewportProps extends Omit<
  BaseScrollArea.Viewport.Props,
  "className"
> {
  readonly className?: string;
  readonly fade?: ScrollAreaFade;
}

export const ScrollAreaViewport = forwardRef<
  HTMLDivElement,
  ScrollAreaViewportProps
>(({ className, fade, ...properties }, ref) => (
  <BaseScrollArea.Viewport
    {...properties}
    className={classNames(scrollAreaStyles.viewport, className)}
    data-fade={fade}
    ref={ref}
  />
));

export const ScrollAreaContent = BaseScrollArea.Content;
export type ScrollAreaContentProps = BaseScrollArea.Content.Props;

export interface ScrollAreaScrollbarProps extends Omit<
  BaseScrollArea.Scrollbar.Props,
  "className"
> {
  readonly className?: string;
}

export const ScrollAreaScrollbar = forwardRef<
  HTMLDivElement,
  ScrollAreaScrollbarProps
>(({ className, ...properties }, ref) => (
  <BaseScrollArea.Scrollbar
    {...properties}
    className={classNames(scrollAreaStyles.scrollbar, className)}
    ref={ref}
  />
));

export interface ScrollAreaThumbProps extends Omit<
  BaseScrollArea.Thumb.Props,
  "className"
> {
  readonly className?: string;
}

export const ScrollAreaThumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>(
  ({ className, ...properties }, ref) => (
    <BaseScrollArea.Thumb
      {...properties}
      className={classNames(scrollAreaStyles.thumb, className)}
      ref={ref}
    />
  )
);

export const ScrollAreaCorner = BaseScrollArea.Corner;
export type ScrollAreaCornerProps = BaseScrollArea.Corner.Props;

export const ScrollArea = {
  Content: ScrollAreaContent,
  Corner: ScrollAreaCorner,
  Root: ScrollAreaRoot,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Viewport: ScrollAreaViewport,
} as const;
