import type { JSX } from 'react';
import './button.style.scss';

interface ButtomProps {
  children: React.ReactNode;
  variant?: boolean;
  width?: string;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function Button(props: ButtomProps): JSX.Element {
  const { children, variant: isVariant = false, width, onPress, onFocus, onBlur } = props;

  const variantName = isVariant ? 'button variant' : 'button';

  return (
    <div
      className={variantName}
      style={{ width }}
      onClick={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <p className="button__text">{children}</p>
    </div>
  );
}
