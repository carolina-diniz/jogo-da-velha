import type { JSX } from 'react';
import PencilAssetPath from '~assets/pencil-black.svg';
import { useAvatar } from './avatar.hook';
import './avatar.style.scss';

export function Avatar(): JSX.Element {
  const { onPress } = useAvatar();

  return (
    <div className="avatar__container">
      <div className="avatar__btn-edit" onClick={onPress}>
        <img src={PencilAssetPath} alt="Avatar edit icon" />
      </div>
    </div>
  );
}
