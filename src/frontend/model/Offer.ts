export interface Offer {
  days: number;
  departureDate: Date;
  returnDate: Date;
  children: number;
  adults: number;
  price: number;
  airport: string;
  mealtype: string;
  roomtype: string;
  oceanview: boolean;
}