import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Bands } from '../types/types';

export const BandList = () => {
  const [bands, setBands] = useState<Bands[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket!.on('current-bands', (bands: []) => {
      setBands(bands);
    });
    return () => {
      socket!.off('current-bands');
    };
  }, [socket]);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newName = event.target.value;

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      }),
    );
  };

  const onLoseFocus = (id: string, name: string) => {
    socket!.emit('change-band-name', { id, name });
  };

  const vote = (id: string) => {
    socket!.emit('vote-band', id);
  };

  const deleteBand = (id: string) => {
    socket!.emit('delete-band', id);
  };

  const createRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className='btn btn-primary' onClick={() => vote(band.id)}>
            {' '}
            +1
          </button>
        </td>
        <td>
          <input
            type='text'
            className='form-control'
            value={band.name}
            onChange={(event) => changeName(event, band.id)}
            onBlur={() => onLoseFocus(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteBand(band.id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
