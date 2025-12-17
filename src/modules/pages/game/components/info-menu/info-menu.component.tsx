import type { JSX } from 'react';
import { Button, ButtonVariant } from '~core';
import { Player } from './components/players';

export function InfoMenu(): JSX.Element {
  return (
    <>
      <Player name="Player 1" wins={9} isSelected={false} />
      <Player name="Player 2" wins={999} isSelected={true} />
      <Button>REGRAS</Button>
      <Button>TEMAS</Button>
      <Button>IDIOMAS</Button>
      <Button variant={ButtonVariant.Secundary}>VOLTAR</Button>
    </>
  );
}
