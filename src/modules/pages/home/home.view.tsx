import type { JSX } from 'react';
import { Button } from '~core';
import { Avatar } from './components';
import { UserNameInput } from './components/user-name-input/user-name-input.component';
import './home.style.scss';

export function HomeView(): JSX.Element {
  return (
    <>
      <Button>teste</Button>
      <div className="home__menu-content">
        <h1 className="home__title">JOGO DA VELHA</h1>
        <Avatar />
        <UserNameInput />
        <div className="home__divider"></div>
      </div>
    </>
  );
}
