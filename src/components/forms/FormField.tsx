import { Form } from "radix-ui";

function Label({ children }: { children: string }) {
  return <h6 className="text-(--color-text-tertiary)">{children}</h6>;
}

export default function FormField(props: any) {
  const {
    name,
    label,
  }: {
    name: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  } = props;
  return (
    <Form.Field
      name={name}
      className="flex flex-col gap-[8px] items-start self-stretch"
    >
      <Form.Label asChild>
        <Label>{label}</Label>
      </Form.Label>
      <Form.Control asChild>{props.children}</Form.Control>
    </Form.Field>
  );
}
