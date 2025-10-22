import { Form } from "radix-ui";

function Label({ children }: { children: string }) {
  return <h6 className="text-(--color-text-tertiary)">{children}</h6>;
}

export default function FormField({
  name,
  label,
  children,
  ...rest
}: {
  name: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  console.log("Rendering FormField for:", name);
  return (
    <Form.Field
      name={name}
      className="flex flex-col gap-[8px] items-start self-stretch"
    >
      <Form.Label asChild>
        <Label>{label}</Label>
      </Form.Label>
      <Form.Control asChild>{children}</Form.Control>
      {/* Validation Messages */}
      <Form.Message match="typeMismatch" className="text-(--color-error-text)">
        Please provide a valid input.
      </Form.Message>
    </Form.Field>
  );
}
