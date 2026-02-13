import type { JSX } from 'react';
import { Background, Footer } from '~core';
import { HomeView } from './home.view';
import { useHomePage } from './hooks/home.hook';

export function HomePage(): JSX.Element {
  const {
    userCode,
    hasError,
    playerName,
    selectedAvatar,
    placeholder,
    isHidden,
    setPlayerName,
    setSelectedAvatar,
    setIsHidden,
    onCreateRoom,
    onSubmit,
    onChangeValue,
  } = useHomePage();

  return (
    <>
      <Background />
      <HomeView
        userCode={userCode}
        hasError={hasError}
        playerName={playerName}
        selectedAvatar={selectedAvatar}
        placeholder={placeholder}
        isHidden={isHidden}
        setPlayerName={setPlayerName}
        setSelectedAvatar={setSelectedAvatar}
        setIsHidden={setIsHidden}
        onCreateRoom={onCreateRoom}
        onSubmit={onSubmit}
        onChangeValue={onChangeValue}
      />
      <Footer />
    </>
  );
}
