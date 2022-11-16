import React from "react"
import Grid from "@mui/material/Grid";
import { OfferCard } from "./OfferCard";

export const Offers: React.FC = () => {
  return (
    <>
      <Grid container>
        {[...Array(24).keys()].map((h, i) => (
          <Grid item xs={4}>
            <OfferCard
              days={7}
              children={2}
              adults={3}
              returnDate={new Date()}
              departure={new Date()}
              airport={'Munich'}
              mealtype="Meal"
              roomtype="Room"
              oceanview={false}
              price={123}
            />
          </Grid>))}
      </Grid>
    </>
  )
}