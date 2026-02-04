import { useState } from 'react';
import { useSocket } from '~core';

export interface HomePageReturn {
  playerName: string;
  selectedAvatar: string;
  setPlayerName: (name: string) => void;
  setSelectedAvatar: (avatar: string) => void;
  onCreateRoom: () => void;
  onJoinRoom: (roomId: string) => void;
}

export function useHomePage(): HomePageReturn {
  const websocket = useSocket();
  const [playerName, setPlayerName] = useState<string>('Anonimo321');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('cat');

  function onCreateRoom(): void {
    websocket.createRoom(playerName, selectedAvatar);
  }

  function onJoinRoom(roomId: string): void {
    websocket.joinRoom(roomId, playerName, selectedAvatar);
  }

  return {
    playerName,
    selectedAvatar,
    setPlayerName,
    setSelectedAvatar,
    onCreateRoom,
    onJoinRoom,
  };
}
