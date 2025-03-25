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
  payment: {
    list: '/payments',
    detail: (id: string) => `/payments/${id}`,
    create: '/payments/create',
    update: (id: string) => `/payments/update/${id}`,
  },
  statistics: '/statistics',
}
