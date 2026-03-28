import type { JSX } from 'react';
import { useSocket } from '~core';
import './board.style.scss';
import { Block } from './components';

interface BoardProps {
  showToastModal: (text: string) => void;
  countdown: number | null;
}

export function Board(props: BoardProps): JSX.Element {
  const { showToastModal, countdown } = props;
  const { board, turn, players } = useSocket();

  console.log(players);

  const { name } = players.find((player) => player.id === turn) ?? {};

  const title =
    countdown !== null
      ? `Reiniciando em: ${countdown.toString().padStart(2, '0')}s`
      : name !== null
        ? `Vez de:  ${name} `
        : 'Carregando novo jogo...';

  return (
    <div className="board">
      <h1 className={'board__game-title'}>JOGO DA VELHA</h1>
      <div className="board__container">
        <h1 className={'board__title'}>{title}</h1>
        <div className="board__wrapper">
          <div className="board__grid">
            {board.map((block, rowIndex) => (
              <Block
                key={rowIndex}
                index={rowIndex}
                value={block.value}
                isHighlighted={block.isHighlighted}
                showToastModal={showToastModal}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
