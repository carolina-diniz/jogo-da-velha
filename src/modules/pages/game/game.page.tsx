import type { JSX } from 'react';
import { Background, Footer } from '~core';
import { GameView } from './game.view';
import { useGame } from './hooks/game.hook';

export function GamePage(): JSX.Element {
  const { isHidden, description, showToastModal, onClickLeave } = useGame();

  return (
    <>
      <Background />
      <GameView
        onClickLeave={onClickLeave}
        isHidden={isHidden}
        description={description}
        showToastModal={showToastModal}
      />
      <Footer />
    </>
  );
}
