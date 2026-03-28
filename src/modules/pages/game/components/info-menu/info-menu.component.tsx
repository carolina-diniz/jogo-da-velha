import { type JSX } from 'react';
import { Button, useSocket } from '~core';
import { RoomCode } from '../room-code';
import { Player } from './components';
import './info-menu.style.scss';

interface InfoMenuParams {
  showToastModal: (text: string) => void;
  isMobileOpen?: boolean;
  onLeave?: () => void;
}

export function InfoMenu(params: InfoMenuParams): JSX.Element {
  const { showToastModal, isMobileOpen, onLeave } = params;
  const { players, draws, turn, roomId } = useSocket();

  return (
    <>
      <div className={`info-menu__container${isMobileOpen === true ? ' is-open' : ''}`}>
        <RoomCode code={roomId} showToastModal={showToastModal} />
        <div className="info-menu">
          <p className="info-menu__title">JOGADORES {players.length}/2</p>
          <div className="info-menu__box">
            {players.map((player) => (
              <Player
                name={player.name}
                wins={player.wins}
                avatar={player.avatar}
                key={player.id}
                isSelected={turn === player.id}
              />
            ))}
            <div className="info-menu__draw">
              <p>Empates</p>
              <span>{draws}</span>
            </div>
          </div>
          <Button onPress={() => showToastModal('Em breve...')}>REGRAS</Button>
          <Button onPress={() => showToastModal('Em breve...')}>TEMAS</Button>
          <Button onPress={() => showToastModal('Em breve...')}>IDIOMAS</Button>
        </div>
        {onLeave && (
          <div className="info-menu__mobile-leave">
            <Button width="100%" onPress={onLeave}>
              SAIR
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
