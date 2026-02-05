import { usePlayer, useSocket } from '~core';

export interface HomePageReturn {
  playerName: string;
  selectedAvatar: string;
  placeholder: string;
  setPlayerName: (name: string) => void;
  setSelectedAvatar: (avatar: string) => void;
  onCreateRoom: () => void;
  onJoinRoom: (roomId: string) => void;
}

export function useHomePage(): HomePageReturn {
  const websocket = useSocket();
  const { playerName, selectedAvatar, placeholder, setPlayerName, setSelectedAvatar } = usePlayer();

  function onCreateRoom(): void {
    websocket.createRoom(playerName === '' ? placeholder : playerName, selectedAvatar);
  }

  function onJoinRoom(roomId: string): void {
    websocket.joinRoom(roomId, playerName === '' ? placeholder : playerName, selectedAvatar);
  }

  return {
    playerName,
    selectedAvatar,
    placeholder,
    setPlayerName,
    setSelectedAvatar,
    onCreateRoom,
    onJoinRoom,
  };
}
