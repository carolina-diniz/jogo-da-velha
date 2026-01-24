import type { JSX } from 'react';
import { Avatar, NameInput } from './components';
import { HomeButtons, Join, Language } from './components/buttons';
import './home.style.scss';

export function HomeView(): JSX.Element {
  return (
    <div className="home__wrapper">
      <div className="home__card">
        <h1 className="home__title">JOGO DA VELHA</h1>
        <div className="home__form">
          <div className="home__form-fields">
            <Avatar />
            <NameInput />
          </div>
          <div className="home__separator"></div>
          <div>
            <HomeButtons />
            <Join />
            <Language />
          </div>
        </div>
      </div>
    </div>
  );
}
