import type { JSX } from 'react';
import { Button } from '~core';
import { RoomCode } from '../room-code';
import { Player } from './components';
import './info-menu.style.scss';

export function InfoMenu(): JSX.Element {
  const players = [
    { id: '1', name: 'Kaworii', wins: 3, avatarUrl: 'cat' },
    { id: '2', name: 'Felipe', wins: 9, avatarUrl: 'panda' },
  ];
  const turn = { id: '1' };
  const draw = 0;

  return (
    <div className="info-menu__container">
      <RoomCode />
      <div className="info-menu">
        <p className="info-menu__title">JOGADORES {players.length}/2</p>
        <div className="info-menu__box">
          {players.map((player) => (
            <Player
              name={player.name}
              wins={player.wins}
              avatarUrl={player.avatarUrl}
              key={player.id}
              isSelected={turn.id === player.id}
            />
          ))}
          <div className="info-menu__draw">
            <p>Empates</p>
            <span>{draw}</span>
          </div>
        </div>
        <Button>REGRAS</Button>
        <Button>TEMAS</Button>
        <Button variant>IDIOMAS</Button>
      </div>
    </div>
  );
}
