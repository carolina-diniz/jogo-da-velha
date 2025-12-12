import type { JSX } from 'react';
import { GameView } from './game.view';
import { Background } from '~core';

export function GamePage(): JSX.Element {
  return (
    <>
      <Background />
      <GameView />
    </>
  );
}
