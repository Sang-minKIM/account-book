import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'

import { PAYMENTS_LIST_ENDPOINT, PAYMENTS_LIST_KEY } from './payment-list.model'
import { Payment, SortOrder } from './payment-list.types'
import { request } from '~/utils/request'

export const usePaymentsListQuery = (sortOrder: SortOrder): UseSuspenseQueryResult<Payment[]> =>
  useSuspenseQuery<Payment[]>({
    queryKey: PAYMENTS_LIST_KEY.order({ order: sortOrder }),
    queryFn: () => request(PAYMENTS_LIST_ENDPOINT.order({ order: sortOrder })),
  })
