import { PropsWithChildren } from "react";
import { Form } from "radix-ui";

export default function FormWrapper({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  return (
    <Form.Root className="flex flex-col grow justify-end items-end gap-[32px] self-stretch min-w-0">
      {children}
    </Form.Root>
  );
}
