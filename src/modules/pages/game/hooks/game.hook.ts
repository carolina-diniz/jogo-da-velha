import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '~core';

interface UseGameReturn {
  isHidden: boolean;
  description: string;
  showToastModal: (text: string) => void;
  onClickLeave: () => void;
}

export function useGame(): UseGameReturn {
  const websocket = useSocket();
  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState(true);
  const [description, setDescription] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function onClickLeave(): void {
    websocket.leaveRoom();
    navigate('/');
  }

  function showToastModal(text: string): void {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    setDescription(text);
    setIsHidden(false);

    timeoutRef.current = setTimeout(() => {
      setIsHidden(true);
    }, 3000);
  }

  return {
    isHidden,
    description,
    showToastModal,
    onClickLeave,
  };
}
