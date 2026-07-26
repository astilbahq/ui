export type ControlAppearance = "ghost" | "outline" | "primary";
export type ControlSize = "default" | "large";

interface ControlOptions {
  readonly appearance: ControlAppearance;
  readonly iconOnly: boolean;
  readonly size: ControlSize;
}

export const controlClassName = ({
  appearance,
  iconOnly,
  size,
}: ControlOptions): string => {
  const classNames = [
    "astilba-control",
    `astilba-control--appearance_${appearance}`,
    `astilba-control--size_${size}`,
    `astilba-control--iconOnly_${String(iconOnly)}`,
  ];

  if (iconOnly && size === "large") {
    classNames.push("astilba-w-is_2.5rem");
  }

  return classNames.join(" ");
};
