import type { JSX } from 'react';
import doorSvg from '~assets/door.svg';
import languageSvg from '~assets/language.svg';
import plusSvg from '~assets/plus.svg';
import { Avatar, Button, NameInput } from './components';
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
          <div className="home__buttons">
            <Button name="CRIAR SALA" img={plusSvg} />
            <Button name="ENTRAR" img={doorSvg} />
            <Button name="IDIOMA" img={languageSvg} />
          </div>
        </div>
      </div>
    </div>
  );
}
