import { createContext } from 'react';
import type { PlayerContextData } from './player.type';

export const PlayerContext = createContext<PlayerContextData | undefined>(undefined);
