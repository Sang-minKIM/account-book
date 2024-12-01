import { createBrowserRouter } from 'react-router-dom'

import { ROUTE } from './route.model'

import { PaymentList } from '~/pages/payment-list'
import { PaymentCreate } from '~/pages/payment-create'

export const router = createBrowserRouter([
  {
    path: ROUTE.root,
    element: <div>home</div>,
  },
  {
    path: ROUTE.payment.list,
    element: <PaymentList />,
  },
  {
    path: ROUTE.payment.create,
    element: <PaymentCreate />,
  },
])
