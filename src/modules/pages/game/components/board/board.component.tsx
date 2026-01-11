import type { JSX } from 'react';
import './board.style.scss';
import { Block } from './components';

export function Board(): JSX.Element {
  // Mocked data

  const table: Array<{ value: 'o' | 'x' | null; isHighlighted: boolean }> = [
    { value: 'x', isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: 'o', isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: 'x', isHighlighted: false },
    { value: 'x', isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: 'o', isHighlighted: false },
  ];

  // Example title indicating the current player's turn
  const title = 'VEZ DE: Jogador 1';

  return (
    <div className="board__container">
      <h1 className="board__title">{title}</h1>
      <div className="board__wrapper">
        <div className="board__grid">
          {table.map((block, rowIndex) => (
            <Block key={rowIndex} value={block.value} isHighlighted={block.isHighlighted} />
          ))}
        </div>
      </div>
    </div>
  );
}
