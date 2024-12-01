export const ROUTE = {
  root: '/',
  payment: {
    list: '/payments',
    detail: (id: string) => `/payments/${id}`,
    create: '/payments/create',
    update: (id: string) => `/payments/update/${id}`,
  },
}
