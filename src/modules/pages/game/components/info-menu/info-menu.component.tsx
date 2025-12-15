import type { JSX } from 'react';
import { Player } from './components/players';

export function InfoMenu(): JSX.Element {
  return (
    <>
      <Player name="Player 1" wins={9} isSelected={false} />
      <Player name="Player 2" wins={3} isSelected={true} />
    </>
  );
}
