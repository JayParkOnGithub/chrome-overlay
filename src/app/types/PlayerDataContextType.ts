import { Player } from '../types/Player';

export type PlayerDataContextType = {
  playerData: Player[];
  updatePlayerData: (updatedPlayerData: Player[]) => void;
  totalDamage: number;
};
