import React from "react";
import { InputWrapper } from "./Input.styled";

interface InputProps {
  htmlFor: string;
  label: string;
  type: string;
  id: string;
  value?: string;
  checked?: boolean;
  onChange: React.ReactEventHandler;
}

export function Input({
  htmlFor,
  label,
  type,
  id,
  value,
  checked,
  onChange,
}: InputProps) {
  return (
    <InputWrapper>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        placeholder={label}
        type={type}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </InputWrapper>
  );
}
