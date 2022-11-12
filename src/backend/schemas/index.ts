import { z } from 'zod';

function datediff(first: Date, second: Date) {
  return Math.round((second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
}

export const hotelsBody = z
  .object({
    adults: z.number().int().min(1),
    kids: z.number().int().min(0).optional().default(0),
    from: z.date(),
    to: z.date(),
    airport: z.string().length(3),
    days: z.number().int().min(1),
    page: z.number().int().min(1).optional().default(1)
  })
  .refine(data => data.from < data.to, 'Start date bigger then end date')
  .refine(({ from, to, days }) => datediff(from, to) >= days, 'Days diff wrong');