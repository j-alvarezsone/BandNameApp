import { useEffect, useState } from 'react';
import { BandsProps } from '../types/types';

export const BandList = ({ data, vote, deleteBand }: BandsProps) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

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
    console.log(id, name);
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
          <button className='btn btn-danger' onClick={() => deleteBand(band.id)}>Delete</button>
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
