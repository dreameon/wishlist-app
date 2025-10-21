import { PropsWithChildren } from "react";
import { Form } from "radix-ui";

export default function FormWrapper(props: PropsWithChildren) {
  return (
    <Form.Root className="flex flex-col grow justify-end items-end gap-[24px] self-stretch">
      {props.children}
    </Form.Root>
  );
}
