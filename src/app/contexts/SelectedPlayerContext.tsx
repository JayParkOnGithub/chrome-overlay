'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { SelectedPlayerContextType } from '../types/SelectedPlayerContextType';
import { SelectedPlayerProviderProps } from '../types/SelectedPlayerProviderProps';

const SelectedPlayerContext = createContext<
  SelectedPlayerContextType | undefined
>(undefined);

export const SelectedPlayerProvider = ({
  children,
}: SelectedPlayerProviderProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const selectPlayer = (playerId: string) => {
    setSelectedPlayer(playerId);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const appContainer = document.querySelector('.app-container');

    if (appContainer && !appContainer.contains(event.target as Node)) {
      setSelectedPlayer(null);
      setIsMouseOver(false);
    }
  };

  const componentsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const appContainer = document.querySelector('.app-container'); // Changed the target element

    if (appContainer) {
      appContainer.addEventListener(
        'click',
        handleOutsideClick as EventListener
      ); // Added event listener to the app-container
    }

    return () => {
      if (appContainer) {
        appContainer.removeEventListener(
          'click',
          handleOutsideClick as EventListener
        ); // Removed the event listener from the app-container when component unmounts
      }
    };
  }, []);

  return (
    <SelectedPlayerContext.Provider
      value={{ selectedPlayer, selectPlayer, isMouseOver }}
    >
      <div ref={componentsContainerRef}>{children}</div>
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
