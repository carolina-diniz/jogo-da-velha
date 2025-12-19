import type { JSX } from 'react';
import { Button } from '~core';
import { Player } from './components';
import './info-menu.style.scss';

export function InfoMenu(): JSX.Element {
  const players = [
    { id: '1', name: 'Kaworii', wins: 3 },
    { id: '2', name: 'Felipe', wins: 9 },
  ];
  const turn = { id: '1' };
  const draw = 0;

  return (
    <div className="menu-info">
      <p className="menu-info__title">JOGADORES {players.length}/2</p>
      <div className="menu-info__box">
        {players.map((player) => (
          <Player
            name={player.name}
            wins={player.wins}
            key={player.id}
            isSelected={turn.id === player.id}
          />
        ))}
        <div className="menu-info__draw">
          <p>Empates</p>
          <span>{draw}</span>
        </div>
      </div>
      <Button>REGRAS</Button>
      <Button>TEMAS</Button>
      <Button variant>IDIOMAS</Button>
    </div>
  );
}
