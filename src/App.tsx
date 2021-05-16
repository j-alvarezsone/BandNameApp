import { useEffect, useState } from 'react';
import { AddBand } from './compoenents/AddBand';
import { BandList } from './compoenents/BandList';
import { Bands } from './types/types';

import io from 'socket.io-client';

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket'],
  });
  return socket;
};

function App() {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState<boolean>(false);
  const [bands, setBands] = useState<Bands[]>([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

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
          <AddBand />
        </div>
      </div>
    </div>
  );
}

export default App;
