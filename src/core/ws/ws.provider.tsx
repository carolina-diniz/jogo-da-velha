import * as signalR from '@microsoft/signalr';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SocketContext } from './ws.context';
import type { GameState, Player } from './ws.type';

export function SocketProvider(props: { children: React.ReactNode }): React.ReactElement {
  const { children } = props;
  const connectionRef = useRef<signalR.HubConnection | null>(null);

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
    const wsUrl =
      (import.meta.env?.VITE_WS_URL as string) ?? 'http://jogo.kaworii.com.br:5046/GameHub';

    console.log('🔌 Tentando conectar ao SignalR:', wsUrl);

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(wsUrl, {
        skipNegotiation: false,
        transport:
          signalR.HttpTransportType.WebSockets |
          signalR.HttpTransportType.ServerSentEvents |
          signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: () => 1000,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connectionRef.current = connection;

    connection.onreconnecting(() => {
      setIsConnected(false);
      console.log('Tentando reconectar ao servidor SignalR...');
    });

    connection.onreconnected((connectionId) => {
      setIsConnected(true);
      setSocketId(connectionId);
      console.log('Reconectado ao servidor SignalR com ID:', connectionId);
    });

    connection.onclose(() => {
      setIsConnected(false);
      setSocketId(undefined);
      console.log('Desconectado do servidor SignalR');
    });

    // Registrar handlers para mensagens do servidor
    connection.on('RoomState', (state: GameState) => {
      setGameState(state);
      console.log('Estado da sala atualizado:', state);
    });

    connection.on('PlayerJoined', (player: Player) => {
      setGameState((prev) => ({
        ...prev,
        players: [...prev.players, player],
      }));
      console.log('Jogador entrou na sala:', player);
    });

    connection.on('PlayerLeft', (player: Player) => {
      setGameState((prev) => ({
        ...prev,
        players: prev.players.filter((p) => p.id !== player.id),
      }));
      console.log('Jogador saiu da sala:', player);
    });

    connection.on('GameOver', (data: { path: number[] }) => {
      setGameState((prev) => ({ ...prev, winnerPath: data.path }));
    });

    // Iniciar conexão
    connection
      .start()
      .then(() => {
        setIsConnected(true);
        setSocketId(connection.connectionId ?? undefined);
        console.log('Conectado ao servidor SignalR com ID:', connection.connectionId);
      })
      .catch((err) => {
        console.error('Erro ao conectar ao servidor SignalR:', err);
      });

    return () => {
      connection.stop();
      if (connectionRef.current === connection) {
        connectionRef.current = null;
      }
    };
  }, []);

  const createRoom = useCallback(() => {
    connectionRef.current?.invoke('CreateRoom').catch((err) => {
      console.error('Erro ao criar sala:', err);
    });

    console.log('Solicitação para criar uma nova sala enviada');
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    connectionRef.current?.invoke('JoinRoom', roomId).catch((err) => {
      console.error('Erro ao entrar na sala:', err);
    });

    console.log('Tentando entrar na sala:', roomId);
  }, []);

  const makeMove = useCallback((x: number, y: number) => {
    connectionRef.current?.invoke('MakeMove', x, y).catch((err) => {
      console.error('Erro ao fazer jogada:', err);
    });

    console.log('Jogada realizada:', { x, y });
  }, []);

  const sendMessage = useCallback((message: string) => {
    connectionRef.current?.invoke('SendMessage', message).catch((err) => {
      console.error('Erro ao enviar mensagem:', err);
    });

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
