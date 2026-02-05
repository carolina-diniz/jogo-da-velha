import type { JSX } from 'react';
import { Background, Footer } from '~core';
import { HomeView } from './home.view';
import { useHomePage } from './hooks/home.hook';

export function HomePage(): JSX.Element {
  const {
    playerName,
    selectedAvatar,
    placeholder,
    setPlayerName,
    setSelectedAvatar,
    onCreateRoom,
    onJoinRoom,
  } = useHomePage();

  return (
    <>
      <Background />
      <HomeView
        playerName={playerName}
        selectedAvatar={selectedAvatar}
        placeholder={placeholder}
        setPlayerName={setPlayerName}
        setSelectedAvatar={setSelectedAvatar}
        onCreateRoom={onCreateRoom}
        onJoinRoom={onJoinRoom}
      />
      <Footer />
    </>
  );
}
