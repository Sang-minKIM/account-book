import { z } from 'zod'
import { useSuspenseQuery } from '@tanstack/react-query'

import { request } from '~/utils/request'

import { CATEGORY_LIST_ENDPOINT, CATEGORY_LIST_KEY } from './category-list.model'
import { CategorySchema } from './category-list.type'

type Category = z.infer<typeof CategorySchema>

export const useCategoryListQuery = () =>
  useSuspenseQuery<Category[]>({
    queryKey: CATEGORY_LIST_KEY.list(),
    queryFn: () => request(CATEGORY_LIST_ENDPOINT.list()),
  })
