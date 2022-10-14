import asyncHandler from 'express-async-handler'
import schedule from 'node-schedule'
import moment from 'moment'

import Checkout from '../models/checkoutModel.js'
import { sendMail } from '../utils/sendMail.js'
import { sendMessage } from '../utils/sendTextMessage.js'

const TIME_ZONE = '+05:30'

const sendASchedule = (options) => {
  sendMessage(options, (err, data) => {
    if (err) {
      console.error({
        success: false,
        message: 'Something went wrong!',
        error: err,
      })
    } else {
      console.log({ success: true, message: 'Text message sent' })
    }
  })

  sendMail(options, (err, data) => {
    if (err) {
      console.error({
        success: false,
        message: 'Something went wrong!',
        error: err,
      })
    } else {
      console.log({ success: true, message: 'Email sent' })
    }
  })
}

export const scheduleEvents = asyncHandler(async (req, res) => {
  const { email, phone } = req.body

  const checkout = await Checkout.create({
    email,
    phone,
    scheduledMessages: [],
    scheduleActive: true,
  })

  if (checkout) {
    const schedule1 = `${checkout._id}@5secs`
    const schedule2 = `${checkout._id}@10secs`
    const schedule3 = `${checkout._id}@15secs`

    const date1 = moment()
      .add(5000, 'milliseconds')
      .utcOffset(TIME_ZONE)
      .format()
    const date2 = moment()
      .add(10000, 'milliseconds')
      .utcOffset(TIME_ZONE)
      .format()
    const date3 = moment()
      .add(15000, 'milliseconds')
      .utcOffset(TIME_ZONE)
      .format()

    checkout.scheduledMessages = [
      { id: schedule1, type: 'After 5 secs', time: date1, sent: false },
      { id: schedule2, type: 'After 10 secs', time: date2, sent: false },
      { id: schedule3, type: 'After 15 secs', time: date3, sent: false },
    ]

    const updatedCheckout = await checkout.save()

    res.status(201).json({
      success: true,
      message: 'Schedule created',
      data: updatedCheckout,
    })

    schedule.scheduleJob(schedule1, date1, async () => {
      updatedCheckout.scheduledMessages?.forEach((el) => {
        if (el.id === schedule1) {
          el.sent = true
        }
      })
      await updatedCheckout.save()
      // console.log('Job 1 sent!')
      sendASchedule({ email, phone })
    })

    schedule.scheduleJob(schedule2, date2, async () => {
      updatedCheckout.scheduledMessages?.forEach((el) => {
        if (el.id === schedule2) {
          el.sent = true
        }
      })
      await updatedCheckout.save()
      // console.log('Job 2 sent!')
      sendASchedule({ email, phone })
    })

    schedule.scheduleJob(schedule3, date3, async () => {
      updatedCheckout.scheduledMessages?.forEach((el) => {
        if (el.id === schedule3) {
          el.sent = true
        }
      })
      updatedCheckout.scheduleActive = false
      await updatedCheckout.save()
      // console.log('Job 3 sent!')
      sendASchedule({ email, phone })
    })
  } else {
    res.status(400)
    throw new Error('Something went wrong')
  }
})

export const cancelScheduledEvents = asyncHandler(async (req, res) => {
  const { email } = req.body

  const checkouts = await Checkout.find({ email })

  checkouts.forEach((checkout) => {
    checkout.scheduledMessages?.forEach((el) => {
      schedule.cancelJob(el.id)
    })
  })

  await Checkout.deleteMany({ email })

  res
    .status(200)
    .json({ success: true, message: `All jobs with email ${email} cancelled` })
})