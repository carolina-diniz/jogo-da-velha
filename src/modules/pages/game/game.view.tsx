import type { JSX } from 'react';
import { Button, useSocket } from '~core';
import { Board, InfoMenu } from './components';
import './game.style.scss';

export function GameView(): JSX.Element {
  const websocket = useSocket();

  function onClick(): void {
    websocket.leaveRoom();
  }

  return (
    <div className="game-page__container">
      <InfoMenu />
      <Board />
      <Button width={'20rem'} onPress={onClick}>
        SAIR
      </Button>
    </div>
  );
}
