export interface PlayerContextData {
  playerName: string;
  selectedAvatar: string;
  placeholder: string;
  setPlayerName: (name: string) => void;
  setSelectedAvatar: (avatar: string) => void;
}
