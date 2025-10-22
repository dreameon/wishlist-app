export default function TextInput({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className="flex p-[8px] outline-0 items-start self-stretch 
      bg-(--color-input-bg-default) border-[1px] rounded-(--radius-xs) border-(--color-input-border-default) 
      hover:border-(--color-input-border-hover) focus:bg-(--color-input-bg-active) focus:border-(--color-input-border-active) 
      placeholder:text-(--color-text-disabled) invalid:border-(--color-input-border-invalid) invalid:text-(--color-input-text-invalid)"
      {...rest}
    />
  );
}
