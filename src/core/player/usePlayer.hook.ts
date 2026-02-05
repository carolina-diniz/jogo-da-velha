import { useContext } from 'react';
import { PlayerContext } from './player.context';
import type { PlayerContextData } from './player.type';

export function usePlayer(): PlayerContextData {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayer deve ser usado dentro de PlayerProvider');
  }

  return context;
}
