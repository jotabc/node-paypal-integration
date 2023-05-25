import axios from 'axios'
import { HOST, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from '../../config.js'

export const createOrder = async (req, res) => {
  // 1) creamos la orden
  const order = {
    intent: 'CAPTURE',
    purchase_units: [
      // req.body para enviar los productos que enviamos mediante el body
      {
        amount: {
          currency_code: 'USD',
          value: '100.00'
        }
      }
      /* si queremos mas items, asi por cada elemento que vamos a cobrar.
      {
        amount: {
          currency_code: 'USD',
          value: '100.00'
        }
      } */
    ],
    aplication_context: { // => INFO DE LA TIENDA.
      brand_name: 'Home Store',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      return_url: `${HOST}/capture-order`, // => ruta que direcciona si es ok
      cancel_url: `${HOST}/cancel-order` // => ruta que direcciona si cancela el pago.
    }
  }

  // 2) logout para token
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials') // => le decimos que vamos a pasar credenciales.
  const { data: { access_token: token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
    auth: {
      username: PAYPAL_API_CLIENT,
      password: PAYPAL_API_SECRET
    }
  })

  console.log(token)

  // 3) enviamos y obtenemos la orden.
  const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
    headers: {
      'Content-Type': 'application/json',
      // 'PayPal-Request-Id': PAYPAL_API_CLIENT,
      Authorization: `Bearer ${token}`
    }
  })

  return res.json(response.data)
}

export const captureOrder = async (req, res) => {
  const { token } = req.query
  const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
    auth: {
      username: PAYPAL_API_CLIENT,
      password: PAYPAL_API_SECRET
    }
  })
  console.log(response)
  return res.send('payed')
}

export const cancelPayment = (req, res) => {
  res.rediect('/')
}
