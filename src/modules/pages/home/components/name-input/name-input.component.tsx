import type { JSX } from 'react';
import './name-input.style.scss';

interface NameInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function NameInput(props: NameInputProps): JSX.Element {
  const { value, placeholder, onChange } = props;

  return (
    <input
      className="userName"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
