import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import { Hotels } from './components/Hotels';
import { Offers } from './components/Offers';


function App(): JSX.Element {
  const [showOffers, setShowOffers] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    const params = new URLSearchParams({
      adults: String(3),
      kids: String(1),
      from: new Date('2022-08-04 16:00:00').toISOString(),
      to: new Date('2022-09-03 06:15:00').toISOString(),
      airport: 'MUC',
      days: String(6),
      page: String(1)
    })
    fetch('/api/get-hotels?' + params.toString()).then(r => {
      r.json().then(j => console.log(j))
    })
  }, [])
  return (
    <>
      <Grid container spacing={2} height='100%' justifyContent={'space-evenly'}>
        <Grid item xs={4}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '100%' }}>
            <Search />
          </div>
        </Grid>
        <Grid item xs={6} style={{ overflow: 'hidden', overflowY: 'scroll', height: '100%' }}>
          {true ? <Offers /> : <Hotels onViewOffers={() => setShowOffers(true)} />}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
