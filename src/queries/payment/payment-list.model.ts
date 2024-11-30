import { SortOrder } from './payment-list.types'

export const PAYMENTS_LIST_ENDPOINT = {
  default: '/payments',
  order: (body: { order: SortOrder }) => {
    return `${PAYMENTS_LIST_ENDPOINT.default}?order=date.${body.order}`
  },
}

export const PAYMENTS_LIST_KEY = {
  default: ['payments-list'],
  order: (body: { order: SortOrder }) => {
    return [...PAYMENTS_LIST_KEY.default, body.order]
  },
}
