import type { JSX } from 'react';
import { Avatar } from './components';
import './home.style.scss';
import { Button } from '~core';

export function HomeView(): JSX.Element {
  return (
    <>
      <Button>teste</Button>
      <div className="home__menu-content">
        <h1 className="home__title">JOGO DA VELHA</h1>
        <Avatar />
        <div className="home__divider"></div>
      </div>
    </>
  );
}
