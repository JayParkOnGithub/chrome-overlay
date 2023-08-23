'use client';
import Image from 'next/image';
import Avatar from '../assets/photos/avatar.jpg';
import { usePlayerData } from '../contexts/PlayerDataContext';
import { useSelectedPlayer } from '../contexts/SelectedPlayerContext';

const Graph = () => {
  const { selectedPlayer } = useSelectedPlayer();
  const { playerData, totalDamage } = usePlayerData();

  const selectedPlayerData = playerData.find(
    (player) => player.id === selectedPlayer
  );

  if (!selectedPlayerData) {
    return null;
  }

  return (
    <div className='fixed top-0 left-0 right-0 flex justify-center items-center z-0'>
      <div className='w-[800px] card card-side bg-base-100 shadow-xl rounded-none mt-5'>
        <Image src={Avatar} alt='current avatar' width='200' />
        <div className='card-body h-full'>
          <h2 className='text-center text-xl font-semibold'>
            {selectedPlayerData?.player || 'Player Name'}
          </h2>
          <h3 className='text-left'>
            {selectedPlayerData
              ? new Date(selectedPlayerData.date).toLocaleString()
              : 'Date stat'}
          </h3>
          <div className='overflow-hidden'>
            <h3 className='text-left text-sm text-gray-500'>
              {selectedPlayerData?.description || 'Description'}
            </h3>
          </div>
          <h3 className='text-left text-sm'>
            <span className='text-black'>
              {selectedPlayerData?.damage || 'Damage stat'}
            </span>{' '}
            damage
            <span className='text-gray-500 text-xs'>
              {' '}
              (out of {totalDamage} total team damage)
            </span>
          </h3>
          <div
            className='tooltip-primary relative tooltip'
            data-tip={selectedPlayerData?.damage}
          >
            <progress
              className='progress progress-primary w-56'
              value={selectedPlayerData?.damage}
              max={totalDamage}
            ></progress>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
