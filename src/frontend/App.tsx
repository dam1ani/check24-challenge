import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import { Hotels } from './components/Hotels';
import { Offers } from './components/Offers';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Hotel, SearchParams } from './model/Hotel';
import { Offer } from './model/Offer';
import CircularProgress from '@mui/material/CircularProgress';


function App(): JSX.Element {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<string>('');
  const [resultsState, setResultsState] = useState<'loading' | 'offers' | 'hotels' | 'empty'>('hotels');

  const fiveDaysInTheFuture = new Date();
  fiveDaysInTheFuture.setDate(fiveDaysInTheFuture.getDate() + 5);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    adults: 1,
    kids: 0,
    airport: 'MUC',
    from: new Date(),
    to: fiveDaysInTheFuture,
    days: 1,
    page: 1
  });

  const onSearch = async () => {
    setResultsState('loading');
    const hotels = await getHotels(searchParams);
    setHotels(hotels);
    if (hotels.length < 1) {
      setResultsState('empty')
      return;
    }
    setResultsState('hotels');
  }

  const showHotelOffers = async (hotelid: number) => {
    setResultsState('loading');
    setOffers(await getOffers(searchParams, hotelid));
    const hotel = hotels.find(h => h.id === hotelid);
    if (hotel) setSelectedHotel(hotel.name)
    setResultsState('offers');
  }

  const renderResults = () => {
    switch (resultsState) {
      case 'hotels':
        return <Hotels onViewOffers={showHotelOffers} hotels={hotels} />
      case 'offers':
        return <Offers offers={offers} />
      case 'loading':
        return <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <CircularProgress size={60} />
        </div>;
      case 'empty':
        return <div style={{ color: 'white', margin: 20 }}><h1 color='white'>No hotels found</h1></div>;
    }
  }

  return (
    <>
      <Grid container spacing={2} height='100%' justifyContent={'space-evenly'}>
        <Grid item xs={4}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '100%' }}>
            <Search
              searchParams={searchParams}
              setSearch={setSearchParams}
              onSearch={onSearch}
            />
          </div>
        </Grid>
        <Grid item xs={8} style={{ overflow: 'hidden', height: '100%' }}>
          <Paper style={{ margin: 20, padding: 20 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" onClick={() => {
                setResultsState('hotels');
                setSelectedHotel("");

              }}>
                Hotels
              </Link>
              {selectedHotel && <Link
                underline="hover"
                color="inherit"
              >
                {selectedHotel}
              </Link>}
            </Breadcrumbs>
          </Paper>
          <div style={{ overflow: 'hidden', overflowY: 'scroll', height: '80%' }}>
            {renderResults()}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
async function getHotels(searchParams: SearchParams): Promise<Hotel[]> {
  const { adults, kids, from, to, page, airport, days } = searchParams;
  const params = new URLSearchParams({
    adults: String(adults),
    kids: String(kids),
    from: from.toISOString(),
    to: to.toISOString(),
    airport,
    days: String(days),
    page: String(page)
  });
  return (await fetch('/api/get-hotels?' + params.toString())).json();
}


async function getOffers(searchParams: SearchParams, hotelid: number): Promise<Offer[]> {
  const { adults, kids, from, to, page, airport, days } = searchParams;
  const params = new URLSearchParams({
    adults: String(adults),
    kids: String(kids),
    from: from.toISOString(),
    to: to.toISOString(),
    airport,
    days: String(days),
    page: String(page),
    hotelid: String(hotelid)
  });
  const offersNotCool: any[] = await (await fetch('/api/get-offers?' + params.toString())).json();

  return offersNotCool.map((o: any) => ({
    ...o,
    returnDate: new Date(o.returndate),
    departureDate: new Date(o.departuredate)
  }))
}
