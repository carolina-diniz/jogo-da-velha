import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '~core';

interface UseGameReturn {
  isHidden: boolean;
  description: string;
  playerName?: string;
  action?: 'joined' | 'left';
  showToastModal: (text: string) => void;
  onClickLeave: () => void;
}

export function useGame(): UseGameReturn {
  const websocket = useSocket();
  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState(true);
  const [description, setDescription] = useState('');
  const [playerName, setPlayerName] = useState<string | undefined>(undefined);
  const [action, setAction] = useState<'joined' | 'left' | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (websocket.roomId === null) {
      navigate('/');
    }
  }, [websocket.roomId, navigate]);

  useEffect(() => {
    if (websocket.playerNotification) {
      const { player, type } = websocket.playerNotification;
      showToastModalWithPlayer(player.name, type);
    }
  }, [websocket.playerNotification]);

  function onClickLeave(): void {
    websocket.leaveRoom();
    navigate('/');
  }

  function showToastModal(text: string): void {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    setDescription(text);
    setPlayerName(undefined);
    setAction(undefined);
    setIsHidden(false);

    timeoutRef.current = setTimeout(() => {
      setIsHidden(true);
    }, 3000);
  }

  function showToastModalWithPlayer(name: string, actionType: 'joined' | 'left'): void {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    setPlayerName(name);
    setAction(actionType);
    setDescription('');
    setIsHidden(false);

    timeoutRef.current = setTimeout(() => {
      setIsHidden(true);
    }, 3000);
  }

  return {
    isHidden,
    description,
    playerName,
    action,
    showToastModal,
    onClickLeave,
  };
}
