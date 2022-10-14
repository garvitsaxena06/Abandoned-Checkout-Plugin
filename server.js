import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { sendMail } from './utils/sendMail.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('API is running...')
  const options = {
    email: 'garvitsaxena06@gmail.com',
    phone: 8602438440,
  }
  sendMail(options, (err, data) => {
    if (err) {
      console.error({
        success: false,
        message: 'Something went wrong!',
        error: err,
      })
    } else {
      console.log({ success: true, message: 'Email sent', data })
    }
  })
})

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline.bold
  )
})
