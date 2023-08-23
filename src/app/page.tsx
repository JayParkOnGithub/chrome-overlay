'use client';
import EditPlayerInfo from './components/EditPlayerInfo';
import Graph from './components/Graph';
import Team from './components/Team';
import { PlayerDataProvider } from './contexts/PlayerDataContext';
import { SelectedPlayerProvider } from './contexts/SelectedPlayerContext';

export default function Home() {
  return (
    <main>
      <PlayerDataProvider>
        <SelectedPlayerProvider>
          <div className='app-container'>
            <Team />
            <Graph />
            <EditPlayerInfo />
          </div>
        </SelectedPlayerProvider>
      </PlayerDataProvider>
    </main>
  );
}
