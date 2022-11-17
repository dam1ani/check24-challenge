export interface Hotel {
  category_stars: number;
  coordinates: {
    x: number;
    y: number;
  };
  id: number;
  latitude: number;
  longitude: number;
  minhotprice: number;
  name: string;
}