import asyncHandler from 'express-async-handler'

import Checkout from '../models/checkoutModel.js'

export const getCheckoutSchedule = asyncHandler(async (req, res) => {
  await Checkout.find({}).exec(function (err, entries) {
    if (err)
      return res
        .status(400)
        .json({ success: false, message: 'Something went wrong' })
    return res.render('dashboard', {
      title: 'Dashboard',
      description:
        'Abandoned checkout recovery plugin for an e-commerce platform',
      keywords: 'Abandoned, checkout, recovery plugin, e-commerce platform',
      entries,
      empty: entries.length === 0,
    })
  })
})
