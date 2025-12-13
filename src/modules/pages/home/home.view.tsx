import type { JSX } from 'react';
import { Avatar } from './components';
import './home.style.scss';

export function HomeView(): JSX.Element {
  return (
    <div className="home__menu-content">
      <h1 className="home__title">JOGO DA VELHA</h1>
      <Avatar />
      <div className="home__divider"></div>
    </div>
  );
}
