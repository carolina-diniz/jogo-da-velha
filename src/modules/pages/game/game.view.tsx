import { useState, type JSX } from 'react';
import { Button, Modal, ModalKind, ModalPosition } from '~core';
import { Board, Chat, InfoMenu } from './components';
import './game.style.scss';

interface GameParams {
  isHidden: boolean;
  description: string;
  onClickLeave: () => void;
  showToastModal: (text: string) => void;
}

export function GameView(params: GameParams): JSX.Element {
  const { isHidden, description, onClickLeave, showToastModal } = params;

  const [isHiddenConfirm, setIsHiddenConfirm] = useState(true);

  return (
    <>
      <div className="game-page__container">
        <InfoMenu showToastModal={showToastModal} />
        <Board showToastModal={showToastModal} />
        <div className="game-page__chat-section">
          <div className="game-page__leave-button-container">
            <Button width={'20rem'} onPress={() => setIsHiddenConfirm(false)}>
              SAIR
            </Button>
          </div>
          <Chat></Chat>
        </div>
      </div>

      <Modal
        $typeof={ModalKind.Confirm}
        title="DESEJA ABANDONAR A PARTIDA?"
        description="Ao abandonar uma partida, todo seu progresso será excluído"
        buttonLabel={['SIM', 'NÃO']}
        isHidden={isHiddenConfirm}
        onClickConfirm={onClickLeave}
        onClickClose={() => setIsHiddenConfirm(true)}
      />

      <Modal
        $typeof={ModalKind.Toast}
        isHidden={isHidden}
        description={description}
        position={ModalPosition.Bottom}
      />
    </>
  );
}
