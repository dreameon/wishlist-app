export default function TextInput({
  name,
  value,
  onChange,
  required,
  placeholder,
  ...rest
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder: string;
}) {
  return (
    <input
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex p-[8px] outline-0 items-start self-stretch 
      bg-(--color-input-bg-default) border-[1px] rounded-(--radius-xs) border-(--color-input-border-default) 
      hover:border-(--color-input-border-hover) focus:bg-(--color-input-bg-active) focus:border-(--color-input-border-active) placeholder:text-(--color-text-disabled)"
      required={required}
    />
  );
}
