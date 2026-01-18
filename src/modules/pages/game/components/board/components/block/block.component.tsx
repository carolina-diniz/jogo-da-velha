import { type JSX } from 'react';
import svgO from '~assets/o.svg';
import svgX from '~assets/x.svg';
import { useBlock } from './block.hook';
import './block.style.scss';

export interface BlockProps {
  value: 'o' | 'x' | null;
  isHighlighted: boolean;
}

export function Block(props: BlockProps): JSX.Element {
  const { isValid, isHighlighted, value, onPress } = useBlock(props);

  const images = {
    o: svgO,
    x: svgX,
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
