import type { JSX } from 'react';
import type { ToastModalProps } from '../modal.type';
import './toast.style.scss';

export function ToastModal(props: ToastModalProps): JSX.Element {
  const { description, playerName, action } = props;

  if (playerName && action) {
    const actionText = action === 'joined' ? 'entrou na sala!' : 'saiu da sala!';

    return (
      <p className="toast__text">
        <span className="toast__player-name">{playerName}</span> {actionText}
      </p>
    );
  }

  return <p className="toast__text">{description}</p>;
}
