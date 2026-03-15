import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocketConnection } from './hooks';
import { SocketContext } from './ws.context';
import type { Board, CreateRoomResponse, MakeMoveResponse, Player, ResetResponse } from './ws.type';

const initialBoard: Board = [
  { value: null, isHighlighted: false },
  { value: null, isHighlighted: false },
  { value: null, isHighlighted: false },
  { value: null, isHighlighted: false },
  { value: null, isHighlighted: false },
  { value: null, isHighlighted: false },
  { value: null, isHighlighted: false },
  { value: null, isHighlighted: false },
  { value: null, isHighlighted: false },
];

export function SocketProvider(props: { children: React.ReactNode }): React.ReactElement {
  const { children } = props;
  const { connection, isConnected, connectionId } = useWebSocketConnection();
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [board, setBoard] = useState<Board>(initialBoard);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [turn, setTurn] = useState<string>('');
  const [draws, setDraws] = useState(0);
  const [isWinner, setIsWinner] = useState<boolean | null>(null);
  const [hasDraw, setHasDraw] = useState<boolean>(false);

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

    connection.on('UpdatedTable', (data: { currentTurn: string; table: Board }) => {
      const { table: updatedBoard, currentTurn } = data;

      setBoard(updatedBoard);
      setTurn(currentTurn);
    });

    connection.on('UpdateTable', (response: MakeMoveResponse) => {
      console.log('UpdateTable event received:', response);

      const {
        currentTurn,
        table,
        winner: winnerId,
        winnerMoves,
        isDrawEvent,
        draws: updatedDraws,
        players: updatedPlayers,
      } = response;

      if (currentTurn !== undefined) {
        setTurn(currentTurn);
      }

      if (table !== undefined) {
        const highlightedIndices = new Set((winnerMoves ?? []).map(([x, y]) => y * 3 + x));

        setBoard(
          table.flat().map((value, index) => ({
            value,
            isHighlighted: highlightedIndices.has(index),
          })),
        );
      }

      if (winnerId !== undefined) {
        setIsWinner(me?.id === winnerId);
      }

      if (isDrawEvent !== undefined && updatedDraws !== undefined && isDrawEvent) {
        setHasDraw(true);
        setDraws(updatedDraws);

        return;
      }

      if (updatedPlayers !== undefined) {
        setPlayers(updatedPlayers);
      }
    });

    connection.on('Reset', (response: ResetResponse) => {
      const { currentTurn, table } = response;

      if (currentTurn !== undefined && table !== undefined) {
        setTurn(currentTurn);
        setBoard(initialBoard);
      }
    });

    return () => {
      connection.off('PlayerJoined');
      connection.off('PlayerLeft');
      connection.off('GameOver');
      connection.off('MadeMove');
      connection.off('UpdateTable');
      connection.off('Reset');
    };
  }, [connection, me]);

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
          setBoard(initialBoard);
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
          setBoard(initialBoard);
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

      if (roomId == null) {
        console.error('Id da sala não definido');

        return;
      }

      console.log('Enviando jogada:', { x, y });

      connection
        .invoke<MakeMoveResponse>('MakeMove', { IdRoom: roomId, block: { x, y } })
        .catch((err) => console.error('Erro ao fazer jogada:', err));
    },
    [connection, roomId],
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
        hasDraw,
        isWinner,
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
