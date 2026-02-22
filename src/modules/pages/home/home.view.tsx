import { type JSX } from 'react';
import doorSvg from '~assets/door.svg';
import languageSvg from '~assets/language.svg';
import plusSvg from '~assets/plus.svg';
import { Modal, ModalKind, ModalPosition, type InputDialogModalProps } from '~core';
import { Avatar, Button, NameInput } from './components';
import './home.style.scss';

interface HomeParams {
  userCode: string;
  hasError: boolean;
  playerName: string;
  selectedAvatar: string;
  placeholder: string;
  isHidden: boolean;
  shouldShowToast: boolean;
  setPlayerName: (value: string) => void;
  setSelectedAvatar: (value: string) => void;
  setIsHidden: (value: boolean) => void;
  onCreateRoom: () => void;
  onSubmit: () => void;
  onChangeValue: InputDialogModalProps['onChange'];
  showToast: () => void;
}

export function HomeView(params: HomeParams): JSX.Element {
  const {
    userCode,
    hasError,
    playerName,
    selectedAvatar,
    placeholder,
    isHidden,
    shouldShowToast,
    setPlayerName,
    setSelectedAvatar,
    setIsHidden,
    onCreateRoom,
    onSubmit,
    onChangeValue,
    showToast,
  } = params;

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
              <Button name="ENTRAR" img={doorSvg} onClick={() => setIsHidden(false)} />
              <Button name="IDIOMA" img={languageSvg} onClick={() => showToast()} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        $typeof={ModalKind.InputDialog}
        title="ENTRAR COM CÓDIGO"
        description="Digite o código para entrar na sala"
        placeholder="XXXX-XXXX"
        value={userCode}
        buttonLabel="ENTRAR"
        isHidden={isHidden}
        hasError={hasError}
        onChange={onChangeValue}
        onSubmit={onSubmit}
        setIsHidden={setIsHidden}
        hasOverlay
      />
      <Modal
        $typeof={ModalKind.Toast}
        description="Em breve..."
        isHidden={!shouldShowToast}
        position={ModalPosition.Bottom}
      />
    </>
  );
}
