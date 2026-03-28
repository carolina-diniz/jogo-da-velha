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

export interface Message {
  id: string;
  text: string;
  sender: Player;
  timestamp: number;
}
export type Board = Array<{ value: Symbol; isHighlighted: boolean }>;

export interface CreateRoomResponse {
  room: {
    id: string;
    players: Player[];
  };
}

export interface MakeMoveResponse {
  currentTurn: string;
  table: Symbol[][];
  winner: string | null;
  winnerMoves: number[][] | null;
  isDrawEvent: boolean;
  draws: number;
  players: Player[];
}

export interface ResetResponse {
  currentTurn: string;
  table: Symbol[][];
}

export interface MessageResponse {
  message: string;
  playerID: string;
  createadAt: Date;
}

export interface PlayerNotification {
  player: Player;
  type: 'joined' | 'left';
}

export interface SocketContextData {
  socketId: string | undefined;
  roomId: string | null;
  players: Player[];
  turn: string;
  draws: number;
  connected: boolean;
  me: Player | undefined;
  isMyTurn: boolean;
  board: Board;
  messages: Message[];
  gameResult: 'win' | 'lose' | 'draw' | null;
  playerNotification: PlayerNotification | null;
  createRoom: (playerName: string, playerAvatar: string) => void;
  joinRoom: (
    roomId: string,
    playerName: string,
    playerAvatar: string,
    setHasError: (hasError: boolean) => void,
  ) => void;
  leaveRoom: () => void;
  makeMove: (x: number, y: number) => void;
  sendMessage: (text: string) => void;
  setGameResult: (result: 'win' | 'lose' | 'draw' | null) => void;
}
