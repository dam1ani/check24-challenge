import express from 'express';
import { TypedRequestBody, validateRequest } from 'zod-express-middleware';
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
  .post(
    '/get-hotels',
    validateRequest({
      body: hotelsBody
    }),
    async (req: TypedRequestBody<typeof hotelsBody>, res) => {
      try {
        const hotelsWithFirstOffer = await queryHotels(req.body);
        res.status(200).send(hotelsWithFirstOffer);
      } catch (e) {
        res.status(500).send(e);
      }
    }
  )

export default router;
