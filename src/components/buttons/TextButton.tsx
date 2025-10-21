type ButtonType = "submit" | "button" | "reset";

function BaseButton({
  type,
  onClick = () => {
    return;
  },
  customStyle,
  children,
  ...rest
}: {
  type: ButtonType;
  onClick?: (e: any) => void;
  customStyle: string;
  children: React.ReactNode;
}) {
  return (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      className={`min-w-0 clickable inline-flex h-(--size-s) px-[24px] content-center items-center rounded-(--radius-m) ${customStyle}`}
    >
      <p className="truncate">{children}</p>
    </button>
  );
}

export default function TextButton({
  variant,
  type,
  onClick,
  ...rest
}: {
  variant: "Primary" | "Secondary" | "Tertiary" | "Toggle";
  type: ButtonType;
  onClick?: (e: any) => void;
  children: React.ReactNode;
}) {
  if (variant === "Primary") {
    return (
      <BaseButton
        type={type}
        onClick={onClick}
        {...rest}
        customStyle="text-(--color-button-primary-text) bg-(--color-button-primary-bg-default) hover:bg-(--color-button-primary-bg-hover) active:bg-(--color-button-primary-bg-active)"
      />
    );
  } else if (variant === "Secondary") {
    return (
      <BaseButton
        type={type}
        onClick={onClick}
        {...rest}
        customStyle="text-(--color-button-secondary-text) bg-(--color-button-secondary-bg-default) hover:bg-(--color-button-secondary-bg-hover) active:bg-(--color-button-secondary-bg-active) border-[1px] border-(--color-button-secondary-border)"
      />
    );
  } else if (variant === "Tertiary") {
    return (
      <BaseButton
        type={type}
        onClick={onClick}
        {...rest}
        customStyle="text-(--color-button-tertiary-text) bg-(--color-button-tertiary-bg-default) hover:bg-(--color-button-tertiary-bg-hover) active:bg-(--color-button-tertiary-bg-active)"
      />
    );
  } else if (variant === "Toggle") {
    return (
      <BaseButton
        type={type}
        onClick={onClick}
        {...rest}
        customStyle="text-(--color-button-toggle-text) border-[1px] bg-(--color-button-toggle-bg-default) border-(--color-button-toggle-border-default) hover:bg-(--color-button-toggle-bg-hover) hover:border-(--color-button-toggle-border-active) active:bg-(--color-button-toggle-bg-down) active:border-(--color-button-toggle-border-active) data-[state=on]:bg-(--color-button-toggle-bg-active) data-[state=on]:border-(--color-button-toggle-border-active)"
      />
    );
  }
}
