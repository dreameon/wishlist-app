import { ToggleGroup } from "radix-ui";
import TextButton from "@/components/buttons/TextButton";
import { RefAttributes } from "react";

export default function ToggleInput({
  title,
  options,
  ...rest
}: {
  title: string;
  options: string[];
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-row gap-[24px] items-center">
      <div className="text-[16px] font-bold leading-[24px]">{title}</div>
      <ToggleGroup.Root
        type="single"
        className="flex flex-row gap-[8px] min-w-0 "
        {...rest}
      >
        {options.map((optionValue, index) => (
          <ToggleGroup.Item key={index} value={optionValue} asChild>
            <TextButton variant="Toggle" type="button">
              {optionValue}
            </TextButton>
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
}
