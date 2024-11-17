import { createBrowserRouter } from 'react-router-dom'

import { PaymentList } from '~/pages/payment-list'
import { ROUTE } from './route.model'

export const router = createBrowserRouter([
  {
    path: ROUTE.root,
    element: <div>home</div>,
  },
  {
    path: ROUTE.payment.list,
    element: <PaymentList />,
  },
])
