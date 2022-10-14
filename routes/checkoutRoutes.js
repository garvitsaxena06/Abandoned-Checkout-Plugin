import express from 'express'
import {
  scheduleEvents,
  cancelScheduledEvents,
} from '../controllers/checkoutController.js'

const router = express.Router()

router.post('/schedule', scheduleEvents)
router.post('/cancel-scheduled-events', cancelScheduledEvents)

export default router
