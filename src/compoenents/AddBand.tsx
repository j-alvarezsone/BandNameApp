import { useState } from 'react';
import { AddBandProps } from '../types/types';

export const AddBand = ({ createBand }: AddBandProps) => {
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim().length > 0) {
      createBand(value);
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
