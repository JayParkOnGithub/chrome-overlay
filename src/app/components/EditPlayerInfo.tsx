import React, { useState } from 'react';
import {
  PlayerDataContextType,
  usePlayerData,
} from '../contexts/PlayerDataContext';
import {
  SelectedPlayerContextType,
  useSelectedPlayer,
} from '../contexts/SelectedPlayerContext';

interface EditPlayerInfoProps {
  onSave: (updatedData: PlayerDataContextType) => void;
  onCancel: () => void;
  onSort: () => void;
}

const EditPlayerInfo: React.FC<EditPlayerInfoProps> = ({
  onSave,
  onCancel,
  onSort,
}) => {
  const { selectedPlayer } = useSelectedPlayer() as SelectedPlayerContextType;
  const { playerData } = usePlayerData() as PlayerDataContextType;

  const selectedPlayerData = playerData.find(
    (player) => player.player === selectedPlayer
  );

  const [updatedData, setUpdatedData] = useState(selectedPlayerData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(updatedData);
  };

  const handleCancelClick = () => {
    setUpdatedData(selectedPlayerData);
    onCancel();
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 flex justify-center items-center z-0 py-8'>
      <div className='w-[500px] card card-side bg-base-100 shadow-xl rounded-none'>
        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Edit Player Info</span>
          </label>
          <input
            type='text'
            name='player'
            placeholder={selectedPlayerData?.player || 'Player Name'}
            className='input input-bordered w-full max-w-xs'
            value={updatedData?.player || ''}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='date'
            placeholder={selectedPlayerData?.date || 'Date stat'}
            className='input input-bordered w-full max-w-xs'
            value={updatedData?.date || ''}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='description'
            placeholder={selectedPlayerData?.description || 'Description'}
            className='input input-bordered w-full max-w-xs'
            value={updatedData?.description || ''}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='damage'
            placeholder={
              selectedPlayerData?.damage?.toString() || 'Damage stat'
            }
            className='input input-bordered w-full max-w-xs'
            value={updatedData?.damage?.toString() || ''}
            onChange={handleInputChange}
          />
          <div className='btn-group mt-4'>
            <button className='btn btn-primary' onClick={handleSaveClick}>
              Save
            </button>
            <button className='btn' onClick={handleCancelClick}>
              Cancel
            </button>
            <button className='btn' onClick={onSort}>
              Sort
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlayerInfo;
