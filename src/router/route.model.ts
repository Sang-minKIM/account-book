export const ROUTE = {
  dashboard: {
    root: '/',
  },
  transactions: {
    root: '/transactions',
  },
  savings: {
    root: '/savings',
  },
  accounts: {
    root: '/accounts',
  },
  expenses: {
    root: '/expenses',
  },
  calendar: {
    root: '/calendar',
  },
  category: {
    root: '/category',
  },
  transaction: {
    list: '/transactions',
    detail: (id: string) => `/transactions/${id}`,
    create: '/transactions/create',
    update: (id: string) => `/transactions/update/${id}`,
  },
  statistics: '/statistics',
}
