import { useMutation, useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'

import { PAYMENTS_ENDPOINT, PAYMENTS_KEY } from './payment.model'
import { Payment, PaymentCreateRequest } from './payment.type'
import { request } from '~/utils/request'
import { SortOrder } from '~/types/query.type'

export const usePaymentsListQuery = (sortOrder: SortOrder): UseSuspenseQueryResult<Payment[]> =>
  useSuspenseQuery<Payment[]>({
    queryKey: PAYMENTS_KEY.order({ order: sortOrder }),
    queryFn: () => request(PAYMENTS_ENDPOINT.order({ order: sortOrder })),
  })

export const usePaymentDetailQuery = (paymentId: string): UseSuspenseQueryResult<Payment[]> =>
  useSuspenseQuery<Payment[]>({
    queryKey: PAYMENTS_KEY.detail(paymentId),
    queryFn: () => request(PAYMENTS_ENDPOINT.detail(paymentId)),
  })

export const usePaymentCreateMutation = () => {
  return useMutation({
    mutationFn: (data: PaymentCreateRequest) =>
      request(PAYMENTS_ENDPOINT.default, {
        method: 'POST',
        data: JSON.stringify(data),
      }),
  })
}
