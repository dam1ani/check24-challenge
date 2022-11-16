import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Hotels } from './components/Hotels';
import { Offers } from './components/Offers';


function App(): JSX.Element {
  const [showOffers, setShowOffers] = useState<boolean>(false);
  // const [count, setCount] = useState<number>(0);
  // const [msg, setMsg] = useState('');
  // useEffect(() => {
  //   const params = new URLSearchParams({
  //     adults: String(3),
  //     kids: String(1),
  //     from: new Date('2022-08-04 16:00:00').toISOString(),
  //     to: new Date('2022-09-03 06:15:00').toISOString(),
  //     airport: 'MUC',
  //     days: String(6),
  //     page: String(1)
  //   })
  //   fetch('/api/get-hotels?' + params.toString()).then(r => {
  //     r.json().then(j => console.log(j))
  //   })
  // }, [])
  return (
    <>
      <Grid container spacing={2} height='100%'>
        <Grid item xs={4}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '100%' }}>
            <Search />
          </div>
        </Grid>
        <Grid item xs={8} style={{ overflow: 'hidden', overflowY: 'scroll', height: '100%' }}>
          {true ? <Offers /> : <Hotels onViewOffers={() => setShowOffers(true)} />}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
