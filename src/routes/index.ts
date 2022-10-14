import express from 'express'
import { getPriceCorkAll, getPriceCorkDaily } from '../controllers/PriceController'
const router = express.Router()

router.get('/token', getPriceCorkAll);

router.get('/price-daily',getPriceCorkDaily)

export default router