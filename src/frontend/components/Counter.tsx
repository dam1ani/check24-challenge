import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import * as React from 'react'

type AdderProps = {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
};

const Adder: React.FC<AdderProps> = ({ label, value, min, onChange }) => {
  const add = (e: React.ChangeEvent<any>) => {
    onChange(value + 1);
  };
  const subtract = (e: React.ChangeEvent<any>) => {
    if (value <= min) return;
    onChange(value - 1);
  };

  return (
    <div className='adder-wrapper'>
      {label && <p>{label}</p>}
      <div>
        <IconButton size='small' onClick={subtract}>
          <Remove fontSize='small' />
        </IconButton>
        <input className='adder-input' type='text' value={value} readOnly />
        <IconButton size='small' onClick={add}>
          <Add fontSize='small' />
        </IconButton>
      </div>
    </div>
  );
};

export default Adder;