import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'

import { PAYMENTS_LIST_ENDPOINT, PAYMENTS_LIST_KEY } from './payment-list.model'
import { Payment } from './payment-list.type'
import { request } from '~/utils/request'
import { SortOrder } from '~/types/query.type'

export const usePaymentsListQuery = (sortOrder: SortOrder): UseSuspenseQueryResult<Payment[]> =>
  useSuspenseQuery<Payment[]>({
    queryKey: PAYMENTS_LIST_KEY.order({ order: sortOrder }),
    queryFn: () => request(PAYMENTS_LIST_ENDPOINT.order({ order: sortOrder })),
  })
