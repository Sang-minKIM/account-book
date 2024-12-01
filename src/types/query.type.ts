import { SORT_ORDER } from '~/constants/query'

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER]
