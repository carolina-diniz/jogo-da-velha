import type { JSX } from 'react';
import { InfoMenu, RoomCode } from './components';

export function GameView(): JSX.Element {
  return (
    <>
      <RoomCode />
      <InfoMenu />
    </>
  );
}
