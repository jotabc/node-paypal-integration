import express from 'express'
import paymentRouter from './routes/paymentRoutes.js'
import { PORT } from '../config.js'

const app = express()

app.use('/api/payment', paymentRouter)

app.listen(PORT)
console.log(`Server on port ${PORT}`)
