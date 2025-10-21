export default function TextAreaInput({
  name,
  value,
  onChange,
  required,
  placeholder,
  ...rest
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder: string;
  children?: React.ReactNode;
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex p-[8px] h-[160px] outline-0 justify-start items-start self-stretch 
      bg-(--color-input-bg-default) border-[1px] rounded-(--radius-xs) border-(--color-input-border-default) 
      hover:border-(--color-input-border-hover) focus:bg-(--color-input-bg-active) focus:border-(--color-input-border-active) placeholder:text-(--color-text-disabled)"
      required={required}
    />
  );
}
