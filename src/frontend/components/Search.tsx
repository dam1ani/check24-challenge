import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { AIRPORTS } from './constants';
import Adder from './Counter';
import DatePicker from './DatePicker';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <Paper style={{ width: 335 }}>
      <form style={{ padding: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            style={{ width: 150 }}
            size='small'
            label='Destination'
            value='Mallorca'
            disabled
          />
          <Autocomplete
            style={{ width: 150 }}
            size='small'
            options={AIRPORTS}
            renderInput={(params) => <TextField {...params} label='Airport' style={{ width: 150 }} size="small" />}
          />
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <DatePicker
            value={new Date()}
            label="Earliest departure"
            onChange={() => { }}
            minDate={new Date()}
          />
          <DatePicker
            value={new Date()}
            label="Latest return"
            onChange={() => { }}
            minDate={new Date()}
          />
        </div>
        <br />

        <p style={{ borderBottom: '1px solid lightgrey', fontWeight: 'bold', margin: 0 }}>Duration</p>
        <Adder
          min={1}
          label="Days"
          onChange={() => { }}
          value={1}
        />

        <p style={{ borderBottom: '1px solid lightgrey', fontWeight: 'bold', margin: 0 }}>Travellers</p>
        <Adder
          min={1}
          label="Adults"
          onChange={() => { }}
          value={1}
        />
        <Adder
          min={0}
          label="Kids"
          onChange={() => { }}
          value={3}
        />
        <br />
        <Button variant='contained' fullWidth endIcon={<SearchIcon />}>Submit</Button>
      </form>
    </Paper>
  )
}

export default Search;