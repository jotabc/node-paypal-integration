import express from 'express'
import paymentRouter from './routes/paymentRoutes.js'
import { PORT } from '../config.js'
import path from 'path'

const app = express()

app.use('/api/payment', paymentRouter)
app.use(express.static(path.resolve('src/public')))

app.listen(PORT)
console.log(`Server on port ${PORT}`)
