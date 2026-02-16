import type { JSX } from 'react';
import { Button, Modal, ModalKind, ModalPosition } from '~core';
import { Board, InfoMenu } from './components';
import './game.style.scss';

interface GameParams {
  isHidden: boolean;
  description: string;
  onClickLeave: () => void;
  showToastModal: (text: string) => void;
}

export function GameView(params: GameParams): JSX.Element {
  const { isHidden, description, onClickLeave, showToastModal } = params;

  return (
    <>
      <div className="game-page__container">
        <InfoMenu showToastModal={showToastModal} />
        <Board />
        <Button width={'20rem'} onPress={onClickLeave}>
          SAIR
        </Button>
      </div>

      <Modal
        $typeof={ModalKind.Toast}
        isHidden={isHidden}
        description={description}
        position={ModalPosition.Bottom}
      />
    </>
  );
}
