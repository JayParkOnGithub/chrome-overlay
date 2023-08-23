export type Player = {
  id: string;
  player: string;
  date: string;
  damage: number;
  description: string;
};

export type PartialPlayer = {
  id: string;
  player?: string;
  date?: string;
  damage?: number;
  description?: string;
};
