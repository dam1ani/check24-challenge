import React from "react"
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Paper from "@mui/material/Paper";

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
    <Paper style={{ padding: 10, margin: 10 }}>
      <p><b>{days} Tage ab München</b></p>
      <FlightLandIcon /> <span>{departure.toDateString()}</span>
      <br />
      <FlightTakeoffIcon /> <span>{returnDate.toDateString()}</span>
      <span>Children: {children}</span>
      <span>adults: {adults}</span>
      <span>price: {price}</span>
      <span>airport: {airport}</span>
      <span>mealtype: {mealtype}</span>
      <span>roomtype: {roomtype}</span>
      <span>oceanview: {oceanview}</span>
    </Paper>
  );