import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { fetchData } from '~/utils/fetchData'
import { PAYMENTS_LIST_ENDPOINT, PAYMENTS_LIST_KEY } from './payment-list.key'
import { Payment } from './payment-list.types'

export const usePaymentsListQuery = (): UseSuspenseQueryResult<Payment[]> =>
  useSuspenseQuery<Payment[]>({
    queryKey: PAYMENTS_LIST_KEY.default,
    queryFn: () => fetchData(PAYMENTS_LIST_ENDPOINT.default),
  })
