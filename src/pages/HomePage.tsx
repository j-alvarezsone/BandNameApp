import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { AddBand } from '../compoenents/AddBand';
import { BandList } from '../compoenents/BandList';

function HomePage() {
  const { online } = useContext(SocketContext);

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
          <BandList />
        </div>

        <div className='col-4'>
          <AddBand />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
