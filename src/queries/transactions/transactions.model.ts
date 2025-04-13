import { QueryOptions, buildQuery } from '~/utils/build-query'

export const TRANSACTIONS_ENDPOINT = {
  default: '/transactions',
  list: (options: QueryOptions) => {
    return `${TRANSACTIONS_ENDPOINT.default}?${buildQuery('select=*,category:categories(*)', options)}`
  },
  detail: (transactionId: string) => {
    const options: QueryOptions = {
      limit: 1,
      filters: [{ column: 'id', operator: 'eq', value: transactionId }],
    }
    return `${TRANSACTIONS_ENDPOINT.default}?${buildQuery('select=*,category:categories(*)', options)}`
  },
  update: (transactionId: string) => {
    const options: QueryOptions = {
      filters: [{ column: 'id', operator: 'eq', value: transactionId }],
    }
    return `${TRANSACTIONS_ENDPOINT.default}?${buildQuery('', options)}`
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
