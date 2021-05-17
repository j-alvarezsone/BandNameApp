import { useEffect, useState } from 'react';
import { AddBand } from './compoenents/AddBand';
import { BandList } from './compoenents/BandList';
import { useSocket } from './hooks/useSocket';
import { Bands } from './types/types';

function App() {
  const [bands, setBands] = useState<Bands[]>([]);

  const { socket, online } = useSocket('http://localhost:8080');

  useEffect(() => {
    socket.on('current-bands', (bands: []) => {
      setBands(bands);
    });
  }, [socket]);

  const vote = (id: string) => {
    socket.emit('vote-band', id);
  };

  const deleteBand = (id: string) => {
    socket.emit('delete-band', id);
  };

  const changeBandName = (id: string, name: string) => {
    socket.emit('change-band-name', { id, name });
  };

  const createBand = (name: string) => {
    socket.emit('new-band', { name });
  };

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service Status:
          {online ? (
            <span className='text-success'> Online</span>
          ) : (
            <span className='text-danger'> Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className='row'>
        <div className='col-8'>
          <BandList data={bands} vote={vote} deleteBand={deleteBand} changeBandName={changeBandName} />
        </div>

        <div className='col-4'>
          <AddBand createBand={createBand} />
        </div>
      </div>
    </div>
  );
}

export default App;
