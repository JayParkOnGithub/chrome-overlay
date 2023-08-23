export type SelectedPlayerContextType = {
  selectedPlayer: string | null;
  selectPlayer: (playerKey: string) => void;
  isMouseOver: boolean;
  updateMouseOver: (bool: boolean) => void;
};
