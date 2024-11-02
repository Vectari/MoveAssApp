import React from "react";

interface InputProps {
  type: string;
  id: string;
  value?: string;
  checked?: boolean;
  onChange: React.ReactEventHandler;
}

export function Input({ type, id, value, checked, onChange }: InputProps) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
    />
  );
}
