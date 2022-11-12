import express from 'express';
import { processRequestQuery, TypedRequestBody, TypedRequestQuery, validateRequest, validateRequestQuery } from 'zod-express-middleware';
import { countHotels, countOffers, getMinPrice, queryHotels } from '../db';
import { hotelsBody } from '../schemas';

const router = express.Router();

router
  .get('/hello', async (_req, res) => {
    const countP = countHotels();
    const minP = getMinPrice();
    const nrOffersP = countOffers();
    const [count, min, nrOffers] = await Promise.all([countP, minP, nrOffersP]);
    res.status(200).json({ message: `There are ${count} hotels, with the lowest offer costing \$${min} from ${nrOffers} total offers` });
  })
  .get(
    '/get-hotels',
    //validateRequestQuery(hotelsBody),
    async (req, res) => {
      try {
        console.log(req.query);
        const {adults, kids, from, to, days, airport, page} = req.query
        const parsed = {
          adults: Number(adults),
          kids: Number(kids),
          from: new Date(from as string),
          to: new Date(to as string),
          days: Number(days),
          airport: String(airport),
          page: Number(page)
        }
        const validated = hotelsBody.parse(parsed);
        const hotelsWithFirstOffer = await queryHotels(parsed);
        res.status(200).json(hotelsWithFirstOffer);
      } catch (e) {
        res.status(500).send(e);
      }
    }
  )

export default router;
