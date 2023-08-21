'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Player } from '../types/Player';
import { PlayerDataContextType } from '../types/PlayerDataContextType';
import { PlayerDataProviderProps } from '../types/PlayerDataProviderProps';

const PlayerDataContext = createContext<PlayerDataContextType | undefined>(
  undefined
);

export const PlayerDataProvider = ({ children }: PlayerDataProviderProps) => {
  const [playerData, setPlayerData] = useState<Player[]>([]);

  const updatePlayerData = (updatedPlayerData: Player[]) => {
    setPlayerData(updatedPlayerData); // FIX ME
  };

  const calculateTotalDamage = (data: Player[]) => {
    return data.reduce((total, player) => total + player.damage, 0);
  };

  // useEffect(() => {
  //   fetch('../data/players.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPlayerData(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error loading JSON data:', error);
  //     });
  // }, []);

  const totalDamage = calculateTotalDamage(playerData);

  useEffect(() => {
    setPlayerData([
      {
        player: 'SavageSniper',
        date: '2023-08-15T08:30:00',
        damage: 1200,
        description:
          'Secured a double kill with an amazing snipe in the CS:GO tournament.',
      },
      {
        player: 'NinjaStorm',
        date: '2023-08-16T15:45:00',
        damage: 850,
        description:
          'Carried the team to victory with a pentakill in the League of Legends match.',
      },
      {
        player: 'EpicGamer',
        date: '2023-08-17T15:45:00',
        damage: 670,
        description:
          'Dominating the leaderboard with a high K/D ratio in the Call of Duty championship.',
      },
      {
        player: 'PixelWarrior',
        date: '2023-08-18T15:45:00',
        damage: 450,
        description:
          'Executed a pixel-perfect headshot in the Overwatch finals to clinch victory.',
      },
      {
        player: 'StrategyKing',
        date: '2023-08-19T15:45:00',
        damage: 920,
        description:
          'Outsmarted opponents with ingenious tactics in a StarCraft II showdown.',
      },
    ]);
  }, []);

  return (
    <PlayerDataContext.Provider
      value={{ totalDamage, playerData, updatePlayerData }}
    >
      {children}
    </PlayerDataContext.Provider>
  );
};

export const usePlayerData = (): PlayerDataContextType => {
  const context = useContext(PlayerDataContext);
  if (!context) {
    throw new Error('usePlayerData must be used within a PlayerDataProvider');
  }
  return context;
};
