import { useState } from 'react';
import type { BlockProps } from './block.component';

interface BlockReturn {
  value: 'o' | 'x' | null;
  isValid: boolean;
  isHighlighted: boolean;
  onPress: () => void;
}

export function useBlock(props: BlockProps): BlockReturn {
  const { value, isHighlighted } = props;
  const [isValid, setIsValid] = useState(true);

  function blink(): void {
    let count = 0;

    const doBlink = (): void => {
      setIsValid(false);
      setTimeout(() => {
        setIsValid(true);
        count++;
        if (count < 2) {
          setTimeout(doBlink, 100);
        }
      }, 300);
    };

    doBlink();
  }

  function onPress(): void {
    if (value !== null) {
      blink();
    }
  }

  return {
    value,
    isValid,
    isHighlighted,
    onPress,
  };
}
