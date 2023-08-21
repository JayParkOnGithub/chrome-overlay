'use client';
import { createContext, useContext, useState } from 'react';
import { SelectedPlayerContextType } from '../types/SelectedPlayerContextType';
import { SelectedPlayerProviderProps } from '../types/SelectedPlayerProviderProps';

const SelectedPlayerContext = createContext<
  SelectedPlayerContextType | undefined
>(undefined);

export const SelectedPlayerProvider = ({
  children,
}: SelectedPlayerProviderProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const selectPlayer = (playerKey: string) => {
    setSelectedPlayer(playerKey);
  };

  return (
    <SelectedPlayerContext.Provider value={{ selectedPlayer, selectPlayer }}>
      {children}
    </SelectedPlayerContext.Provider>
  );
};

export const useSelectedPlayer = (): SelectedPlayerContextType => {
  const context = useContext(SelectedPlayerContext);
  if (!context) {
    throw new Error(
      'useSelectedPlayer must be used within a SelectedPlayerProvider'
    );
  }
  return context;
};
