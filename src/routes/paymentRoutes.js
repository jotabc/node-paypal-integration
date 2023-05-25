import express from 'express'
import { cancelPayment, captureOrder, createOrder } from '../controllers/paymentController.js'

const paymentRouter = express.Router()

paymentRouter.get('/create-order', createOrder)

paymentRouter.get('/capture-order', captureOrder)

paymentRouter.get('/cancel-order', cancelPayment)

export default paymentRouter
