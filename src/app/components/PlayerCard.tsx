import Image from 'next/image';
import Avatar from '../assets/photos/avatar.jpg';
import { useSelectedPlayer } from '../contexts/SelectedPlayerContext';
import { Player } from '../types/Player';

const PlayerCard: React.FC<{ data: Player }> = ({ data }) => {
  const convertedDate: Date = new Date(data.date);
  const { selectPlayer } = useSelectedPlayer();

  const playerClickHandler = () => {
    selectPlayer(data.player);
  };

  return (
    <>
      <div
        className='card card-side card-compact bg-base-100 divide-y cursor-auto'
        onClick={playerClickHandler}
      >
        <div className='avatar mt-5 ml-1'>
          <div className='w-10 h-10 rounded-full'>
            <Image src={Avatar} alt='user image' width='10' height='10' />
          </div>
        </div>
        <div className='card-body'>
          <div className='name text-sm font-semibold'>{data.player}</div>
          <div className='text-xs'>{convertedDate.toLocaleString()}</div>
          <div className='text-xs'>{data.damage} damage</div>
          <div className='text-xs'>{data.description}</div>
        </div>
      </div>
    </>
  );
};

export default PlayerCard;
