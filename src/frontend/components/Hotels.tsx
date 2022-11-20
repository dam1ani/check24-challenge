import React from "react"
import { Hotel } from "../model/Hotel"
import { HotelCard } from "./HotelCard"

interface HotelsProps {
  hotels?: Hotel[]
  onViewOffers: (hotelid: number) => void;
}

export const Hotels: React.FC<HotelsProps> = ({ hotels, onViewOffers }) => {

  return (
    <>
      {hotels && hotels.map((h, i) => (
        <HotelCard
          onViewOffers={onViewOffers}
          hotel={h}
          key={i}
        />
      ))}
    </>
  )
}