import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const AddBand = () => {
  const [value, setValue] = useState('');
  const { socket } = useContext(SocketContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim().length > 0) {
      socket!.emit('new-band', { name: value });
      setValue('');
    }
  };

  return (
    <>
      <h3>Add Bands</h3>

      <form onSubmit={onSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='New name of band'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </>
  );
};
