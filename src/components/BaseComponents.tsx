import { useState, PropsWithChildren } from "react";
import { Form } from "radix-ui";

/* ----------------------------- Button Components ------------------------------ */
interface BaseButtonProps {
  value: string;
  type: "submit" | "button" | "reset" | undefined;
  onClick: (e: any) => void;
  style: string;
}

function BaseButton(props: any) {
  const {
    value,
    type,
    onClick = () => {
      return;
    },
    customStyle,
    ...rest
  }: {
    value: string;
    type: "submit" | "button" | "reset" | undefined;
    onClick: (e: any) => void;
    customStyle: string;
  } = props;
  return (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      className={`clickable truncate  max-w-[128px] inline-flex h-(--size-s) px-[24px] content-center items-center shrink-0 rounded-(--radius-m) ${customStyle}`}
    >
      {value}
    </button>
  );
}

export function PrimaryButton(props: any) {
  return (
    <BaseButton
      {...props}
      customStyle="text-(--color-button-primary-text) bg-(--color-button-primary-bg-default) hover:bg-(--color-button-primary-bg-hover) active:bg-(--color-button-primary-bg-active)"
    />
  );
}

export function SecondaryButton(props: any) {
  return (
    <BaseButton
      {...props}
      customStyle="text-(--color-button-secondary-text) bg-(--color-button-secondary-bg-default) hover:bg-(--color-button-secondary-bg-hover) active:bg-(--color-button-secondary-bg-active) border-(--color-button-secondary-border)"
    />
  );
}

export function TertiaryButton(props: any) {
  return (
    <BaseButton
      {...props}
      customStyle="text-(--color-button-tertiary-text) bg-(--color-button-tertiary-bg-default) hover:bg-(--color-button-tertiary-bg-hover) active:bg-(--color-button-tertiary-bg-active)"
    />
  );
}

export function ToggleButton(props: any) {
  return (
    <BaseButton
      {...props}
      customStyle="text-(--color-button-toggle-text) border-[1px] bg-(--color-button-toggle-bg-default) border-(--color-button-toggle-border-default) hover:bg-(--color-button-toggle-bg-hover) hover:border-(--color-button-toggle-border-active) active:bg-(--color-button-toggle-bg-down) active:border-(--color-button-toggle-border-active) data-[state=on]:bg-(--color-button-toggle-bg-active) data-[state=on]:border-(--color-button-toggle-border-active)"
    />
  );
}

export function IconButton({ path }: { path: string }) {
  return (
    <button className="clickable rounded-(--radius-s) bg-(--color-button-icon-bg-default) flex w-[32px] h-[32px] justify-center items-center shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d={path}
          className="stroke-(--color-button-icon-text)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ----------------------------- Other Components ------------------------------ */
function Label({ children }: { children: string }) {
  return <h6 className="text-(--color-text-tertiary)">{children}</h6>;
}

export function FormField(props: any) {
  const { name, label }: { name: string; label: string } = props;
  return (
    <Form.Field
      name={name}
      className="flex flex-col gap-[8px] items-start self-stretch"
    >
      <Form.Label asChild>
        <Label>{label}</Label>
      </Form.Label>
      <Form.Control asChild>
        <input
          className="flex p-[8px] items-start self-stretch bg-(--color-input-bg-default) border-[1px] rounded-(--radius-xs) border-(--color-input-border-default)"
          type="email"
          required
        />
      </Form.Control>
    </Form.Field>
  );
}
