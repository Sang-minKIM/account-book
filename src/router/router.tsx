import { createBrowserRouter } from 'react-router-dom'

import { ROUTE } from './route.model'
import { MainLayout } from '~/layout'
import { TransactionList } from '~/pages/transaction-list'
import { TransactionCreate } from '~/pages/transaction-create'
import { TransactionDetail } from '~/pages/transaction-detail'
import { TransactionUpdate } from '~/pages/transaction-update'
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
        path: ROUTE.transaction.list,
        element: <TransactionList />,
      },
      {
        path: ROUTE.transaction.create,
        element: <TransactionCreate />,
      },
      {
        path: ROUTE.transaction.detail(':id'),
        element: <TransactionDetail />,
      },
      {
        path: ROUTE.transaction.update(':id'),
        element: <TransactionUpdate />,
      },
      {
        path: '/statistics',
        element: <Statistics />,
      },
    ],
  },
])
