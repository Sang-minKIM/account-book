import { SortOrder } from '~/types/query.type'

export const PAYMENTS_ENDPOINT = {
  default: '/payments',
  order: (body: { order: SortOrder }) => {
    return `${PAYMENTS_ENDPOINT.default}?order=date.${body.order}`
  },
  detail: (paymentId: string) => {
    return `${PAYMENTS_ENDPOINT.default}?id=eq.${paymentId}&select=*,category:categories(*)&limit=1`
  },
}

export const PAYMENTS_KEY = {
  default: ['payment'],
  order: (body: { order: SortOrder }) => {
    return [...PAYMENTS_KEY.default, body.order]
  },
  detail: (paymentId: string) => {
    return [...PAYMENTS_KEY.default, paymentId]
  },
  create: ['payment-create'],
}
