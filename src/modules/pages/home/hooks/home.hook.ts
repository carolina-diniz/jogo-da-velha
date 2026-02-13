import { useState } from 'react';
import { usePlayer, useSocket, type InputDialogModal } from '~core';

export interface HomePageReturn {
  userCode: string;
  hasError: boolean;
  playerName: string;
  selectedAvatar: string;
  placeholder: string;
  isHidden: boolean;
  setPlayerName: (value: string) => void;
  setSelectedAvatar: (value: string) => void;
  setIsHidden: (value: boolean) => void;
  onCreateRoom: () => void;
  onSubmit: () => void;
  onChangeValue: InputDialogModal['onChange'];
}

export function useHomePage(): HomePageReturn {
  const websocket = useSocket();
  const { playerName, selectedAvatar, placeholder, setPlayerName, setSelectedAvatar } = usePlayer();

  const [code, setCode] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  function onCreateRoom(): void {
    websocket.createRoom(playerName === '' ? placeholder : playerName, selectedAvatar);
  }

  function onChangeValue(event: React.ChangeEvent<HTMLInputElement>): void {
    const rawCode = event.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    if (rawCode.length > 4) {
      setCode(`${rawCode.slice(0, 4)}-${rawCode.slice(4, 8)}`);
    } else {
      setCode(rawCode);
    }
  }

  function onSubmit(): void {
    const formattedValue = code.replace(/-/g, '');

    websocket.joinRoom(
      formattedValue,
      playerName === '' ? placeholder : playerName,
      selectedAvatar,
      setHasError,
    );
    setCode('');
  }

  return {
    userCode: code,
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
  };
}
