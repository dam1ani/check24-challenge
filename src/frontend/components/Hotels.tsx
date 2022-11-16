import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import React from "react"

interface HotelsProps {
  onViewOffers: () => void;
}

export const Hotels: React.FC<HotelsProps> = ({ onViewOffers }) => {
  return (
    <>
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
              <Button onClick={onViewOffers}>View Offers</Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </>
  )
}