import { SORT_ORDER } from '~/constants/query'
import { buildQuery } from '~/utils/build-query'

import { QueryOptions } from '~/utils/build-query'

export const CATEGORY_LIST_ENDPOINT = {
  default: '/categories',
  list: () => {
    const options: QueryOptions = {
      sort: [{ column: 'id', order: SORT_ORDER.ASC }],
    }
    return `${CATEGORY_LIST_ENDPOINT.default}?${buildQuery('', options)}`
  },
}

export const CATEGORY_LIST_KEY = {
  default: ['category-list'],
  list: () => {
    return [...CATEGORY_LIST_KEY.default]
  },
}
