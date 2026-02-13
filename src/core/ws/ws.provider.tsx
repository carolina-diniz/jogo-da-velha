import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocketConnection } from './hooks';
import { SocketContext } from './ws.context';
import type { Board, CreateRoomResponse, Player } from './ws.type';

export function SocketProvider(props: { children: React.ReactNode }): React.ReactElement {
  const { children } = props;
  const { connection, isConnected, connectionId } = useWebSocketConnection();
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [board, setBoard] = useState<Board>([
    { value: null, isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: null, isHighlighted: false },
    { value: null, isHighlighted: false },
  ]);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [turn, setTurn] = useState<string>('');
  const [draws] = useState(0);
  const [winnerPath, setWinnerPath] = useState<number[] | undefined>(undefined);

  const me = players.find((p) => p.id === connectionId);
  const isMyTurn = turn === connectionId;

  useEffect(() => {
    if (!connection) return;

    connection.on('PlayerJoined', (response: { player: Player }) => {
      const { player } = response;

      setPlayers((prev) => {
        console.log('PlayerJoined event received:', player);
        if (prev.find((p) => p.id === player.id)) return prev;

        return [...prev, player];
      });
    });

    connection.on('PlayerLeft', (response: { player: Player }) => {
      const { player } = response;

      setPlayers((prev) => prev.filter((p) => p.id !== player.id));
    });

    connection.on('GameOver', (data: { playerId: string; path: number[] }) => {
      setWinnerPath(data.path);
      setPlayers((prev) =>
        prev.map((p) => (p.id === data.playerId ? { ...p, wins: p.wins + 1 } : p)),
      );
    });

    return () => {
      connection.off('PlayerJoined');
      connection.off('PlayerLeft');
      connection.off('GameOver');
    };
  }, [connection]);

  const createRoom = useCallback(
    (playerName: string, playerAvatar: string) => {
      if (!connection) {
        console.error('Conexão não estabelecida');

        return;
      }

      connection
        .invoke<CreateRoomResponse>('CreateRoom', { name: playerName, avatar: playerAvatar })
        .then((response) => {
          const playersArray = Object.values(response.room.players);

          setRoomId(response.room.id);
          setPlayers(playersArray);
          setBoard([
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
          ]);
          setTurn(playersArray[0].id);
          navigate('/game');
        })
        .catch((err) => console.error('Erro ao criar sala:', err));
    },
    [connection, navigate],
  );

  const joinRoom = useCallback(
    (
      roomIdParam: string,
      playerName: string,
      playerAvatar: string,
      setHasError: (hasError: boolean) => void,
    ) => {
      if (!connection) {
        console.error('Conexão não estabelecida');

        return;
      }

      connection
        .invoke<CreateRoomResponse>('JoinRoom', {
          IdRoom: roomIdParam,
          name: playerName,
          avatar: playerAvatar,
        })
        .then((response) => {
          const playersArray = Object.values(response.room.players);

          setRoomId(response.room.id);
          setPlayers(playersArray);
          setBoard([
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
            { value: null, isHighlighted: false },
          ]);
          setTurn(playersArray[0].id);
          navigate('/game');
        })
        .catch((err) => {
          console.error('Erro ao entrar na sala:', err);
          setHasError(true);
        });
    },
    [connection, navigate],
  );

  const makeMove = useCallback(
    (x: number, y: number) => {
      if (!connection) {
        console.error('Conexão não estabelecida');

        return;
      }

      connection
        .invoke('MakeMove', x, y)
        .then((response) => console.log(response))
        .catch((err) => console.error('Erro ao fazer jogada:', err));
    },
    [connection],
  );

  const leaveRoom = useCallback(() => {
    if (!connection) {
      console.error('Conexão não estabelecida');

      return;
    }

    connection
      .invoke('LeaveRoom', roomId)
      .then(() => {
        console.log('Saiu da sala com sucesso');
      })
      .catch((err) => console.error('Erro ao sair da sala:', err));
  }, [connection, roomId]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!connection) {
        console.error('Conexão não estabelecida');

        return;
      }

      connection
        .invoke('SendMessage', message)
        .then((response) => console.log(response))
        .catch((err) => console.error('Erro ao enviar mensagem:', err));
    },
    [connection],
  );

  return (
    <SocketContext.Provider
      value={{
        socketId: connectionId,
        roomId,
        players,
        turn,
        draws,
        winnerPath,
        connected: isConnected,
        me,
        isMyTurn,
        board,
        createRoom,
        joinRoom,
        leaveRoom,
        makeMove,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
