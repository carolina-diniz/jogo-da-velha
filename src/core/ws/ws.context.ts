import { createContext, useContext } from 'react';
import type { SocketContextData } from './ws.type';

export const SocketContext = createContext<SocketContextData | null>(null);

export function useSocket(): SocketContextData {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within a SocketContext');
  }

  return context;
}
