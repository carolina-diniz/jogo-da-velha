import type { JSX } from 'react';
import pencilAssetPath from '~assets/pencil-black.svg';
import { getAvatarImage } from '~core';
import { useAvatar } from './avatar.hook';
import './avatar.style.scss';

interface AvatarProps {
  selectedAvatar: string;
  onAvatarChange: (avatar: string) => void;
}

export function Avatar(props: AvatarProps): JSX.Element {
  const { selectedAvatar } = props;
  const { onPress } = useAvatar();

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
      <div className="avatar__btn-edit" onClick={onPress}>
        <img src={pencilAssetPath} alt="Avatar edit icon" />
      </div>
    </div>
  );
}
