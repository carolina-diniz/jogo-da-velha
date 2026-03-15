import type { JSX } from 'react';
import pencilAssetPath from '~assets/pencil-black.svg';
import { getAvatarImage } from '~core';
import './avatar.style.scss';

interface AvatarProps {
  selectedAvatar: string;
  onEditClick: () => void;
}

export function Avatar(props: AvatarProps): JSX.Element {
  const { selectedAvatar, onEditClick } = props;

  const avatarImage = getAvatarImage(selectedAvatar);

  return (
    <div
      className="avatar__container"
      style={{
        backgroundImage: `url(${avatarImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="avatar__btn-edit" onClick={onEditClick}>
        <img src={pencilAssetPath} alt="Avatar edit icon" />
      </div>
    </div>
  );
}
