export default function TextAreaInput({
  ...rest
}: React.InputHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="flex p-[8px] h-[160px] outline-0 justify-start items-start self-stretch
      bg-(--color-input-bg-default) border-[1px] rounded-(--radius-xs) border-(--color-input-border-default) 
      hover:border-(--color-input-border-hover) focus:bg-(--color-input-bg-active) focus:border-(--color-input-border-active) 
      placeholder:text-(--color-text-disabled) invalid:border-(--color-input-border-invalid) invalid:text-(--color-input-text-invalid)"
      {...rest}
    />
  );
}
