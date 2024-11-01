interface InputProps {
  type: string;
  id: string;
  value: string;
  onChange: React.ReactEventHandler;
}

export function Input({ type, id, value, onChange }: InputProps) {
  return <input type={type} id={id} value={value} onChange={onChange} />;
}
