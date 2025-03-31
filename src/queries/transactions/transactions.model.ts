import { SortOrder } from '~/types/query.type'

export const TRANSACTIONS_ENDPOINT = {
  default: '/transactions',
  all: ({ sortOrder }: { sortOrder?: SortOrder }) =>
    `${TRANSACTIONS_ENDPOINT.default}?select=*,category:categories(*)&order=date.${sortOrder}`,
  list: (year: number, month: number, sortOrder: SortOrder, type?: string) => {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`
    const endDate = `${year}-${month.toString().padStart(2, '0')}-${new Date(year, month, 0).getDate()}`
    return `${TRANSACTIONS_ENDPOINT.default}?select=*,category:categories(*)&date=gte.${startDate}&date=lte.${endDate}&order=date.${sortOrder}&type=eq.${type}`
  },
  detail: (transactionId: string) => {
    return `${TRANSACTIONS_ENDPOINT.default}?id=eq.${transactionId}&select=*,category:categories(*)&limit=1`
  },
  update: (transactionId: string) => {
    return `${TRANSACTIONS_ENDPOINT.default}?id=eq.${transactionId}`
  },
}

export const TRANSACTIONS_KEY = {
  default: ['transaction'],
  list: (year: number, month: number, sortOrder: SortOrder) => {
    return [...TRANSACTIONS_KEY.default, year, month, sortOrder]
  },
  detail: (transactionId: string) => {
    return [...TRANSACTIONS_KEY.default, transactionId]
  },
  create: ['transaction-create'],
}
