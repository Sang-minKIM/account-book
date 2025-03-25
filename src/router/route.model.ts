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
    detail: (id: string) => `/calendar/${id}`,
    create: '/calendar/create',
    update: (id: string) => `/calendar/update/${id}`,
  },
  category: {
    root: '/category',
  },
  statistics: '/statistics',
}
