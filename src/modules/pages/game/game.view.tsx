import { useEffect, useState, type JSX } from 'react';
import { Button, Modal, ModalKind, ModalPosition, useSocket } from '~core';
import { Board, Chat, InfoMenu, RoomCode } from './components';
import './game.style.scss';

interface GameParams {
  isHidden: boolean;
  description: string;
  onClickLeave: () => void;
  showToastModal: (text: string) => void;
}

export function GameView(params: GameParams): JSX.Element {
  const { isHidden, description, onClickLeave, showToastModal } = params;
  const { gameResult, roomId } = useSocket();

  const [isHiddenConfirm, setIsHiddenConfirm] = useState(true);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  useEffect(() => {
    if (gameResult !== null) {
      setIsResultModalVisible(true);
      setCountdown(10);

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 0) {
            clearInterval(interval);

            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsResultModalVisible(false);
      setCountdown(null);
    }
  }, [gameResult]);

  return (
    <>
      <div className="game-page__wrapper">
        <button
          className="game-mobile-burger"
          aria-label="Jogadores"
          onClick={() => setIsMobileInfoOpen(true)}
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="22" height="2" rx="1" fill="white" />
            <rect y="7" width="22" height="2" rx="1" fill="white" />
            <rect y="14" width="22" height="2" rx="1" fill="white" />
          </svg>
        </button>

        <button
          className="game-mobile-chat-fab"
          aria-label="Chat"
          onClick={() => setIsMobileChatOpen(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </button>

        {(isMobileInfoOpen || isMobileChatOpen) && (
          <div
            className="game-mobile-backdrop"
            onClick={() => {
              setIsMobileInfoOpen(false);
              setIsMobileChatOpen(false);
            }}
          />
        )}

        <div className="game-page__container">
          <InfoMenu
            showToastModal={showToastModal}
            isMobileOpen={isMobileInfoOpen}
            onLeave={() => {
              setIsMobileInfoOpen(false);
              setIsHiddenConfirm(false);
            }}
          />
          <Board showToastModal={showToastModal} countdown={countdown} />
          <div className="game-page__mobile-code">
            <RoomCode code={roomId} showToastModal={showToastModal} />
          </div>
          <div className={`game-page__chat-section${isMobileChatOpen ? ' is-open' : ''}`}>
            <div className="game-page__leave-button-container">
              <Button width={'min(20rem, 100%)'} onPress={() => setIsHiddenConfirm(false)}>
                SAIR
              </Button>
            </div>
            <Chat></Chat>
          </div>
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

      {gameResult && (
        <Modal
          $typeof={ModalKind.GameResult}
          result={gameResult}
          isHidden={!isResultModalVisible}
          hasOverlay={true}
          onClose={() => setIsResultModalVisible(false)}
          countdown={countdown}
        />
      )}
    </>
  );
}
