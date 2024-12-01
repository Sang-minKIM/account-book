import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { SortOrder } from '~/types/query.type'
import { CATEGORY_LIST_ENDPOINT, CATEGORY_LIST_KEY } from './category-list.model'
import { request } from '~/utils/request'
import { CategoryResponse } from './category-list.type'

export const useCategoryListQuery = (sortOrder: SortOrder): UseSuspenseQueryResult<CategoryResponse[]> =>
  useSuspenseQuery({
    queryKey: CATEGORY_LIST_KEY.order({ order: sortOrder }),
    queryFn: () => request(CATEGORY_LIST_ENDPOINT.order({ order: sortOrder })),
  })
