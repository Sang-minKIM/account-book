import { SortOrder } from '~/types/query.type'

export const CATEGORY_LIST_ENDPOINT = {
  default: '/categories',
  order: (body: { order: SortOrder }) => {
    return `${CATEGORY_LIST_ENDPOINT.default}?order=id.${body.order}`
  },
}

export const CATEGORY_LIST_KEY = {
  default: ['category-list'],
  order: (body: { order: SortOrder }) => {
    return [...CATEGORY_LIST_KEY.default, body.order]
  },
}
