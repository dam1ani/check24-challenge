import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import { Hotels } from './components/Hotels';
import { Offers } from './components/Offers';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { SearchParams } from './model/Hotel';


function App(): JSX.Element {
  const [showOffers, setShowOffers] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [msg, setMsg] = useState('');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    adults: 0,
    kids: 0,
    airport: 'MUC',
    from: new Date(),
    to: new Date(),
    days: 1,
    page: 1
  });
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
            <Search
              searchParams={searchParams}
              setSearch={setSearchParams}
              onSearch={() => console.log(searchParams)}
            />
          </div>
        </Grid>
        <Grid item xs={8} style={{ overflow: 'hidden', height: '100%' }}>
          <Paper style={{ margin: 20, padding: 20 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Hotels
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Core
              </Link>
              <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
          </Paper>
          <div style={{ overflow: 'hidden', overflowY: 'scroll', height: '80%' }}>
            {false ? <Offers /> : <Hotels onViewOffers={() => setShowOffers(true)} />}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
