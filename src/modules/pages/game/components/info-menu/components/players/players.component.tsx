import type { JSX } from 'react';
import { getAvatarImage } from '~core';
import './player.style.scss';

interface PlayerProps {
  name: string;
  wins: number;
  isSelected: boolean;
  avatarUrl: string;
}

export function Player(props: PlayerProps): JSX.Element {
  const { name, wins, isSelected, avatarUrl } = props;

  return (
    <div className={isSelected ? 'player__container selected' : 'player__container'}>
      <div className="player__avatar">
        <img src={getAvatarImage(avatarUrl)} alt={name} />
      </div>
      <p className="player__name">{name}</p>
      <div className="player__wins-pill">
        <span className="player__wins-count">{wins}</span>
      </div>
    </div>
  );
}
