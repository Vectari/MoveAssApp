import React from "react";

interface CheckboxProps {
  type: string;
  id: string;
  checked: boolean;
  onChange: React.ReactEventHandler;
}

export function Checkbox({ type, id, checked, onChange }: CheckboxProps) {
  return <input type={type} id={id} checked={checked} onChange={onChange} />;
}
