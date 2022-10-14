import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'
import expressEjsLayouts from 'express-ejs-layouts'
import colors from 'colors'
import connectDB from './config/db.js'

import checkoutRoutes from './routes/checkoutRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

app.use(expressEjsLayouts)
app.set('layout', './layouts/main')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use('/assets', express.static(path.dirname + '/public/assets'))
app.use('/public', express.static(path.dirname + '/public'))

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/dashboard', dashboardRoutes)
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
