import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~core';
import { Board, InfoMenu } from './components';
import './game.style.scss';

export function GameView(): JSX.Element {
  const navigate = useNavigate();

  function onClick(): void {
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
