import type { JSX } from 'react';
import './name-input.style.scss';

export function NameInput(): JSX.Element {
  return <input className="userName" type="text" placeholder="Anonimo321" />;
}
