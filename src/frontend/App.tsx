import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function App(): JSX.Element {
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
      <Grid container spacing={2} height='100%'>
        <Grid item xs={4}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '100%' }}>
            <Search />
          </div>
        </Grid>
        <Grid item xs={8} style={{ overflow: 'hidden', overflowY: 'scroll', height: '100%' }}>
          {[...Array(25).keys()].map((h, i) => (
            <div style={{ padding: 20 }}>
              <Card sx={{ display: 'flex' }} key={i} >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image="https://mui.com/static/images/cards/live-from-space.jpg"
                  alt="Live from space album cover"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Hotel {i}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <ExpandMoreIcon />
                </CardActions>
              </Card>
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
