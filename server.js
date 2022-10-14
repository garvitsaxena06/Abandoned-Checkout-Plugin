import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'

import checkoutRoutes from './routes/checkoutRoutes.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('API is running...')
  // const options = {
  //   email: 'garvitsaxena06@gmail.com',
  //   phone: 8602438440,
  // }
})

app.use('/api/v1/checkout', checkoutRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline.bold
  )
})
