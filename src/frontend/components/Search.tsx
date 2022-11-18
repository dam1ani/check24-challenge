import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { AIRPORTS } from './constants';
import Adder from './Counter';
import DatePicker from './DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import { SearchParams } from '../model/Hotel';

interface SearchProps {
  searchParams: SearchParams;
  setSearch: (params: SearchParams) => void;
  onSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ searchParams, onSearch, setSearch }) => {
  const airportOption = AIRPORTS.find(a => a.code === searchParams.airport);
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
            value={airportOption!}
            onChange={(e, newValue) => newValue && setSearch({
              ...searchParams,
              airport: newValue.code
            })}
            renderInput={(params) => <TextField {...params} label='Airport' style={{ width: 150 }} size="small" />}
          />
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <DatePicker
            value={searchParams.from}
            label="Earliest departure"
            onChange={(d) => setSearch({
              ...searchParams,
              from: new Date(d!)
            })}
            minDate={new Date('2016-08-04 16:00:00')}
          />
          <DatePicker
            value={searchParams.to}
            label="Latest return"
            onChange={(d) => setSearch({
              ...searchParams,
              to: new Date(d!)
            })}
            minDate={searchParams.from}
          />
        </div>
        <br />

        <p style={{ borderBottom: '1px solid lightgrey', fontWeight: 'bold', margin: 0 }}>Duration</p>
        <Adder
          min={1}
          label="Days"
          onChange={(n) => setSearch({
            ...searchParams,
            days: n
          })}
          value={searchParams.days}
        />

        <p style={{ borderBottom: '1px solid lightgrey', fontWeight: 'bold', margin: 0 }}>Travellers</p>
        <Adder
          min={1}
          label="Adults"
          onChange={(adults) => setSearch({
            ...searchParams,
            adults
          })}
          value={searchParams.adults}
        />
        <Adder
          min={0}
          label="Kids"
          onChange={(kids) => setSearch({
            ...searchParams,
            kids
          })}
          value={searchParams.kids}
        />
        <br />
        <Button variant='contained' fullWidth endIcon={<SearchIcon />} onClick={onSearch}>Search</Button>
      </form>
    </Paper>
  )
}

export default Search;