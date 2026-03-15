import type { JSX } from 'react';
import { useSocket } from '~core';
import './board.style.scss';
import { Block } from './components';

export function Board(): JSX.Element {
  const { board } = useSocket();

  // Example title indicating the current player's turn
  const title = 'VEZ DE: Jogador 1';

  return (
    <div className="board">
      <h1 className="board__game-title">JOGO DA VELHA</h1>
      <div className="board__container">
        <h1 className="board__title">{title}</h1>
        <div className="board__wrapper">
          <div className="board__grid">
            {board.map((block, rowIndex) => (
              <Block
                key={rowIndex}
                index={rowIndex}
                value={block.value}
                isHighlighted={block.isHighlighted}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
