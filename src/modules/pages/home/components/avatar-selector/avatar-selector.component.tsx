import type { JSX } from 'react';
import { getAllAvatars, getAvatarImage } from '~core';
import './avatar-selector.style.scss';

interface AvatarSelectorProps {
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
}

export function AvatarSelector(props: AvatarSelectorProps): JSX.Element {
  const { selectedAvatar, onSelect } = props;
  const avatars = getAllAvatars();

  return (
    <div className="avatar-selector">
      <h2 className="avatar-selector__title">Selecione um avatar</h2>
      <div className="avatar-selector__grid">
        {avatars.map((avatar: string) => (
          <button
            key={avatar}
            type="button"
            aria-label={`Selecionar avatar ${avatar}`}
            aria-pressed={selectedAvatar === avatar}
            className={'avatar-selector__item'}
            onClick={() => onSelect(avatar)}
          >
            <img src={getAvatarImage(avatar)} alt={avatar} className="avatar-selector__image" />
          </button>
        ))}
      </div>
    </div>
  );
}
