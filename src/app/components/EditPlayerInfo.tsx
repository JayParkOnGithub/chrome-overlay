import React, { useEffect, useState } from 'react';
import { usePlayerData } from '../contexts/PlayerDataContext';
import { useSelectedPlayer } from '../contexts/SelectedPlayerContext';
import { Player } from '../types/Player';
import { PlayerDataContextType } from '../types/PlayerDataContextType';
import { SelectedPlayerContextType } from '../types/SelectedPlayerContextType';

const EditPlayerInfo: React.FC = () => {
  const { selectedPlayer, updateMouseOver } =
    useSelectedPlayer() as SelectedPlayerContextType;
  const { playerData, updatePlayerData, originalData, sortPlayerData } =
    usePlayerData() as PlayerDataContextType;

  const selectedPlayerData = playerData.find(
    (player) => player.id === selectedPlayer
  );

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    updateMouseOver(true);
  };

  const [tempUpdatedData, setTempUpdatedData] = useState<
    Partial<Player> | undefined
  >(undefined);

  useEffect(() => {
    setTempUpdatedData(selectedPlayerData);
  }, [selectedPlayer, selectedPlayerData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedPlayerCopy: Partial<Player> = { ...(tempUpdatedData || {}) };

    switch (name) {
      case 'damage':
        if (!isNaN(Number(value))) {
          updatedPlayerCopy[name] = Number(value);
        }
        break;
      case 'date':
        if (isValidDate(value)) {
          updatedPlayerCopy[name] = value;
        }
        break;
      default:
        (updatedPlayerCopy as any)[name] = value;
        break;
    }

    setTempUpdatedData(updatedPlayerCopy);
  };

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const handleSaveClick = () => {
    if (tempUpdatedData) {
      const index = playerData.findIndex(
        (player) => player.id === selectedPlayer
      );

      if (index !== -1) {
        const updatedPlayerData = [...playerData];
        updatedPlayerData[index] = { ...playerData[index], ...tempUpdatedData };
        updatePlayerData(updatedPlayerData);
      }
    }
  };

  const handleCancelClick = () => {
    updatePlayerData(originalData);
  };

  if (!selectedPlayer) {
    return null;
  }

  return (
    <div
      className='fixed bottom-0 left-0 right-0 flex justify-center items-center z-0 py-8'
      onClick={handleClick}
    >
      <div className='w-[500px] card card-side bg-base-100 shadow-xl rounded-none'>
        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Edit Player Info</span>
          </label>
          <input
            type='text'
            name='player'
            placeholder='Player Name'
            className='input input-bordered w-full max-w-xs'
            value={tempUpdatedData?.player || ''}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='date'
            placeholder='Date stat'
            className='input input-bordered w-full max-w-xs'
            value={tempUpdatedData?.date || ''}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='description'
            placeholder='Description'
            className='input input-bordered w-full max-w-xs'
            value={tempUpdatedData?.description || ''}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='damage'
            placeholder={'Damage stat'}
            className='input input-bordered w-full max-w-xs'
            value={tempUpdatedData?.damage?.toString() || ''}
            onChange={handleInputChange}
          />
          <div className='btn-group mt-4'>
            <button className='btn btn-primary' onClick={handleSaveClick}>
              Save
            </button>
            <button className='btn' onClick={handleCancelClick}>
              Cancel
            </button>
            <button className='btn' onClick={sortPlayerData}>
              Sort
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlayerInfo;
