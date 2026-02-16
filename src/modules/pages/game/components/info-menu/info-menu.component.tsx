import { type JSX } from 'react';
import { Button, useSocket } from '~core';
import { RoomCode } from '../room-code';
import { Player } from './components';
import './info-menu.style.scss';

interface InfoMenuParams {
  showToastModal: (text: string) => void;
}

export function InfoMenu(params: InfoMenuParams): JSX.Element {
  const { showToastModal } = params;
  const { players, draws, turn, roomId } = useSocket();

  return (
    <>
      <div className="info-menu__container">
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
      </div>
    </>
  );
}
