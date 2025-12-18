import type { JSX } from 'react';
import './input.style.scss';

export function UserNameInput(): JSX.Element {
  return <input className="userName" type="text" placeholder="Anonimo321" />;
}
