import { SortOrder } from '~/types/query.type'

export const PAYMENTS_ENDPOINT = {
  default: '/payments',
  order: (body: { order: SortOrder }) => {
    return `${PAYMENTS_ENDPOINT.default}?order=date.${body.order}`
  },
}

export const PAYMENTS_KEY = {
  default: ['payment'],
  order: (body: { order: SortOrder }) => {
    return [...PAYMENTS_KEY.default, body.order]
  },
  create: ['payment-create'],
}
