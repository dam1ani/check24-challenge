import express from 'express';
import { firstFiveHotels } from '../db';

const router = express.Router();

router.get('/hello', async (_req, res) => {
  console.log("AFDFS")
  firstFiveHotels();
  res.status(200).json({ message: 'Hello World!' });
});

export default router;
