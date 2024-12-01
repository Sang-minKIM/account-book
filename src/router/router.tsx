import { createBrowserRouter } from 'react-router-dom'

import { ROUTE } from './route.model'

import { PaymentList } from '~/pages/payment-list'
import { PaymentCreate } from '~/pages/payment-create'
import { PaymentDetail } from '~/pages/payment-detail'

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
  {
    path: ROUTE.payment.detail(':id'),
    element: <PaymentDetail />,
  },
])
