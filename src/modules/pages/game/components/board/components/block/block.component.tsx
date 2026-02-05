import { type JSX } from 'react';
import svgO from '~assets/o.svg';
import svgX from '~assets/x.svg';
import type { Symbol } from '~core';
import { useBlock } from './block.hook';
import './block.style.scss';

export interface BlockProps {
  value: Symbol;
  isHighlighted: boolean;
}

export function Block(props: BlockProps): JSX.Element {
  const { isValid, isHighlighted, value, onPress } = useBlock(props);

  const images = {
    O: svgO,
    X: svgX,
  };

  return (
    <div
      className={`block__container ${isValid ? '' : 'invalid'} ${isHighlighted ? 'highlighted' : ''}`}
      onClick={onPress}
    >
      {value !== null && <img src={images[value]} draggable={false} />}
    </div>
  );
}
