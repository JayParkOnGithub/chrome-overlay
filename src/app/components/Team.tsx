'use client';
import { useState } from 'react';
import { usePlayerData } from '../contexts/PlayerDataContext';
import PlayerCard from './PlayerCard';
const Team: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { playerData } = usePlayerData();

  return (
    <div className='fixed inset-y-1/2 left-0 transform -translate-y-1/2 z-20'>
      <div
        className='absolute top-1/2 left-0 w-6 h-6 ml-5'
        onMouseEnter={() => setIsVisible(true)}
      >
        <div className='w-1 h-6 bg-zinc-300'></div>
      </div>
      <div
        className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-80 h-fit bg-white shadow-lg transition-transform duration-500 ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseLeave={() => setIsVisible(false)}
      >
        {playerData.map((player) => (
          <PlayerCard key={player.player} data={player} />
        ))}
      </div>
    </div>
  );
};

export default Team;
