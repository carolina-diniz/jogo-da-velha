export type Symbol = 'X' | 'O' | null;

export interface Player {
  id: string;
  name: string;
  avatar: string;
  type: Symbol;
  wins: number;
}

export interface GameState {
  roomId: string | null;
  players: Player[];
  turn: string;
  draws: number;
  winnerPath?: number[];
}

export type Board = Array<{ value: Symbol; isHighlighted: boolean }>;

export interface CreateRoomResponse {
  room: {
    id: string;
    players: Player[];
  };
}

export interface SocketContextData {
  socketId: string | undefined;
  roomId: string | null;
  players: Player[];
  turn: string;
  draws: number;
  winnerPath?: number[];
  connected: boolean;
  me: Player | undefined;
  isMyTurn: boolean;
  board: Board;
  createRoom: (playerName: string, playerAvatar: string) => void;
  joinRoom: (roomId: string, playerName: string, playerAvatar: string) => void;
  leaveRoom: () => void;
  makeMove: (x: number, y: number) => void;
  sendMessage: (text: string) => void;
}
