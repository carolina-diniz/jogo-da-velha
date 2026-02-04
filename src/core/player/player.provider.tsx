import { useState, type JSX, type ReactNode } from 'react';
import { randomName } from '../tools';
import { PlayerContext } from './player.context';

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps): JSX.Element {
  const [placeholder] = useState(() => randomName());
  const [playerName, setPlayerName] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('cat');

  return (
    <PlayerContext.Provider
      value={{
        playerName,
        selectedAvatar,
        placeholder,
        setPlayerName,
        setSelectedAvatar,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
