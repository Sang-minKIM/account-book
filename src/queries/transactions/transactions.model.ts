import { QueryOptions, buildQuery } from '~/utils/build-query'

export const TRANSACTIONS_ENDPOINT = {
  default: '/transactions',
  list: (options: QueryOptions) => {
    return `${TRANSACTIONS_ENDPOINT.default}?${buildQuery('select=*,category:categories(*)', options)}`
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

  list: (options: QueryOptions) => {
    return [...TRANSACTIONS_KEY.default, options]
  },
  detail: (transactionId: string) => {
    return [...TRANSACTIONS_KEY.default, transactionId]
  },
  create: ['transaction-create'],
}
