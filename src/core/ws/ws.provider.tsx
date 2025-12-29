import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketContext } from './ws.context';
import type { GameState, Player } from './ws.type';

export function SocketProvider(props: { children: React.ReactNode }): React.ReactElement {
  const { children } = props;
  const socketRef = useRef<Socket | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const [gameState, setGameState] = useState<GameState>({
    roomId: null,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    players: [],
    turn: '',
    draws: 0,
  });

  const me = gameState.players.find((p) => p.id === socketId);
  const isMyTurn = gameState.turn === socketId;

  useEffect(() => {
    const wsUrl = (import.meta.env?.VITE_WS_URL as string) ?? 'ws://localhost:3000';
    const socketInstance = io(wsUrl, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 30000,
    });

    socketRef.current = socketInstance;

    socketInstance.on('connect', () => {
      setIsConnected(true);
      setSocketId(socketInstance.id);

      console.log('Conectado ao servidor de WebSocket com ID:', socketInstance.id);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      setSocketId(undefined);

      console.log('Desconectado do servidor de WebSocket');
    });

    socketInstance.on('room_state', (state: GameState) => {
      setGameState(state);

      console.log('Estado da sala atualizado:', state);
    });

    socketInstance.on('player_joined', (player: Player) => {
      setGameState((prev) => ({
        ...prev,
        players: [...prev.players, player],
      }));

      console.log('Jogador entrou na sala:', player);
    });

    socketInstance.on('player_left', (player: Player) => {
      setGameState((prev) => ({
        ...prev,
        players: prev.players.filter((p) => p.id !== player.id),
      }));

      console.log('Jogador saiu da sala:', player);
    });

    socketInstance.on('game_over', (data: { path: number[] }) => {
      setGameState((prev) => ({ ...prev, winnerPath: data.path }));
    });

    return () => {
      socketInstance.removeAllListeners();
      socketInstance.close();
      if (socketRef.current === socketInstance) {
        socketRef.current = null;
      }
    };
  }, []);

  const createRoom = useCallback(() => {
    socketRef.current?.emit('create_room');

    console.log('Solicitação para criar uma nova sala enviada');
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    socketRef.current?.emit('join_room', { roomId });

    console.log('Tentando entrar na sala:', roomId);
  }, []);

  const makeMove = useCallback((x: number, y: number) => {
    socketRef.current?.emit('make_move', { x, y });

    console.log('Jogada realizada:', { x, y });
  }, []);

  const sendMessage = useCallback((message: string) => {
    socketRef.current?.emit('send_message', { message });

    console.log('Mensagem enviada:', message);
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socketId,
        gameState,
        connected: isConnected,
        me,
        isMyTurn,
        createRoom,
        joinRoom,
        makeMove,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
