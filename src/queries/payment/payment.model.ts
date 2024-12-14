import { SortOrder } from '~/types/query.type'

export const PAYMENTS_ENDPOINT = {
  default: '/payments',
  list: (year: number, month: number, sortOrder: SortOrder) => {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`
    const endDate = `${year}-${month.toString().padStart(2, '0')}-${new Date(year, month, 0).getDate()}`
    return `${PAYMENTS_ENDPOINT.default}?date=gte.${startDate}&date=lte.${endDate}&order=date.${sortOrder}`
  },
  detail: (paymentId: string) => {
    return `${PAYMENTS_ENDPOINT.default}?id=eq.${paymentId}&select=*,category:categories(*)&limit=1`
  },
  update: (paymentId: string) => {
    return `${PAYMENTS_ENDPOINT.default}?id=eq.${paymentId}`
  },
}

export const PAYMENTS_KEY = {
  default: ['payment'],
  list: (year: number, month: number, sortOrder: SortOrder) => {
    return [...PAYMENTS_KEY.default, year, month, sortOrder]
  },
  detail: (paymentId: string) => {
    return [...PAYMENTS_KEY.default, paymentId]
  },
  create: ['payment-create'],
}
