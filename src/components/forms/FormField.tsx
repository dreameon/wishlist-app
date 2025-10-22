import { Form } from "radix-ui";

function Label({
  required,
  children,
}: {
  required: boolean;
  children: string;
}) {
  if (required) {
    return <h6 className="text-(--color-text-tertiary)">{children}</h6>;
  } else {
    return (
      <div className="flex flex-row grow self-stretch items-end justify-between">
        <h6 className="text-(--color-text-tertiary)">{children}</h6>
        <p className="text-(--color-text-tertiary) leading-[24px] text-xs">
          (Optional)
        </p>
      </div>
    );
  }
}

export default function FormField({
  name,
  label,
  children,
  validationMsg,
  ...rest
}: {
  name: string;
  label: string;
  children: React.ReactNode;
  validationMsg?: string;
  required: boolean;
}) {
  console.log("Rendering FormField for:", name);
  return (
    <Form.Field
      name={name}
      className="flex flex-col gap-[8px] items-start self-stretch grow"
    >
      <Form.Label asChild>
        <Label required={rest.required}>{label}</Label>
      </Form.Label>
      <Form.Control asChild>{children}</Form.Control>

      {/* Validation Messages */}
      {/* TODO: Use Form.ValidityState component to do custom styling so that message gets triggered properly */}
      <Form.Message match="valueMissing" className="text-(--color-text-error)">
        Please fill out this field
      </Form.Message>
      <Form.Message match="typeMismatch" className="text-(--color-text-error)">
        {validationMsg}
      </Form.Message>
    </Form.Field>
  );
}
