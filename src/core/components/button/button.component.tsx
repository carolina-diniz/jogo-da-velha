import type { JSX } from 'react';
import './button.style.scss';

type ButtonVariant = 'primary' | 'secondary' | 'agree' | 'disagree';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  width?: string;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function Button(props: ButtonProps): JSX.Element {
  const { children, variant: isVariant = 'primary', width, onPress, onFocus, onBlur } = props;

  const variantName = isVariant === 'primary' ? 'button' : `button ${isVariant}`;

  return (
    <button
      className={variantName}
      style={{ width }}
      onClick={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <p className={`button__text ${isVariant === 'primary' ? '' : isVariant}`}>{children}</p>
    </button>
  );
}
