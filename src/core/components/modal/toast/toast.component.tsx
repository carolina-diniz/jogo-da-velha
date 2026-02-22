import type { JSX } from 'react';
import type { ToastModalProps } from '../modal.type';
import './toast.style.scss';

export function ToastModal(props: ToastModalProps): JSX.Element {
  const { description } = props;

  return <p className="toast__text">{description}</p>;
}
