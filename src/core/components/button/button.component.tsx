import type { JSX } from 'react';
import './button.style.scss';
import { ButtonVariant } from './button.type';

interface ButtomProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function Button(props: ButtomProps): JSX.Element {
  const { children, variant = ButtonVariant.Default, onPress, onFocus, onBlur } = props;

  const variantName = variant === ButtonVariant.Default ? 'button' : `button ${variant}`;

  return (
    <div className={variantName} onClick={onPress} onFocus={onFocus} onBlur={onBlur}>
      <p className="button__text">{children}</p>
    </div>
  );
}
