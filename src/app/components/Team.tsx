'use client';
import { useEffect, useState } from 'react';
import { usePlayerData } from '../contexts/PlayerDataContext';
import { useSelectedPlayer } from '../contexts/SelectedPlayerContext';
import { Player } from '../types/Player';
import PlayerCard from './PlayerCard';
const Team: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { playerData } = usePlayerData();
  const { isMouseOver } = useSelectedPlayer();

  const mouseOverHandler = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const teamContainer = document.getElementById('team-container');
      const editPlayerContainer = document.getElementById(
        'edit-player-container'
      );

      if (
        teamContainer &&
        !teamContainer.contains(event.target as Node) &&
        editPlayerContainer &&
        !editPlayerContainer.contains(event.target as Node)
      ) {
        console.log('clicked outside');
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isMouseOver) {
      mouseOverHandler();
    } else {
      setIsVisible(false);
    }
  }, [isMouseOver]);

  return (
    <div
      className='fixed inset-y-1/2 left-0 transform -translate-y-1/2 z-20'
      onMouseOver={mouseOverHandler}
      id='team-container'
    >
      <div className='absolute top-1/2 left-0 w-6 h-6 ml-5'>
        <div className='w-1 h-6 bg-zinc-300'></div>
      </div>
      <div
        className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-80 h-fit bg-white shadow-lg transition-transform duration-500 ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {playerData.map((player: Player) => (
          <PlayerCard key={player.id} data={player} />
        ))}
      </div>
    </div>
  );
};

export default Team;
