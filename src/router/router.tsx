import { createBrowserRouter } from 'react-router-dom'

import { ROUTE } from './route.model'
import { MainLayout } from '~/layout'
import { TransactionCalendar } from '~/pages/transaction-calendar'
import { TransactionCreate } from '~/pages/transaction-create'
import { TransactionDetail } from '~/pages/transaction-detail'
import { TransactionUpdate } from '~/pages/transaction-update'
import { Statistics } from '~/pages/statistics'
import { Transactions } from '~/pages/transactions'
import { ErrorPage } from '~/pages/error-page'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTE.transactions.root,
        element: <Transactions />,
      },
      {
        path: ROUTE.calendar.root,
        element: <TransactionCalendar />,
      },
      {
        path: ROUTE.calendar.create,
        element: <TransactionCreate />,
      },
      {
        path: ROUTE.calendar.detail(':id'),
        element: <TransactionDetail />,
      },
      {
        path: ROUTE.calendar.update(':id'),
        element: <TransactionUpdate />,
      },
      {
        path: '/statistics',
        element: <Statistics />,
      },
    ],
  },
])
