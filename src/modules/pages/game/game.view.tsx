import type { JSX } from 'react';
import { Board, InfoMenu } from './components';
import './game.style.scss';

export function GameView(): JSX.Element {
  return (
    <div className="game-page__container">
      <InfoMenu />
      <Board />
    </div>
  );
}
