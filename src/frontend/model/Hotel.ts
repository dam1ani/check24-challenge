import { z } from "zod";
import { hotelsBody } from "../../backend/schemas";

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
  img_url: string;
}

export type SearchParams = z.infer<typeof hotelsBody>;