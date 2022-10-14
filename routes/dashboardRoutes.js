import express from 'express'
import { getCheckoutSchedule } from '../controllers/dashboardController.js'

const router = express.Router()

router.get('/', getCheckoutSchedule)

export default router
