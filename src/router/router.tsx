import { createBrowserRouter } from 'react-router-dom'

import { ROUTE } from './route.model'
import { MainLayout } from '~/layout'
import { PaymentList } from '~/pages/payment-list'
import { PaymentCreate } from '~/pages/payment-create'
import { PaymentDetail } from '~/pages/payment-detail'
import { PaymentUpdate } from '~/pages/payment-update'
import { Statistics } from '~/pages/statistics'
import { Home } from '~/pages/transaction'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTE.transactions.root,
        element: <Home />,
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
      {
        path: ROUTE.payment.update(':id'),
        element: <PaymentUpdate />,
      },
      {
        path: '/statistics',
        element: <Statistics />,
      },
    ],
  },
])
