import React from 'react';
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from '@mui/material/Typography';
import { Hotel } from '../model/Hotel';
import Rating from '@mui/material/Rating';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

interface HotelCardProps {
  hotel: Hotel;
  onViewOffers: (hotelid: number) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel: { name, category_stars, minhotprice, latitude, longitude, id, img_url }, onViewOffers }) => (
  <Card sx={{ display: 'flex' }} style={{ margin: 20 }}>
    <CardMedia
      component="img"
      sx={{ width: 1 / 4 }}
      image={img_url}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Rating value={category_stars} readOnly precision={0.5} />
      <br />
      <Link href={`https://www.google.com/maps/place/${latitude},${longitude}`} target="_blank"><LocationOnIcon /> Location</Link>
    </CardContent>
    <CardActions style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: 'h4.fontSize' }}>
        ab <b>{minhotprice}€</b>
      </Typography>



      <Button onClick={() => onViewOffers(id)} >View Offers</Button>

    </CardActions>
  </Card >
)