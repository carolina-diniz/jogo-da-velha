import type { JSX } from 'react';
import type { ToastModal as Toast } from '../modal.type';
import './toast.style.scss';

export function ToastModal(props: Toast): JSX.Element {
  const { description } = props;

  return <p className="toast__text">{description}</p>;
}
