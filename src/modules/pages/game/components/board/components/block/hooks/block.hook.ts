import { useState } from 'react';
import { useSocket, type Symbol } from '~core';
import type { BlockProps } from '../block.component';

interface BlockReturn {
  index: number;
  value: Symbol;
  isValid: boolean;
  isHighlighted: boolean;
  onPress: () => void;
}

export function useBlock(props: BlockProps): BlockReturn {
  const { index, value, isHighlighted, showToastModal } = props;
  const [isValid, setIsValid] = useState(true);
  const { makeMove, isMyTurn, players } = useSocket();

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
    if (players.length < 2) {
      showToastModal('Aguardando outro jogador entrar na sala...');
      blink();

      return;
    }

    if (!isMyTurn) {
      showToastModal('Aguarde a sua vez!');
      blink();

      return;
    }

    if (value !== null) {
      showToastModal('Esta casa já está ocupada!');
      blink();

      return;
    }

    const x = index % 3;
    const y = Math.floor(index / 3);

    makeMove(x, y);
  }

  return {
    index,
    value,
    isValid,
    isHighlighted,
    onPress,
  };
}
