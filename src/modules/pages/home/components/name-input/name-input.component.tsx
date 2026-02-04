import type { JSX } from 'react';
import './name-input.style.scss';

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function NameInput(props: NameInputProps): JSX.Element {
  const { value, onChange } = props;

  return (
    <input
      className="userName"
      type="text"
      placeholder="Anonimo321"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
