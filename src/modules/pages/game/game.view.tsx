import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, useSocket } from '~core';
import { Board, InfoMenu } from './components';
import './game.style.scss';

export function GameView(): JSX.Element {
  const websocket = useSocket();
  const navigate = useNavigate();

  function onClick(): void {
    websocket.leaveRoom();
    navigate('/');
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
