import React from "react"
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Paper from "@mui/material/Paper";
import NoMealsIcon from '@mui/icons-material/NoMeals';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WaterIcon from '@mui/icons-material/Water';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid'
interface OfferCardProps {
  days: number;
  departure: Date;
  returnDate: Date;
  children: number;
  adults: number;
  price: number;
  airport: string;
  mealtype: string;
  roomtype: string;
  oceanview: boolean;
}

export const OfferCard: React.FC<OfferCardProps> =
  ({ days, departure, returnDate, children, adults, price, airport, mealtype, roomtype, oceanview }) => (
    <Paper style={{ padding: 10, margin: 20, display: 'flex', flexDirection: 'row' }}>
      <Grid container>
        <Grid item xs={7}>
          <p><b>{days} Tage ab {airport}</b></p>
          <FlightLandIcon /> <span>{departure.toDateString()}</span>
          <br />
          <FlightTakeoffIcon /> <span>{returnDate.toDateString()}</span>
          <br />
          <Typography>
            {mealtype !== "none" ? <RestaurantIcon style={{ verticalAlign: "middle" }} /> : <NoMealsIcon style={{ verticalAlign: "middle" }} />}
            <span style={{ verticalAlign: "middle" }}> {mealtype} </span>
          </Typography>
          <Typography>
            <BedroomParentOutlinedIcon style={{ verticalAlign: "middle" }} /> <span style={{ verticalAlign: "middle" }}> {roomtype} </span>
          </Typography>

          <Typography>
            <WaterIcon style={{ verticalAlign: "middle" }} />   <span style={{ verticalAlign: "middle" }}>{oceanview ? "Ocean View" : "No Ocean View"}</span>
          </Typography>
        </Grid>
        <Grid item xs={5} style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', height: '100%' }}>
          <span id="price"> {price} €</span>

          <Button variant="contained" color="success" size="medium">
            Book Now!
          </Button>
        </Grid>
      </Grid>
    </Paper >
  );