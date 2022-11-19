import React from "react"
import Grid from "@mui/material/Grid";
import { OfferCard } from "./OfferCard";
import { Offer } from "../model/Offer";

interface OffersProps {
  offers: Offer[];
}

export const Offers: React.FC<OffersProps> = ({ offers }) => {
  return (
    <>
      <Grid container>
        {offers.map((h, i) => (
          <Grid item xs={4} key={i}>
            <OfferCard
              days={h.days}
              children={h.children}
              adults={h.adults}
              returnDate={h.returnDate}
              departure={h.departureDate}
              airport={h.airport}
              mealtype={h.mealtype}
              roomtype={h.roomtype}
              oceanview={h.oceanview}
              price={h.price}
            />
          </Grid>))}
      </Grid>
    </>
  )
}