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
  const [isSortingAsc, setIsSortingAsc] = useState<Boolean | null>(null);

  const calculateTotalDamage = (data: Player[]) => {
    return data.reduce((total, player) => total + player.damage, 0);
  };

  const totalDamage = calculateTotalDamage(playerData);

  // REPLACE BELOW USEEFFECT WITH THIS ONE IF API EXISTS
  // useEffect(() => {
  //   fetch('/playerdata')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPlayerData(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error loading JSON data:', error);
  //     });
  // }, []);

  useEffect(() => {
    const storedPlayerData = localStorage.getItem('players');

    if (storedPlayerData) {
      setPlayerData(JSON.parse(storedPlayerData));
    } else {
      setPlayerData(originalData);
    }
  }, []);

  useEffect(() => {
    calculateTotalDamage(playerData);
  }, [playerData]);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(playerData));
  }, [playerData]);

  const originalData = [
    {
      id: 'abc123',
      player: 'SavageSniper',
      date: '2023-08-15T08:30:00',
      damage: 1200,
      description:
        'Secured a double kill with an amazing snipe in the CS:GO tournament.',
    },
    {
      id: 'def456',
      player: 'NinjaStorm',
      date: '2023-08-16T15:45:00',
      damage: 850,
      description:
        'Carried the team to victory with a pentakill in the League of Legends match.',
    },
    {
      id: 'ghi789',
      player: 'EpicGamer',
      date: '2023-08-17T15:45:00',
      damage: 670,
      description:
        'Dominating the leaderboard with a high K/D ratio in the Call of Duty championship.',
    },
    {
      id: 'jkl012',
      player: 'PixelWarrior',
      date: '2023-08-18T15:45:00',
      damage: 450,
      description:
        'Executed a pixel-perfect headshot in the Overwatch finals to clinch victory.',
    },
    {
      id: 'mno345',
      player: 'StrategyKing',
      date: '2023-08-19T15:45:00',
      damage: 920,
      description:
        'Outsmarted opponents with ingenious tactics in a StarCraft II showdown.',
    },
  ];

  const updatePlayerData = (freshData: Player[]) => {
    setPlayerData(freshData);
  };

  const sortPlayerData = () => {
    const sortedData = [...playerData];
    sortedData.sort((a, b) => {
      const nameA = a.player.toUpperCase();
      const nameB = b.player.toUpperCase();

      if (isSortingAsc) {
        return nameB.localeCompare(nameA);
      } else {
        return nameA.localeCompare(nameB);
      }
    });

    setPlayerData(sortedData);
    setIsSortingAsc(!isSortingAsc);
  };

  return (
    <PlayerDataContext.Provider
      value={{
        totalDamage,
        playerData,
        updatePlayerData,
        originalData,
        sortPlayerData,
      }}
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
