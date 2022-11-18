import React from "react"
import { Hotel } from "../model/Hotel"
import { HotelCard } from "./HotelCard"

interface HotelsProps {
  hotels?: Hotel[]
  onViewOffers: () => void;
}

export const Hotels: React.FC<HotelsProps> = ({ hotels, onViewOffers }) => {
  const hotel: Hotel = {
    id: 1,
    coordinates: {
      x: 0,
      y: 0,
    },
    latitude: 0,
    longitude: 0,
    category_stars: 3.5,
    minhotprice: 132,
    name: 'HOTELO'
  }
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