import express from 'express'
import { getPriceCorkAll, getPriceCorkDaily, getPriceCorkNow } from '../controllers/PriceController'
const router = express.Router()

router.get('/wallet', getPriceCorkAll);

router.get('/price-daily',getPriceCorkDaily)

router.get('/price-now', getPriceCorkNow);

export default router