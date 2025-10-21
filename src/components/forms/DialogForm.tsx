import { Dialog } from "radix-ui";

export default function DialogForm(props: any) {
  const {
    open,
    setOpen,
    children,
    title,
    size,
  }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    children: React.ReactNode;
    title: string;
    size: "small" | "medium" | "large";
  } = props;

  const width =
    size === "small"
      ? "w-[400px]"
      : size === "medium"
      ? "w-[912px]"
      : "w-[912px]";
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/25 fixed inset-0" />
        <Dialog.Content
          className={`flex flex-col ${width} bg-(--color-modal-bg) rounded-(--radius-xs) absolute top-1/2 left-1/2 -translate-1/2 p-[24px] gap-[24px]`}
        >
          <Dialog.Title className="" asChild>
            <h2>{title}</h2>
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
