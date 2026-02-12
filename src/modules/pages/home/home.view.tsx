import { useState, type JSX } from 'react';
import doorSvg from '~assets/door.svg';
import languageSvg from '~assets/language.svg';
import plusSvg from '~assets/plus.svg';
import { Avatar, Button, Join, NameInput } from './components';
import './home.style.scss';

interface HomeParams {
  playerName: string;
  selectedAvatar: string;
  placeholder: string;
  setPlayerName: (name: string) => void;
  setSelectedAvatar: (avatar: string) => void;
  onCreateRoom: () => void;
  onJoinRoom: (roomId: string) => void;
}

export function HomeView(params: HomeParams): JSX.Element {
  const {
    playerName,
    selectedAvatar,
    placeholder,
    setPlayerName,
    setSelectedAvatar,
    onCreateRoom,
    onJoinRoom,
  } = params;

  const [isJoinOpen, setIsJoinOpen] = useState<boolean>(false);

  return (
    <>
      <div className="home__wrapper">
        <div className="home__card">
          <h1 className="home__title">JOGO DA VELHA</h1>
          <div className="home__form">
            <div className="home__form-fields">
              <Avatar selectedAvatar={selectedAvatar} onAvatarChange={setSelectedAvatar} />
              <NameInput value={playerName} onChange={setPlayerName} placeholder={placeholder} />
            </div>
            <div className="home__separator"></div>
            <div className="home__buttons">
              <Button name="CRIAR SALA" img={plusSvg} onClick={onCreateRoom} />
              <Button name="ENTRAR" img={doorSvg} onClick={() => setIsJoinOpen(true)} />
              <Button name="IDIOMA" img={languageSvg} />
            </div>
          </div>
        </div>
      </div>
      {isJoinOpen && <Join setIsJoinOpen={setIsJoinOpen} onJoinRoom={onJoinRoom} />}
    </>
  );
}
