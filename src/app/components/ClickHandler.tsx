import { useEffect } from 'react';
import { useSelectedPlayer } from '../contexts/SelectedPlayerContext';

const ClickHandler: React.FC = () => {
  const { selectPlayer } = useSelectedPlayer();

  // Function to handle clicks anywhere on the page
  const handlePageClick = () => {
    // Set selected player to null using the context
    selectPlayer('');
  };

  // Add a click event listener when the component mounts
  useEffect(() => {
    document.addEventListener('click', handlePageClick);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handlePageClick);
    };
  }, []);

  return null; // ClickHandler doesn't render any content
};

export default ClickHandler;
