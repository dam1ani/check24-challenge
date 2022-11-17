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

interface HotelCardProps {
  hotel: Hotel;
  onViewOffers: () => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel: { name, category_stars, minhotprice, latitude, longitude }, onViewOffers }) => (
  <Card sx={{ display: 'flex' }} style={{ margin: 20 }}>
    <CardMedia
      component="img"
      sx={{ width: 151 }}
      image="https://mui.com/static/images/cards/live-from-space.jpg"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Rating value={category_stars} readOnly precision={0.5} />
      <br />
      <Link href={`https://www.google.com/maps/place/${latitude},${longitude}`} target="_blank"><LocationOnIcon /> Location</Link>
    </CardContent>
    <CardActions>
      <Typography variant="body2" color="text.secondary">
        ab <b>{minhotprice}</b>
      </Typography>
      <Button onClick={onViewOffers}>View Offers</Button>
    </CardActions>
  </Card>
)