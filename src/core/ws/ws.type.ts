export type Symbol = 'X' | 'O' | null;

export interface Player {
  id: string;
  name: string;
  avatar: string;
  symbol: Symbol;
  wins: number;
}

export interface GameState {
  roomId: string | null;
  board: Symbol[][];
  players: Player[];
  turn: string;
  draws: number;
  winnerPath?: number[];
}

export interface SocketContextData {
  socketId: string | undefined;
  gameState: GameState;
  connected: boolean;
  me: Player | undefined;
  isMyTurn: boolean;
  createRoom: () => void;
  joinRoom: (roomId: string) => void;
  makeMove: (x: number, y: number) => void;
  sendMessage: (text: string) => void;
}
