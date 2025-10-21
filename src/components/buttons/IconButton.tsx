import Icon from "@/components/Icon";

export default function IconButton(props: any) {
  const {
    icon,
    type,
    ...rest
  }: {
    icon: "plus" | "ellipsis";
    type: "primary" | "secondary" | "tertiary" | "standard";
  } = props;
  const icons = {
    plus: ["M6 12H12M12 12H18M12 12V6M12 12V18"],
    ellipsis: [
      "M11.5 12C11.5 12.2761 11.7239 12.5 12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12Z",
      "M5.5 12C5.5 12.2761 5.7239 12.5 6 12.5C6.2761 12.5 6.5 12.2761 6.5 12C6.5 11.7239 6.2761 11.5 6 11.5C5.7239 11.5 5.5 11.7239 5.5 12Z",
      "M17.5 12C17.5 12.2761 17.7239 12.5 18 12.5C18.2761 12.5 18.5 12.2761 18.5 12C18.5 11.7239 18.2761 11.5 18 11.5C17.7239 11.5 17.5 11.7239 17.5 12Z",
    ],
  };
  const styles = {
    primary: {
      base: "bg-(--color-button-icon-bg-default) hover:bg-(--color-button-icon-bg-hover) active:bg-(--color-button-icon-bg-active)",
      icon: "stroke-(--color-button-icon-text)",
    },
    secondary: {
      base: "bg-(--color-button-icon-bg-default) hover:bg-(--color-button-icon-bg-hover) active:bg-(--color-button-icon-bg-active)",
      icon: "stroke-(--color-button-icon-text)",
    }, // don't use yet - have not designed secondary icon button colors
    tertiary: {
      base: "bg-(--color-button-icon-bg-default) hover:bg-(--color-button-icon-bg-hover) active:bg-(--color-button-icon-bg-active)",
      icon: "stroke-(--color-button-icon-text)",
    }, // don't use yet - have not designed tertiary icon button colors
    standard: {
      base: "transparent",
      icon: "stroke-(--color-sidebar-item-icon)",
    },
  };
  return (
    <button
      className={`clickable rounded-(--radius-s) flex w-[32px] h-[32px] justify-center items-center shrink-0 ${styles[type].base}`}
      {...rest}
    >
      <Icon icon={icon} strokeColor={styles[type].icon} />
    </button>
  );
}
