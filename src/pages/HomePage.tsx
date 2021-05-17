import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { AddBand } from '../compoenents/AddBand';
import { BandList } from '../compoenents/BandList';
import { BandChart } from '../compoenents/BandChart';

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
        <div className='col'>
          <BandChart />
        </div>
      </div>
      <br />

      <div className='row mt-5'>
        <div className='col'>
          <BandList />
        </div>

        <div className='col'>
          <AddBand />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
