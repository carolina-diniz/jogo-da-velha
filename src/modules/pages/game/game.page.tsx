import type { JSX } from 'react';
import { Background } from '~core';
import { GameView } from './game.view';

export function GamePage(): JSX.Element {
  return (
    <>
      <Background />
      <GameView />
    </>
  );
}
